"""
Bake the Stride board's photography (fitness-tracker/03).

    python tools/bake/sky.py

Sources are free-licensed Pexels frames in `tools/bake/sources/sky/`, credited
per showcase in `assets/images/<slug>/CREDITS.md`.

**Faces are photographs** (I4). The board puts one face on the app — the
athlete's own avatar, ringed by a streak badge. Everything else on all three
screens is interface and is drawn, including the map: a map is a picture of a
place, so it is built as the map *idea* rather than traced (I4).

`square()` takes a centre and a side as fractions of the frame's shorter edge,
because an avatar is cropped around a head rather than around the frame — and
guessing a head's box out of a thumbnail got it wrong three times on the
previous app.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'stride')
OUT = os.path.join('assets', 'images')


def _save(crop, size, dest):
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


def square(pid, cx, cy, frac, size, dest):
    """Crop a square of `frac` of the shorter edge, centred on (cx, cy)."""
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * frac)
    x = int(w * cx - side / 2)
    y = int(h * cy - side / 2)
    x = max(0, min(x, w - side))
    y = max(0, min(y, h - side))
    _save(im.crop((x, y, x + side, y + side)), size, dest)


JOBS = [
    # stridehome - the athlete.
    ('p-3228887', 0.47, 0.34, 0.74, (140, 140), 'stridehome/me.jpg'),
]


if __name__ == '__main__':
    for job in JOBS:
        square(*job)
