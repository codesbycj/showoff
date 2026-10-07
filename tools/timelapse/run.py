"""Drive a showcase's reveal, one edit at a time.

  run.py <slug> <screen> [--delay 1.5] [--no-preflight]
  run.py <slug> verify                 prove the sequence lands on finished
  run.py <slug> preflight              check drift, reset to blank, typecheck
  run.py <slug> rehearse               replay every screen the way a take does
  run.py <slug> lock                   record SHA-256 of every file the app needs
  run.py <slug> final                  restore the whole app, to record it finished
  run.py <slug> blank                  strip it back, without preflight's checks

Steps live in showcases/<slug>/steps.json as data, so adding an app is a new
folder and no code change.

Two failures this guards against, both of which happened live:
  * a screen that was not in blank state aborted on its first step mid-recording
  * an edit to an unstaged file red-screened the app, invisible to `verify`
`preflight` catches the first by force-resetting, the second via lock.json.
"""
import hashlib
import io
import json
import os
import re
import shutil
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
WIN = os.name == 'nt'

# Files every showcase depends on, checked alongside its own.
SHARED = ['src/components/ui', 'src/theme', 'src/global.css', 'tailwind.config.js',
          'src/app/_layout.tsx', 'src/app/index.tsx']

# Scratch files, for typing into on camera. They sit inside the showcase tree so
# they are open next to the real components, but nothing imports them, so Metro
# never bundles them and they cannot reach the screen. Excluded here because a
# file being typed into is half-written by definition: tracking it would report
# DRIFT on every take, and typechecking it would abort the next screen on a
# syntax error that no rendered pixel depends on. tsconfig.json excludes the
# same names, so `npm run typecheck` and preflight agree.
SCRATCH = ('sida.tsx',)


def is_scratch(rel):
    return os.path.basename(rel) in SCRATCH or rel.endswith('.scratch.tsx')


def sdir(slug):
    d = os.path.join(HERE, 'showcases', slug)
    if not os.path.isdir(d):
        raise SystemExit('unknown showcase %r' % slug)
    return d


def read(p):
    return io.open(os.path.join(ROOT, p), encoding='utf-8', newline='').read()


def write(p, s):
    io.open(os.path.join(ROOT, p), 'w', encoding='utf-8', newline='').write(s)


# ── step operations ─────────────────────────────────────────────────────────

def jsx(path, marker):
    """Unwrap `{/* <marker> ... */}`. The marker must follow `{/*` directly, so
    an explanatory note mentioning the same step number never matches."""
    lines = read(path).split('\n')
    hits = [i for i, l in enumerate(lines)
            if l.strip().startswith('{/*') and l.strip()[3:].lstrip().startswith(marker)]
    if not hits:
        raise SystemExit('jsx: no block %r in %s' % (marker, path))
    start = hits[0]
    end = start + 1
    while lines[end].strip() != '*/}':
        end += 1
        if end >= len(lines):
            raise SystemExit('jsx: unterminated block %r in %s' % (marker, path))
    write(path, '\n'.join(lines[:start] + lines[start + 1:end] + lines[end + 1:]))


def imp(path, substr):
    """Uncomment a commented import, dropping its STEP marker. Only real import
    lines match, so prose that happens to name the same module is left alone."""
    lines = read(path).split('\n')
    hits = [i for i, l in enumerate(lines)
            if re.match(r'^\s*//\s*import\b', l) and substr in l]
    if not hits:
        raise SystemExit('imp: no commented import %r in %s' % (substr, path))
    i = hits[0]
    indent = re.match(r'\s*', lines[i]).group(0)
    lines[i] = indent + re.sub(r'^//\s?', '', lines[i].strip())
    if i > 0 and re.match(r'^\s*//\s*STEP ', lines[i - 1]):
        del lines[i - 1]
    write(path, '\n'.join(lines))


