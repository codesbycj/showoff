# showoff

A gallery of app UI designs rebuilt from reference screenshots in React Native
(Expo SDK 57) + NativeWind, recorded as speed-build videos on an Android Studio emulator.

Each app design is a **showcase** with its own slug. These rules apply to every set of
screens, whichever app it is.

> Expo HAS CHANGED. Read the exact versioned docs at
> https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## Hard rules

1. **Pixel perfect.** Every screenshot has to match the design exactly — spacing, radii,
   type scale, colour. No "close enough". Use explicit values over eyeballed ones.
2. **Everything is a component.** Screens are assembly, never markup. A screen file should
   read as a list of imported components, so the speed video shows the UI appearing one
   piece at a time.
3. **One component per step.** Finish a component → import it into the screen → verify →
   only then start the next component. Never write two components before wiring the first.
4. **Build the whole set, one showcase per screen.** Given N screens, build all N — and
   give each its own slug, its own `src/features/<slug>/`, its own assets folder and its
   own staging, even when they are screens of the same app design. Duplicate whatever two
   of them share (the theme, the layout constants, the text primitive); independence is
   worth more than the duplication. Do not stop between screens for approval. Report
   deviations at the end. Only stop early if genuinely blocked — and then finish
   everything that isn't blocked first.
5. **No git.** Never commit, branch, stage, checkout or reset. These are showcases, not
   shipped code. Back work up by copying files, never with git.

## Three kinds of reference

**A screenshot is a layout brief.** Rules 1-5 above are written for those: an export of a
real app's real screen, one phone filling the frame. Match the design exactly, build it
screen by screen, stage it as a speed-build reveal.

**A design shot is an inspo brief, and rule 1 is off.** A Dribbble/Behance-style
presentation — two or three phones posed on a coloured board, drop shadows, a 3D render
dropped in, sometimes tilted — is a *picture of an idea*, not a spec:

- **Match the spirit, not the pixels.** Take the palette, the type hierarchy, the shapes,
  the order of the blocks and the feel. Do not reconstruct a px/dp scale off a posed
  phone, do not measure glyph widths against it, and do not write a `layout.ts` full of
  numbers divided by 0.88. The board's phone is whatever size the designer's artboard
  happened to be, and half of what is in it was never on a 393dp screen.
- **Build it at the real size instead.** Pick type and spacing that are right for a 393dp
  phone — a display headline is ~34-40dp, body ~15-16dp, a primary button ~56dp tall, page
  margin 20-24dp — and lay it out in flex off `useWindowDimensions()` so it holds at other
  widths. If the reference's proportions and a phone's ergonomics disagree, the phone wins.
- **Fix the reference's mistakes.** Typos, a stray "01 / 03" that counts wrong, a label
  that does not match its icon, contrast too low to read, a tap target under 44dp: correct
  it silently and say so in the handover. The design shot is not an authority.
- **Improve it where it is obviously better.** A real pressed state, a real focus ring, an
  animated progress bar, a gradient rebuilt as a gradient instead of a flat fill. Changes
  that make it a better *app* are wanted; changes that restyle it into a different design
  are not.
- **Everything else still holds.** One showcase per screen, components not markup, one
  component at a time, the full step-by-step staging, and the done-gate. Only rule 1
  changes.
- **Say which calls were yours.** The handover lists every place the build departs from
  the shot and why.

A 3D render in the shot (a wallet, a floating card, a coin) cannot be recreated and must
not be traced badly. Either stand in free-licensed stock for it, or rebuild the *idea* of
it in-app — a real card component, posed and shadowed. Say which.

**A video is a motion brief, and the rules change further.** When the reference is a
recording of an animated prototype:

- **The animation is the specification. The UI is inspiration.** Measure the motion frame
  by frame and match it; do not chase the layout's pixels. A capture tool flies and zooms
  the phone, so there is no stable pixel grid in the clip to measure a layout against even
  if matching one were the point. Rule 1 does not apply to a video reference.
- **It must be a real, responsive app.** Derive every size from `useWindowDimensions()`
  through a `layout.ts`, lay blocks out in flex, and check it at several screen sizes
  before calling it done. Fixed offsets taken off one phone are the failure mode here.
- **One screen, not one route per beat.** The transitions in a prototype are continuities
  between states of the same surface — a shared element flying out of the card it was in,
  a bar growing into a sheet. `expo-router` cross-fades whole screens, which destroys
  every one of them. Hold the state in the screen and let the layers persist.
