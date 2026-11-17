"""
Bake the Tamarran board's photography.

    python tools/bake/tamar.py

Sources are free-licensed Pexels frames in `tools/bake/sources/tamar/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**The crops are chosen to exclude other brands' marks** (RULES Step 5), and two
candidates were rejected outright for carrying them:

  * Pexels 16996376 — a circular club crest on the tank top, dead centre of the
    frame, unavoidable in any crop that keeps the subject.
  * The board's own hero wears a Nike swoosh and a printed wordmark.

Pexels 4720777 is used instead, cropped above the barbell: its bumper plates
carry "EASTWEST" cast into the rubber, and the crop stops before them.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'tamar')
OUT = os.path.join('assets', 'images')


def cut(pid, box, size, dest, ax=0.5, ay=0.5):
    """Crop `box` (fractions of w/h) out of a source and cover-fit it.

    `ax`/`ay` say where the cover-fit trims from: 0 keeps the left/top edge,
    1 keeps the right/bottom. A centred trim is what cut the subject's head off
    the first bake of the hero, because the figure stands left of frame.
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
    print('%-32s %dx%d' % (dest, tw, th))


JOBS = [
    # tamarstart — full bleed. Stops above the lettered bumper plates, and
    # trims from the left so the figure keeps its head.
    ('4720777', (0.00, 0.00, 0.86, 0.70), (900, 1950), 'tamarstart/hero.jpg', 0.18, 0.0),

    # tamarfind — the result card's photograph.
    #
    # Pexels 9545914 was rejected here: a Concept2 wordmark on the erg, legible
    # at 1:1 and invisible on a contact sheet, which is why Step 5 says to open
    # every baked frame at full size.
    ('4716814', (0.00, 0.18, 0.62, 0.98), (720, 420), 'tamarfind/gym.jpg'),

    # tamargym — the hero, plus the rail of other shots.
    ('40371849', (0.02, 0.04, 0.98, 0.96), (900, 740), 'tamargym/hero.jpg'),
    ('3916766', (0.04, 0.06, 0.96, 0.94), (240, 200), 'tamargym/s1.jpg'),
    ('40371849', (0.00, 0.10, 0.44, 0.92), (240, 200), 'tamargym/s2.jpg'),
    ('4716814', (0.62, 0.26, 1.00, 0.86), (240, 200), 'tamargym/s3.jpg'),
]


if __name__ == '__main__':
    for job in JOBS:
        cut(*job)
