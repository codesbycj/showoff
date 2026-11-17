"""Why is a step big? A new element, or the layout reflowing under it?

RULES 0.3 caps a step at ~15% of the frame, as a proxy for "one element per
step". A single large element - a hero photograph, a full-bleed map - trips the
proxy while obeying the rule. A step that *reflows* the page trips it for the
opposite reason: one small thing appeared and moved everything already on
screen, which is a defect in the layout, not in the staging.

They are told apart by asking whether the changed pixels were already carrying
content. New content lands on the page's ground; a reflow disturbs pixels an
earlier step had already painted.

    python tools/preview/stepwhy.py .probe/steps2/<slug>
"""
import json, os, sys
import numpy as np
from PIL import Image

NOISE = 8
BIG = 0.15


def load(p):
    return np.asarray(Image.open(p).convert("RGB")).astype(np.int16)


def rows_for(d):
    meta = json.load(open(os.path.join(d, "meta.json")))
    ground = load(os.path.join(d, "00.png"))
    prev = ground
    painted = np.zeros(ground.shape[:2], bool)   # pixels any earlier step painted
    was = np.zeros(ground.shape[:2], bool)       # what the previous frame painted
    out = []
    for st in meta["steps"]:
        p = os.path.join(d, st["file"])
        if not os.path.isfile(p):
            continue
        cur = load(p)
        if prev.shape != cur.shape:
            prev = cur
            continue
        ch = np.abs(prev - cur).max(axis=2) > NOISE
        frac = float(ch.mean())
        # "Was it already carrying content?" cannot tell a reflow from a scrim:
        # a gradient laid over a photograph disturbs every pixel under it and is
        # still one element. What only a reflow does is VACATE - leave pixels it
        # had painted showing the bare ground again, because the content that
        # was there moved somewhere else.
        now = np.abs(ground - cur).max(axis=2) > NOISE
        # Per step, against the frame before it - not against everything painted
        # so far. Measured cumulatively a pixel vacated once stays vacated, so
        # one reflow at step 4 marks every step after it.
        vac = float((was & ~now).sum()) / max(int(was.sum()), 1)
        out.append({"n": st["n"], "frac": frac, "vacated": vac,
                    "label": st["label"], "error": st["error"],
                    # The gate is RULES 0.3's own: a step may not change more
                    # than ~15% of the frame. `vacated` does not gate anything -
                    # it says WHY a big step is big, which decides the fix. A
                    # centred headline whose second line nudges the first vacates
                    # most of what it had painted and changes 0.5% of the frame;
                    # that is not a defect and must not be reported as one.
                    "kind": ("ok" if frac <= BIG else
                             "reflow" if vac > 0.02 else "element")})
        painted |= now
        was = now
        prev = cur
    return meta, out


def main():
    d = sys.argv[1]
    meta, rows = rows_for(d)
    for r in rows:
        if r["kind"] == "ok":
            continue
        print("  %-14s %3d  %6.2f%%  vacated=%5.1f%%  %-7s %s"
              % (meta["slug"], r["n"], r["frac"] * 100, r["vacated"] * 100,
                 r["kind"].upper(), r["label"][:46]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
