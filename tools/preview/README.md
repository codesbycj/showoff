# Pixel-check harness

Renders a screen at exact iPhone 14/15 Pro metrics (393×852 @3x) so screenshots are
directly comparable to the Mobbin references, then measures element positions in dp.

## The fast path

Start the dev server **once** per session and leave it up:

```bash
npx expo start --web
```

Then every check is a few seconds:

```bash
node tools/preview/shoot.js revolut/card card.png   # ~7s
node tools/preview/rows.js card.png                 # element tops/heights in dp
```

This replaced an export-and-serve cycle that cost ~2.5 minutes per look. Same pixels —
verified by shooting the same screen both ways — at roughly 20× the speed.

**The one rule that comes with it:** `expo export` must never run while the dev server is
up. They share the Metro cache and concurrent access corrupts it; the symptom is the
terminal reporting `Bundled` while the device sits at 99% forever. So the Android bundle
check happens once per app, with the server stopped.

## Getting the reference back

The references arrive as pasted images, not files, so after a long session they are gone
from context while the work is not. They are still in the session transcript — pull them
out rather than tuning from memory:

```bash
python - <<'EOF'
import json, base64, io, os
p = r"<~/.claude/projects/<project>/<session>.jsonl>"
n = 0
for line in io.open(p, encoding='utf-8'):
    m = json.loads(line)
    if m.get('type') != 'user': continue
    for part in m.get('message', {}).get('content', []) or []:
        if isinstance(part, dict) and part.get('type') == 'image':
            src = part['source']; n += 1
            ext = 'jpg' if 'jpeg' in src.get('media_type', '') else 'png'
            open('ref%02d.%s' % (n, ext), 'wb').write(base64.b64decode(src['data']))
EOF
```

Honour `media_type` — some arrive as JPEG, and writing those as `.png` gives a file that
opens nowhere. Measure off a PNG reference when there is one: JPEG ringing shifts a flat
fill by several levels, enough to pick the wrong brand colour.

## Reading the numbers

`rows.js` scans for horizontal runs of known fills (field grey, black, hairline) and prints
each band's top and height in dp. That is how spacing gets verified — not by eye.

Work out the reference conversion before measuring anything. Mobbin exports are the phone
screen plus an attribution bar: strip the bar, divide by the capture density. For the
1179×2676 exports used so far the screen is 1179×2556 at 3x = 393×852 dp, so a measurement
in that image × 0.446 = dp. Recompute for any new reference size.

## Files

| file | does |
|---|---|
| `shoot.js` | screenshot a route off the running dev server (the common case) |
| `shot.js` | screenshot any URL; drives Chrome over CDP |
| `rows.js` | measure coloured bands in a PNG, in dp |
| `server.js` | static file server, for shooting a built export instead |
| `killport.sh` | free port 8788 when `server.js` is left running |

Chrome is driven with `Emulation.setDeviceMetricsOverride`. Passing `--window-size`
instead does **not** give a 393px viewport — it gives 488, which once produced a
convincing but entirely false "this element isn't centred" bug. `captureScreenshot`'s clip
scale must stay at 1; `deviceScaleFactor` already applies the 3×.
