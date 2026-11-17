"""Judge a reveal's frames against RULES 0.2, 0.3 and 0.4.

  node tools/preview/stepshots.js <slug> <screen> .probe/<slug>
  python tools/preview/stepdiff.py .probe/<slug>

  0.2  every step changes something on screen   -> zero-diff step is a FAIL
  0.3  one element per step                     -> over MAX_FRAC of the frame is a FAIL,
                                                   and step 1 must not be the largest
  0.4  no step may error                        -> an error overlay at any step is a FAIL

`verify` diffs the end of a replay and `rehearse` typechecks it; neither renders
the middle, so a reveal passes both while opening on ten seconds of nothing or
red-screening at step 14. Both happened. This is the probe RULES 8.2-5d says to
build first.

The diff is a fraction of pixels whose max channel delta clears NOISE, which
ignores antialiasing without ignoring a one-glyph change.
"""
import argparse
import json
import os
import sys

import numpy as np
from PIL import Image

NOISE = 8          # per-channel delta that counts as a changed pixel
ZERO = 0.0002      # under this fraction, nothing visibly happened
TIDY = "tidy up"   # gen.js's closing bookkeeping op, not a reveal beat
MAX_FRAC = 0.15    # RULES 0.3


def load(p):
    return np.asarray(Image.open(p).convert("RGB")).astype(np.int16)


def frac_changed(a, b):
    if a.shape != b.shape:
        return 1.0
    return float((np.abs(a - b).max(axis=2) > NOISE).mean())


def verdicts(d):
    """Per step: did it paint, how much, and did it error.

    Factored out of `main` so `tools/timelapse/compact.py` merges exactly the
    steps this file fails, rather than re-deriving the judgement and drifting
    from it.
    """
    meta = json.load(open(os.path.join(d, "meta.json")))
    out = []
    prev = load(os.path.join(d, "00.png"))
    for st in meta["steps"]:
        p = os.path.join(d, st["file"])
        if not os.path.isfile(p):
            out.append({"n": st["n"], "frac": 0.0, "paints": False,
                        "error": "no frame captured", "label": st["label"]})
            continue
        cur = load(p)
        f = frac_changed(prev, cur)
        prev = cur
        # `waitedOut` says the probe held the step open for the full window
        # and the frame never changed, so this zero is measured rather than
        # assumed. Its absence on a zero step means the frames predate the
        # change-aware settle and cannot be compacted against.
        out.append({"n": st["n"], "frac": f, "paints": f >= ZERO,
                    "measured": "waitMs" in st,
                    "waited_out": bool(st.get("waitedOut")),
                    "error": st["error"], "label": st["label"]})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir")
    ap.add_argument("--max-frac", type=float, default=MAX_FRAC)
    ap.add_argument("--quiet", action="store_true")
    a = ap.parse_args()

    meta = json.load(open(os.path.join(a.dir, "meta.json")))
    steps = meta["steps"]
    fails, warns = [], []

    if meta.get("blankError"):
        fails.append("blank state errors: %s" % meta["blankError"])

    prev = load(os.path.join(a.dir, "00.png"))
    rows = []
    for st in steps:
        p = os.path.join(a.dir, st["file"])
        if not os.path.isfile(p):
            fails.append("step %d: no frame captured" % st["n"])
            continue
        cur = load(p)
        f = frac_changed(prev, cur)
        rows.append((st["n"], f, st["label"], st["error"],
                     bool(st.get("waitedOut")), st.get("waitMs")))
        prev = cur

    if not rows:
        print("no steps")
        return 1

    biggest = max(r[1] for r in rows)
    for n, f, label, err, waited_out, wait_ms in rows:
        tag = ""
        if err:
            tag = "ERROR"
            fails.append("step %d errors: %s" % (n, err[:120]))
        elif f < ZERO and label.strip() == TIDY:
            # The tidy-up is the tool's own bookkeeping, not a beat of the
            # reveal: it copies every touched file to its finished copy to
            # clear the STEP banners left in the components. The screen is
            # already complete when it runs, so it is SUPPOSED to change
            # nothing - a tidy-up that painted would mean the replay had not
            # actually finished the screen.
            tag = "tidy"
        elif f < ZERO:
            tag = "ZERO"
            # Say whether the zero was proved or merely observed: a frame that
            # was never waited for is the probe's failure, not the step's.
            how = ("held for %dms" % wait_ms) if waited_out else (
                "not waited out - re-shoot" if wait_ms is None else "changed below threshold")
            fails.append("step %d paints nothing (%.4f%%, %s) - %s"
                         % (n, f * 100, how, label))
        elif f > a.max_frac:
            tag = "BIG"
            fails.append("step %d paints %.1f%% of the frame - %s" % (n, f * 100, label))
        if not a.quiet:
            print("  %3d  %6.2f%%  %-5s %s" % (n, f * 100, tag, label[:58]))

    run = 0
    for n, f, label, err, waited_out, wait_ms in rows:
        if f < ZERO:
            run += 1
            continue
        if run >= 4 and f > 0.35:
            warns.append("step %d paints %.1f%% straight after %d steps that "
                         "painted nothing - the probe may be out-running the "
                         "dev server rather than the reveal being wrong"
                         % (n, f * 100, run))
        run = 0

    if rows and rows[0][1] >= biggest and len(rows) > 1:
        warns.append("step 1 is the largest change (%.1f%%) - the page appears "
                     "then accretes detail (RULES 0.3)" % (rows[0][1] * 100))
    if len(rows) < 20:
        warns.append("%d steps, floor is 20 (RULES 0.5)" % len(rows))

    print("\n%s/%s: %d steps, largest %.1f%%, median %.2f%%"
          % (meta["slug"], meta["screen"], len(rows), biggest * 100,
             float(np.median([r[1] for r in rows])) * 100))
    for w in warns:
        print("  WARN  " + w)
    for f in fails:
        print("  FAIL  " + f)
    print("no failures" if not fails else "%d failures" % len(fails))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
