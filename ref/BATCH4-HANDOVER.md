# Batch 4 — handover

**35 screens, 11 boards, one showcase per screen.** Reference class: design shot
→ inspo brief, so `INSPO-RULES.md` governs and rule 1 (pixel perfect) is off.

**State: built and through the design bar. Nothing is staged, locked or
recorded.** That is deliberate — I6 puts sign-off *before* staging, because a
screen restaged after a layout change is a staging pass thrown away. The next
step after your review is Step 9 onward.

**`http://localhost:8082/` is now a catalog of all 35** — tap a thumbnail to
open that screen. Individual screens are still at `/<slug>`.

---

## The catalog

`src/app/index.tsx` used to redirect to one slug. It now renders
`src/components/catalog/catalog.tsx`: every showcase as a wall of thumbnails,
grouped by app, three columns at phone width and up to eight on a laptop.

- **It is repo chrome, not a showcase.** It lives in `src/components/`, not
  `src/features/<slug>/`, so `lock` and `preflight` do not track it and
  `showcase.js wipe` will not take it with the screens.
- **`index.tsx` is still a derived file.** `showcase.js use`, `rm`, `wipe` and
  `record.js` all rewrite it as a boot redirect — which is right for a take,
  since the device should open straight on the screen being filmed.
  **`node tools/showcase.js catalog`** puts it back afterwards. That command is
  new.
- **`python tools/catalog.py`** shoots every screen and rebuilds the
  thumbnails and `src/components/catalog/shots.ts`. `--data` rebuilds the data
  file only. The dev server must be up; set `EXPO_PORT=8082`.
- **The grouping is derived from the slugs**, not a hand-kept list, so a new
  showcase joins its app on its own. The group is the *shortest* prefix a slug
  shares with a sibling — which is what separates `globe` from `globesta`,
  since `globestart`/`globestay` share eight characters but
  `globestart`/`globehome` share five.
- **Cost:** 35 JPEGs at 210×455, 629KB total. The Android export went from 125
  to 160 assets; the JS bundle is unchanged at 4.6MB.

**The thumbnails go stale the moment a screen changes.** Re-run
`tools/catalog.py` after any layout pass — a catalog showing last week's
screens is worse than none.

One screen out of 35 failed to shoot on the first full run (headless Chrome
dropped the connection) and was quietly left out of the catalog. `catalog.py`
now retries once and reports a double failure loudly, because a transient miss
silently dropping a screen is worse than the failure itself.

---

## The gate, as it stands

| Check | Result |
|---|---|
| `npx tsc --noEmit` across all of `src/` | **clean** |
| `npx expo export --platform android`, dev server stopped | **Exported** — 4.6MB bundle, 160 assets |
| bundled image formats | 117 JPEG — 82 screen images (87 source files, 5 deduped by content) + 35 catalog thumbnails. **No AVIF, no WebP.** |
| every catalog route and thumbnail resolves | **35 / 35** |
| `audit.js` × 35 | **no failures on any screen** |
| `foot.py` × 35, at the harness's `59,0,34,0` | **all ≤ 24dp**, worst is `sonicplay` at 23dp |
| `CREDITS.md` per showcase | **35 of 35** |

Not yet run, because they come after sign-off: `stage.js`, `gen.js`,
`stepshots.js` / `stepdiff.py`, `blank.js`, `verify`, `rehearse`, `lock`,
`record.js`.

---

## Changes to the tooling

Four, and three of them were found because a measurement disagreed with the
screen rather than because anything looked wrong.

### `audit.js` — a photograph is not decorative ground

`tools/preview/audit.js` was wrong about what counts as content, and it was
hiding real failures.

Its own comment said the line between *decorative ground* and *a full-bleed
photograph* is `<img>`. Under react-native-web an `<Image>` never renders as
an `<img>` — it is a div carrying a `background-image`. So **every full-bleed
photograph in this repo was being read as decorative ground**: `globestart`,
whose entire middle *is* its photograph, reported 375dp of empty canvas, and
`tamarstart` had been reporting its content as starting 418dp down the screen.

The test is now "is it a bitmap" (`IMG`, or a `background-image: url(...)`),
which is what the comment always meant. A full-screen `<svg>` gradient is still
excluded, so the check the comment was protecting — "an onboarding screen with
a radial-gradient background passed with 190dp of empty ground under its hero"
— still bites. It bit `quranone` during this batch and was fixed properly: the
illustration was pulled out of the full-bleed ground into a sized block of its
own.

