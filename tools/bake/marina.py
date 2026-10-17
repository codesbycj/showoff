"""
Bake Marina's two images to the slots they are drawn in.

Only two: the detail screen's hero and the agent's avatar. Everything else on
that screen is type, a chip or an icon.

The hero gets a crop *and* a darkening ramp along its top edge. White chrome —
the back button, the title, the heart — sits over the top of the photograph,
and a drone shot of bright water gives it nothing to sit against. The
reference's own frame is dark enough up there to carry white type; this one is
not, so the contrast is baked in rather than laid over at runtime as a third
stacked view.

Outputs are 3x the dp slot each image fills.
"""

import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SRC = os.path.join(os.path.dirname(__file__), "sources")
OUT = os.path.join(ROOT, "assets", "images", "marina")
SCALE = 3

# Slot sizes in dp -- these mirror `src/features/marina/layout.ts`.
HERO = (393, 255)
AVATAR = (56, 56)

# The scrim over the hero's top edge: how far down it reaches, and how dark it
# gets at the very top.
SCRIM_DEPTH = 0.42
SCRIM_MAX = 0.38


def crop_to(im, out_w, out_h, cx, cy, zoom=1.0):
    W, H = im.size
    aspect = out_w / out_h
    box_w = min(W, H * aspect) * zoom
    box_h = box_w / aspect
    x = max(0, min(cx * W - box_w / 2, W - box_w))
    y = max(0, min(cy * H - box_h / 2, H - box_h))
    return im.crop((round(x), round(y), round(x + box_w), round(y + box_h))).resize(
        (out_w, out_h), Image.LANCZOS
    )


def bake_hero(src_name, out_name, cx, cy, zoom=1.0):
    w, h = HERO[0] * SCALE, HERO[1] * SCALE
    im = crop_to(Image.open(os.path.join(SRC, src_name)).convert("RGB"), w, h, cx, cy, zoom)
    px = im.load()
    depth = h * SCRIM_DEPTH
    for row in range(int(depth)):
        # Strongest at the very top, gone by `depth`. Squared so the falloff is
        # soft rather than a visible band.
        k = SCRIM_MAX * (1 - row / depth) ** 2
        for col in range(w):
            r, g, b = px[col, row]
            px[col, row] = (round(r * (1 - k)), round(g * (1 - k)), round(b * (1 - k)))
    im.save(os.path.join(OUT, out_name), quality=90, optimize=True)
    print(f"  {out_name:22s} {w}x{h}  from {src_name}")


def bake_avatar(src_name, out_name, cx, cy, zoom=1.0):
    w, h = AVATAR[0] * SCALE, AVATAR[1] * SCALE
    im = crop_to(Image.open(os.path.join(SRC, src_name)).convert("RGB"), w, h, cx, cy, zoom)
    im.save(os.path.join(OUT, out_name), quality=90, optimize=True)
    print(f"  {out_name:22s} {w}x{h}  from {src_name}")


def main():
    os.makedirs(OUT, exist_ok=True)
    print("baking marina imagery")
    # The hull measures at y = 0.283 of the source and x = 0.457 -- high, and
    # just left of centre. Cropped at full width it therefore lands exactly
    # where the title goes, which is how the first bake came out: the name
    # printed across the bow and the hull name lost against white paintwork.
    #
    # The 0.283 above is the centre of every bright pixel, which includes the
    # wake trailing behind the boat -- the *hull* itself runs y 444..900. That
    # distinction cost a bake: framed on the wake-inclusive centre, the bow
    # still came up into the title.
    #
    # Framed on the hull: the title occupies the top ~40% of the hero, so the
    # bow is placed at 45% of it and the boat runs to about 92%, leaving open
    # water above for the type to sit on.
    bake_hero("marina-18262641.jpg", "hero-yacht.jpg", 0.457, 0.182, zoom=0.80)
    # Tight on the face; at 56dp anything wider is a smudge.
    bake_avatar("marina-12437056.jpg", "agent.jpg", 0.30, 0.30, zoom=0.46)


if __name__ == "__main__":
    main()
