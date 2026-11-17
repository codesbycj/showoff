# Batch 6 — handover

Eleven apps, 33 screens, built from design shots under `INSPO-RULES.md`.
Every screen passes `audit.js` with **no failures and no warnings**, and
`foot.py` reads **0dp of dead canvas** on all 33 at the emulator's inset.

The boards are in `ref/inspo/`; each app's row below names the one it came
from. `ref/BATCH6-PLAN.md` is the plan this was built to.

---

## Per screen

Every line below is the real output of `node tools/preview/audit.js <slug>`
and `python tools/preview/foot.py` against a settled (second) capture.

### Paws — `ref/inspo/food/16.png`

```
pawstart  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the cat, full-bleed above the fold
          deviations: the board's phone crops its hero; here it runs to the
                      top edge. Pager dots are real and count the frames.

pawshome  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the "Find Your Pet Food" headline
          deviations: the board's category tiles are drawn icons; these are
                      photographs (I4). "See All" is padded to a 44dp
                      control — a text link's tap target is its line height.

pawsitem  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the product on its halo
          deviations: the halo runs the full screen width rather than sitting
                      inside the page margin — capped at the margin it could
                      not use the height the budget gave it and left a 53dp
                      hole above the product. The product sits at 60% of the
                      halo so the colourway column clears its box.
```

### Nook — `ref/inspo/ecommerce-app/12.png`

```
nookstart audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the "Designer Furniture" display
          deviations: the board lets each piece overhang its disc; here the
                      piece sits wholly inside it, because two boxes that
                      overlap only in part is what audit.js reports as
                      COVERED. The discs were enlarged to keep the field full.

nookshop  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the "Catalog" display
          deviations: the promo image was inset clear of its headline (R3).

nookroom  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the room photograph
          deviations: none beyond the camera surface being a still.
```

### Cocoa — `ref/inspo/ecommerce-app/30.png`

```
cocoahome audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the "Order From The Best Of Snacks" title
          deviations: chips raised to 44dp (I2).

cocoaitem audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the coconut photograph
          deviations: stepper discs raised to 44dp.

cocoacart audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the dark cart sheet
          deviations: the total is summed from the lines, not typed (R9).
```

### Orla — `ref/inspo/ecommerce-app/16.png`

```
orlafind  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the "Discover / New collection" display
          deviations: **the board's sage is a backdrop, not the page.** Taken
                      as the page it put white type at 2.91:1. The page is
                      cream, the sage is an accent, and a deeper sage carries
                      the action at 7.8:1 (R4). The card's light band was
                      extended past the photograph's foot so no box straddles
                      another (R3).

orlaring  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the ring on its blush ground
          deviations: header glyphs padded to 44dp controls.

orlafit   audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the hand in the fitting frame
          deviations: none.
```

### Kiln — `ref/inspo/ecommerce-app/16.png` (subject changed)

**The board was a watch marketplace. It is now a ceramics one.** Nine stock
watch frames were pulled and checked at 1:1 — the rule's own test, because a
contact sheet cannot show a 40px wordmark — and every frame with a usable dial
carried a legible mark (SKAGEN, SEIKO, INDIGLO). The frames that were clean
were abstract strap and case textures that cannot carry a product grid.
RULES §2.5 covers it: change the subject to one that keeps the app's plot. The
plot is a collector's marketplace — an object view, a searchable grid of named
pieces with prices, a provenance page with a Buy bar — and studio ceramics keep
every one of those without anybody's mark on them. The slugs are `kiln*` so the
name matches the build (rule 8).

```
kilnview  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the piece on its dark stage
          deviations: subject changed (above). The AR/Object segment and the
                      two header glyphs were raised to 44dp controls.

kilnfind  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the grid of pieces
          deviations: subject changed. The dock was inset clear of the last
                      row's prices (R3); filter and sort raised to 44dp.

kilnitem  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the piece in use, full bleed
          deviations: subject changed. The piece is named **Morning Mug** at
                      €72 to match both the photograph and the same row in
                      `kilnfind`'s grid — a detail page that renames its own
                      object is the mistake that once put a dog under
                      "Green Tea".
```

