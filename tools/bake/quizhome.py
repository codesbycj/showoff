"""
Bake Quiz's two card photographs.

    python tools/bake/quizhome.py

Both are cut off their backdrop and desaturated, because the reference prints
its card photography in mono over flat colour. Doing the cut here rather than
masking at runtime is the only option that works: React Native has no chroma
key, and a rectangular photo over a purple card is a different design.

The subjects are a person and a spacesuit — large, specific things, which
AGENTS.md puts outside drawing range. The confetti and the blobs around them
are drawn, because those are flat marks.

Sources are free-licensed Pexels photographs; the ids are credited in
`assets/images/quizhome/CREDITS.md`.
"""

import os
import subprocess
import sys

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')
OUT = os.path.join(ROOT, 'assets', 'images', 'quizhome')

# (source, output, tolerance, contrast, width, crop-bottom, close) -- the width
# is 3x the tallest slot the image is drawn in, which is the density the
# emulator renders at.
#
# The crop takes the studio floor off the celebration shot before the fill
# runs, so the figure does not come out standing on a strip of wall. The
# closing is for the spacesuit: it is lit against black, its own shadows are
# nearly as dark as the backdrop, and without sealing the gaps between them the
# fill walks inside the suit and leaves the card colour showing through its
# chest.
JOBS = [
    ('quiz-6150589.jpg', 'hero-cheer.png', 50, 1.08, 880, 0.12, 0),
    ('quiz-11479921.jpg', 'hero-astro.png', 22, 1.15, 460, 0.0, 15),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    for src, out, tol, contrast, width, crop, close in JOBS:
        subprocess.run([
            sys.executable, os.path.join(os.path.dirname(__file__), 'cutout.py'),
            os.path.join(SRC, src), os.path.join(OUT, out),
            '--tol', str(tol), '--contrast', str(contrast),
            '--width', str(width), '--crop-bottom', str(crop),
            '--close', str(close), '--trim', '--gray',
        ], check=True)


if __name__ == '__main__':
    main()
