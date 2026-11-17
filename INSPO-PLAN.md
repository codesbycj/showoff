# INSPO-PLAN — the nine rules, and where each one already lived

Companion to [INSPO-RULES.md](INSPO-RULES.md). That file is the **terse
authority** — the rule, the measurement, the command. This file is the
**evidence**: for each of the nine, what the earlier rulebooks already said,
quoted with its section, and what the new rule adds on top.

Read this once to understand *why* each rule is phrased the way it is. Read
`INSPO-RULES.md` when you are building.

Sources quoted throughout:

- **`RULES.md`** — the current apps rulebook (Parts 0–8).
- **`AGENTS.md`** + **`APP-DESIGN-RULES.md`** — the previous pair, now deleted
  and folded into `RULES.md`. Quoted where the wording was sharper.

---

## I1 — The image is inspiration, but it must still look like that app

### Where it already lived

`RULES.md` §2.2, *A design shot is an inspo brief, and rule 1 is off*:

> A Dribbble/Behance-style presentation — two or three phones posed on a
> coloured board, drop shadows, a 3D render dropped in, sometimes tilted — is a
> *picture of an idea*, not a spec.
>
> **Match the spirit, not the pixels.** Take the palette, the type hierarchy,
> the shapes, the order of the blocks and the feel. Do not reconstruct a px/dp
> scale off a posed phone, do not measure glyph widths against it, and do not
> write a `layout.ts` full of numbers divided by 0.88.

And on correcting it — same section:

> **Fix the reference's mistakes.** Typos, a stray "01 / 03" that counts wrong,
> a label that does not match its icon, contrast too low to read, a tap target
> under 44dp: correct it silently and say so in the handover. The design shot is
> not an authority.

> **Improve it where it is obviously better.** […] Changes that make it a better
> *app* are wanted; **changes that restyle it into a different design are not.**

`RULES.md` R8 is where "looks like a toy" is named:

> Two blocks competing at the same weight is the most common reason a build
> "looks like a toy" while every measurement passes.

### What I1 adds

The old wording — *"match the spirit, not the pixels"* — reads as permission to
drift, and that is how it got used. **I1 keeps "not the pixels" and removes "not
the spirit":** palette, copy, type hierarchy and block order are the design and
must be reproduced. Only the *geometry* is rebuilt at phone size.

The test added: if a stranger puts the build next to the board, they say *"that's
the same app"*, not *"that's inspired by it"*.

### Measured by

The handover's R10 block, which `RULES.md` makes non-negotiable:

> A handover without those four lines is not a handover. This is the rule the
> other nine depend on: the batch that caused this file was not built blind, it
> was built **unchecked**.

---

## I2 — It is a real app for a real phone

### Where it already lived

`RULES.md` §2.2:

> **Build it at the real size instead.** Type and spacing right for a 393dp
> phone — display headline ~34–40dp, body ~15–16dp, primary button ~56dp tall,
> page margin 20–24dp — laid out in flex off `useWindowDimensions()` so it holds
> at other widths. **If the reference's proportions and a phone's ergonomics
> disagree, the phone wins.**

`RULES.md` Step 4, on `layout.ts`:

> every size derived from `useWindowDimensions()`. **Fixed offsets taken off one
> phone are the failure mode.**

`RULES.md` R7:

> Every pressable is ≥44dp in both directions, or has hit slop that makes it so.
> […] A text link's tap target is its **line height**.

And §4.2, a trap that defeats measuring your way there:

> **`onLayout` can stay zero** in the harness. Size from `useWindowDimensions()`
> and clamp any measurement.

### What I2 adds

Nothing new in substance — it promotes an existing clause to a numbered rule so
it is checked rather than assumed. The phrase that matters is **"the phone
wins"**, and it is now the rule rather than a bullet inside another rule.

### Measured by

`node tools/preview/audit.js <slug>` — `TAP` reports any control under 44dp.
Exit 0 required.

---

## I3 — Nothing empty at the bottom. Ever.

This is the most-cited rule in the entire history of the repo.

### Where it already lived

`RULES.md` **§0.1**, first row of the table of five that got a batch deleted:

> **No empty band at the bottom of the screen.** Not 84dp, not 60dp, not 40dp.

`RULES.md` R1:

> **The fix is never padding and never a spacer.** Make the hero bigger, open
> the rhythm out, let the list run under the edge, add the row the reference
> crops. **Scale up; do not spread out.**

`RULES.md` R1b, *Measure the foot with the emulator's insets, not the
harness's* — the rule the deleted batch broke four screens at once:

> **Never add `insets.bottom` to a surface that already stops above the system
> navigation strip.** When the app is not edge-to-edge the system already
> reserves that strip, and padding the dock by the inset counts it twice. […]
> Pin the design's inset as a **FALLBACK**, never `Math.max` — a max silently
> takes whichever is larger and that is exactly the double-count.