### Pulp — `ref/inspo/food/22.png`

```
pulphome  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: "Ready for something fresh?"
          deviations: the board's category chips are **emoji**; these are drawn
                      glyphs (I8). Each bottle is named for what its
                      photograph actually shows. The list runs under the dock
                      rather than stopping above it.

pulpitem  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the drink's name under the photograph
          deviations: the board titles a dragon-fruit frame "Red strawberries
                      & seeds smoothie"; the name follows the photograph. Tags
                      are drawn, not emoji.

pulptrack audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the route across the map
          deviations: **the map is the map idea, not a traced map** (I4) — a
                      route, a pickup, a destination and a radius ring over
                      flat colour, with a few abstract road strokes for
                      texture. No street grid is reproduced. The courier is
                      named for her photograph.
```

### Slurp — `ref/inspo/food/32.png`

```
slurpdish audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the dish, full bleed behind the price
          deviations: the board calls one dish two names ("Noodles Ramen" in
                      the hero, "Noodles Twistara" in the sheet); it is
                      Twistara Ramen throughout. The restaurant chip names a
                      real chain on the board; the kitchen here is invented.
                      The board's 170-character blurb is trimmed to 68 (R5).
                      The extras row is invented to fill the band the board
                      crops (I3).

slurpcart audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the cart list
          deviations: **every figure is computed from the lines** (R9). The
                      board types $30.00 over two lines that add to $13.67 and
                      a total of $35.80 that neither number reaches. A third
                      line was added — the one the board's own empty band
                      implies. The "Promo-code confirmed" pill carries ink
                      rather than the board's white, which lands at 2.6:1.

slurppay  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the payment card
          deviations: Mastercard, PayPal and Apple Pay are replaced by three
                      invented schemes with drawn marks (I1/I4). The summary
                      is the cart's own sum.
```

### Fold — `ref/inspo/fintech/05.png`

```
foldhome  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the card stack
          deviations: the VISA and PayPal marks are replaced by two invented
                      schemes set in the app's own type (I1). A card behind
                      renders only the strip that is visible — a full face
                      drawn behind an opaque card leaves its holder and number
                      sitting under it, which audit.js reports as covered text
                      and is right to. The transaction list runs under the
                      bottom edge.

foldcard  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the card being added
          deviations: the country row's **emoji flag** is a drawn disc (I8),
                      built as a white ground with two bands inside it so no
                      two boxes share an edge.

foldspend audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the total-spending figure
          deviations: **every figure is computed** (R9). The board types
                      "Total Spending $1,376.90" over a chart whose bars reach
                      $3k and a category row whose first two entries alone add
                      to $7,814. Here the total is summed from the months, the
                      expense tile is that same sum, and the categories are a
                      breakdown of it. The axis top is the first round thousand
                      at or above the tallest bar, so no bar out-reaches its
                      own gridline.
```

### Vaultix — `ref/inspo/fintech/16.png`

```
vaultperf audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the 8.2% figure
          deviations: **three of the board's typos are corrected** — "Smart
                      Profolio" is a portfolio. The board stops after two
                      tiles and leaves a third of the frame empty; a third
                      tile fills it, and the tiles take the remainder so the
                      screen is full however tall the device is (I3). The note
                      inside a tile is cut dark enough to clear every tint it
                      lands on: the board's grey reads 2.9:1 on its blue.

vaultadvisor
          audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the portrait
          deviations: "wordwide" is worldwide. A credential row was added to
                      fill the band the board leaves under its one line of
                      trust copy (I3).

vaultassets
          audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the $10.4M figure
          deviations: "Total Mange Assets" is managed. A fifth row was added —
                      the one the board crops at its frame edge — and the rows
                      take the remainder so the screen is full to the bottom.
```

### Axis — `ref/inspo/fintech/25.png`

