# INSPO-RULES — building an app from a design shot

**This file is the authority for inspo builds.** When a reference is a design
shot — phones posed on a board, Dribbble/Behance style — these eleven rules
outrank anything in `RULES.md` that disagrees with them.

`RULES.md` stays the reference for *mechanics*: the tooling, the folder layout,
the lifecycle, and Part 7's list of traps that have actually bitten. Nothing
here replaces that. This file governs **what to build and when it is done**;
`RULES.md` governs **how the tools work**.

[INSPO-PLAN.md](INSPO-PLAN.md) is the **evidence** behind the first nine: for each
rule, what the earlier rulebooks already said, quoted with its section, and what
the new rule adds. Read it once to understand the phrasing; read this file while
building.

**Three files, one job each.** `INSPO-RULES.md` — the rules. `INSPO-PLAN.md` —
why they say that. `RULES.md` — how the tools work. Nothing is in two of them.

Every rule below has a number, a measurement and a command. A rule without a
measurement is a preference, and preferences are what produced the batches that
got deleted.

---

## I1 — The image is inspiration, but it must still look like that app

Follow the reference's **palette, its copy, its type hierarchy, the order of its
blocks and its shapes.** Those are the design. Reproduce them.

What is *not* the design: the artboard's pixel grid. The board's phone is
whatever size the designer's canvas happened to be, and it is usually tilted,
shadowed and cropped.

So:

- **Copy the design language exactly** — the greens, the navy card, the chip
  shapes, the label wording, the block order top to bottom.
- **Rebuild the geometry at real phone size** (I2), not by dividing the board's
  measurements by some scale factor.
- **Do not redesign it.** Changing the layout, swapping the palette, inventing a
  different structure, or "improving" it into a different app is out of scope.
  If a stranger put the build next to the board, they must say "that's the same
  app", not "that's inspired by it".
- **Fix what is broken, silently, and list it in the handover**: typos,
  impossible numbers, contrast under 4.5:1, tap targets under 44dp, a label that
  contradicts its icon. The design shot is not an authority on correctness.

**Measured by:** the handover lists every departure from the board and the
reason. A departure not listed is a defect.

**Scenario this comes from:** a batch built from design shots came back "looking
like a toy" — not because it followed the references, but because it drifted
from them while also inventing filler. Both halves of this rule failed at once.

---

## I2 — It is a real app for a real phone

Not a picture of an app. Someone must be able to hold it and use it.

- Every size derives from `useWindowDimensions()` through `layout.ts`. No fixed
  offsets copied off one device.
- Type and spacing right for a 393dp phone: display headline ~34–40dp, body
  ~15–16dp, a primary button ~56dp tall, page margin 20–24dp.
- Every pressable ≥44dp in both directions, or `hitSlop` that makes it so.
- Where the board's proportions and a phone's ergonomics disagree, **the phone
  wins**.
- It holds at other widths. Check more than one.

**Measured by:** `node tools/preview/audit.js <slug>` — `TAP` reports any
control under 44dp. Exit 0 required.

---

## I3 — Nothing empty at the bottom. Ever.

**This is the rule that has shipped broken most often.** A screen whose content
stops short and leaves a band of empty canvas above the system bar looks
unfinished no matter how good the blocks above it are.

- **No bottom inset or offset that produces a visible empty band.** When the app
  is not edge-to-edge the system already reserves its strip — padding the dock
  by `insets.bottom` on top of that counts it twice. Pin the design's inset as a
  **FALLBACK**, never `Math.max`.
- **Fill the space with real content, not padding.** This is an inspo brief, so
  inventing the row the board crops is not only allowed, it is the fix: make the
  hero bigger, open the rhythm out, let the list run under the edge, add the
  section the board cut off.
- **A spacer is never the fix. Padding is never the fix.** Scale up; do not
  spread out.
- The middle counts too: no run of empty canvas over 48dp between blocks.

**Measured by:**

```bash
node tools/preview/shoot.js <slug> shot.png && python tools/preview/foot.py shot.png
node tools/preview/audit.js <slug>        # GAP catches the hole in the middle
```

`foot.py` measures from the **safe area**, not the screen edge. **Over 24dp
fails.** `audit.js` `GAP` fails over 72dp between blocks.

**Scenario:** four screens of the deleted batch had a dock or button row with a
wide empty band under it, because they were laid out against a bottom inset of 0
in the harness and then run with the emulator's real inset. `FOOT` passing also
proves nothing about the middle — one screen read 8dp at the foot while carrying
146dp of white across its centre.

---

## I4 — Images are images. Draw the interface, photograph the picture.

