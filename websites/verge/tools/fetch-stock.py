"""Pull candidate photography from Pexels for this episode.

    python tools/fetch-stock.py chair-studio "yellow chair" "chair studio"

Writes the candidates to tools/_stock/<group>-NN.jpg together with a TSV of
what came from where, which is what `src/assets/img/CREDITS.md` is built from.
Nothing here picks for you: it downloads a sheet, you look at it, and the ones
you keep get resized into src/assets/img by tools/bake.py.

Two things learned the hard way and kept in the code:

  * **Two plain words.** A long, specific query ("mid century dining chair
    studio shot") returns an empty grid; "yellow chair" returns forty usable
    frames. Pexels matches tags, not sentences.
  * **The alt text carries the photographer.** It is the only place the name
    appears in the search HTML, so it is captured at download time -- going
    back for attribution afterwards means re-scraping every id.
"""

import io
import os
import re
import subprocess
import sys
import urllib.parse

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_stock')


def get(url):
    """Fetch through curl.

    Not urllib: Pexels answers a bare urllib request with 403 however the
    User-Agent is set, and answers curl with the same headers normally. The
    difference is in the TLS handshake, not the headers, so there is no header
    list that fixes it from Python.
    """
    out = subprocess.run(
        ['curl', '-sL', '--max-time', '60', '-A', UA,
         # No image/avif here. Pexels content-negotiates on Accept and will
         # hand back AVIF, which PIL cannot open -- the files look like JPEGs
         # by name and are not.
         '-H', 'Accept: text/html,application/xhtml+xml,image/jpeg,*/*;q=0.8',
         '-H', 'Accept-Language: en-GB,en;q=0.9', url],
        capture_output=True)
    if out.returncode != 0 or not out.stdout:
        raise RuntimeError('curl failed (%s)' % out.returncode)
    return out.stdout


def search(query, want=12):
    """Photo ids and their alt text, in the order Pexels ranks them."""
    html = get('https://www.pexels.com/search/%s/' % urllib.parse.quote(query)).decode('utf-8', 'replace')
    seen, out = set(), []
    # The id is in the file path; the alt sits on the same <img> tag.
    for m in re.finditer(r'<img[^>]+src="https://images\.pexels\.com/photos/(\d+)/[^"]*"[^>]*>', html):
        tag, pid = m.group(0), m.group(1)
        if pid in seen:
            continue
        seen.add(pid)
        alt = re.search(r'alt="([^"]*)"', tag)
        out.append((pid, alt.group(1) if alt else ''))
        if len(out) >= want:
            break
    return out


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return
    group, queries = sys.argv[1], sys.argv[2:]
    os.makedirs(OUT, exist_ok=True)
    rows, n = [], 0
    for q in queries:
        hits = search(q)
        print('%-22s %d hits' % (q, len(hits)))
        for pid, alt in hits:
            url = 'https://images.pexels.com/photos/%s/pexels-photo-%s.jpeg?auto=compress&cs=tinysrgb&w=1400' % (pid, pid)
            name = '%s-%02d.jpg' % (group, n)
            try:
                data = get(url)
            except Exception as e:
                print('   skip %s (%s)' % (pid, e))
                continue
            io.open(os.path.join(OUT, name), 'wb').write(data)
            rows.append('%s\t%s\t%s\t%s' % (name, pid, q, alt.replace('\t', ' ')))
            # ASCII only: the Windows console is cp1252 and a stray glyph in an
            # alt string kills the run *after* the file has been written.
            safe = alt[:54].encode('ascii', 'replace').decode('ascii')
            print('   %-18s %6d bytes  %s' % (name, len(data), safe))
            n += 1
    tsv = os.path.join(OUT, '%s.tsv' % group)
    io.open(tsv, 'w', encoding='utf-8', newline='').write('\n'.join(rows) + '\n')
    print('\nwrote', tsv)


if __name__ == '__main__':
    main()
