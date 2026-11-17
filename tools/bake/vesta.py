"""
Bake the Vesta board's photography.

    python tools/bake/vesta.py

Sources are free-licensed Pexels frames in `tools/bake/sources/vesta/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**The crops are chosen to exclude other brands' marks** (RULES Step 5). The
black hoodie, p-28701960, carries a small white chest logo at roughly 57% of
the frame height; every crop taken from it stops above that, which is why the
hero is a head-and-hood shot rather than a full torso. A contact sheet cannot
show a 40px mark, so each one was checked at 1:1 first.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF — it would pass every check here and fail
at `expo export`.
"""

import io
import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'vesta')
OUT = os.path.join('assets', 'images')


def cut(pid, box, size, dest):
    """Crop `box` (fractions of w/h) out of a source and fit it to `size`."""
    im = Image.open(os.path.join(SRC, 'p-%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    x0, y0, x1, y1 = box
    crop = im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1)))

    # Cover-fit: scale so the crop fills the target, then centre-trim.
    tw, th = size
    scale = max(tw / crop.width, th / crop.height)
    crop = crop.resize((max(1, round(crop.width * scale)), max(1, round(crop.height * scale))),
                       Image.LANCZOS)
    left = (crop.width - tw) // 2
    top = (crop.height - th) // 2
    crop = crop.crop((left, top, left + tw, top + th))

    path = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    buf = io.BytesIO()
    crop.save(buf, 'JPEG', quality=88, optimize=True)
    with open(path, 'wb') as fh:
        fh.write(buf.getvalue())
    print('%-38s %dx%d' % (dest, tw, th))


JOBS = [
    # vestahome -------------------------------------------------------------
    # The promo model, cut to the right half of the black sale card.
    ('6311251', (0.15, 0.03, 0.95, 0.60), (440, 470), 'vestahome/promo.jpg'),
    ('4791780', (0.10, 0.04, 0.95, 0.82), (520, 650), 'vestahome/tile-tee.jpg'),
    ('13952577', (0.06, 0.02, 0.92, 0.86), (520, 650), 'vestahome/tile-coat.jpg'),
    ('6311668', (0.20, 0.07, 0.84, 0.50), (160, 160), 'vestahome/avatar.jpg'),
    # Stops above the chest mark at ~0.57h of p-28701960.
    ('28701960', (0.16, 0.06, 0.94, 0.52), (520, 650), 'vestahome/tile-hoodie.jpg'),
    ('35145903', (0.10, 0.06, 0.95, 0.80), (520, 650), 'vestahome/tile-jacket.jpg'),

    # vestabrowse -----------------------------------------------------------
    ('13952577', (0.06, 0.02, 0.92, 0.86), (520, 650), 'vestabrowse/p1.jpg'),
    # Stops above the chest mark at ~0.57h.
    ('28701960', (0.16, 0.06, 0.94, 0.52), (520, 650), 'vestabrowse/p2.jpg'),
    ('35145903', (0.10, 0.06, 0.95, 0.80), (520, 650), 'vestabrowse/p3.jpg'),
    ('6551385', (0.18, 0.04, 0.88, 0.90), (520, 650), 'vestabrowse/p4.jpg'),
    ('4791780', (0.10, 0.04, 0.95, 0.82), (520, 650), 'vestabrowse/p5.jpg'),
    ('6311251', (0.10, 0.04, 0.95, 0.84), (520, 650), 'vestabrowse/p6.jpg'),

    # vestaitem -------------------------------------------------------------
    ('28701960', (0.14, 0.05, 0.96, 0.53), (760, 900), 'vestaitem/hero.jpg'),
    ('28701960', (0.26, 0.10, 0.78, 0.44), (180, 180), 'vestaitem/t1.jpg'),
    ('4791780', (0.18, 0.12, 0.84, 0.56), (180, 180), 'vestaitem/t2.jpg'),
    ('35145903', (0.16, 0.10, 0.84, 0.56), (180, 180), 'vestaitem/t3.jpg'),
    ('6551385', (0.30, 0.04, 0.78, 0.76), (180, 180), 'vestaitem/t4.jpg'),
    ('13952577', (0.16, 0.03, 0.72, 0.42), (180, 180), 'vestaitem/t5.jpg'),
]


if __name__ == '__main__':
    for pid, box, size, dest in JOBS:
        cut(pid, box, size, dest)
