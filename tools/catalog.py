"""
Build the catalog of every showcase: a thumbnail per screen, and the data file
the catalog screen reads.

    python tools/catalog.py            # shoot every slug, rebuild the catalog
    python tools/catalog.py --data     # rebuild the data file only, no shooting

The dev server must be up for a full run (`npx expo start --web --port 8082`),
because the thumbnails are shot off it. Set EXPO_PORT if it is not on 8081.

**Each screen is shot twice and the second is kept.** The first capture after a
server start or a new asset is pre-hydration (RULES §4.1), and a catalog built
from cold frames shows half-painted screens.

The thumbnails are small on purpose — 210x455 JPEG, about 20KB each. They ship
in the Android bundle like any other asset, and §8.1 is explicit that imagery
accumulates there, so the catalog pays for itself in kilobytes rather than
megabytes.

They go in `assets/images/_catalog/`, which is **not** a slug, so `lock` and
`preflight` do not track it and `showcase.js wipe` does not remove it.

**The run refuses to start unless the web bundle compiles.** A Metro build
error red-screens every route at once, and the shooter cannot tell that frame
from a screen — so a run against a broken bundle happily writes sixty
thumbnails that are all a photograph of the same error overlay, and the first
thing that says so is the catalog itself. This is not hypothetical: deleting
stale thumbnails while `shots.ts` still required them did exactly that, because
`shots.ts` is only rewritten at the END of a run.
"""

import io
import json
import os
import re
import subprocess
import sys
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, 'src', 'app')
OUT = os.path.join(ROOT, 'assets', 'images', '_catalog')
DATA = os.path.join(ROOT, 'src', 'components', 'catalog', 'shots.ts')

THUMB = (210, 455)


def slugs():
    """Every route directory under src/app that holds an index.tsx.

    `src/app/animated/<slug>` is a video-reference showcase (§2.3) and nests one
    level deeper, so both shapes are picked up.
    """
    found = []
    for name in sorted(os.listdir(APP)):
        d = os.path.join(APP, name)
        if not os.path.isdir(d) or name.startswith('_'):
            continue
        if os.path.exists(os.path.join(d, 'index.tsx')):
            found.append((name, name))
            continue
        for sub in sorted(os.listdir(d)):
            if os.path.exists(os.path.join(d, sub, 'index.tsx')):
                found.append((sub, '%s/%s' % (name, sub)))
    return found


def shared(a, b):
    n = 0
    while n < len(a) and n < len(b) and a[n] == b[n]:
        n += 1
    return a[:n]


def group_of(slug, others):
    """The app a slug belongs to, derived from the slugs themselves.

    Each showcase is one screen of some app, and the slugs carry the app's name
    as a prefix. The group is the **shortest** prefix a slug shares with any
    sibling, which is what separates `globe` from `globesta`: `globestart` and
    `globestay` share eight characters, but `globestart` and `globehome` share
    five, and five is the app.
    """
    best = None
    for o in others:
        if o == slug:
            continue
        p = shared(slug, o)
        if len(p) >= 4 and (best is None or len(p) < len(best)):
            best = p
    return best or slug


def bundle_ok():
    """Does the web bundle compile?

    Read the entry URL out of the served HTML rather than guessing it — the
    router's entry carries query parameters, and `/index.bundle` is not it.
    Metro answers a build failure with a JSON error body and a 4xx/5xx, so a
    200 whose first byte is not `{` is a compiled bundle.

    Returns (ok, message).
    """
    port = os.environ.get('EXPO_PORT', '8081')
    base = 'http://localhost:%s/' % port

    try:
        with urllib.request.urlopen(base, timeout=60) as r:
            html = r.read(20000).decode('utf-8', 'replace')
    except Exception as exc:
        return False, 'no dev server on :%s (%s)' % (port, exc)

    m = re.search(r'src="(/[^"]*\.bundle\?[^"]*)"', html)
    if not m:
        return False, 'no bundle entry in the served HTML'

    url = base.rstrip('/') + m.group(1).replace('&amp;', '&')
    try:
        with urllib.request.urlopen(url, timeout=600) as r:
            head = r.read(400)
    except urllib.error.HTTPError as exc:
        body = exc.read(2000).decode('utf-8', 'replace')
        try:
            body = json.loads(body).get('message', body)
        except ValueError:
            pass
        return False, 'bundle failed to compile - %s' % body.strip().splitlines()[0][:200]
    except Exception as exc:
        return False, 'bundle request failed (%s)' % exc

    if head.lstrip()[:1] == b'{':
        return False, 'bundle returned an error object'
    return True, 'bundle compiles'


