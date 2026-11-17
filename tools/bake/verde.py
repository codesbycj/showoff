"""
Bake the Verdeat board's photography (food/03).

    python tools/bake/verde.py

Sources are free-licensed Pexels frames in `tools/bake/sources/verde/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Food is a photograph, always** (I4). The board draws its category chips as
emoji — a burger, a slice, a pear — which is the exact case I4 calls out: a
chip is a picture *of* something, emoji differ across Windows / Android / iOS
(I8), and drawing them in SVG produces a row of cartoons. Each chip here is a
cropped photograph.

**The board's hero mascot is a 3D render of a laughing fries carton.** A render
cannot be traced and must not be drawn badly (§2.2), so the promo carries a
photograph of fries instead and the brand's own mark does the talking.

**One frame was rejected at 1:1 for another brand's mark** — Pexels 6068717 has
a Coca-Cola bottle beside the pizzas, which no crop that keeps the subject can
lose.

A cut-out was tried for the welcome hero and abandoned: `cutout.py --report`
measured the sky's border deviation at 70 on the red channel, far above the 12
that cuts cleanly, and the honest answer there is a different photograph rather
than a cleverer threshold.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'verde')
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
    # verdestart - the welcome hero.
    ('p-5179783', (0.00, 0.06, 1.00, 0.86), (880, 820), 'verdestart/hero.jpg'),

    # verdehome - the promo and four dishes.
    ('p-15754939', (0.10, 0.10, 0.90, 0.90), (460, 440), 'verdehome/promo.jpg'),
    ('p-36007382', (0.16, 0.30, 0.74, 0.86), (460, 340), 'verdehome/d1.jpg'),
    ('p-37153389', (0.12, 0.10, 0.92, 0.80), (460, 340), 'verdehome/d2.jpg'),
    ('p-33433967', (0.18, 0.34, 0.86, 0.92), (460, 340), 'verdehome/d3.jpg'),
    ('p-16068057', (0.14, 0.06, 0.90, 0.92), (460, 340), 'verdehome/d4.jpg'),

    # verdedish - the plate, and two more frames for the pager.
    ('p-9872916', (0.06, 0.08, 0.94, 0.92), (880, 760), 'verdedish/g1.jpg'),
    ('p-37228289', (0.08, 0.10, 0.92, 0.90), (880, 760), 'verdedish/g2.jpg'),
    ('p-36170557', (0.10, 0.10, 0.90, 0.90), (880, 760), 'verdedish/g3.jpg'),
]

SQUARES = [
    # verdehome - the account, and five category chips. Photographs (I4).
    ('p-31969127', 0.48, 0.22, 0.52, (140, 140), 'verdehome/me.jpg'),
    ('p-9207184', 0.62, 0.22, 0.34, (120, 120), 'verdehome/c-burger.jpg'),
    ('p-37228289', 0.40, 0.46, 0.50, (120, 120), 'verdehome/c-chicken.jpg'),
    ('p-36621206', 0.44, 0.52, 0.56, (120, 120), 'verdehome/c-fruit.jpg'),
    ('p-33433967', 0.44, 0.60, 0.40, (120, 120), 'verdehome/c-pasta.jpg'),
    ('p-7761650', 0.50, 0.26, 0.46, (120, 120), 'verdehome/c-sweet.jpg'),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)
