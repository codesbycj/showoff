"""Crop the bicycle photographs for the spoke* showcases.

    python tools/bake/spoke.py

**These are photographs, not drawings.** A bicycle is a large specific subject
and vectoring one produces a cartoon of a bike where the design had a bike
(AGENTS.md, "Know what is in drawing range"). Clean product shots of bikes on
a studio sweep turned out not to exist in free stock, so these are crops of
real bikes in real places — the same answer `mileshome` reached for its
category cards: the photograph is a crop, not a cut-out, and it fills the
card's own shape.

**Checked at 1:1 for other brands' marks**, because a contact sheet cannot
show a 40px decal. Two candidates were rejected for carrying them: Pexels
18699412 (a motorcycle engine with the maker's badge across it) and 35567435
(a wheel with two component makers' wordmarks on the rim). The frame kept for
`e-bike` is cropped to the left-hand bicycle: the white one beside it has a
legible decal on its down tube.
"""

import os

from PIL import Image, ImageEnhance

SRC = (
    r'C:\Users\CJ\AppData\Local\Temp\claude'
    r'\c--Users-CJ-Documents-Project-Post-showoff'
    r'\10ae5f33-5260-48e5-a84b-b66ab021dd17\scratchpad\cand_bike3'
)
DST = r'C:\Users\CJ\Documents\Project\Post\showoff\assets\images'

# id -> (slug/name, crop box as a share of the frame, how much colour to keep)
PICKS = [
    ('19353575', 'spokecats/bike-copper', (0.00, 0.56, 1.00, 1.00), 0.85),
    ('17331856', 'spokecats/bike-dark', (0.08, 0.14, 0.62, 0.92), 0.55),
    # The hero needs the WHOLE bicycle in frame. The copper frame is cut off
    # at the foot of its own photograph, so a crop of it shows handlebars
    # and nothing else once it fills a 393dp stage.
    # Near-square, because the stage it covers is near-square: a portrait
    # crop in a landscape-ish box is cropped to its middle, which on this
    # frame is a wall and a saddle. Cropped to the bikes instead.
    ('17331856', 'spokebike/bike-hero', (0.14, 0.26, 1.00, 0.84), 0.6),
]

WIDTH = 760


def crop(pid, dest, box, sat):
    im = Image.open(os.path.join(SRC, pid + '.jpg')).convert('RGB')
    w, h = im.size
    im = im.crop((int(box[0] * w), int(box[1] * h), int(box[2] * w), int(box[3] * h)))
    if im.width > WIDTH:
        im = im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS)
    im = ImageEnhance.Color(im).enhance(sat)
    out = os.path.join(DST, dest + '.jpg')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, 'JPEG', quality=85, optimize=True)
    return os.path.getsize(out)


def main():
    total = 0
    for pid, dest, box, sat in PICKS:
        total += crop(pid, dest, box, sat)
    print('wrote %d files, %.0f KB' % (len(PICKS), total / 1000))


if __name__ == '__main__':
    main()
