# showoff — the rules

Every rule given for this repo, in one file. This file replaces `AGENTS.md` and
`APP-DESIGN-RULES.md`; it is loaded every session through `CLAUDE.md` and it
outranks any reference, any screenshot and any design shot where they disagree.

This repo holds three series. **This file is the apps series.** The websites
before/after series is closed and has its own rules in
[websites/README.md](websites/README.md). The dashboards series is current and
has its own rules in [dashboards/README.md](dashboards/README.md) — read that
file, not this one, before touching anything under `dashboards/`. Nothing here
about staging, timelapse or the Android export applies there.

> Expo HAS CHANGED. Read the exact versioned docs at
> https://docs.expo.dev/versions/v57.0.0/ before writing any code.

---

# Part 0 — The five that keep going wrong

Everything below is a rule. These five are the ones that have shipped broken
more than once, and the batch of 29 was deleted because of them. If a build
fails one of these it is not finished, however good it looks.

| # | The rule | Measured by |
|---|---|---|
| **0.1** | **No empty band at the bottom of the screen.** Not 84dp, not 60dp, not 40dp. | `foot.py` against the safe area, **on a render carrying the emulator's real insets** |
| **0.2** | **Every reveal step changes something on screen.** An import that paints nothing is not a step. | the per-step pixel diff, §5.2 |
| **0.3** | **One element per step.** The page never appears whole and then accretes details. | no step changes more than ~15% of the frame, §5.3 |
| **0.4** | **No step may error.** Every intermediate state renders — not just the last one. | render each step, not `tsc` alone, §5.4 |
| **0.5** | **20 steps minimum, 30–40 better.** | `stage.js` exits 1 under 20 |

---

# The run — inception to ending

Parts 1–8 are the reference material, organised by topic. **This is the
procedure, in order.** Every step names the gate that has to pass before the
next one starts. A step skipped here is the step that fails three hours later,
after the work that depended on it is already done.

## Step 0 — Before you touch anything

- **Which series?** Apps is this file. `dashboards/` and `websites/` have their
  own, and nothing here about staging, timelapse or the Android export applies
  there.
- **Read the versioned docs** at https://docs.expo.dev/versions/v57.0.0/ for
  anything you are about to use. Expo has changed.
- **No git.** Back up by copying files. (rule 5)
- **Nothing launches the app.** No emulator, no device, ever. The web render
  plus the Android export is the whole budget, so native failures are *designed
  out*, not caught. (rule 6, §4.4)
- **Kill stray dev servers.** `netstat -ano | grep LISTENING | grep ":808"`.
  A second server rewrites `router.d.ts` with bogus routes and `tsc` then lies
  to you. showoff runs on **8082**; 8081 is usually another project.

## Step 1 — Classify the reference

The first decision, and it changes every rule after it.

| The reference is | Rule 1 (pixel perfect) | Staged reveal | Routes |
|---|---|---|---|
| a screenshot of a real app's screen | **on** | yes | `src/app/<slug>/` |
| a design shot — phones posed on a board | **off**, §2.2 | yes | `src/app/<slug>/` |
| a video / prototype recording | **off**, §2.3 | **no** — final-only | `src/app/animated/<slug>/` |
| a Stitch / code export | `code.html` is the spec, §2.4 | yes | `src/app/<slug>/` |

Getting this wrong wastes the whole build in a way that is not obvious until
the end: measuring glyph widths off a posed phone, or cross-fading whole routes
where the prototype had one surface changing state.

**For a screenshot, work out the dp conversion now.** Strip the attribution bar,
divide by the capture density. For the usual 1180×2676 Mobbin export the screen
is 1180×2556 at 3x = 393×852dp, so image px × 0.446 = dp. Recompute for any
other size. Every measurement for the rest of the build depends on this number.

## Step 2 — Count the screens and name them

- **N screens = N showcases.** Each gets its own slug, its own
  `src/features/<slug>/`, its own `assets/images/<slug>/` and its own staging —
  never N routes under one slug. (rule 4, §8.1)
- **Name every slug now**, before any code.
- **Rename the reference files to the slugs now, not at the end.**
  `wanderhome.png`, not `14-left.png`. (rule 8)
- The duplication between two screens of one design is deliberate: each carries
  its own `theme.ts`, `layout.ts`, `use-insets.ts` and `text.tsx`, because
  `lock` and `preflight` track per-slug folders and a shared one makes each
  showcase report the other's blanked files as DRIFT.

## Step 3 — Read each screen before you build it

Per screen, written down before any code. This is the step that gets skipped,
and skipping it is why a build comes out flat and then has to be restaged.

1. **Name the dominant element** (R8). One hero, one figure, one headline. If
   naming it is hard, you have not understood the screen yet and everything will
   come out at the same weight.
2. **List the blocks, top to bottom.** That list *is* the component list, and it
   is also the reveal order.
3. **Count the reveal steps the list will produce** — blocks, plus each block's
   internals, plus each data array's entries. **Under 20 means the screen is
   markup, not assembly.** Split it further now, not after `stage.js` exits 1.
   (§5.1)
4. **List what is out of drawing range** — faces, food, places, products,
   interiors, maps. That list is the asset plan. (§2.5)
5. **List the reference's mistakes you will fix** — typos, a pager that counts
   wrong, a label that does not match its icon, contrast under 4.5:1, a tap
   target under 44dp. These go in the handover. (§2.2)
6. **Write the copy out and check it against R5 before it reaches a data file.**
   Every string is a label, a unit, a count or a state. Never a sentence the
   design does not have. If a block looks short, R1 says make it *bigger*, not
   wordier.

## Step 4 — Scaffold, with the dev server stopped

```bash
node tools/showcase.js new <slug>
```

Running this while the server is up makes expo-router's type generator scoop
`src/features/<slug>/**` up as routes, and `tsc` then rejects the boot redirect.
`rm -rf .expo/types` and restart repairs it.

Then, in this order, before any component:

- **strip the template cruft** — no demo screens, no unused packages.
- **`theme.ts`** — colours measured off the reference or lifted from the brand's
  own SVG. No hex codes scattered through components. A dark theme needs invert
  tokens: a token must clear every ground it lands on. (§6.2, R4)
- **`layout.ts`** — every size derived from `useWindowDimensions()`. Fixed
  offsets taken off one phone are the failure mode.
- **`use-insets.ts`** — the design's inset as a **FALLBACK**, never `Math.max`,
  and never added to a surface that already stops above the system bar. This is
  the bug that put an empty band under four screens. (R1b)
- **`components/text.tsx`** — the type scale, one variant per role. Fonts
  registered **per weight** (`font-sans-medium`, never Tailwind's
  `font-medium`). Import Google Fonts by subpath, never the barrel.
- **`data/*.ts`** — all the copy and all the arrays, **with optional fields
  annotated**, because the reveal stages entries one at a time and an inferred
  type loses every property that only appears on a later row. (§5.4)

## Step 5 — Assets, before components

Asset decisions change layout, so they come before the components that hold
them — never after.

- **photography and portraits**: free-licensed stock, bundled locally, never
  hotlinked. Recording must not depend on the network.
