# Batch 3 — 29 app screens

Built from the 17 references in `ref/batch3/`. Every screen is its own
showcase with its own slug, feature folder, assets folder and theme.

**Every one passes the design bar.** `node tools/preview/audit.js <slug>`
exits 0 on all 29, `foot.py` reports no screen over 24dp of dead canvas,
`tsc --noEmit` is clean across `src/`, and `npx expo export --platform
android` succeeds.

**What is not done: the timelapse staging.** These are finished *builds* —
blank/final states, `steps.json`, `verify`, `rehearse` and `lock` have not
been run for any of them. That is deliberate: the last batch was rejected on
its designs, so the designs should be signed off before 29 screens are staged
for filming. Say the word and staging is the next run.

---

## The nine apps

| App | Screens | Reference |
|---|---|---|
| Clove | `clovestart` `clovehome` `clovestats` | 11 |
| Huddle | `huddlehome` `huddleevent` | 12, 13 |
| Wander | `wanderhome` `wanderstay` `wandertrips` | 14 |
| Byte | `bytestart` `bytehome` `byteactivity` | 15 |
| Fern | `fernstart` `fernhome` `fernreport` | 16 |
| Pally / Atlas | `pallyprofile` `atlasfeed` | 17, 18 |
| Acronym / Loot / Nudge / PrimeFit | `acropay` `lootwin` `nudgehome` `primeplan` | 19–22 |
| Glu | `glutrack` `gluask` `glucompanion` `gluwhy` `gluhome` | 23 |
| Strid / Trip / Drift / Meet | `stridprofile` `tripfeed` `driftfeed` `meetprofile` | 24–27 |

---

## Per screen

Format: audit · foot · dominant element · deviations.

### Clove — reference 11

- **clovestart** — no failures, 2 warnings (the three fanned cards overlap
  each other: that is the fan). foot 21dp. Dominant: the dark card at the
  front of the fan. **The card fan is not in the reference** — its opening
  screen is a lime field with a small mark and then a third of a screen of
  nothing before the headline. R1 says fill it by making something bigger,
  and what this app is about is the card. The body copy is cut from 124
  characters to 76; the reference says "manage your money" three times.
- **clovehome** — no failures, 1 warning (the unread badge sits on the bell).
  foot 10dp. Dominant: the balance figure. **Four activity rows, not three** —
  three left ~90dp of white under the list. The reference's grey reads 3.05:1
  on white and every label is 13dp, so it is darkened to #6D736D; the badge
  red likewise.
- **clovestats** — no failures, no warnings. foot 8dp. Dominant: the area
  chart. **Five categories, not four**, for the same reason. "Suplies" is
  spelled "Supplies". The total is summed from the categories and the
  tooltip's month is the series maximum — in the reference the peak is in
  April and the label says June.

### Huddle — references 12, 13

- **huddlehome** — no failures, 2 warnings (the avatar stack overlaps
  itself). foot 0dp, 1.22 screens. Dominant: the gradient trending card.
  "Goodafternoon Alex" is "Good afternoon, Alex". **Three cards in the list,
  not two**, so the list actually scrolls and the foot of the frame is a card
  under the dock rather than page. The reference's avatar is a 3D cartoon;
  the rules put faces in photographs.
- **huddleevent** — no failures, 2 warnings (same stack). foot 12dp.
  Dominant: the hero photograph. **The reference's floating button lies
  across the line underneath it**, clipping both the paragraph and the spots
  count — the exact collision R3 is about. Here the footer is an opaque bar,
  the scroll content pays for its height, and the price sits beside the
  button. About copy cut from ~230 characters to 106. A back control was
  added; a detail screen reached by tapping a card needs one.

### Wander — reference 14

- **wanderhome** — no failures, no warnings. foot 7dp. Dominant: the stay
  photograph. **The category tiles are photographs**, which is the point of
  that block — drawn, they are the "drawn burger" mistake. White on the
  reference's blue reads 3.93:1, so the blue is darkened to #0A66DE. The save
  control is a sibling of the card, not a child: nested `<button>`s are torn
  apart by the web build.
