"""
Bake the Nordvik board's photography (booking-app/02).

    python tools/bake/nord.py

Sources are free-licensed Pexels frames in `tools/bake/sources/nord/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Places and interiors are photographs** (I4): a cabin above a fjord is a
picture *of* somewhere, and drawing one would be reproducing an arrangement
rather than expressing an idea. The board's own hero is a glass dome lodge
under a storm; no free-licensed frame of that exists, so the subject is kept —
a lit timber lodge after dark — and the plot of the screen is unchanged.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'nord')
OUT = os.path.join('assets', 'images')


def cut(pid, box, size, dest, ax=0.5, ay=0.5):
    """Crop `box` (fractions of w/h) out of a source and cover-fit it."""
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
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
    crop.save(path, 'JPEG', quality=86, optimize=True)
    print('%-28s %dx%d' % (dest, tw, th))


JOBS = [
    # nordhome - the header lodge, three stays on the rail, three places.
    ('q-35864634', (0.00, 0.08, 1.00, 0.95), (900, 700), 'nordhome/hero.jpg'),
    ('p-1612351', (0.10, 0.05, 0.90, 0.95), (700, 470), 'nordhome/s1.jpg'),
    ('p-5644485', (0.05, 0.05, 0.95, 0.95), (700, 470), 'nordhome/s2.jpg'),
    ('p-4406354', (0.02, 0.05, 0.98, 0.95), (700, 470), 'nordhome/s3.jpg'),
    ('p-27667695', (0.05, 0.05, 0.95, 0.95), (360, 430), 'nordhome/d1.jpg'),
    ('p-34666834', (0.05, 0.05, 0.95, 0.95), (360, 430), 'nordhome/d2.jpg'),
    ('p-30876674', (0.05, 0.10, 0.95, 0.95), (360, 430), 'nordhome/d3.jpg'),

    # nordsearch - three results, so the list runs past the frame rather than
    # stopping short of it (I3).
    ('f-8096682', (0.00, 0.02, 1.00, 0.98), (820, 540), 'nordsearch/r1.jpg'),
    ('p-9899838', (0.02, 0.02, 0.98, 0.98), (820, 540), 'nordsearch/r2.jpg'),
    ('q-8251251', (0.02, 0.02, 0.98, 0.98), (820, 540), 'nordsearch/r3.jpg'),

    # nordstay - a four-frame gallery, because the pager counts four dots and
    # R9 says the picture agrees with the numbers.
    ('q-16641324', (0.00, 0.00, 1.00, 1.00), (900, 760), 'nordstay/g1.jpg'),
    ('p-9899838', (0.00, 0.10, 1.00, 1.00), (900, 760), 'nordstay/g2.jpg'),
    ('p-38669503', (0.02, 0.02, 0.98, 0.98), (900, 760), 'nordstay/g3.jpg'),
    ('p-1612351', (0.10, 0.05, 0.90, 0.95), (900, 760), 'nordstay/g4.jpg'),
    ('q-19999456', (0.175, 0.02, 0.925, 0.62), (160, 160), 'nordstay/host.jpg'),
]


if __name__ == '__main__':
    for job in JOBS:
        cut(*job)