- **Routes live under `src/app/animated/<slug>/`,** so a motion showcase is never mixed up
  with a screenshot one.
- **No step-by-step staging.** There is no blank state and no reveal: the showcase is
  filmed by *using* it. Register it with `tools/timelapse/snapshot.js <slug>` — see
  "Final-only showcases" below.

Record the measured timings in a `motion.ts` with the tracked numbers in the comments.
They are the only thing to re-check against when something feels wrong later, and they
cannot be recovered from the built app.

## Layout

```
src/app/                    expo-router routes only (no helper files — they become routes)
src/app/_layout.tsx         Stack, fonts, safe-area, status bar
src/app/<slug>/             one route per screen in the showcase
src/components/ui/          cross-showcase primitives (Screen, Text, ...)
src/features/<slug>/        components for one app design
src/features/<slug>/theme.ts    that brand's colour tokens
src/features/<slug>/data/   screen content, so components stay presentational
src/theme/                  font registration
tools/showcase.js           new | use | list | wipe
tools/preview/              render + measure harness
tools/timelapse/            per-showcase blank/final switch for filming
src/global.css              theme tokens as CSS variables
tailwind.config.js          token -> utility mapping
```

Routes live under `src/app/`; the components a route uses live under
`src/features/<slug>/components/`. Put nothing but routes in `src/app/` — every file
there becomes a route.

Screens decide navigation, components never do. A card takes `onPress`, a list takes
`onSelect(item)`, and the screen wires where taps go — so adding a destination is one
line in the screen, not a change to the component.

Wire the flow the way the real app flows: a splash that advances itself, a button that
goes to the next screen, a close control that goes back. The recording should never need
faked navigation.

## Theming

Shared primitives use semantic utilities — `bg-bg`, `bg-surface`, `text-fg`, `text-muted`,
`border-border`, `bg-accent`, `text-accent-fg` — resolving to CSS variables in
`src/global.css`. A showcase re-themes by overriding those variables, not by editing
components.

Brand-specific values that aren't semantic (a promo red, a membership teal) go in
`src/features/<slug>/theme.ts`, measured off the reference or lifted from the brand's own
SVG. Never scatter hex codes through components.

**Fonts are registered per weight**, because React Native resolves a face by family name
and not by numeric weight: `font-sans`, `font-sans-medium`, `font-sans-semibold`,
`font-sans-bold`. Never Tailwind's `font-medium` — that is a weight utility and collides
with a family of the same name.

Most app designs use a proprietary typeface that cannot be obtained. Pick the closest free
substitute, say so in the handover, and expect it to be wider: at matched cap height a
substitute often runs 10–15% wider than the original. You cannot match both width and
height — choose per element and state the choice.

## Verifying pixel accuracy

**Do not eyeball it. Measure.** Start the dev server **once** per session, then every
check against the reference is seconds rather than minutes:

```bash
npx expo start --web                                 # once, leave it up
node tools/preview/shoot.js <slug>/<screen> shot.png # ~7s
node tools/preview/rows.js shot.png                  # element tops/heights in dp
```

Exporting to check a screen costs ~2.5 minutes; shooting the live dev server costs ~7,
for identical pixels. Never run `expo export` while the dev server is up — they share the
Metro cache. The Android bundle check happens once per app, with the server stopped.

**Work out the conversion before measuring anything.** Reference screenshots usually
arrive as Mobbin exports: the phone screen plus an attribution bar along the bottom. Strip
the bar, then divide by the capture density. For the 1180×2676 exports used so far the
screen is 1180×2556 at 3x = 393×852 dp, so a measurement in that image × 0.446 = dp.
Recompute this for any new reference size.

What measuring catches, every time:

- **The first pass always runs 12–15% oversized.** Compare text *widths* against the
  reference, not just positions — an over-large font shows up as a line 30dp too wide long
  before it looks wrong.
- **A row is as tall as its text line, not its visible content.** A hairline divider with
  a centred "or" is a ~21dp row, not 1dp. Gaps measured below such a row drift ~10dp each
  time, compounding down the screen.
- **Position drift accumulates.** Check an anchor near the top *and* near the bottom. If
  both match but the middle does not, the error is inside a block, not in the gaps.
- **A row that runs off the screen edge is a scrolling row, not a wrap.** If the reference
  shows an item clipped by the left or right edge, the items sit in explicit rows inside a
  horizontal scroll view. A wrap layout physically cannot reproduce it.
