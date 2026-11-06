"""Bake Huddle's photography for both of its showcases.

    python tools/bake/huddle.py

Huddle is a hangouts app, so almost everything on its screens is a picture
*of* something — a rooftop set, a brewery, a yoga class, five faces. Those are
bitmaps here because they are bitmaps in the real app. The chips, the search
field, the dock and every icon are drawn.

Sources (Pexels, free to use):
  6510338   rooftop acoustic set -> hero (both showcases)
  5532996   brewery              -> beer night
  39505633  yoga in a park       -> sunrise yoga
  1134246 / 30518441 / 37038761 / 8727434 / 3979997  -> faces

**Checked at 1:1 for other brands' marks before use.** The first beer frame
the search returned was a row of taps carrying five real breweries' logos; a
contact sheet is too small to show that, which is why this script prints the
frames it keeps at full size for a look.
"""

import os

from PIL import Image

SRC = 'tools/bake/sources/huddle'
HOME = 'assets/images/huddlehome'
EVENT = 'assets/images/huddleevent'


def cover(im, w, h, focus=0.5):
    """Fill w x h without squashing, biased up or down the frame."""
    scale = max(w / im.width, h / im.height)
    nw, nh = max(w, int(im.width * scale + 0.5)), max(h, int(im.height * scale + 0.5))
    im = im.resize((nw, nh), Image.LANCZOS)
    x = (nw - w) // 2
    y = int((nh - h) * focus)
    return im.crop((x, y, x + w, y + h))


# face5 is the profile avatar at 46dp, so it wants a frame that reads as a
# face at that size; the tight-cropped one goes into the 24dp stack instead.
FACES = ['face-1134246', 'face-30518441', 'face-37038761', 'face-3979997', 'face-8727434']


def main():
    os.makedirs(HOME, exist_ok=True)
    os.makedirs(EVENT, exist_ok=True)

    hero = Image.open(os.path.join(SRC, 'hero-6510338.jpg')).convert('RGB')
    # The home screen's trending card holds it at 136x132dp; the event screen
    # runs it full bleed at 393x430dp.
    cover(hero, 408, 396).save(os.path.join(HOME, 'hero.jpg'), quality=88)
    cover(hero, 1179, 1290, focus=0.42).save(os.path.join(EVENT, 'hero.jpg'), quality=86)

    beer = Image.open(os.path.join(SRC, 'beer-5532996.jpg')).convert('RGB')
    cover(beer, 276, 276).save(os.path.join(HOME, 'beer.jpg'), quality=88)

    # Biased low: a centred crop of this frame is the treeline and a
    # building behind it, complete with the cafe's own sign -- no yoga, and
    # somebody else's wordmark.
    yoga = Image.open(os.path.join(SRC, 'yoga-39505633.jpg')).convert('RGB')
    yw, yh = yoga.size
    yoga = yoga.crop((0, int(yh * 0.42), yw, yh))  # drop the buildings entirely
    cover(yoga, 276, 276, focus=0.62).save(os.path.join(HOME, 'yoga.jpg'), quality=88)

    for i, name in enumerate(FACES):
        f = Image.open(os.path.join(SRC, name + '.jpg')).convert('RGB')
        w, h = f.size
        side = int(min(w, h) * 0.82)
        box = (w // 2 - side // 2, int(h * 0.06), w // 2 + side // 2, int(h * 0.06) + side)
        if box[3] > h:
            box = (box[0], 0, box[2], side)
        face = cover(f.crop(box), 138, 138)
        face.save(os.path.join(HOME, f'face{i + 1}.jpg'), quality=90)
        # The event screen gets its own copies rather than reaching into the
        # home screen's folder: `lock` tracks assets/images/<slug>, so a
        # shared file would make each showcase report the other as drift.
        if i < 3:
            face.save(os.path.join(EVENT, f'face{i + 1}.jpg'), quality=90)

    for folder in (HOME, EVENT):
        for f in sorted(os.listdir(folder)):
            if f.endswith('.jpg'):
                print(folder + '/' + f, Image.open(os.path.join(folder, f)).size)


if __name__ == '__main__':
    main()
