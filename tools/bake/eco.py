"""
Bake the Eco Bites board's photography.

    python tools/bake/eco.py

Two kinds of asset.

**The pack** is the same blank stand-up pouch the Treats board uses, duotoned
into this brand's green and apricot. Duotone rather than a cut-out: the pouch
is white against a pale grey sweep, which is the one contrast a flood fill
cannot find, and the reference's packs sit on a tinted panel anyway. The pack
is blank on purpose — the brand's own name goes on it as drawn type in the
component, which is the split AGENTS.md asks for.

**The bites** are a real photograph cut off a marble sweep. A snack is a
specific object and out of drawing range; a vector of one comes out a cartoon.

Sources are free-licensed Pexels photographs; the ids are credited in each
showcase's `CREDITS.md`.
"""

import os
import subprocess
import sys

import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')
CUT = os.path.join(os.path.dirname(__file__), 'cutout.py')

PACK_SRC = 'treats-12024976.jpg'
# The left-hand pouch, with a third of a frame of empty sweep beside it. That
# empty side is where the panel's own type goes.
PACK_BOX = (0.10, 0.04, 0.60, 0.99)

TONES = {
    'leaf': ((0x32, 0x46, 0x08), (0xe8, 0xf1, 0xc9)),
    'apricot': ((0x8a, 0x3a, 0x12), (0xfb, 0xe2, 0xcf)),
    'cream': ((0x4a, 0x4a, 0x2c), (0xf8, 0xf8, 0xeb)),
}

# (slug, name, tone, size) -- 3x the drawn slot.
PACKS = [
    ('ecostart', 'pack.jpg', 'leaf', (900, 1140)),
    ('ecoshop', 'pack-leaf.jpg', 'leaf', (660, 560)),
    ('ecoshop', 'pack-apricot.jpg', 'apricot', (660, 560)),
    ('ecodetail', 'pack.jpg', 'leaf', (1035, 840)),
]

# (slug, name, width in dp)
BITES = [
    ('ecostart', 'bites.png', 150),
    ('ecoshop', 'bites.png', 120),
    ('ecodetail', 'bites.png', 130),
]

SCALE = 3


def duotone(im, shadow, highlight):
    a = np.asarray(im.convert('RGB')).astype(np.float64)
    lum = (a @ np.array([0.299, 0.587, 0.114])) / 255.0
    lo, hi = np.percentile(lum, 1.5), np.percentile(lum, 99.0)
    lum = np.clip((lum - lo) / max(hi - lo, 1e-6), 0, 1) ** 1.25
    out = np.empty_like(a)
    for c in range(3):
        out[:, :, c] = shadow[c] + (highlight[c] - shadow[c]) * lum
    return Image.fromarray(out.clip(0, 255).astype(np.uint8))


def cover(im, size):
    tw, th = size
    w, h = im.size
    scale = max(tw / w, th / h)
    box_w, box_h = tw / scale, th / scale
    left, top = (w - box_w) / 2, (h - box_h) / 2
    return im.crop((round(left), round(top), round(left + box_w), round(top + box_h))).resize(
        (tw, th), Image.LANCZOS
    )


def main():
    pack = Image.open(os.path.join(SRC, PACK_SRC)).convert('RGB')
    w, h = pack.size
    pack = pack.crop(
        (round(w * PACK_BOX[0]), round(h * PACK_BOX[1]), round(w * PACK_BOX[2]), round(h * PACK_BOX[3]))
    )

    for slug, name, tone, size in PACKS:
        out_dir = os.path.join(ROOT, 'assets', 'images', slug)
        os.makedirs(out_dir, exist_ok=True)
        cover(duotone(pack, *TONES[tone]), size).save(
            os.path.join(out_dir, name), quality=88, optimize=True
        )
        print('%s/%s  %dx%d' % (slug, name, *size))

    tmp = os.path.join(SRC, '_cut-eco-bites.png')
    subprocess.run(
        [sys.executable, CUT, os.path.join(SRC, 'eco-5848187.jpg'), tmp,
         '--tol', '40', '--close', '9', '--trim', '--width', '900'],
        check=True,
    )
    bites = Image.open(tmp).convert('RGBA')

    for slug, name, dp in BITES:
        out_dir = os.path.join(ROOT, 'assets', 'images', slug)
        os.makedirs(out_dir, exist_ok=True)
        tw = dp * SCALE
        th = round(bites.height * tw / bites.width)
        bites.resize((tw, th), Image.LANCZOS).save(os.path.join(out_dir, name), optimize=True)
        print('%s/%s  %dx%d' % (slug, name, tw, th))


if __name__ == '__main__':
    main()