```
axisprofile
          audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: "Function: Cybersecurity"
          deviations: **one scale, read by every number on it** (R9). The board
                      puts a residual score of 5 beside an inherent score of 20
                      on one card and then grades the risk "Very High 5" on a
                      1-5 bar — three scales, none stated. Both scores are on
                      the 1-5 scale the bar uses. The description is trimmed
                      from past 180 characters to 104 (R5).

axisrisk  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the risk title
          deviations: the score bar's filled length **is** the score. The
                      stage chips carry a deeper cut of the board's magenta,
                      which reads 4.3:1 as a letterform and 6.2:1 cut.

axistime  audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the two-series curve
          deviations: both curves are plotted from the series the weekday axis
                      labels, against one axis top, so neither can out-reach
                      the plot. The dot is the solid series' last reading.
```

### Hush — `ref/inspo/music-app/22.png`

```
hushstart audit: no failures (0 warnings)
          foot: 0dp dead  (full-bleed photograph)
          dominant element: the portrait
          deviations: the scrim was deepened past the board's so the body copy
                      clears 4.5:1 over the pale coat (R4).

hushshare audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the contour artwork
          deviations: the board's first share target is **Instagram**; the four
                      destinations here are generic and drawn (I1/I4). The
                      artwork is generated, not traced: one wave displaced
                      twelve times under a single left-to-right colour ramp.

hushmix   audit: no failures (0 warnings)
          foot: 0dp dead  (at the emulator's inset)
          dominant element: the "Sleep" session card
          deviations: the five cards share the remainder so the stack is full
                      to the Play pill. The chips carry a token cut for the
                      chip's own ground: the page's muted grey reads 4.1:1
                      there (R4).
```

---

## Once, for the batch

**Substitute typefaces, and what each cost.**

| App | Board's voice | Substitute | Cost |
|---|---|---|---|
| Paws, Nook, Cocoa | geometric sans | Plus Jakarta Sans | ~3% wider at matched cap height; sizes pulled back a step on the display lines |
| Orla, Vaultix | editorial serif | Instrument Serif | runs *narrower* at matched cap height, so every display sits a step larger than the board's apparent size |
| Pulp, Fold, Axis | grotesque | Plus Jakarta Sans | close; no compensation needed |
| Slurp | single-storey geometric | Poppins | within 2% on width-to-cap; Outfit, the other candidate, runs 12% narrow |
| Hush | neutral sans | Plus Jakarta Sans | close |

Every face is registered **per weight** in `src/theme/fonts.ts` and imported by
subpath, never through the package barrel.

**Stock standing in for brand photography.** Every photograph in this batch is
free-licensed Pexels stock, baked by `tools/bake/<app>.py` and credited per
showcase in `assets/images/<slug>/CREDITS.md`. Nothing is hotlinked; a
recording never depends on the network. Every baked frame was checked at 1:1
for other brands' marks — jackets, labels, signage — because a contact sheet
cannot show a 40px logo.

**Subjects changed because they were out of drawing range.**

- **Kiln** — the board is a watch marketplace. Every stock watch frame with a
  usable dial carried a legible brand mark, so the subject is studio ceramics,
  which keeps the app's plot intact. Detailed above.
- **Pulp's map** — a map has no idea to interpret, so vectoring one is tracing
  it path by path. What is built is the map *idea*: a route, a pickup, a
  destination, a radius ring and a few abstract road strokes over flat colour.
- **Hush's artwork** — a generated session has no cover to photograph, so the
  contour field is generated in code and the motive disc is a drawn gradient.

**Brands invented rather than reproduced.** Fold's two card schemes (VOLTA,
ORBIT PAY) stand in for VISA and PayPal; Slurp's three payment methods (Nova
Card, Driftpay, Tapwell) stand in for Mastercard, PayPal and Apple Pay;
Slurp's kitchen (Hanan Kitchen) stands in for a real fast-food chain; Hush's
share row is generic where the board names Instagram. Every mark that replaces
one of these is drawn from scratch, never traced.

