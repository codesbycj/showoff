"""Helpers for writing a showcase's blank files from its finished ones.

The blank files stay the source of truth that `gen.js` reads — this only saves
you hand-wrapping thirty blocks in `{/* STEP */}` and getting one of them
subtly wrong. Every rule below was a real corruption first:

- **Close on indentation, not on the next closing tag.** Prettier guarantees a
  block's closing line sits at the opener's indent; "the next `</View>`" finds
  the first nested child's and cuts the element in half.
- **Match what was opened.** An element closes with its own `</Tag>`, a map
  expression with `))}` or `})}`. Accepting any of them lets a nested map's
  `))}` close its parent ScrollView and shred the file.
- **Normalise the anchor.** An anchor usually lands inside a style object or on
  a child expression like `{DATA.title}`; walk back to the element that owns it.
- **Handle the one-liners.** An element can open and close on a single line, or
  self-close, and neither has a closing line to search for.

Always typecheck the blank state afterwards. Every bug above compiled fine as
text and only `tsc` caught it.
"""
NL = chr(10)


def is_opener(line):
    """True if the line begins an element, or a map expression wrapping one."""
    t = line.lstrip()
    if t.startswith('<'):
        return True
    return t.startswith('{') and (t.rstrip().endswith('(') or t.rstrip().endswith('{'))


def tag_of(line):
    """The element name a line opens, or None if it opens an expression."""
    t = line.lstrip()
    if not t.startswith('<'):
        return None
    out = ''
    for ch in t[1:]:
        if ch.isalnum() or ch in '._':
            out += ch
        else:
            break
    return out or None


def stage(src, start_sub, label, nth=0):
    """Wrap the element containing `start_sub` in a `{/* STEP label ... */}`."""
    lines = src.split(NL)
    hits = [k for k, l in enumerate(lines) if start_sub in l]
    assert len(hits) > nth, 'no hit %d for %r' % (nth, start_sub)
    si = hits[nth]

    if not is_opener(lines[si]):
        inner = len(lines[si]) - len(lines[si].lstrip())
        for k in range(si - 1, -1, -1):
            ind = len(lines[k]) - len(lines[k].lstrip())
            if is_opener(lines[k]) and ind < inner:
                si = k
                break

    indent = len(lines[si]) - len(lines[si].lstrip())

    def wrap(a, b):
        return NL.join(lines[:a] + ['{/* STEP %s' % label] + lines[a:b + 1] + ['*/}'] + lines[b + 1:])

    if lines[si].rstrip().endswith('/>'):
        return wrap(si, si)

    tag = tag_of(lines[si])
    want = ('</%s>' % tag,) if tag else ('))}', '})}')
    if tag and want[0] in lines[si]:
        return wrap(si, si)

    for k in range(si + 1, len(lines)):
        l = lines[k]
        if not l.strip() or len(l) - len(l.lstrip()) != indent:
            continue
        t = l.strip()
        if t.startswith(want) or t == '/>' or t.endswith('/>'):
            return wrap(si, k)
    raise AssertionError('no close found for %r (wanted %s)' % (start_sub, want))


def imp(src, line, label):
    """Comment out one import line and mark it as a step."""
    assert line in src, line[:60]
    return src.replace(line, '// STEP %s%s// %s' % (label, NL, line), 1)
