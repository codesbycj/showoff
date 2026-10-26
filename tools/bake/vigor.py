"""
Bake the photographs for the two `vigor` showcases.

    python tools/bake/vigor.py

**The reference draws its article art as flat illustrations of people.** A
drawn person is a picture *of* someone, which is the bitmap side of the split
(AGENTS.md, "Draw the interface, photograph the picture") — and a hand-vectored
figure is the same mistake as a hand-vectored map: reproducing an arrangement
rather than expressing an idea. So the article cards carry photographs of
people training, as the plan cards already do in the reference itself.

Each crop is taken to the aspect the card draws it at and resampled once, so
nothing is scaled twice. Every frame was checked at 1:1 for other brands'
marks before it was used; `vigor-7900680` is cropped left of the water bottle,
whose printed wrap is not identifiable but is not worth relying on.

Sources, all Pexels, credited per showcase in `assets/images/<slug>/CREDITS.md`.
"""

import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')


def out(slug, name):
    d = os.path.join(ROOT, 'assets', 'images', slug)
    os.makedirs(d, exist_ok=True)
    return os.path.join(d, name)


def crop(src, box, w, h, dest, q=88):
    im = Image.open(os.path.join(SRC, src + '.jpg')).convert('RGB')
    im = im.crop(box).resize((w, h), Image.LANCZOS)
    im.save(dest, quality=q)
    print('  %-34s %dx%d' % (os.path.basename(dest), w, h))


def main():
    # Portrait, 3:4. The cards fill the rail's height, so the art inside them
    # is a tall box; a landscape crop dropped into it is cropped again at
    # display time and the subject walks out of frame. Crop once, to the shape
    # it is actually drawn at.
    print('vigorfind  (article art, 3:4)')
    crop('vigor-35703187', (350, 0, 1050, 933), 700, 933, out('vigorfind', 'art-1.jpg'))
    crop('vigor-3822454', (150, 120, 1250, 1586), 700, 933, out('vigorfind', 'art-2.jpg'))
    # Left of the bottle: its printed wrap is not identifiable, and a frame
    # nobody can clear is a frame not worth using.
    crop('vigor-7900680', (90, 420, 1190, 1886), 700, 933, out('vigorfind', 'art-3.jpg'))

    print('vigorplan  (card photographs, 5:6)')
    crop('vigor-4587350', (330, 260, 1130, 1220), 300, 360, out('vigorplan', 'plan-1.jpg'))
    crop('vigor-6295974', (430, 10, 1030, 730), 300, 360, out('vigorplan', 'plan-2.jpg'))
    crop('vigor-8032920', (250, 40, 850, 760), 300, 360, out('vigorplan', 'plan-3.jpg'))


if __name__ == '__main__':
    main()
