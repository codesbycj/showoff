"""Contact sheet of fetched reference screenshots, one app per row.

  python tools/ref/sheet.py <dir> <out.png> [--w 200]

Row order and column order are stable, so a cell can be named "<slug> NN" and
looked up again at 1:1. A contact sheet is only good for the gross question
(interface or marketing art); confirm anything you intend to build at full size.
"""

import argparse
import json
import os

from PIL import Image, ImageDraw


def main():
    p = argparse.ArgumentParser()
    p.add_argument("dir")
    p.add_argument("out")
    p.add_argument("--w", type=int, default=200)
    p.add_argument("--cols", type=int, default=6)
    a = p.parse_args()

    slugs = sorted(
        d for d in os.listdir(a.dir) if os.path.isdir(os.path.join(a.dir, d))
    )
    rows = []
    EXT = (".jpg", ".jpeg", ".png", ".webp", ".avif")
    for s in slugs:
        files = sorted(
            f for f in os.listdir(os.path.join(a.dir, s)) if f.lower().endswith(EXT)
        )
        if files:
            rows.append((s, files))

    cols = max(len(f) for _, f in rows)
    tw = a.w
    # Cell height follows the median aspect of what is actually here: a sheet of
    # posed landscape boards letterboxes into nothing in a phone-shaped cell.
    ars = []
    for s, files in rows:
        for f in files[:6]:
            try:
                w, h = Image.open(os.path.join(a.dir, s, f)).size
                ars.append(h / w)
            except Exception:
                pass
    ars.sort()
    th = int(tw * (ars[len(ars) // 2] if ars else 2622 / 1206))
    pad = 10
    label = 26

    cols = min(cols, a.cols)
    W = pad + cols * (tw + pad)
    H = pad + sum(
        label + ((len(f) + cols - 1) // cols) * (th + pad) for _, f in rows
    )
    sheet = Image.new("RGB", (W, H), (24, 24, 27))
    d = ImageDraw.Draw(sheet)

    y = pad
    for slug, files in rows:
        d.text((pad, y + 6), "%s  (%d)" % (slug, len(files)), fill=(240, 240, 245))
        y += label
        x = pad
        for i, f in enumerate(files, 1):
            if i > 1 and (i - 1) % cols == 0:
                x = pad
                y += th + pad
            try:
                im = Image.open(os.path.join(a.dir, slug, f)).convert("RGB")
            except Exception as e:
                print("  skip %s/%s (%s)" % (slug, f, type(e).__name__))
                x += tw + pad
                continue
            im.thumbnail((tw, th), Image.LANCZOS)
            box = Image.new("RGB", (tw, th), (45, 45, 50))
            box.paste(im, ((tw - im.width) // 2, (th - im.height) // 2))
            sheet.paste(box, (x, y))
            d.text((x + 4, y + 4), "%02d" % i, fill=(255, 220, 90))
            x += tw + pad
        y += th + pad

    sheet.save(a.out)
    print("%s  %dx%d  %d apps  %d shots" % (a.out, W, H, len(rows), sum(len(f) for _, f in rows)))


if __name__ == "__main__":
    main()
