"""
Bake the Kova board's photography (social-media-app/03).

    python tools/bake/kova.py

Sources are free-licensed Pexels frames in `tools/bake/sources/kova/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Faces are photographs** (I4): the board's client cards and its
top-performing posts are both pictures of people, and initials on a disc is a
fallback state rather than a substitute.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF - it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'kova')
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
    # kovahome - three client cards and two upcoming jobs.
    ('q-19999456', (0.16, 0.02, 0.86, 0.72), (340, 420), 'kovahome/c1.jpg'),
    ('p-35555305', (0.10, 0.04, 0.92, 0.76), (340, 420), 'kovahome/c2.jpg'),
    ('p-13469411', (0.08, 0.04, 0.92, 0.80), (340, 420), 'kovahome/c3.jpg'),
    ('p-3727223', (0.06, 0.06, 0.94, 0.94), (560, 360), 'kovahome/u1.jpg'),
    ('p-13202503', (0.06, 0.04, 0.94, 0.96), (560, 360), 'kovahome/u2.jpg'),

    # kovacal - the job on the day that is open.
    ('p-6173932', (0.04, 0.06, 0.96, 0.94), (720, 420), 'kovacal/job.jpg'),

    # kovastats - two top posts.
    ('p-3727223', (0.10, 0.04, 0.90, 0.96), (260, 260), 'kovastats/p1.jpg'),
    ('p-13202503', (0.08, 0.06, 0.92, 0.94), (260, 260), 'kovastats/p2.jpg'),
    ('p-6173932', (0.10, 0.06, 0.90, 0.94), (260, 260), 'kovastats/p3.jpg'),
    ('q-19999456', (0.20, 0.04, 0.80, 0.60), (260, 260), 'kovastats/p4.jpg'),
]

SQUARES = [
    ('p-27641326', 0.52, 0.20, 0.42, (130, 130), 'kovahome/me.jpg'),
    ('p-27641326', 0.52, 0.20, 0.42, (130, 130), 'kovastats/me.jpg'),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)