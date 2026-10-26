# Batch 2 — 11 design shots, 28 screens

The shots are `ref/batch2/<family>.png`, named after the showcase family they became —
`lark.png` is the board that became `larkpick`, `larkhome` and `larkquiz`. Each is an
**inspo brief** (AGENTS.md, "Three kinds of reference"): match the spirit, build at real
393dp sizes, fill the screen, fix the reference's mistakes, and say which calls were mine.

**One showcase per screen.** A three-phone board is three showcases with three slugs, not
one showcase with three routes.

**No repeats.** All 11 were checked against batch 1's briefs in `ref/batch/`. The three
nutrition boards here (`sprig`, `nibble`, `lensa`) are three different apps, and none of
them is `morsel.png`, the "Mr. David" calorie board from batch 1.

## What this batch has to clear, beyond the usual gate

Both came out of the last round of recordings:

1. **At least 20 steps per screen.** Seven- and ten-step reveals are barely a video.
   Components are staged *internally* so a row fills one item at a time; that is what
   lifts the count honestly rather than padding it.
2. **The blank state must paint nothing but the page.** A container that carries its own
   `backgroundColor` is visible from step one, and the reveal then opens on a bar of
   colour. Where a surface has to exist for layout, it gets a staged *skin* — an
   absolutely-filled child that can be revealed — and the container itself stays
   transparent.

## The worklist

Status: `todo` → `built` → `staged` (blank/final registered) → `done` (gate passed).

| Shot | Image | What it is | Screens | Slugs | Status |
|---|---|---|---|---|---|
| 52 | `lark.png` | Language learning, black + lime | 3 | `larkpick` · `larkhome` · `larkquiz` | **done** |
| 53 | `crate.png` | Parcel delivery, white/black + orange | 3 | `cratehome` · `cratescan` · `cratetrack` | **done** |
| 54 | `mason.png` | Construction project management, white + orange | 3 | `masonhome` · `masontasks` · `masonstats` | **done** |
| 55 | `sprig.png` | Nutrition, white + lime | 3 | `sprighome` · `sprigdish` · `sprigprogress` | **done** |
| 56 | `nibble.png` | Calorie counter, white + teal/yellow | 3 | `nibblehome` · `nibbleweek` · `nibbleboards` | **done** |
| 57 | `lensa.png` | Calorie camera, white + green | 2 | `lensahome` · `lensastats` | **done** |
| 58 | `tallyo.png` | Statistics, white + yellow/cyan, bold type | 1 | `tallyoscore` | **done** |
| 59 | `vigor.png` | Fitness, blue + orange | 2 | `vigorfind` · `vigorplan` | **done** |
| 60 | `mingle.png` | Dating, red | 2 | `minglestart` · `mingleswipe` | **done** |
| 61 | `nest.png` | Crypto wallet, cream + green, dark dock | 3 | `nestactions` · `nesthome` · `nestperf` | **done** |
| 62 | `volley.png` | Padel / sports events, dark green | 3 | `volleyhome` · `volleyrank` · `volleyevent` | **done** |

**28 showcases.** Every brand name is invented; none of the references' own marks are
copied (AGENTS.md, "Sourcing assets").

## What is a photograph in this batch, and what is drawn

The split is the one AGENTS.md sets: the interface is vectors, the pictures are bitmaps.

**Photographs** — free-licensed stock, bundled, credited in each showcase's `CREDITS.md`:

- faces, everywhere people appear (`lark`, `mason`, `nest`, `volley`, `nibble`, `vigor`,
  `mingle`, `lensa`)
- food (`sprig`'s dish and streak card, `nibble`'s meals, `lensa`)
- people exercising (`vigor`'s plan cards)
- the parcel in `cratescan` — it is a photograph of a parcel in a hand, which is exactly
  the "picture of something" side of the rule

**Drawn** — chevrons, tab bars, badges, rings, gauges, bars, flags-as-discs, wordmarks,
the QR frame, progress rails.

**The map in `cratetrack` is not in drawing range.** Vectoring one is tracing a specific
arrangement rather than expressing an idea. It is built as the map *idea* instead — a
route line, two pins and a radius ring over a flat ground — and that call is in the
handover.


## Done — 28 of 28, and what the gate said

Every showcase passed the done-gate on 2026-10-26, with the dev server
stopped for steps 1 and 2:

1. `npx tsc --noEmit` clean across all of `src/`.
2. `npx expo export --platform android` succeeded (4.2MB Android bundle).
3. `verify` — every staged file byte-identical to finished, all 28.
4. `rehearse` — preflight, replay, typecheck and diff, per screen, all 28.
5. Blank-state shot of every screen. Measured rather than eyeballed: every
   frame is **one colour**, 0.00% of it painted over the page's own ground.
6. `foot.py` over the finished shot of every screen. Worst: **12dp** of dead
   canvas against a 24dp limit; 24 of 28 read 0dp.
7. `lock` recorded, drift proved (`DRIFT changed
   src/features/volleyevent/theme.ts`, exit 1), file restored.
8. All 28 left in blank state and preflight-clean.

**Steps per screen**, the floor being 20:

| 23 | 23 | 25 | 30 | 23 | 24 | 28 | 27 | 38 | 43 | 32 | 33 | 40 | 39 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 41 | 35 | 28 | 38 | 29 | 25 | 24 | 23 | 32 | 28 | 30 | 33 | 23 | 24 |

Lowest 23, highest 43, 836 steps over the batch.

## Two defects this batch caught, and the fixes

**A blank state that opened on a black bar.** `cratehome`'s panel carried its
own `backgroundColor`, so the first frame of its recording was a black band
across the top with nothing in it — the exact complaint from the last round.
Caught by *measuring* the blank frame's colour count rather than looking at
it. The fix is the one this file already asks for: the fill becomes an
absolutely-filled child and gets a step of its own. `volleyrank` had the same
shape in white.

**`foot.py` was blind to two whole classes of screen.** Its tolerance was 18,
and a white card on a warm off-white page is nine units apart — so on
`lensastats` it measured up to the last dark *text* and reported 25dp of dead
canvas on a screen whose last card ends exactly on the safe area. And a
screen ending on a dark dock welded to the edge had that dock sampled as the
"ground", so the bar itself counted as dead space. Both are fixed in the tool
with the reasoning in its own comments; the tolerance change was swept over
every finished shot in the batch first, and only the near-ground screen moved.
