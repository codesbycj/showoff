"""
Bake the Voltline board's photography (ecommerce-app/02).

    python tools/bake/volt.py

Sources are free-licensed Pexels frames in `tools/bake/sources/volt/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**A category tile is a picture, not an icon** (I4). The board's category row is
five product shots on discs, and drawing them as SVG would produce a row of
cartoons where the design had products — the single thing that most makes a
screen read as a toy.

**Every frame was rejected or kept on a 1:1 look for other brands' marks**, not
on a contact sheet. Rejected here: a case carrying a maker's "G", a watch whose
face is a specific product, a photograph with "iPhone" set in the frame, and a
camera shop sign. The board itself sells a named console and two named phones;
none of that is reproduced (I1).

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'volt')
OUT = os.path.join('assets', 'images')


def _save(crop, size, dest, bg=None):
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
    """Crop `box` (fractions of w/h) out of a source and cover-fit it."""
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    x0, y0, x1, y1 = box
    _save(im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1))), size, dest)


def square(pid, cx, cy, frac, size, dest):
    """Crop a square of `frac` of the shorter edge, centred on (cx, cy)."""
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * frac)
    x = max(0, min(int(w * cx - side / 2), w - side))
    y = max(0, min(int(h * cy - side / 2), h - side))
    _save(im.crop((x, y, x + side, y + side)), size, dest)


CUTS = [
    # volthome - the promo, two flash-sale products.
    ('p-33797659', (0.06, 0.06, 0.94, 0.94), (520, 520), 'volthome/f1.jpg'),
    ('p-1697570', (0.10, 0.04, 0.90, 0.96), (520, 520), 'volthome/f2.jpg'),
    ('p-8858287', (0.04, 0.10, 0.96, 0.90), (520, 520), 'volthome/f3.jpg'),
    ('p-5474290', (0.10, 0.08, 0.98, 0.92), (520, 520), 'volthome/f4.jpg'),

    # voltitem - the gallery.
    ('p-210927', (0.04, 0.04, 0.96, 0.96), (860, 760), 'voltitem/g1.jpg'),
    ('p-3989380', (0.08, 0.02, 0.92, 0.94), (860, 760), 'voltitem/g2.jpg'),
    ('p-6864495', (0.00, 0.18, 0.72, 1.00), (860, 760), 'voltitem/g3.jpg'),

    # voltcart - the line items, square thumbnails.
    ('p-210927', (0.10, 0.08, 0.90, 0.92), (260, 260), 'voltcart/c1.jpg'),
    ('p-1697570', (0.10, 0.04, 0.90, 0.96), (260, 260), 'voltcart/c2.jpg'),
    ('p-33797659', (0.06, 0.06, 0.94, 0.94), (260, 260), 'voltcart/c3.jpg'),
    ('p-5474290', (0.10, 0.08, 0.98, 0.92), (260, 260), 'voltcart/c4.jpg'),
]

SQUARES = [
    # volthome - five category tiles. Photographs, not drawn marks (I4).
    ('p-8866731', 0.50, 0.50, 0.86, (200, 200), 'volthome/c-audio.jpg'),
    ('p-1697570', 0.46, 0.50, 0.80, (200, 200), 'volthome/c-wear.jpg'),
    ('p-5474290', 0.52, 0.52, 0.86, (200, 200), 'volthome/c-laptop.jpg'),
    ('p-29293968', 0.50, 0.50, 0.90, (200, 200), 'volthome/c-camera.jpg'),
    ('p-8858287', 0.52, 0.50, 0.86, (200, 200), 'volthome/c-acc.jpg'),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)
