"""
Bake the photographs for the two `mingle` showcases.

    python tools/bake/mingle.py

A dating app is made of pictures of people, so almost everything on these two
screens is a bitmap (AGENTS.md, "Faces are photographs"). Initials on a disc
would not merely look unfinished here — the constellation on the first screen
and the whole of the second screen *are* the photographs.

**The portrait pool is deliberately the shared one.** `tools/bake/sources/faces`
holds square head crops at 400px, which is enough for every disc on the start
screen at 3x; they are copied rather than re-cropped so the same person looks
the same in every showcase that uses them.

The swipe screen's hero is a different frame, full-bleed and portrait, taken
at the phone's own aspect so it is resampled once.

Frames rejected on sight, and why: a beanie with a legible wordmark on it
(`19964083`), and every frame of a child — neither belongs on a dating
profile.
"""

import os
import shutil

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')
FACES = os.path.join(SRC, 'faces')

# The constellation, largest first. Fixed, so the same face is the same
# person every time this is re-baked.
START_FACES = ['12311572', '30468665', '26872232', '29852895', '31409070']


def out(slug, name):
    d = os.path.join(ROOT, 'assets', 'images', slug)
    os.makedirs(d, exist_ok=True)
    return os.path.join(d, name)


def main():
    print('minglestart  (the constellation)')
    for i, fid in enumerate(START_FACES):
        dest = out('minglestart', 'face-%d.jpg' % (i + 1))
        shutil.copyfile(os.path.join(FACES, 'face-%s.jpg' % fid), dest)
        print('  %-18s <- %s' % (os.path.basename(dest), fid))

    print('mingleswipe  (the profile)')
    im = Image.open(os.path.join(SRC, 'ming-35555305.jpg')).convert('RGB')
    # 393x852 is 1:2.168; the frame is 1400x2100 (1:1.5), so the crop takes a
    # tall column of it rather than squeezing the whole frame into the shape.
    w = int(2100 / 2.168)
    left = (im.width - w) // 2
    hero = im.crop((left, 0, left + w, 2100)).resize((786, 1704), Image.LANCZOS)
    hero.save(out('mingleswipe', 'hero.jpg'), quality=86)
    print('  %-18s %dx%d' % ('hero.jpg', 786, 1704))

    shutil.copyfile(
        os.path.join(FACES, 'face-%s.jpg' % START_FACES[0]),
        out('mingleswipe', 'face-1.jpg'),
    )
    print('  %-18s <- %s' % ('face-1.jpg', START_FACES[0]))


if __name__ == '__main__':
    main()
