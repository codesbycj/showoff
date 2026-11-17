"""
Flatten a screen's `paddingTop: insets.top` wrapper into its root view.

    python tools/flatten-wrapper.py vestaitem crypinswap ...

Why this exists. `stage.js` finds a screen's blocks by indentation, so a
wrapper around them collapses every block into **one**: `vestaitem` reported
1 block and 15 steps, under I5's floor of 20, and came out at 17 blocks and 45
steps once the wrapper was gone.

The wrapper's only job is the top inset, and the root can carry it. The
transform is layout-identical:

  * `paddingTop` is merged into the root view's style;
  * the wrapper's tags are removed and its children dedented one level.

An absolutely-positioned sibling pinned with `bottom` is unaffected — padding
at the top does not move the padding box's bottom edge. One pinned with `top`
would move, so **every flattened screen is re-shot and diffed against its
previous frame**; this script only rewrites, `--check` reports what it would
do.

It relies on prettier's formatting: the wrapper opens at six spaces and its
children sit at eight, so the matching close is the next line that is exactly
`      </View>`.
"""

import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

OPEN = '      <View style={{ paddingTop: L.insets.top }}>'
CLOSE = '      </View>'
ROOT_RE = re.compile(r'^(    <View style=\{\{ flex: 1, )(.*?)(\s*\}\}>)$')


def flatten(slug, check=False):
    path = os.path.join(ROOT, 'src', 'app', slug, 'index.tsx')
    if not os.path.exists(path):
        return '%s: no screen' % slug

    lines = io.open(path, encoding='utf-8').read().split('\n')

    try:
        o = lines.index(OPEN)
    except ValueError:
        return '%s: no plain wrapper' % slug

    c = None
    for i in range(o + 1, len(lines)):
        if lines[i] == CLOSE:
            c = i
            break
    if c is None:
        return '%s: wrapper never closes at this indent' % slug

    root = None
    for i in range(0, o):
        if ROOT_RE.match(lines[i]):
            root = i
    if root is None:
        return '%s: root view not in the expected shape' % slug

    if check:
        return '%s: would flatten %d lines' % (slug, c - o - 1)

    m = ROOT_RE.match(lines[root])
    lines[root] = '%s%s, paddingTop: L.insets.top%s' % (m.group(1), m.group(2), m.group(3))

    body = []
    for ln in lines[o + 1 : c]:
        body.append(ln[2:] if ln.startswith('        ') else ln)

    out = lines[: o] + body + lines[c + 1 :]
    # The wrapper's removal can leave a doubled blank line behind.
    text = re.sub(r'\n{3,}', '\n\n', '\n'.join(out))
    io.open(path, 'w', encoding='utf-8', newline='').write(text)
    return '%s: flattened (%d lines dedented)' % (slug, c - o - 1)


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    check = '--check' in sys.argv
    if not args:
        sys.stderr.write(__doc__)
        sys.exit(1)
    for slug in args:
        print(flatten(slug, check))