All 35 screens were re-audited after the change.

### `stepshots.js` — a stability settle cannot see staleness

The per-step probe settled each step by capturing until two consecutive frames
were byte-identical. **A page Metro has not rebuilt yet is perfectly still**, so
that test returned the stale frame on the first comparison. Because the probe
never actually waited, it out-ran Metro and built up a backlog:

```
vitalstats, old settle            vitalstats, fixed settle
  4..17   0.00%  ZERO  x14          7   0.31%   text
  18     54.10%  BIG               ...
                                   15  17.33%   name
                                   16  11.85%   "David Bennett"
```

Fourteen stale frames and then the catch-up, from a screen that renders
correctly. `compact.py` merges every step the probe reports as painting
nothing, so it folded those fourteen good steps into one 54%-of-the-frame beat
— and `stepdiff.py` then failed the merge as a rule 0.3 violation. **Every
earlier per-step number in this batch was an artifact of that**, including the
oversized-step count.

The settle now waits in two phases: first for the frame to *differ from the
frame before the write* (bounded at 5s, about twelve times the rebuild latency
measured here), then for it to stop moving, because a photograph decodes in
more than one pass. Each step records whether it waited out the whole window,
which turns "paints nothing" from a guess into a measurement; `compact.py`
refuses to run against frames that lack it; and `stepdiff.py` warns on the
signature itself — a run of zero-diff steps followed by one huge step is a
probe falling behind, not a reveal that is wrong.

### `stepshots.js` — the error detector was wrong in the quiet direction

It matched a list of message openings, and the list carried
`Unhandled ... Error` but not `Uncaught Error`, which is the heading the runtime
overlay actually uses. `crypinconfirm` red-screened at step 6 with `T is not
defined` and the probe recorded nothing, so **a whole pass over 35 screens
reported no errors while a screen was broken.** It now asks a structural
question first — is the overlay's own chrome (`Component Stack`) in the DOM? —
and only then looks for the message line.

### `stage.js` — an import is attributed by what it binds, not by its filename

`importsAt` guessed a component's JSX tag from the module path, so
`components/text` became `<Text`. Nothing matches that, because the module
exports `T`; the import fell through to the end of the plan and was revealed
six steps *after* the block that used it, which is the red screen above. It now
reads the bound names off the import statement, and the no-match fallback is
the **first** block rather than the last: an import revealed early is an unused
binding for a few steps, one revealed late is a crash the moment anything above
it mounts.

### `stage.js` — an import list is a declaration, not a use

`bodyOf` strips a file's imports before asking "does this component render that
array", because an import is availability, not use. It stripped import *lines*:
a braced multi-line import leaves `  months,` on a line of its own, which
begins with neither `import` nor a comment, so the filter kept it. All six of
`vitalday`'s components import every export of `../data/day`, so **every one of
them "read" every array** and the first block claimed all four — fourteen
entries revealed before the charts that draw them had mounted. Fourteen
zero-diff steps, and then 24% of the frame in one lump when the chart arrived.

It now strips whole import statements. The code comment had the intent right
all along; only the implementation missed the multi-line case. Five showcases
were affected, 13 of 77 keyed arrays: `vitalday`, `sonichome`, `globestay`,
`tamargym`, `vitalprog`.

A second, looser sweep follows it. `vitalprog`'s `calorieSeries` is read only
through `_prog-parts-shared`, which no block mounts, so the precise pass alone
would leave it unclaimed and never staged — losing exactly the beats the fix
was meant to win. Anything still unclaimed falls back to the declaration-level
test.

### `stage.js` — a staged gap below a block cannot paint

The staged mistake is a stray `<View style={{ height: 23 }} />`, and it was
inserted *under* its block. A reveal runs top down, so the step that reveals it
runs while the space under that block is still empty: there is nothing there to
push, and the step paints nothing. **Every staged gap in the batch measured
0.00%, both the break and the fix** — six dead steps on a screen with three
mistakes, and six beats of video showing nothing happening.

It is now inserted above the block, where it displaces the block itself, which
is already on screen by then. `zonestart` went from 11 painting steps to 17 on
that change alone.

---

## Where the step floor actually stands

