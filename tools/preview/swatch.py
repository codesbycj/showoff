"""Read exact colours and sizes out of a reference image.

    python tools/preview/swatch.py ref/batch3/clove-board.png                 # size + corner/ground
    python tools/preview/swatch.py ref/batch3/clove-board.png 120,300 400,900 # specific points
    python tools/preview/swatch.py ref/batch3/clove-board.png --band 300 0 400  # row 300, x 0..400

Points are in the image's own pixels. A design shot is a posed board, so this
is for *palette*, never for a dp scale -- see the inspo-brief rules.
"""

import sys
from collections import Counter

from PIL import Image


def hexof(px):
    return '#%02X%02X%02X' % px[:3]


def main(argv):
    if not argv:
        print(__doc__)
        return 2
    path = argv[0]
    im = Image.open(path).convert('RGB')
    w, h = im.size
    px = im.load()
    print('%s  %dx%d' % (path, w, h))

    rest = argv[1:]
    if not rest:
        counts = Counter(im.resize((min(w, 200), min(h, 200))).convert('RGB').tobytes()[i:i+3] for i in range(0, 3 * min(w, 200) * min(h, 200), 3))
        print('  corners: tl %s  tr %s  bl %s  br %s' % (
            hexof(px[2, 2]), hexof(px[w - 3, 2]), hexof(px[2, h - 3]), hexof(px[w - 3, h - 3])))
        print('  most common:')
        for c, n in counts.most_common(8):
            print('    #%02X%02X%02X  %5.1f%%' % (c[0], c[1], c[2], 100 * n / (min(w, 200) * min(h, 200))))
        return 0

    if rest[0] == '--avg':
        # The median of a flat region, which is what a colour actually is.
        # A single pixel on a posed board carries the shot's compression and
        # whatever soft shadow the designer laid over it.
        for spec in rest[1:]:
            x0, y0, x1, y1 = (int(v) for v in spec.split(','))
            cols = [px[x, y] for y in range(y0, y1) for x in range(x0, x1)]
            cols.sort(key=lambda c: c[0] * 299 + c[1] * 587 + c[2] * 114)
            mid = cols[len(cols) // 2]
            print('  %-20s %s  (n=%d)' % (spec, hexof(mid), len(cols)))
        return 0

    if rest[0] == '--band':
        y = int(rest[1])
        x0, x1 = int(rest[2]), int(rest[3])
        runs = []
        prev = None
        start = x0
        for x in range(x0, min(x1, w)):
            c = px[x, y]
            if prev is None or max(abs(c[i] - prev[i]) for i in range(3)) > 10:
                if prev is not None:
                    runs.append((start, x, prev))
                start = x
                prev = c
        runs.append((start, min(x1, w), prev))
        for a, b, c in runs:
            if b - a >= 3:
                print('  x %4d-%4d  %4dpx  %s' % (a, b, b - a, hexof(c)))
        return 0

    for spec in rest:
        x, y = (int(v) for v in spec.split(','))
        print('  %5d,%-5d %s' % (x, y, hexof(px[x, y])))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