- **glyphs**: traced with `trace.py`, never hand-authored.
- **logos**: Wikimedia SVG, inlined and cropped by `viewBox`; rasterised through
  headless Chrome if the paths sit under nested transform groups.
- **cutouts, duotones, composites**: `tools/bake/*`. Judge the tolerance by the
  result on the page's own colour, not by the border statistics.
- **check every baked frame at 1:1 for other brands' marks** — jackets, labels,
  signage. A contact sheet cannot show a 40px logo.
- **`CREDITS.md`** per showcase, every file credited.

If a subject is out of drawing range and no stock exists, **change the subject
to one that keeps the app's plot** — a rental app can lead on a key, a road or
an interior. Do not fall back to drawing it badly.

## Step 6 — Build, one component at a time

Start the dev server **once** and leave it up:

```bash
npx expo start --web --port 8082
```

Then loop, per component:

1. write the component
2. import it into the screen
3. `node tools/preview/shoot.js <slug> shot.png` — **shoot twice**, the first
   capture after a server start or a new asset is pre-hydration
4. `node tools/preview/rows.js shot.png`, compare to the reference
5. prettier
6. **only now**, the next component

Never write two components before wiring the first (rule 3). The screen file
stays a list of imports and assembled blocks (rule 2) — it is the description of
its own reveal, and `stage.js` reads it as one.

**Five things that have to be right as you write them**, because retrofitting
each one has cost a full pass across a whole batch:

- **Container fills go on an absolute-fill child**, with the shadow and
  `elevation` carried onto it, so nothing paints in frame one. (§5.5)
- **Every value derived from a data array is guarded for the empty case** —
  `Math.max(...vals, 1)`, a divisor clamped to ≥1, a guard that returns `null`
  while the series is empty. The reveal *will* empty that array. (§5.4)
- **`shadow*` and `elevation` live in one style object**, never
  `Platform.select` — a select is exactly what the web render cannot check.
- **`useId` for every SVG gradient id** — ids are document-global on web and
  everything renders in the first colour.
- **No emoji as UI.** Draw the glyph or take it from the icon set.

The expensive mistakes live in Part 7. Read it once at the start of a batch, not
after the first one bites.

## Step 7 — The design bar, per screen

```bash
node tools/preview/audit.js <slug>
node tools/preview/shoot.js <slug> shot.png && python tools/preview/foot.py shot.png
node tools/preview/dockcheck.js <slug>
```

- `audit.js` **must exit 0**. Every WARN is either fixed or named in the
  handover with the reason it stands. An unexamined WARN counts as a FAIL.
- `foot.py` **≤24dp, at the emulator's inset**, not only the harness's. (R1b)
- `audit.js` `GAP` catches the hole in the *middle* that `foot.py` structurally
  cannot see.
- **The fix for a gap is never padding and never a spacer.** Make the hero
  bigger, open the rhythm out, let the list run under the edge, add the row the
  reference crops.

**Do not move to staging until this passes.** A screen restaged after a layout
change is a staging pass thrown away.

## Step 8 — Stage the reveal

```bash
node tools/timelapse/apply.js <slug> final     # never stage an already-blank file
node tools/timelapse/stage.js <slug> --dry     # read the plan before writing it
node tools/timelapse/stage.js <slug>
node tools/timelapse/gen.js <slug>
```

Never hand-write a blank file and never hand-write `steps.json`. Then check the
plan against the three rules the tooling cannot yet enforce:

- **No step is an import on its own.** Merge it into the first block that uses
  it, so the step paints. (§5.2)
- **No step paints more than one element.** Descend into any block that reveals
  a whole region. (§5.3)
- **≥20 steps, 30–40 better.** (§5.1)

Then prove it:

```bash
node tools/preview/blank.js <slug>              # exit 0 — nothing but the ground
python tools/timelapse/run.py <slug> verify     # staged files match finished
python tools/timelapse/run.py <slug> rehearse   # preflight + replay + typecheck, per screen
npx tsc --noEmit                                # verify cannot see unstaged files
```

and **render every intermediate step, not just the last** — `verify` diffs the
end and `rehearse` typechecks it, so a reveal can pass both and red-screen at
step 14. (§5.4)

## Step 9 — The done-gate

Dev server **stopped**, and the port confirmed free — stopping the task is not
the same as the process exiting, and an overlapping export corrupts the Metro
cache. Then all of §8.2:

1. `npx tsc --noEmit` clean across **all** of `src/`
2. `npx expo export --platform android`, **from the finished state**
3. `run.py <slug> verify`
4. `run.py <slug> rehearse`
5. `blank.js` over every screen in blank state, exit 0
6. `foot.py` over every finished screen, ≤24dp at the emulator's inset
7. `audit.js` over every screen, exit 0
8. the per-step check — no zero-diff step, no step over ~15% of the frame, no
   step that errors
9. `run.py <slug> lock`, then break one unstaged file on purpose and confirm
   preflight reports `DRIFT` and exits 1
10. leave it in **blank** state

## Step 10 — The handover

Per screen, the R10 block:

```
<slug>  audit: no failures (N warnings: <one line each, fixed or why not>)
        foot: <n>dp dead  (at the emulator's inset)
        dominant element: <what it is>
        deviations from the reference: <list, with the reason>
```

Plus, once for the app: the substitute typeface and what it cost, which assets
are stock standing in for brand photography, which subjects were changed because
they were out of drawing range, and every call that was yours rather than the
reference's.

**A handover without those lines is not a handover.** This is the rule the other
nine depend on — the batch that caused this file was not built blind, it was
built unchecked.

## Step 11 — Record

```bash
node tools/record.js <slug>        # use -> preflight -> expo start -> ask -> reveal
```

One screen per showcase, so a take is never "perform screen 1 to reach screen 2"
and preflight never blanks the screen the device is standing on. The reveal runs
*while* the server is up, because every step is a file write Fast Refresh has to
redraw.

## Step 12 — End

Showcases coexist until the weekly reset. A broken file in one red-screens all
of them, and imagery accumulates in the bundle, so keep each app's assets tight.

```bash
node tools/showcase.js rm <slug> --yes   # one, once recorded
node tools/showcase.js wipe --yes        # all of them
```

`ref/` is input, not output — it survives the wipe.

---

# Part 1 — The hard rules

1. **Pixel perfect** (against a *screenshot* reference). Spacing, radii, type
   scale, colour. No "close enough". Explicit values, never eyeballed ones.
   Rule 1 is **off** for a design shot and for a video — see Part 2.
2. **Everything is a component.** Screens are assembly, never markup. A screen
   file reads as a list of imported components, so the speed video shows the UI
   appearing one piece at a time. A screen that cannot reach 20 reveal steps is
   not a thin screen — it is a rule-2 violation. The fix is extraction, never a
   lower floor.
3. **One component per step.** Finish a component → import it into the screen →
   verify → only then start the next. Never write two components before wiring
   the first.
