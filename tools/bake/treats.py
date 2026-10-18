"""
Bake the Treats board's photography.

    python tools/bake/treats.py

Two jobs.

**The pack** is one blank stand-up pouch, cropped out of a mockup shot and
**duotoned** into each of the board's three card colours. Duotone rather than a
cut-out: the pouch is white against a pale grey sweep, which is the one
contrast a flood fill cannot find, and the reference's packs sit on a tinted
card anyway — mapping the whole frame onto a colour ramp gives the card and
the pack in one image, with no edge to key.

The pouch is blank on purpose. A real snack pack carries someone else's
trademark, and this board's own name goes on the pack as drawn type in
`pack-card.tsx` — which is the split AGENTS.md asks for: the object is a
photograph, the wordmark is drawn.

**The snack shots** are loose crisps and a snack flatlay, cropped to the
collection cards' letterbox and left in colour.

Sources are free-licensed Pexels photographs; the ids are credited in each
showcase's `CREDITS.md`.
"""

import os

import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')

# The three card colours, as (shadow, highlight). The ramp runs between them,
# so the pouch's own folds survive as lightness rather than as grey.
TONES = {
    'violet': ((0x4a, 0x24, 0x8f), (0xe9, 0xdd, 0xfb)),
    'apricot': ((0x8a, 0x3a, 0x12), (0xfb, 0xe6, 0xd6)),
    'lemon': ((0x7a, 0x5c, 0x0a), (0xfb, 0xf2, 0xd2)),
    'sky': ((0x16, 0x3f, 0x8c), (0xd9, 0xe8, 0xfc)),
    'cream': ((0x8a, 0x5c, 0x12), (0xfb, 0xee, 0xdb)),
    'peach': ((0x9c, 0x3f, 0x18), (0xfb, 0xe0, 0xd2)),
}

# The left-hand pouch, with a third of a frame of empty sweep to its left.
# That empty side is not slack: it is where the product card's own type goes,
# so the card is one photograph rather than a photograph pasted onto a panel.
PACK_BOX = (0.10, 0.04, 0.60, 0.99)


def duotone(im, shadow, highlight):
    a = np.asarray(im.convert('RGB')).astype(np.float64)
    lum = (a @ np.array([0.299, 0.587, 0.114])) / 255.0
    # Stretch the frame's own range before mapping it. A white pouch on a pale
    # grey sweep lives inside about fifteen levels, and a fixed window puts the
    # pack and the backdrop on the same tint -- which is a flat lilac
    # rectangle, not a photograph of a pack.
    lo, hi = np.percentile(lum, 1.5), np.percentile(lum, 99.0)
    lum = np.clip((lum - lo) / max(hi - lo, 1e-6), 0, 1) ** 1.25
    out = np.empty_like(a)
    for c in range(3):
        out[:, :, c] = shadow[c] + (highlight[c] - shadow[c]) * lum
    return Image.fromarray(out.clip(0, 255).astype(np.uint8))


def crop_fraction(im, box):
    w, h = im.size
    return im.crop((round(w * box[0]), round(h * box[1]), round(w * box[2]), round(h * box[3])))


def cover(im, size):
    """Crop to `size`'s aspect about the centre, then resample once."""
    tw, th = size
    w, h = im.size
    scale = max(tw / w, th / h)
    box_w, box_h = tw / scale, th / scale
    left, top = (w - box_w) / 2, (h - box_h) / 2
    return im.crop((round(left), round(top), round(left + box_w), round(top + box_h))).resize(
        (tw, th), Image.LANCZOS
    )


def write(im, slug, name, size):
    out = os.path.join(ROOT, 'assets', 'images', slug)
    os.makedirs(out, exist_ok=True)
    path = os.path.join(out, name)
    cover(im, size).save(path, quality=88, optimize=True)
    print('%s/%s  %dx%d' % (slug, name, *size))


def main():
    pack = crop_fraction(Image.open(os.path.join(SRC, 'treats-12024976.jpg')), PACK_BOX)

    # (slug, name, tone, 3x slot) -- 3x because that is what the emulator and
    # the preview harness both render at.
    for slug, name, tone, size in [
        ('treatstart', 'pack-violet.jpg', 'violet', (690, 600)),
        ('treatstart', 'pack-sky.jpg', 'sky', (690, 600)),
        ('treathome', 'pack-violet.jpg', 'violet', (1035, 1110)),
        ('treatexplore', 'pack-cream.jpg', 'cream', (600, 410)),
        ('treatexplore', 'pack-peach.jpg', 'peach', (600, 410)),
        ('treatexplore', 'pack-lemon.jpg', 'lemon', (600, 410)),
    ]:
        write(duotone(pack, *TONES[tone]), slug, name, size)

    for slug, name, src, size in [
        ('treatexplore', 'snack-1.jpg', 'treats-34466116.jpg', (280, 280)),
        ('treatexplore', 'snack-2.jpg', 'treats-6941033.jpg', (280, 280)),
        ('treatexplore', 'snack-3.jpg', 'treats-9807276.jpg', (280, 280)),
    ]:
        write(Image.open(os.path.join(SRC, src)), slug, name, size)


if __name__ == '__main__':
    main()
