"""
Bake the WanderWise board's photography (onboarding-app/02).

    python tools/bake/wise.py

Sources are free-licensed Pexels frames in `tools/bake/sources/wise/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Places are photographs** (I4): a city is a picture *of* somewhere. The
board's flags are emoji, which differ across Windows / Android / iOS and are
missing entirely on Windows (I8) - so each flag here is a drawn disc, which
RULES SS2.5 lists as in range.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF - it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'wise')
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
    # wisetrip - the trip card at the top of the collage.
    ('p-27118624', (0.04, 0.10, 0.96, 0.92), (420, 320), 'wisetrip/trip.jpg'),

    # wiseplaces - three places on the route.
    ('p-32014789', (0.06, 0.06, 0.94, 0.94), (360, 300), 'wiseplaces/p1.jpg'),
    ('p-30970845', (0.06, 0.04, 0.94, 0.96), (360, 300), 'wiseplaces/p2.jpg'),
    ('p-40061432', (0.04, 0.06, 0.96, 0.94), (360, 300), 'wiseplaces/p3.jpg'),
]

SQUARES = [
    # wisetrip - two faces on the collage.
    ('p-31052395', 0.50, 0.40, 0.82, (120, 120), 'wisetrip/f1.jpg'),
    ('p-35555305', 0.50, 0.30, 0.70, (120, 120), 'wisetrip/f2.jpg'),

    # wisefriends - three friends on the field.
    ('p-31052395', 0.50, 0.40, 0.82, (120, 120), 'wisefriends/f1.jpg'),
    ('p-35555305', 0.50, 0.30, 0.70, (120, 120), 'wisefriends/f2.jpg'),
    ('p-31969127', 0.48, 0.22, 0.52, (120, 120), 'wisefriends/f3.jpg'),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)