The fixed probe changed what the floor has to be measured against.
`stage-all.py` reports `planned` — what the planner laid out — and `painting` —
what survived compaction because it changed the screen. **The recording plays
the compacted steps**, so `painting` is the number RULES 0.5 and I5 are about,
and it is the number quoted per screen below. `planned` was 27–40 almost
everywhere; `painting` was the number that had never been looked at.

---

## App-level notes

### Typefaces

Every screen uses **Plus Jakarta Sans** as the substitute for the board's
proprietary face, except:

- **Vital** (5 screens) sets its headings in **Instrument Serif**, the free
  stand-in for the board's display serif. At matched cap height it runs a
  little narrower, so the headlines are set a step larger than a straight
  conversion would give.
- **Twirlo** sets its wordmark in **Caveat**; the board's is a hand-drawn
  logotype that cannot be obtained.
- **Qurania** drops the board's **Arabic lockup entirely**. Plus Jakarta Sans
  carries no Arabic glyphs, so it would render as tofu on Android — the class
  of failure §4.4 says to design out rather than catch by running the app. The
  latin wordmark carries the brand instead. Same call on **Tamarran**.

### Brands that are not ours to ship

Five boards lean on real companies. None of it is reproduced:

| Board | What it used | What is there now |
|---|---|---|
| Food Zone | McDonald's marks and name throughout, "Big Mac Burger", DoorDash in the legal line | "Food Zone", invented restaurants, drawn marks |
| Lumi | Netflix, Envato, Figma in the transaction list; McDonald's on the holding page; a Mastercard mark on the card | Nimbus Play / Verdant Co / Gridwork / Voltspark; "Meridian Foods"; a contactless wave |
| Sonic | The Weeknd's *Starboy* sleeve, an Eminem sleeve, those artists' names, the SoundCloud wordmark | Invented artists and releases, stock photography as sleeves, "Explore Sonic" |
| Tamarran | "GymNation Stars", "GMAX GYM" at a real street address | "Atlas Strength" on an invented street |
| Twirlo | "Twinlo" | "Twirlo", invented names |

### Photography

Free-licensed Pexels stock throughout, bundled locally, nothing hotlinked,
credited per showcase. Six bake scripts: `vesta.py`, `lumi.py`, `tamar.py`,
`zone.py`, `vital.py`, `sonic.py`, `twirl.py`, `globe.py`.

**Three frames were rejected at 1:1 for other brands' marks** — the exact check
Step 5 exists for, and none of them was visible on a contact sheet:

- **Pexels 16996376** (tamarstart) — a circular club crest dead centre of the
  tank top, unavoidable in any crop that keeps the subject.
- **Pexels 9545914** (tamarfind) — a Concept2 wordmark on the erg.
- **Pexels 16235687** (sonic) — a RODE wordmark across the microphone body.

Two more are *cropped around* rather than rejected: **Pexels 27988502**, the
Food Zone hero burger, has a Coca-Cola can at the left, so every crop from it
starts at 26% of the width; **Pexels 28701960**, the Vesta hoodie, has a small
chest logo at ~57% height, so every crop stops above it — which is why that
product shot is a head-and-hood rather than a full torso.

### Subjects changed because they were out of drawing range

- **Food Zone's category tiles are six photographs**, not six drawn icons. I4
  names this as the single thing that most makes a screen read as a toy.
- **Both maps are built as the map *idea***, not traced: a land tone, a park, a
  river, a road grid, and — on `zoneroute` — a route polyline with its two ends
  and the rider on it. No real place is depicted; every street name is
  invented. (`tamarfind/components/map-ground.tsx`,
  `zoneroute/components/route-map.tsx`.)
- **Lumi's card is rebuilt as a real component**, posed and shadowed, rather
  than traced off the board's 3D render (§2.2).
- **Qurania's domes, arches, minarets and crescents are drawn**, which is in
  range: a dome silhouette is an idea expressed as a flat shape, and the board
  draws it the same way.

### Calls that were mine, not the board's

Sections added because the board cropped them and I3 says the fix for empty
space is the row the board cut, never a spacer:

