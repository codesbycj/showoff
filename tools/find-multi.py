"""List component files that export more than one component.

    python tools/find-multi.py

`stage.js` resolves a block's component through the screen's import, so a file
exporting several resolves to one module and is never descended into — which
is what put ten screens of batch 4 under the 20-step floor (I5). This is the
list `tools/split-parts.py` has to be run over.
"""

import glob
import io
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

found = []
for path in sorted(glob.glob(os.path.join(ROOT, 'src', 'features', '*', 'components', '*.tsx'))):
    src = io.open(path, encoding='utf-8').read()
    n = len(re.findall(r'^export function ', src, re.M))
    if n >= 2:
        found.append((os.path.relpath(path, ROOT).replace(os.sep, '/'), n))

for rel, n in found:
    print('%-62s %d exports' % (rel, n))
print('%d files' % len(found))
