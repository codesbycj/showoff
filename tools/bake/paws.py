"""
Bake the Paws board's photography (ecommerce-app/08).

    python tools/bake/paws.py

Sources are free-licensed Pexels frames in `tools/bake/sources/paws/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Animals and food are photographs** (I4): a cat is a picture *of* a cat, and
a row of pet-type chips is four small photographs rather than four drawn
animals — the same rule that makes a category tile a photograph.

**The products are deliberately not packs.** The board sells branded sacks,
and every stock photograph of a pet-food sack carries somebody's label. Loose
food in a plain bowl keeps the shop's plot without shipping another brand's
mark, which is the trade RULES SS2.5 calls changing the subject.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF - it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'paws')
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
    # pawstart - the onboarding photograph.
    ('p-5201246', (0.06, 0.02, 0.94, 0.98), (820, 900), 'pawstart/hero.jpg'),

    # pawsitem - the product, large, on its halo.
    ('p-17888788', (0.02, 0.08, 0.98, 0.94), (760, 760), 'pawsitem/hero.jpg'),
    ('p-17888788', (0.02, 0.10, 0.98, 0.92), (420, 420), 'pawshome/p1.jpg'),
    ('p-17888788', (0.04, 0.14, 0.96, 0.88), (180, 180), 'pawsitem/v1.jpg'),
]

SQUARES = [
    # pawshome - the pet-type chips. Four small photographs, not four drawings.
    ('p-39497325', 0.52, 0.42, 0.62, (120, 120), 'pawshome/c-cat.jpg'),
    ('p-32949053', 0.46, 0.44, 0.70, (120, 120), 'pawshome/c-dog.jpg'),
    ('p-19680232', 0.46, 0.44, 0.60, (120, 120), 'pawshome/c-fish.jpg'),
    ('p-33687499', 0.52, 0.46, 0.62, (120, 120), 'pawshome/c-rabbit.jpg'),

    # pawshome - the popular products and the flash-sale row.
    ('p-8434637', 0.50, 0.52, 0.88, (420, 420), 'pawshome/p2.jpg'),
    ('p-8434635', 0.52, 0.52, 0.84, (420, 420), 'pawshome/p3.jpg'),
    ('p-30070537', 0.46, 0.60, 0.72, (300, 300), 'pawshome/p4.jpg'),

    # pawsitem - the variant thumbnails beside the hero.
    ('p-8434635', 0.52, 0.52, 0.56, (180, 180), 'pawsitem/v2.jpg'),
    ('p-30070537', 0.46, 0.60, 0.52, (180, 180), 'pawsitem/v3.jpg'),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)
