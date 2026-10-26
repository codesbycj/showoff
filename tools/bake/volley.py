"""
Bake the photographs for the three `volley` showcases.

    python tools/bake/volley.py

A sports-events app is made of pictures of courts and the people on them, so
the hero and every event card is a bitmap (AGENTS.md, "Draw the interface,
photograph the picture"). Everything over them — the chips, the date tile, the
badges, the podium, the dock — is drawn.

Each crop is taken to the aspect it is drawn at and resampled once. Every
frame was checked at 1:1 for other brands' marks first; a rack of helmets and
a hall with a painted mural were rejected for carrying legible logos, and
frames of children were left out of an adult tournament app.

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


def crop(src, box, w, h, dest, q=86):
    im = Image.open(os.path.join(SRC, src + '.jpg')).convert('RGB')
    im.crop(box).resize((w, h), Image.LANCZOS).save(dest, quality=q)
    print('  %-30s %dx%d' % (os.path.basename(dest), w, h))


def main():
    print('volleyhome')
    # The hero card is 349x186dp; 1047x558 at 3x.
    crop('vol-35248288', (0, 420, 1400, 1166), 1047, 558, out('volleyhome', 'hero.jpg'))
    # Event cards are 168x116dp; 504x348 at 3x.
    crop('vol-31012869', (0, 560, 1400, 1527), 504, 348, out('volleyhome', 'event-1.jpg'))
    crop('vol-38155778', (120, 60, 1280, 861), 504, 348, out('volleyhome', 'event-2.jpg'))

    print('volleyevent')
    # The hero is 393x260dp full-bleed; 1179x780 at 3x.
    crop('vol-17299530', (0, 40, 1400, 766), 1179, 780, out('volleyevent', 'hero.jpg'))


if __name__ == '__main__':
    main()
