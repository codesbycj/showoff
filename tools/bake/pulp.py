"""
Bake the Pulp board's photography (food/22).

    python tools/bake/pulp.py

Sources are free-licensed Pexels frames in `tools/bake/sources/pulp/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Drinks and faces are photographs** (I4). The board's own bottles carry a
printed label, so the frames chosen here are unlabelled pressed-juice bottles -
the product without somebody else's brand on it.

**The tracking screen's map is drawn, not photographed.** A map has no idea to
interpret, so vectoring one is tracing it path by path; what is built instead
is the map *idea* - a route line, a pickup pin, a destination marker and a
radius ring over a flat ground (I4). Nothing in this file feeds that screen
except the courier's face.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'pulp')
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
    # pulpitem - the bottle the product screen is about.
    ('p-4443487', (0.30, 0.12, 0.78, 0.92), (720, 820), 'pulpitem/hero.jpg'),

    # pulphome - the bottle cards.
    ('p-4443434', (0.08, 0.06, 0.92, 0.94), (720, 500), 'pulphome/b1.jpg'),
    ('p-4443487', (0.06, 0.06, 0.94, 0.94), (720, 500), 'pulphome/b2.jpg'),
    ('p-16096610', (0.04, 0.04, 0.96, 0.96), (720, 500), 'pulphome/b3.jpg'),
]

SQUARES = [
    # pulphome - the greeting avatar.
    ('p-39598425', 0.46, 0.34, 0.44, (140, 140), 'pulphome/me.jpg'),

    # pulpitem - the nutrition strip's small product thumbnails.

    # pulptrack - the courier. The map itself is drawn, not photographed.
    ('p-6248741', 0.50, 0.33, 0.40, (140, 140), 'pulptrack/courier.jpg'),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)
