"""
Bake the GlobeGo board's photography.

    python tools/bake/globe.py

Sources are free-licensed Pexels frames in `tools/bake/sources/globe/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Places are photographs** (I4, §2.5): a coastline is a picture *of* somewhere,
and drawing one would be tracing an arrangement rather than expressing an idea.

**One of the board's own mistakes is fixed here** (I1): its detail screen is
headed "Lake Como" over a photograph of Venice. The hero baked for `globestay`
is a lake under mountains, so the picture and the name agree (R9).

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'globe')
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
    crop.save(path, 'JPEG', quality=86, optimize=True)
    print('%-28s %dx%d' % (dest, tw, th))


JOBS = [
    # globestart — the full-bleed coast.
    ('17807444', (0.18, 0.00, 0.82, 1.00), (900, 1950), 'globestart/hero.jpg'),

    # globehome — three region chips and three destination cards.
    ('26946364', (0.10, 0.10, 0.90, 0.90), (120, 120), 'globehome/r-asia.jpg'),
    ('17855614', (0.10, 0.10, 0.90, 0.90), (120, 120), 'globehome/r-europe.jpg'),
    ('1461370', (0.10, 0.10, 0.90, 0.90), (120, 120), 'globehome/r-america.jpg'),
    ('17855614', (0.02, 0.04, 0.98, 0.96), (760, 520), 'globehome/d1.jpg'),
    ('17034836', (0.02, 0.04, 0.98, 0.96), (760, 520), 'globehome/d2.jpg'),
    ('26946364', (0.02, 0.04, 0.98, 0.96), (760, 520), 'globehome/d3.jpg'),

    # globestay — the hero, which is a lake under mountains so that the
    # picture agrees with the name above it.
    ('35431569', (0.00, 0.00, 1.00, 1.00), (900, 980), 'globestay/hero.jpg'),
    ('28267238', (0.06, 0.06, 0.94, 0.94), (240, 180), 'globestay/s1.jpg'),
    ('29172648', (0.06, 0.06, 0.94, 0.94), (240, 180), 'globestay/s2.jpg'),
    ('17807444', (0.20, 0.10, 0.80, 0.90), (240, 180), 'globestay/s3.jpg'),
]


if __name__ == '__main__':
    for job in JOBS:
        cut(*job)
