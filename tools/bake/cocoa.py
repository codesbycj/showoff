"""
Bake the Cocoa board's photography (ecommerce-app/30).

    python tools/bake/cocoa.py

Sources are free-licensed Pexels frames in `tools/bake/sources/cocoa/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Snacks are photographs** (I4). The board sells two real brands by name and
shows their packaging on every card; loose product on a plain ground keeps the
shop's plot without shipping another brand's mark, and it is the trade RULES
SS2.5 calls changing the subject rather than drawing it badly.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'cocoa')
OUT = os.path.join('assets', 'images')


def _save(crop, size, dest):
    tw, th = size
    scale = max(tw / crop.width, th / crop.height)
    crop = crop.resize((max(1, round(crop.width * scale)), max(1, round(crop.height * scale))),
                       Image.LANCZOS)
    left = int((crop.width - tw) / 2)
    top = int((crop.height - th) / 2)
    crop = crop.crop((left, top, left + tw, top + th))

    path = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    crop.save(path, 'JPEG', quality=88, optimize=True)
    print('%-28s %dx%d' % (dest, tw, th))


def cut(pid, box, size, dest):
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    x0, y0, x1, y1 = box
    _save(im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1))), size, dest)


def square(pid, cx, cy, frac, size, dest):
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * frac)
    x = max(0, min(int(w * cx - side / 2), w - side))
    y = max(0, min(int(h * cy - side / 2), h - side))
    _save(im.crop((x, y, x + side, y + side)), size, dest)


CUTS = [
    # cocoahome - the collection cards.
    ('p-4113350', (0.04, 0.04, 0.96, 0.96), (560, 620), 'cocoahome/c1.jpg'),
    ('p-3986706', (0.04, 0.04, 0.96, 0.96), (560, 620), 'cocoahome/c2.jpg'),
    ('p-8927931', (0.06, 0.06, 0.94, 0.94), (560, 620), 'cocoahome/c3.jpg'),

    # cocoaitem - the product, large.
    ('p-3986706', (0.02, 0.02, 0.98, 0.98), (780, 860), 'cocoaitem/hero.jpg'),
]

SQUARES = [
    # cocoahome - the account face in the pinned cart bar.
    ('p-5469117', 0.42, 0.34, 0.42, (120, 120), 'cocoahome/me.jpg'),

    # cocoacart - the three line thumbnails and the totals card.
    ('p-4113345', 0.50, 0.50, 0.80, (200, 200), 'cocoacart/l1.jpg'),
    ('p-9615877', 0.50, 0.50, 0.84, (200, 200), 'cocoacart/l2.jpg'),
    ('p-3986706', 0.48, 0.52, 0.76, (200, 200), 'cocoacart/l3.jpg'),
    ('p-33084665', 0.56, 0.36, 0.58, (220, 220), 'cocoacart/t1.jpg'),

    # cocoaitem - the variant thumbnails.
    ('p-4113350', 0.36, 0.42, 0.44, (180, 180), 'cocoaitem/v1.jpg'),
    ('p-35846638', 0.42, 0.48, 0.52, (180, 180), 'cocoaitem/v2.jpg'),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)
