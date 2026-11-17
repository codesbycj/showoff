"""
Bake the Flowan board's photography (health/02 and health/03).

    python tools/bake/flow.py

Sources are free-licensed Pexels frames in `tools/bake/sources/flow/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**The board draws its people and its food as flat illustration.** An
illustration of a woman is still a picture *of* a woman, and reproducing that
particular drawing is reproducing an arrangement rather than expressing an
idea - which is what I4 puts out of range. So the subject is kept and the
medium changes: free-licensed photography of the same subjects, which is what
the real app would ship.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF - it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'flow')
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
    # flowstart - the full-bleed hero.
    ('p-4558326', (0.04, 0.00, 0.96, 1.00), (900, 1300), 'flowstart/hero.jpg'),

    # flowhome - the phase card and the session thumbnail.
    ('p-3757376', (0.06, 0.04, 0.94, 0.96), (760, 420), 'flowhome/phase.jpg'),
    ('p-3822454', (0.10, 0.06, 0.90, 0.94), (300, 300), 'flowhome/session.jpg'),

    # flowtrain - the exercise.
    ('p-3757376', (0.08, 0.00, 0.92, 1.00), (900, 900), 'flowtrain/hero.jpg'),

    # flowmeals - the hero meal and three more.
    ('p-14864289', (0.04, 0.04, 0.96, 0.96), (820, 480), 'flowmeals/m1.jpg'),
    ('p-28909422', (0.08, 0.04, 0.92, 0.96), (420, 320), 'flowmeals/m2.jpg'),
    ('p-15913466', (0.06, 0.04, 0.94, 0.96), (420, 320), 'flowmeals/m3.jpg'),
    ('p-3035261', (0.08, 0.06, 0.92, 0.94), (420, 320), 'flowmeals/m4.jpg'),

    # flowrecipe - the dish.
    ('p-15913466', (0.02, 0.02, 0.98, 0.98), (900, 760), 'flowrecipe/hero.jpg'),
]

SQUARES = [
    # The account's own face, on both tabs that greet her.
    ('p-35555305', 0.50, 0.30, 0.70, (130, 130), 'flowhome/me.jpg'),
    ('p-35555305', 0.50, 0.30, 0.70, (130, 130), 'flowmeals/me.jpg'),
]

if __name__ == "__main__":
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)
