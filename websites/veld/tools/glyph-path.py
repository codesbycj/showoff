"""Print SVG path data for characters, taken from a WOFF's own outlines.

    python glyph-path.py <font.woff> <chars> [--height N]

The loader blows its numeral up to a hundred times its own size, so it has to
be real path geometry: scaled text rasterises at the layer's scale and goes
soft, and a traced bitmap loses exactly the crisp corners that make the face
what it is. A WOFF is an SFNT with each table zlib-deflated, so the outlines
are a zlib call and a glyf walk away — no dependency, no tracing, no guessing.

Output is one <path> per character plus the viewBox they share, y already
flipped into SVG's downward axis.
"""

import struct
import sys
import zlib


def read_woff(path):
    """{tag: bytes} for every table in a WOFF."""
    blob = open(path, "rb").read()
    magic, _flavor, _length, num_tables = struct.unpack(">4sIIH", blob[:14])
    if magic != b"wOFF":
        raise SystemExit(f"{path} is not a WOFF (magic {magic!r})")
    tables = {}
    for i in range(num_tables):
        off = 44 + i * 20
        tag, offset, comp_len, orig_len, _csum = struct.unpack(">4sIIII", blob[off : off + 20])
        raw = blob[offset : offset + comp_len]
        tables[tag.decode("ascii")] = raw if comp_len == orig_len else zlib.decompress(raw)
    return tables


def cmap_lookup(cmap, codepoints):
    """Glyph ids via the format-4 subtable, which every Latin font carries."""
    (_version, n) = struct.unpack(">HH", cmap[:4])
    best = None
    for i in range(n):
        pid, eid, offset = struct.unpack(">HHI", cmap[4 + i * 8 : 12 + i * 8])
        fmt = struct.unpack(">H", cmap[offset : offset + 2])[0]
        if fmt == 4 and (pid, eid) in ((3, 1), (0, 3), (0, 4), (3, 10)):
            best = offset
            break
    if best is None:
        raise SystemExit("no format 4 cmap subtable")

    seg_x2 = struct.unpack(">H", cmap[best + 6 : best + 8])[0]
    seg = seg_x2 // 2
    base = best + 14
    ends = struct.unpack(f">{seg}H", cmap[base : base + seg_x2])
    starts = struct.unpack(f">{seg}H", cmap[base + seg_x2 + 2 : base + 2 * seg_x2 + 2])
    deltas = struct.unpack(f">{seg}h", cmap[base + 2 * seg_x2 + 2 : base + 3 * seg_x2 + 2])
    range_off_base = base + 3 * seg_x2 + 2
    range_offs = struct.unpack(f">{seg}H", cmap[range_off_base : range_off_base + seg_x2])

    out = {}
    for cp in codepoints:
        gid = 0
        for i in range(seg):
            if starts[i] <= cp <= ends[i]:
                if range_offs[i] == 0:
                    gid = (cp + deltas[i]) & 0xFFFF
                else:
                    addr = range_off_base + i * 2 + range_offs[i] + (cp - starts[i]) * 2
                    gid = struct.unpack(">H", cmap[addr : addr + 2])[0]
                    if gid:
                        gid = (gid + deltas[i]) & 0xFFFF
                break
        out[cp] = gid
    return out


def glyph_contours(glyf, loca, gid):
    """[[(x, y, on_curve), ...], ...] in font units."""
    start, end = loca[gid], loca[gid + 1]
    if start == end:
        return []
    data = glyf[start:end]
    n_contours = struct.unpack(">h", data[:2])[0]
    if n_contours < 0:
        raise SystemExit(f"glyph {gid} is composite; not handled")

    ends = struct.unpack(f">{n_contours}H", data[10 : 10 + n_contours * 2])
    n_points = ends[-1] + 1
    p = 10 + n_contours * 2
    instr_len = struct.unpack(">H", data[p : p + 2])[0]
    p += 2 + instr_len

    flags = []
    while len(flags) < n_points:
        f = data[p]
        p += 1
        flags.append(f)
        if f & 8:  # repeat
            rep = data[p]
            p += 1
            flags.extend([f] * rep)
    flags = flags[:n_points]

    def coords(short_bit, same_bit):
        vals, v = [], 0
        nonlocal p
        for f in flags:
            if f & short_bit:
                d = data[p]
                p += 1
                v += d if f & same_bit else -d
            elif not f & same_bit:
                v += struct.unpack(">h", data[p : p + 2])[0]
                p += 2
            vals.append(v)
        return vals

    xs = coords(2, 16)
    ys = coords(4, 32)

    contours, first = [], 0
    for e in ends:
        contours.append([(xs[i], ys[i], bool(flags[i] & 1)) for i in range(first, e + 1)])
        first = e + 1
    return contours


