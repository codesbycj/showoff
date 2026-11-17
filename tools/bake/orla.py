"""
Bake the Orla board's photography (ecommerce-app/39).

    python tools/bake/orla.py

Sources are free-licensed Pexels frames in `tools/bake/sources/orla/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Jewellery is a photograph and so is a hand** (I4). The fitting screen is a
camera surface - a photograph with a frame and a measuring line drawn over it -
which is in range in a way a map never is: the interface is the vector, the
hand is the picture.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'orla')
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
    # orlafind - the carousel cards.
    ('p-2849742', (0.06, 0.04, 0.94, 0.96), (620, 700), 'orlafind/r1.jpg'),
    ('p-28933799', (0.06, 0.06, 0.94, 0.94), (620, 700), 'orlafind/r2.jpg'),
    ('p-11378845', (0.10, 0.08, 0.90, 0.92), (620, 700), 'orlafind/r3.jpg'),

    # orlaring - the ring, large, on its pale ground.
    ('p-2849742', (0.02, 0.02, 0.98, 0.98), (820, 860), 'orlaring/hero.jpg'),

    # orlafit - the hand inside the camera frame.
    ('p-17833396', (0.04, 0.02, 0.96, 0.98), (780, 900), 'orlafit/hand.jpg'),
]

SQUARES = [
    # orlaring - the colour-variant rail.
    ('p-2849742', 0.42, 0.52, 0.34, (120, 120), 'orlaring/v1.jpg'),
    ('p-28933799', 0.44, 0.48, 0.38, (120, 120), 'orlaring/v2.jpg'),
    ('p-11378845', 0.52, 0.44, 0.34, (120, 120), 'orlaring/v3.jpg'),

    # orlafind - the collection face.
    ('p-20838859', 0.50, 0.34, 0.56, (160, 160), 'orlafind/me.jpg'),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)