**If it is a picture *of* something, it is a photograph.** Food, people, places,
products, vehicles, interiors, landscapes, maps. Free-licensed stock, bundled
locally, credited in `CREDITS.md`. Never hotlinked — recording must not depend
on the network.

**If it is interface, it is a vector.** A chevron, a bell, a tab bar, a badge, a
progress ring, a card, a chip, a wordmark.

Two cases that keep being got wrong:

- **A category tile is a picture, not an icon.** A row of round tiles reading
  Burgers / Steak / Desserts is six *photographs*. Drawing them in SVG produces
  a row of cartoons where the design had food. Small on screen does not mean
  small as a subject. This is the single thing that most makes a screen read as
  a toy.
- **A map is out of range.** A map has no idea to interpret, so vectoring one is
  tracing it path by path — copying with extra steps. Use a static tile from a
  free-licensed source, or build the map *idea* (route line, pin, radius ring)
  over a flat ground, and say which.

**The test:** if drawing it means reproducing a specific arrangement rather than
expressing an idea, it is out of range. A chevron is an idea. A burger is a
photograph of a burger.

When a subject is out of range and no stock exists, **change the subject to one
that keeps the app's plot** — a rental app can lead on a key, a road or an
interior. Changing the subject is allowed; shipping something that looks wrong
is not.

**Measured by:** eyes on the shot at 1:1, plus `CREDITS.md` present and complete
per showcase. Also check every baked frame at 1:1 for *other brands'* marks —
jackets, labels, signage. A contact sheet cannot show a 40px logo.

---

## I5 — At least 20 steps in the recording

20 is the floor. **30–40 is the target.**

Element-level means three levels, and staging only the top one produces 7–18
step reveals that land a whole rail at once:

1. the screen's own JSX blocks — the shell of each part appears
2. the component each block mounts, staged internally — the shell fills
3. the data array that component renders, one entry at a time — the row fills

**Measured by:** `node tools/timelapse/stage.js <slug>` exits 1 under 20.

A screen that cannot reach 20 is not a thin screen — it is markup pretending to
be a screen. **The fix is extraction into `src/features/<slug>/components/`,
never a lower floor.**

---

## I6 — You see the screens before anything is locked

**New gate, and it comes before staging.** No screen is staged, locked or
recorded until it has been shown and signed off.

```bash
npx expo start --web --port 8082          # once, leave it up
node tools/preview/shoot.js <slug> shot.png
```

Then present every screen — the shot, plus its `audit.js` and `foot.py` numbers
— and **wait for sign-off.**

Why this gate exists: staging is expensive and a screen restaged after a layout
change is a staging pass thrown away. Worse, a batch that is built, staged,
locked and only *then* looked at is a batch that gets deleted whole. That has
now happened twice.

Port **8082**. 8081 is usually another project, and a stray second dev server
rewrites `router.d.ts` with bogus routes so `tsc` then lies.

**Measured by:** sign-off is explicit. "It looked fine to me" is not sign-off,
and neither is silence.

---

## I7 — Nothing breaks, at any step

Not just the finished screen — **every intermediate state must render.**

`verify` diffs the *end* of a replay and `rehearse` typechecks it. Neither
renders the middle, so a reveal passes both and still red-screens at step 14. It
has, repeatedly.

The crash shape that keeps recurring is **a value derived from a staged array
while that array is still empty**:

```ts
const axisTop = Math.max(...values);               // -Infinity when values is []
const y = plotTop + plotH - (t / axisTop) * plotH; // NaN
<Line y1={y} />                                    // react-native-svg throws
```

So, as you write it, not afterwards:

- `Math.max(...values, 1)`, a divisor clamped to ≥1, a guard returning `null`
  while the series is empty. Same for `.find`, `.findIndex`, `[0]` and any
  `length - 1` index.
- **Annotate every array a reveal fills in.** A type inferred from whichever
  rows happen to be uncommented loses every property that only appears on a
  later row.

**Measured by:**

```bash
node tools/preview/stepshots.js <slug> <screen> .probe/<slug>
python tools/preview/stepdiff.py .probe/<slug>      # FAILs any step that errors
npx tsc --noEmit                                    # across ALL of src/
npx expo export --platform android                  # dev server stopped, finished state
```

---

## I8 — Never open the emulator. The web render must look like a phone.

Nothing in this workflow starts an emulator or a device. The web render plus the
Android export is the whole verification budget, so native failures are
**designed out**, not caught by running it.

Shoot at **393×852 @3x** with the harness's faked insets `59,0,34,0`, and read
every inset-anchored position off that rather than off a bare render — web
reports zero insets.

