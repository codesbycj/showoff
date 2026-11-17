"""Bake crypinhome's avatar.

    python tools/bake/crypin.py

Source: Pexels 18890524 — a close-up portrait. A face is a photograph (I4);
initials on a coloured disc is a fallback state, not a substitute, and a screen
built from one is visibly missing something the reference had.

The avatar renders at 32dp, so it is baked square at 144px (32 x 3, with head
room) and cropped tight around the face — anything wider and the head is a
smudge at the size it actually appears.
"""

import os

from PIL import Image

SRC = 'tools/bake/sources/crypin-18890524.jpg'
DEST = 'assets/images/crypinhome/avatar.jpg'
OUT = 144

# Where the face sits in the source (1400x2344), as fractions of width/height.
# SPAN is nearly the full width on purpose: the source is already a close-up,
# so a tight span crops *into* the face and takes the chin and forehead off.
# The first pass did exactly that at 0.52.
CX, CY, SPAN = 0.50, 0.40, 0.95


def main():
    im = Image.open(SRC).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * SPAN)
    cx, cy = int(w * CX), int(h * CY)
    box = (cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)
    box = (max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3]))
    im = im.crop(box).resize((OUT, OUT), Image.LANCZOS)
    os.makedirs(os.path.dirname(DEST), exist_ok=True)
    im.save(DEST, 'JPEG', quality=90, optimize=True)
    print('%s  %dx%d  %d KB' % (DEST, OUT, OUT, os.path.getsize(DEST) // 1024))


if __name__ == '__main__':
    main()
