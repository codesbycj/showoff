"""Bake romeospot's hero photograph.

    python tools/bake/romeo.py

Source: Pexels 29962487 — a dim upscale dining room, teal-green chairs and warm
lamp bokeh. Chosen because the reference's hero is the same room: green velvet
seating, a warm table lamp, everything else falling into shadow.

Crops the upper-middle band of a tall frame to the hero's own aspect, so the
bokeh, the bar and the first row of chairs all land in it — the bottom of the
source is a table close-up and reads as a food shot, not a room.

No scrim is baked in. The gradient that makes the title legible is drawn in the
component, so the photograph stays usable if the hero is resized.
"""

import os

from PIL import Image

SRC = 'tools/bake/sources/romeo-29962487.jpg'
DEST = 'assets/images/romeospot/hero.jpg'

# 393dp wide x 366dp hero at 3x. layout.ts derives the real height from the
# window, so this is the largest it is asked for, never the exact size.
OUT_W, OUT_H = 1179, 1110

# Vertical window into the source, as a fraction of its height. Starts below
# the hanging plants and stops before the table fills the frame.
TOP = 0.20


def main():
    im = Image.open(SRC).convert('RGB')
    w, h = im.size
    ar = OUT_W / OUT_H
    ch = int(round(w / ar))
    top = int(round(h * TOP))
    if top + ch > h:
        top = max(0, h - ch)
    im = im.crop((0, top, w, top + ch)).resize((OUT_W, OUT_H), Image.LANCZOS)
    os.makedirs(os.path.dirname(DEST), exist_ok=True)
    im.save(DEST, 'JPEG', quality=88, optimize=True)
    print('%s  %dx%d  %d KB' % (DEST, OUT_W, OUT_H, os.path.getsize(DEST) // 1024))


if __name__ == '__main__':
    main()
