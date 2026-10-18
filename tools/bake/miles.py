"""
Bake the miles board's photography.

    python tools/bake/miles.py

The reference scatters 3D renders of food and gadgets over a blue page. Those
cannot be recreated and must not be traced badly (AGENTS.md, "A 3D render in
the shot"), so each one is stood in for by a free-licensed photograph cut off
its backdrop — a burger, a coffee cup, a pair of hot dogs, a pair of game
controllers. A burger is a specific subject and squarely out of drawing range;
the arrows, chips and wordmarks around them are drawn.

Each cut is a flood fill from the border with a feathered alpha. The
tolerances below were chosen by looking at the result on the page's own blue,
not by reading the border statistics: a seamless studio sweep reads as a low
standard deviation, but a *flat colour* backdrop reads as a high one and cuts
perfectly anyway.

The dining card's photograph is not cut. It fills a card, so it is a crop.
"""

import os
import subprocess
import sys

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')
CUT = os.path.join(os.path.dirname(__file__), 'cutout.py')

# (source id, tolerance, the part of the cut-out to keep, in its own fractions)
CUTS = {
    'burger': ('9207184', 40, (0.0, 0.31, 1.0, 0.63)),
    'cup': ('9878735', 45, (0.0, 0.0, 1.0, 1.0)),
    'hotdog': ('29476591', 52, (0.0, 0.0, 1.0, 1.0)),
    'pad': ('3945657', 22, (0.0, 0.0, 1.0, 1.0)),
}

# Which cut-out goes to which showcase, and how wide it is drawn, in dp.
PLACED = [
    ('mileshome', 'burger', 96),
    ('mileshome', 'pad', 104),
    ('mileshome', 'hotdog', 104),
    ('milesbrands', 'pad', 172),
    ('milesbrands', 'burger', 148),
    ('milesbrands', 'hotdog', 156),
]

# (slug, name, source id, output size, crop centre in source fractions)
CROPS = [
    ('mileshome', 'dining.jpg', '19141541', (640, 680), (0.5, 0.5)),
]

SCALE = 3


def cut(name):
    pid, tol, box = CUTS[name]
    tmp = os.path.join(SRC, '_cut-miles-%s.png' % name)
    subprocess.run(
        [sys.executable, CUT, os.path.join(SRC, 'miles-%s.jpg' % pid), tmp,
         '--tol', str(tol), '--close', '7', '--trim', '--width', '900'],
        check=True,
    )
    im = Image.open(tmp).convert('RGBA')
    w, h = im.size
    im = im.crop((round(w * box[0]), round(h * box[1]), round(w * box[2]), round(h * box[3])))
    # Trim again: the crop usually leaves a band of empty alpha down one side.
    bbox = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    return im.crop(bbox) if bbox else im


def main():
    cuts = {}
    for slug, name, dp in PLACED:
        if name not in cuts:
            cuts[name] = cut(name)
        im = cuts[name]
        w = dp * SCALE
        h = round(im.height * w / im.width)
        out_dir = os.path.join(ROOT, 'assets', 'images', slug)
        os.makedirs(out_dir, exist_ok=True)
        im.resize((w, h), Image.LANCZOS).save(os.path.join(out_dir, '%s.png' % name), optimize=True)
        print('%s/%s.png  %dx%d' % (slug, name, w, h))

    for slug, name, pid, size, centre in CROPS:
        im = Image.open(os.path.join(SRC, 'miles-%s.jpg' % pid)).convert('RGB')
        w, h = im.size
        scale = max(size[0] / w, size[1] / h)
        box_w, box_h = size[0] / scale, size[1] / scale
        x = min(max(centre[0] * w - box_w / 2, 0), w - box_w)
        y = min(max(centre[1] * h - box_h / 2, 0), h - box_h)
        out_dir = os.path.join(ROOT, 'assets', 'images', slug)
        os.makedirs(out_dir, exist_ok=True)
        im.crop((round(x), round(y), round(x + box_w), round(y + box_h))).resize(
            size, Image.LANCZOS
        ).save(os.path.join(out_dir, name), quality=88, optimize=True)
        print('%s/%s  %dx%d' % (slug, name, *size))


if __name__ == '__main__':
    main()