def unimp(path, substr):
    """Delete a live import line."""
    lines = read(path).split('\n')
    hits = [i for i, l in enumerate(lines)
            if re.match(r'^\s*import\b', l) and substr in l]
    if not hits:
        raise SystemExit('unimp: no live import %r in %s' % (substr, path))
    del lines[hits[0]]
    write(path, '\n'.join(lines))


def entry(path, key):
    """Uncomment a single-line data entry by key, dropping its STEP marker."""
    lines = read(path).split('\n')
    hits = [i for i, l in enumerate(lines)
            if re.search(r"\b(?:key|id): '%s'" % re.escape(key), l)
            and l.strip().startswith('//')]
    if not hits:
        raise SystemExit('entry: no commented %r in %s' % (key, path))
    i = hits[0]
    indent = re.match(r'\s*', lines[i]).group(0)
    lines[i] = indent + re.sub(r'^//\s?', '', lines[i].strip())
    if i > 0 and re.match(r'^\s*//\s*STEP ', lines[i - 1]):
        del lines[i - 1]
    write(path, '\n'.join(lines))


def block(path, key):
    """Uncomment a multi-line data entry containing `key`."""
    lines = read(path).split('\n')
    hits = [i for i, l in enumerate(lines)
            if re.search(r"\b(?:key|id): '%s'" % re.escape(key), l)
            and l.strip().startswith('//')]
    if not hits:
        raise SystemExit('block: no commented %r in %s' % (key, path))
    i = hits[0]
    start = i
    while lines[start].strip() != '// {':
        start -= 1
    end = i
    while lines[end].strip() != '// },':
        end += 1
    out = []
    for l in lines[start:end + 1]:
        indent = re.match(r'\s*', l).group(0)
        out.append(indent + re.sub(r'^//\s?', '', l.strip()))
    head = lines[:start]
    if head and re.match(r'^\s*//\s*STEP ', head[-1]):
        head = head[:-1]
    write(path, '\n'.join(head + out + lines[end + 1:]))


def cutel(path, needle):
    """Delete the JSX element containing `needle`, open tag to matching close."""
    lines = read(path).split('\n')
    hits = [i for i, l in enumerate(lines) if needle in l]
    if not hits:
        raise SystemExit('cutel: %r not in %s' % (needle, path))
    start = hits[0]
    while not lines[start].strip().startswith('<'):
        start -= 1
        if start < 0:
            raise SystemExit('cutel: no open tag above %r' % needle)
    indent = re.match(r'\s*', lines[start]).group(0)
    if lines[start].rstrip().endswith('/>'):
        end = start
    else:
        # Either a paired tag closed by `</Tag>`, or a self-closing one whose
        # attributes run over several lines and so ends on a bare `/>`. Both
        # close at the open tag's own indent, so whichever comes first ends it.
        # Without the second case a multi-line `<Tag ... />` ran off the end of
        # the file looking for a `</Tag>` that was never going to be there.
        tag = re.match(r'<(\w+)', lines[start].strip()).group(1)
        closes = (indent + '</' + tag + '>', indent + '/>')
        end = start + 1
        while end < len(lines) and lines[end] not in closes:
            end += 1
        if end == len(lines):
            raise SystemExit('cutel: nothing closes <%s> in %s' % (tag, path))
    write(path, '\n'.join(lines[:start] + lines[end + 1:]))


def cutfirst(path, prefixes):
    """Delete the first line matching each prefix. Identical lines further down,
    still inside commented blocks, are left alone."""
    lines = read(path).split('\n')
    for pre in prefixes:
        for i, l in enumerate(lines):
            if l.strip().startswith(pre):
                del lines[i]
                break
        else:
            raise SystemExit('cutfirst: %r not in %s' % (pre, path))
    write(path, '\n'.join(lines))


def final(slug, *pairs):
    """Copy finished copies over every file the screen touched — the tidy-up beat
    that clears the STEP banners left in its components."""
    for name, dest in pairs:
        shutil.copyfile(os.path.join(sdir(slug), 'finished', name + '.final'),
                        os.path.join(ROOT, dest))