`RULES.md` R1c, on why a passing foot proves nothing:

> One screen read 8dp dead at the foot — it ends on a pinned ask bar — while
> carrying 146dp of white in its centre. That is why `GAP` exists.

`AGENTS.md`, *Dead space at the foot*, on why it is invisible while building:

> It looks unfinished however good the blocks above it are, and **it is
> invisible while building because the simulator window is taller than the
> phone.** […] calibrated on finished screens, a floating tab bar reads 38dp
> from the edge and a primary button 44dp, and both are correct because they are
> clearing the indicator, while the product list that actually stopped early
> reads 84dp.

And §2.2, which already licensed the fix:

> **The screen has to fill the screen.** Every phone in a design shot is full to
> its bottom edge. A build that stops at 78% and leaves a band of empty canvas
> under the last block looks unfinished […] Scale up rather than pad.

### What I3 adds

The old target was *tolerance* — "≤24dp passes". **I3 makes the target zero**
and names the fix explicitly as *inventing content*, which an inspo brief
licenses and a screenshot brief does not. "Add the row the reference crops" was
already there; I3 makes it the first resort rather than the last.

### Measured by

```bash
node tools/preview/shoot.js <slug> shot.png && python tools/preview/foot.py shot.png
node tools/preview/audit.js <slug>        # GAP — the hole foot.py cannot see
```

`foot.py` measures from the **safe area**, not the screen edge. Over 24dp fails;
`GAP` fails over 72dp between blocks.

---

## I4 — Images are images

### Where it already lived

`RULES.md` §2.5, *What is in drawing range* — the test:

> **The test is what the real app ships.** Every app draws its *interface* as
> vectors and ships its *pictures* as bitmaps. Match that split.

The two cases that keep being got wrong, same section:

> **A category tile is a picture, not an icon.** A row of round tiles reading
> Burgers / Mexican / Indian under a delivery app's search bar is six
> photographs, and drawing a burger, a taco and a bowl of curry in SVG produces
> a row of cartoons where the design had food. Small on screen does not mean
> small as a subject. **This shipped once and it is the thing that most makes a
> screen read as a toy.**

> **A map is not in drawing range either.** A map has no idea to interpret, so
> vectoring it is tracing the reference path by path — copying with extra steps,
> at twenty times the cost of either honest route.

> **Faces are photographs.** […] Initials on a coloured disc is a fallback
> state, not a substitute: a screen built from it is visibly missing something
> the reference had.

The general test:

> **If drawing it means reproducing a specific arrangement rather than
> expressing an idea, it is out of range.** A chevron is an idea. A burger is a
> photograph of a burger. A map is a picture of a place.

And the escape hatch, so "out of range" never means "draw it badly":

> When the subject is out of drawing range, do not fall back to drawing it
> anyway. […] **a different subject that keeps the app's plot** — a rental app
> can lead on a key, a road, a badge or an interior rather than on a badly drawn
> supercar.

`RULES.md` Step 5 fixes the ordering:

> Asset decisions change layout, so they come **before** the components that
> hold them — never after.

### What I4 adds

