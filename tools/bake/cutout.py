"""
Lift a subject off a plain backdrop and write it as a transparent PNG.

    python tools/bake/cutout.py <src> <out.png> [--tol 34] [--feather 1.6]
                               [--trim] [--width 900] [--gray] [--contrast 1.0]

The method is the one AGENTS.md describes under "Sourcing assets": flood fill
inwards from the border, then ramp the alpha over the last couple of pixels so
the edge stays soft. A hard threshold leaves a jagged outline that reads as a
mistake on every frame of a video; a ramp does not.

It only works on a plain backdrop, which is why `--report` prints the border
pixels' mean and standard deviation first. A standard deviation under about 12
is a seamless studio sweep and will cut cleanly. Much above that and the
backdrop has texture in it, the fill leaks into the subject, and the honest
answer is a different photograph rather than a cleverer threshold.

`--gray` desaturates, because these cards print their photography in mono.
Doing it here rather than with a tint at runtime keeps the cost off the device
and keeps the result identical on web and Android.
"""

import argparse
import os
from collections import deque

import numpy as np
from PIL import Image, ImageFilter


def border_stats(a):
    """Mean and standard deviation of the one-pixel frame around the image."""
    frame = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]).astype(np.float64)
    return frame.mean(axis=0), frame.std(axis=0)


def flood(a, tol):
    """
    Mask of everything reachable from the border without crossing an edge
    bigger than `tol` away from the border's own colour.

    A scanline queue rather than per-pixel recursion: a 1200px photograph is
    1.4M pixels and Python's stack gives out long before the fill does.
    """
    h, w = a.shape[:2]
    mean, _ = border_stats(a)
    near = (np.abs(a.astype(np.float64) - mean).max(axis=2) <= tol)

    seen = np.zeros((h, w), bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if near[y, x]:
                seen[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if near[y, x] and not seen[y, x]:
                seen[y, x] = True
                q.append((y, x))

    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and near[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True
                q.append((ny, nx))
    return seen


def main():
    p = argparse.ArgumentParser()
    p.add_argument('src')
    p.add_argument('out')
    p.add_argument('--tol', type=float, default=34)
    p.add_argument('--feather', type=float, default=1.6)
    p.add_argument('--width', type=int, default=900)
    p.add_argument('--trim', action='store_true')
    p.add_argument('--gray', action='store_true')
    p.add_argument('--contrast', type=float, default=1.0)
    p.add_argument('--report', action='store_true')
    # Fraction of the frame to drop off the bottom *before* the fill. A studio
    # sweep curves into the floor, and the fill stops at that curve rather than
    # at the subject -- which leaves a strip of wall under the feet that reads
    # as a shelf the figure is standing on.
    p.add_argument('--crop-bottom', type=float, default=0.0)
    # Seal thin leaks: a dark shadow inside the subject that touches the
    # backdrop through a two-pixel gap is reachable, and the fill walks
    # through it and eats the shadow. A closing shuts gaps up to its radius
    # before the alpha is feathered.
    p.add_argument('--close', type=int, default=0)
    args = p.parse_args()

    im = Image.open(args.src).convert('RGB')
    if args.crop_bottom:
        im = im.crop((0, 0, im.width, round(im.height * (1 - args.crop_bottom))))
    if im.width > args.width:
        im = im.resize((args.width, round(im.height * args.width / im.width)), Image.LANCZOS)
    a = np.asarray(im)

    mean, std = border_stats(a)
    if args.report:
        print('border mean %s  std %s' % (np.round(mean, 1), np.round(std, 1)))

    back = flood(a, args.tol)
    alpha = np.where(back, 0, 255).astype(np.uint8)
    if args.close:
        k = args.close | 1
        m = Image.fromarray(alpha)
        alpha = np.asarray(m.filter(ImageFilter.MaxFilter(k)).filter(ImageFilter.MinFilter(k)))
    alpha = np.asarray(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(args.feather)))

    rgb = a
    if args.gray:
        lum = (rgb @ np.array([0.299, 0.587, 0.114])).clip(0, 255)
        if args.contrast != 1.0:
            lum = ((lum - 128) * args.contrast + 128).clip(0, 255)
        rgb = np.repeat(lum[:, :, None], 3, axis=2).astype(np.uint8)

    out = Image.fromarray(np.dstack([rgb, alpha]), 'RGBA')
    if args.trim:
        box = out.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
        if box:
            out = out.crop(box)

    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    out.save(args.out, optimize=True)
    print('%s  %dx%d  kept %.1f%%' % (args.out, out.width, out.height, 100 * (alpha > 8).mean()))


if __name__ == '__main__':
    main()