def shoot(slug, route, tmp):
    """Capture one screen, and say whether it worked.

    **Twice per attempt, and the second is kept**: the first capture after a
    server start or a new asset is pre-hydration (RULES §4.1).

    **Retried once on failure.** Headless Chrome drops a connection now and
    then — one screen out of 35 went that way on the first full run — and a
    transient miss quietly leaving a screen out of the catalog is worse than
    the failure itself. The stale file is removed first, so a previous run's
    capture can never be mistaken for this one's.
    """
    env = dict(os.environ, EXPO_PORT=os.environ.get('EXPO_PORT', '8081'))
    cmd = ['node', os.path.join('tools', 'preview', 'shoot.js'), route, tmp]
    full = os.path.join(ROOT, tmp)
    err = ''

    for attempt in (1, 2):
        if os.path.exists(full):
            os.remove(full)
        for _ in range(2):
            r = subprocess.run(cmd, cwd=ROOT, env=env, capture_output=True, text=True)
        if r.returncode == 0 and os.path.exists(full):
            return True
        err = (r.stderr or '').strip()[:120]
        if attempt == 1:
            sys.stderr.write('  %s: shoot failed, retrying\n' % slug)

    sys.stderr.write('  %s: shoot failed twice - %s\n' % (slug, err))
    return False


def thumb(tmp, slug):
    im = Image.open(os.path.join(ROOT, tmp)).convert('RGB')
    im = im.resize(THUMB, Image.LANCZOS)
    os.makedirs(OUT, exist_ok=True)
    im.save(os.path.join(OUT, '%s.jpg' % slug), 'JPEG', quality=82, optimize=True)


def title(slug, group):
    """A readable name for the screen: the part of the slug after the app."""
    rest = slug[len(group):] if slug.startswith(group) and slug != group else slug
    return (rest or slug).capitalize()


def write_data(entries):
    lines = [
        '/**',
        ' * Every showcase in the repo, with its thumbnail.',
        ' *',
        ' * **Generated — do not edit.** Run `python tools/catalog.py` to rebuild it',
        " * after adding, removing or changing a screen. The thumbnails go stale the",
        ' * moment a screen changes, and a stale catalog is worse than none.',
        ' *',
        ' * `group` is derived from the slugs themselves, not from a hand-kept list, so',
        ' * a new showcase joins its app automatically.',
        ' */',
        '',
        'export type Shot = {',
        '  /** The slug, which is also the label under the thumbnail. */',
        '  slug: string;',
        '  /** The route to push. Nested for the video-reference showcases (§2.3). */',
        '  route: string;',
        '  /** The app this screen belongs to. */',
        '  group: string;',
        '  /** The screen, within its app. */',
        '  title: string;',
        '  thumb: number;',
        '};',
        '',
        'export const shots: Shot[] = [',
    ]
    for e in entries:
        lines.append('  {')
        lines.append("    slug: '%s'," % e['slug'])
        lines.append("    route: '/%s'," % e['route'])
        lines.append("    group: '%s'," % e['group'])
        lines.append("    title: '%s'," % e['title'])
        lines.append("    thumb: require('../../../assets/images/_catalog/%s.jpg')," % e['slug'])
        lines.append('  },')
    lines.append('];')
    lines.append('')
    lines.append('/** The apps, in the order their screens appear. */')
    lines.append('export function groups(): string[] {')
    lines.append('  const seen: string[] = [];')
    lines.append('  for (const s of shots) if (!seen.includes(s.group)) seen.push(s.group);')
    lines.append('  return seen;')
    lines.append('}')
    lines.append('')
    os.makedirs(os.path.dirname(DATA), exist_ok=True)
    io.open(DATA, 'w', encoding='utf-8', newline='').write('\n'.join(lines))


def main(argv):
    data_only = '--data' in argv
    found = slugs()
    if not found:
        sys.stderr.write('no showcases under src/app\n')
        return 1

    if not data_only:
        ok, why = bundle_ok()
        print(why)
        if not ok:
            sys.stderr.write(
                'refusing to shoot: every route would capture the same error overlay.\n'
                'Fix the build first, then re-run. `python tools/catalog.py --data`\n'
                'rebuilds the data file from the thumbnails already on disk.\n'
            )
            return 1

    names = [s for s, _ in found]
    tmp = os.path.join('.probe', '_catalog.png')
    os.makedirs(os.path.join(ROOT, '.probe'), exist_ok=True)

    entries = []
    for slug, route in found:
        group = group_of(slug, names)
        dest = os.path.join(OUT, '%s.jpg' % slug)
        if not data_only:
            if shoot(slug, route, tmp):
                thumb(tmp, slug)
                print('%-16s %dx%d' % (slug, THUMB[0], THUMB[1]))
        if not os.path.exists(dest):
            sys.stderr.write('  %s: no thumbnail, skipped\n' % slug)
            continue
        entries.append(
            {'slug': slug, 'route': route, 'group': group, 'title': title(slug, group)}
        )

    write_data(entries)
    print('%d screens -> %s' % (len(entries), os.path.relpath(DATA, ROOT)))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
