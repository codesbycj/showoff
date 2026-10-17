"""
Bake Cargo's hero.

One image, and nearly all the work in it is the wash. The reference's screen is
a truck photograph that does not stop anywhere — it is tinted yellow all the
way down and simply becomes the page, with the road at the bottom turning into
flat brand yellow with no seam.

That is why it is baked rather than layered. Done at runtime it would be the
photograph, a tint and a fade stacked three deep, with the tint wanting a blend
mode React Native does not have and the fade's last stop needing to match the
page colour exactly or leave a visible band. Baked, the asset *ends* in the
page colour by construction and the screen draws one image.

## Desaturate before tinting

The order matters and the first two bakes got it wrong. Mixing yellow into a
blue sky gives **green** — that is simply what those two make — and the result
was an olive cast across the whole upper half. Trying to correct it by pulling
the blue channel down did not help much either, because what is left is still
a high green channel.

Draining the colour out first fixes it at the root: yellow over *grey* is gold.
So the frame is desaturated, then tinted. The reference does not need this
because its own photograph is already a warm sunset.

## And do it with image operations, not a pixel loop

The first version walked all 1179x1740 pixels in Python and took over two
minutes. `ImageEnhance` and `Image.composite` do the same work in C: the tint
and the fade collapse into a single per-row alpha, which is a one-pixel-wide
mask stretched to width.
"""

import os

from PIL import Image, ImageEnhance

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SRC = os.path.join(os.path.dirname(__file__), "sources")
# Two showcases come out of this one design: the onboarding screen is
# `cargo` and the home screen is `cargohome`, each with its own assets
# folder so that neither depends on the other being present.
OUT = os.path.join(ROOT, "assets", "images", "cargo")
OUT_HOME = os.path.join(ROOT, "assets", "images", "cargohome")
SCALE = 3

# The slots, in dp. These mirror `src/features/cargo/layout.ts`.
HERO = (393, 580)
AVATAR = (44, 44)

# The brand yellow, sampled off the reference: #f8dd4e. The wash tends toward
# it and the fade ends on it exactly, so the asset's last row *is* the page.
YELLOW = (248, 221, 78)

# How much colour to drain before tinting. 0 keeps the photograph as shot, 1
# is fully grey. See the note above for why this is not optional.
#
# 0.90 is not a taste call. Sweeping it and measuring the sky's channels, the
# cast only flips from green to warm (R >= G) at 0.88 -- below that the storm
# clouds keep enough blue to turn green under the yellow. 0.90 clears it with
# a little margin, and the contrast below puts back the detail that draining
# the colour costs.
DESATURATE = 0.90

# Lifted after draining the colour, because desaturating flattens a photograph
# and the truck is the only thing on this screen with any detail in it.
CONTRAST = 1.26

# Yellow mixed in at the top of the frame, and by the point the fade starts.
#
# The top figure is deliberately small. At 0.30 the sky and the truck came out
# as one flat olive field -- the wash has to *arrive*, not be there from the
# first row, or there is no photograph left to fade from.
TINT_TOP = 0.10
TINT_AT_FADE = 0.62
# Where the fade to flat yellow begins, as a fraction of the hero's height.
FADE_FROM = 0.58


def main():
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(OUT_HOME, exist_ok=True)
    print("baking cargo imagery")

    w, h = HERO[0] * SCALE, HERO[1] * SCALE
    im = Image.open(os.path.join(SRC, "cargo-12261472.jpg")).convert("RGB")
    W, H = im.size

    # The truck sits centre and low in the frame; the crop follows it and keeps
    # enough sky above for the status bar to sit on.
    aspect = w / h
    box_w = min(W, H * aspect)
    box_h = box_w / aspect
    cx, cy = 0.50, 0.46
    x = max(0, min(cx * W - box_w / 2, W - box_w))
    y = max(0, min(cy * H - box_h / 2, H - box_h))
    im = im.crop((round(x), round(y), round(x + box_w), round(y + box_h))).resize(
        (w, h), Image.LANCZOS
    )

    im = ImageEnhance.Color(im).enhance(1.0 - DESATURATE)

    # Warm the greys *after* draining the colour, never before.
    #
    # On the original frame this would have done little -- a blue sky stays
    # blue enough to turn green under the tint. On a near-grey frame the same
    # scale is a sepia, and sepia under yellow is gold. The order is the whole
    # trick: desaturate, warm, then tint.
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.05)))
    b = b.point(lambda v: int(v * 0.84))
    im = Image.merge('RGB', (r, g, b))

    im = ImageEnhance.Contrast(im).enhance(CONTRAST)

    # One alpha per row: the tint, plus whatever the fade adds on top of it.
    mask = Image.new("L", (1, h))
    mpx = mask.load()
    for row in range(h):
        t = row / (h - 1)
        if t < FADE_FROM:
            tint = TINT_TOP + (TINT_AT_FADE - TINT_TOP) * (t / FADE_FROM)
            fade = 0.0
        else:
            tint = TINT_AT_FADE
            # Squared, so the photograph survives a little past the fade line
            # and then goes quickly -- a linear ramp reads as a veil over the
            # whole lower half rather than a horizon.
            fade = ((t - FADE_FROM) / (1 - FADE_FROM)) ** 2
        a = tint + (1.0 - tint) * fade
        mpx[0, row] = round(max(0.0, min(1.0, a)) * 255)

    mask = mask.resize((w, h))
    flat = Image.new("RGB", (w, h), YELLOW)
    im = Image.composite(flat, im, mask)

    im.save(os.path.join(OUT, "hero-truck.jpg"), quality=92, optimize=True)
    print(f"  hero-truck.jpg         {w}x{h}  from cargo-12261472.jpg")

    # The account photograph on the home screen. Tight on the face -- at 44dp
    # anything wider is a smudge -- and left alone otherwise: it is the one
    # thing on that screen that should look like a person rather than like the
    # brand.
    aw, ah = AVATAR[0] * SCALE, AVATAR[1] * SCALE
    av = Image.open(os.path.join(SRC, "cargo-9775432.jpg")).convert("RGB")
    AW, AH = av.size
    # Measured off the source rather than guessed: the face spans roughly
    # x 450..990 and y 0..720 of a 1200x800 frame, so its centre is about
    # (0.60, 0.26). The first pass used (0.52, 0.36) and cropped a chin.
    box = min(AW, AH) * 0.55
    ax = max(0, min(0.60 * AW - box / 2, AW - box))
    ay = max(0, min(0.26 * AH - box / 2, AH - box))
    av = av.crop((round(ax), round(ay), round(ax + box), round(ay + box))).resize(
        (aw, ah), Image.LANCZOS
    )
    av.save(os.path.join(OUT_HOME, "avatar.jpg"), quality=90, optimize=True)
    print(f"  avatar.jpg             {aw}x{ah}  from cargo-9775432.jpg")

    # The last row must be the page colour, or the join shows as a band.
    last = im.load()[w // 2, h - 1]
    print(f"  last row {last} vs page {YELLOW} -> {'match' if last == YELLOW else 'MISMATCH'}")


if __name__ == "__main__":
    main()
