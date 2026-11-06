"""Bake Clove's photography: one portrait and two card faces.

    python tools/bake/clove.py

The split the rules ask for: the dock icons, the brand mark, the chevrons and
the chart are drawn, and these three are photographs because they are pictures
*of* something — a person, and two slabs of stone. A marble card face drawn as
a gradient is the "plate of food" mistake at 104dp.

Sources (Pexels, free to use):
  36712860  portrait            -> avatar.jpg
  3872330   portrait            -> avatar2.jpg
  30869927  green marble swirl  -> card-mint.jpg
  6788584   black marble        -> card-onyx.jpg
"""

import os

from PIL import Image

SRC = 'tools/bake/sources/b3'
OUT = 'assets/images/clovehome'


def cover(im, w, h):
    """Fill w x h, centred, without squashing."""
    scale = max(w / im.width, h / im.height)
    nw, nh = max(w, int(im.width * scale + 0.5)), max(h, int(im.height * scale + 0.5))
    im = im.resize((nw, nh), Image.LANCZOS)
    x, y = (nw - w) // 2, (nh - h) // 2
    return im.crop((x, y, x + w, y + h))


def main():
    os.makedirs(OUT, exist_ok=True)

    # The avatar is a 44dp disc, so 132px at 3x. Crop to the face rather than
    # the frame's centre: a centred square on a half-length portrait gives a
    # chest.
    p = Image.open(os.path.join(SRC, 'man-36712860.jpg')).convert('RGB')
    w, h = p.size
    side = int(h * 0.74)
    top = int(h * 0.01)
    box = (w // 2 - side // 2, top, w // 2 + side // 2, top + side)
    cover(p.crop(box), 132, 132).save(os.path.join(OUT, 'avatar.jpg'), quality=92)

    # A second face for the fourth activity row -- the row the reference crops
    # and R1 says to add rather than leave a hole under the list.
    q = Image.open(os.path.join(SRC, 'man-3872330.jpg')).convert('RGB')
    w2, h2 = q.size
    side2 = int(h2 * 0.62)
    box2 = (w2 // 2 - side2 // 2, int(h2 * 0.02), w2 // 2 + side2 // 2, int(h2 * 0.02) + side2)
    cover(q.crop(box2), 132, 132).save(os.path.join(OUT, 'avatar2.jpg'), quality=92)

    # The two card faces are 104x58dp thumbnails, so 312x174 at 3x.
    for src, name in (('marble-30869927.jpg', 'card-mint.jpg'), ('marble-6788584.jpg', 'card-onyx.jpg')):
        im = Image.open(os.path.join(SRC, src)).convert('RGB')
        cover(im, 312, 174).save(os.path.join(OUT, name), quality=90)

    for f in sorted(os.listdir(OUT)):
        if f.endswith('.jpg'):
            print(f, Image.open(os.path.join(OUT, f)).size)


if __name__ == '__main__':
    main()
