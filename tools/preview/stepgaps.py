"""Where a reveal's beats go missing.

    python tools/preview/stepgaps.py                  # every screen probed
    python tools/preview/stepgaps.py vitalday ...     # just these

`stage-all.py` reports two numbers per screen: `planned`, what the planner laid
out, and `painting`, what survived compaction because it actually changed the
screen. When those diverge the screen loses beats, and the floor (RULES 0.5,
I5: twenty, thirty to forty better) applies to the second one - the recording
plays the compacted steps, not the plan.

This reads the FIRST pass's frames, where every planned step still has its own
frame, and says which ones painted nothing and what they were. That is the
difference between "this screen is thin" and "this screen plans fine and three
of its beats are placed where they cannot show".

The kinds it separates, because each has its own fix:

  mount     a block whose component's internals are all still staged out, so
            mounting it paints nothing. Merging is correct - the beat is the
            first internal step, not the mount.
  mistake   a staged MISTAKE whose wrong state is invisible: a gap inserted
            where nothing sits below it yet, a duplicate that lands off-frame.
            A mistake that paints nothing is a wasted beat in the video as
            well as a zero step, so this one is worth fixing, not merging.
  early     a data entry or internal revealed before the thing that renders it
            is mounted. Reorder, do not merge.
  thin      a real element too small to clear the noise floor.
"""
import io
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import stepdiff  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STEPS = os.path.join(ROOT, '.probe', 'steps')
FLOOR = 20


def kind_of(label):
    low = label.lower()
    if 'stray' in low or 'mistake' in low or low.startswith('fix'):
        return 'mistake'
    if low.startswith('import ') or low.startswith('mount'):
        return 'mount'
    if low.startswith('"') or low.startswith("'"):
        return 'early'
    return 'thin'


def main(argv):
    slugs = argv or sorted(
        d for d in os.listdir(STEPS) if os.path.isdir(os.path.join(STEPS, d))
    )
    short = []
    for slug in slugs:
        d = os.path.join(STEPS, slug)
        if not os.path.exists(os.path.join(d, 'meta.json')):
            print('%-14s no frames' % slug)
            continue
        v = stepdiff.verdicts(d)
        zeros = [x for x in v if not x['paints']]
        paints = len(v) - len(zeros)
        buckets = {}
        for z in zeros:
            buckets.setdefault(kind_of(z['label']), []).append(z['label'])
        print('%-14s planned=%-3d painting=%-3d short=%-3s %s'
              % (slug, len(v), paints,
                 max(0, FLOOR - paints) or '-',
                 '  '.join('%s=%d' % (k, len(x)) for k, x in sorted(buckets.items()))))
        for k in ('mistake', 'early', 'thin'):
            for lab in buckets.get(k, []):
                print('                 %-8s %s' % (k, lab[:70]))
        if paints < FLOOR:
            short.append((slug, paints))

    print('\n%d of %d screens under the %d-step floor as measured'
          % (len(short), len(slugs), FLOOR))
    for slug, n in sorted(short, key=lambda r: r[1]):
        print('  %-14s %d' % (slug, n))
    io.open(os.path.join(ROOT, '.probe', 'stepgaps.json'), 'w',
            encoding='utf-8', newline='').write(
        json.dumps({s: n for s, n in short}, indent=2) + '\n')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