4. **Build the whole set, one showcase per screen.** Given N screens, build all
   N. Each gets its own slug, its own `src/features/<slug>/`, its own assets
   folder and its own staging — even when they are screens of the same app.
   Duplicate whatever two of them share (theme, layout constants, the text
   primitive); independence is worth more than the duplication. Do not stop
   between screens for approval. Report deviations at the end. Only stop early
   if genuinely blocked — and then finish everything that isn't blocked first.
5. **No git.** Never commit, branch, stage, checkout or reset. These are
   showcases, not shipped code. Back work up by copying files.
6. **Never launch the app.** Nothing in this workflow starts an emulator or a
   device. The web render plus the Android export is the whole verification
   budget — so native failures have to be *designed out*, not caught by running
   it. See §4.4.
7. **The design bar.** Every screen passes `node tools/preview/audit.js <slug>`
   with no FAIL before it is called finished, and the handover quotes the result
   per screen. Part 3.
8. **Reference filenames match the build.** A file in `ref/` is named for the
   slug it produced — `wanderhome.png`, not `14-left.png`. Rename as soon as the
   slug exists, and repoint every citation.

---

# Part 2 — The reference, and what it licenses

## 2.1 A screenshot is a layout brief

An export of a real app's real screen, one phone filling the frame. Part 1
applies in full: match the design exactly, build it screen by screen, stage it
as a speed-build reveal.

**Work out the conversion before measuring anything.** Reference screenshots
usually arrive as Mobbin exports: the phone screen plus an attribution bar along
the bottom. Strip the bar, then divide by the capture density. For the
1180×2676 exports used so far the screen is 1180×2556 at 3x = 393×852 dp, so a
measurement in that image × 0.446 = dp. Recompute for any new reference size.

## 2.2 A design shot is an inspo brief, and rule 1 is off

A Dribbble/Behance-style presentation — two or three phones posed on a coloured
board, drop shadows, a 3D render dropped in, sometimes tilted — is a *picture of
an idea*, not a spec.

- **Match the spirit, not the pixels.** Take the palette, the type hierarchy,
  the shapes, the order of the blocks and the feel. Do not reconstruct a px/dp
  scale off a posed phone, do not measure glyph widths against it, and do not
  write a `layout.ts` full of numbers divided by 0.88. The board's phone is
  whatever size the designer's artboard happened to be.
- **Build it at the real size instead.** Type and spacing right for a 393dp
  phone — display headline ~34–40dp, body ~15–16dp, primary button ~56dp tall,
  page margin 20–24dp — laid out in flex off `useWindowDimensions()` so it holds
  at other widths. If the reference's proportions and a phone's ergonomics
  disagree, the phone wins.
- **Fix the reference's mistakes.** Typos, a stray "01 / 03" that counts wrong,
  a label that does not match its icon, contrast too low to read, a tap target
  under 44dp: correct it silently and say so in the handover. The design shot is
  not an authority.
- **Improve it where it is obviously better.** A real pressed state, a real
  focus ring, an animated progress bar, a gradient rebuilt as a gradient instead
  of a flat fill. Changes that make it a better *app* are wanted; changes that
  restyle it into a different design are not.
- **Everything else still holds.** One showcase per screen, components not
  markup, one component at a time, the full staging, and the done-gate.
- **The screen has to fill the screen.** Every phone in a design shot is full to
  its bottom edge. See §0.1 and R1.
- **Say which calls were yours.** The handover lists every departure and why.

A 3D render in the shot (a wallet, a floating card, a coin) cannot be recreated
and must not be traced badly. Either stand in free-licensed stock for it, or
rebuild the *idea* of it in-app — a real card component, posed and shadowed.
Say which.

## 2.3 A video is a motion brief, and the rules change further

- **The animation is the specification. The UI is inspiration.** Measure the
  motion frame by frame and match it; do not chase the layout's pixels. A
  capture tool flies and zooms the phone, so there is no stable pixel grid in
  the clip. Rule 1 does not apply.
- **It must be a real, responsive app.** Derive every size from
  `useWindowDimensions()` through a `layout.ts`, lay blocks out in flex, and
  check at several screen sizes. Fixed offsets taken off one phone are the
  failure mode here.
- **One screen, not one route per beat.** The transitions in a prototype are
  continuities between states of the same surface — a shared element flying out
  of the card it was in, a bar growing into a sheet. `expo-router` cross-fades
  whole screens, which destroys every one of them. Hold the state in the screen
  and let the layers persist.
- **Routes live under `src/app/animated/<slug>/`.**
- **No step-by-step staging.** There is no blank state and no reveal: the
  showcase is filmed by *using* it. Register it with
  `tools/timelapse/snapshot.js <slug>` — see §5.8.

Record the measured timings in a `motion.ts` with the tracked numbers in the
comments. They are the only thing to re-check against later and cannot be
recovered from the built app.

Getting frames out of a reference video without ffmpeg: headless Chrome, play
and grab. Seeking returns the same frame forever. Entrance animations need the
real in-app taps driven — a reload is always too late.

## 2.4 A Stitch / code export

`code.html` is the authority, not the PNG and not `DESIGN.md` (often absent).
Render `code.html` and read its DOM — that is also the only way to learn the
width it was rendered at. Each screen invents its own palette; calibrate the PNG
scale first.

## 2.5 What is in drawing range

**The test is what the real app ships.** Every app draws its *interface* as
vectors and ships its *pictures* as bitmaps. Match that split.

- **Draw the interface.** A chevron, a bell, a filter glyph, a tab bar, a badge,
  a progress ring, a wordmark, a flag disc, a card, a chip, an abstract solid.
  These are vectors in the real app and must be vectors here.
- **Photograph the picture.** Food, people, places, products, vehicles,
  interiors, landscapes — anything that is a picture *of* something. Use
  free-licensed stock and bundle it.

**A category tile is a picture, not an icon.** A row of round tiles reading
Burgers / Mexican / Indian under a delivery app's search bar is six photographs,
and drawing a burger, a taco and a bowl of curry in SVG produces a row of
cartoons where the design had food. Small on screen does not mean small as a
subject. This shipped once and it is the thing that most makes a screen read as
a toy.

**A map is not in drawing range either.** A map has no idea to interpret, so
vectoring it is tracing the reference path by path — copying with extra steps,
at twenty times the cost of either honest route. Use a static tile from a
free-licensed source, or build the map *idea* — a route line, a pin, a radius
ring — over a flat ground, and say which.

**Faces are photographs.** Where a design shows people — contacts, reviewers, a
profile, a leaderboard — use free-licensed portraits and bundle them. Initials
on a coloured disc is a fallback state, not a substitute: a screen built from it
is visibly missing something the reference had.

**The underlying test: if drawing it means reproducing a specific arrangement
rather than expressing an idea, it is out of range.** A chevron is an idea. A
burger is a photograph of a burger. A map is a picture of a place.

When the subject is out of drawing range, do not fall back to drawing it anyway.
Find another route: free-licensed stock of the same subject, or **a different
subject that keeps the app's plot** — a rental app can lead on a key, a road, a
badge or an interior rather than on a badly drawn supercar. Changing the subject
is allowed; shipping something that looks wrong is not. Say which route you
took.

---

