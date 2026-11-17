"""
Bake the Alpenroute board's photography (travel-app/02).

    python tools/bake/alpen.py

Sources are free-licensed Pexels frames in `tools/bake/sources/alpen/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Places and interiors are photographs** (I4): a valley is a picture *of*
somewhere. The board's flags are emoji, which differ across Windows / Android
/ iOS and are missing entirely on Windows (I8) - so each flag is a drawn disc,
which RULES SS2.5 lists as in range.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF - it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'alpen')
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
    # alpenfly - the route card's ground.
    ('p-38486095', (0.04, 0.10, 0.96, 0.90), (760, 360), 'alpenfly/route.jpg'),

    # alpenstay - the gallery.
    ('p-30835932', (0.02, 0.02, 0.98, 0.98), (900, 820), 'alpenstay/g1.jpg'),
    ('p-34496701', (0.04, 0.04, 0.96, 0.96), (900, 820), 'alpenstay/g2.jpg'),
    ('q-16641324', (0.02, 0.02, 0.98, 0.98), (900, 820), 'alpenstay/g3.jpg'),

    # alpenpick - four destinations.
    ('p-34666834', (0.04, 0.04, 0.96, 0.96), (480, 560), 'alpenpick/d1.jpg'),
    ('p-33391683', (0.04, 0.06, 0.96, 0.94), (480, 560), 'alpenpick/d2.jpg'),
    ('p-35671454', (0.04, 0.06, 0.96, 0.94), (480, 560), 'alpenpick/d3.jpg'),
    ('p-27981933', (0.04, 0.04, 0.96, 0.96), (480, 560), 'alpenpick/d4.jpg'),
]

SQUARES = []


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)