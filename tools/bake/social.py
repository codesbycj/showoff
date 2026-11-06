"""Bake the photography for the two Onimicee-style social showcases.

    python tools/bake/social.py

Pally's profile is a photograph of sky with a photographed face on it and
three photographed memories; Atlas's feed is photographed posts. All of that
is "a picture of something", which is the half of the split that stays a
bitmap. The stickers, the wordmark, the chips and the dock are drawn.

Sources (Pexels, free to use):
  5432833   cloud on blue   -> Pally's cover
  36712860  portrait        -> Bobby
  15085069  ramen           -> memory 1
  10433242  drinks          -> memory 2
  37870954  street style    -> memory 3
  26760669  woman in a hat  -> Atlas post 1
  5837000   a table of food -> Atlas post 2
"""

import os

from PIL import Image

SOCIAL = 'tools/bake/sources/social'
B3 = 'tools/bake/sources/b3'
HUDDLE = 'tools/bake/sources/huddle'
PALLY = 'assets/images/pallyprofile'
ATLAS = 'assets/images/atlasfeed'


def cover(path, w, h, focus=0.5):
    im = Image.open(path).convert('RGB')
    scale = max(w / im.width, h / im.height)
    nw, nh = max(w, int(im.width * scale + 1)), max(h, int(im.height * scale + 1))
    im = im.resize((nw, nh), Image.LANCZOS)
    x = (nw - w) // 2
    y = int((nh - h) * focus)
    return im.crop((x, y, x + w, y + h))


def face(path, size, share=0.7, top=0.04):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * share)
    t = int(h * top)
    im = im.crop((w // 2 - side // 2, t, w // 2 + side // 2, min(h, t + side)))
    scale = max(size / im.width, size / im.height)
    im = im.resize((int(im.width * scale + 1), int(im.height * scale + 1)), Image.LANCZOS)
    x, y = (im.width - size) // 2, (im.height - size) // 2
    return im.crop((x, y, x + size, y + size))


def main():
    for d in (PALLY, ATLAS):
        os.makedirs(d, exist_ok=True)

    cover(os.path.join(SOCIAL, 's-5432833.jpg'), 1179, 900).save(
        os.path.join(PALLY, 'sky.jpg'), quality=86
    )
    face(os.path.join(B3, 'man-36712860.jpg'), 396, 0.74, 0.01).save(
        os.path.join(PALLY, 'bobby.jpg'), quality=92
    )
    for src, out, focus in (
        ('s-15085069.jpg', 'memory1.jpg', 0.5),
        ('s-10433242.jpg', 'memory2.jpg', 0.4),
        ('s-37870954.jpg', 'memory3.jpg', 0.3),
    ):
        cover(os.path.join(SOCIAL, src), 480, 600, focus).save(
            os.path.join(PALLY, out), quality=88
        )

    # Atlas: two post photographs and five faces.
    cover(os.path.join(SOCIAL, 's-26760669.jpg'), 1020, 1020, 0.35).save(
        os.path.join(ATLAS, 'post1.jpg'), quality=86
    )
    cover(os.path.join(SOCIAL, 's-5837000.jpg'), 1020, 780, 0.5).save(
        os.path.join(ATLAS, 'post2.jpg'), quality=86
    )
    faces = [
        (os.path.join(B3, 'man-36712860.jpg'), 'face1.jpg', 0.74, 0.01),
        (os.path.join(HUDDLE, 'face-37038761.jpg'), 'face2.jpg', 0.66, 0.04),
        (os.path.join(HUDDLE, 'face-30518441.jpg'), 'face3.jpg', 0.95, 0.02),
        (os.path.join(B3, 'man-3872330.jpg'), 'face4.jpg', 0.66, 0.04),
        # 8727434 sits left of centre and a square crop took half her face.
        ('tools/bake/sources/wander/p-31868676.jpg', 'face5.jpg', 0.58, 0.02),
    ]
    for src, name, share, top in faces:
        face(src, 192, share, top).save(os.path.join(ATLAS, name), quality=90)

    for d in (PALLY, ATLAS):
        for f in sorted(os.listdir(d)):
            if f.endswith('.jpg'):
                print(d + '/' + f, Image.open(os.path.join(d, f)).size)


if __name__ == '__main__':
    main()
