"""
Bake portrait photographs into a showcase's avatar slots.

    python tools/bake/faces.py <slug> [n]

Copies the first `n` faces from `tools/bake/sources/faces/` into
`assets/images/<slug>/face-1.jpg` ... `face-n.jpg`, square-cropped on the head
and resampled once to 240px — which covers every avatar on these boards, from
a 26dp disc in a stack to a 92dp profile, at 3x.

Why crop here rather than at runtime: React Native's `resizeMode="cover"`
centres the crop, and the centre of a portrait is a chin and a collar. The crop
below takes a square from the top of the frame, nudged down by a fifth of the
slack, which puts the head where a head belongs in an avatar.

The sources are free-licensed Pexels photographs. Each showcase that uses them
credits the ids it bundles in its own `CREDITS.md`, because the photographers
did the work even though the licence does not require it.
"""

import os
import shutil
import sys

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources', 'faces')
SIZE = 240

# The order is fixed so a slug always gets the same faces back when re-baked,
# and so two showcases of the same board can deliberately share a cast.
ORDER = [
    '12311572', '30468665', '26872232', '29852895', '31409070', '38197025',
    '10816007', '31869537', '11091224', '29995581', '30198184', '32844866',
    '7468194', '9092311', '17247995', '39567150', '18466015',
]


def bake(slug, count):
    out = os.path.join(ROOT, 'assets', 'images', slug)
    os.makedirs(out, exist_ok=True)

    for i, pid in enumerate(ORDER[:count], start=1):
        src = os.path.join(SRC, 'face-%s.jpg' % pid)
        im = Image.open(src).convert('RGB')
        w, h = im.size
        side = min(w, h)
        # Square from the top, nudged down by a fifth of the slack: a portrait
        # is framed with the head high, and a centred crop takes the collar.
        top = int((h - side) * 0.2)
        left = (w - side) // 2
        face = im.crop((left, top, left + side, top + side)).resize((SIZE, SIZE), Image.LANCZOS)
        face.save(os.path.join(out, 'face-%d.jpg' % i), quality=86, optimize=True)
        print('face-%d.jpg  <- %s' % (i, pid))

    return ORDER[:count]


if __name__ == '__main__':
    if len(sys.argv) < 2:
        raise SystemExit('usage: faces.py <slug> [n]')
    slug = sys.argv[1]
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 6
    if not os.path.isdir(SRC):
        raise SystemExit('no sources in %s' % SRC)
    ids = bake(slug, n)
    print('baked %d faces for %s' % (len(ids), slug))
    print('ids:', ' '.join(ids))
    shutil.rmtree(os.path.join(ROOT, 'assets', 'images', slug, '__pycache__'), ignore_errors=True)