- **wanderstay** — no failures, no warnings. foot 4dp. Dominant: the
  photograph. "Read more" is a real control. The sheet's height is the sum of
  its contents and the photo takes the rest, so the booking row lands on the
  safe area at any height.
- **wandertrips** — no failures, no warnings. foot 7dp. Dominant: the 80%
  packing tile. The percentage is counted from the itinerary rather than
  typed. The accent needed a second token: darkened for white-on-blue, it
  read 3.97:1 as text on the black page.

### Byte — reference 15

- **bytestart** — no failures, 2 warnings (the fan). foot: full-bleed
  gradient, nothing to measure. Dominant: the teal card. The card fan is
  rebuilt as real components; the reference's is a render.
- **bytehome** — no failures, no warnings. foot 18dp. Dominant: the balance.
  **Three ledger rows, not four** — the raised scan control rises 29dp above
  the dock and once that clearance is paid for there is no room for a fourth;
  the rows grow instead. Memoji replaced with portraits. Apple, Amazon and
  PayPal marks are drawn.
- **byteactivity** — no failures, no warnings. foot 17dp. Dominant: the bar
  chart. The axis tops at 500 so the 474 bar sits under it; the tooltip is
  beside its bar, not on it. The total is summed from the week. **Three
  overview rows** where the reference shows one and the dock covers the rest.

### Fern — reference 16

- **fernstart** — no failures, 2 warnings (one fanned card over the other;
  a 56dp breathing gap between the card and the headline, below the 72dp
  failure line and deliberate). foot 14dp. Dominant: the green card. The card
  is sized so the *rotated* box still fits 393dp — at the reference's tilt
  the "Fern" mark came off the edge.
- **fernhome** — no failures, no warnings. foot 0dp. Dominant: the balance.
  "Start your first reward is here!" is "Your first reward is waiting." The
  promo card is capped and the header given the spare height, the way the
  reference proportions it — uncapped the card grew to 290dp with its
  content marooned in the middle. The reward illustration is drawn.
- **fernreport** — no failures, no warnings. foot 0dp. Dominant: the green
  income card. "Expance" → "Expense", "MAr" → "Mar", "Vew more" → "View
  more", "$1.300" → "$1,300.00". The axis is in the data's own unit and its
  top tick clears the tallest month; the reference's does not.

### Pally and Atlas — references 17, 18

- **pallyprofile** — no failures, 2 warnings (the memory fan overlaps).
  foot 0dp. Dominant: the portrait on the cover. The four stickers are drawn
  as flat vector stickers with white keylines; the reference's are 3D
  renders. The bio drops the Netflix name.
- **atlasfeed** — no failures, 3 warnings (reaction hearts on their avatars).
  foot 0dp, 1.41 screens. Dominant: the first post's photograph. Caption cut
  from 170 characters to 63 — the reference's is five lines of the same
  thought with a missing space after a full stop. The wordmark gradient is
  three solid spans: RN cannot fill text with a gradient and `mixBlendMode`
  is not reliable on Android.

### Acronym, Loot, Nudge, PrimeFit — references 19–22

- **acropay** — no failures, no warnings. foot 0dp. Dominant: the wallet.
  The wallet is drawn. The rating no longer carries Yelp's wordmark. "$504 a
  year" is computed from the monthly saving. The pink is darkened to #D4245B:
  the reference's carries white text at 4.07:1.
- **lootwin** — no failures, no warnings. foot: full-bleed. Dominant: the
  hexagonal badge. Badge, rays and sparkles are drawn. Both emoji removed.
- **nudgehome** — no failures, no warnings. foot 0dp. Dominant: the habit
  card row. "12:30 AM → 14:45 AM" is one clock. The anytime task is no longer
  a word-for-word repeat of the task above it. **The habit labels are shorter
  than the reference's** — its own middle card reads "VEGETA…", clipped in
  the design shot itself. Grey, red and amber all darkened; the reference's
  read 2.74:1, 4.20:1 and 3.98:1.
- **primeplan** — no failures, 3 warnings (the avatar stack). foot 0dp.
  Dominant: the stars-and-laurels cluster. "Save 90%" is computed from the
  two prices. The laurels are drawn. The sky fades to the page instead of
  stopping on a hard line.

