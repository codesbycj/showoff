"""
Bake EliteBeauty's onboarding imagery.

The hero is the one that needs explaining. The reference puts a *cut-out*
stylist on a flat mauve wash. The stock frame standing in for her is a salon
interior, and cutting a figure out of it would be hopeless — so the hero here
is the whole frame, washed in the reference's own mauve and faded to white
along its bottom edge, which is where the page takes over.

All of that is baked rather than layered at runtime. `expo-linear-gradient`
could do the fade live, but then the hero is three stacked views whose order
and blend have to stay right on two platforms, and the tint would need a blend
mode React Native does not have. One flat asset has none of those problems and
costs one draw.

Outputs are 3x the dp slot each image fills.
"""

import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SRC = os.path.join(os.path.dirname(__file__), "sources")
OUT = os.path.join(ROOT, "assets", "images", "elite")
SCALE = 3

# Slot sizes in dp -- these mirror `src/features/elite/layout.ts`.
HERO = (393, 470)
CARD = (104, 132)

# The reference's wash samples as #d9cfd7 drifting to #d2c8d0 -- but those are
# the colour of a *flat backdrop behind a cut-out figure*, and this hero is a
# whole photograph. Mixing a near-neutral mauve into a colour photo at 35% does
# not tint it lavender; it just desaturates it, which is exactly how the first
# bake came out -- a grey salon, not a lilac one.
#
# So the tint applied is pushed toward the brand violet until the cast is
# actually visible through the photograph. The sampled values stay recorded in
# `src/features/elite/theme.ts`; these are what it takes to read as those.
TINT_TOP = (206, 191, 224)
TINT_BOTTOM = (221, 211, 230)
# How much of the tint to mix in, top to bottom of the hero.
TINT_ALPHA_TOP = 0.46
TINT_ALPHA_BOTTOM = 0.52
# The bottom fade to white: starts this far down the hero, reaches full white
# at the very bottom edge.
FADE_FROM = 0.62


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def bake_hero(src_name, out_name, cx, cy, zoom=1.0):
    w, h = HERO[0] * SCALE, HERO[1] * SCALE
    im = Image.open(os.path.join(SRC, src_name)).convert("RGB")
    W, H = im.size
    aspect = w / h
    box_w = min(W, H * aspect) * zoom
    box_h = box_w / aspect
    x = max(0, min(cx * W - box_w / 2, W - box_w))
    y = max(0, min(cy * H - box_h / 2, H - box_h))
    im = im.crop((round(x), round(y), round(x + box_w), round(y + box_h))).resize(
        (w, h), Image.LANCZOS
    )

    px = im.load()
    for row in range(h):
        t = row / (h - 1)
        tint = lerp(TINT_TOP, TINT_BOTTOM, t)
        alpha = TINT_ALPHA_TOP + (TINT_ALPHA_BOTTOM - TINT_ALPHA_TOP) * t
        # The fade runs on its own curve, squared so it stays out of the way
        # until the last third and then arrives quickly.
        fade = 0.0 if t < FADE_FROM else ((t - FADE_FROM) / (1 - FADE_FROM)) ** 1.6
        for col in range(w):
            r, g, b = px[col, row]
            r = r + (tint[0] - r) * alpha
            g = g + (tint[1] - g) * alpha
            b = b + (tint[2] - b) * alpha
            if fade:
                r = r + (255 - r) * fade
                g = g + (255 - g) * fade
                b = b + (255 - b) * fade
            px[col, row] = (round(r), round(g), round(b))

    im.save(os.path.join(OUT, out_name), quality=90, optimize=True)
    print(f"  {out_name:22s} {w}x{h}  from {src_name}")


def bake_card(src_name, out_name, cx, cy, zoom=1.0):
    w, h = CARD[0] * SCALE, CARD[1] * SCALE
    im = Image.open(os.path.join(SRC, src_name)).convert("RGB")
    W, H = im.size
    aspect = w / h
    box_w = min(W, H * aspect) * zoom
    box_h = box_w / aspect
    x = max(0, min(cx * W - box_w / 2, W - box_w))
    y = max(0, min(cy * H - box_h / 2, H - box_h))
    im = im.crop((round(x), round(y), round(x + box_w), round(y + box_h))).resize(
        (w, h), Image.LANCZOS
    )
    im.save(os.path.join(OUT, out_name), quality=88, optimize=True)
    print(f"  {out_name:22s} {w}x{h}  from {src_name}")


def main():
    os.makedirs(OUT, exist_ok=True)
    print("baking elite imagery")
    # She sits right of centre, so the crop follows her rather than the middle
    # of the salon -- and pulls in enough that she reads as the subject. At
    # full frame she was a small figure in a large room, where the reference
    # fills its hero with one person.
    bake_hero("elite-9709014.jpg", "hero-stylist.jpg", 0.57, 0.40, zoom=0.80)

    bake_card("elite-12115041.jpg", "card-facial.jpg", 0.50, 0.45)
    bake_card("elite-3993449.jpg", "card-wash.jpg", 0.48, 0.42)
    bake_card("elite-3993453.jpg", "card-cut.jpg", 0.50, 0.50)


if __name__ == "__main__":
    main()
