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

## When the reference is markup, do not measure it at all

A Google Stitch export ships `code.html` beside its `screen.png`, and that page
is a better reference than the picture of it. Render it at the harness's own
width and read the layout out of the DOM:

```bash
node tools/preview/boxes.js "file:///$PWD/ref/<slug>/code.html" > boxes.json
```

Every box comes back exact, along with the *resolved* letter-spacing — the
tokens set it in `em` and the markup then overrides the tracking on most
strings, so the two disagree on nearly every line — and the composited value of
every alpha fill. Against that, a component can be checked to under a channel
of mean error rather than to the nearest pixel of a screenshot.

It also answers the question the PNG cannot: **what width was the export
rendered at?** Render the markup at several candidates and diff each against the
PNG. PulseFit's came out 390 against a next-best 393 by a factor of three in
mean error, and its status-bar pill had implied 393. Read at the wrong width the
error looks like a uniform 0.75% scale — which presents as everything sitting
2-3dp low by the bottom of the screen, and is very easy to mistake for drift in
the build rather than in the ruler.

## Files

| file | does |
|---|---|
| `shoot.js` | screenshot a route off the running dev server (the common case) |
| `boxes.js` | dump a reference page's own element boxes and styles, as JSON |
| `shot.js` | screenshot any URL; drives Chrome over CDP |
| `rows.js` | measure coloured bands in a PNG, in dp |
| `server.js` | static file server, for shooting a built export instead |
| `killport.sh` | free port 8788 when `server.js` is left running |

Chrome is driven with `Emulation.setDeviceMetricsOverride`. Passing `--window-size`
instead does **not** give a 393px viewport — it gives 488, which once produced a
convincing but entirely false "this element isn't centred" bug. `captureScreenshot`'s clip
scale must stay at 1; `deviceScaleFactor` already applies the 3×.
