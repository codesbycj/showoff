"""
Bake the photography for the `crate` parcel-delivery showcases.

    python tools/bake/crate.py

Three decisions are recorded here because none of them is recoverable from
the baked files:

**The scan frame is cropped to the centre-right of its source.** The full
frame carries a third box on the left with printing on it that is too blurred
to identify. It is almost certainly a generic handling mark, but "almost
certainly" is not a licence to ship another brand's packaging, so the crop
drops it and keeps the kraft box, the yellow mailer and the two hands.

**The delivery rows show parcels, not products.** The reference puts a Rolex
and a Mac mini in them. Both are real products, and the obvious substitutes
are worse: the best free-licensed earbud shots are recognisably one
manufacturer's design, which is the Coca-Cola-can problem wearing a different
hat. A parcel app showing parcels is also simply more honest.

**Everything is square-cropped and resampled once.** The thumbnails are 40dp
and the scan frame about 300dp, so 240px and 900px respectively are generous
at 3x without carrying a megabyte each into the bundle.
"""

import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(os.path.dirname(__file__), 'sources')


def square(path, out, size, box=None):
    im = Image.open(path).convert('RGB')
    if box:
        w, h = im.size
        im = im.crop((int(w * box[0]), int(h * box[1]), int(w * box[2]), int(h * box[3])))
    w, h = im.size
    side = min(w, h)
    im = im.crop(((w - side) // 2, (h - side) // 2, (w - side) // 2 + side, (h - side) // 2 + side))
    im = im.resize((size, size), Image.LANCZOS)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, quality=86, optimize=True)
    print('  %-44s %dpx' % (os.path.relpath(out, ROOT).replace('\\', '/'), size))


def wide(path, out, w_out, h_out, box=None):
    im = Image.open(path).convert('RGB')
    if box:
        w, h = im.size
        im = im.crop((int(w * box[0]), int(h * box[1]), int(w * box[2]), int(h * box[3])))
    # cover-fit, then centre-crop to the target aspect
    tw, th = w_out, h_out
    sw, sh = im.size
    scale = max(tw / sw, th / sh)
    im = im.resize((int(sw * scale), int(sh * scale)), Image.LANCZOS)
    sw, sh = im.size
    im = im.crop(((sw - tw) // 2, (sh - th) // 2, (sw - tw) // 2 + tw, (sh - th) // 2 + th))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, quality=86, optimize=True)
    print('  %-44s %dx%d' % (os.path.relpath(out, ROOT).replace('\\', '/'), tw, th))


def main():
    A = os.path.join(ROOT, 'assets', 'images')

    print('cratescan:')
    # Keep the right 70% of the frame: the kraft box, the mailer and the hands.
    wide(
        os.path.join(SRC, 'crate-6868621.jpg'),
        os.path.join(A, 'cratescan', 'parcel.jpg'),
        900, 1040,
        box=(0.30, 0.0, 1.0, 1.0),
    )

    print('cratehome:')
    square(os.path.join(SRC, 'crate-11781094.jpg'), os.path.join(A, 'cratehome', 'parcel-1.jpg'), 240)
    square(os.path.join(SRC, 'crate-4554242.jpg'), os.path.join(A, 'cratehome', 'parcel-2.jpg'), 240)
    # A third row, which the reference crops. Two short cards leave a band of
    # grey between the list and the tab bar; three run the list under it.
    square(os.path.join(SRC, 'crate-4498135.jpg'), os.path.join(A, 'cratehome', 'parcel-3.jpg'), 240)

    print('cratetrack:')
    square(os.path.join(SRC, 'crate-11781094.jpg'), os.path.join(A, 'cratetrack', 'parcel.jpg'), 240)


if __name__ == '__main__':
    main()
