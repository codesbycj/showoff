"""
Bake the Twirlo board's photography.

    python tools/bake/twirl.py

Sources are free-licensed Pexels frames in `tools/bake/sources/twirl/`,
credited in `assets/images/twirlfeed/CREDITS.md`.

**Faces are photographs and so is food** (I4, §2.5). A stories rail of initials
on coloured discs is a fallback state, not a substitute, and a drawn plate of
food is a cartoon where the design had a photograph.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'twirl')
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
    crop.save(path, 'JPEG', quality=88, optimize=True)
    print('%-28s %dx%d' % (dest, tw, th))


JOBS = [
    # The stories rail, and the two post authors.
    ('2379004', (0.24, 0.04, 0.80, 0.42), (160, 160), 'twirlfeed/me.jpg'),
    ('3228887', (0.22, 0.09, 0.80, 0.53), (160, 160), 'twirlfeed/s1.jpg'),
    ('774909', (0.22, 0.12, 0.84, 0.66), (160, 160), 'twirlfeed/s2.jpg'),
    ('8727434', (0.10, 0.10, 0.74, 0.70), (160, 160), 'twirlfeed/s3.jpg'),
    ('6311668', (0.20, 0.07, 0.84, 0.50), (160, 160), 'twirlfeed/s4.jpg'),
    ('1239291', (0.36, 0.14, 0.68, 0.56), (160, 160), 'twirlfeed/s5.jpg'),
    ('3763188', (0.20, 0.08, 0.84, 0.58), (160, 160), 'twirlfeed/s6.jpg'),

    # The post's collage.
    ('8585881', (0.02, 0.06, 0.98, 0.94), (560, 560), 'twirlfeed/g1.jpg'),
    ('15754939', (0.06, 0.08, 0.94, 0.92), (320, 320), 'twirlfeed/g2.jpg'),
    ('36007382', (0.06, 0.10, 0.94, 0.90), (320, 320), 'twirlfeed/g3.jpg'),
]


if __name__ == '__main__':
    for job in JOBS:
        cut(*job)