- **Check what a group is aligned to before centring it.** A control group often lines up
  with something above it rather than with the screen — card finish swatches start under
  the centre of the card, not the centre of the phone.

### The web render is a proxy, not proof

The harness renders the web export. That verifies layout, spacing and type — it cannot see
native behaviour. **Do not launch the app to check it.** Nothing in this workflow starts an
emulator or a device: the web render plus the Android export is the whole verification
budget, so the things below have to be designed out rather than caught by running it.

- `Platform.select` shadows (`elevation` vs `shadow*`) — so never `Platform.select` a
  shadow. Carry `shadow*` and `elevation` together in one style object; the keys the
  running platform does not read are inert, and a select is exactly what cannot be checked.
- safe-area insets — web reports zero, so shoot with the harness's faked `59,0,34,0` and
  read every inset-anchored position off that rather than off a bare render.
- emoji, which differ across Windows / Android / iOS (flags are missing on Windows) — so
  draw the glyph or take it from the icon set, and never ship an emoji as UI.
- anything overflowing its parent, which Android clips more aggressively — so do not rely
  on overflow, and never put `overflow: 'hidden'` and `elevation` on the same View.
- **two font files that share an internal family name.** Web gives every `useFonts` key its
  own `@font-face`, so a collision is invisible there; Android resolves a font by the family
  name *inside the file*, so the second one loses and its glyphs come out as tofu — or as
  whatever the system emoji font maps that codepoint to. This shipped: two Material Symbols
  subsets both still called `Material Symbols Outlined`, and the second showcase silently
  rendered out of the first one's subset, showing only the glyphs the two happened to share.
  `tools/subset-symbols.py` now rewrites name IDs 1/3/4/6/16 per showcase, so it is unique
  by construction. Anything else cut from a common source face needs the same treatment.

`npx expo export --platform android` catches bundling and asset problems `tsc --noEmit`
cannot — but it cannot run while the dev server is up, so it belongs in the done-gate at
the end of an app rather than after each screen. It is a bundle check, not a launch: it
compiles and writes `dist/`, and nothing installs or runs.

## React Native traps that have actually bitten

- **`Pressable` function styles are dropped in static render.** `style={({pressed}) => …}`
  silently loses height and fill. Put the visual box on an inner `View`.
- **`overflow: 'hidden'` + `elevation` on the same View is unreliable on Android.** Split
  them, or drop the clip if nothing needs clipping.
- **Import Google Fonts by subpath.** The package barrel eagerly requires every weight —
  for one family that was 18 faces, about 6MB of assets. Use `<pkg>/400Regular`.
- **Never gate first paint on font loading without a timeout.** A stalled font request over
  a LAN dev server never rejects, so the app hangs on the splash forever. Paint after ~3s
  regardless; `useFonts` re-renders when the faces land.
- **Empty arrays lose their inferred type.** Anything that may be commented out for filming
  needs an explicit annotation or `tsc` fails with implicit `any[]`.
- **expo-router evaluates every route file at startup** to build the route tree, so a broken
  import in any screen breaks the whole app, not just that route.
- **JSX attribute strings do not process escapes.** `scope="Personal · All"` renders the
  escape literally. Only JS strings interpret it — either put the real character in, or pass
  an expression: `scope={'Personal · All'}`.
- **React Native rotates about an element's centre**, whatever `transformOrigin` says.
  Anchoring rotated text to an edge and rotating there pushes it out of its own box and it
  gets clipped. Give it a strip the full length of the axis and rotate that about its centre;
  after a quarter turn, leading padding moves the label along and `textAlign` pins it to the
  far end.

## Working discipline

- **Never run `expo export` while the dev server is running.** They share the Metro cache
  and concurrent access corrupts it. Symptom: the terminal says `Bundled` while the device
  sits at 99% forever.
- **Windows: write files with `newline=''`.** Python's text mode rewrites everything as
  CRLF, which makes every line look changed.
- **Do not author a script through a shell heredoc if it contains `\n` or `\s`.** The
  backslashes arrive mangled and the file is silently broken. Write it with the editor tool.
- **Keep script logging ASCII.** The Windows console cannot encode `✓`/`✗` and the whole
  command dies on the print, after the edit has already been made — leaving a half-applied
  change with a traceback on top of it.
- **Run prettier at each component boundary** rather than hand-chasing whitespace diffs.
  Hand-fixing indentation has produced duplicated lines more than once.
- **After changing dependencies or `app.json`, restart with `npx expo start -c`.** Metro
  will happily serve a stale cache.
