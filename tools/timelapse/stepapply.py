"""Apply ONE step of a reveal, so something else can look at the screen between
steps.

  python tools/timelapse/stepapply.py <slug> blank            # reset to blank
  python tools/timelapse/stepapply.py <slug> <screen> count   # how many steps
  python tools/timelapse/stepapply.py <slug> <screen> <n>     # apply step n (1-based)
  python tools/timelapse/stepapply.py <slug> <screen> labels  # one label per line

`run.py <slug> <screen>` performs a whole screen in one process, which is right
for a take and useless for a probe: nothing can get between two steps to shoot
the frame. This exposes the same ops one at a time, over the same steps.json, so
the probe and the take walk identical edits.

Nothing here reimplements an op - run.py owns them, and a second copy would
drift from the one that records.
"""
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import run  # noqa: E402


def apply_step(slug, screen, n):
    steps = run.steps_for(slug, screen)
    if not 1 <= n <= len(steps):
        raise SystemExit('step %d out of range 1..%d' % (n, len(steps)))
    st = steps[n - 1]
    # A step may carry several ops - see `run.ops_of`. RULES 5.2 merges an
    # import into the block it feeds so the step paints; replaying one op here
    # would drift from what a take actually does.
    pairs = run.ops_of(st)
    for op, args in pairs:
        run.run_one(slug, op, args)
    return st.get('label') or '%s %d' % (pairs[0][0], n)


def main():
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    slug, what = sys.argv[1], sys.argv[2]

    if what == 'blank':
        run.apply_blank(slug)
        print('blank')
        return 0

    if len(sys.argv) < 4:
        raise SystemExit('usage: stepapply.py <slug> <screen> count|labels|<n>')
    screen, arg = what, sys.argv[3]
    steps = run.steps_for(slug, screen)

    if arg == 'count':
        print(len(steps))
        return 0
    if arg == 'labels':
        for i, st in enumerate(steps, 1):
            print('%d\t%s' % (i, st.get('label') or st['op']))
        return 0

    label = apply_step(slug, screen, int(arg))
    # stdout is read by the probe; keep it one line and ASCII.
    print(label.encode('ascii', 'replace').decode('ascii'))
    return 0


if __name__ == '__main__':
    sys.exit(main())
