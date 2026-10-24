"""Turn a stock frame into one of this episode's assets.

    python tools/bake.py tile   chairs-10 hero-clay   388 512 --bg c4593a
    python tools/bake.py duo    chairs-22 hero-chalk  388 512 --dark 2e2e2b --light e8e3da
    python tools/bake.py plain  rooms-00  about       1200 900

Three modes, which are the three things free stock can be made to do (see the
`photographic-assets-three-techniques` note):

  * **tile** — the subject sits on a plain studio ground, so the ground is
    swapped for a brand colour and the subject keeps its own. This is what
    makes one chair photograph into four colourways.
  * **duo** — the subject is pale on a pale ground and no fill can separate
    them, so the whole frame is mapped onto a two-colour ramp instead. The
    tile becomes the colour and the object stays legible as form.
  * **plain** — crop and resize, nothing else.

The mask for `tile` is a plain colour-distance mask, blurred, with **no
connectivity test**. A flood fill from the border is more correct and much more
fragile: it leaks through any shadow that touches the edge and then eats the
subject. A distance mask only fails when the subject is the same colour as the
ground, and that case is what `duo` is for.

Everything is written as webp at quality 82, which for these is visually
indistinguishable from 95 and about a third of the bytes.
"""

import os
import sys

import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
STOCK = os.path.join(HERE, '_stock')
OUT = os.path.join(HERE, '..', 'src', 'assets', 'img')


def hex2rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def crop_to(im, w, h, bias=0.35):
    """Crop to the target aspect, then resize.

    `bias` is where the crop sits vertically when the source is taller than the
    target: 0 keeps the top, 1 keeps the bottom. It defaults to 0.35 because a
    studio shot centred on its own frame is mostly floor -- but a subject that
    sits low in frame needs it pushed down, and a crop that loses the subject
    is the one failure here that looks like a design decision afterwards.
    """
    want = w / h
    have = im.width / im.height
    if have > want:
        # Same knob horizontally: 0 keeps the left of the frame, 1 the right.
        new_w = int(im.height * want)
        left = int((im.width - new_w) * bias)
        im = im.crop((left, 0, left + new_w, im.height))
    else:
        new_h = int(im.width / want)
        # Bias the crop upward: a chair's interest is above centre, and a
        # centred crop of a studio shot is mostly floor.
        top = int((im.height - new_h) * bias)
        im = im.crop((0, top, im.width, top + new_h))
    return im.resize((w, h), Image.LANCZOS)


def tile(src, w, h, bg, tol=64.0, bias=0.35, fit=False):
    """`fit` scales the whole frame in and fills the rest with the ground.

    A product shot has to show the whole object. Cropping a 3:2 photograph to a
    tall panel gets you a seat and two legs, and no amount of bias fixes it
    because the subject is wider than the crop. Fitting the frame and painting
    the margin the same colour as the ground it already sits on reads as one
    photograph taken against a larger wall, which is what the colour-field
    treatment wants anyway.
    """
    im = Image.open(src).convert('RGB')
    if fit:
        im = im.copy()
        im.thumbnail((w, h), Image.LANCZOS)
    else:
        im = crop_to(im, w, h, bias)
    a = np.asarray(im).astype(np.float32)
    # The ground colour is whatever dominates the border.
    border = np.concatenate([a[:6].reshape(-1, 3), a[-6:].reshape(-1, 3),
                             a[:, :6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)])
    ground = np.median(border, axis=0)
    dist = np.linalg.norm(a - ground, axis=2)
    # The default 64 is wide enough for a flat sweep and narrow enough to leave
    # a mid-tone subject alone. A *graded* sweep needs much more -- around 110 --
    # or the fill stops partway and leaves a halo around the subject, which is
    # the tell that the number is too low.
    mask = np.clip(1.0 - dist / tol, 0, 1)
    mask = np.asarray(Image.fromarray((mask * 255).astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(1.6))).astype(np.float32) / 255.0
    mask = mask[:, :, None]
    out = a * (1 - mask) + np.array(bg, dtype=np.float32) * mask
    done = Image.fromarray(out.astype(np.uint8))
    if fit and (done.width < w or done.height < h):
        canvas = Image.new('RGB', (w, h), tuple(int(c) for c in bg))
        canvas.paste(done, ((w - done.width) // 2, (h - done.height) // 2))
        return canvas
    return done


def duo(src, w, h, dark, light, bias=0.35):
    im = crop_to(Image.open(src).convert('L'), w, h, bias)
    v = np.asarray(im).astype(np.float32)
    # Stretch by percentile first: a fixed window puts the subject and the
    # backdrop on the same tint.
    lo, hi = np.percentile(v, 2), np.percentile(v, 98)
    t = np.clip((v - lo) / max(hi - lo, 1e-6), 0, 1)[:, :, None]
    out = np.array(dark, dtype=np.float32) * (1 - t) + np.array(light, dtype=np.float32) * t
    return Image.fromarray(out.astype(np.uint8))


def main():
    mode, src, name, w, h = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
    args = sys.argv[6:]

    def opt(flag, default=None):
        return args[args.index(flag) + 1] if flag in args else default

    path = os.path.join(STOCK, src if src.endswith('.jpg') else src + '.jpg')
    bias = float(opt('--bias', '0.35'))
    if mode == 'tile':
        im = tile(path, w, h, hex2rgb(opt('--bg', 'c4593a')), float(opt('--tol', '64')), bias,
                  '--fit' in args)
    elif mode == 'duo':
        im = duo(path, w, h, hex2rgb(opt('--dark', '2e2e2b')), hex2rgb(opt('--light', 'e8e3da')), bias)
    else:
        im = crop_to(Image.open(path).convert('RGB'), w, h, bias)

    os.makedirs(OUT, exist_ok=True)
    dest = os.path.join(OUT, name + '.webp')
    im.save(dest, 'WEBP', quality=82, method=6)
    print('%-22s %dx%d  %5d bytes' % (name + '.webp', w, h, os.path.getsize(dest)))


if __name__ == '__main__':
    main()
