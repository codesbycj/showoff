"""
Bake the Slurp board's photography (food/32).

    python tools/bake/slurp.py

Sources are free-licensed Pexels frames in `tools/bake/sources/slurp/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Food is a photograph** (I4) - a bowl of ramen is a picture *of* a bowl of
ramen, and drawing one produces the cartoon that most makes a screen read as a
toy.

**The three size discs are three crops of the same dish**, not three different
dishes. The board offers Small / Medium / Large of one bowl, so showing three
unrelated bowls would make the control lie about what it selects (R9).

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'slurp')
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


def square(pid, cx, cy, frac, size, dest):
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * frac)
    x = max(0, min(int(w * cx - side / 2), w - side))
    y = max(0, min(int(h * cy - side / 2), h - side))
    _save(im.crop((x, y, x + side, y + side)), size, dest)


CUTS = [
    # slurpdish - the dish itself, over the dark top of the screen.
    ('p-34692771', (0.04, 0.02, 0.96, 0.98), (820, 860), 'slurpdish/hero.jpg'),
]

SQUARES = [
    # slurpdish - Small / Medium / Large, one dish at three crops.
    ('p-4223948', 0.72, 0.62, 0.44, (160, 160), 'slurpdish/s-small.jpg'),
    ('p-4223948', 0.72, 0.62, 0.58, (160, 160), 'slurpdish/s-medium.jpg'),
    ('p-4223948', 0.72, 0.62, 0.72, (160, 160), 'slurpdish/s-large.jpg'),

    # slurpcart - the two line thumbnails.
    ('p-4223948', 0.54, 0.50, 0.80, (220, 220), 'slurpcart/l1.jpg'),
    ('p-28263734', 0.50, 0.48, 0.84, (220, 220), 'slurpcart/l2.jpg'),
    ('p-39273903', 0.52, 0.52, 0.86, (220, 220), 'slurpcart/l3.jpg'),

    # slurppay - the thumbnail beside the order summary.
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)
