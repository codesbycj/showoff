"""Generate every image on the before, in one pass.

    python tools/fetch-fonts.py
    python tools/bake-before.py

This episode's before angle is **the whole page is a JPEG**: its headings, its
wordmark, its introduction and its fee table are not text, they are files, and
this is what makes them. Running the script is the only way to change a word of
them — which is exactly the position the imaginary 2009 client was in.

Three period defects are reproduced deliberately:

  * **JPEG at quality 55.** Type on a flat ground is the worst case for a DCT:
    every stem gets a ring of mosquito noise. A designer in 2009 picked JPEG
    because the file was smaller and the difference was invisible on a CRT.
  * **One pixel density.** Each image is generated at the size it is displayed
    at, so on any modern screen it is upscaled and soft while the HTML beside
    it is sharp. That mismatch is the tell.
  * **The background is baked in.** Every image carries its own cream
    rectangle, so the wordmark sits on the navy header band as a pale block —
    which nobody noticed, because the band used to be cream.

Fonts come from `tools/_fonts` via `fetch-fonts.py`: Cinzel standing in for
Trajan and PT Serif for Georgia, both OFL. Pointing PIL at
`C:/Windows/Fonts/georgia.ttf` is what the imaginary designer actually did and
is neither redistributable nor reproducible.
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, '_fonts')
OUT = os.path.join(HERE, '..', 'src', 'before', 'img')

CREAM = (246, 243, 236)
INK = (51, 51, 51)
NAVY = (31, 58, 87)
GOLD = (150, 122, 61)
RULE = (208, 200, 184)


def face(name, size):
    path = os.path.join(FONTS, name)
    if not os.path.exists(path):
        sys.exit('missing %s — run: python tools/fetch-fonts.py' % name)
    return ImageFont.truetype(path, size)


def save(im, name):
    os.makedirs(OUT, exist_ok=True)
    dest = os.path.join(OUT, name + '.jpg')
    im.save(dest, 'JPEG', quality=55, subsampling=2)
    print('%-18s %4dx%-4d %7d bytes' % (name + '.jpg', im.width, im.height, os.path.getsize(dest)))


def measure(d, text, font):
    b = d.textbbox((0, 0), text, font=font)
    return b[2] - b[0], b[3] - b[1]


def head(text, size, colour=NAVY, caps=True, rule=False):
    """A section heading: Trajan-ish capitals, letterspaced, over cream."""
    if caps:
        text = text.upper()
    f = face('Cinzel[wght].ttf', size)
    track = max(1, round(size * 0.06))
    pad_x, pad_y = 14, 10

    d = ImageDraw.Draw(Image.new('RGB', (10, 10)))
    widths = [measure(d, ch, f)[0] for ch in text]
    w = int(sum(widths) + track * (len(text) - 1)) + pad_x * 2
    h = int(size * 1.5) + pad_y * 2 + (14 if rule else 0)

    im = Image.new('RGB', (w, h), CREAM)
    d = ImageDraw.Draw(im)
    x = pad_x
    for ch, cw in zip(text, widths):
        d.text((x, pad_y), ch, font=f, fill=colour)
        x += cw + track
    if rule:
        d.line([(pad_x, h - 12), (w - pad_x, h - 12)], fill=GOLD, width=2)
    return im


def para(text, size, colour=INK, width=600):
    """Body copy that is also an image. Lines split on `|`."""
    f = face('PTSerif-Regular.ttf', size)
    lines = text.split('|')
    lead = int(size * 1.62)
    pad = 12
    im = Image.new('RGB', (width, lead * len(lines) + pad * 2), CREAM)
    d = ImageDraw.Draw(im)
    for i, line in enumerate(lines):
        d.text((pad, pad + i * lead), line, font=f, fill=INK if colour is INK else colour)
    return im


def table(rows):
    """The fee table, exported as one flat image. Nothing in it is copyable."""
    fh = face('PTSerif-Bold.ttf', 15)
    fb = face('PTSerif-Regular.ttf', 15)
    cols = max(len(r) for r in rows)
    colw = [0] * cols
    probe = ImageDraw.Draw(Image.new('RGB', (10, 10)))
    for r in rows:
        for i, cell in enumerate(r):
            colw[i] = max(colw[i], measure(probe, cell, fh)[0])
    pad, rowh = 16, 34
    w = sum(colw) + pad * (cols + 1)
    h = rowh * len(rows) + pad

    im = Image.new('RGB', (w, h), CREAM)
    d = ImageDraw.Draw(im)
    for ri, r in enumerate(rows):
        y = ri * rowh + 8
        if ri == 0:
            d.rectangle([0, 0, w, rowh], fill=NAVY)
        x = pad
        for ci, cell in enumerate(r):
            d.text((x, y), cell, font=fh if ri == 0 else fb, fill=CREAM if ri == 0 else INK)
            x += colw[ci] + pad
        if ri:
            d.line([(0, y + rowh - 8), (w, y + rowh - 8)], fill=RULE, width=1)
    return im


def banner(lines, width=940, height=300):
    """The hero: a flat colour field with the headline burnt into it.

    The period's single worst habit, and the hardest to argue with at the time —
    the designer wanted type over an image, the CMS could not do it, so the type
    went into the image. The whole thing is one 940px JPEG with a headline
    nobody can select, search, translate or resize, and it cannot reflow at any
    other width.
    """
    im = Image.new('RGB', (width, height), (24, 46, 38))
    d = ImageDraw.Draw(im)
    for y in range(height):
        t = y / height
        d.line([(0, y), (width, y)], fill=(int(24 + 18 * t), int(46 + 26 * t), int(38 + 20 * t)))

    f = face('Cinzel[wght].ttf', 31)
    fs = face('PTSerif-Regular.ttf', 16)
    y = 58
    for line in lines[:2]:
        text = line.upper()
        widths = [measure(d, ch, f)[0] for ch in text]
        x = (width - (sum(widths) + 3 * (len(text) - 1))) / 2
        for ch, cw in zip(text, widths):
            # A 1px black offset: every heading in 2009 had a drop shadow, and
            # this is what the Photoshop default looked like.
            d.text((x + 1, y + 1), ch, font=f, fill=(0, 0, 0))
            d.text((x, y), ch, font=f, fill=(255, 255, 255))
            x += cw + 3
        y += 52
    for line in lines[2:]:
        w, _ = measure(d, line, fs)
        d.text(((width - w) / 2, y + 6), line, font=fs, fill=(226, 222, 210))
        y += 26
    return im


HEADS = [
    ('h-who', 'Who we act for'),
    ('h-services', 'Our services'),
    ('h-steps', 'How it works'),
    ('h-why', 'Why choose us'),
    ('h-contact', 'Contact us'),
]

FEES = [
    ['Service', 'Sole trader', 'Limited company'],
    ['Onboarding', 'Included', 'Included'],
    ['Quarterly reports', 'Included', 'Included'],
    ['Annual accounts', 'n/a', 'Included'],
    ['Self assessment', 'Included', 'Included'],
    ['VAT returns', 'POA', 'POA'],
    ['Payroll & pensions', 'n/a', 'POA'],
    ['Monthly fee (excl. VAT)', '£55.00', '£145.00'],
]


def main():
    save(
        banner(
            [
                'Creatives, face the',
                'tax man together',
                'Accountants for UK-based creatives who would rather be creating',
            ]
        ),
        'banner',
    )
    save(head('the tare', 46), 'logo')
    save(para('CHARTERED ACCOUNTANTS  ·  LONDON', 12, width=330), 'strap')
    for name, text in HEADS:
        save(head(text, 30, rule=True), name)
    save(
        para(
            'tare is a small practice of chartered accountants acting for|'
            'freelance and small-company clients in the creative industries|'
            'throughout the United Kingdom.||'
            'We pride ourselves on a personal, professional service at a|'
            'competitive fixed fee. Please do not hesitate to contact us to|'
            'discuss your requirements.',
            15,
        ),
        'p-intro',
    )
    save(table(FEES), 't-fees')


if __name__ == '__main__':
    main()
