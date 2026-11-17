"""
Bake the Lumi board's photography.

    python tools/bake/lumi.py

Only one photograph is needed: the account avatar on `lumihome`. Everything
else on this board is interface — the card is rebuilt as a real component
rather than traced off the board's 3D render (RULES §2.2), and the merchant
marks are drawn, because a real brand's logo is not ours to ship.

Written as JPEG: the Pexels CDN content-negotiates to AVIF when asked, and
Metro cannot bundle AVIF — it would pass every check here and fail at
`expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'lumi')
OUT = os.path.join('assets', 'images')


def cut(pid, box, size, dest):
    """Crop `box` (fractions of w/h) out of a source and cover-fit it."""
    im = Image.open(os.path.join(SRC, 'p-%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    x0, y0, x1, y1 = box
    crop = im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1)))

    tw, th = size
    scale = max(tw / crop.width, th / crop.height)
    crop = crop.resize((max(1, round(crop.width * scale)), max(1, round(crop.height * scale))),
                       Image.LANCZOS)
    left = (crop.width - tw) // 2
    top = (crop.height - th) // 2
    crop = crop.crop((left, top, left + tw, top + th))

    path = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    crop.save(path, 'JPEG', quality=90, optimize=True)
    print('%-34s %dx%d' % (dest, tw, th))


JOBS = [
    ('3228887', (0.22, 0.09, 0.80, 0.53), (160, 160), 'lumihome/avatar.jpg'),
]


if __name__ == '__main__':
    for pid, box, size, dest in JOBS:
        cut(pid, box, size, dest)
