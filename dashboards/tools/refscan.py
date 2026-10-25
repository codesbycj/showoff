"""Read a dropped dashboard picture before building anything from it.

    python dashboards/tools/refscan.py <image> [--scale N] [--crop x0,y0,x1,y1]
                                       [--out DIR] [--top 14] [--min-energy 6]

Answers, in one pass, the five questions that have to be answered before a
single measurement off the image means anything:

  1. Is this a flat UI export or a posed presentation board?  One is a spec and
     the other is an inspo brief, and they are built to different rules.
  2. Is there furniture to crop off -- an attribution bar, a letterbox, a
     browser chrome mock?
  3. What is the capture density?  An image measurement only converts to CSS
     pixels once that is known, and guessing it is how a first pass comes out
     12-15% oversized.
  4. What are its actual colours?  Exact hexes, by share of the frame, instead
     of a hex eyedropped by eye off a JPEG.
  5. Where is its grid?  The column and row edges that the panels line up on,
     in image pixels and in CSS pixels at the chosen scale.

Writes `refscan.json` next to the image and an annotated PNG with every
detected edge drawn on it, which is the thing to actually look at: a grid that
the tool has found correctly is obvious at a glance, and a misread one is
equally obvious.

Needs Pillow and numpy, both already present for the bake scripts.
Logging is ASCII only -- the Windows console cannot encode a tick mark and the
whole command dies on the print, after the files have already been written.
"""

import argparse
import json
import os
import sys

import numpy as np
from PIL import Image, ImageDraw

# Artboard widths a dashboard is actually drawn at, and the densities it gets
# exported at. A factor that lands on one of these pairs is almost certainly the
# real one.
CANVAS_WIDTHS = [1280, 1366, 1440, 1512, 1536, 1600, 1728, 1920, 2560]
DENSITIES = [1.0, 1.25, 1.5, 2.0, 2.5, 3.0]


def hexof(rgb):
    return "#%02x%02x%02x" % (int(rgb[0]), int(rgb[1]), int(rgb[2]))


def uniform_margin(arr, axis):
    """How many rows (axis=0) or columns (axis=1) at each edge are flat fills.

    An attribution bar, a letterbox and the board behind a posed phone all show
    up as a run of rows whose own standard deviation is near zero.
    """
    line_std = arr.std(axis=1 - axis).mean(axis=-1) if arr.ndim == 3 else arr.std(axis=1 - axis)
    flat = line_std < 1.5
    lead = 0
    while lead < len(flat) and flat[lead]:
        lead += 1
    trail = 0
    while trail < len(flat) - lead and flat[len(flat) - 1 - trail]:
        trail += 1
    return lead, trail


def edge_energy(gray, axis):
    """Mean absolute neighbour difference along one axis, per column/row.

    A flat UI export puts whole-column edges at every panel boundary, so this is
    a spiky signal with the grid in it. A tilted or shadowed board smears the
    same energy across many columns, which is itself the tell.
    """
    d = np.abs(np.diff(gray, axis=axis))
    return d.mean(axis=1 - axis)


def peaks(energy, min_energy, min_distance, cap):
    """Non-maximum suppression. A panel edge is one line, not a cluster of six."""
    order = np.argsort(energy)[::-1]
    picked = []
    for i in order:
        if energy[i] < min_energy or len(picked) >= cap:
            break
        if all(abs(int(i) - p) >= min_distance for p in picked):
            picked.append(int(i))
    return sorted(picked)


def transition_widths(gray, xs, axis=1, limit=60):
    """How many pixels each strong edge takes to get from one plateau to the next.

    This is the test that separates the two kinds of reference, and it is the
    only one that does not also fire on an innocent dashboard.

    A flat UI export changes colour in one pixel -- two at 2x, three at 3x --
    because the edge is a border or a fill boundary. A posed presentation board
    puts a drop shadow under every panel, and a shadow is a ramp 8 to 40 pixels
    wide. Measuring the ramp therefore says which kind of picture this is *and*
    cross-checks the density at the same time.
    """
    line = gray.mean(axis=0) if axis == 1 else gray.mean(axis=1)
    widths = []
    for x in xs:
        if x <= 2 or x >= len(line) - 3:
            continue
        before, after = float(line[x - 1]), float(line[x + 2])
        if abs(after - before) < 4:
            continue
        tol = max(2.0, abs(after - before) * 0.12)
        left = x
        while left > 0 and abs(float(line[left]) - before) > tol and x - left < limit:
            left -= 1
        right = x
        while right < len(line) - 1 and abs(float(line[right]) - after) > tol and right - x < limit:
            right += 1
        widths.append(right - left)
    return widths


