"""
Bake the Delivery board's one photograph.

    python tools/bake/dropolivia.py

A lorry is a large, specific subject and out of drawing range (AGENTS.md,
"Know what is in drawing range"), so the reference's cut-out lorry is stood in
for by a free-licensed photograph. It is a **crop, not a cut-out**: every stock
lorry is photographed on a road, and a flood fill on that backdrop leaves a
halo that would show on every frame of the video. A rounded tile beside the
tracking card is the honest version of the same idea.

The source is credited in `assets/images/dropolivia/CREDITS.md`.
"""

import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')

# The cab, with just enough road and sky to place it.
BOX = (0.02, 0.38, 0.98, 0.78)
SIZE = (480, 300)


def main():
    im = Image.open(os.path.join(SRC, 'dropolivia-12261472.jpg')).convert('RGB')
    w, h = im.size
    crop = im.crop((round(w * BOX[0]), round(h * BOX[1]), round(w * BOX[2]), round(h * BOX[3])))

    scale = max(SIZE[0] / crop.width, SIZE[1] / crop.height)
    box_w, box_h = SIZE[0] / scale, SIZE[1] / scale
    x, y = (crop.width - box_w) / 2, (crop.height - box_h) / 2
    out = crop.crop((round(x), round(y), round(x + box_w), round(y + box_h))).resize(
        SIZE, Image.LANCZOS
    )

    out_dir = os.path.join(ROOT, 'assets', 'images', 'dropolivia')
    os.makedirs(out_dir, exist_ok=True)
    out.save(os.path.join(out_dir, 'truck.jpg'), quality=88, optimize=True)
    print('dropolivia/truck.jpg  %dx%d' % SIZE)


if __name__ == '__main__':
    main()
