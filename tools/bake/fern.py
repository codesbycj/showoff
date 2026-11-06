"""Bake Fern's portraits.

    python tools/bake/fern.py

The reference's Quick Send row is five photographed faces, which is what the
rules ask for anyway: initials on a disc are a fallback, not a substitute.

Sources (Pexels, free to use):
  17910791  Jobayer (home avatar)
  37038761  Aliya        31868676  Cody
  30518441  Wade         3872330   Darrell
  8727434   the ledger row on the report screen
"""

import os

from PIL import Image

HOME = 'assets/images/fernhome'
REPORT = 'assets/images/fernreport'

FACES = [
    ('tools/bake/sources/b3/man-17910791.jpg', HOME, 'jobayer.jpg', 0.70),
    ('tools/bake/sources/huddle/face-37038761.jpg', HOME, 'aliya.jpg', 0.66),
    ('tools/bake/sources/wander/p-31868676.jpg', HOME, 'cody.jpg', 0.58),
    ('tools/bake/sources/huddle/face-30518441.jpg', HOME, 'wade.jpg', 0.95),
    ('tools/bake/sources/b3/man-3872330.jpg', HOME, 'darrell.jpg', 0.66),
    ('tools/bake/sources/huddle/face-8727434.jpg', REPORT, 'payee.jpg', 0.70),
]


def face(path, size, share):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * share)
    top = int(h * 0.04)
    box = (w // 2 - side // 2, top, w // 2 + side // 2, min(h, top + side))
    im = im.crop(box)
    scale = max(size / im.width, size / im.height)
    im = im.resize((int(im.width * scale + 1), int(im.height * scale + 1)), Image.LANCZOS)
    x, y = (im.width - size) // 2, (im.height - size) // 2
    return im.crop((x, y, x + size, y + size))


def main():
    for d in (HOME, REPORT):
        os.makedirs(d, exist_ok=True)
    for src, out, name, share in FACES:
        face(src, 168, share).save(os.path.join(out, name), quality=90)
        print(out + '/' + name)


if __name__ == '__main__':
    main()