| Screen | Added |
|---|---|
| `crypinhome` | three more market rows (SOL, ADA, LINK) |
| `crypinswap` | the rate line |
| `crypinconfirm` | the route timeline and the net-receive row |
| `vestabrowse` | the results/sort row, two more products |
| `vestaitem` | the delivery row; per-size stock and a sold-out state |
| `lumistock` | nothing — the board's own stats row, derived |
| `tamargym` | the facts strip (hours, floor area, classes) |
| `zonehome` | the "Fastest Delivery" list |
| `zoneroute` | the whole sheet under the map |
| `zoneitem` | a fourth add-on; the total on the button |
| `vitalweight` | the prediction card |
| `globestay` | the shot rail and the stay total |

---

## Per screen

Every line below is `audit.js` and `foot.py` output, not an impression.

**The warnings are almost all one kind.** 161 of the 167 are `TAP`: a control
the board draws under 44dp. R7 says that is a WARN by default, because the
reference drew it that way, and the fix is `hitSlop` — which every one of them
carries. Inflating them to 44dp of real box would open exactly the gaps R1
exists to catch. Where a screen has a warning of another kind it is named.

### booking-app — Romeo

```
romeospot      audit: no failures (8 warnings: all TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the restaurant hero photograph
               deviations: accent darkened #109E87 -> #0B8169 (3.35:1 failed R4)

romeobook      audit: no failures (3 warnings: all TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the date strip
               deviations: notes box absorbs the slack so the foot cannot band

romeodate      audit: no failures (3 warnings: all TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the open month calendar
               deviations: calendar absorbs the slack
```

### crypto-wallet — Crypin

```
crypinhome     audit: no failures (14 warnings: all TAP, hitSlop'd)
               foot: 16dp dead  (floating dock clears the home indicator — R1b's
                     stated exception)
               dominant element: the $25,540.23 portfolio figure
               deviations: the board lets its last market row run BEHIND the dock.
                     Copied, that failed R2 CLIPPED and R3 COVERED (covering text
                     is a FAIL outright), so the list sizes to whole rows that
                     land on the dock. Three coins added rather than scaling the
                     blocks up. All money derived from one PRICE table: the board
                     prices 0.001 BTC at $110.43 while quoting BTC at $123,832.82,
                     and prints +$214.67 as +1.74% of $25,540.23 (it is +0.85%).

crypinswap     audit: no failures (8 warnings: all TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the 0.001 amount being typed
               deviations: receive figure derived, so it reads 123.83 not the
                     board's 110.43. Keypad absorbs the slack.

crypinconfirm  audit: no failures (2 warnings: both TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: "BTC to USDT"
               deviations: fee is 0.2% of the real amount (the board's "0.2%
                     (≈0.97 USDT)" is four times its own rate). Route timeline
                     and net-receive row are mine.
```

### ecommerce-app — Vesta

```
vestahome      audit: no failures (11 warnings: all TAP, hitSlop'd)
               foot: 0dp dead  (grid runs under a floating dock, 1.31 screens)
               dominant element: the black Super Sale promo card
               deviations: lime is a fill only — lime on white is 1.6:1. Promo
                     photo blended with a gradient rather than cut out.

vestabrowse    audit: no failures (10 warnings: all TAP, hitSlop'd)
               foot: 0dp dead  (1.44 screens)
               dominant element: the product grid
               deviations: results/sort row added; six products not four.

vestaitem      audit: no failures (3 warnings: all TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the product photograph
               deviations: "Add to cart", not the board's "Add to card".
                     Sold-out size is a TEXT strike, not a line drawn across the
                     label — a line was an R3 FAIL and an R4 FAIL at 1.96:1.
                     Hero is a head-and-hood shot because the source carries a
                     chest logo (see Photography).
```

### fintech — Lumi

```
lumistart      audit: no failures (3 warnings: 1 TAP; 1 GAP 48dp; 1 COVERED)
               foot: 18dp dead
               dominant element: the posed card
               GAP 48dp: the breathing room between the mark and the card deck,
                     at the WARN threshold, not inside the artwork.
               COVERED: the two cards of the deck overlap — that is the deck.
               deviations: card rebuilt as a component (§2.2); Mastercard mark
                     replaced with a contactless wave; link green darkened to
                     clear 4.5:1 (it was 4.45).

lumihome       audit: no failures (4 warnings: all TAP, hitSlop'd)
               foot: 12dp dead
               dominant element: the $31,298.92 balance
               deviations: balance = opening + every transaction below it.
                     Merchants invented.

lumistock      audit: no failures (2 warnings: both TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the $168.99 price
               deviations: company invented. All four board figures were
                     impossible and are now derived from the series — a move
                     twelve times the price, a rate beside a share count, an
                     eight-figure daily range on a $168 share, and a $13,000
                     label on a share-price axis.
```