### Glu — reference 23

- **glutrack** — no failures, no warnings. foot 0dp. Dominant: the
  photograph. Headlines are Instrument Serif, which is the personality of
  this design.
- **gluask** — no failures, no warnings. foot 0dp. Dominant: the dark reply
  bubble. Reply cut from 136 characters to 87. The dotted ground is drawn as
  circles on a lattice, not a tiled bitmap.
- **glucompanion** — no failures, no warnings. foot 0dp. Dominant: the orb.
  The orb is drawn — a sphere with a radial fall-off and one highlight.
  Terms and Privacy Policy are two real controls.
- **gluwhy** — no failures, 1 warning (a 55dp gap between the headline and
  the first reason — a section break, under the failure line). foot 0dp.
  Dominant: the serif headline. The four rows divide the space so the list
  ends on the button.
- **gluhome** — no failures, no warnings. foot 0dp. Dominant: the 112
  reading. The average is the mean of the series the line is drawn from. The
  waving hand is drawn. The green is darkened — "In Range" read 2.66:1 on its
  own wash.

### Strid, Trip, Drift, Meet — references 24–27

- **stridprofile** — no failures, no warnings. foot 0dp. Dominant: the
  portrait. The badge row is a horizontal rail, because the reference clips a
  badge against each edge of the card — which is always a scroller. The hero
  is 39% of the window; at the reference's share the badge card clipped both
  its numbers and its sentence.
- **tripfeed** — no failures, no warnings. foot 0dp. Dominant: the first
  post's photo strip. "Joined joined" → "Joined". The photo count in the line
  is the length of the photo array. Memoji replaced with portraits.
- **driftfeed** — no failures, no warnings. foot 0dp. Dominant: the first
  post's photograph. Caption is one sentence.
- **meetprofile** — no failures, no warnings. foot 0dp. Dominant: the oval
  portrait. The five interest glyphs are drawn; the reference's are emoji.

---

## Review pass — docks, Pally, Fern

Four things came back from the first look, all now fixed and re-gated.

**The docks were too tall, and inconsistent.** They ranged 58–66dp and each
one also painted the 34dp home-indicator inset, so the slab read as 92–100dp.
Every dock in the batch is now 58dp — gluhome's height — with the inset on
top of that, and all fifteen measure identically.

**The content sat high in the bar.** The icons were centred in the 58dp band
*above* the inset, which is the conventional construction and reads as
top-heavy: 7dp of space above the icons and 40 below. They are now centred
across the whole painted bar, inset included.

**Three docks were off the bottom of the screen entirely** — fernreport by
55dp, fernhome by 33, gluhome by 14. Two causes: a hand-summed column whose
estimate ran under the truth pushed its last child past the edge, and
`Math.max(MIN, remainder)` clamped a card's height *upward* when the
remainder was smaller than the minimum. Those docks are now absolutely
pinned, with a spacer in the flow paying for their height, and the layouts
fit before they fill. Two more sat a whole safe-area inset *short* of the
edge, because the inset was a margin under the bar rather than padding
inside it.

**The floating docks sat 42dp up**; they are now 14dp from the edge.

**Pally's memory cards were stretched into slabs** — the width was a constant
and the height whatever was left over. The height now comes from the band and
the width follows it at a photographic 4:5.3.

**Fern's opening card was being cropped.** A clip added when the card was
wider than the screen was still cutting the back card's top corners square
after the card had been resized to fit. The clip is gone.

Two audit fixes came out of this pass: the chrome test now asks the covering
element *and its ancestors* whether they are edge chrome (the topmost thing
at a point inside a dock is one 46dp tab tile, not the bar), and it requires
chrome to be shallow as well as wide, or the walk reaches the scroll content
container and every overlap on the page counts as excused. The first of those
found a genuine collision on atlasfeed that had been hiding: the caption
sheet was painted across the reaction counts.

`tools/preview/dockcheck.js` is new — it reports a bar's height and the space
above and below its contents, which is how "the icons are not in the middle"
becomes a number. `tools/review.js` builds the contact-sheet page used to
look at all 29 at once.