Nothing in substance — it restates §2.5 as a numbered rule because it is the one
most likely to be rationalised away mid-build ("this tile is only 56dp, I'll just
draw it"). The 56dp tile is the exact case §2.5 calls out.

### Measured by

Eyes on the shot at 1:1, plus a complete `CREDITS.md` per showcase. Also, from
`RULES.md` §6.3:

> **Check every baked frame at 1:1 for other brands' marks** — jackets, labels,
> signage. **A contact sheet cannot show a 40px logo.**

---

## I5 — At least 20 steps in the recording

### Where it already lived

`RULES.md` **§0.5**: *"20 steps minimum, 30–40 better."* — measured by
`stage.js` exiting 1 under 20.

`RULES.md` §5.1, on why the floor exists:

> Element-level means three levels, and staging only the top one produces 7–18
> step reveals that land a whole rail at once:
>
> 1. the screen's own JSX blocks — the shell of each part appears
> 2. the component each block mounts, staged internally — the shell fills
> 3. the data array that component renders, one entry at a time — the row fills

And the part that must not be negotiated:

> A screen that cannot reach it is a rule-2 violation: **extract its blocks into
> `src/features/<slug>/components/`, never lower the floor.**

`AGENTS.md` recorded the count that produced the rule:

> Six screens in batch 3 failed this way and every one of them was a rule-2
> violation that nothing had caught before.

### What I5 adds

Nothing. It is quoted verbatim into the inspo rulebook so the floor travels with
the brief rather than living only in the staging chapter.

### Measured by

`node tools/timelapse/stage.js <slug>` — exits 1 under 20.

---

## I6 — You see the screens before anything is locked

**This is the only rule of the nine with no ancestor.** The earlier books gated
on *tools*; none gated on *you looking*.

### What the earlier books had instead

`RULES.md` Step 7 gets closest, but stops short:

> **Do not move to staging until this passes.** A screen restaged after a layout
> change is a staging pass thrown away.

That gates staging on `audit.js`, not on a human. And `APP-DESIGN-RULES.md` named
the failure mode without creating a gate for it:

> `audit.js` exits 1 on any FAIL. **A screen is not done until it exits 0**, and
> the handover quotes its output for each screen. **"I looked at it and it seemed
> fine" is what produced the batch this file is reacting to.**

That line is about *me* eyeballing instead of measuring. I6 is the opposite
direction: measurements all passing is still not sign-off, because every check in
the repo is a check on *correctness*, and none is a check on whether the screen
is the one you wanted.

### Why it is needed

Both deleted batches were built, staged, locked and looked at **last**:

> **What is not done: the timelapse staging.** […] That is deliberate: the last
> batch was rejected on its designs, so the designs should be signed off before
> 29 screens are staged for filming. — `HANDOVER-batch3.md`

The batch said the right thing and then 29 screens were built anyway before
anyone looked. I6 turns that sentence into a gate.

### What I6 adds

A new **step 8** between the design bar and staging:

```bash
npx expo start --web --port 8082          # once, leave it up
node tools/preview/shoot.js <slug> shot.png
```

Present each screen with its `audit.js` and `foot.py` numbers, and wait.
**Silence is not sign-off.**

Port 8082 specifically, from `RULES.md` Step 0:

> showoff runs on **8082**; 8081 is usually another project. […] A second server
> rewrites `router.d.ts` with bogus routes and `tsc` then lies to you.

---

## I7 — Nothing breaks, at any step

### Where it already lived

`RULES.md` **§0.4**: *"No step may error. Every intermediate state renders — not
just the last one."*

§5.4 explains why the existing checks miss it:

> `verify` diffs the **end** of the replay and `rehearse` typechecks it. Neither
> renders the intermediate states, so a reveal can typecheck perfectly and still
> red-screen at step 14. **It did, repeatedly.**

And names the recurring crash:

> The crash shape that keeps recurring: **a value derived from a staged array,
> when that array is still empty.**
>
> ```ts
> const axisTop = Math.max(...values);        // -Infinity when values is []
> const y = plotTop + plotH - (t / axisTop) * plotH;   // NaN
> <Line y1={y} />                              // react-native-svg throws
> ```

With the fix stated as a build-time obligation, not a debugging step —
`RULES.md` Step 6:

> **Every value derived from a data array is guarded for the empty case** —
> `Math.max(...vals, 1)`, a divisor clamped to ≥1, a guard that returns `null`
> while the series is empty. **The reveal *will* empty that array.**

Plus the typing half, §5.4:

> **any array a reveal fills in needs its optional fields declared.** […]
> `days.findIndex(d => d.today)` stopped compiling because the only row carrying
> `today` was commented out.

### What I7 adds

The measurement. `RULES.md` §8.2 admitted the gap outright:

> 5d. **The per-step check (§5.2–5.4): no zero-diff step, no step over ~15% of
> the frame, no step that errors.** The probe for this does not exist yet;
> **building it is the first task of the next batch.**

That probe now exists — built before any screen of this batch, as instructed:

- `tools/timelapse/stepapply.py` — applies one step, over the same `steps.json`
  a take uses
- `tools/preview/stepshots.js` — one Chrome per screen, a frame per step, at the
  same 393×852@3x and faked insets as `shot.js`
- `tools/preview/stepdiff.py` — FAILs zero-diff, over-15%, and any step that
  errors

---

## I8 — Never open the emulator; the web render must look like a phone

### Where it already lived

`RULES.md` rule 6:

> **Never launch the app.** Nothing in this workflow starts an emulator or a
> device. The web render plus the Android export is the whole verification
> budget — so native failures have to be *designed out*, not caught by running
> it.

§4.4, *The web render is a proxy, not proof*, lists what must therefore be right
by construction:

> **Never `Platform.select` a shadow.** Carry `shadow*` and `elevation` together
> in one style object; the keys the running platform does not read are inert,
> and **a select is exactly what cannot be checked**.

> **Emoji differ across Windows / Android / iOS** (flags are missing on
> Windows). Draw the glyph or take it from the icon set.

> **Two font files that share an internal family name.** Web gives every
> `useFonts` key its own `@font-face`, so a collision is invisible there;
> Android resolves a font by the family name *inside the file*, so the second
> one loses and its glyphs come out as tofu.

> **Safe-area insets** — web reports zero. Shoot with the harness's faked
> `59,0,34,0` and read every inset-anchored position off that.

And the gotcha that makes the Android export worth running at all:

> **Export the finished state, not the blank one** — exporting a blank tree
> bundles nothing and still says `Exported`.

### What I8 adds

The second half of your sentence: *"and make it look just as good a mobile."*
The earlier rule said only "don't launch it". I8 adds that the web render is the
**deliverable surface** for review — so it is shot at phone metrics with phone
insets and judged as a phone, not as a browser window.

### Measured by

`shoot.js` at 393×852@3x with `SHOOT_INSETS=59,0,34,0`, `audit.js`, and
`npx expo export --platform android` in the done-gate with the dev server
stopped.

---

## I9 — Every recorded step is a visible change on screen

### Where it already lived

`RULES.md` **§0.2**: *"Every reveal step changes something on screen. An import
that paints nothing is not a step."*
**§0.3**: *"One element per step. The page never appears whole and then accretes
details."*

§5.2 spells out the import case:

> **A step that changes no pixel is not a step.** Commenting an import out and
> back changes nothing on screen — the component it names is not mounted yet,
> because its JSX is still a comment. A reveal whose first five to ten steps are
> import lines **opens on ten seconds of nothing, and that is what the recording
> shows.**
>
> So: **an import is never a step of its own.** It is uncommented in the same
> step as the first JSX block that uses it. One step = one import + the block it
> feeds = one visible change.

§5.3 spells out the size case, with the screen that caused it:

> That was `nudgehome`: step 1 painted most of the screen and the remaining
> thirty steps added small things to it. **Thirty steps is not a reveal if the
> first one does the work of twenty.**
>
> - **No step may reveal more than one visible element.**
> - **no single step may change more than ~15% of the frame's pixels**, and the
>   first step must not be the largest.

§5.5 covers frame one:

> Descending a container to stage its children leaves the container's own
> `backgroundColor` live, so the take opens on an empty sheet, an empty card or a
> stray chip. The fix is always the same and costs nothing — move the fill to an
> absolutely-filled child […] Carry the shadow and `elevation` onto that child
> too: left behind, an emptied card still paints its own padding as a strip with
> a shadow under it.

Note the parenthesis `RULES.md` §5.3 carried:

> *(The per-step diff probe does not exist yet. It is the next tool to build,
> and until it does both 5.2 and 5.3 are unenforced — **which is exactly the
> state that produced the deleted batch**.)*

### What I9 adds

Enforcement, same as I7 — the probe described under I7 is what makes 0.2 and 0.3
checkable rather than aspirational.

### Measured by

```bash
node tools/preview/stepshots.js <slug> <screen> .probe/<slug>
python tools/preview/stepdiff.py .probe/<slug>
node tools/preview/blank.js <slug>        # exit 0 — nothing but the ground
```

---

# The run, in order

| # | Do | Gate | Rule |
|---|---|---|---|
| 0 | Confirm series, kill stray `:808x` servers, no git | `netstat` clean | — |
| 1 | Classify the reference — design shot → rule 1 off | — | I1 |
| 2 | Count screens, name **every** slug, write the plan | N screens = N showcases | — |
| 3 | Per screen: dominant element, block list, step count, out-of-range list, reference mistakes | ≥20 steps on paper | I1 I4 I5 |
| 4 | Scaffold, **server stopped** → `theme` `layout` `use-insets` `text` `data` | — | I2 |
| 5 | **Assets before components** | `CREDITS.md` complete | I4 |
| 6 | Components one at a time: write → import → shoot → measure → prettier | never two before wiring the first | I2 I7 |
| 7 | The design bar | `audit.js` 0 · `foot.py` ≤24dp | I3 |
| 8 | **Show the screens on 8082, get sign-off** | **explicit sign-off** | **I6** |
| 9 | Stage the reveal | `stage.js` ≥20 · `blank.js` 0 | I5 I9 |
| 10 | Prove the reveal | `stepdiff.py` clean · `verify` · `rehearse` | I7 I9 |
| 11 | Done-gate, server stopped | `tsc` · Android export · `lock` | I7 I8 |
| 12 | Record | `node tools/record.js <slug>` | — |

---

# Current state

- Reference class: **design shot → inspo brief**, rule 1 off.
- Batch: **35 screens across 11 boards**, one board per category, every phone on
  a board becoming its own showcase. Slugs all named in
  [ref/BATCH4-PLAN.md](ref/BATCH4-PLAN.md), with the asset plan and the
  reference mistakes found so far.
- Probe (I7, I9): **built**, not yet exercised — it needs a staged showcase.
- Board 1 (`booking-app/01`) read; `romeospot` scaffolded.
- Next: `theme.ts` → `layout.ts` → `text.tsx` → assets → components → design bar
  → **step 8, show you all three booking screens on 8082**.
