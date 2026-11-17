"""
Merge a reveal's non-painting steps forward, so every step changes the screen.

    python tools/timelapse/compact.py <slug> <screen> <probedir>
    python tools/timelapse/compact.py <slug> <screen> <probedir> --dry

RULES 0.2 is the gate: "A step that changes no pixel is not a step. No
exceptions — not for an import, not for a type annotation, not for a data entry
that renders nothing."

`stage.js` plans three levels — imports, then the screen's blocks, then each
component's internals — and emits one op per step. That is right about *what*
has to happen and wrong about *when*: an import alone paints nothing, a spacer
`<View style={{ height: N }} />` paints nothing, a block that mounts a
component whose own internals are still staged out paints nothing, and a data
entry staged before its list is mounted paints nothing. On the first screen
measured, 27 of 38 steps were zero-diff.

§5.2 says what the shape should be: "One step = one import + the block it feeds
= one visible change." This does that, **driven by the probe rather than by a
guess**: `stepdiff.py` has already measured which steps painted nothing, so
each of those is merged into the next step that did. Nothing is dropped — every
op still runs, in the same order — and the step boundaries move to where the
pixels actually change.

A trailing run of non-painting steps (the tidy-up beat, and any mistake that is
cut at the very end) is merged **backward** into the last painting step, since
there is nothing after it to join.

Re-run `stepshots.js` + `stepdiff.py` afterwards: compaction is only correct if
the result measures clean.
"""

import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def steps_path(slug):
    return os.path.join(HERE, 'showcases', slug, 'steps.json')


def ops_of(st):
    if 'ops' in st:
        return list(st['ops'])
    return [{'op': st['op'], 'args': st['args']}]


def zero_steps(probedir):
    """Step numbers (1-based) that the probe measured as painting nothing."""
    meta = os.path.join(ROOT, probedir, 'meta.json')
    if not os.path.exists(meta):
        raise SystemExit('no meta.json in %s - run stepshots.js first' % probedir)
    data = json.load(io.open(meta, encoding='utf-8'))
    frames = data['frames'] if isinstance(data, dict) and 'frames' in data else data
    return frames


def main(argv):
    if len(argv) < 3:
        sys.stderr.write(__doc__)
        return 1
    slug, screen, probedir = argv[0], argv[1], argv[2]
    dry = '--dry' in argv

    # The probe's own verdict, recomputed here so this never drifts from it.
    sys.path.insert(0, os.path.join(ROOT, 'tools', 'preview'))
    import stepdiff

    verdicts = stepdiff.verdicts(os.path.join(ROOT, probedir))

    path = steps_path(slug)
    data = json.load(io.open(path, encoding='utf-8'))
    if screen not in data:
        raise SystemExit('%s has no screen %r' % (slug, screen))
    steps = data[screen]

    if len(verdicts) != len(steps):
        raise SystemExit(
            'probe has %d frames but screen %s has %d steps - re-run stepshots.js'
            % (len(verdicts), screen, len(steps))
        )

    # Compaction is destructive and it is only as good as the measurement under
    # it. Merging a step the probe never actually waited for is how fourteen of
    # vitalstats' twenty-one were folded into one 54%-of-the-frame beat: the
    # settle tested whether the frame was *still*, and a page Metro had not
    # rebuilt yet is perfectly still. So a zero is only mergeable if the frames
    # came from a probe that waits for the frame to CHANGE first.
    blind = [v['n'] for v in verdicts if not v['paints'] and not v.get('measured')]
    if blind:
        raise SystemExit(
            'probe frames predate the change-aware settle (%d zero step(s) with '
            'no waitMs: %s) - re-run stepshots.js; do not compact against this.'
            % (len(blind), ', '.join(str(n) for n in blind[:12]))
        )

    paints = [v['paints'] for v in verdicts]

    merged = []
    pending = []  # ops waiting for a step that paints
    pending_labels = []
    for i, st in enumerate(steps):
        pending.extend(ops_of(st))
        if st.get('label'):
            pending_labels.append(st['label'])
        if paints[i]:
            merged.append({'ops': pending, 'label': ' + '.join(pending_labels[-3:])})
            pending, pending_labels = [], []

    # Anything left never painted: fold it into the last step that did.
    if pending:
        if merged:
            merged[-1]['ops'].extend(pending)
            merged[-1]['label'] = merged[-1]['label'] + ' + ' + ' + '.join(pending_labels[-2:])
        else:
            merged.append({'ops': pending, 'label': ' + '.join(pending_labels[-3:])})

    print(
        '%s screen %s: %d steps -> %d (merged %d non-painting)'
        % (slug, screen, len(steps), len(merged), len(steps) - len(merged))
    )
    if dry:
        return 0

    data[screen] = merged
    io.open(path, 'w', encoding='utf-8', newline='').write(
        json.dumps(data, indent=2, ensure_ascii=False) + '\n'
    )
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
