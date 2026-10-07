"""Trace a light glyph out of the capture into an SVG path.

    python trace.py <img> <x0> <y0> <x1> <y1> <thr> <viewbox>

The region is supersampled, thresholded, its boundaries walked, simplified with
Douglas-Peucker and smoothed with two rounds of Chaikin, then printed as one
path in a square viewBox. Meant for small marks where hand-authoring a path
would be guesswork.
"""
import math
import sys

import numpy as np
from PIL import Image

img, x0, y0, x1, y1 = sys.argv[1], *map(float, sys.argv[2:6])
thr = float(sys.argv[6])
VB = float(sys.argv[7]) if len(sys.argv) > 7 else 100.0
SS = 16

im = Image.open(img).convert('L')
s = im.width / 393.0
sub = im.crop((int(x0 * s), int(y0 * s), math.ceil(x1 * s), math.ceil(y1 * s)))
w = int((x1 - x0) * SS)
h = int((y1 - y0) * SS)
sub = sub.resize((w, h), Image.LANCZOS)
m = np.asarray(sub).astype(float) > thr

lab = np.zeros(m.shape, np.int32)
n = 0
for y in range(h):
    for x in range(w):
        if m[y, x] and not lab[y, x]:
            n += 1
            st = [(y, x)]
            lab[y, x] = n
            while st:
                cy, cx = st.pop()
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    yy, xx = cy + dy, cx + dx
                    if 0 <= yy < h and 0 <= xx < w and m[yy, xx] and not lab[yy, xx]:
                        lab[yy, xx] = n
                        st.append((yy, xx))


def border(mask):
    """Walk the outer boundary of one blob, 8-connected, clockwise."""
    ys, xs = np.nonzero(mask)
    start = (ys.min(), xs[ys == ys.min()].min())
    dirs = [(0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1)]
    out = [start]
    cur, prev = start, 0  # prev is the move that got us here; backtrack is prev+4
    while True:
        for k in range(8):
            d = (prev + 5 + k) % 8
            yy, xx = cur[0] + dirs[d][0], cur[1] + dirs[d][1]
            if 0 <= yy < mask.shape[0] and 0 <= xx < mask.shape[1] and mask[yy, xx]:
                prev = d
                cur = (yy, xx)
                out.append(cur)
                break
        else:
            break
        if cur == start and len(out) > 3:
            break
    return out[:-1]


def dp(pts, eps):
    if len(pts) < 3:
        return pts
    a, b = np.array(pts[0]), np.array(pts[-1])
    ab = b - a
    L = np.hypot(*ab)
    if L == 0:
        d = [np.hypot(*(np.array(p) - a)) for p in pts]
    else:
        d = [abs(ab[0] * (p[1] - a[1]) - ab[1] * (p[0] - a[0])) / L for p in pts]
    i = int(np.argmax(d))
    if d[i] <= eps:
        return [pts[0], pts[-1]]
    return dp(pts[:i + 1], eps)[:-1] + dp(pts[i:], eps)


def chaikin(pts, rounds=2):
    for _ in range(rounds):
        out = []
        for i in range(len(pts)):
            p, q = np.array(pts[i]), np.array(pts[(i + 1) % len(pts)])
            out.append(tuple(0.75 * p + 0.25 * q))
            out.append(tuple(0.25 * p + 0.75 * q))
        pts = out
    return pts


k = VB / max(w, h)
# background pockets that do not touch the border are holes
hol = np.zeros(m.shape, np.int32)
hn = 0
for y in range(h):
    for x in range(w):
        if not m[y, x] and not hol[y, x]:
            hn += 1
            st = [(y, x)]
            hol[y, x] = hn
            edge = False
            while st:
                cy, cx = st.pop()
                if cy in (0, h - 1) or cx in (0, w - 1):
                    edge = True
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    yy, xx = cy + dy, cx + dx
                    if 0 <= yy < h and 0 <= xx < w and not m[yy, xx] and not hol[yy, xx]:
                        hol[yy, xx] = hn
                        st.append((yy, xx))
            if edge:
                hol[hol == hn] = -1
parts = []
for i in list(range(1, n + 1)) + [-h for h in range(1, hn + 1)]:
    mask = (lab == i) if i > 0 else (hol == -i)
    if mask.sum() < 40:
        continue
    pts = border(mask)
    pts = dp(pts, 2.0)
    pts = chaikin(pts, 0)
    d = ''
    for j, (py, px) in enumerate(pts):
        d += ('M' if j == 0 else 'L') + '%.2f %.2f ' % (px * k, py * k)
    parts.append(d + 'Z')
    print('# blob %d: %d px, box x %.2f..%.2f y %.2f..%.2f' % (
        i, mask.sum(),
        np.nonzero(mask.any(0))[0].min() * k, np.nonzero(mask.any(0))[0].max() * k,
        np.nonzero(mask.any(1))[0].min() * k, np.nonzero(mask.any(1))[0].max() * k))
for p in parts:
    print(p)