# Part 3 — The design bar

**With the dev server up, for every screen of every showcase:**

```bash
node tools/preview/audit.js <slug>          # DOM audit: must print "no failures"
node tools/preview/shoot.js <slug> shot.png && python tools/preview/foot.py shot.png
```

`audit.js` exits 1 on any FAIL. **A screen is not done until it exits 0**, and
the handover quotes its output for each screen. "I looked at it and it seemed
fine" is what produced the batch this part is reacting to.

WARNs are judgment calls, not noise. Each one is either fixed or named in the
handover with the reason it stands. An unexamined WARN counts as a FAIL.

## R1 — The screen is full, all the way down and all the way through

No run of empty canvas over **48dp between blocks** (FAIL at 72dp), and no more
than **24dp of dead canvas at the foot**, measured from the safe area.

- `audit.js` reports `GAP` and `FOOT`. `foot.py` is the pixel authority for the
  foot; the DOM measurement is there to agree with it.
- `foot.py` measures from the bottom of the **safe area** — the screen edge less
  the 34dp the home indicator owns. Calibrated on finished screens a floating
  tab bar reads 38dp from the edge and a primary button 44dp, both correct
  because they are clearing the indicator, while a list that stopped early reads
  84dp. Against the edge those are indistinguishable; against the safe area they
  are 4, 10 and 50.
- **`FOOT` passing proves nothing about the middle.** One screen read 8dp dead
  at the foot — it ends on a pinned ask bar — while carrying 146dp of white in
  its centre. That is why `GAP` exists.
- A `ScrollView` carries `flexGrow: 1` and will happily eat every spare dp into
  one hole below the last block. Either the content fills it, or the block above
  grows, or there should not be a scroller there.
- A scrolling screen is measured at its **resting scroll position** — the first
  frame is the one that gets recorded.

**The fix is never padding and never a spacer.** Make the hero bigger, open the
rhythm out, let the list run under the edge, add the row the reference crops.
Scale up; do not spread out.

### R1b — Measure the foot with the *emulator's* insets, not the harness's

This is the rule the deleted batch broke, four screens of it at once: a dock or
a button row with a wide empty band under it, then the system bar.

- The harness fakes `59,0,34,0`, and **some sessions that reaches the app and
  some it does not**. A screen laid out against a bottom inset of 0 and then run
  with the emulator's real inset gains a band it was never measured with.
- **Never add `insets.bottom` to a surface that already stops above the system
  navigation strip.** When the app is not edge-to-edge the system already
  reserves that strip, and padding the dock by the inset counts it twice. A
  pinned dock is flush to the bottom of the app's own frame; the indicator's
  space is the system's, not the dock's.
- Pin the design's inset as a **FALLBACK**, never `Math.max` — a max silently
  takes whichever is larger and that is exactly the double-count.
- Shoot the foot at the real inset before calling a screen done. Over 24dp
  fails.

The one legitimate exception is a screen whose design ends on a floating bar or
sheet that deliberately clears the edge. Say so in the handover; everything else
is a defect.

### R1c — A hole inside a card is still a hole

`foot.py` measures from the bottom up and stops at the first thing that paints,
so a screen ending on a pinned bar reads 8dp and passes while carrying 146dp of
white across its centre. The probe measures a region's foot, not a hole mid-card.
Run both: the pixels for the foot, the DOM (`audit.js`) for everything else.

## R2 — Nothing is clipped and nothing leaves the frame

No painted element crosses x=0 or x=393 unless it sits inside a horizontal
scroller, and no text box sticks out of an ancestor that clips.

- `audit.js` reports `OFFSCREEN` and `CLIPPED`.
- A line of body copy losing its last word off the right edge, or a caption cut
  in half by the rounded box of the photo it sits on, is a defect at any zoom.
- A row that genuinely runs off the edge is a **horizontal ScrollView**, not a
  wrap and not an overflowing fixed row. If the reference shows an item clipped
  by the screen edge, the items sit in explicit rows inside a horizontal
  scroller — a wrap layout physically cannot reproduce it.
- A `Card` does not clip, so an overfull column paints over the next one.

## R3 — Nothing collides

A floating control, badge or rail may sit *inside* a surface, but it may not
straddle the edge of the content it covers.

- `audit.js` reports `COVERED` — it fires only when two boxes overlap
  *partially*, which is the shape an accident has. Wholly-inside is layering by
  design and is ignored.
- Covering **text** is a FAIL. Covering a bar, a photo or a shape is a WARN and
  needs a reason: a tool rail half on the last bar of its own chart is not one.
- The fix is to inset the content, not to move the control one dp.

## R4 — Every string is readable

Body text at **4.5:1** against its background; large or bold text (≥24dp, or
≥19dp bold) at **3:1**.

- `audit.js` reports `CONTRAST`, resolving the real background off the hit
  stack, and skips text over photography — judge that by eye.
- The muted grey from the reference is the usual offender: picked to look calm
  in a design shot, it lands at 3.2:1 on a white card. An inactive dock label at
  2:1 is not "muted", it is unreadable.
- **Fix the reference's mistake.** A design shot is not an authority on
  contrast.
- A dark theme needs **invert tokens**: a tile made of `--color-ink` goes
  invisible in dark. A token must clear every ground it lands on.

## R5 — Copy is labels, not prose

**Never write a sentence the design does not have.** The data file carries what
the screen says, and what it says is what the reference says, trimmed to fit.

- Hard ceilings: a chip or tab ≤ 2 words; a card title ≤ 40 characters; any
  single run of body copy ≤ 110 characters, and **one line wherever the design
  shows one line**.
- `audit.js` reports `COPY` over 110 characters.
- "Balanced meals fuel energy, steady focus and consistent progress — you are
  40% of the way there" is 94 characters of invented motivational filler under a
  progress bar that already says 40%. If a block looks short, R1 says make it
  *bigger*, not wordier.
- Microcopy that *does* earn its place: a unit, a count, a state.

## R6 — One screenful, not a scroll essay

The recorded frame is the first screen. Content runs past the frame only when
the design is a list or a sheet that genuinely continues, and then by a little.

- `audit.js` reports `SCROLL` as a multiple of the screen; over **1.6 screens**
  is a WARN that must be justified in the handover.
- Inventing sections below the fold — a full nutrition table under a dish sheet
  the reference ends after two rows — is the same padding reflex as R5 pointed
  downwards.

## R7 — Controls are at least 44dp

Every pressable is ≥44dp in both directions, or has hit slop that makes it so.

- `audit.js` reports `TAP` with the measured box. A 34dp icon button is a WARN
  by default because the reference drew it that way; the fix is `hitSlop`, and
  the handover says so.
- A text link's tap target is its **line height**. Pad the anchor and move any
  underline to an inner span.

## R8 — One thing is the biggest thing

Each screen has a single dominant element — a hero, a figure, a headline — and
everything else is visibly subordinate. Two blocks competing at the same weight
is the most common reason a build "looks like a toy" while every measurement
passes.

Not machine-checkable. Check it by looking at the shot at 100% and naming the
dominant element out loud in the handover. If naming it is hard, the screen does
not have one.

