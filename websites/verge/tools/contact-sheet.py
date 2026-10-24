"""Tile a group of candidates into one sheet, numbered, so they can be judged
side by side instead of one at a time.

    python tools/contact-sheet.py chairs       -> tools/_stock/chairs-sheet.png

Judging stock one file at a time is how you end up with six photographs that
are each fine and do not sit together. The sheet shows the set.
"""

import os
import sys

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
STOCK = os.path.join(HERE, '_stock')
COLS = 6
CELL = 260
PAD = 8


def main():
    group = sys.argv[1] if len(sys.argv) > 1 else 'chairs'
    names = sorted(f for f in os.listdir(STOCK) if f.startswith(group + '-') and f.endswith('.jpg'))
    if not names:
        print('nothing for', group)
        return
    rows = (len(names) + COLS - 1) // COLS
    sheet = Image.new('RGB', (COLS * (CELL + PAD) + PAD, rows * (CELL + PAD) + PAD), (24, 24, 24))
    draw = ImageDraw.Draw(sheet)
    for i, name in enumerate(names):
        try:
            im = Image.open(os.path.join(STOCK, name)).convert('RGB')
        except Exception as e:
            print('skip %s (%s)' % (name, type(e).__name__))
            continue
        im.thumbnail((CELL, CELL))
        x = PAD + (i % COLS) * (CELL + PAD)
        y = PAD + (i // COLS) * (CELL + PAD)
        sheet.paste(im, (x + (CELL - im.width) // 2, y + (CELL - im.height) // 2))
        label = name.split('-')[-1].split('.')[0]
        draw.rectangle([x, y, x + 24, y + 16], fill=(0, 0, 0))
        draw.text((x + 5, y + 3), label, fill=(255, 255, 255))
    out = os.path.join(STOCK, '%s-sheet.png' % group)
    sheet.save(out)
    print('wrote', out, sheet.size, '-', len(names), 'frames')


if __name__ == '__main__':
    main()
