"""
Bake the portraits for batch 6's four interface-led apps.

    python tools/bake/faces6.py

`fold`, `vault`, `axis` and `hush` are the four boards whose photography is
nothing but faces - an account avatar, an advisor, three stacks of colleagues
and an onboarding portrait. The rest of each screen is interface and is drawn.

**Faces are photographs** (I4). Initials on a coloured disc is a fallback
state, not a substitute: a risk register that shows "+6" over three grey discs
is visibly missing what the board had.

Sources are free-licensed Pexels frames in `tools/bake/sources/faces/`, shared
with the previous batch, and credited per showcase in
`assets/images/<slug>/CREDITS.md`.

The advisor is desaturated here rather than tinted at runtime: the board
prints that one portrait in mono, and doing it in the bake keeps the cost off
the device and the result identical on web and Android.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'faces')
OUT = os.path.join('assets', 'images')


def square(pid, cx, cy, frac, size, dest, gray=False):
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * frac)
    x = max(0, min(int(w * cx - side / 2), w - side))
    y = max(0, min(int(h * cy - side / 2), h - side))
    crop = im.crop((x, y, x + side, y + side))

    tw, th = size
    scale = max(tw / crop.width, th / crop.height)
    crop = crop.resize((max(1, round(crop.width * scale)), max(1, round(crop.height * scale))),
                       Image.LANCZOS)
    left = int((crop.width - tw) / 2)
    top = int((crop.height - th) / 2)
    crop = crop.crop((left, top, left + tw, top + th))
    if gray:
        crop = crop.convert('L').convert('RGB')

    path = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    crop.save(path, 'JPEG', quality=88, optimize=True)
    print('%-28s %dx%d%s' % (dest, tw, th, '  (mono)' if gray else ''))


def portrait(pid, box, size, dest, gray=False):
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    x0, y0, x1, y1 = box
    crop = im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1)))

    tw, th = size
    scale = max(tw / crop.width, th / crop.height)
    crop = crop.resize((max(1, round(crop.width * scale)), max(1, round(crop.height * scale))),
                       Image.LANCZOS)
    left = int((crop.width - tw) / 2)
    top = int((crop.height - th) / 2)
    crop = crop.crop((left, top, left + tw, top + th))
    if gray:
        crop = crop.convert('L').convert('RGB')

    path = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    crop.save(path, 'JPEG', quality=88, optimize=True)
    print('%-28s %dx%d%s' % (dest, tw, th, '  (mono)' if gray else ''))


SQUARES = [
    # foldhome - the account avatar in the greeting.
    ('face-30468665', 0.50, 0.38, 0.62, (140, 140), 'foldhome/me.jpg'),

    # axisprofile - owners, managers and stakeholders, three stacks of faces.
    ('face-10816007', 0.50, 0.30, 0.46, (120, 120), 'axisprofile/o1.jpg'),
    ('face-12311572', 0.50, 0.32, 0.50, (120, 120), 'axisprofile/o2.jpg'),
    ('face-26728094', 0.50, 0.26, 0.42, (120, 120), 'axisprofile/m1.jpg'),
    ('face-29852895', 0.50, 0.30, 0.48, (120, 120), 'axisprofile/m2.jpg'),
    ('face-30198184', 0.50, 0.28, 0.44, (120, 120), 'axisprofile/s1.jpg'),
    ('face-7468194', 0.48, 0.28, 0.44, (120, 120), 'axisprofile/s2.jpg'),

    # axisrisk - the two assessment rows, and the account in the header.
    ('face-31409070', 0.50, 0.32, 0.46, (120, 120), 'axisrisk/a1.jpg'),
    ('face-38197025', 0.50, 0.32, 0.50, (120, 120), 'axisrisk/a2.jpg'),
    ('face-9092311', 0.50, 0.42, 0.62, (120, 120), 'axisrisk/me.jpg'),
]

PORTRAITS = [
    # vaultadvisor - the advisor, in mono, as the board prints it.
    ('p-34921744', (0.10, 0.02, 0.90, 0.98), (640, 740), 'vaultadvisor/advisor.jpg', True),

    # hushstart - the onboarding portrait, full bleed behind the headline.
    ('p-7896560', (0.06, 0.00, 0.94, 1.00), (820, 1180), 'hushstart/hero.jpg', False),
]


if __name__ == '__main__':
    for job in SQUARES:
        square(*job)
    for job in PORTRAITS:
        portrait(*job)