## R9 — The picture agrees with the numbers

A bar chart's tallest bar is its largest datum; a ring at 40% sweeps 40%; a
"+360%" headline is computed from the series under it, not typed next to it.
**Ticks bracket the data** — a nice-tick loop that stops at `max` leaves bars
taller than the axis. Scale the plot to the data and fit gridlines under it.

## R10 — The handover proves it

Every handover ends with, per screen:

```
<slug>  audit: no failures (N warnings: <one line each, fixed or why not>)
        foot: <n>dp dead  (at the emulator's inset)
        dominant element: <what it is>
        deviations from the reference: <list, with the reason>
```

A handover without those four lines is not a handover. This is the rule the
other nine depend on: the batch that caused this file was not built blind, it
was built unchecked.

---

# Part 4 — Verifying

## 4.1 Do not eyeball it. Measure.

Start the dev server **once** per session, then every check costs seconds:

```bash
npx expo start --web                                 # once, leave it up
node tools/preview/shoot.js <slug>/<screen> shot.png # ~7s
node tools/preview/rows.js shot.png                  # element tops/heights in dp
node tools/preview/audit.js <slug>                   # the design bar, from the DOM
node tools/preview/blank.js <slug> ...               # is the blank state really blank
node tools/preview/dockcheck.js <slug> ...           # bar height, and is its ink centred
python tools/preview/foot.py shot.png                # dp of dead canvas at the foot
```

Exporting to check a screen costs ~2.5 minutes; shooting the live dev server
costs ~7, for identical pixels. **Never run `expo export` while the dev server
is up** — they share the Metro cache. The Android bundle check happens once per
app, with the server stopped.

**Shoot twice.** The first capture after a server start or a new asset is
pre-hydration; read the second.

**Run showoff on port 8082.** 8081 is often another RN project. A stray second
server rewrites `router.d.ts` with bogus routes — kill it before trusting `tsc`.

## 4.2 What measuring catches, every time

- **The first pass always runs 12–15% oversized.** Compare text *widths* against
  the reference, not just positions — an over-large font shows up as a line 30dp
  too wide long before it looks wrong.
- **A row is as tall as its text line, not its visible content.** A hairline
  divider with a centred "or" is a ~21dp row, not 1dp. Gaps measured below such
  a row drift ~10dp each time, compounding down the screen.
- **Position drift accumulates.** Check an anchor near the top *and* near the
  bottom. If both match but the middle does not, the error is inside a block.
- **A row that runs off the screen edge is a scrolling row, not a wrap.**
- **Check what a group is aligned to before centring it.** A control group often
  lines up with something above it rather than with the screen — card finish
  swatches start under the centre of the card, not the centre of the phone.
- **`onLayout` can stay zero** in the harness. Size from
  `useWindowDimensions()` and clamp any measurement.

## 4.3 Docks are measured, not eyeballed

One dock height per batch, centred across the **painted** bar, pinned. Never
clamp a height upward. `dockcheck.js` reports it.

## 4.4 The web render is a proxy, not proof

It verifies layout, spacing and type. It cannot see native behaviour, and rule 6
says nothing launches the app — so these have to be designed out:

- **Never `Platform.select` a shadow.** Carry `shadow*` and `elevation` together
  in one style object; the keys the running platform does not read are inert,
  and a select is exactly what cannot be checked.
- **Safe-area insets** — web reports zero. Shoot with the harness's faked
  `59,0,34,0` and read every inset-anchored position off that. See R1b.
- **Emoji differ across Windows / Android / iOS** (flags are missing on
  Windows). Draw the glyph or take it from the icon set. Never ship an emoji as
  UI.
- **Anything overflowing its parent** — Android clips more aggressively. Do not
  rely on overflow, and never put `overflow: 'hidden'` and `elevation` on the
  same View.
- **Two font files that share an internal family name.** Web gives every
  `useFonts` key its own `@font-face`, so a collision is invisible there;
  Android resolves a font by the family name *inside the file*, so the second
  one loses and its glyphs come out as tofu. `tools/subset-symbols.py` rewrites
  name IDs 1/3/4/6/16 per showcase, so it is unique by construction. Anything
  else cut from a common source face needs the same treatment.
- **Material Symbols has no variable axes** here. Fetch the few FILL-1 and
  wght-700 glyphs as SVG paths; never cut a second icon font.

`npx expo export --platform android` catches bundling and asset problems `tsc
--noEmit` cannot — but it cannot run while the dev server is up, so it belongs
in the done-gate rather than after each screen. It is a bundle check, not a
launch: it compiles and writes `dist/`, and nothing installs or runs.
**Export the finished state, not the blank one** — exporting a blank tree
bundles nothing and still says `Exported`.

---

# Part 5 — The reveal

The video is the product. A reveal that opens on a full page, or spends its
first ten steps changing nothing, is a failed take whatever the screen looks
like at the end.

## 5.1 The floor is 20 steps, and 30 or 40 is better

Element-level means three levels, and staging only the top one produces 7–18
step reveals that land a whole rail at once:

1. the screen's own JSX blocks — the shell of each part appears
2. the component each block mounts, staged internally — the shell fills
3. the data array that component renders, one entry at a time — the row fills

`stage.js` counts them and **exits 1 under 20**, which is the gate. A screen
that cannot reach it is a rule-2 violation: extract its blocks into
`src/features/<slug>/components/`, never lower the floor.

## 5.2 Every step paints. Imports do not count.

**A step that changes no pixel is not a step.** Commenting an import out and
back changes nothing on screen — the component it names is not mounted yet,
because its JSX is still a comment. A reveal whose first five to ten steps are
import lines opens on ten seconds of nothing, and that is what the recording
shows.

So: **an import is never a step of its own.** It is uncommented in the same step
as the first JSX block that uses it. One step = one import + the block it feeds
= one visible change.

Measure it: shoot the frame after every step and diff it against the frame
before. **A step whose diff is zero pixels is a FAIL.** No exceptions — not for
an import, not for a type annotation, not for a data entry that renders nothing.

## 5.3 One element at a time, evenly spread

The page must not appear whole and then accrete details. That was `nudgehome`:
step 1 painted most of the screen and the remaining thirty steps added small
things to it. Thirty steps is not a reveal if the first one does the work of
twenty.

- **No step may reveal more than one visible element.** If uncommenting a block
  paints a header, a strip and three cards, that block is not a step — descend
  into it and stage its children, recursively, until every step adds one thing.
- Measure it: **no single step may change more than ~15% of the frame's
  pixels**, and the first step must not be the largest. The per-step diff from
  §5.2 gives both numbers from the same pass.
- The order is visual, top to bottom, outside in: the shell of a block, then its
  contents, then the rows inside those.
- *(The per-step diff probe does not exist yet. It is the next tool to build,
  and until it does both 5.2 and 5.3 are unenforced — which is exactly the state
  that produced the deleted batch.)*

## 5.4 No step may error

`verify` diffs the **end** of the replay and `rehearse` typechecks it. Neither
renders the intermediate states, so a reveal can typecheck perfectly and still
red-screen at step 14. It did, repeatedly.