OPS = {'jsx': jsx, 'imp': imp, 'unimp': unimp, 'entry': entry,
       'block': block, 'cutel': cutel, 'cutfirst': cutfirst}


# ── running ─────────────────────────────────────────────────────────────────

def steps_for(slug, screen):
    data = json.load(io.open(os.path.join(sdir(slug), 'steps.json'), encoding='utf-8'))
    if screen not in data:
        raise SystemExit('showcase %s has no screen %r (have %s)'
                         % (slug, screen, ', '.join(sorted(data))))
    return data[screen]


def perform(slug, screen, delay):
    steps = steps_for(slug, screen)
    for n, st in enumerate(steps, 1):
        op, args = st['op'], st['args']
        if op == 'final':
            final(slug, *[tuple(p) for p in args])
        else:
            OPS[op](*args)
        if st.get('label'):
            print('%2d/%d  %s' % (n, len(steps), st['label']))
            sys.stdout.flush()
        if delay:
            time.sleep(delay)


def apply_mode(slug, mode):
    """Flip every staged file to blank or finished. Thin wrapper over apply.js,
    which owns the copy — this only saves remembering which tool does which."""
    subprocess.check_call(['node', os.path.join(HERE, 'apply.js'), slug, mode],
                          cwd=ROOT, stdout=subprocess.DEVNULL, shell=WIN)


def apply_blank(slug):
    apply_mode(slug, 'blank')


def screens(slug):
    data = json.load(io.open(os.path.join(sdir(slug), 'steps.json'), encoding='utf-8'))
    return sorted(data)


def typecheck():
    r = subprocess.run(['npx', 'tsc', '--noEmit'], cwd=ROOT,
                       capture_output=True, text=True, shell=WIN)
    return r.returncode == 0, (r.stdout + r.stderr).strip()


def verify(slug):
    apply_blank(slug)
    for s in screens(slug):
        perform(slug, s, 0)
    manifest = json.load(io.open(os.path.join(sdir(slug), 'manifest.json'), encoding='utf-8'))
    bad = []
    for name, rel in manifest.items():
        fin = os.path.join(sdir(slug), 'finished', name + '.final')
        if not os.path.exists(fin):
            continue
        if read(rel) != io.open(fin, encoding='utf-8', newline='').read():
            bad.append(rel)
    for b in bad:
        print('MISMATCH', b)
    print('verify: %d/%d files identical to finished' % (len(manifest) - len(bad), len(manifest)))
    return 1 if bad else 0


def touched_by(slug, screen):
    """The files a screen's steps end up rewriting, named by the tidy-up beat."""
    for st in steps_for(slug, screen):
        if st['op'] == 'final':
            return [name for name, _ in st['args']]
    return []


def rehearse(slug):
    """Walk the exact path a recording takes: for each screen, preflight, replay
    at full speed, typecheck, then diff that screen's files against finished.

    Per screen rather than in one pass, because preflight resets every staged
    file back to blank — which is the whole point of it, and the reason a screen
    that was left half-revealed aborted a take once.
    """
    manifest = json.load(io.open(os.path.join(sdir(slug), 'manifest.json'), encoding='utf-8'))
    bad = 0
    for s in screens(slug):
        if preflight(slug) != 0:
            print('rehearse: preflight failed before screen %s' % s)
            return 1
        perform(slug, s, 0)
        ok, msg = typecheck()
        if not ok:
            print(msg)
            print('rehearse: screen %s ends on a type error' % s)
            return 1
        names = touched_by(slug, s)
        for name in names:
            rel = manifest[name]
            fin = os.path.join(sdir(slug), 'finished', name + '.final')
            if read(rel) != io.open(fin, encoding='utf-8', newline='').read():
                print('MISMATCH', rel)
                bad += 1
        print('rehearse: screen %s replayed clean (%d files)' % (s, len(names)))
    apply_blank(slug)
    print('rehearse: %s - all screens replay and typecheck, left blank' % slug)
    return 1 if bad else 0


