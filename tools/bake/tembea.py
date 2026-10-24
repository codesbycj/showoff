"""Crop the seven place photographs for tembeastart's tags.

    python tools/bake/tembea.py

A tag's thumbnail is 30dp square, so 120px covers it at 4x with room for a
larger phone. They are *photographs* and not drawn marks on purpose: a place
is a picture of somewhere, which is out of drawing range however small it ends
up on screen (AGENTS.md, "Know what is in drawing range").

Each is centre-cropped to a square rather than squashed, written as JPEG q86 —
at 120px that is about 5KB a file, so all seven together cost less than one
icon font.
"""

import os

from PIL import Image

SRC = (
    r'C:\Users\CJ\AppData\Local\Temp\claude'
    r'\c--Users-CJ-Documents-Project-Post-showoff'
    r'\10ae5f33-5260-48e5-a84b-b66ab021dd17\scratchpad\cand_tembea'
)
DST = r'C:\Users\CJ\Documents\Project\Post\showoff\assets\images\tembeastart'
SIZE = 120

# Pexels id -> the file the screen imports.
#
# Mapped by *looking* at every candidate with its id written over it, after a
# first pass assigned three of them from memory and got all three wrong.
PICKS = {
    '6790680': 'lodge',  # a lodge deck under palms
    '25950513': 'ridge',  # a green crater rim with a track across it
    '28224323': 'tents',  # safari tents from the air
    '37729825': 'kivu',  # a pool on a terrace, loungers and umbrellas
    '35283497': 'plains',  # a giraffe in dry grass
    '26727614': 'reserve',  # a zebra, close
    '12522152': 'village',  # thatched roofs on a plain
}

# Rejected, and worth writing down: **5574045 and 36298878** are both the same
# safari vehicle, and both carry a tour operator's wordmark on the spare-wheel
# covers plus a legible number plate. A stock frame carrying another business's
# mark cannot go on a page branded as somebody else's app, and neither is
# visible in a contact sheet at thumbnail size -- one of them was baked and
# shipped into the folder before anybody looked at it at 1:1.


def square(path, dest):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    s = min(w, h)
    im = im.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s))
    im = im.resize((SIZE, SIZE), Image.LANCZOS)
    im.save(dest, 'JPEG', quality=86, optimize=True)
    return os.path.getsize(dest)


def main():
    os.makedirs(DST, exist_ok=True)
    total = 0
    for pid, name in PICKS.items():
        src = os.path.join(SRC, pid + '.jpg')
        if not os.path.exists(src):
            print('missing %s' % src)
            continue
        total += square(src, os.path.join(DST, name + '.jpg'))
    print('wrote %d files, %.1f KB' % (len(PICKS), total / 1000))


if __name__ == '__main__':
    main()
