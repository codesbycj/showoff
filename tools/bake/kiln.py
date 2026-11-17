"""
Bake the Kiln board's photography (ecommerce-app/16).

    python tools/bake/kiln.py

Sources are free-licensed Pexels frames in `tools/bake/sources/kiln/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**The subject was changed, and this is why.** The board is a luxury *watch*
marketplace: Rolex, Patek Philippe, Audemars Piguet and Cartier are in its copy
and on the dial of its photography. Nine stock watch frames were pulled and
checked at 1:1 - the rule's own test, because a contact sheet cannot show a
40px wordmark - and every frame with a usable dial carried a legible mark
(SKAGEN, SEIKO, INDIGLO). The frames that were clean were abstract strap and
case textures that cannot carry a product grid.

RULES SS2.5 covers exactly this: when the subject cannot be had honestly,
**change the subject to one that keeps the app's plot**. The plot here is a
collector's marketplace - an object view, a searchable grid of named pieces
with prices, and a detail page with provenance and a Buy bar. Studio ceramics
keep every one of those and photograph without anybody's mark on them.

Everything is written as JPEG except the object-view cut-out, which needs an
alpha channel to sit on the dark ground.
"""

import os
import subprocess
import sys

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'kiln')
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


def cut(pid, box, size, dest):
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    x0, y0, x1, y1 = box
    _save(im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1))), size, dest)


def lift(pid, dest, box=None, tol=34):
    tmp = os.path.join('.probe', 'cut', 'kiln-lift-%s.png' % pid)
    os.makedirs(os.path.dirname(tmp), exist_ok=True)
    subprocess.run(
        [sys.executable, os.path.join('tools', 'bake', 'cutout.py'),
         os.path.join(SRC, '%s.jpg' % pid), tmp, '--tol', str(tol), '--trim'],
        check=True, capture_output=True,
    )
    im = Image.open(tmp).convert('RGBA')
    if box:
        w, h = im.size
        x0, y0, x1, y1 = box
        im = im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1)))
    path = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'PNG', optimize=True)
    print('%-28s %dx%d  (cut-out)' % (dest, im.width, im.height))


CUTS = [
    # kilnitem - the piece in use, and its thumbnail rail.
    ('p-27589853', (0.04, 0.04, 0.96, 0.96), (820, 760), 'kilnitem/hero.jpg'),
    ('p-39529652', (0.06, 0.06, 0.94, 0.94), (240, 200), 'kilnitem/t1.jpg'),
    ('p-33703946', (0.08, 0.08, 0.92, 0.92), (240, 200), 'kilnitem/t2.jpg'),
    ('p-29287725', (0.08, 0.08, 0.92, 0.92), (240, 200), 'kilnitem/t3.jpg'),
    ('p-38428357', (0.10, 0.10, 0.90, 0.90), (240, 200), 'kilnitem/t4.jpg'),

    # kilnfind - the result grid, two across.
    ('p-33703946', (0.04, 0.04, 0.96, 0.96), (520, 520), 'kilnfind/g1.jpg'),
    ('p-29287725', (0.06, 0.04, 0.94, 0.96), (520, 520), 'kilnfind/g2.jpg'),
    ('p-29286721', (0.06, 0.04, 0.94, 0.96), (520, 520), 'kilnfind/g3.jpg'),
    ('p-29286722', (0.06, 0.06, 0.94, 0.94), (520, 520), 'kilnfind/g4.jpg'),
    ('p-27589853', (0.10, 0.06, 0.90, 0.94), (520, 520), 'kilnfind/g5.jpg'),
    ('p-13575092', (0.08, 0.08, 0.92, 0.92), (520, 520), 'kilnfind/g6.jpg'),
]

LIFTS = [
    # kilnview - the piece alone on the dark ground. The tan strip of studio
    # floor under it is cropped rather than chased with a wider tolerance,
    # which would start eating the glaze.
    ('p-40167789', 'kilnview/piece.png', (0.0, 0.0, 1.0, 0.82)),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for pid, dest, box in LIFTS:
        lift(pid, dest, box)
