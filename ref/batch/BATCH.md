# Batch — 17 design shots, 16 to build

The shots are `ref/batch/<n>.png`, numbered as they were given. Each is an **inspo
brief** (AGENTS.md, "Three kinds of reference"): match the spirit, build at real 393dp
sizes, fill the screen, fix the reference's mistakes, and say which calls were mine.

**One showcase per screen.** A three-phone board is three showcases with three slugs,
not one showcase with three routes.

## Skipped as a repeat

| Shot | Why | Already built as |
|---|---|---|
| **26** | Same board as shot **5**, given earlier in this session — fitplan, "Weave Your Time, Design Your Destiny." | `weavestart` (screen 1 only; screens 2 and 3 of that board were never built) |

## The worklist

Status: `todo` → `built` → `staged` (blank/final registered) → `done` (gate passed).

| Shot | What it is | Screens | Slugs | Status |
|---|---|---|---|---|
| 25 | Travel onboarding, acid green, a throw of photo tags | 1 | `tembeastart` | **done** |
| 27 | Productivity, white + green/orange | 3 | `tempohome` · `tempotask` · `tempocal` | todo |
| 28 | Payments, cream + violet/lime, dark dock | 2 | `tilthome` · `tiltsend` | todo |
| 29 | Investing, black + acid green | 3 | `stakquiz` · `stakstock` · `stakrate` | todo |
| 30 | AI assistant / analytics, dark + yellow-green | 3 | `voltdata` · `voltchat` · `voltprompt` | todo |
| 31 | Bike rental, light grey + lime | 3 | `spokecats` · `spokebike` · `spokenav` | todo |
| 32 | Coach travel booking, black + green | 3 | `rovasearch` · `rovabook` · `rovaseat` | todo |
| 33 | Calorie tracking, white + blue/lime | 2 | `morselhome` · `morselweek` | todo |
| 34 | Budget planner, white + green/red | 3 | `budgehome` · `budgeplan` · `budgecal` | todo |
| 35 | Financial dashboard, yellow + green/black | 3 | `sabledash` · `sablelimit` · `sabledepo` | todo |
| 36 | File storage, grey + yellow/black | 4 | `stashstart` · `stashhome` · `stashfolders` · `stashlock` | todo |
| 37 | Cards, black + holographic gradient | 3 | `orbitstart` · `orbithome` · `orbitover` | todo |
| 38 | Wallet, light grey + charcoal cards | 2 | `kitehome` · `kitecard` | todo |
| 39 | Projects, black and white, wave graphics | 2 | `onyxhome` · `onyxday` | todo |
| 40 | Tasks, white + blue/lime | 2 | `briskhome` · `briskcase` | todo |
| 41 | Focus/productivity, white + blue/violet/lime | 3 | `focalhome` · `focalstart` · `focalplan` | todo |

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
