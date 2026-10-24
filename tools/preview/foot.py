"""How much dead canvas is left at the foot of a screen.

    python tools/preview/foot.py shot.png [shot2.png ...]

Prints, per shot, the gap in dp between the last row of pixels that paints
anything and the bottom of the **safe area** -- that is, the gap to the screen
edge less the 34dp the home indicator owns. Over 24dp of that fails the
done-gate.

Measuring from the safe area rather than the screen edge is the whole trick.
Calibrated against four finished screens: a floating tab bar reads 38dp from the
edge and a primary button reads 44dp, and both are *correct* -- they are clearing
the indicator. The screen that was actually wrong, a product list that stopped
after two cards, reads 84dp. Against the screen edge those three are
indistinguishable; against the safe area they are 4, 10 and 50.

Why this exists: "look at the last shot of every screen for dead space" was in
AGENTS.md as an instruction to eyeball, and two showcases shipped with a band of
empty canvas under the last block anyway. It is hard to see while building
because the window is taller than the phone and the eye reads the gap as margin.
It is trivial to see as a number.

How it decides what counts as painted. The background is whatever colour fills
the bottom-left and bottom-right corners -- on a screen that ends in dead space
that is the page's own ground, which is exactly the colour we want to ignore.
Scanning up from the bottom, a row counts as painted when enough of its pixels
are far enough from that colour. Two things are skipped before the scan starts:

  * the home indicator, a short dark bar centred in the last ~24dp, which paints
    on every screen and would make every screen look full;
  * a scrollbar track down the right edge, which the web render sometimes paints.

Both are cut by ignoring the bottom 30dp for the *indicator only* when the run of
painted pixels is centred and narrow, and by ignoring the rightmost 8dp outright.
"""

import sys

from PIL import Image

SCALE = 3  # the harness renders 393x852 dp at 3x
SCREEN_DP_H = 852
SAFE_BOTTOM_DP = 34  # the home indicator's own band; a correct screen stops here
LIMIT_DP = 24  # dead canvas *below* the safe area that still passes
RIGHT_MARGIN_DP = 8  # a scrollbar track lives here on the web render
TOL = 18  # how far from the ground colour a pixel has to be to count
MIN_RUN_DP = 6  # ignore a run narrower than this; antialiasing and hairlines
INDICATOR_BAND_DP = 26  # the home indicator lives inside this much of the foot
INDICATOR_MAX_DP = 160  # ...and is no wider than this


def dist(a, b):
    return max(abs(a[0] - b[0]), abs(a[1] - b[1]), abs(a[2] - b[2]))


def measure(path):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    px = im.load()
    scale = round(h / SCREEN_DP_H) or SCALE
    right = w - RIGHT_MARGIN_DP * scale

    # The ground is the colour in the two bottom corners, inset past the radius.
    inset = 4 * scale
    ground = px[inset, h - inset]
    other = px[right - inset, h - inset]
    if dist(ground, other) > TOL:
        # The corners disagree -- a gradient or a full-bleed image. Nothing is
        # dead space in that case; report zero and say which.
        return 0, 0, 'full-bleed foot (corners differ), nothing to measure'

    last = None
    for y in range(h - 1, -1, -1):
        run_start = None
        runs = []
        for x in range(0, right):
            lit = dist(px[x, y], ground) > TOL
            if lit and run_start is None:
                run_start = x
            elif not lit and run_start is not None:
                runs.append((run_start, x))
                run_start = None
        if run_start is not None:
            runs.append((run_start, right))

        runs = [r for r in runs if (r[1] - r[0]) >= MIN_RUN_DP * scale]
        if not runs:
            continue

        # The home indicator: one short centred run inside the bottom band.
        gap_dp = (h - 1 - y) / scale
        if gap_dp < INDICATOR_BAND_DP and len(runs) == 1:
            a, b = runs[0]
            centred = abs((a + b) / 2 - right / 2) < 40 * scale
            if centred and (b - a) <= INDICATOR_MAX_DP * scale:
                continue

        last = round(gap_dp)
        break

    if last is None:
        return SCREEN_DP_H, SCREEN_DP_H, 'nothing painted at all'
    return last, max(0, last - SAFE_BOTTOM_DP), None


def main(argv):
    if not argv:
        print(__doc__.strip().splitlines()[2].strip())
        return 2
    worst = 0
    for path in argv:
        edge, dead, note = measure(path)
        worst = max(worst, dead)
        verdict = 'ok  ' if dead <= LIMIT_DP else 'FAIL'
        print(
            '%s  dead %3ddp  (last paint %3ddp from the edge)  %s%s'
            % (verdict, dead, edge, path, '  -- ' + note if note else '')
        )
    return 1 if worst > LIMIT_DP else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