---

## What changed in the tooling

`tools/preview/audit.js` gained five fixes, each found by a screen in this
batch:

1. **A full-screen `<svg>` ground is not content.** Counting it marked every
   row painted and blinded the GAP check completely — `fernstart` passed with
   190dp of empty ground under its hero.
2. **The clip check walks every clipping ancestor**, not just the first. A
   card that clips its own corners sits inside a band that clips the screen
   edge, and only the outer one was cutting the text.
3. **Rotated subtrees are skipped by the geometric checks.**
   `getBoundingClientRect` is axis-aligned, so a posed card's own digits
   looked 13dp clipped when nothing was clipped.
4. **Chrome over a list that can still scroll is a scroll position, not a
   collision** — but the same bar over content that has run out still fails,
   which is the real defect.
5. **The probe settles before it reports.** A route Metro is still compiling
   reads as a pre-hydration tree; in a sweep of 29 that showed up as two
   phantom failures on a screen that passes on its own.

`tools/preview/swatch.py` is new: exact colours out of a reference by median,
so palettes are measured rather than guessed.

## Assets

4.7MB across 29 folders, every file credited in its showcase's `CREDITS.md`.
Three frames were rejected late: a beer-tap photo carrying five breweries'
logos, a neon shopfront whose own signage filled two feed posts, and a yoga
frame cropped above a cafe's sign. A black-and-white bare tree was swapped
for a turquoise lake on Glu — "peace of mind" should not read as bleak.


## Staging — all 29 recordable

Every screen is staged, locked and left in blank state. A take is:

```bash
node tools/record.js <slug>                          # use -> preflight -> start -> reveal
python tools/timelapse/run.py <slug> 1 --delay 1.5   # or drive the reveal by hand
```

Step counts, 21–39 (the floor is 20):

```
clovestart   22   huddleevent  23   bytestart    21   pallyprofile 25   glutrack     21   stridprofile 22
clovehome    33   wanderhome   22   bytehome     34   atlasfeed    21   gluask       22   tripfeed     22
clovestats   38   wanderstay   23   byteactivity 25   acropay      27   glucompanion 32   driftfeed    21
huddlehome   39   wandertrips  23   fernstart    22   lootwin      21   gluwhy       22   meetprofile  21
                                    fernhome     21   nudgehome    21   gluhome      23
                                    fernreport   26   primeplan    21
```

### Element-level, which is three levels

The first pass staged only the screen file and came out at 7–18 steps: a `<CardRail />`
landed whole, which is exactly what `RULES.md` says not to do. Reveals now stage, per
block and in this order:

1. **the screen's JSX block** — the shell of that part appears
2. **the component it mounts, internally** — and the components *that* mounts, to a depth
   of four — so the shell fills piece by piece
3. **the data array it renders** — one entry at a time, so a rail fills card by card

`tools/timelapse/stage.js` generates all of it from the source and **exits 1 under 20
steps**. The floor is a gate, not a note that scrolls past.

### Six screens were markup, not assembly

They could not reach 20 by any amount of descent, because there was nothing to descend
into — which is a rule-2 violation nothing had been measuring. Extracting their blocks
into real components fixed both at once:

| Screen | was | now | extracted |
|---|---|---|---|
| `driftfeed` | 11 | 21 | `post` `top-bar` `dock` `glyph`, plus a `layout.ts` |
| `glutrack` | 12 | 21 | `hero-card` `reading-pill` `intro` `pager` `next-button` `drop` `tick` |
| `gluask` | 13 | 22 | `chat-card` `dot-grid` `reply-bubble` `prompt-block` `intro` `pager` `next-button` |
| `glucompanion` | 15 | 32 | `intro` `pager` `start-buttons` `legal-line`, `mascot.tsx` → `orb.tsx` |
| `gluwhy` | 10 | 22 | `intro` `feature-list` `feature-row` `cta-button` `glyph` |
| `lootwin` | 19 | 21 | (reached the floor on a second staged mistake) |

