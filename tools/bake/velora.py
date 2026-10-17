"""
Bake Velora's six images to the slots they are drawn in.

Cropping here rather than at runtime, for two reasons. React Native's
`resizeMode="cover"` would centre every one of these, and a centred crop puts
the seated figure's stool in frame and cuts the shoes' heel off -- the subject
is rarely in the middle of a stock photograph. And a 1800px source resampled
down by the GPU every frame is both slower and softer than one resampled once,
properly, here.

Each output is 3x its drawn size, which is the density the preview harness and
the emulator both render at.

The crops are expressed as a centre point and a zoom in *source* fractions,
not as pixel boxes, so re-running against a differently sized download still
frames the same thing.
"""

import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SRC = os.path.join(os.path.dirname(__file__), "sources")
OUT = os.path.join(ROOT, "assets", "images", "velora")
SCALE = 3

# slot (w, h) in dp -- these mirror `src/features/velora/layout.ts`
SLOTS = {
    "promo": (140, 180),
    "product": (170, 240),
    "category": (44, 48),
}


def bake(src_name, out_name, slot, cx, cy, zoom):
    """
    Crop `src_name` about (cx, cy) -- fractions of the source -- at the
    aspect of `slot`, taking `zoom` of the largest box that fits, then
    resample to 3x the slot.
    """
    w_dp, h_dp = SLOTS[slot]
    out_w, out_h = w_dp * SCALE, h_dp * SCALE
    im = Image.open(os.path.join(SRC, src_name)).convert("RGB")
    W, H = im.size

    # The largest box of the target aspect that fits inside the source.
    aspect = out_w / out_h
    box_w = min(W, H * aspect)
    box_h = box_w / aspect
    box_w *= zoom
    box_h *= zoom

    x = cx * W - box_w / 2
    y = cy * H - box_h / 2
    # Keep the box inside the source rather than letting PIL pad it black.
    x = max(0, min(x, W - box_w))
    y = max(0, min(y, H - box_h))

    im = im.crop((round(x), round(y), round(x + box_w), round(y + box_h)))
    im = im.resize((out_w, out_h), Image.LANCZOS)
    path = os.path.join(OUT, out_name)
    im.save(path, quality=88, optimize=True)
    print(f"  {out_name:22s} {out_w}x{out_h}  from {src_name}")


def main():
    os.makedirs(OUT, exist_ok=True)
    print("baking velora imagery")

    # The promo panel. She stands slightly left of centre with the bags held
    # low, so the crop sits high and tight to keep both her face and the bags.
    bake("velora-5622859.jpg", "promo-shopper.jpg", "promo", 0.52, 0.46, 1.0)

    # The two product cards.
    bake("velora-23910818.jpg", "product-jacket.jpg", "product", 0.50, 0.46, 1.0)
    bake("velora-1464625.jpg", "product-shoes.jpg", "product", 0.50, 0.50, 0.92)
    # The second row. Same two frames the category thumbs crop, framed wider:
    # a small store's home screen showing the same pieces twice is honest, and
    # it gives the grid a second row to scroll to.
    bake("velora-9466721.jpg", "product-overshirt.jpg", "product", 0.50, 0.62, 1.0)
    bake("velora-17394914.jpg", "product-trousers.jpg", "product", 0.50, 0.50, 1.0)

    # The three category thumbs. Tight on the garment rather than the face --
    # at 44dp a face is unreadable and the clothing is the subject anyway.
    bake("velora-9466721.jpg", "cat-men.jpg", "category", 0.50, 0.62, 0.78)
    bake("velora-17394914.jpg", "cat-women.jpg", "category", 0.50, 0.52, 0.86)
    bake("velora-1464625.jpg", "cat-shoes.jpg", "category", 0.50, 0.50, 0.70)


if __name__ == "__main__":
    main()