**Every intermediate state must render, and that has to be checked by rendering
it** — shoot each step (the same pass as §5.2) and fail on an error overlay.

The crash shape that keeps recurring: **a value derived from a staged array,
when that array is still empty.**

```ts
const axisTop = Math.max(...values);        // -Infinity when values is []
const y = plotTop + plotH - (t / axisTop) * plotH;   // NaN
<Line y1={y} />                              // react-native-svg throws
```

So: **anything computed from an array a reveal fills in must survive that array
being empty.** `Math.max(...values, 1)`, a guard that returns `null` while the
series is empty, a divisor clamped to ≥1. Same for `.find`, `.findIndex`,
`[0]` and any `length - 1` index.

And: **any array a reveal fills in needs its optional fields declared.** Entries
are staged one at a time, so a type inferred from whichever rows happen to be
uncommented loses every property that only appears on a later row —
`days.findIndex(d => d.today)` stopped compiling because the only row carrying
`today` was commented out. Annotate the array.

## 5.5 Nothing paints in frame one except the page's own ground

Descending a container to stage its children leaves the container's own
`backgroundColor` live, so the take opens on an empty sheet, an empty card or a
stray chip. The fix is always the same and costs nothing — move the fill to an
absolutely-filled child, which then becomes a step of its own:

```tsx
<View style={{ height: sheetH, paddingHorizontal: MARGIN }}>
  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                 backgroundColor: ct.sheet, borderTopLeftRadius: radius.sheet }} />
  ...
</View>
```

Carry the shadow and `elevation` onto that child too: left behind, an emptied
card still paints its own padding as a strip with a shadow under it.

A full-bleed `<svg>` *is* the ground — several designs paint their background as
a gradient — and an `<svg>` whose shapes are all staged out paints nothing. Both
are allowed.

**Measure it, do not look at it.** `node tools/preview/blank.js <slug>` probes
the DOM and reports any visible text, photograph, drawn mark or painted box that
is not full-bleed. A clean blank state has none. Counting colours alone is the
wrong measure — a card shell's rounded corners put a few hundred antialiased
colours in the frame on their own.

## 5.6 Blank files are generated, never hand-written

A screen that obeys rule 2 is already a complete description of its own reveal.

```bash
node tools/timelapse/stage.js <slug> --dry   # the plan: imports, blocks, labels
node tools/timelapse/stage.js <slug>         # write blank/ + finished/ + manifest
node tools/timelapse/gen.js <slug>           # markers -> steps.json
```

**Never hand-write `steps.json`** — put markers in the blank files and run
`gen.js`. The blank file is then the only source of truth: a step exists because
a marker exists, and its needle is read off the very line it will act on.

**Never run `stage.js` on a file that is already blank.** `lock` and `rehearse`
both leave the tree blank, so the route on disk after a gate run is the staged
one. Staging that produces a blank file whose "blocks" are the previous pass's
JSX comments. It writes cleanly and is completely wrong. `apply.js <slug> final`
first.

Four things `stage.js` gets right that are easy to get wrong by hand:

- It finds blocks by **indentation**, not by counting brackets. One mis-signed
  term in a bracket counter chopped a single child into twenty, silently.
- It stages the screen's own `return (`, not the first one in the file. Several
  screens define a local `Glyph` above the default export.
- It only stages an import whose **every** use is inside a staged block. A local
  helper above the export using the `T` primitive left live code referring to a
  name that no longer existed. `verify` cannot see that; `rehearse` can.
- **A block has to close itself.** The last child of a descended region came back
  one line short, leaving the `</T>` outside the staged comment — so the blank
  file held `{/* ... <T> ... */} </T>` and stopped parsing. `wrapBlock` counts
  opens against closes and pulls the end forward until the region balances.

What it does not do: stage the inside of a composite component. That is still
authored per component — and per §5.3 it is not optional.

## 5.7 Staged mistakes

Mistakes are staged **inside the block they belong to**, so they appear as that
part of the screen is revealed rather than breaking the app from step one. Two
shapes, and the choice between them is forced:

- `// MISTAKE n.nn` above a wrong line, anywhere JS comments are legal.
- `{/* STEP n.nn ... | FIX m.mm ... */}` for a mistake made of JSX. A JSX comment
  **cannot** be nested inside the `{/* */}` block staging it: the inner `*/`
  closes the outer one and the blank file stops parsing. So it is staged as its
  own block, revealed by one step and cut by the next.

- **A `// MISTAKE` line must be additive.** A second copy of a key the finished
  style already sets is TS1117. Check the object first — `opacity` and
  `paddingVertical` are the two that have collided.
- **A `cutel` needle must be text that appears only in the staged duplicate.**
  `cutel` and `cutfirst` take the *first* match in the file, so an identical line
  above steals the cut — and reusing the real element's text makes the fix delete
  the real one and leave the duplicate.
- Any `*/` inside a staged block kills it, including a plain JS block comment.

## 5.8 Final-only showcases

A showcase built from a **video** has no blank state and no reveal:

```bash
node tools/timelapse/snapshot.js <slug>          # capture the tree as finished
node tools/timelapse/snapshot.js <slug> --check  # report drift, write nothing
```

`final`, `blank` and `lock` then work on it; `verify`, `rehearse` and the
per-screen reveal say it is final-only rather than failing on a missing file.
`preflight` still checks drift and leaves it in **final** state, the resting
state for this kind. Re-run `snapshot.js` after changing any of its files, or
`final` will restore the older copy over your work.

## 5.9 Writing the step helpers

Every one of these was a real corruption:

- **Uncomment one entry, identified by key** — never a line range that walks
  until it stops seeing `//`. That walk eats the structural `[` and `],` around
  the entry and destroys the array.
- **Single-line and multi-line entries need separate handling.** A helper that
  strips the comment from one line leaves a multi-line object half-commented.
- **Match a block marker only where it follows `{/*` directly.** Matching it
  anywhere also matches the explanatory note that mentions the same step number.
- **Match an import only on lines that are actually imports.**
- **Finish each screen by copying the finished files over every file it
  touched**, not just the screen. Staged components keep their STEP banners
  otherwise.
- **Nothing can be staged inside a ternary branch.** `{flag ? (<Thing />) : null}`
  with the element wrapped leaves the branch as a JSX comment, which is not an
  expression and does not parse. Stage a sibling, or let it render from the
  start.
- **Stage the whole `{list.map(...)}`, never the element it returns.** Wrapping
  the returned element leaves a callback whose body is a comment — `{}` rather
  than a `ReactNode`. `verify` will not catch it; `rehearse` will.
- **Step numbers are `<screen>.<two digits>`.** `gen.js` parses the part after
  the dot as an integer, so a "1.085" squeezed between 1.08 and 1.09 becomes
  step 85 and runs after everything else.
- **Never anchor on prose.** A component's doc comment quotes the code it
  explains, so an anchor like `pointerEvents="none"` matched the sentence
  describing it. `stagelib.is_code` drops comment lines before anything else
  looks at them.
- **A mistake needle must be unique file-wide.**

