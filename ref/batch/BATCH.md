# Batch — 17 design shots, 16 to build

The shots are `ref/batch/<family>.png`, named after the showcase family they became —
`brisk.png` is the board that became `briskhome` and `briskcase`. They arrived
numbered 25-41 and the Shot column keeps those numbers, because the skip note and the
build order refer to them. Each is an **inspo
brief** (AGENTS.md, "Three kinds of reference"): match the spirit, build at real 393dp
sizes, fill the screen, fix the reference's mistakes, and say which calls were mine.

**One showcase per screen.** A three-phone board is three showcases with three slugs,
not one showcase with three routes.

## Skipped as a repeat

| Shot | Why | Already built as |
|---|---|---|
| **26** (no image here) | Same board as shot **5**, given earlier in this session — fitplan, "Weave Your Time, Design Your Destiny." | `weavestart` (screen 1 only; screens 2 and 3 of that board were never built) |

## The worklist

Status: `todo` → `built` → `staged` (blank/final registered) → `done` (gate passed).

| Shot | Image | What it is | Screens | Slugs | Status |
|---|---|---|---|---|---|
| 25 | `tembea.png` | Travel onboarding, acid green, a throw of photo tags | 1 | `tembeastart` | **done** |
| 27 | `tempo.png` | Productivity, white + green/orange | 3 | `tempohome` · `tempotask` · `tempocal` | **done** |
| 28 | `tilt.png` | Payments, cream + violet/lime, dark dock | 2 | `tilthome` · `tiltsend` | **done** |
| 29 | `stak.png` | Investing, black + acid green | 3 | `stakquiz` · `stakstock` · `stakrate` | **done** |
| 30 | `volt.png` | AI assistant / analytics, dark + yellow-green | 3 | `voltdata` · `voltchat` · `voltprompt` | **done** |
| 31 | `spoke.png` | Bike rental, light grey + lime | 3 | `spokecats` · `spokebike` · `spokenav` | **done** |
| 32 | `rova.png` | Coach travel booking, black + green | 3 | `rovasearch` · `rovabook` · `rovaseat` | **done** |
| 33 | `morsel.png` | Calorie tracking, white + blue/lime | 2 | `morselhome` · `morselweek` | **done** |
| 34 | `budge.png` | Budget planner, white + green/red | 3 | `budgehome` · `budgeplan` · `budgecal` | **done** |
| 35 | `sable.png` | Financial dashboard, yellow + green/black | 3 | `sabledash` · `sablelimit` · `sabledepo` | **done** |
| 36 | `stash.png` | File storage, grey + yellow/black | 4 | `stashstart` · `stashhome` · `stashfolders` · `stashlock` | **done** |
| 37 | `orbit.png` | Cards, black + holographic gradient | 3 | `orbitstart` · `orbithome` · `orbitover` | **done** |
| 38 | `kite.png` | Wallet, light grey + charcoal cards | 2 | `kitehome` · `kitecard` | **done** |
| 39 | `onyx.png` | Projects, black and white, wave graphics | 2 | `onyxhome` · `onyxday` | **done** |
| 40 | `brisk.png` | Tasks, white + blue/lime | 2 | `briskhome` · `briskcase` | **done** |
| 41 | `focal.png` | Focus/productivity, white + blue/violet/lime | 3 | `focalhome` · `focalstart` · `focalplan` | **done** |

**42 showcases.** Every brand name is invented; none of the references' own marks are
copied (AGENTS.md, "Sourcing assets").

## Two rules this batch exists to not break again

Both were reported from the last set of recordings, and both are now written up properly.

1. **Draw the interface, photograph the picture.** The bikes in shot 31, the forest road
   in 31, the food in 33, every face anywhere: photographs. Chevrons, gauges, tab bars,
   badges, charts: drawn. If drawing it means reproducing a specific arrangement rather
   than expressing an idea, it is out of range — and that includes maps.
2. **No dead canvas at the foot.** `python tools/preview/foot.py shot.png` over the
   finished shot of every screen, measured from the safe area. Over 24dp fails.
