"""
Bake the Orbit board's photography (fintech/02).

    python tools/bake/sky.py

Sources are free-licensed Pexels frames in `tools/bake/sources/sky/`, credited
per showcase in `assets/images/<slug>/CREDITS.md`.

**Faces are photographs** (I4). The board's quick-send rail, its contact
picker and its activity list are all faces; initials on a coloured disc is a
fallback state, not a substitute, and a screen built from discs is visibly
missing what the board had.

The same six people appear across all three Orbit screens, because they are
the same account's contacts — a different face per screen would be three apps.

`square()` takes a centre and a side as fractions of the frame's shorter edge,
because an avatar is cropped around a head rather than around the frame — and
guessing a head's box out of a thumbnail got it wrong three times on the
previous app.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'orbit')
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


def square(pid, cx, cy, frac, size, dest):
    """Crop a square of `frac` of the shorter edge, centred on (cx, cy)."""
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * frac)
    x = int(w * cx - side / 2)
    y = int(h * cy - side / 2)
    x = max(0, min(x, w - side))
    y = max(0, min(y, h - side))
    _save(im.crop((x, y, x + side, y + side)), size, dest)


JOBS = [
    # The account holder.
    ('p-35555305', 0.50, 0.30, 0.70, (180, 180), 'orbithome/me.jpg'),

    # Five contacts, shared by all three screens.
    ('p-31052395', 0.50, 0.40, 0.82, (160, 160), 'orbithome/c1.jpg'),
    ('p-3228887', 0.47, 0.34, 0.74, (160, 160), 'orbithome/c2.jpg'),
    ('p-31969127', 0.48, 0.22, 0.52, (160, 160), 'orbithome/c3.jpg'),
    ('q-19999456', 0.55, 0.32, 0.75, (160, 160), 'orbithome/c4.jpg'),
    ('p-8171180', 0.30, 0.42, 0.62, (160, 160), 'orbithome/c5.jpg'),

    ('p-31052395', 0.50, 0.40, 0.82, (160, 160), 'orbitsend/c1.jpg'),
    ('p-3228887', 0.47, 0.34, 0.74, (160, 160), 'orbitsend/c2.jpg'),
    ('p-31969127', 0.48, 0.22, 0.52, (160, 160), 'orbitsend/c3.jpg'),
    ('q-19999456', 0.55, 0.32, 0.75, (160, 160), 'orbitsend/c4.jpg'),
    ('p-8171180', 0.30, 0.42, 0.62, (160, 160), 'orbitsend/c5.jpg'),

    ('p-31052395', 0.50, 0.40, 0.82, (160, 160), 'orbitchart/c1.jpg'),
    ('p-3228887', 0.47, 0.34, 0.74, (160, 160), 'orbitchart/c2.jpg'),
    ('p-31969127', 0.48, 0.22, 0.52, (160, 160), 'orbitchart/c3.jpg'),
    ('q-19999456', 0.55, 0.32, 0.75, (160, 160), 'orbitchart/c4.jpg'),
]


if __name__ == '__main__':
    for job in JOBS:
        square(*job)