## 5.10 Prove the sequence, then run it

**Never drive a reveal step by step against a live recording.**

```bash
python tools/timelapse/run.py <slug> verify      # replay, then diff every staged file
python tools/timelapse/run.py <slug> rehearse    # preflight + replay + typecheck, per screen
python tools/timelapse/run.py <slug> lock        # record the baseline
python tools/timelapse/run.py <slug> <screen> --delay 1.5   # perform it
```

One command per screen, not one per step — driving a reveal a tool call at a
time is what made the first attempt crawl. Inspecting after each step is the
only reason a reveal crawls, and the only reason to inspect is not trusting the
tooling. Prove it once instead.

- **`verify` only covers staged files**, and it ends with the tidy-up copy — so
  it proves the ops *apply*, not that the reveal is *right*. Run `tsc --noEmit`
  after each screen too.
- **Reset before each screen.** Files drift when they are open in an editor
  during a run. `run.py` does this automatically via preflight.
- **`preflight` before every recording.** It diffs every tracked file against
  `lock.json`, refuses to start on drift, force-resets the staged files to blank,
  and typechecks. Run `lock` once an app is finished.
- **Preflight blanks the navigation too** — later screens need `--no-preflight`.
- **A new font in a shared file drifts every other showcase.** Re-lock each one
  with its own boot redirect.
- **A showcase ends on preflight.** Staging is part of finishing the screen, not
  a follow-up.

---

# Part 6 — Layout, theming and assets

## 6.1 Folders

```
src/app/                    expo-router routes only (no helper files — they become routes)
src/app/_layout.tsx         Stack, fonts, safe-area, status bar
src/app/<slug>/             one route per screen in the showcase
src/components/ui/          cross-showcase primitives (Screen, Text, ...)
src/features/<slug>/        components for one app design
src/features/<slug>/theme.ts    that brand's colour tokens
src/features/<slug>/data/   screen content, so components stay presentational
src/theme/                  font registration
tools/showcase.js           new | use | list | rm | wipe
tools/preview/              render + measure harness
tools/timelapse/            per-showcase blank/final switch for filming
src/global.css              theme tokens as CSS variables
tailwind.config.js          token -> utility mapping
```

Put nothing but routes in `src/app/` — every file there becomes a route.

**Screens decide navigation, components never do.** A card takes `onPress`, a
list takes `onSelect(item)`, and the screen wires where taps go — so adding a
destination is one line in the screen, not a change to the component.

Wire the flow the way the real app flows: a splash that advances itself, a
button that goes to the next screen, a close control that goes back. The
recording should never need faked navigation.

## 6.2 Theming

Shared primitives use semantic utilities — `bg-bg`, `bg-surface`, `text-fg`,
`text-muted`, `border-border`, `bg-accent`, `text-accent-fg` — resolving to CSS
variables in `src/global.css`. A showcase re-themes by overriding those
variables, not by editing components.

Brand-specific values that aren't semantic (a promo red, a membership teal) go
in `src/features/<slug>/theme.ts`, measured off the reference or lifted from the
brand's own SVG. **Never scatter hex codes through components.**

**Fonts are registered per weight**, because React Native resolves a face by
family name and not by numeric weight: `font-sans`, `font-sans-medium`,
`font-sans-semibold`, `font-sans-bold`. Never Tailwind's `font-medium` — that is
a weight utility and collides with a family of the same name.

Most app designs use a proprietary typeface that cannot be obtained. Pick the
closest free substitute, say so in the handover, and expect it to be wider: at
matched cap height a substitute often runs 10–15% wider. You cannot match both
width and height — choose per element and state the choice. Choose the family by
ratio, the weight by stem/cap, then solve size and tracking together.

**Centred tracking**: cancel trailing `letterSpacing` with `paddingRight` for
negative tracking, `paddingLeft` for positive.

## 6.3 Sourcing assets

- **Small glyphs are traced, not hand-authored.**
  `tools/preview/trace.py <img> x0 y0 x1 y1 <thr> [viewBox]` supersamples a
  region, walks each blob's boundary, finds the pockets that are holes,
  simplifies and prints SVG subpaths in an ink-box viewBox. Fill the result with
  `fillRule="evenodd"` so a ring keeps its counter.
- **Logos** come from Wikimedia Commons as SVG. If the paths are flat, inline
  them into a component and crop with `viewBox`. If the SVG uses nested
  transform groups, rasterise it through headless Chrome rather than hand-inlining.
- **Photography** is free-licensed stock standing in for the brand's own, which
  is not redistributable. Credit every file in a `CREDITS.md` beside the images.
- **Cutouts**: measure the border-pixel mean and standard deviation first. Low
  deviation means a seamless backdrop that will cut cleanly. Remove the
  background with a flood fill from the edge plus an alpha ramp, so edges stay
  soft and shadows fade instead of leaving a grey halo. `tools/bake/cutout.py`:
  `--tol` is the colour distance the fill may cross, `--close N` seals gaps a
  dark shadow leaks through, `--crop-bottom` drops the studio floor, `--gray`
  desaturates. **Judge the tolerance by looking at the result on the page's own
  colour**, not by the border statistics.
- **A product shot with no cut-out: duotone the whole frame.** Map the frame's
  own luminance range onto a two-colour ramp (`tools/bake/treats.py`, `eco.py`)
  and the backdrop becomes the card's tint while the object keeps its folds.
  Stretch the range by percentile first.
- **Composite when the subject and its setting cannot be had together.** A
  studio portrait on a white sweep and a sky are both everywhere; a person
  against an open sky is scarce. Check the result for what the fill kept.
- **Check every baked frame at 1:1 for other brands' marks** — jackets, labels,
  signage. A contact sheet cannot show a 40px logo.
- **Bundle assets locally, never hotlink.** Recording must not depend on the
  network.

---

# Part 7 — Traps that have actually bitten

## React Native / Expo

- **`Pressable` function styles are dropped in static render.**
  `style={({pressed}) => …}` silently loses height and fill. Put the visual box
  on an inner `View`.
- **`overflow: 'hidden'` + `elevation` on the same View is unreliable on
  Android.** Split them, or drop the clip.
- **Import Google Fonts by subpath.** The package barrel eagerly requires every
  weight — 18 faces, ~6MB, for one family. Use `<pkg>/400Regular`.
- **Never gate first paint on font loading without a timeout.** A stalled font
  request over a LAN dev server never rejects and the app hangs on the splash
  forever. Paint after ~3s regardless; `useFonts` re-renders when faces land.
- **Empty arrays lose their inferred type.** Anything that may be commented out
  for filming needs an explicit annotation or `tsc` fails with implicit `any[]`.
- **expo-router evaluates every route file at startup**, so a broken import in
  any screen breaks the whole app — and red-screens every other showcase too.
- **JSX attribute strings do not process escapes.** `scope="Personal · All"`
  renders the escape literally. Pass an expression: `scope={'Personal · All'}`.
- **React Native rotates about an element's centre**, whatever `transformOrigin`
  says. Give rotated text a strip the full length of the axis and rotate that
  about its centre; after a quarter turn, leading padding moves the label along
  and `textAlign` pins it to the far end.