**Calls that were mine rather than the board's.**

1. **Orla's page is cream, not sage.** The board's sage is the backdrop the
   phones are posed on; taken as the page it put white type at 2.91:1.
2. **Every emoji in the batch is drawn.** Pulp's category chips, Pulp's tags,
   Fold's country flag. Emoji differ across Windows, Android and iOS and flags
   are missing outright on Windows.
3. **Every figure that a board typed is now computed.** Slurp's cart and
   checkout, Fold's activity screen, Axis's risk scores and timeline. Four
   boards carried numbers their own content contradicts.
4. **Five rows that boards crop were invented**, because the alternative is a
   band of empty canvas and padding is never the fix: Slurp's extras, Slurp's
   third cart line, Vaultix's third tile, Vaultix's credential row, Vaultix's
   fifth stat row.
5. **Nothing reserves the indicator's strip.** Eleven batch-6 layouts had a
   footer of `insets.bottom + N`; all eleven are now a fixed clearance. When
   the app is not edge-to-edge the system already holds that space, and
   padding a pinned surface by the inset counts it twice — the defect that put
   an empty band under four screens of a deleted batch.
6. **Four boards' typos are corrected silently**: Profolio → portfolio,
   wordwide → worldwide, Mange → Managed, and one dish with two names.

---

## Gate status

| Gate | State |
|---|---|
| `audit.js` over all 33 | **exit 0, no warnings** |
| `foot.py` over all 33 | **0dp dead at the emulator's inset** |
| `dockcheck.js` over all 33 | **exit 0** - see the note below |
| Sign-off (I6) | **given**, off the wall on 8082 |
| `stage.js` over all 33 | **20-30 steps each**, floor is 20 |
| `blank.js` over all 33 | **exit 0** - nothing but the ground |
| `stepshots.js` + `stepdiff.py` | **no zero-diff step, no step that errors** on all 33; the oversize steps are listed below |
| `run.py verify` over all 33 | **every staged file byte-identical to finished** |
| `run.py rehearse` over all 33 | **preflight + replay + typecheck clean**, per screen |
| `npx tsc --noEmit` across `src/` | **clean** |
| `npx expo export --platform android` | **succeeded from the finished state**, 4.7MB bundle |
| `run.py lock` over all 33 | **baseline recorded**; a deliberate edit to `src/features/hushmix/theme.ts` made preflight report `DRIFT` and exit 1, then restored |
| Resting state | **blank**, all 33 |
| The wall on 8082 (I10) | **rebuilt**, 93 screens, every batch-6 thumbnail re-shot from its finished state |
| Dev server | **stopped**, port 8082 free |

**The one `dockcheck.js` advisory.** `hushshare` prints `off-centre`: the probe
picks the share-target row (four 62dp discs with captions) as a "bar". Its box
is exactly its content — 62 disc + 10 gap + 16 caption = 88 — so there is no
dead height in it. The skew comes from the probe measuring the *glyph* extents
inside the discs rather than the discs themselves. `dockcheck.js` exits 0.

---

## What the step probe found

`stepdiff.py` is the gate RULES §8.2-5d says to build first, and this is the
first batch it has been pointed at from the start. It found **ten bugs in the
stager** and a class of screen-level defects underneath them. Every one of
these was spending beats of every reveal in this batch, and in the batches
before it, without anything saying so.

### In `tools/timelapse/stage.js`

1. **A shell that paints nothing was a step.** A component whose root is a bare
   positioning box — a margin, a height, no fill — mounted as a step that
   changed exactly 0.0000% of the frame, and its first child landed a step
   later. Two beats for one event. The mount is now merged with its first
   child.
2. **That merge read the wrong lines.** It asked "does the shell paint?" over a
   fixed window above the first child, which caught the *style constants* most
   components declare before their JSX — `item-header` has a
   `const round = { … backgroundColor }` for its discs, so its transparent root
   read as painted. It now reads from `return (` down.
