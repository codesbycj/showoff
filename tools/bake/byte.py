"""Bake Byte's four Quick Send portraits.

    python tools/bake/byte.py

The reference uses Memoji for these. Memoji are a rendered 3D cartoon that
cannot be reproduced and must not be traced badly; the rules put faces in
photographs, so they are photographs.

Sources (Pexels, free to use): 17910791, 37038761, 36712860, 3979997.
"""

import os

from PIL import Image

OUT = 'assets/images/bytehome'
PEOPLE = [
    ('tools/bake/sources/b3/man-17910791.jpg', 'sam.jpg'),
    ('tools/bake/sources/huddle/face-37038761.jpg', 'ana.jpg'),
    ('tools/bake/sources/b3/man-36712860.jpg', 'john.jpg'),
    # 8727434's subject sits left of centre, so a centred square crop took
    # half her face; this frame is already tight on one.
    ('tools/bake/sources/huddle/face-3979997.jpg', 'kate.jpg'),
]


def face(path, size=156):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * 0.66)
    top = int(h * 0.05)
    box = (w // 2 - side // 2, top, w // 2 + side // 2, min(h, top + side))
    im = im.crop(box)
    scale = max(size / im.width, size / im.height)
    im = im.resize((int(im.width * scale + 1), int(im.height * scale + 1)), Image.LANCZOS)
    x, y = (im.width - size) // 2, (im.height - size) // 2
    return im.crop((x, y, x + size, y + size))


def main():
    os.makedirs(OUT, exist_ok=True)
    for src, name in PEOPLE:
        face(src).save(os.path.join(OUT, name), quality=90)
        print(name, Image.open(os.path.join(OUT, name)).size)


if __name__ == '__main__':
    main()
