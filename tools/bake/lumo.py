"""
Bake the Lumora board's photography (social-media-app/02).

    python tools/bake/lumo.py

Sources are free-licensed Pexels frames in `tools/bake/sources/lumo/`,
credited per showcase in `assets/images/<slug>/CREDITS.md`.

**Faces and posts are photographs** (I4). A social app is almost entirely
pictures of people, and initials on a disc is a fallback state rather than a
substitute.

**The board's featured card carries a 3D megaphone render.** A render cannot
be traced and must not be drawn badly (SS2.2), so the card carries a drawn mark
and its own gradient instead.

Everything is written as JPEG. The Pexels CDN content-negotiates to AVIF when
asked, and Metro cannot bundle AVIF - it would pass every check here and fail
at `expo export`.
"""

import os

from PIL import Image

SRC = os.path.join('tools', 'bake', 'sources', 'lumo')
OUT = os.path.join('assets', 'images')


def _save(crop, size, dest, bg=None):
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
    """Crop `box` (fractions of w/h) out of a source and cover-fit it."""
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    x0, y0, x1, y1 = box
    _save(im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1))), size, dest)


def square(pid, cx, cy, frac, size, dest):
    """Crop a square of `frac` of the shorter edge, centred on (cx, cy)."""
    im = Image.open(os.path.join(SRC, '%s.jpg' % pid)).convert('RGB')
    w, h = im.size
    side = int(min(w, h) * frac)
    x = max(0, min(int(w * cx - side / 2), w - side))
    y = max(0, min(int(h * cy - side / 2), h - side))
    _save(im.crop((x, y, x + side, y + side)), size, dest)


CUTS = [
    # lumofeed - the post in the feed.
    ('p-3339605', (0.04, 0.02, 0.96, 0.98), (820, 700), 'lumofeed/post.jpg'),

    # lumoreel - the full-bleed reel.
    ('p-6208381', (0.00, 0.00, 1.00, 1.00), (900, 1600), 'lumoreel/hero.jpg'),

    # lumoprofile - the grid.
    ('p-3339605', (0.08, 0.02, 0.92, 0.98), (420, 420), 'lumoprofile/g1.jpg'),
    ('p-6173932', (0.06, 0.04, 0.94, 0.96), (420, 420), 'lumoprofile/g2.jpg'),
    ('p-3727223', (0.10, 0.04, 0.90, 0.96), (420, 420), 'lumoprofile/g3.jpg'),
    ('p-38780318', (0.04, 0.06, 0.96, 0.94), (420, 420), 'lumoprofile/g4.jpg'),
    ('p-13202503', (0.06, 0.04, 0.94, 0.96), (420, 420), 'lumoprofile/g5.jpg'),
    ('p-7081216', (0.06, 0.10, 0.94, 0.92), (420, 420), 'lumoprofile/g6.jpg'),
    ('p-6208381', (0.10, 0.10, 0.90, 0.90), (420, 420), 'lumoprofile/g7.jpg'),
    ('p-12903349', (0.06, 0.06, 0.94, 0.94), (420, 420), 'lumoprofile/g8.jpg'),
    ('p-32341972', (0.08, 0.06, 0.92, 0.94), (420, 420), 'lumoprofile/g9.jpg'),
]

SQUARES = [
    # lumofeed - the account and five stories.
    ('p-6208381', 0.52, 0.30, 0.86, (130, 130), 'lumofeed/me.jpg'),
    ('p-3339605', 0.52, 0.34, 0.50, (120, 120), 'lumofeed/s1.jpg'),
    ('p-12903349', 0.56, 0.30, 0.54, (120, 120), 'lumofeed/s2.jpg'),
    ('p-32341972', 0.42, 0.30, 0.46, (120, 120), 'lumofeed/s3.jpg'),
    ('p-6173932', 0.22, 0.34, 0.42, (120, 120), 'lumofeed/s4.jpg'),
    ('p-13202503', 0.50, 0.26, 0.40, (120, 120), 'lumofeed/s5.jpg'),

    # lumoreel and lumoprofile - the creator.
    ('p-3339605', 0.52, 0.34, 0.50, (130, 130), 'lumoreel/me.jpg'),
    ('p-3339605', 0.52, 0.34, 0.50, (200, 200), 'lumoprofile/me.jpg'),
]


if __name__ == '__main__':
    for job in CUTS:
        cut(*job)
    for job in SQUARES:
        square(*job)