3. **A mark was staged shape by shape.** A paw drawn as five circles, a
   wordmark's three bars, a glyph inside a disc: 0.006%–0.02% each. The stager
   no longer descends into an `<Svg>` under 48dp, and a lone mark is merged
   into whatever paints around it — including when the mark is the child that
   stays live, where the mount took the next element with it.
4. **A JSX comment was a block.** `promo-card` explains in a comment why its
   headline stops short of the piece beside it; the stager staged the
   explanation. A step labelled "the next block", 0.0000%.
5. **`{children}` was a block.** `Folder` is a layout primitive that renders
   its children over two fills. Staged, that one line held back the entire card
   face — the wordmark, the number, the holder and the expiry each measured
   0.0000% until step 11, because the component they were in was rendering none
   of them. A primitive's slot belongs to its caller.
6. **`sections.popular` counted as a use of `popular`.** A bare word boundary
   matched the property half of a member expression, so pawshome's products
   were attributed to the section *heading* and revealed one step before the
   grid that draws them mounted.
7. **Reading an array is not drawing it.** `cart-header` reads `lines.length`
   for its badge and mounts four steps before `cart-lines`, so the rows were
   revealed onto a screen with nothing to draw them. An array now goes first to
   a component that *maps* it.
8. **The stray-gap mistake displaced nothing.** A column with a `flex: 1`
   spacer absorbs a gap exactly; a screen whose controls are absolutely
   positioned has nothing in the column to push; and a gap above a photograph
   moves every pixel of it (16.9%–37.8%). The mistake is now a floating rule
   with a fill, written as the **root's** last child so nothing paints over it,
   and it is one line so the FIX op's needle still matches.
9. **`HEIGHTS[3]` was `undefined`.** Raising the mistake cap to four — the
   merges above cost every sparse screen a real beat — wrote
   `<View style={{ width: undefined, height: undefined }} />`, a 0dp spacer.
10. **A mistake written during the walk was overwritten.** `wrapBlock` rewrites
   the same line when it reaches the last block, so the mistakes vanished from
   the file while still being counted against the floor. They are buffered and
   written after the walk.

### In the screens

- **`flex: 1` makes every step repaint the column.** Four tiles that share the
  remainder resize each other as they arrive, so one tile landing measured
  52.1%, then 27.1%, 29.2%, 31.1%. The same on vaultassets, axisprofile,
  axisrisk and hushmix. Heights are now worked out from the window in
  `layout.ts` — the screen still fills (I2/I3), and a card lands without moving
  the ones above it. vaultperf went from five failures to none, largest step
  52.1% → 11.1%.
- **A staged entry past the edge of a scroller paints nothing.** pawshome's
  fourth pet chip, cocoahome's third pack, orlafind's third ring, pulphome's
  fourth category, foldspend's fourth category and third transfer. Either the
  row was narrowed so the entry reaches the frame — which is what the board
  shows, a cropped last chip — or the entry was dead data and went.
- **Two colours seven levels apart are not a visible change.** Slurp's card
  tone was `#F3F3F3` on a `#FAFAFA` page: under the probe's noise floor, and
  under the eye's. Now `#EDEDED`.
- **A ground drawn twice.** pulptrack's map painted a full-bleed rect in the
  colour the page already was.
- **A curve through one point draws nothing.** axistime's two series were
  staged mark by mark while `days` still held a single entry. The chart is one
  `.map` now, baseline included, so it arrives as the one element it is.
- **A bare glyph control is sixty pixels of ink.** orlaring's header, hushmix's
  and hushshare's. They have the disc grounds the rest of the batch uses, which
  is also what makes them read as controls.

### What the probe says now, per screen

All 33 screens: **no zero-diff step, no step that errors, every screen over the
20-step floor.** Thirteen have no finding at all - `pawshome`, `nookstart`,
`nookroom`, `kilnfind`, `slurpcart`, `slurppay`, `foldhome`, `vaultperf`,
`vaultassets`, `axistime`, `hushstart`, `hushshare`, `hushmix`.