def contours_to_path(contours, upem, height, y_off):
    """TrueType quadratics -> an SVG path, scaled and flipped onto `height`."""
    k = height / upem
    sx = lambda x: round(x * k, 2)  # noqa: E731
    sy = lambda y: round(y_off - y * k, 2)  # noqa: E731
    parts = []

    for pts in contours:
        if not pts:
            continue
        # Start on an on-curve point; synthesise one if the contour has none.
        start = next((i for i, p in enumerate(pts) if p[2]), None)
        if start is None:
            x0 = (pts[0][0] + pts[-1][0]) / 2
            y0 = (pts[0][1] + pts[-1][1]) / 2
            pts = [(x0, y0, True)] + pts
            start = 0
        pts = pts[start:] + pts[:start]
        parts.append(f"M{sx(pts[0][0])} {sy(pts[0][1])}")

        i = 1
        n = len(pts)
        while i <= n:
            cur = pts[i % n]
            if cur[2]:
                parts.append(f"L{sx(cur[0])} {sy(cur[1])}")
                i += 1
                continue
            nxt = pts[(i + 1) % n]
            if nxt[2]:
                end = nxt
                i += 2
            else:  # two controls in a row imply an on-curve point between them
                end = ((cur[0] + nxt[0]) / 2, (cur[1] + nxt[1]) / 2, True)
                i += 1
            parts.append(f"Q{sx(cur[0])} {sy(cur[1])} {sx(end[0])} {sy(end[1])}")
        parts.append("Z")

    return "".join(parts)


def main():
    font, chars = sys.argv[1], sys.argv[2]
    height = float(sys.argv[sys.argv.index("--height") + 1]) if "--height" in sys.argv else 1000.0

    t = read_woff(font)
    upem, index_to_loc = struct.unpack(">H", t["head"][18:20])[0], struct.unpack(
        ">h", t["head"][50:52]
    )[0]
    num_glyphs = struct.unpack(">H", t["maxp"][4:6])[0]

    raw = t["loca"]
    if index_to_loc == 0:
        loca = [v * 2 for v in struct.unpack(f">{num_glyphs + 1}H", raw[: (num_glyphs + 1) * 2])]
    else:
        loca = list(struct.unpack(f">{num_glyphs + 1}I", raw[: (num_glyphs + 1) * 4]))

    gids = cmap_lookup(t["cmap"], [ord(c) for c in chars])
    hhea_ascent = struct.unpack(">h", t["hhea"][4:6])[0]
    num_h_metrics = struct.unpack(">H", t["hhea"][34:36])[0]

    def advance(gid):
        i = min(gid, num_h_metrics - 1)
        return struct.unpack(">H", t["hmtx"][i * 4 : i * 4 + 2])[0]

    k = height / upem
    y_off = round(hhea_ascent * k, 2)
    print(f"# upem={upem} ascent={hhea_ascent} -> height={height} baseline y={y_off}")

    pen = 0.0
    for ch in chars:
        gid = gids[ord(ch)]
        contours = glyph_contours(t["glyf"], loca, gid)
        # Shift each glyph along by the advances before it.
        shifted = [[(x + pen, y, on) for (x, y, on) in c] for c in contours]
        print(f"\n/* {ch!r} gid={gid} advance={advance(gid)} */")
        print(contours_to_path(shifted, upem, height, y_off))
        pen += advance(gid)

    print(f"\n# total advance {round(pen * k, 2)} x {height}")


main()
