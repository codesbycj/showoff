"""Bake the photography for the remaining showcases.

    python tools/bake/rest.py

Sources (Pexels, free to use):
  16465605  shelter dogs      -> nudge "Visit shelter"
  39206252  vegetables        -> nudge "Get vegetables"
  4920448   running           -> nudge "Exercise"
  14773255 / 39259260 / 4803921  -> primeplan's three progress frames
  18250454  swings            -> glu's calm frame
  2333596   yellow beanie     -> strid's profile
  12196859 / 5784267          -> drift's surf posts
  7669127   picnic            -> trip's post
  12903349  portrait          -> meet's profile
"""

import os

from PIL import Image

SRC = 'tools/bake/sources/rest'


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


JOBS = [
    # nudge: three habit cards at 128x112dp
    ('r-16465605.jpg', 'nudgehome', 'shelter.jpg', 'cover', (384, 336), 0.5),
    ('r-39206252.jpg', 'nudgehome', 'veg.jpg', 'cover', (384, 336), 0.5),
    ('r-4920448.jpg', 'nudgehome', 'exercise.jpg', 'cover', (384, 336), 0.35),
    # primeplan: three progress frames at 96x120dp
    ('r-14773255.jpg', 'primeplan', 'p1.jpg', 'cover', (288, 360), 0.4),
    ('r-39259260.jpg', 'primeplan', 'p2.jpg', 'cover', (288, 360), 0.4),
    ('r-4803921.jpg', 'primeplan', 'p3.jpg', 'cover', (288, 360), 0.3),
    # glu
    ('../wander/cabin-27667695.jpg', 'gluwhy', 'calm.jpg', 'cover', (1020, 760), 0.45),
    # strid
    # A portrait facing the camera: the first pick was the back of her head,
    # which is a photograph of a beanie rather than of a person.
    ('h-31992449.jpg', 'stridprofile', 'lisa.jpg', 'cover', (1020, 1180), 0.35),
    # drift
    ('r-5784267.jpg', 'driftfeed', 'post1.jpg', 'cover', (1020, 900), 0.5),
    ('../wander/beach-4784988.jpg', 'driftfeed', 'post2.jpg', 'cover', (1020, 760), 0.5),
    # trip
    ('r-7669127.jpg', 'tripfeed', 'post1.jpg', 'cover', (1020, 900), 0.45),
    ('../wander/fjord-33695268.jpg', 'tripfeed', 'post2.jpg', 'cover', (1020, 760), 0.5),
]

EXTRA = [
    # trip: three story frames and two post photographs
    ('../social/s-10433242.jpg', 'tripfeed', 'story1.jpg', (210, 282), 0.4),
    ('../wander/beach-4784988.jpg', 'tripfeed', 'story2.jpg', (210, 282), 0.5),
    ('r-7669127.jpg', 'tripfeed', 'story3.jpg', (210, 282), 0.45),
    ('../social/s-15085069.jpg', 'tripfeed', 'photo2.jpg', (600, 720), 0.5),
    # drift
    ('../wander/beach-4784988.jpg', 'driftfeed', 'post3.jpg', (1020, 760), 0.5),
    # meet: three oval frames
    ('../social/s-15085069.jpg', 'meetprofile', 'm1.jpg', (300, 390), 0.5),
    ('h-3903736.jpg', 'meetprofile', 'm2.jpg', (300, 390), 0.3),
    ('r-12903349.jpg', 'meetprofile', 'm3.jpg', (300, 390), 0.3),
]

FACES = [
    ('h-3903736.jpg', 'meetprofile', 'roselyn.jpg', 480, 0.8, 0.0),
    # primeplan's "10k+" stack: four faces at 30dp.
    ('r-12903349.jpg', 'primeplan', 'u1.jpg', 108, 0.72, 0.02),
    # Faces, not figures: a runner and a back-of-head read as blank discs at
    # 30dp, which is the size these are actually seen at.
    ('../huddle/face-37038761.jpg', 'primeplan', 'u2.jpg', 108, 0.66, 0.04),
    ('../b3/man-36712860.jpg', 'primeplan', 'u3.jpg', 108, 0.74, 0.01),
    ('../huddle/face-8727434.jpg', 'primeplan', 'u4.jpg', 108, 0.7, 0.04),
    ('r-12903349.jpg', 'driftfeed', 'author.jpg', 192, 0.72, 0.02),
    ('r-2333596.jpg', 'tripfeed', 'author.jpg', 192, 0.9, 0.0),
]


def main():
    for _, out, *_rest in JOBS + FACES + EXTRA:
        os.makedirs(os.path.join('assets/images', out), exist_ok=True)

    for src, out, name, _kind, (w, h), focus in JOBS:
        cover(os.path.join(SRC, src), w, h, focus).save(
            os.path.join('assets/images', out, name), quality=88
        )
        print(out + '/' + name)

    for src, out, name, (w, h), focus in EXTRA:
        cover(os.path.join(SRC, src), w, h, focus).save(
            os.path.join('assets/images', out, name), quality=88
        )
        print(out + '/' + name)

    for src, out, name, size, share, top in FACES:
        face(os.path.join(SRC, src), size, share, top).save(
            os.path.join('assets/images', out, name), quality=90
        )
        print(out + '/' + name)


if __name__ == '__main__':
    main()
