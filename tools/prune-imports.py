"""
Drop named imports a file does not use.

    python tools/prune-imports.py                    # every feature component
    python tools/prune-imports.py src/features/x     # just under here

`split-parts.py` pruned *component* imports when it cut one file per component,
but carried every other import line across whole. So `headline.tsx` imported
eight names from `../data/start` and used one, and `step-bar.tsx` imported
`Image` and `Pressable` it never rendered.

That is not only untidy. `stage.js` asks "does this component render that
array" by looking for the array's name, and an import list answered yes for
all eight - so eleven data rows were attributed to the first block on the
screen and revealed before anything could draw them. The planner now reads the
body rather than the import list, and this makes the import list true as well.

Conservative by construction: a name is kept unless it appears nowhere outside
the import lines. Comments count as a use, so a name mentioned only in prose
stays rather than risking a wrong cut.
"""

import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

IMPORT = re.compile(
    r"^import\s+(?:(?P<default>[A-Za-z_$][\w$]*)\s*,\s*)?"
    r"\{(?P<names>[^}]*)\}\s*from\s*'(?P<mod>[^']+)';\s*$"
)


def body_of(lines):
    """Every line that is not an import, joined - what counts as a use."""
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if re.match(r'^import\b', line):
            # An import may wrap over several lines; skip to its semicolon.
            while i < len(lines) and not lines[i].rstrip().endswith(';'):
                i += 1
            i += 1
            continue
        out.append(line)
        i += 1
    return '\n'.join(out)


def prune(path):
    src = io.open(path, encoding='utf-8').read()
    lines = src.split('\n')
    body = body_of(lines)
    changed = False

    for i, line in enumerate(lines):
        m = IMPORT.match(line)
        if not m:
            continue
        kept = []
        for part in m.group('names').split(','):
            part = part.strip()
            if not part:
                continue
            # `X as Y` is used under Y; `type X` is used under X.
            local = re.split(r'\s+as\s+', part)[-1].strip()
            local = re.sub(r'^type\s+', '', local).strip()
            if re.search(r'\b%s\b' % re.escape(local), body):
                kept.append(part)
        if len(kept) == len(m.group('names').split(',')):
            continue
        changed = True
        default = m.group('default')
        if kept:
            head = (default + ', ') if default else ''
            lines[i] = "import %s{ %s } from '%s';" % (head, ', '.join(kept), m.group('mod'))
        elif default:
            lines[i] = "import %s from '%s';" % (default, m.group('mod'))
        else:
            lines[i] = None

    if not changed:
        return False
    out = '\n'.join(l for l in lines if l is not None)
    # Never leave two blank lines where an import line was removed.
    out = re.sub(r'\n{3,}', '\n\n', out)
    io.open(path, 'w', encoding='utf-8', newline='').write(out)
    return True


def main(argv):
    roots = argv or ['src/features', 'src/app', 'src/components']
    hit = 0
    for r in roots:
        for dirpath, _, names in os.walk(os.path.join(ROOT, r)):
            for name in names:
                if not name.endswith(('.ts', '.tsx')):
                    continue
                path = os.path.join(dirpath, name)
                if prune(path):
                    hit += 1
                    print(os.path.relpath(path, ROOT).replace('\\', '/'))
    print('%d files pruned' % hit)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