The remaining twenty each carry one or more steps over the 15% ceiling. Every
one is **a single element that is simply large**, and each is listed here rather
than tuned away:

| Screen | Steps | Largest | The oversize steps | What they are |
|---|---|---|---|---|
| `pawstart` | 25 | 42.4% | 1 (42.4%) | hero photograph - also the largest step, so step 1 does the most work |
| `pawsitem` | 23 | 36.2% | 8 (36.2%) | product photograph on its halo |
| `nookshop` | 23 | 19.9% | 15 (15.5%), 16 (16.0%), 19 (19.9%) | the piece grid's shell, its first piece, the promo image |
| `cocoahome` | 22 | 32.3% | 13 (32.3%), 14 (20.0%) | the pack rail's shell, its first pack |
| `cocoaitem` | 21 | 47.7% | 10 (47.7%) | item photograph |
| `cocoacart` | 23 | 84.0% | 5 (84.0%), 21 (15.1%) | the dark sheet's ground, the pay button |
| `orlafind` | 21 | 37.2% | 19 (37.2%) | the ring rail's first photograph |
| `orlafit` | 25 | 55.9% | 8 (55.9%) | the camera frame |
| `orlaring` | 23 | 37.9% | 9 (37.9%) | ring photograph |
| `kilnview` | 20 | 18.4% | 5 (18.4%) | the piece on its stage |
| `kilnitem` | 21 | 72.8% | 1 (72.8%) | full-bleed photograph - also the largest step |
| `pulphome` | 24 | 18.4% | 15 (18.4%), 16 (17.9%) | the bottle list's shell, its first bottle |
| `pulpitem` | 24 | 32.9% | 2 (32.9%) | bottle photograph |
| `pulptrack` | 27 | 28.8% | 1 (23.4%), 7 (28.8%) | the map ground, the sheet's ground |
| `slurpdish` | 27 | 35.7% | 3 (33.6%), 11 (35.7%) | the dish photograph, the sheet's ground |
| `foldcard` | 29 | 21.7% | 3 (21.7%) | the card's lime fill |
| `foldspend` | 29 | 19.7% | 6 (19.7%) | the chart card's ground |
| `vaultadvisor` | 20 | 41.8% | 2 (41.8%) | the portrait |
| `axisprofile` | 25 | 38.1% | 13 (38.1%), 16 (19.0%) | the fact card's ground, its first tinted cell |
| `axisrisk` | 28 | 22.8% | 9 (22.8%) | the fact card's ground |

**Three classes, and none of them is fixable without breaking another rule.**

1. **A full-bleed or hero photograph.** It is one element; there is nothing to
   descend into. The alternatives are to slice a bitmap into bands, which is
   staging a picture rather than a screen, or to raise `--max-frac` until the
   probe stops reporting. `pawstart` 42.4%, `kilnitem` 72.8%, `orlafit` 55.9%,
   `cocoaitem` 47.7%, `vaultadvisor` 41.8%.
2. **A surface's own ground.** I9 says nothing may paint in frame one but the
   page's ground, so a sheet's or a card's fill is moved off its container onto
   an absolutely-filled child. That child necessarily paints the whole region
   when it lands. `cocoacart`'s 84% is the dark sheet arriving; the only way to
   make it smaller is to leave the fill on the container, which means the take
   opens on the sheet already there.
3. **One large tile of a rail or grid.** `cocoahome`'s packs, `nookshop`'s
   pieces, `pulphome`'s bottles, `axisprofile`'s tinted cells. Each step is one
   entry; the entry is a third of the frame because the design makes it one.

**Two WARNs stand.** `pawstart` and `kilnitem` open on their photograph, so step
1 is the largest step. Both boards are a full-bleed image with the interface on
top of it - the photograph *is* the page's ground - and revealing the overlay
first would film the screen backwards.

Raising the threshold was not taken. That is the exact move that hid a whole
batch of over-long dock bars when `dockcheck.js` was taught to subtract the
padding it should have been measuring (I11).