Because the web render cannot see these, they have to be right by construction:

- **Never `Platform.select` a shadow.** Carry `shadow*` and `elevation` in one
  style object; the keys the running platform ignores are inert.
- **No emoji as UI.** They differ across Windows / Android / iOS — flags are
  missing on Windows entirely. Draw the glyph or take it from the icon set.
- **Never `overflow: 'hidden'` and `elevation` on the same View.** Android clips
  more aggressively; do not rely on overflow at all.
- **`useId` for every SVG gradient id** — ids are document-global on web and
  everything otherwise renders in the first colour.
- **Two font files must not share an internal family name.** Web gives each its
  own `@font-face` so a collision is invisible there; Android resolves by the
  name *inside* the file and the loser renders as tofu.

**Measured by:** `shoot.js` + `audit.js` + the Android export in the done-gate.
Shoot twice — the first capture after a server start or a new asset is
pre-hydration.

---

## I9 — Every recorded step is a visible change on screen

**An import is not a step.** Commenting an import out and back changes nothing
visible — the component it names is not mounted yet, because its JSX is still a
comment. A reveal whose first five to ten steps are import lines opens on ten
seconds of nothing, and that is what the recording shows.

So: **an import is uncommented in the same step as the first JSX block that uses
it.** One step = one import + the block it feeds = one visible change.

And **one element per step.** The page must not appear whole and then accrete
details — that was a screen where step 1 painted most of the frame and the
remaining thirty added small things to it. Thirty steps is not a reveal if the
first does the work of twenty.

- No step may paint more than **~15% of the frame**.
- **Step 1 must not be the largest.**
- Order is visual: top to bottom, outside in — the shell of a block, then its
  contents, then the rows inside those.
- **Nothing paints in frame one except the page's own ground.** Descending a
  container to stage its children leaves its `backgroundColor` live, so the take
  opens on an empty sheet or a stray chip. Move the fill to an absolutely-filled
  child — and carry the shadow and `elevation` onto it, or an emptied card still
  paints its padding as a strip with a shadow under it.

**Measured by:**

```bash
node tools/preview/stepshots.js <slug> <screen> .probe/<slug>
python tools/preview/stepdiff.py .probe/<slug>
node tools/preview/blank.js <slug>        # exit 0 — nothing but the ground
```

`stepdiff.py` FAILs a zero-diff step, a step over 15%, and any step that errors.

---

## I10 — 8082 shows everything. One screen is a tap, never a URL.

**The dev server's root is the wall**: every showcase in the repo as a
thumbnail, grouped by app, and a single screen is opened by tapping its
thumbnail. It is never a redirect into one slug, and a batch is never
presented as a list of per-slug URLs to type.

This is what I6 is for. A batch can only be judged as a batch, side by side —
a redirect to one screen hides the other fifty-nine, and no amount of prose
about the other fifty-nine substitutes for seeing them.

- `src/app/index.tsx` is a **derived file**. `showcase.js use <slug>`, `rm`,
  `wipe` and `record.js` each rewrite it as a boot redirect, which is right
  for a take — the device should open straight on the screen being filmed.
  **Put it back afterwards.** A take is the only thing that may leave the root
  pointing at a single screen, and only while the take is running.
- **The thumbnails go stale the moment a screen changes.** Rebuild them after
  a layout pass, after a take, and before presenting anything.
- **A staged showcase rests in blank state, so it photographs as its own
  ground** — a white page, a black page, a bare gradient. That is the route
  rendering correctly, not a broken thumbnail. Shoot those from their finished
  state and put them straight back:
  `apply.js <slug> final` → shoot → `apply.js <slug> blank`, which restores
  byte-identically from the manifest's own copies.
- **Prune `_catalog/` when a showcase is deleted.** `catalog.py` does not
  remove the thumbnails of slugs that no longer exist; they are dead weight in
  the bundle and `shots.ts` will keep requiring them.

**Measured by:**

```bash
node tools/showcase.js catalog          # boot route -> the wall
EXPO_PORT=8082 python tools/catalog.py  # re-shoot every route, rewrite shots.ts
```

`catalog.py` **refuses to run unless the web bundle compiles.** A Metro build
error red-screens every route at once and the shooter cannot tell that frame
from a screen, so a run against a broken bundle writes sixty thumbnails that
are all a photograph of the same error overlay.

**Scenario this comes from:** deleting stale thumbnails while `shots.ts` still
required them. `shots.ts` is only rewritten at the END of a run, so the bundle
could not resolve them for the whole run, and every thumbnail came back as the
error screen. The catalog is the only thing that said so.

---