### fitness-tracker — Tamarran

```
tamarstart     audit: no failures (1 warning: TAP on the account link, hitSlop'd)
               foot: 0dp dead
               dominant element: the full-bleed gym portrait
               deviations: Arabic lockup dropped (tofu risk); body trimmed from
                     127 to 77 characters.

tamarfind      audit: no failures (9 warnings: all TAP, hitSlop'd)
               foot: 14dp dead
               dominant element: the map
               deviations: the map is the map IDEA, not a trace. Venues and
                     street invented. Card grew 196 -> 236dp because its own
                     rows were colliding with the Reserve button (R3 FAIL).

tamargym       audit: no failures (1 warning: TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the venue photograph
               deviations: "Coffee Shop", not the board's "Coffe Shop".
                     Pricing derived from one table — the board's "253,000"
                     beside "200,00/mo" is two currencies and no relationship.
                     Reserve is the last block in the column, not a pill over
                     the cropped paragraph (R3: covering text is a FAIL).
```

### food — Food Zone

```
zonestart      audit: no failures (1 warning: TAP, hitSlop'd)
               foot: 18dp dead
               dominant element: the burger
               deviations: brand and legal line fictional. Burger bled into the
                     red with gradients rather than cut out.

zonehome       audit: no failures (8 warnings: all TAP, hitSlop'd)
               foot: 11dp dead  (1.22 screens)
               dominant element: the 15% promo figure
               deviations: SIX PHOTOGRAPHIC CATEGORY TILES, not drawn icons.
                     "Fastest Delivery" list added — without it the board's
                     layout left 91dp of empty canvas above the tab bar (GAP
                     FAIL). The search bar straddles the header's lower edge:
                     that is the board's design and it crosses an edge, never
                     text.

zonemenu       audit: no failures (8 warnings: all TAP, hitSlop'd)
               foot: 0dp dead  (1.03 screens)
               dominant element: the restaurant name under the banner
               deviations: every was-price is derived from the offer above it.

zoneroute      audit: no failures (3 warnings: all TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the route line
               deviations: map is the IDEA. Distance is the summed polyline and
                     the ETA follows from it. The sheet is mine. Street labels
                     were moved twice: under the controls and under the sheet
                     they were text painted over, an R3 FAIL.

zoneitem       audit: no failures (9 warnings: all TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the dish photograph
               deviations: "Add to cart" not "Add to card"; "Add ons for Burger"
                     not "Bourger". The button carries the total; the board's
                     carries nothing.
```

### health — Vital

```
vitalcycle     audit: no failures (9 warnings: all TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the serif headline
               deviations: "advanced", not "advanceded". Promo copy rewritten —
                     the board's is a sentence with no verb and a trailing comma.
                     The day figures carry a unit; the board's "2.5" carries none.

vitalweight    audit: no failures (1 warning: TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the weight line
               deviations: "Avg Wt 03.7 Kg" beside a current of 67.0 is not an
                     average of anything on its own screen. Every tile derived.
                     Prediction card is mine.

vitalprog      audit: no failures (1 warning: TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the 392 kcal figure
               deviations: the headline is the sum of its own sparkline; each
                     row's percentage is the share of its own week strip.

vitalstats     audit: no failures (1 warning: TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the serif headline
               deviations: THE BOARD'S LEADERBOARD IS OUT OF ORDER — it ranks
                     1,500 pts above 2,458. Rank is derived from score here.
                     Its stat strip also used a comma as both a decimal point
                     and a thousands separator in the same row.

vitalday       audit: no failures (3 warnings: 1 TAP; 2 COVERED)
               foot: 0dp dead
               COVERED x2: the "?" inside an unknown day's ring. It sits wholly
                     inside that ring by construction; the probe compares two
                     <svg> boxes and reports the nesting.
               dominant element: the month bar chart
               deviations: headline rewritten — "By tracking these area
                     consistently score" is not a sentence. The average marker
                     is the real mean of the bars. Bar label set in ink: white
                     on the board's orange is 2.68:1 and fails R4.
```

### music-app — Sonic

