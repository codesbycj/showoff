"""
Find and fetch free-licensed photographs from Pexels.

    python tools/bake/pexels.py search "parcel box" 12
    python tools/bake/pexels.py get 4246120 tools/bake/sources/crate-4246120.jpg
    python tools/bake/pexels.py sheet tools/bake/sources/crate-*.jpg

Search scrapes the public results page for `images.pexels.com/photos/<id>/`
and pulls each at `?auto=compress&cs=tinysrgb&w=1400`. Two plain words work;
long queries often return nothing.

**Every candidate is printed with its id.** Guessing an id from memory went
wrong three times in one session - label them and look before picking.

**Look at every frame at 1:1 before committing to it.** Stock carries other
brands' marks: a Coca-Cola can on a table, a wordmark on a jacket, a number
plate. A contact sheet is too small to show a 40px logo, which is why `sheet`
exists only to choose between frames and never to clear one.
"""

import glob
import os
import re
import sys
import urllib.parse
import urllib.request

UA = (
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
    '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
)

# A bare User-Agent gets a 403 from the search page. The navigation headers a
# real browser sends are what it actually checks - Accept, Accept-Language,
# Referer and the Sec-Fetch trio. `Accept-Encoding: identity` keeps the body
# readable without pulling in a decompressor.
HEADERS = {
    'User-Agent': UA,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-GB,en;q=0.9',
    'Accept-Encoding': 'identity',
    'Referer': 'https://www.pexels.com/',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
}
CDN = 'https://images.pexels.com/photos/%s/pexels-photo-%s.jpeg?auto=compress&cs=tinysrgb&w=1400'


def _get(url, timeout=45):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def search(query, want=12):
    url = 'https://www.pexels.com/search/' + urllib.parse.quote(query) + '/'
    try:
        html = _get(url).decode('utf-8', 'replace')
    except Exception as e:
        print('search failed: %s' % e)
        return []

    ids, seen = [], set()
    for m in re.finditer(r'images\.pexels\.com/photos/(\d+)/', html):
        pid = m.group(1)
        if pid not in seen:
            seen.add(pid)
            ids.append(pid)
        if len(ids) >= want:
            break

    for pid in ids:
        print('%-10s https://www.pexels.com/photo/%s/' % (pid, pid))
    if not ids:
        print('no results - try two plain words')
    return ids


# The search page needs browser navigation headers (above), but reusing them
# for the image GET advertises `image/avif` and the CDN content-negotiates:
# every "jpeg" comes back as AVIF with a .jpg name. Recent Pillow reads AVIF, so
# a contact sheet looks perfect and nothing complains - but Metro cannot bundle
# it, and the failure surfaces at `expo export`, long after the asset was
# chosen. Ask for JPEG here, and transcode anything that still is not one.
IMG_HEADERS = dict(HEADERS, Accept='image/jpeg,image/png;q=0.9,*/*;q=0.5')


def _as_jpeg(data, dest):
    """Write JPEG bytes, transcoding if the CDN ignored the Accept header."""
    if data[:2] == b'\xff\xd8':            # already JPEG
        with open(dest, 'wb') as fh:
            fh.write(data)
        return 'jpeg'
    import io as _io

    from PIL import Image
    im = Image.open(_io.BytesIO(data))
    fmt = im.format
    im.convert('RGB').save(dest, 'JPEG', quality=92)
    return '%s->jpeg' % (fmt or '?').lower()


def get(pid, dest):
    os.makedirs(os.path.dirname(dest) or '.', exist_ok=True)
    req = urllib.request.Request(CDN % (pid, pid), headers=IMG_HEADERS)
    with urllib.request.urlopen(req, timeout=45) as r:
        data = r.read()
    if len(data) < 8000:
        print('%s: suspiciously small (%d bytes), not saved' % (pid, len(data)))
        return False
    try:
        how = _as_jpeg(data, dest)
    except Exception as e:
        print('%s: not a decodable image (%s)' % (pid, e))
        return False
    print('%s -> %s (%d KB, %s)' % (pid, dest, os.path.getsize(dest) // 1024, how))
    return True


def sheet(paths, out):
    from PIL import Image, ImageDraw

    files = []
    for p in paths:
        files.extend(sorted(glob.glob(p)))
    if not files:
        print('no files matched')
        return

    cell, cols = 240, 4
    rows = (len(files) + cols - 1) // cols
    img = Image.new('RGB', (cols * cell, rows * (cell + 18)), 'white')
    d = ImageDraw.Draw(img)
    for i, f in enumerate(files):
        im = Image.open(f).convert('RGB')
        im.thumbnail((cell, cell))
        x, y = (i % cols) * cell, (i // cols) * (cell + 18)
        img.paste(im, (x, y))
        d.text((x + 3, y + cell + 3), os.path.basename(f)[:30], fill='black')
    img.save(out)
    print('%d frames -> %s' % (len(files), out))


if __name__ == '__main__':
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    cmd = sys.argv[1]
    if cmd == 'search':
        search(sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 12)
    elif cmd == 'get':
        get(sys.argv[2], sys.argv[3])
    elif cmd == 'sheet':
        sheet(sys.argv[2:-1], sys.argv[-1])
    else:
        raise SystemExit(__doc__)
