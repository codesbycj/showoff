"""
Bake the Vital board's photography.

    python tools/bake/vital.py

Only portraits are needed: the account avatar and the leaderboard faces.
Everything else on this board is interface, so it is drawn (I4).

**Faces are photographs.** §2.5 is explicit: initials on a coloured disc is a
fallback state, not a substitute, and a leaderboard built from them is visibly
missing something the board had.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'vital')
OUT = os.path.join('assets', 'images')


def cut(pid, box, size, dest, ax=0.5, ay=0.5):
    """Crop `box` (fractions of w/h) out of a source and cover-fit it."""
    im = Image.open(os.path.join(SRC, 'p-%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    x0, y0, x1, y1 = box
    crop = im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1)))

    tw, th = size
    scale = max(tw / crop.width, th / crop.height)
    crop = crop.resize((max(1, round(crop.width * scale)), max(1, round(crop.height * scale))),
                       Image.LANCZOS)
    left = int((crop.width - tw) * ax)
    top = int((crop.height - th) * ay)
    crop = crop.crop((left, top, left + tw, top + th))

    path = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    crop.save(path, 'JPEG', quality=90, optimize=True)
    print('%-30s %dx%d' % (dest, tw, th))


JOBS = [
    ('2379004', (0.24, 0.04, 0.80, 0.42), (160, 160), 'vitalday/avatar.jpg'),
    ('774909', (0.22, 0.12, 0.84, 0.66), (160, 160), 'vitalstats/a1.jpg'),
    ('3763188', (0.20, 0.08, 0.84, 0.58), (160, 160), 'vitalstats/a2.jpg'),
    ('8727434', (0.10, 0.10, 0.74, 0.70), (160, 160), 'vitalstats/a3.jpg'),
    ('1239291', (0.36, 0.14, 0.68, 0.56), (160, 160), 'vitalstats/a4.jpg'),
]


if __name__ == '__main__':
    for job in JOBS:
        cut(*job)