# ── drift detection ─────────────────────────────────────────────────────────

def tracked(slug):
    """Every file this showcase depends on, app-specific and shared."""
    roots = ['src/app/%s' % slug, 'src/features/%s' % slug,
             'assets/images/%s' % slug] + SHARED
    out = []
    for r in roots:
        full = os.path.join(ROOT, r)
        if os.path.isfile(full):
            out.append(r)
        elif os.path.isdir(full):
            for base, _, files in os.walk(full):
                for f in sorted(files):
                    rel = os.path.relpath(os.path.join(base, f), ROOT).replace('\\', '/')
                    if not is_scratch(rel):
                        out.append(rel)
    return sorted(set(out))


def digest(rel):
    with open(os.path.join(ROOT, rel), 'rb') as fh:
        return hashlib.sha256(fh.read()).hexdigest()


def lock(slug):
    """Record hashes of the finished state, so drift is detectable later."""
    subprocess.check_call(['node', os.path.join(HERE, 'apply.js'), slug, 'final'],
                          cwd=ROOT, stdout=subprocess.DEVNULL, shell=WIN)
    data = {rel: digest(rel) for rel in tracked(slug)}
    io.open(os.path.join(sdir(slug), 'lock.json'), 'w', encoding='utf-8', newline='').write(
        json.dumps(data, indent=1) + '\n')
    apply_blank(slug)
    print('lock: %d files recorded for %s' % (len(data), slug))
    return 0


def drift(slug):
    """Compare against lock.json, ignoring files the reveal legitimately changes."""
    p = os.path.join(sdir(slug), 'lock.json')
    if not os.path.exists(p):
        print('drift: no lock.json for %s - run `lock` after the app is finished' % slug)
        return []
    locked = json.load(io.open(p, encoding='utf-8'))
    manifest = json.load(io.open(os.path.join(sdir(slug), 'manifest.json'), encoding='utf-8'))
    staged = set(manifest.values())
    out = []
    for rel, want in locked.items():
        if rel in staged:
            continue  # staged files are meant to differ while blank
        full = os.path.join(ROOT, rel)
        if not os.path.exists(full):
            out.append((rel, 'missing'))
        elif digest(rel) != want:
            out.append((rel, 'changed'))
    for rel in tracked(slug):
        if rel not in locked and rel not in staged:
            out.append((rel, 'new'))
    return out


def preflight(slug):
    problems = drift(slug)
    for rel, why in problems:
        print('DRIFT  %-8s %s' % (why, rel))
    if problems:
        print('preflight: %d file(s) drifted from lock - fix before recording' % len(problems))
        return 1
    apply_blank(slug)
    ok, msg = typecheck()
    if not ok:
        print(msg)
        print('preflight: typecheck failed')
        return 1
    print('preflight: clean - %s is blank and typechecks' % slug)
    return 0


if __name__ == '__main__':
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    slug, cmd = sys.argv[1], sys.argv[2]
    if cmd == 'verify':
        sys.exit(verify(slug))
    if cmd == 'lock':
        sys.exit(lock(slug))
    if cmd == 'preflight':
        sys.exit(preflight(slug))
    if cmd == 'rehearse':
        sys.exit(rehearse(slug))
    if cmd in ('final', 'blank'):
        apply_mode(slug, cmd)
        print('%s is now in %s state' % (slug, cmd))
        sys.exit(0)

    delay = 1.4
    if '--delay' in sys.argv:
        delay = float(sys.argv[sys.argv.index('--delay') + 1])
    if '--no-preflight' not in sys.argv:
        if preflight(slug) != 0:
            raise SystemExit('aborted: preflight failed, nothing was changed')
    perform(slug, cmd, delay)
