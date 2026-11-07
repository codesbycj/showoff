"""Score a store screenshot: is it a real full-bleed screen, or marketing art?

  python tools/ref/screenscore.py <dir> [--csv out.csv]

The question is not "what resolution is it" - Revolut ships a 3D card render at
native iPhone resolution with a headline over it, and the filename says
1206x2622 either way. The question is HOW MUCH OF THE FRAME IS INTERFACE.

Two measurements, both cheap and both robust to the app's own colours:

POSED   A phone composited onto a board has a vertical boundary at the same x
        on most rows - the device edge. Walk each row in from x=0 until the
        colour breaks from that row's first pixel; a posed frame agrees on
        where that happens, a real export does not. Measured on both sides;
        the smaller agreement wins, because a frame bled off one edge is still
        posed. This is the discriminator: it does not care whether the app is
        light or dark, busy or plain.

CAPTION A flat full-width band at the foot (Duolingo's "learn 40+ languages")
        is marketing furniture sitting under a real screen. It is reported, not
        penalised, so the fetch can crop it off and keep the screen above it.

A frame passes when it is not posed. Its usable height is the frame less the
caption band.
"""

import argparse
import csv
import json
import os
import sys

import numpy as np
from PIL import Image

BREAK = 42.0       # per-channel distance that counts as a colour break
SPAN = (0.22, 0.88)  # rows to sample: skip status bar and home indicator
AGREE_TOL = 0.012  # +/- fraction of width counted as "the same x"
POSED_INSET = 0.015  # a boundary nearer the edge than this is not a device edge
POSED_AGREE = 0.55   # fraction of rows agreeing before we call it posed
FLAT_STD = 6.0     # per-channel std under which a row counts as flat colour


def _edge_profile(a):
    """For each sampled row, the x where colour first breaks from pixel 0."""
    h, w = a.shape[:2]
    y0, y1 = int(h * SPAN[0]), int(h * SPAN[1])
    rows = a[y0:y1].astype(np.int16)
    first = rows[:, 0, :][:, None, :]
    d = np.abs(rows - first).max(axis=2)
    broke = d > BREAK
    # argmax gives the first True; rows that never break get w (no boundary)
    idx = np.where(broke.any(axis=1), broke.argmax(axis=1), w)
    return idx


def _posed_side(idx, w):
    """Inset and agreement for one side."""
    real = idx[idx < w]
    if real.size < idx.size * 0.4:
        return 0.0, 0.0  # most rows never break: full-bleed flat-edged screen
    med = float(np.median(real))
    agree = float(np.mean(np.abs(real - med) <= w * AGREE_TOL))
    return med / w, agree


def caption_band(a):
    """Height fraction of a flat full-width band at the foot."""
    h, w = a.shape[:2]
    rows = a.astype(np.int16)
    flat = rows.reshape(h, w, -1).std(axis=1).max(axis=1) < FLAT_STD
    # modal colour of the last row, walked upward while rows stay flat and same
    if not flat[-1]:
        return 0.0
    base = rows[-1].mean(axis=0)
    y = h - 1
    while y > 0 and flat[y] and np.abs(rows[y].mean(axis=0) - base).max() < BREAK:
        y -= 1
    return (h - 1 - y) / h


def score(path):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im)
    h, w = a.shape[:2]

    left_in, left_ag = _posed_side(_edge_profile(a), w)
    right_in, right_ag = _posed_side(_edge_profile(a[:, ::-1]), w)

    # Posed only if BOTH sides show a device edge; one bled edge is still posed
    # art, but one agreeing side alone is often a real sidebar or rail.
    posed = (
        left_in > POSED_INSET
        and right_in > POSED_INSET
        and min(left_ag, right_ag) > POSED_AGREE
    )
    cap = caption_band(a)
    return {
        "file": os.path.basename(path),
        "w": w,
        "h": h,
        "ratio": round(w / h, 4),
        "left_inset": round(left_in, 4),
        "left_agree": round(left_ag, 3),
        "right_inset": round(right_in, 4),
        "right_agree": round(right_ag, 3),
        "caption": round(cap, 4),
        "posed": posed,
        "clean": not posed,
    }


def main():
    p = argparse.ArgumentParser()
    p.add_argument("dir")
    p.add_argument("--csv")
    p.add_argument("--quiet", action="store_true")
    a = p.parse_args()

    rows = []
    slugs = sorted(d for d in os.listdir(a.dir) if os.path.isdir(os.path.join(a.dir, d)))
    if not slugs:
        slugs = [""]
    for s in slugs:
        d = os.path.join(a.dir, s)
        files = sorted(f for f in os.listdir(d) if f.lower().endswith((".jpg", ".png")))
        clean = 0
        for f in files:
            r = score(os.path.join(d, f))
            r["slug"] = s
            rows.append(r)
            clean += r["clean"]
            if not a.quiet:
                print(
                    "%-12s %-8s %5dx%-5d L%.3f/%.2f R%.3f/%.2f cap%.2f  %s"
                    % (s, r["file"], r["w"], r["h"], r["left_inset"], r["left_agree"],
                       r["right_inset"], r["right_agree"], r["caption"],
                       "CLEAN" if r["clean"] else "posed")
                )
        if files:
            print("  -> %-12s %d/%d clean" % (s, clean, len(files)))

    if a.csv:
        with open(a.csv, "w", newline="") as f:
            wr = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            wr.writeheader()
            wr.writerows(rows)
        print("wrote", a.csv)
    return 0


if __name__ == "__main__":
    sys.exit(main())