- **Back up before rewriting a file wholesale** — copy it, per rule 5.
- **Strip template cruft early.** A new showcase should not carry demo screens, unused
  template packages, or experiments nobody asked for.

## Sourcing assets

Real brand marks, substituted photography:

- **Small glyphs are traced, not hand-authored.** `tools/preview/trace.py <img> x0 y0 x1 y1
  <thr> [viewBox]` supersamples a region, walks each blob's boundary, finds the pockets that
  are holes, simplifies and prints SVG subpaths in an ink-box viewBox. An Apple mark at 15dp
  and six SF-Symbol-shaped feature glyphs came out within a point of the reference this way,
  in minutes; guessing at a path by hand does not get close. Fill the result with
  `fillRule="evenodd"` so a ring keeps its counter.
- **Logos** come from Wikimedia Commons as SVG. If the paths are flat, inline them into a
  component and crop with `viewBox` — that gives true letterforms at any size, and the
  brand's exact colours. If the SVG uses nested transform groups, rasterise it through
  headless Chrome rather than hand-inlining it.
- **Photography** is free-licensed stock standing in for the brand's own, which is not
  redistributable. Credit every file in a `CREDITS.md` beside the images.
- **Cutouts**: measure the border-pixel mean and standard deviation before committing to an
  image. Low deviation means a seamless backdrop that will cut cleanly. Remove the
  background with a flood fill from the edge plus an alpha ramp, so edges stay soft and
  shadows fade instead of leaving a grey halo.
- **Bundle assets locally, never hotlink.** Recording must not depend on the network.
- **Draw small brand glyphs rather than relying on emoji** where the platform differs —
  flags in particular.

## Timelapse mode

`tools/timelapse/apply.js <slug> blank|final` flips a showcase between a filming state —
every element commented out, with deliberate mistakes staged — and the finished state.
Both copies of every file live in `showcases/<slug>/` and are never edited in place.

Steps are element-level: composite components are staged internally so a row fills in one
item at a time instead of landing all at once. See `tools/timelapse/README.md`.

### Final-only showcases