Every one of them still audits at **no failures** and its foot is unchanged within a
dp or two. The one real slip: `glucompanion`'s root carried a literal near-black that is
not in its theme, and the rewrite put `ct.page` there — an off-white — which turned every
white string on the screen invisible and showed up as three `CONTRAST` FAILs. It is now a
`night` token in that showcase's `theme.ts`. The blank-state shots are what caught it:
the recorded ground was `#0C0C0D` and the new one was not.

### A mistake is a beat, so sparse screens get two

Where a screen's structure genuinely bottoms out, the stager stages a second (and if
needed a third) deliberate mistake rather than padding with invisible steps. A mistake
always shows on screen and is then corrected, which is what the format is for; a
one-block component mounting and showing nothing is a frame where nothing changes.

### Blank states are measured, and nothing paints in frame one

`tools/preview/blank.js` is new and is done-gate step 5. It reads the DOM and reports the
four things that are never legitimately in a first frame — visible text, a photograph, a
drawn mark, and any painted box that is not the full-bleed ground.

**All 29: 0 text, 0 img, 0 svg, 0 shell, and all 29 shoot as a single flat colour.**

Seven screens needed the fill moved off a container and onto an absolutely-filled child,
which makes it a step instead of scenery: `acropay` and `wanderhome` (sheet over a
coloured page), `bytehome` (sheet over the dark head), `stridprofile` (the profile card),
`tripfeed` (the add-story tile), `lootwin` (the violet card and a translucent chip) and
`primeplan` (a card whose shadow had to move with the fill — left behind, an emptied card
still paints its 32dp of padding with a shadow under it).

`nudgehome`'s `days` array needed an explicit type: the reveal stages its rows one at a
time, and the only row carrying `today` is commented out in the blank state, so the
inferred type lost the property and `tsc` failed on a file nobody had touched.

### Two faults in the stager worth recording

- **The anchor regex held a literal backspace byte** where a `\b` was meant, from being
  authored through a shell. It matched nothing, so `findIndex` returned -1 and the stager
  silently staged a local `Glyph` helper's SVG paths instead of the screen. It renders
  correctly in every editor; only `od -c` shows it.
- **A descended region's last child came back one line short**, leaving the `</T>` that
  closed it outside the staged comment — four `TS17002`s in a blank file, invisible to
  `verify` because `verify` only diffs the finished end of the replay. `wrapBlock` now
  counts opens against closes and pulls the end forward until the region balances.

### Done-gate

```
1. tsc --noEmit                      clean in finished state and in blank state
2. expo export --platform android    ok - android bundle 4.45MB (run it FINISHED; run it
                                     blank and it bundles almost nothing and still passes)
3. run.py <slug> verify              29/29 every staged file identical to finished
                                     (2-9 files per showcase now, not 1)
4. run.py <slug> rehearse            29/29 replay and typecheck, left blank
5. blank.js <slug>                   29/29 blank - 0 text, 0 img, 0 svg, 0 shell;
                                     29/29 a single flat colour in the shot
5b. foot.py                          re-measured on every screen whose source changed;
5c. audit.js                         all no failures. primeplan keeps its 3 known
                                     avatar-stack warnings and gluwhy its 55dp gap
6. run.py <slug> lock                29/29 recorded; drift test on meetprofile/theme.ts
                                     reported DRIFT and exited 1, clean after restore
7. left in blank state               yes, all 29
```

## References renamed to the builds

`ref/batch3/` was numbered `11.png`–`27.png` with `-left`/`-mid`/`-right`/`-c` crops.
Every reference is now named for the screen it produced — `wanderstay.png`,
`byteactivity.png`, `pallyprofile-crop.png` — and the boards carrying two or three posed
phones take the app's name: `clove-board.png`, `wander-board.png`, `byte-board.png`,
`fern-board.png`, `glu-board.png` (plus `-top`/`-bot`).

The mapping was measured, not guessed: each crop was matched against the 29 finished shots
by palette-and-distribution signature, then constrained by the app table above. The 20
citations in `theme.ts` comments and `swatch.py` were repointed with it. The stock and
working files (`sheet-*`, `wander-fjord`, `huddle-yoga`, …) keep their own names — they
are asset sources, not references, and several feed more than one screen.
