"""
Split a multi-export component file into one component per file.

    python tools/split-parts.py src/features/globestay/components/stay-parts.tsx

Why this exists. `tools/timelapse/stage.js` descends into a block's component
to stage it internally — level 2 of the three levels I5 requires — and it
resolves that component through the screen's import. A file exporting six
components resolves to one module, so the stager cannot tell them apart and
descends into none of them: ten screens in batch 4 came out under the 20-step
floor for exactly this reason, while the screens with one component per file
reached 32-44.

I5: "The fix is extraction into `src/features/<slug>/components/`, never a
lower floor." This does the extraction mechanically, because doing it by hand
across a dozen files is how a wrong import slips in.

What it does:

  * every `export function Name` becomes `name.tsx`, kebab-cased;
  * everything else at the top level — private helpers, consts, types — moves
    to `_shared.tsx` and is exported from there;
  * each new file gets only the imports it actually references, so nothing
    carries a dead import;
  * the original file is deleted, and every screen that imported from it is
    rewritten to import from the new files.

It does not touch a file that exports a single component.
"""

import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def kebab(name):
    return re.sub(r'(?<!^)(?=[A-Z])', '-', name).lower()


def split_top_level(src):
    """Return (header, chunks). A chunk is one top-level declaration with its
    leading doc comment, kept verbatim."""
    lines = src.split('\n')
    starts = []
    for i, ln in enumerate(lines):
        if re.match(r'^(export\s+)?(function|const|type|interface)\s', ln):
            # Walk back over an attached doc comment or line comments.
            j = i
            k = i - 1
            while k >= 0:
                s = lines[k].strip()
                if s.endswith('*/'):
                    while k >= 0 and not lines[k].strip().startswith('/*'):
                        k -= 1
                    j = k
                    k -= 1
                    continue
                if s.startswith('//'):
                    j = k
                    k -= 1
                    continue
                break
            starts.append((j, i))
    if not starts:
        return src, []

    header = '\n'.join(lines[: starts[0][0]]).rstrip() + '\n'
    chunks = []
    for n, (begin, declline) in enumerate(starts):
        end = starts[n + 1][0] if n + 1 < len(starts) else len(lines)
        body = '\n'.join(lines[begin:end]).rstrip() + '\n'
        m = re.match(r'^(export\s+)?(function|const|type|interface)\s+([A-Za-z0-9_]+)', lines[declline])
        chunks.append(
            {
                'name': m.group(3),
                'kind': m.group(2),
                'exported': bool(m.group(1)),
                'text': body,
            }
        )
    return header, chunks


def parse_imports(header):
    """Each import statement, with the identifiers it brings in."""
    out = []
    for m in re.finditer(r'^import\s+.*?;\s*$', header, re.M | re.S):
        stmt = m.group(0)
        ids = set(re.findall(r'[A-Za-z_][A-Za-z0-9_]*', stmt.split('from')[0]))
        ids -= {'import', 'type', 'as', 'from'}
        out.append((stmt, ids))
    return out


def uses(text, ident):
    return re.search(r'\b%s\b' % re.escape(ident), text) is not None


def needed_imports(imports, text):
    keep = []
    for stmt, ids in imports:
        if any(uses(text, i) for i in ids):
            keep.append(stmt)
    return keep


def lead_comment(header):
    """The file's own leading block comment, if it has one."""
    m = re.match(r'^\s*(/\*\*.*?\*/)', header, re.S)
    return m.group(1) if m else ''