A showcase built from a **video** has no blank state and no reveal (see "Two kinds of
reference"). Register it with

```bash
node tools/timelapse/snapshot.js <slug>          # capture the tree as finished
node tools/timelapse/snapshot.js <slug> --check  # report drift, write nothing
```

which writes a manifest and a `finished/` tree and nothing else. `final`, `blank` and
`lock` then work on it; `verify`, `rehearse` and the per-screen reveal say it is
final-only rather than failing on a missing file. `preflight` still checks drift against
`lock.json` and leaves it in **final** state, which is the resting state for this kind.

Re-run `snapshot.js <slug>` after changing any of its files, or `final` will restore the
older copy over your work. `--check` before a take says whether that has happened.

**Never hand-write `steps.json`.** Put markers in the blank files and run
`node tools/timelapse/gen.js <slug>`. The blank file is then the only source of truth: a
step exists because a marker exists, and its needle is read off the very line it will act
on — which removes both the authoring cost (141 entries for the second app) and the class
of bug where a step's needle no longer matches the file.

Mistakes are staged **inside the block they belong to**, so they appear as that part of the
screen is revealed rather than breaking the app from step one. Two shapes, and the choice
between them is forced, not stylistic:

- `// MISTAKE n.nn` above a wrong line, for anywhere JS comments are legal — a duplicated
  key later in an object literal wins, so the wrong value is what renders.
- `{/* STEP n.nn ... | FIX m.mm ... */}` for a mistake made of JSX. A JSX comment **cannot**
  be nested inside the `{/* */}` block staging it: the inner `*/` closes the outer one and
  the blank file stops parsing. So it is staged as its own block, revealed by one step and
  cut by the next.

A `cutel` needle must be text that appears **only** in the staged duplicate. Reuse the real
element's text and the fix deletes the real one and leaves the duplicate — it reads as
correct in the step list and is wrong on screen.

`tools/timelapse/run.py <slug> <screen> --delay 1.5` performs a screen, one file write per
step, pausing between each so Fast Refresh redraws. One command per screen, not one per
step — driving a reveal a tool call at a time is what made the first attempt crawl.

### Prove the sequence, then run it

**Never drive a reveal step by step against a live recording.** `run.py verify` applies the
blank state, runs every step of every screen with no pause, then diffs every staged file
against its finished copy. Only run for real once it reports all files identical.

This matters because inspecting after each step is what makes a reveal crawl, and the only
reason to inspect is not trusting the tooling. Prove it once instead.

- **`verify` only covers staged files.** It says nothing about the rest of `src/`. Run
  `tsc --noEmit` after each screen too — a stray edit in an unstaged file is invisible to
  `verify` and only `tsc` will catch it.
- **Reset before each screen.** Files drift when they are open in an editor during a run.
  A screen that is not in blank state will abort on its first step. `run.py` now does this
  automatically via preflight.
- **`preflight` before every recording.** It diffs every tracked file against `lock.json`
  and refuses to start on drift, force-resets the staged files to blank, and typechecks.
  Run `lock` once an app is finished to record that baseline.

### Writing the step helpers

Every one of these was a real corruption, not a hypothetical:

- **Uncomment one entry, identified by key** — never a line range that walks until it stops
  seeing `//`. That walk eats the structural `[` and `],` around the entry and destroys the
  array.
- **Single-line and multi-line entries need separate handling.** A helper that strips the
  comment from one line leaves a multi-line object half-commented and unparseable.
- **Match a block marker only where it follows `{/*` directly.** Matching it anywhere in the
  line also matches the explanatory note that mentions the same step number.
- **Match an import only on lines that are actually imports.** Matching a module path
  anywhere also matches prose in a header comment that names the same file.
- **Finish each screen by copying the finished files over every file it touched**, not just
  the screen. Staged components keep their STEP banners otherwise.

## Showcase lifecycle

```bash
node tools/showcase.js new <slug>        # scaffold routes, features, assets, staging
node tools/showcase.js use <slug>        # repoint the boot redirect for recording
node tools/showcase.js list              # what exists, and which one boots
node tools/showcase.js wipe --yes        # delete every showcase (weekly reset)
```

Showcases coexist until the wipe. Two consequences worth holding in mind:
expo-router evaluates every route file at startup, so a broken file in one app red-screens
all of them — and imagery accumulates in the bundle, so keep each app's assets tight.

**One screen per showcase.** A second screen of the same design is a second showcase with
its own slug, not a second route under the first one. Every recording is then

```bash
node tools/showcase.js use <slug>
python tools/timelapse/run.py <slug> 1 --delay 1.5
```

— never a take that has to perform screen 1 before it can reach screen 2, and never a
preflight that blanks the screen the device is standing on. `run.py`'s multi-screen support
still works and the `--no-preflight` note above still applies to anything built that way,
but nothing new should need it.

The cost is duplication: two showcases of one design each carry their own `theme.ts`,
`layout.ts`, `use-insets.ts` and `text.tsx`. That is deliberate. `lock` and `preflight`
track `src/app/<slug>`, `src/features/<slug>` and `assets/images/<slug>`, so two showcases
sharing a feature folder would each report the other's blanked files as DRIFT — exactly
the coupling this rule removes. A screen that navigates into another showcase is fine
(`cargo`'s "Get Started" pushes `/cargohome`): that is a route push, not a staging
dependency.

Scaffolding a new route leaves expo-router's typed routes stale, so `tsc` fails until the
dev server picks the route up or an export runs.

### The done-gate

An app is not finished until all of these pass, with the dev server stopped:

1. `npx tsc --noEmit` clean across **all** of `src/` — not just staged files. This is the
   check that catches an edit to a file `verify` never looks at.
2. `npx expo export --platform android` succeeds.
3. `run.py <slug> verify` — every staged file byte-identical to finished.
4. `run.py <slug> rehearse` — preflight, replay, typecheck and diff, **per screen**, which
   is the exact path a take walks. Per screen because preflight resets every staged file
   back to blank; one pass over all screens would not exercise that.
5. Screenshot the blank state of every screen. It is the first frame of every recording and
   nothing else checks it renders.
6. `run.py <slug> lock` — record the baseline preflight will check against. Then break one
   unstaged file on purpose and confirm preflight reports `DRIFT` and exits 1.
7. Leave it in blank state.

Check the port is actually free before step 2 — stopping the dev server task is not the
same as the process exiting, and an export that overlaps it corrupts the Metro cache.

## Commands

```
npm start            # dev server (for the preview harness; leave it up while building)
npm run typecheck    # tsc --noEmit
npm run lint
npx expo export --platform android   # full bundle check (dev server must be stopped)
```

`npm run android` is deliberately not in this list. Nothing here launches the app.

## Stack

Expo 57 · React Native 0.86 · React 19.2 · expo-router 57 · NativeWind 4.2 ·
Tailwind 3.4 · Reanimated 4.5 · TypeScript 6
