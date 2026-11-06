"""Bake Wander's photography for its three showcases.

    python tools/bake/wander.py

**The category tiles are photographs.** Beaches / Old towns / Fjords under a
travel app's search bar is three pictures in every real one of those apps, and
drawing them in SVG produces a row of cartoons where the design had places.
That rule has been learned here the expensive way once already.

The reference's cabin is an AI render; this is a real lake cabin, which is
what the app would actually ship.

Sources (Pexels, free to use):
  12365967  cabin on a lake      -> cabin / stay hero
  4784988   aerial beach         -> Beaches tile, thumb
  15887091  lanterns, old street -> Old towns tile
  33695268  fjord from the air   -> Fjords tile, thumb
  30641513  night street         -> the "+8" thumb
  31868676  portrait             -> Maya
"""

import os

from PIL import Image

SRC = 'tools/bake/sources/wander'
HOME = 'assets/images/wanderhome'
STAY = 'assets/images/wanderstay'
TRIPS = 'assets/images/wandertrips'


def cover(im, w, h, focus=0.5):
    scale = max(w / im.width, h / im.height)
    nw, nh = max(w, int(im.width * scale + 0.5)), max(h, int(im.height * scale + 0.5))
    im = im.resize((nw, nh), Image.LANCZOS)
    x = (nw - w) // 2
    y = int((nh - h) * focus)
    return im.crop((x, y, x + w, y + h))


def face(path, size=132):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * 0.6)
    box = (w // 2 - side // 2, int(h * 0.06), w // 2 + side // 2, int(h * 0.06) + side)
    if box[3] > h:
        box = (box[0], 0, box[2], side)
    return cover(im.crop(box), size, size)


def main():
    for d in (HOME, STAY, TRIPS):
        os.makedirs(d, exist_ok=True)

    cabin = Image.open(os.path.join(SRC, 'cabin-12365967.jpg')).convert('RGB')
    # 341x234dp on the home card, full bleed at 393x430dp on the stay screen.
    cover(cabin, 1023, 702).save(os.path.join(HOME, 'cabin.jpg'), quality=86)
    cover(cabin, 1179, 1320, focus=0.48).save(os.path.join(STAY, 'hero.jpg'), quality=84)

    tiles = (
        ('beach-4784988.jpg', 'beaches.jpg'),
        ('town-15887091.jpg', 'towns.jpg'),
        ('fjord-33695268.jpg', 'fjords.jpg'),
    )
    for src, out in tiles:
        im = Image.open(os.path.join(SRC, src)).convert('RGB')
        cover(im, 318, 438).save(os.path.join(HOME, out), quality=86)

    thumbs = (
        ('fjord-33695268.jpg', 'thumb1.jpg'),
        ('beach-4784988.jpg', 'thumb2.jpg'),
        ('town-30641513.jpg', 'thumb3.jpg'),
    )
    for src, out in thumbs:
        im = Image.open(os.path.join(SRC, src)).convert('RGB')
        cover(im, 168, 168).save(os.path.join(STAY, out), quality=86)

    portrait = os.path.join(SRC, 'p-31868676.jpg')
    face(portrait).save(os.path.join(HOME, 'maya.jpg'), quality=90)
    face(portrait).save(os.path.join(TRIPS, 'maya.jpg'), quality=90)

    for d in (HOME, STAY, TRIPS):
        for f in sorted(os.listdir(d)):
            if f.endswith('.jpg'):
                print(d + '/' + f, Image.open(os.path.join(d, f)).size)


if __name__ == '__main__':
    main()
