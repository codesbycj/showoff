"""
Bake home's featured card background.

The export builds that card out of four layers, two of which React Native
cannot express at all:

    bg-gradient-to-b from-#F58E43 via-#F4883A to-#EF7C2A      <- base
    img ... contrast-125 opacity-70 translate-y-2 scale-105   <- photo
    bg-gradient-to-t from-black/40 via-transparent
        to-#F58E43/40  mix-blend-multiply                     <- overlay

`contrast()` is a CSS filter and `mix-blend-multiply` is a blend mode; neither
has a React Native equivalent, and faking them with stacked translucent views
does not land on the same pixels. So the whole stack is composited here, once,
and the card draws a single flat image.

The img also carries `mix-blend-luminosity`, which is a no-op in the reference:
its parent is an absolutely-positioned stacking context with no background, so
the backdrop it would blend against is transparent. The render confirms it --
the photo is in full colour, not monochrome orange. It is therefore not applied.

Output is 3x the 353x290dp slot the card fills at 393dp.
"""

import os

from PIL import Image, ImageEnhance

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SCALE = 3
W, H = 353 * SCALE, 290 * SCALE
OUT = os.path.join(ROOT, "assets/images/voyago/hero-dubai.jpg")
SRC = os.path.join(ROOT, "tools/bake/sources/hero-dubai-raw.jpg")


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def vgrad(size, stops):
    """A vertical gradient. `stops` is [(pos, (r, g, b)), ...] with pos in 0..1."""
    w, h = size
    im = Image.new("RGB", (1, h))
    px = im.load()
    for y in range(h):
        t = y / (h - 1)
        for i in range(len(stops) - 1):
            p0, c0 = stops[i]
            p1, c1 = stops[i + 1]
            if p0 <= t <= p1:
                px[0, y] = lerp(c0, c1, (t - p0) / (p1 - p0) if p1 > p0 else 0)
                break
    return im.resize((w, h))


def valpha(size, stops):
    """A vertical ramp of (colour, alpha) pairs, as an RGBA image."""
    w, h = size
    im = Image.new("RGBA", (1, h))
    px = im.load()
    for y in range(h):
        t = y / (h - 1)
        for i in range(len(stops) - 1):
            p0, c0, a0 = stops[i]
            p1, c1, a1 = stops[i + 1]
            if p0 <= t <= p1:
                k = (t - p0) / (p1 - p0) if p1 > p0 else 0
                px[0, y] = lerp(c0, c1, k) + (round(a0 + (a1 - a0) * k),)
                break
    return im.resize((w, h))


def multiply(base, over):
    """`mix-blend-multiply` with a per-pixel source alpha."""
    b = base.load()
    o = over.load()
    out = Image.new("RGB", base.size)
    p = out.load()
    for y in range(base.size[1]):
        for x in range(base.size[0]):
            cb, cs = b[x, y], o[x, y]
            a = cs[3] / 255
            p[x, y] = tuple(
                round(c_b * (1 - a) + a * (c_b * c_s / 255))
                for c_b, c_s in zip(cb, cs[:3])
            )
    return out


# 1. the orange base
base = vgrad((W, H), [(0.0, (0xF5, 0x8E, 0x43)), (0.5, (0xF4, 0x88, 0x3A)), (1.0, (0xEF, 0x7C, 0x2A))])

# 2. the photo, scaled 105% and nudged 8dp down, then contrast-125
photo = Image.open(SRC).convert("RGB").resize((W, H), Image.LANCZOS)
sw, sh = round(W * 1.05), round(H * 1.05)
photo = photo.resize((sw, sh), Image.LANCZOS)
x0 = (sw - W) // 2
y0 = max(0, (sh - H) // 2 - 8 * SCALE)
photo = photo.crop((x0, y0, x0 + W, y0 + H))
photo = ImageEnhance.Contrast(photo).enhance(1.25)

# 3. composite it at 70%
card = Image.blend(base, photo, 0.70)

# 4. the multiply overlay: black/40 at the bottom, transparent mid, #F58E43/40 top
overlay = valpha(
    (W, H),
    [
        (0.0, (0xF5, 0x8E, 0x43), 102),
        (0.5, (0xFF, 0xFF, 0xFF), 0),
        (1.0, (0x00, 0x00, 0x00), 102),
    ],
)
card = multiply(card, overlay)

card.save(OUT, "JPEG", quality=92, optimize=True)
print("wrote %s  %dx%d  %d bytes" % (OUT, W, H, os.path.getsize(OUT)))
