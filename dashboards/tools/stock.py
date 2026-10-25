"""Fetch a free-licensed photograph for a thing the build must not draw.

    python dashboards/tools/stock.py <outdir> --query "wireless earbuds" \
           --name buds [--size 320] [--pick 0] [--list] [--square]

Why this exists: a dashboard's product thumbnails, category tiles and hero
images are *pictures of things*, and the repo's rule is to draw the interface
and photograph the picture. A line-art earbud in the cell where the reference
has a photograph of an earbud is the same mistake as a drawn burger row -- it
reads as a cartoon where the design had a product.

Source is Wikimedia Commons, because its search API answers without a browser
(the Pexels and Unsplash *websites* return 403 to a plain request, even though
their image CDNs serve fine). Only CC0, public-domain, CC-BY and CC-BY-SA files
are accepted, and every download appends its attribution to CREDITS.md in the
output directory.

`--list` prints the candidates and downloads nothing, which is how you choose
before committing: Commons results for a consumer product are a mix of studio
shots and somebody's desk, and the first hit is often the latter.
"""

import argparse
import io
import json
import os
import sys
import urllib.parse
import urllib.request

API = 'https://commons.wikimedia.org/w/api.php'
UA = 'showoff-dashboards/1.0 (local study build; contact: none)'

OK_LICENCES = ('cc0', 'cc-by', 'cc by', 'public domain', 'pd-', 'attribution')
BAD_LICENCES = ('non-commercial', 'nc-', 'nd-', 'fair use', 'copyright')


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def api(**params):
    params.setdefault('format', 'json')
    params.setdefault('action', 'query')
    return json.loads(get(API + '?' + urllib.parse.urlencode(params)))


def search(query, limit=12):
    res = api(list='search', srsearch=query, srnamespace=6, srlimit=limit)
    return [h['title'] for h in res.get('query', {}).get('search', [])]


def details(titles, width):
    """imageinfo for a batch of File: titles, with licence metadata."""
    out = []
    for i in range(0, len(titles), 10):
        chunk = titles[i : i + 10]
        res = api(
            titles='|'.join(chunk),
            prop='imageinfo',
            iiprop='url|size|extmetadata|mime',
            iiurlwidth=width,
        )
        for page in res.get('query', {}).get('pages', {}).values():
            info = (page.get('imageinfo') or [{}])[0]
            meta = info.get('extmetadata', {})
            out.append(
                {
                    'title': page.get('title', ''),
                    'url': info.get('thumburl') or info.get('url'),
                    'page': info.get('descriptionurl', ''),
                    'mime': info.get('mime', ''),
                    'w': info.get('thumbwidth') or info.get('width') or 0,
                    'h': info.get('thumbheight') or info.get('height') or 0,
                    'licence': (meta.get('LicenseShortName', {}).get('value') or '').strip(),
                    'artist': strip_tags(meta.get('Artist', {}).get('value') or ''),
                }
            )
    return out


def ascii_only(text):
    """The Windows console is cp1252 and a Commons filename often is not.

    Printing a non-ASCII title kills the whole command *after* the download has
    already happened, which is the documented way to leave a half-applied change
    with a traceback on top of it. Everything printed goes through here.
    """
    return text.encode('ascii', 'replace').decode('ascii')


def strip_tags(html):
    out, depth = [], 0
    for ch in html:
        if ch == '<':
            depth += 1
        elif ch == '>':
            depth = max(0, depth - 1)
        elif depth == 0:
            out.append(ch)
    return ' '.join(''.join(out).split())[:80]


def usable(d):
    lic = d['licence'].lower()
    if not d['url'] or not d['mime'].startswith('image/'):
        return False
    if d['mime'] in ('image/svg+xml',):
        return False
    if any(b in lic for b in BAD_LICENCES):
        return False
    return any(ok in lic for ok in OK_LICENCES)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('outdir')
    ap.add_argument('--query', required=True)
    ap.add_argument('--name', required=True, help='output basename, without extension')
    ap.add_argument('--size', type=int, default=320)
    ap.add_argument('--pick', type=int, default=0, help='which candidate to take')
    ap.add_argument('--list', action='store_true', help='print candidates, download nothing')
    ap.add_argument('--where', default='', help='note for CREDITS.md')
    args = ap.parse_args()

    titles = search(args.query)
    if not titles:
        print('no results for ' + args.query)
        return 1

    cands = [d for d in details(titles, args.size * 3) if usable(d)]
    if not cands:
        print('no usably-licensed results for ' + args.query)
        return 1

    if args.list:
        for i, d in enumerate(cands):
            print(
                ascii_only(
                    '%2d  %-52s %5dx%-5d %s'
                    % (i, d['title'][5:57], d['w'], d['h'], d['licence'])
                )
            )
        return 0

    if args.pick >= len(cands):
        print('only %d candidates' % len(cands))
        return 1

    pick = cands[args.pick]
    from PIL import Image

    img = Image.open(io.BytesIO(get(pick['url']))).convert('RGB')

    # Centre square crop, then one resample to the target. Product shots on
    # Commons are mostly landscape with the object centred.
    w, h = img.size
    side = min(w, h)
    img = img.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    img = img.resize((args.size, args.size), Image.LANCZOS)

    os.makedirs(args.outdir, exist_ok=True)
    out = os.path.join(args.outdir, args.name + '.jpg')
    img.save(out, quality=88, optimize=True)

    credits = os.path.join(args.outdir, 'CREDITS.md')
    row = '| `%s.jpg` | [%s](%s) | %s | %s |\n' % (
        args.name,
        pick['title'][5:],
        pick['page'],
        pick['licence'],
        args.where or args.query,
    )
    if not os.path.exists(credits):
        with open(credits, 'w', newline='') as fh:
            fh.write('# image credits\n\n| File | Source | Licence | Where |\n|---|---|---|---|\n')
    with open(credits, 'a', newline='') as fh:
        fh.write(row)

    print(ascii_only('wrote %s  (%s, %s)' % (out, pick['title'][5:], pick['licence'])))
    return 0


if __name__ == '__main__':
    sys.exit(main())
