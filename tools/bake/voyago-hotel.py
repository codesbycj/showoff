"""
Bake the hotels screen's featured card background.

    img ... object-bottom filter brightness-[0.78] contrast-105
    bg-gradient-to-b from-#0B1518/90 via-#0B1518/30 to-black/60

`brightness()` and `contrast()` are CSS filters with no React Native
equivalent, so the photograph is darkened and the vignette laid over it here,
once, and the card draws one flat asset. The gradient alone could have been an
expo-linear-gradient at runtime -- it is ordinary source-over, not a blend mode
-- but it is baked with the filters so the card has a single layer rather than
one baked and one live.

Output is 3x the 345x360dp slot the card fills at 393dp.
"""

import os

from PIL import Image, ImageEnhance

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SCALE = 3
W, H = 345 * SCALE, 360 * SCALE
OUT = os.path.join(ROOT, "assets/images/voyago/hotel-skyview.jpg")
SRC = os.path.join(ROOT, "tools/bake/sources/hotel-skyview-raw.jpg")


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def vramp(size, stops):
    """A vertical (colour, alpha) ramp as RGBA."""
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


# object-cover, object-bottom: the box is portrait and the source landscape, so
# the crop is horizontal and centred, and the vertical anchor never engages.
src = Image.open(SRC).convert("RGB")
sw, sh = src.size
cw = round(sh * (W / H))
x0 = (sw - cw) // 2
photo = src.crop((x0, 0, x0 + cw, sh)).resize((W, H), Image.LANCZOS)

photo = ImageEnhance.Brightness(photo).enhance(0.78)
photo = ImageEnhance.Contrast(photo).enhance(1.05)

overlay = vramp(
    (W, H),
    [
        (0.0, (0x0B, 0x15, 0x18), 230),
        (0.5, (0x0B, 0x15, 0x18), 77),
        (1.0, (0x00, 0x00, 0x00), 153),
    ],
)

card = Image.alpha_composite(photo.convert("RGBA"), overlay).convert("RGB")
card.save(OUT, "JPEG", quality=92, optimize=True)
print("wrote %s  %dx%d  %d bytes" % (OUT, W, H, os.path.getsize(OUT)))
