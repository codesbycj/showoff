"""Resize and re-encode fetched photography to what the page actually needs.

    python optimise.py [--quality 82]

Commons' thumbnailer hands back whatever standard size it already has — a
request for 1400px came back as 1920px and 3-7MB a file, 32MB for the folder.
That is not a bundle, so every image is resized to the width named in
`images.tsv` and re-encoded as WebP, and the JPEG is dropped.

Runs on the folder in place and is idempotent: a file already converted is
skipped, so it is safe to run after adding one row to the manifest.
"""

import json
import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
IMAGES = os.path.join(HERE, "..", "src", "assets", "images")
MANIFEST = os.path.join(HERE, "images.tsv")

quality = int(sys.argv[sys.argv.index("--quality") + 1]) if "--quality" in sys.argv else 82

widths = {}
with open(MANIFEST, encoding="utf-8") as f:
    for line in f:
        if not line.strip() or line.startswith("#"):
            continue
        parts = line.rstrip("\n").split("\t")
        if len(parts) > 2:
            widths[parts[1]] = int(parts[2])

before = after = 0
for name in sorted(os.listdir(IMAGES)):
    if not name.lower().endswith((".jpg", ".jpeg", ".png")):
        continue
    src = os.path.join(IMAGES, name)
    stem = os.path.splitext(name)[0]
    dest = os.path.join(IMAGES, stem + ".webp")
    target = widths.get(name, 1400)

    size_in = os.path.getsize(src)
    before += size_in

    im = Image.open(src).convert("RGB")
    if im.width > target:
        im = im.resize((target, round(im.height * target / im.width)), Image.LANCZOS)
    im.save(dest, "WEBP", quality=quality, method=6)
    size_out = os.path.getsize(dest)
    after += size_out

    # Carry the credit across with the file it belongs to.
    side = src + ".json"
    if os.path.exists(side):
        with open(side, encoding="utf-8") as f:
            meta = json.load(f)
        meta["file"] = stem + ".webp"
        meta["width"], meta["height"] = im.size
        with open(dest + ".json", "w", encoding="utf-8", newline="") as f:
            json.dump(meta, f, indent=1, ensure_ascii=False)
        os.remove(side)
    os.remove(src)
    print(f"{stem + '.webp':<22} {im.width}x{im.height:<5} {size_in // 1024}KB -> {size_out // 1024}KB")

if before:
    print(f"\ntotal {before // 1024}KB -> {after // 1024}KB ({100 - after * 100 // before}% smaller)")
else:
    print("nothing to do")
