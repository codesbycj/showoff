"""
Bake the Nook board's photography (ecommerce-app/09).

    python tools/bake/nook.py

Sources are free-licensed Pexels frames in `tools/bake/sources/nook/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Furniture is a photograph** (I4) and the board poses each piece as a cut-out
over a coloured disc, so each product is lifted off its backdrop with
`cutout.py` and written as a transparent PNG.

**Three of the eight candidates cut cleanly and five did not.** A white chair
against a white wall and a lamp against a white sweep both let the flood fill
cross into the subject - it ate the lamp and left slivers of the chair. RULES
SS6.3 is explicit that the answer there is a different photograph rather than a
cleverer threshold, so the five were dropped and the three that survive are
judged on the page's own disc colours, never on white.

The room preview is a plain photograph: it is a picture *of* a room, and the
interface sits over it.

Everything else is written as JPEG. The Pexels CDN content-negotiates to AVIF
when asked, and Metro cannot bundle AVIF.
"""

import os
import subprocess
import sys

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'nook')
OUT = os.path.join('assets', 'images')


def _save(crop, size, dest):
    tw, th = size
    scale = max(tw / crop.width, th / crop.height)
    crop = crop.resize((max(1, round(crop.width * scale)), max(1, round(crop.height * scale))),
                       Image.LANCZOS)
    left = int((crop.width - tw) / 2)
    top = int((crop.height - th) / 2)
    crop = crop.crop((left, top, left + tw, top + th))

    path = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    crop.save(path, 'JPEG', quality=88, optimize=True)
    print('%-28s %dx%d' % (dest, tw, th))


def cut(pid, box, size, dest):
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    x0, y0, x1, y1 = box
    _save(im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1))), size, dest)


def lift(pid, dest, box=None, tol=34):
    """Flood-fill the backdrop away and write a transparent PNG."""
    tmp = os.path.join('.probe', 'cut', 'nook-%s.png' % pid)
    os.makedirs(os.path.dirname(tmp), exist_ok=True)
    subprocess.run(
        [sys.executable, os.path.join('tools', 'bake', 'cutout.py'),
         os.path.join(SRC, '%s.jpg' % pid), tmp, '--tol', str(tol), '--trim'],
        check=True, capture_output=True,
    )
    im = Image.open(tmp).convert('RGBA')
    if box:
        w, h = im.size
        x0, y0, x1, y1 = box
        im = im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1)))
    path = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'PNG', optimize=True)
    print('%-28s %dx%d  (cut-out)' % (dest, im.width, im.height))


# The three that cut cleanly: a cantilever chair, a bar stool, an armchair.
LIFTS = [
    ('p-21567547', 'nookstart/f1.png', None),
    ('p-14100419', 'nookstart/f2.png', None),
    # The armchair keeps a pale blob of its own shadow at the foot; crop it off
    # rather than raising the tolerance into the subject.
    ('p-7303462', 'nookstart/f3.png', (0.0, 0.0, 0.84, 0.90)),

    ('p-21567547', 'nookshop/f1.png', None),
    ('p-14100419', 'nookshop/f2.png', None),
    ('p-7303462', 'nookshop/f3.png', (0.0, 0.0, 0.84, 0.90)),
]

CUTS = [
    # nookroom - the interior the preview places a piece into.
    ('p-6980724', (0.02, 0.04, 0.98, 0.96), (820, 1180), 'nookroom/room.jpg'),
    # The thumbnail rail along its foot: three other interiors.
    ('p-6615806', (0.06, 0.08, 0.94, 0.92), (240, 200), 'nookroom/t1.jpg'),
    ('p-20418771', (0.06, 0.08, 0.94, 0.92), (240, 200), 'nookroom/t2.jpg'),
    ('p-31488380', (0.08, 0.10, 0.92, 0.90), (240, 200), 'nookroom/t3.jpg'),
]


if __name__ == '__main__':
    for pid, dest, box in LIFTS:
        lift(pid, dest, box)
    for job in CUTS:
        cut(*job)