- **An `Image` needs a numeric size.** Absolute insets alone make it paint
  nothing, silently. And a percentage height inside a stretch-sized row inflates
  the row — absolute-fill instead.
- **A `role="button"` Pressable inside another** is torn apart by the static web
  build's HTML parser.
- **`svg` paints below positioned siblings on web** — an absolute sibling hides
  an `<svg>`, while a `Text` beside it survives, so the icon just looks missing.
- **SVG gradient ids are document-global on web.** Use `useId`, or everything
  renders in the first colour.
- **`<G origin=...>` emits an invalid DOM prop and red-bars the screen.** Build
  the arc rotated instead.
- **`expo-linear-gradient` flips a diagonal on web.** Draw directional light in
  `react-native-svg` user space.
- **`Easing.quart` does not exist** — the quartic is `Easing.poly(4)`, and the
  typo throws at the first frame, blaming the wrong file.
- **The harness's capture disturbs animations.** `captureBeyondViewport`
  restarts entrances and can drop a view; probe the DOM before believing a shot.
- **A pan over a `Pressable` fires both on web.** Disarm the press from the
  pan's `onStart`.

## Windows / tooling

- **Write files with `newline=''`** in Python. Text mode rewrites everything as
  CRLF, which makes every line look changed.
- **Do not author a script through a shell heredoc if it contains `\n` or `\s`.**
  The backslashes arrive mangled and the file is silently broken. A `\b` becomes
  a literal 0x08 byte in the regex; `od -c` is the only thing that shows it.
  Use the editor tool.
- **Do not write a long file through a shell heredoc** at all. Past a few
  hundred lines the command is truncated mid-heredoc.
- **Keep script logging ASCII.** The Windows console cannot encode `✓`/`✗` and
  the whole command dies on the print, *after* the edit has been made.
- **Run prettier at each component boundary** rather than hand-chasing
  whitespace diffs. Prettier's Tailwind plugin eats spaces in class templates —
  build conditional classes with an array, not an interpolation.
- **After changing dependencies or `app.json`, restart with `npx expo start -c`.**
- **Scaffold a new showcase with the dev server stopped.** `showcase.js new`
  while it is running makes expo-router's type generator scoop
  `src/features/<slug>/**` up as routes and `tsc` then rejects the boot
  redirect. `rm -rf .expo/types` and restart the server fixes it.
- **Back up before rewriting a file wholesale** — copy it, per rule 5.
- **Strip template cruft early.** A new showcase should not carry demo screens,
  unused template packages, or experiments nobody asked for.
- **Copying a component from a finished showcase gets its BLANK version.** Take
  it from `tools/timelapse/showcases/<slug>/finished/`.
- **`npm --prefix` from the repo root adds a self-dependency**, linking the Expo
  tree into the sub-project.
- **Check the port is actually free** before an export — stopping the dev server
  task is not the same as the process exiting.

---

# Part 8 — Lifecycle and the done-gate

## 8.1 Lifecycle

```bash
node tools/showcase.js new <slug>        # scaffold routes, features, assets, staging
node tools/showcase.js use <slug>        # repoint the boot redirect for recording
node tools/showcase.js list              # what exists, and which one boots
node tools/showcase.js rm <slug> --yes   # delete one showcase
node tools/showcase.js wipe --yes        # delete every showcase (weekly reset)
```

**A take is four commands, so there is one that runs all four:**

```bash
node tools/record.js <slug>                  # use -> preflight -> expo start -> ask -> reveal
node tools/record.js <slug> --no-reveal      # server only, no prompt
node tools/record.js <slug> --no-start       # stop after preflight
node tools/record.js <slug> --screen 2 --delay 2
node tools/record.js <slug> --port 8082 -c   # extra args pass through to expo start
```

The reveal runs **while** the server is up, not after it: every step is a file
write Fast Refresh has to redraw. The server is spawned as a child and left
running. The cost is that `expo start` gets no stdin, so its interactive keys
(`r`, `j`, `m`) are off — a take does not use them. `--no-reveal` gives the
server back in the foreground.

`record.js` re-points the boot redirect again just before the reveal, because
minutes pass between step 1 and step 4 and `src/app/index.tsx` is a derived file
an editor will happily write back from a stale tab. Step 1 before step 2 matters
for the other direction too: `lock` hashes `src/app/index.tsx`, so preflight run
*before* `use` reports `DRIFT` on every showcase that is not the one booting.

**One screen per showcase.** A second screen of the same design is a second
showcase with its own slug, not a second route under the first one — so a
recording is never a take that has to perform screen 1 before it can reach
screen 2, and never a preflight that blanks the screen the device is standing
on. The cost is duplication: two showcases of one design each carry their own
`theme.ts`, `layout.ts`, `use-insets.ts` and `text.tsx`. That is deliberate —
`lock` and `preflight` track `src/app/<slug>`, `src/features/<slug>` and
`assets/images/<slug>`, so two showcases sharing a feature folder would each
report the other's blanked files as DRIFT. A screen that *navigates* into
another showcase is fine: a route push is not a staging dependency.

Showcases coexist until the wipe. expo-router evaluates every route file at
startup, so a broken file in one app red-screens all of them — and imagery
accumulates in the bundle, so keep each app's assets tight.

## 8.2 The done-gate

An app is not finished until all of these pass, with the dev server stopped:

1. `npx tsc --noEmit` clean across **all** of `src/` — not just staged files.
2. `npx expo export --platform android` succeeds, **from the finished state**.
3. `run.py <slug> verify` — every staged file byte-identical to finished.
4. `run.py <slug> rehearse` — preflight, replay, typecheck and diff, **per
   screen**, which is the exact path a take walks.
5. `node tools/preview/blank.js <slug> ...` over every screen in **blank** state,
   exit 0. It is the first frame of every recording and nothing else checks it.
   Shoot the blank state too, for the record.
5b. `python tools/preview/foot.py` over the **finished** shot of every screen,
   no screen over 24dp of dead canvas at the foot, **at the emulator's inset**.
5c. `node tools/preview/audit.js <slug>` for every screen, exit 0, with every
   warning either fixed or answered in the handover.
5d. **The per-step check (§5.2–5.4): no zero-diff step, no step over ~15% of the
   frame, no step that errors.** The probe for this does not exist yet; building
   it is the first task of the next batch.
6. `run.py <slug> lock` — record the baseline preflight will check against. Then
   break one unstaged file on purpose and confirm preflight reports `DRIFT` and
   exits 1.
7. Leave it in blank state.

## 8.3 Commands

```
npm start            # dev server (for the preview harness; leave it up while building)
npm run typecheck    # tsc --noEmit
npm run lint
npx expo export --platform android   # full bundle check (dev server must be stopped)
npm run record -- <slug>
```

`npm run android` is deliberately not in this list. Nothing here launches the
app.

## 8.4 Stack

Expo 57 · React Native 0.86 · React 19.2 · expo-router 57 · NativeWind 4.2 ·
Tailwind 3.4 · Reanimated 4.5 · TypeScript 6
