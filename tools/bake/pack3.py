"""
Bake the photography for the Hook, Nutrilens and Eats boards.

    python tools/bake/pack3.py

Every one of these is a **crop**, not a cut-out. Each subject is either a scene
(a group of friends shot from below, a deli counter) or already sits in a
rounded frame in the design, so there is no backdrop to remove — and a flood
fill on a photographed room leaves a halo that shows on every frame of a video
(AGENTS.md, "Sourcing assets").

What is *not* here is as deliberate: the Eats screen's product tiles, its
category glyphs and the Nutrilens progress rings are drawn, because a cable, a
razor and a taco mark are small flat objects, which is drawing range.

Sources are free-licensed Pexels photographs; the ids are credited in each
showcase's `CREDITS.md`.
"""

import io
import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')

# (slug, name, source, output size, crop centre in source fractions)
#
# Sizes are 3x the drawn slot, which is what the emulator and the preview
# harness both render at.
JOBS = [
    # Hook - the camera screen is one full-bleed photograph.
    ('hookcam', 'hero.jpg', 'pack3-4881619.jpg', (1179, 2556), (0.5, 0.52)),
    # ... and the dashboard's two picture cards.
    ('hookdash', 'profile.jpg', 'faces/face-11091224.jpg', (480, 480), (0.5, 0.45)),
    ('hookdash', 'memories.jpg', 'pack3-4518022.jpg', (900, 600), (0.5, 0.42)),

    # Nutrilens - a pile of vegetables, a plated meal, and a thumbnail of it.
    ('nutrione', 'veg.jpg', 'pack3-39255979.jpg', (1179, 1100), (0.5, 0.55)),
    ('nutrione', 'bowl.jpg', 'sprouts-4828091.jpg', (120, 120), (0.5, 0.46)),
    ('nutrithree', 'plate.jpg', 'pack3-13422468.jpg', (780, 780), (0.46, 0.55)),

    # Eats - the fan of three over the hero, and the two featured cards.
    # Cropped off the bottle at the left: it carries a real trademark and
    # the showcase substitutes brands rather than bundling them.
    ('eatsnyc', 'dish-1.jpg', 'pack3-6068717.jpg', (300, 300), (0.62, 0.3)),
    ('eatsnyc', 'dish-2.jpg', 'pack3-24796900.jpg', (300, 300), (0.5, 0.5)),
    ('eatsnyc', 'dish-3.jpg', 'pack3-27988502.jpg', (300, 300), (0.5, 0.45)),
    ('eatsnyc', 'feat-1.jpg', 'pack3-5837196.jpg', (720, 480), (0.5, 0.5)),
    ('eatsnyc', 'feat-2.jpg', 'treats-6941033.jpg', (720, 480), (0.5, 0.5)),
    ('eatsnyc', 'snack.jpg', 'treats-34466116.jpg', (420, 480), (0.5, 0.5)),
]

CREDITS = {
    'hookcam': [('hero.jpg', '4881619'), ('face-*.jpg', '12311572 and the rest of the cast')],
    'hookdash': [('profile.jpg', '11091224'), ('memories.jpg', '4518022'),
                 ('face-*.jpg', 'the bake tool&rsquo;s fixed cast')],
    'nutrione': [('veg.jpg', '39255979'), ('bowl.jpg', '4828091')],
    'nutrithree': [('plate.jpg', '13422468')],
    'eatsnyc': [('dish-1.jpg', '6068717'), ('dish-2.jpg', '24796900'),
                ('dish-3.jpg', '27988502'), ('feat-1.jpg', '5837196'),
                ('feat-2.jpg', '6941033'), ('snack.jpg', '34466116')],
}


def crop(src, size, centre):
    im = Image.open(os.path.join(SRC, src)).convert('RGB')
    w, h = im.size
    scale = max(size[0] / w, size[1] / h)
    box_w, box_h = size[0] / scale, size[1] / scale
    x = min(max(centre[0] * w - box_w / 2, 0), w - box_w)
    y = min(max(centre[1] * h - box_h / 2, 0), h - box_h)
    return im.crop((round(x), round(y), round(x + box_w), round(y + box_h))).resize(
        size, Image.LANCZOS
    )


def main():
    for slug, name, src, size, centre in JOBS:
        out = os.path.join(ROOT, 'assets', 'images', slug)
        os.makedirs(out, exist_ok=True)
        crop(src, size, centre).save(os.path.join(out, name), quality=88, optimize=True)
        print('%s/%s  %dx%d' % (slug, name, *size))

    for slug, rows in CREDITS.items():
        out = os.path.join(ROOT, 'assets', 'images', slug)
        os.makedirs(out, exist_ok=True)
        body = '\n'.join(
            '| `%s` | Pexels photo [%s](https://www.pexels.com/photo/%s/) |' % (f, pid, pid)
            for f, pid in rows
        )
        io.open(os.path.join(out, 'CREDITS.md'), 'w', encoding='utf-8', newline='').write(
            '# %s - image credits\n\n'
            'Free-licensed photographs from Pexels, standing in for the\n'
            "reference's own imagery, which is not redistributable.\n\n"
            '| file | source |\n| --- | --- |\n%s\n' % (slug, body)
        )
    print('credits written')


if __name__ == '__main__':
    main()
