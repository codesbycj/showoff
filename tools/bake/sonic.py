"""
Bake the Sonic board's artwork.

    python tools/bake/sonic.py

Sources are free-licensed Pexels frames in `tools/bake/sources/sonic/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**None of the board's own artwork is reproduced.** It uses real album covers
(The Weeknd's *Starboy*, an Eminem sleeve), real artist names and the
SoundCloud wordmark. A rebuild that ships a real record's artwork or a real
service's name is impersonation, so every cover here is free-licensed
photography standing in for a fictional release.

Cover art is a **photograph**, not a drawing (I4): a sleeve is a picture *of*
something, and drawing one produces a cartoon where the design had artwork.

**Checked at 1:1 for other brands' marks** (Step 5). Pexels 16235687 was
rejected for a RODE wordmark across the microphone body, legible at full size
and invisible on a contact sheet.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'sonic')
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
    # sonichome — four square covers and the wide collection card.
    ('7315526', (0.00, 0.04, 1.00, 0.92), (360, 360), 'sonichome/c1.jpg'),
    ('34802062', (0.04, 0.06, 0.96, 0.94), (360, 360), 'sonichome/c2.jpg'),
    ('4218027', (0.04, 0.02, 0.96, 0.96), (360, 360), 'sonichome/c3.jpg'),
    ('7135078', (0.02, 0.04, 0.98, 0.96), (360, 360), 'sonichome/c4.jpg'),
    ('12752471', (0.10, 0.04, 0.96, 0.96), (420, 300), 'sonichome/collection.jpg'),
    ('30608991', (0.04, 0.06, 0.96, 0.94), (200, 200), 'sonichome/p1.jpg'),
    ('15166489', (0.06, 0.06, 0.94, 0.94), (200, 200), 'sonichome/p2.jpg'),
    ('31213674', (0.06, 0.06, 0.94, 0.94), (200, 200), 'sonichome/p3.jpg'),

    # sonicplay — the one big sleeve.
    ('7315526', (0.00, 0.02, 1.00, 0.94), (900, 900), 'sonicplay/cover.jpg'),

    # sonicexplore — three tall tiles and six genre thumbnails.
    ('7315526', (0.00, 0.00, 1.00, 1.00), (420, 580), 'sonicexplore/t1.jpg'),
    ('5605066', (0.00, 0.00, 1.00, 1.00), (420, 580), 'sonicexplore/t2.jpg'),
    ('29300672', (0.00, 0.00, 1.00, 1.00), (420, 580), 'sonicexplore/t3.jpg'),
    ('34802062', (0.08, 0.08, 0.92, 0.92), (200, 200), 'sonicexplore/g1.jpg'),
    ('7135078', (0.06, 0.06, 0.94, 0.94), (200, 200), 'sonicexplore/g2.jpg'),
    ('30608991', (0.06, 0.06, 0.94, 0.94), (200, 200), 'sonicexplore/g3.jpg'),
    ('4218027', (0.10, 0.06, 0.90, 0.94), (200, 200), 'sonicexplore/g4.jpg'),
    ('27508913', (0.10, 0.06, 0.90, 0.94), (200, 200), 'sonicexplore/g5.jpg'),
    ('32589034', (0.30, 0.20, 0.90, 0.86), (200, 200), 'sonicexplore/g6.jpg'),
]


if __name__ == '__main__':
    for job in JOBS:
        cut(*job)