def main(argv):
    if not argv:
        sys.stderr.write(__doc__)
        return 1

    for rel in argv:
        path = os.path.join(ROOT, rel.replace('/', os.sep))
        if not os.path.exists(path):
            sys.stderr.write('missing: %s\n' % rel)
            return 1

        src = io.open(path, encoding='utf-8').read()
        header, chunks = split_top_level(src)
        comps = [c for c in chunks if c['exported'] and c['kind'] == 'function']
        if len(comps) < 2:
            print('%s: %d exported component(s), left alone' % (rel, len(comps)))
            continue

        imports = parse_imports(header)
        folder = os.path.dirname(path)
        base = os.path.basename(path)
        stem = base[:-4]
        shared = [c for c in chunks if c not in comps]

        # Private helpers and shared types go to a shared file **named after
        # the source**, not a folder-wide `_shared.tsx`.
        #
        # A folder can hold several multi-export files, and two of them can
        # define the same private helper with different bodies — `Round` does
        # exactly that. One `_shared.tsx` per folder made each split overwrite
        # the last, and the first run lost every shared type but the final
        # file's.
        shared_file = '_%s-shared' % stem
        shared_names = []
        if shared:
            body = []
            for c in shared:
                t = c['text']
                if not c['exported']:
                    t = re.sub(r'^(function|const|type|interface)\s', r'export \1 ', t, count=1, flags=re.M)
                body.append(t)
                shared_names.append(c['name'])
            joined = '\n'.join(body)
            out = []
            lead = lead_comment(header)
            if lead:
                out.append(
                    '/**\n * Shared by the components split out of `%s`.\n *\n'
                    ' * One component per file is what lets `stage.js` descend into a block and\n'
                    ' * stage it internally (I5); the helpers they have in common live here.\n */\n' % base
                )
            out += needed_imports(imports, joined)
            out.append('')
            out.append(joined)
            io.open(
                os.path.join(folder, shared_file + '.tsx'), 'w', encoding='utf-8', newline=''
            ).write('\n'.join(out).rstrip() + '\n')
            print('  %-24s <- %s' % (shared_file + '.tsx', ', '.join(shared_names)))

        # Every component's filename is known before any is written, because a
        # component can use a *sibling* component — `PopularHead` renders
        # `SectionHead`, and both are exported, so neither is in the shared
        # file. Without this pass the sibling is simply undefined.
        written = {c['name']: kebab(c['name']) for c in comps}

        for c in comps:
            text = c['text']
            out = needed_imports(imports, text)
            used_shared = [n for n in shared_names if uses(text, n)]
            if used_shared:
                out.append(
                    "import { %s } from './%s';" % (', '.join(sorted(used_shared)), shared_file)
                )
            for other in comps:
                if other is not c and uses(text, other['name']):
                    out.append("import { %s } from './%s';" % (other['name'], written[other['name']]))
            out.append('')
            out.append(text.rstrip())
            fname = kebab(c['name']) + '.tsx'
            io.open(os.path.join(folder, fname), 'w', encoding='utf-8', newline='').write(
                '\n'.join(out).rstrip() + '\n'
            )
            print('  %-24s <- %s' % (fname, c['name']))

        # Remove the original **unless one of the new files took its name**.
        # `quick-rail.tsx` exporting QuickRail and QuickTitle splits into
        # `quick-rail.tsx` and `quick-title.tsx`; deleting the original then
        # deleted the file just written, and twelve screens lost a component.
        if base not in set(f + '.tsx' for f in written.values()):
            os.remove(path)

        # Repoint every importer at the new files.
        feature = os.path.basename(os.path.dirname(folder))
        old = '@/features/%s/components/%s' % (feature, stem)
        for root, _dirs, files in os.walk(os.path.join(ROOT, 'src')):
            for f in files:
                if not f.endswith('.tsx') and not f.endswith('.ts'):
                    continue
                p = os.path.join(root, f)
                s = io.open(p, encoding='utf-8').read()
                if old not in s:
                    continue
                def repl(m):
                    names = [n.strip() for n in m.group(1).split(',') if n.strip()]
                    return '\n'.join(
                        "import { %s } from '%s/%s';" % (n, old.rsplit('/', 1)[0], written[n])
                        for n in names
                        if n in written
                    )
                s = re.sub(
                    r"import\s*\{([^}]*)\}\s*from\s*'%s';" % re.escape(old), repl, s
                )
                io.open(p, 'w', encoding='utf-8', newline='').write(s)
                print('  repointed %s' % os.path.relpath(p, ROOT))

    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