## I11 — A bar may not be longer than what is in it

**No tab bar, dock or action bar carries a band of dead height below its own
labels.** This is R1b's double-count seen from the inside: when a bar is
pinned flush to the foot, padding it by `insets.bottom` does not produce a gap
*under* the bar where `foot.py` would find it — it produces a bar that is
34–40dp taller than its contents, with the ink floating in the top of it. What
the eye calls that is "the tab bar is too long".

- **A pinned, full-width bar does not reserve the indicator's strip.** When
  the app is not edge-to-edge the system already holds that space. The bar is
  its own height and nothing more, and its ink is centred in it.
- **A floating bar is a different shape and is fine.** A 66dp pill holding
  20dp glyphs has 23dp above its ink and 23dp below; that is a dock with
  padding, not a bar with a hole in it. What fails is **lopsided** slack.
- **The fix is to stop the bar reserving the inset, never to nudge the ink
  down.** Moving the glyphs into the dead space leaves the bar just as long.
- Whatever the bar's height ends up being, it is **measured once per batch and
  pinned** — never clamped upward to swallow a layout problem above it.

**Measured by:**

```bash
EXPO_PORT=8082 node tools/preview/dockcheck.js <slug> [<slug> ...]
```

`skew` = slack below the ink minus slack above it, **with the bar's padding
counted**. Over **12dp fails** and the command exits 1. The `Δ` beside it is
the same measurement with the padding subtracted — useful for centring, and
exactly what hid this defect for a whole batch.

**Scenario:** six screens shipped with a dock padded by `insets.bottom` on top
of its own 66dp. `audit.js` passed, `foot.py` read 0dp dead, and
`dockcheck.js` reported a tidy, perfectly centred 44dp bar — because it had
been written to **subtract** the bottom padding before measuring, and to
prefer the shallowest box inside the bar rather than the box that paints. The
instrument had been taught to ignore the defect. An honest measurement reads
15dp above the labels and 54dp below them.

---

# The run, in order

Every step names the gate that must pass before the next starts.

| # | Do | Gate |
|---|---|---|
| 0 | Confirm series, kill stray `:808x` servers, no git | `netstat` clean |
| 1 | Classify the reference — design shot → **this file**, rule 1 off | — |
| 2 | Count screens, name **every** slug, write the plan | N screens = N showcases |
| 3 | Per screen: name the dominant element, list the blocks, count the steps, list what is out of drawing range (I4), list the reference's mistakes (I1) | step count ≥20 on paper |
| 4 | Scaffold with the **dev server stopped** → `theme.ts`, `layout.ts`, `use-insets.ts`, `text.tsx`, `data/` | — |
| 5 | **Assets before components** — they change layout | `CREDITS.md` complete |
| 6 | Components, one at a time: write → import → shoot → measure → prettier → next | never two before wiring the first |
| 7 | The design bar | `audit.js` exit 0 · `foot.py` ≤24dp (I3) · `dockcheck.js` exit 0 (I11) |
| 8 | **Rebuild the wall on 8082, then get sign-off** | **I10 — the wall · I6 — explicit sign-off** |
| 9 | Stage the reveal | `stage.js` ≥20 (I5) · `blank.js` exit 0 |
| 10 | Prove the reveal | `stepdiff.py` no failures (I7, I9) · `verify` · `rehearse` |
| 11 | Done-gate, dev server stopped | `tsc` clean · Android export · `lock` |
| 12 | Record, then put the boot route back | `node tools/record.js <slug>` · `showcase.js catalog` (I10) |

**Step 8 is the one that is new and the one that keeps getting skipped.** Never
stage before sign-off, and never present a batch as a list of URLs — rebuild the
wall (I10) so it can be judged as a batch.

---

# Where this file and `RULES.md` disagree

| Topic | `RULES.md` | **This file wins with** |
|---|---|---|
| Fidelity | "match the spirit, not the pixels" | I1 — spirit *and* palette, copy, hierarchy and block order. It must still read as that app. |
| Bottom space | ≤24dp dead at the foot | I3 — aim for none, and fill it with invented content rather than tolerate a band. |
| Sign-off | not a step | I6 — a screen is shown on 8082 and signed off **before** staging. |
| What 8082 serves | a boot redirect to the showcase being built | I10 — the root is the wall of every showcase; a redirect is for a take only. |
| Bars and docks | `dockcheck.js` measures height and centring | I11 — it also fails a bar whose slack is piled below its labels, padding counted. |

Everything else — the folder layout, theming, fonts, the asset tooling, the
staging mechanics, the lifecycle commands and Part 7's traps — is `RULES.md` and
is unchanged.
