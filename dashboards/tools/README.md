# dashboards/tools — the series harness

Five entry points. They talk to headless Chrome over CDP directly: there is no Puppeteer
dependency and nothing to install, because Node 22's built-in `WebSocket` is enough.
`refscan.py` needs Pillow and numpy, both already present for the repo's bake scripts.

```bash
# 1. Read a dropped picture BEFORE building anything from it.
python tools/refscan.py twisty/ref/shot.png
python tools/refscan.py twisty/ref/shot.png --crop 60,86,1140,814 --scale 2 --peaks 18

# 2. Scaffold the episode. Dev server stopped.
node tools/new.js <slug> [port]

# 3. Photograph a state.
node tools/shot.js http://localhost:5300/ shots/home.png
node tools/shot.js http://localhost:5300/ shots/hover.png --hover "[data-mark='bar-03']"
node tools/shot.js http://localhost:5300/ shots/list.png --scroller "[data-scroller='projects']" --bands 4
node tools/shot.js http://localhost:5300/ shots/rm.png --reduced --w 1920

# 4. Measure and audit the build. Rule 9.
node tools/probe.js http://localhost:5300/ --json shots/probe.json --beats drive/hovers.json

# 5. Play the take and prove every beat does something.
node tools/drive.js drive/home.json

# 6. Ask a one-off question not worth a screenshot.
node tools/eval.js http://localhost:5300/ ./measure.js
```

`CHROME=<path>` overrides the Chrome location; `CDP_PORT` the debugging port.

## What each one is for

**`refscan.py`** answers the five questions that have to be answered before a measurement
off a picture means anything: is it a flat UI export or a posed board, is there furniture
to crop, what is the capture density, what are its exact colours, and where is its grid.
It writes `<name>.refscan.json` and `<name>.grid.png` beside the image. **Look at the grid
png.** A grid the tool found correctly is obvious at a glance, and so is a misread one.

Its verdict is a hint, not a ruling. The evidence it prints is the useful part:

| Signal | Flat UI export | Posed board |
|---|---|---|
| Spike ratio | high — edge energy lands in whole columns and rows | low — a tilt smears it |
| Edge ramp | 1–3px: a border | 8–40px: a drop shadow |
| Border ring std | low either way — a page background reads the same as a board |

The ramp is the one that decides it. The non-border share is printed for information and
is **not** used, because a dashboard's own flat page background looks exactly like a board.

**`probe.js`** audits the build as rendered: the shell (and whether the document scrolls,
which in a dashboard is a defect), every inner scroll region, dead space at the foot of
each region, the column grid read off the boxes, the type scale actually in use, every
text node that fails WCAG against its own ground, every interactive target under 44px,
animations running at rest, every chart and whether it is labelled, duplicate SVG def ids,
and every hover rule in the stylesheets that matches something on the page.

`--beats out.json` turns that hover sweep into a `drive.js` script — the hover pass as a
command rather than a list of selectors you hoped to remember.

**`drive.js`** is the one this series turns on. It plays a beats file, photographs every
beat and diffs each pair numerically, and **exits 1 if any beat changed nothing**. A hover
that does nothing, a range tab that re-renders the same path and a search box that filters
nothing all look perfect in a screenshot and all ruin a take.

A beat applies `eval`, `click`, `fill`, `key`, `wheel`, `hover` in that order — hover last,
so the pointer rests on the thing being photographed. `rest: true` parks the pointer first;
`against: "<name>"` diffs against a named earlier beat instead of the previous one, which
is what makes a rest/hover pair a pair; `expectUnchanged: true` inverts the check, which is
how the two inert tabs of rule 1 are proved inert.

## Notes that are there because of a trap

- **`cdp.js` takes a throwaway capture first.** The first shot after a cold Vite server is
  pre-hydration: blank image boxes, the chart undrawn, effects not run. `--fast` skips it.
- **Page scripts are files, not template literals.** `evaluateFile` reads the file and
  wraps it as a function body taking one `input` argument. The websites harness measures
  through one long template literal and lost a debugging round three times to it: a
  backtick in a comment inside the literal ends it, and a backslash in a regex is eaten by
  it, so `\s` arrives as `s`. A file on disk has neither problem.
- **A click is dispatched as real pointer events**, not `el.click()`. `el.click()` has no
  pointer history, so anything armed on `pointerdown`, every outside-click close and every
  `:active` style is skipped — and a tooltip that only exists while the pointer is over a
  mark never appears.
- **`wheel` scrolls whatever is under the pointer.** A dashboard is a fixed shell, so
  `window.scrollTo` does nothing in one; `--bands` wheels a named scroller instead and
  stops early when its `scrollTop` stops moving.
- **`captureBeyondViewport` is off.** It renders the page at the clip's page offset, where
  a fixed element is not, and it does not paint `backdrop-filter` at all. The viewport is
  the right frame for a shell anyway.
- **Scroll behaviour is forced to `auto`** after every navigation, or a scroll animates and
  the rect read in the same breath is the old one.
- **Do not write any file inside an episode folder while `drive.js` is running.** Vite's
  watcher reloads the open page, the run keeps going against a freshly mounted app, and the
  diff reports a whole-frame change on whichever beat it landed on — which reads exactly
  like a real regression. It cost one confused re-check: a beat clicking an *inert* tab
  reported 79,977 changed pixels because a README had been saved in that project two
  seconds earlier. Editing another episode is fine; editing the one being driven is not.
- **Keep script logging ASCII.** The Windows console cannot encode a tick mark and the
  whole command dies on the print, after the files have already been written.