```
sonichome      audit: no failures (14 warnings: all TAP, hitSlop'd)
               foot: 12dp dead  (floating dock)
               dominant element: the popular-songs rail
               deviations: every sleeve, artist and title invented. Playlist
                     sizes to whole rows above the dock — at three rows regardless
                     the last row's text sat under the pill, an R3 FAIL.

sonicplay      audit: no failures (4 warnings: all TAP, hitSlop'd)
               foot: 23dp dead  (the LYRICS handle clears the home indicator)
               dominant element: the sleeve
               deviations: a square sleeve cannot be wider than the page, so the
                     leftover height is SHARED ACROSS FIVE GAPS — dumped into one
                     it opened a 105dp hole (GAP FAIL). Scrubber position is
                     computed from the two clocks; the board's bar sits at a
                     quarter while its times read 37%.

sonicexplore   audit: no failures (5 warnings: all TAP, hitSlop'd)
               foot: 12dp dead  (floating dock)
               dominant element: the featured tile rail
               deviations: "Explore Sonic" — the board names a real service.
                     Genre tints chosen to carry white at 4.5:1; the board's
                     pale pink and cyan do not.
```

### onboarding-app — Qurania

```
quranone       audit: no failures (1 warning: TAP on Skip, hitSlop'd)
               foot: 0dp dead
               dominant element: the dome and crescent
               deviations: Arabic lockup dropped (tofu risk). Body punctuated —
                     the board's has no commas at all. The crescent is ONE PATH
                     with fillRule evenodd: a second filled disc has to match a
                     gradient behind a halo, and reads as a dark circle instead
                     of a hole.

qurantwo       audit: no failures (1 warning: TAP on Skip, hitSlop'd)
               foot: 0dp dead
               dominant element: the arch window
               deviations: as above; skyline clipped to the arch with a ClipPath
                     so nothing can spill past the frame.

quranthree     audit: no failures (1 warning: TAP on Skip, hitSlop'd)
               foot: 0dp dead
               dominant element: the great dome
               deviations: as above.
```

All three: the illustration is a SIZED BLOCK, not part of the full-bleed sky.
Left inside the ground it read as 488dp of empty canvas and R1 failed it.

### social-media-app — Twirlo

```
twirlfeed      audit: no failures (10 warnings: all TAP, hitSlop'd)
               foot: 15dp dead
               dominant element: the post's photo collage
               deviations: THE THINNEST SPEC IN THE BATCH — one phone, tilted,
                     held in a hand, most of its copy illegible. More of this
                     screen is my judgement than any other.
                     Post copy rewritten (the board's reads "...think you New
                     York chcfm unforgetable show."). "You and 8,906 others" is
                     the like count less the viewer. Unread badge darkened from
                     the board's red: white on it was 4.34:1 at 9dp.
```

### travel-app — GlobeGo

```
globestart     audit: no failures (0 warnings)
               foot: 0dp dead
               dominant element: the coastline
               deviations: none beyond sizing for a real phone.

globehome      audit: no failures (7 warnings: all TAP, hitSlop'd)
               foot: 14dp dead  (1.20 screens)
               dominant element: the greeting
               deviations: the waving-hand emoji is DRAWN — emoji differ across
                     Windows / Android / iOS and the web render cannot see that.
                     Each card's rating is its own number; the board prints 5.0
                     on every card.

globestay      audit: no failures (2 warnings: both TAP, hitSlop'd)
               foot: 0dp dead
               dominant element: the lake photograph
               deviations: THE BOARD HEADS THIS SCREEN "Lake Como" OVER A
                     PHOTOGRAPH OF VENICE. The hero here is a lake under
                     mountains, so the picture and the name agree.
                     "Schedule Overview", not "Scehdule". Shot rail and stay
                     total are mine.
```

---

## What I would look at first

Four screens where I made the largest calls and would most like a second
opinion:

1. **`twirlfeed`** — the spec is one tilted phone; most of it is mine.
2. **`zoneroute`** and **`tamarfind`** — both maps are built rather than
   sourced. If you would rather have a real static tile, that is a swap.
3. **`crypinhome`** — the one screen you have already called out. The dock, the
   glow and the thin bled cards are the rebuild; the list no longer runs under
   the dock, which is a deliberate departure from the board.
4. **`lumistart`** — its 48dp gap sits exactly at the WARN threshold. If the
   card deck should be larger instead, say so and I will rebalance it.