def hairlines(gray):
    """Thicknesses of the thin uniform bands that dividers and borders are made of.

    A 1px divider exported at 2x is 2px thick. The mode of these thicknesses is
    the most reliable read on the capture density there is, because it does not
    depend on knowing what the artboard was.
    """
    row_mean = gray.mean(axis=1)
    row_std = gray.std(axis=1)
    flatish = row_std < 6.0
    runs = []
    i = 0
    n = len(flatish)
    while i < n:
        if not flatish[i]:
            i += 1
            continue
        j = i
        while j < n and flatish[j] and abs(row_mean[j] - row_mean[i]) < 3.0:
            j += 1
        thickness = j - i
        if 1 <= thickness <= 8:
            above = row_mean[i - 1] if i > 0 else None
            below = row_mean[j] if j < n else None
            here = row_mean[i:j].mean()
            # A divider differs from what is immediately above and below it.
            if above is not None and below is not None:
                if abs(here - above) > 4 and abs(here - below) > 4:
                    runs.append(thickness)
        i = max(j, i + 1)
    return runs


def merge_palette(uniq, counts, total, tolerance=10, want=14):
    """Collapse near-identical colours into one entry.

    Exact counts are right for a flat export and useless for anything that has
    been through JPEG or carries a gradient: the top twelve entries come back as
    twelve shades of the same cream and the actual accent is pushed off the
    list. Absorbing everything within a short distance of the leader fixes both
    cases, and keeps the leader's exact hex rather than an average nobody chose.
    """
    order = np.argsort(counts)[::-1][:4000]
    picked = []
    taken = np.zeros(len(order), dtype=bool)
    cols = uniq[order].astype(np.int16)
    cnts = counts[order].astype(np.int64)
    for i in range(len(order)):
        if taken[i]:
            continue
        near = (np.abs(cols - cols[i]).max(axis=1) <= tolerance) & (~taken)
        share = float(cnts[near].sum() / total)
        taken |= near
        picked.append((cols[i], share))
        if len(picked) >= want:
            break
    return sorted(picked, key=lambda p: -p[1])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("image")
    ap.add_argument("--crop", default=None, help="x0,y0,x1,y1 applied before anything else")
    ap.add_argument("--scale", type=float, default=None, help="known image px per CSS px")
    ap.add_argument("--out", default=None, help="directory for refscan.json and the annotated png")
    ap.add_argument("--top", type=int, default=14, help="palette entries to report")
    ap.add_argument("--min-energy", type=float, default=10.0)
    ap.add_argument("--peaks", type=int, default=24, help="most edges to report per axis")
    ap.add_argument("--merge", type=int, default=10, help="palette merge distance; 0 for exact counts")
    args = ap.parse_args()

    if not os.path.exists(args.image):
        print("no such image: " + args.image)
        return 1

    img = Image.open(args.image).convert("RGB")
    if args.crop:
        x0, y0, x1, y1 = (int(v) for v in args.crop.split(","))
        img = img.crop((x0, y0, x1, y1))

    arr = np.asarray(img).astype(np.float32)
    H, W, _ = arr.shape
    gray = arr.mean(axis=2)
    out_dir = args.out or os.path.dirname(os.path.abspath(args.image))
    os.makedirs(out_dir, exist_ok=True)

    report = {"image": os.path.abspath(args.image), "width": W, "height": H}

    print("")
    print("=== %s" % os.path.basename(args.image))
    print("size                  %d x %d  (%.3f aspect)" % (W, H, W / H))

    # ---- furniture to crop ------------------------------------------------
    top_flat, bottom_flat = uniform_margin(arr, axis=0)
    left_flat, right_flat = uniform_margin(arr, axis=1)
    report["flatMargins"] = {
        "top": int(top_flat),
        "bottom": int(bottom_flat),
        "left": int(left_flat),
        "right": int(right_flat),
    }
    print(
        "flat margins          top %d  bottom %d  left %d  right %d"
        % (top_flat, bottom_flat, left_flat, right_flat)
    )
    if max(top_flat, bottom_flat, left_flat, right_flat) > 8:
        print(
            "                      --crop %d,%d,%d,%d strips them"
            % (left_flat, top_flat, W - right_flat, H - bottom_flat)
        )

    # ---- flat export, or a posed board? -----------------------------------
    #
    # Three pieces of evidence, none of them conclusive alone:
    #
    #   spike ratio       how much of the edge energy lands in whole columns and
    #                     rows. A tilted or perspective-posed phone has none.
    #   edge ramp width   1-3px for a real border, 8-40px for a drop shadow.
    #                     This is the one that actually decides it.
    #   border ring std   a flat fill around the frame is a board, or a page
    #                     background -- which is why it is evidence, not a ruling.
    col_e = edge_energy(gray, axis=1)
    row_e = edge_energy(gray, axis=0)
    col_spike = float(col_e.max() / max(col_e.mean(), 1e-6))
    row_spike = float(row_e.max() / max(row_e.mean(), 1e-6))
    spike = min(col_spike, row_spike)

    probe_xs = peaks(col_e, max(args.min_energy, float(np.percentile(col_e, 99))), 8, 24)
    ramps = transition_widths(gray, probe_xs, axis=1)
    ramp = float(np.median(ramps)) if ramps else 0.0

    ring = np.concatenate(
        [arr[:6].reshape(-1, 3), arr[-6:].reshape(-1, 3), arr[:, :6].reshape(-1, 3), arr[:, -6:].reshape(-1, 3)]
    )
    ring_std = float(ring.std(axis=0).mean())
    border_colour = np.median(ring, axis=0)
    not_border = float((np.abs(arr - border_colour).max(axis=2) > 14).mean())

    posed = ramp > 6.0 or spike < 6.0
    report["shot"] = {
        "columnSpikeRatio": round(col_spike, 2),
        "rowSpikeRatio": round(row_spike, 2),
        "edgeRampPx": round(ramp, 1),
        "borderStd": round(ring_std, 2),
        "nonBorderShare": round(not_border, 3),
        "verdict": "posed board (inspo brief)" if posed else "flat UI export (spec)",
    }
    print("spike ratio           %.1f col / %.1f row   (high = axis-aligned flat export)" % (col_spike, row_spike))
    print("edge ramp (median)    %.1fpx   (1-3 = real borders; 8+ = drop shadows on a board)" % ramp)
    print("border ring std       %.1f   (low = one flat colour around the edge)" % ring_std)
    print("non-border share      %.0f%%  (info only: a page background reads the same way)" % (not_border * 100))
    print("VERDICT               %s" % report["shot"]["verdict"])
    if posed:
        print("                      rule 1 is OFF: match the spirit, build at real sizes")
    else:
        print("                      rule 1 is ON: calibrate the scale, then match pixels")
    print("                      (a hint, not a ruling -- look at the picture)")

    # ---- density ----------------------------------------------------------
    runs = hairlines(gray)
    thickness_mode = None
    if runs:
        vals, counts = np.unique(np.array(runs), return_counts=True)
        thickness_mode = int(vals[int(np.argmax(counts))])
        print(
            "hairline thicknesses  %s  -> mode %dpx"
            % (", ".join("%dpx x%d" % (v, c) for v, c in zip(vals, counts)), thickness_mode)
        )
    else:
        print("hairline thicknesses  none found")

    candidates = []
    for cw in CANVAS_WIDTHS:
        f = W / cw
        for d in DENSITIES:
            if abs(f - d) < 0.02:
                candidates.append({"cssWidth": cw, "density": d})
    report["density"] = {
        "hairlineMode": thickness_mode,
        "candidates": candidates,
        "hairlineRuns": [int(r) for r in runs[:200]],
    }
    if candidates:
        print("scale candidates      " + "   ".join("%d CSS px @%gx" % (c["cssWidth"], c["density"]) for c in candidates))
    else:
        print("scale candidates      none clean; W/1440=%.3f  W/1512=%.3f  W/1920=%.3f" % (W / 1440, W / 1512, W / 1920))

    scale = args.scale
    if scale is None:
        if candidates:
            scale = candidates[0]["density"]
        elif thickness_mode:
            scale = float(thickness_mode)
        else:
            scale = 1.0
    report["scaleUsed"] = scale
    print("scale used            %g image px per CSS px  -> canvas %.0f x %.0f CSS px" % (scale, W / scale, H / scale))
    if thickness_mode and candidates and abs(thickness_mode - candidates[0]["density"]) > 0.4:
        print("                      NOTE: hairlines say %gx, the width says %gx. Trust the hairlines." % (thickness_mode, candidates[0]["density"]))

    # ---- palette ----------------------------------------------------------
    flat = np.asarray(img).reshape(-1, 3)
    uniq, counts = np.unique(flat, axis=0, return_counts=True)
    if args.merge > 0:
        entries = merge_palette(uniq, counts, len(flat), args.merge, args.top)
    else:
        order = np.argsort(counts)[::-1][: args.top]
        entries = [(uniq[i], float(counts[i] / len(flat))) for i in order]
    palette = []
    for rgb, share in entries:
        mx, mn = int(np.max(rgb)), int(np.min(rgb))
        sat = 0.0 if mx == 0 else (mx - mn) / mx
        palette.append(
            {"hex": hexof(rgb), "share": round(share, 4), "luma": round(float(np.mean(rgb)), 1), "sat": round(sat, 3)}
        )
    report["palette"] = palette
    print("")
    print("palette               hex      share   luma   sat")
    for p in palette:
        print("                      %s  %5.1f%%  %5.1f  %.2f" % (p["hex"], p["share"] * 100, p["luma"], p["sat"]))

    big = [p for p in palette if p["share"] > 0.004]
    if big:
        ground = big[0]
        surface = next((p for p in big[1:] if abs(p["luma"] - ground["luma"]) > 4), None)
        ink = min(big, key=lambda p: p["luma"]) if ground["luma"] > 128 else max(big, key=lambda p: p["luma"])
        accent = max(palette, key=lambda p: p["sat"] * min(p["share"] * 40, 1))
        report["roles"] = {
            "ground": ground["hex"],
            "surface": surface["hex"] if surface else None,
            "ink": ink["hex"],
            "accent": accent["hex"],
            "mode": "dark" if ground["luma"] < 110 else "light",
        }
        print("")
        print("likely roles          ground %s   surface %s   ink %s   accent %s   (%s UI)" % (
            report["roles"]["ground"],
            report["roles"]["surface"],
            report["roles"]["ink"],
            report["roles"]["accent"],
            report["roles"]["mode"],
        ))

    # ---- the grid ---------------------------------------------------------
    xs = peaks(col_e, args.min_energy, max(8, int(10 * scale)), args.peaks)
    ys = peaks(row_e, args.min_energy, max(8, int(10 * scale)), args.peaks)
    report["grid"] = {
        "x": [{"px": x, "css": round(x / scale, 1), "energy": round(float(col_e[x]), 1)} for x in xs],
        "y": [{"px": y, "css": round(y / scale, 1), "energy": round(float(row_e[y]), 1)} for y in ys],
    }
    print("")
    print("column edges (CSS px) " + "  ".join("%.0f" % (x / scale) for x in xs[:28]))
    print("row edges    (CSS px) " + "  ".join("%.0f" % (y / scale) for y in ys[:28]))

    # The first strong vertical edge in the left third of a dashboard is almost
    # always the sidebar's inner boundary.
    side = [x for x in xs if 0.06 * W < x < 0.34 * W]
    if side:
        report["grid"]["sidebarWidth"] = round(side[0] / scale, 1)
        print("likely sidebar width  %.0f CSS px" % (side[0] / scale))
    head = [y for y in ys if 0.02 * H < y < 0.18 * H]
    if head:
        report["grid"]["headerHeight"] = round(head[0] / scale, 1)
        print("likely header height  %.0f CSS px" % (head[0] / scale))

    # ---- write ------------------------------------------------------------
    marked = img.copy()
    d = ImageDraw.Draw(marked)
    for x in xs:
        d.line([(x, 0), (x, H)], fill=(255, 0, 170), width=1)
    for y in ys:
        d.line([(0, y), (W, y)], fill=(0, 200, 255), width=1)
    stem = os.path.splitext(os.path.basename(args.image))[0]
    png_path = os.path.join(out_dir, stem + ".grid.png")
    marked.save(png_path)

    json_path = os.path.join(out_dir, stem + ".refscan.json")
    with open(json_path, "w", newline="") as fh:
        json.dump(report, fh, indent=2)

    print("")
    print("wrote %s" % png_path)
    print("wrote %s" % json_path)
    print("Look at the grid png before trusting any number above it.")
    print("")
    return 0


if __name__ == "__main__":
    sys.exit(main())
