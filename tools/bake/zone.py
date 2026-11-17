"""
Bake the Food Zone board's photography.

    python tools/bake/zone.py

Sources are free-licensed Pexels frames in `tools/bake/sources/zone/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**The category tiles are photographs, not drawn icons.** I4: a row of round
tiles reading Burger / Steak / Sea Food is six *photographs*, and drawing them
in SVG produces a row of cartoons where the design had food. That is named in
the rules as the single thing that most makes a screen read as a toy.

**The crops are chosen to exclude other brands' marks** (RULES Step 5). Pexels
27988502 — the hero burger — has a Coca-Cola can at the left of the frame, so
every crop taken from it starts at 26% of the width. The board's own screens
lean on McDonald's marks throughout; none of that is reproduced here.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'zone')
OUT = os.path.join('assets', 'images')


def cut(pid, box, size, dest, ax=0.5, ay=0.5):
    """Crop `box` (fractions of w/h) out of a source and cover-fit it.

    `ax`/`ay` say where the cover-fit trims from: 0 keeps the left/top edge,
    1 keeps the right/bottom.
    """
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
    print('%-30s %dx%d' % (dest, tw, th))


JOBS = [
    # zonestart — the hero. Starts at 26% to clear the Coca-Cola can.
    ('27988502', (0.26, 0.20, 1.00, 0.94), (880, 880), 'zonestart/burger.jpg'),

    # zonehome — the dark header texture, six category tiles, two restaurants.
    ('4735855', (0.00, 0.00, 1.00, 1.00), (900, 520), 'zonehome/texture.jpg'),
    ('27988502', (0.30, 0.26, 1.00, 0.86), (240, 240), 'zonehome/c-burger.jpg'),
    ('28292008', (0.08, 0.10, 0.92, 0.94), (240, 240), 'zonehome/c-steak.jpg'),
    ('8352777', (0.38, 0.10, 0.96, 0.66), (240, 240), 'zonehome/c-sea.jpg'),
    ('18784859', (0.10, 0.08, 0.90, 0.92), (240, 240), 'zonehome/c-dessert.jpg'),
    ('36178132', (0.08, 0.10, 0.92, 0.94), (240, 240), 'zonehome/c-pizza.jpg'),
    ('6864216', (0.08, 0.10, 0.92, 0.94), (240, 240), 'zonehome/c-breakfast.jpg'),
    ('18823960', (0.02, 0.06, 0.98, 0.94), (560, 360), 'zonehome/r1.jpg'),
    ('8585881', (0.02, 0.06, 0.98, 0.94), (560, 360), 'zonehome/r2.jpg'),

    # zonemenu — the banner and the menu grid.
    ('9872916', (0.00, 0.08, 1.00, 0.92), (900, 420), 'zonemenu/banner.jpg'),
    ('36007382', (0.06, 0.10, 0.94, 0.90), (420, 320), 'zonemenu/m1.jpg'),
    ('11710530', (0.06, 0.08, 0.94, 0.92), (420, 320), 'zonemenu/m2.jpg'),
    ('15754939', (0.06, 0.08, 0.94, 0.92), (420, 320), 'zonemenu/m3.jpg'),
    ('11256670', (0.04, 0.08, 0.96, 0.92), (420, 320), 'zonemenu/m4.jpg'),

    # zoneitem — the hero. Same source, same 26% start for the same reason.
    ('27988502', (0.26, 0.14, 1.00, 0.98), (900, 760), 'zoneitem/hero.jpg'),
]


if __name__ == '__main__':
    for job in JOBS:
        cut(*job)
