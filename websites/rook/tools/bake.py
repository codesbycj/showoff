"""Re-encode the reference's images for the build.

    python tools/bake.py <dumpImgDir>

Rule 0: the images do not change; rule 10: re-encode only to save bytes. Each
file is capped at twice its painted size and rewritten as webp — 8.1MB off the
reference comes down to about 1.5MB with nothing visible changing.

The reference serves a `-p-500/800/1080/1600/2000` ladder for every photograph;
`assets.js` already collapses those to the widest, so this works from one file
per picture.
"""

import os
import shutil
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'src', 'assets', 'img')

# (stem to match, output name, long-edge cap)
PLAN = (
    [(f'noho-hero-{i}.webp', f'hero-{i}', 900) for i in range(1, 8)]
    # The reference numbers its gallery `-1`, then `-02` through `-13`. Matching
    # on `-2` finds nothing, which is how the first pass shipped a deck
    # importing six files that were never written.
    + [('noho-gallery-1.webp', 'tile-1', 760)]
    + [(f'noho-gallery-{i:02d}.webp', f'tile-{i}', 760) for i in range(2, 14)]
    + [(f'noho-review-{i}.webp', f'review-{i}', 600) for i in range(1, 6)]
    + [(f'noho-about-{i}.webp', f'about-{i}', 600) for i in (1, 2)]
    + [(f'noho-socials-{i}.webp', f'story-{i}', 900) for i in (1, 2, 3)]
    + [
        ('noho-lightly-gallery-1.webp', 'product-1', 1200),
        ('noho-move-gallery-1.webp', 'product-2', 1200),
        ('noho-lightly-usage-1.webp', 'faq', 1200),
    ]
)


def find(src_dir, stem):
    """Match the hashed Webflow filename by its readable tail."""
    for f in sorted(os.listdir(src_dir)):
        if f.endswith(stem) and '-p-' not in f:
            return os.path.join(src_dir, f)
    return None


def main():
    src_dir = sys.argv[1]
    os.makedirs(OUT, exist_ok=True)
    before = total = 0
    for stem, name, cap in PLAN:
        path = find(src_dir, stem)
        if not path:
            print('MISSING %s' % stem)
            continue
        before += os.path.getsize(path)
        im = Image.open(path)
        im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
        if max(im.size) > cap:
            r = cap / max(im.size)
            im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
        dest = os.path.join(OUT, name + '.webp')
        im.save(dest, 'WEBP', quality=82, method=6)
        total += os.path.getsize(dest)
        print('%-14s %4dx%-4d %7d' % (name + '.webp', im.width, im.height, os.path.getsize(dest)))
    print('\n%d KB in, %d KB out' % (before // 1024, total // 1024))


if __name__ == '__main__':
    main()
