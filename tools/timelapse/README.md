# Timelapse mode

Each showcase can be flipped between a **blank** state — every element commented out, with
deliberate mistakes staged — and its **finished** state. Both copies of every file live in
`showcases/<slug>/` and are never edited in place.

```bash
node tools/timelapse/apply.js <slug> blank        # ready to film
node tools/timelapse/apply.js <slug> final        # everything restored
node tools/timelapse/apply.js <slug> blank screen2   # one file only
node tools/timelapse/apply.js list                # known showcases
```

## Replaying a screen

```bash
python tools/timelapse/run.py <slug> 1 --delay 1.5
```

One file write per step, pausing between each so Fast Refresh redraws — the UI builds up
piece by piece. `--delay` sets the pace. Preflight runs automatically first; pass
`--no-preflight` to skip it.

**Preflight on screen 2 blanks screen 1 — including the navigation that got you there.**
The splash's `AutoAdvance` and the sheet's "next" button are staged like everything else,
so resetting them strands the device on whichever route it is on, with nothing left to
tap. That is how a whole take of screen 3 came back as a blank white screen: the reveal
was filling in `/alta/home` while the phone sat on the blanked splash.

So a continuous run through all screens is:

```bash
python tools/timelapse/run.py <slug> 1 --delay 1.5   # preflight once, at the start
python tools/timelapse/run.py <slug> 2 --delay 1.5 --no-preflight
python tools/timelapse/run.py <slug> 3 --delay 1.5 --no-preflight
```

Preflight once for the first screen, then never again inside the take — earlier screens
stay finished, so their navigation still works and the device moves forward the way the
app really does. Between screens the device has to reach the next route: tap the control
that leads there, and give it time before the next command.

Nothing here can drive the device. `adb` deep links reach Expo Go, but a sandboxed agent
may not have them, and Metro has no reload endpoint (`/reload` is gone; only `/status`
answers). The one lever that always works is a file edit, because Fast Refresh is already
watching: drop a `<Redirect href="/<slug>/<screen>" />` into the route the device is
showing, wait for the refresh, then restore the file from `blank/` or `finished/`. Make
both the import and the JSX edit in **one** save — two saves in a row red-screen the app
on the first one, which renders before the import lands.

A white screen tells you nothing on its own: a blank splash and a blank white home look
identical. To find out which route is live, inject a marker (a 180dp red `View`) into the
route you think you are on and screenshot — no marker means you are somewhere else.

## Authoring the steps

Never write `steps.json` by hand. Put markers in the blank files and generate it:

```bash
node tools/timelapse/gen.js <slug>
```

The blank file is the only source of truth — a step exists because a marker exists, and its
needle is read off the line it will act on, so the two cannot drift apart. Ordering and the
screen a step belongs to come from its `<screen>.<nn>` number, so one screen's steps can be
spread across as many files as it touches.

| marker | becomes |
|---|---|
| `// STEP 1.04 <label>` above a commented import | `imp` |
| `{/* STEP 1.09 <label>` opening a block | `jsx` |
| `{/* STEP 1.09 <label> \| FIX 1.10 <label>` | `jsx`, then `cutel` |
| `// MISTAKE 1.06 <label>` above a wrong line | `cutfirst` (removes both lines) |

Mistakes live **inside** the block they belong to, so they surface as that part of the
screen is revealed instead of breaking the app from step one. A JSX mistake cannot use a
nested JSX comment — the inner `*/` would close the block staging it and the blank file
would not parse — so it gets its own block and the `| FIX` form.

Whatever the markers leave behind in whitespace, the closing `final` step copies the
finished files over everything the screen touched, so the end state is exact.

## The four safety commands

```bash
python tools/timelapse/run.py <slug> verify      # prove the sequence
python tools/timelapse/run.py <slug> rehearse    # replay it the way a take does
python tools/timelapse/run.py <slug> lock        # record the finished state
python tools/timelapse/run.py <slug> preflight   # check before recording
```

**`verify`** applies blank, runs every step of every screen with no pause, then diffs each
staged file against its finished copy. Run it before ever replaying for real — it is what
makes step-by-step inspection unnecessary.

**`rehearse`** is `verify` plus the real path: for each screen it runs preflight, replays
at full speed, typechecks, and diffs that screen's files. Per screen, because preflight
resets every staged file to blank — a single pass over all screens would never exercise it.

**`lock`** records a SHA-256 of every file the showcase depends on: its own routes,
components and assets, plus the shared kit, theme, global CSS and Tailwind config. Run it
once the app is finished.

**`preflight`** is the guard that runs before every recording. It:

1. compares every tracked file against `lock.json` and **stops** on any drift, naming the
   file — rather than discovering it mid-take;
2. force-resets the staged files to blank, never assuming they already are;
3. typechecks.

Both of these happened live and both are now covered: a screen that was not in blank state
aborted on its first step, and an edit to an *unstaged* file red-screened the app while
`verify` — which only looks at staged files — stayed green.

## Layout

```
showcases/<slug>/
  manifest.json   name → path for every staged file
  steps.json      the ordered steps, as data
  lock.json       SHA-256 of every file the showcase depends on
  blank/          <name>.blank
  finished/       <name>.final
```

Steps are data, not code, so adding a showcase is a new folder and no code change. The
eight operations `run.py` understands:

| op | does |
|---|---|
| `jsx` | unwrap a `{/* STEP n ... */}` block |
| `imp` / `unimp` | uncomment / delete an import line |
| `entry` | uncomment a single-line data entry by key |
| `block` | uncomment a multi-line data entry by key |
| `cutel` | delete the JSX element containing a needle |
| `cutfirst` | delete the first line matching each prefix |
| `final` | copy finished files over everything a screen touched |

### Rules these operations follow, and why

Each of these was a real corruption during the Revolut build:

- **`entry` targets one entry by key**, never a line range that walks until it stops seeing
  `//`. That walk eats the structural `[` and `],` around the entry and destroys the array.
- **`entry` and `block` are separate** because a helper that strips the comment from a
  single line leaves a multi-line object half-commented and unparseable.
- **`jsx` only matches a marker that follows `{/*` directly** — matching it anywhere in the
  line also matches the explanatory note that mentions the same step number.
- **`imp` only matches real import lines** — matching a module path anywhere also matches
  prose in a header comment naming the same file.
- **`final` copies every file a screen touched**, not just the screen, or staged components
  keep their STEP banners.
