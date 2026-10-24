"""Re-encode the reference's images for the build.

    python tools/bake.py <dumpImgDir>

Rule 0: the images do not change. Rule 10: largest size offered, format kept, re-encode
only to save bytes. So each file is capped at twice the size the reference paints it at
and written as webp. 5.8MB of PNG comes down to about 1.1MB with nothing visible changing.

Two of these were never `<img>` elements. The reference is a Framer site and its hero is
drawn into a **canvas** — a hidden 4320x2700 buffer and a visible 1440x900 one — so the
DOM walk that collects `src`, `srcset`, `<source>` and `background-image` finds nothing.
They were recovered from `performance.getEntriesByType('resource')`, which lists every URL
the page actually fetched whether or not anything in the DOM still points at it.
"""

import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'src', 'assets', 'img')

# (source, name, long-edge cap) — the cap is 2x the painted size from dom.json.
PLAN = [
    # hero: canvas-drawn, recovered from the resource timing list
    ('JMlFxkbPdV16dtqSqtwzOcRoCZs.png', 'hero', 2400),
    ('eJz6nSHKQGwj2a2fxzK5jYek.png', 'atelier', 1200),
    # statement: two 320x487 product frames
    ('E6a7MjNJfTJwoQIGy9vZkAmbo.png', 'frame-1', 760),
    ('1KcvzweNQm6syDDQO50GYtIL1g.png', 'frame-2', 760),
    # three category splits: 864x996 portraits + 200x120 thumbs
    ('Q47VLts0wZHYv6m7pTOGrZXbPQ.png', 'split-1', 1760),
    ('ODQ36qkhe7tR0sipiZD6Nfl5gg.png', 'split-2', 1760),
    ('VUFOdY8DyW3XNyJHXlrjZz3t8w.png', 'split-3', 1760),
    ('dM2O8O1L9vG9OPpdktWUlo5BEH8.png', 'thumb-1', 420),
    ('yXRxnphuCuHdNpribjI8JPEnrQU.png', 'thumb-2', 420),
    ('PglvvWAeYN6FDLuONhirTL5iA.png', 'thumb-3', 420),
    # the two collages
    ('O6XBkcg3hFpjBWW691c6ywRc4.png', 'col-1', 520),
    ('zbbDbXoot8SIyCil65WxCX1VTI.png', 'col-2', 960),
    ('Zhb1XtfWB8pYnL51t1R3B1RzXxE.png', 'col-3', 520),
    ('4ea6FQ9E1U5BMApwsOB29CdxxFE.png', 'col-4', 520),
    ('bPNXTyIDbTqSUMEVHfTFZfqs.png', 'col-5', 520),
    ('dbOxER3vt6fUIxnLYrhjRH4g7c.png', 'col-6', 960),
    ('HKEFVGd6ys7beHYKYOu93dTs14.png', 'col-7', 520),
    ('Lf1OF5PRh9mPBCHe8MYHsdwdFCk.png', 'col-8', 520),
    ('JPj0I8zAAq66MSX9CECf0MVNswg.png', 'col-9', 520),
    # the full-bleed band, and the three product cards
    ('yNfQS5BqrYlLek9BfaoxwXDa8.png', 'band', 2880),
    ('eFXrkl4qlESJbOHCA9QGYFz1EM.png', 'prod-1', 900),
    ('hsTMXWs3WpfG5MLadJe3YzsE.png', 'prod-2', 900),
    ('Bb3g3nAGKNveUeebsFeCdiPcCHI.png', 'prod-3', 900),
]


def main():
    src_dir = sys.argv[1]
    os.makedirs(OUT, exist_ok=True)
    before = total = 0
    for src, name, cap in PLAN:
        path = os.path.join(src_dir, src)
        if not os.path.exists(path):
            print('MISSING %s' % src)
            continue
        before += os.path.getsize(path)
        im = Image.open(path)
        im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
        if max(im.size) > cap:
            r = cap / max(im.size)
            im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
        dest = os.path.join(OUT, name + '.webp')
        im.save(dest, 'WEBP', quality=84, method=6)
        total += os.path.getsize(dest)
        print('%-14s %4dx%-4d %8d' % (name + '.webp', im.width, im.height, os.path.getsize(dest)))
    print('\n%d KB in, %d KB out' % (before // 1024, total // 1024))


if __name__ == '__main__':
    main()
