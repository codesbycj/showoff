"""
Stage, measure and compact every showcase, and report what each reveal does.

    python tools/stage-all.py                 # all of them
    python tools/stage-all.py romeospot ...   # just these

The dev server must be up on EXPO_PORT.

Per screen it walks the full Step 9 chain:

  1. `apply.js final`     - never stage an already-blank file (RULES 5.6)
  2. `stage.js`           - plan generously; see the note on TARGET there
  3. `gen.js`             - markers -> steps.json
  4. `stepshots.js`       - one frame per step, off the running server
  5. `compact.py`         - merge every step the probe measured as painting
                            nothing, so each remaining step is a visible change
                            (RULES 0.2)
  6. `stepshots.js` again - compaction is only correct if it measures clean
  7. `stepdiff.py`        - the verdict that goes in the table

It writes `.probe/stage-all.json` with a row per screen: planned steps, painting
steps, the largest single change, and whether any step errored. That is the
evidence for the handover — not a claim that it passed.
"""

import io
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = os.environ.get('EXPO_PORT', '8082')

SLUGS = """romeospot romeobook romeodate crypinhome crypinswap crypinconfirm
vestahome vestabrowse vestaitem lumistart lumihome lumistock tamarstart
tamarfind tamargym zonestart zonehome zonemenu zoneroute zoneitem vitalcycle
vitalweight vitalprog vitalstats vitalday sonichome sonicplay sonicexplore
quranone qurantwo quranthree twirlfeed globestart globehome globestay""".split()


# Screens the extraction has been exhausted on: an onboarding splash whose
# whole content is a photograph, a wordmark, a headline, one line of copy and a
# button. Every block is already its own component and every copy array is
# already keyed rows; the only beats left to add would be content the board does
# not have. The number is what the planner reaches, typed out so it cannot
# drift, and each one is named in the handover.
ACCEPT_FLOOR = {
    'tamarstart': 18,
    'globestart': 19,
}


def run(cmd, **kw):
    return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True,
                          env=dict(os.environ, EXPO_PORT=PORT), **kw)


def planned_from(out):
    """gen.js prints "screen 1: 49 steps" - the count is the number before
    "steps", not the first digit in the line, which is the screen number."""
    toks = out.replace(':', ' ').split()
    for i, tok in enumerate(toks):
        if tok.startswith('step') and i:
            return int(toks[i - 1])
    return 0


def do(slug):
    row = {'slug': slug}

    # RULES 5.6: never stage a file that is already blank. `final` restores it
    # first - but it restores the copy `finished/` holds, which is the *previous*
    # pass's source, so running it after editing a tracked file silently puts the
    # old file back (RULES 5.8). SKIP_FINAL=1 is for a tree already known final:
    # restore everything up front, then edit, then stage.
    if not os.environ.get('SKIP_FINAL'):
        run(['node', 'tools/timelapse/apply.js', slug, 'final'])

    cmd = ['node', 'tools/timelapse/stage.js', slug]
    if slug in ACCEPT_FLOOR:
        cmd += ['--accept-floor', str(ACCEPT_FLOOR[slug])]
    r = run(cmd)
    if r.returncode != 0:
        row['error'] = 'stage: ' + (r.stderr or r.stdout).strip().splitlines()[0][:100]
        return row
    if 'ACCEPTED at' in (r.stderr or ''):
        row['under_floor'] = True

    g = run(['node', 'tools/timelapse/gen.js', slug])
    if g.returncode != 0:
        row['error'] = 'gen: ' + (g.stderr or g.stdout).strip()[:100]
        return row
    row['planned'] = planned_from((g.stdout or '').strip().splitlines()[-1])

    d1 = os.path.join('.probe', 'steps', slug)
    s = run(['node', 'tools/preview/stepshots.js', slug, '1', d1, '--port', PORT])
    if s.returncode != 0:
        row['error'] = 'stepshots: ' + (s.stderr or '').strip()[:100]
        return row

    c = run([sys.executable, 'tools/timelapse/compact.py', slug, '1', d1])
    if c.returncode != 0:
        row['error'] = 'compact: ' + (c.stderr or '').strip()[:100]
        return row

    d2 = os.path.join('.probe', 'steps2', slug)
    s2 = run(['node', 'tools/preview/stepshots.js', slug, '1', d2, '--port', PORT])
    if s2.returncode != 0:
        row['error'] = 'recheck: ' + (s2.stderr or '').strip()[:100]
        return row

    sys.path.insert(0, os.path.join(ROOT, 'tools', 'preview'))
    import stepdiff

    v = stepdiff.verdicts(os.path.join(ROOT, d2))
    row['painting'] = len(v)
    row['zero'] = sum(1 for x in v if not x['paints'])
    row['errors'] = sum(1 for x in v if x['error'])
    row['largest'] = round(max((x['frac'] for x in v), default=0) * 100, 1)
    row['first'] = round(v[0]['frac'] * 100, 1) if v else 0
    return row


def main(argv):
    slugs = argv or SLUGS
    rows = []
    for i, slug in enumerate(slugs, 1):
        row = do(slug)
        rows.append(row)
        # The dev server died at screen 11 of a 35-screen run and the remaining
        # 24 screens each reported the same refusal, which is 24 rows of nothing
        # and no way to tell them apart from a real failure. Stop on the first
        # one: the fix is to restart the server, not to keep going.
        if 'no dev server' in row.get('error', ''):
            print('\n  the dev server is gone - restart it on :%s and re-run from %s' % (PORT, slug))
            return 1
        print(
            '%2d/%d  %-14s planned=%-3s painting=%-3s zero=%-2s err=%-2s largest=%-5s'
            % (i, len(slugs), slug, row.get('planned', '-'), row.get('painting', '-'),
               row.get('zero', '-'), row.get('errors', '-'), row.get('largest', '-'))
            + ('  ' + row['error'] if 'error' in row else '')
        )
        sys.stdout.flush()
        io.open(os.path.join(ROOT, '.probe', 'stage-all.json'), 'w',
                encoding='utf-8', newline='').write(json.dumps(rows, indent=2) + '\n')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
