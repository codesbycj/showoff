"""
Bake the photographs for the three `sprig` showcases.

    python tools/bake/sprig.py

Food is a picture *of* something, so it is a bitmap here and not a drawing
(AGENTS.md, "Draw the interface, photograph the picture"). A drawn bowl of
poke is a cartoon of a bowl of poke, and a row of them is what makes a screen
read as a toy.

**The dish hero is a circular crop, not a flood-fill cut-out.** A bowl shot
from directly overhead is already a circle, so masking at the rim gives a
perfect edge with no halo and no tolerance to tune — and it drops the
photograph's own pale backdrop, which would otherwise sit as a grey disc on
the lime panel. The app draws the shadow under it.

**The bowl with printing inside it is not used.** The top-left bowl in
`sprigb-4828100` carries embossed lettering on its inside wall, which a crop
at this size would show. Stock carries other brands' marks; the only way to
find them is to look at 1:1 before committing.

Sources, all Pexels, credited per showcase in `assets/images/<slug>/CREDITS.md`.
"""

import io
import os

from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')


def out(slug, name):
    d = os.path.join(ROOT, 'assets', 'images', slug)
    os.makedirs(d, exist_ok=True)
    return os.path.join(d, name)


def load(name):
    return Image.open(os.path.join(SRC, name + '.jpg')).convert('RGB')


def square(src, box, size, dest, q=90):
    """A square crop, resampled once to the size it is drawn at."""
    im = load(src).crop(box).resize((size, size), Image.LANCZOS)
    im.save(dest, quality=q)
    print('  %-44s %dx%d' % (os.path.basename(dest), size, size))


def wide(src, box, w, h, dest, q=90):
    im = load(src).crop(box).resize((w, h), Image.LANCZOS)
    im.save(dest, quality=q)
    print('  %-44s %dx%d' % (os.path.basename(dest), w, h))


def disc(src, cx, cy, r, size, dest):
    """
    The bowl, masked at its own rim.

    The mask is drawn at 4x and resampled down, which is what gives a clean
    edge: a 1px circle drawn at the final size aliases into a staircase that
    is plainly visible against a flat lime panel.
    """
    im = load(src).crop((cx - r, cy - r, cx + r, cy + r)).resize((size, size), Image.LANCZOS)
    mask = Image.new('L', (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(mask)
    im.save(dest)
    print('  %-44s %dx%d  circular' % (os.path.basename(dest), size, size))


def main():
    print('sprigdish')
    # The tofu bowl, centre and rim read off a 2x zoom of the source.
    disc('sprigb-4828100', 1096, 787, 227, 620, out('sprigdish', 'dish.png'))

    print('sprighome')
    square('sprigb-4828100', (700, 1310, 1100, 1710), 180, out('sprighome', 'meal-1.jpg'))
    square('sprigb-4828100', (945, 636, 1247, 938), 180, out('sprighome', 'meal-2.jpg'))
    square('sprig-25856552', (120, 60, 700, 640), 180, out('sprighome', 'meal-3.jpg'))

    print('sprigprogress')
    wide('sprig-10172749', (0, 60, 1400, 850), 1020, 576, out('sprigprogress', 'streak.jpg'), 86)
    square('sprigb-4828100', (700, 1310, 1100, 1710), 180, out('sprigprogress', 'goal.jpg'))


if __name__ == '__main__':
    main()
