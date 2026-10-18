"""
Bake the We-Crossed-Paths board's photography.

    python tools/bake/happn.py

The reference's hero is a person photographed against an open sky. Stock of
exactly that is scarce, so each hero here is a **composite**: a studio portrait
cut off its white sweep and laid over a sky photograph. Both halves are
free-licensed; the join is a flood fill with a feathered alpha, which is clean
because the sweep is a flat 255 with a standard deviation under one level
(AGENTS.md, "Sourcing assets").

A person is out of drawing range, so neither half is drawn. The big ghost
wordmark the reference puts behind the figure *is* drawn, in the screen.
"""

import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')
CUT = os.path.join(os.path.dirname(__file__), 'cutout.py')

SKY = 'happn-sky-12246252.jpg'

# (slug, name, figure, output size, the figure's share of the height, its
# centre as a fraction of the width, how far its feet sit above the bottom)
#
# Only the intro is a composite. A profile card is a photograph of a person,
# not of a person against a sky, and compositing one gains nothing while it
# risks the studio's light stands coming through the fill -- which is what a
# second composite here actually did.
JOBS = [
    ('happnintro', 'hero.jpg', 'happn-woman-31894858.jpg', (1179, 2556), 0.62, 0.58, 0.05),
]

# (slug, name, source, output size, centre of the crop in source fractions)
PORTRAITS = [
    ('happnswipe', 'card.jpg', 'happn-aisha-29852895.jpg', (1035, 1290), (0.5, 0.42)),
    ('happnmap', 'card.jpg', 'happn-aisha-29852895.jpg', (300, 300), (0.5, 0.36)),
]


def cut(src, out, tol, close):
    import subprocess
    import sys

    subprocess.run(
        [sys.executable, CUT, src, out, '--tol', str(tol), '--close', str(close),
         '--trim', '--width', '1000'],
        check=True,
    )


def compose(sky, figure, size, share, centre, lift):
    out = sky.resize(size, Image.LANCZOS).convert('RGBA')
    h = round(size[1] * share)
    w = round(figure.width * h / figure.height)
    fig = figure.resize((w, h), Image.LANCZOS)
    out.alpha_composite(fig, (round(size[0] * centre) - w // 2, size[1] - h - round(size[1] * lift)))
    return out.convert('RGB')


def main():
    sky = Image.open(os.path.join(SRC, SKY)).convert('RGB')
    cuts = {}

    for slug, name, fig_src, size, share, centre, lift in JOBS:
        if fig_src not in cuts:
            tmp = os.path.join(SRC, '_cut-' + fig_src.replace('.jpg', '.png'))
            cut(os.path.join(SRC, fig_src), tmp, 26, 7)
            cuts[fig_src] = Image.open(tmp).convert('RGBA')

        out_dir = os.path.join(ROOT, 'assets', 'images', slug)
        os.makedirs(out_dir, exist_ok=True)
        path = os.path.join(out_dir, name)
        compose(sky, cuts[fig_src], size, share, centre, lift).save(path, quality=88, optimize=True)
        print('%s/%s  %dx%d' % (slug, name, *size))

    for slug, name, src, size, centre in PORTRAITS:
        out_dir = os.path.join(ROOT, 'assets', 'images', slug)
        os.makedirs(out_dir, exist_ok=True)
        im = Image.open(os.path.join(SRC, src)).convert('RGB')
        w, h = im.size
        scale = max(size[0] / w, size[1] / h)
        box_w, box_h = size[0] / scale, size[1] / scale
        x = min(max(centre[0] * w - box_w / 2, 0), w - box_w)
        y = min(max(centre[1] * h - box_h / 2, 0), h - box_h)
        crop = im.crop((round(x), round(y), round(x + box_w), round(y + box_h)))
        crop.resize(size, Image.LANCZOS).save(
            os.path.join(out_dir, name), quality=88, optimize=True)
        print('%s/%s  %dx%d' % (slug, name, *size))


if __name__ == '__main__':
    main()
