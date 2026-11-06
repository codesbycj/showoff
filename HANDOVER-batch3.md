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

Every screen is staged, locked and left in blank state. A take is the usual
two commands:

```bash
node tools/record.js <slug>                     # use -> preflight -> start -> reveal
python tools/timelapse/run.py <slug> 1 --delay 1.5   # or drive the reveal by hand
```

Reveals run 6-18 steps: the showcase's component imports come back one at a
time, then the blocks of the screen's JSX in assembly order, then one staged
mistake and its fix. Step counts per screen are in each
`tools/timelapse/showcases/<slug>/steps.json`.

### The blank files are generated, not written

`tools/timelapse/stage.js` is new. A screen that obeys rule 2 is already a
complete description of its own reveal, so the stager reads the route file and
writes the blank tree, the finished tree, the manifest and the staged mistake.
29 screens in one pass; the previous app cost 141 hand-written step entries.

Four faults it was taught, each found by a gate that the previous one missed:

1. **It staged a helper's `return (`, not the screen's.** Eight screens define
   a local `Glyph` above the default export, so the first `return (` in the
   file is that component's — the reveal was its SVG paths. The regex meant to
   anchor on `export default function` held a literal backspace byte where a
   `\b` was intended, so it matched nothing and the search silently fell
   through to line 0. Authored through a shell, which `AGENTS.md` already
   warns about; the symptom is a regex that looks correct in every editor.
2. **It commented out an import that unstaged code still used.** `text.tsx`
   lives under `components/`, so the `T` primitive looked like a component
   import — but a `SectionHead` helper above the export uses it too. Four
   `TS2304`s in the blank state of bytehome, which `verify` cannot see because
   it only diffs the finished end of the replay. `rehearse` caught it. An
   import is now staged only if every use of it is inside a staged block;
   that holds one import back on bytehome, atlasfeed, gluhome and driftfeed.
3. **It staged its own output.** `lock` and `rehearse` both leave the tree
   blank, so re-running the stager after a gate pass read the blank file and
   produced a blank-of-a-blank: imports already invisible, "blocks" that were
   the previous pass's JSX comments. It wrote cleanly and was entirely wrong.
   The stager now refuses a file that already carries STEP markers.
4. **A coloured spacer is not a spacer.** `<View style={{ flex: 1,
   backgroundColor: ct.sheet }} />` matched the spacer exemption and was left
   out of the reveal, so it painted from frame one. On clovehome it happened
   to match the page colour and got away with it.

### Blank states are measured, not looked at

`tools/preview/blank.js` is new and is now done-gate step 5. Counting colours
was the first attempt and is the wrong measure: a sheet or card shell left live
by a descent is *meant* to be there, and its rounded corners alone put a few
hundred antialiased colours in the frame. The probe reads the DOM instead and
reports the three things that are never legitimately in a first frame —
visible text, a photograph, a drawn mark.

All 29: **0 text, 0 img, 0 svg**, and all 29 shoot as a single flat colour.

Two needed a change to get there. **acropay** opened on its empty white sheet
over the pink page (92/8) and **wanderhome** on its empty white sheet over the
black page (58/42) — in both cases the sheet's `backgroundColor` sat on the
container whose children are staged, so the shell painted from frame one. The
fill moved to an absolutely-filled child, which becomes a step of its own:

```tsx
<View style={{ height: sheetH, paddingHorizontal: MARGIN, paddingTop: SHEET_PAD }}>
  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                 backgroundColor: ct.sheet, borderTopLeftRadius: radius.sheet,
                 borderTopRightRadius: radius.sheet }} />
  ...
</View>
```

Both re-audit at **no failures, 0 warnings** and **0dp dead at the foot**, so
the finished render is unchanged; acropay's reveal went 13 -> 16 steps and
wanderhome's 15 -> 17. Shots of every blank state are in `shots/batch3-blank/`.

### Done-gate

```
1. tsc --noEmit                      clean across all of src/
2. expo export --platform android    ok - android bundle 4.4MB
3. run.py <slug> verify              29/29 "1/1 files identical to finished"
4. run.py <slug> rehearse            29/29 "all screens replay and typecheck, left blank"
5. blank.js <slug>                   29/29 blank - 0 text, 0 img, 0 svg,
                                     and 29/29 a single flat colour in the shot
5b. foot.py                          unchanged from the build pass (staging restores
5c. audit.js                         every file byte-identical, proved by verify)
6. run.py <slug> lock                29/29 recorded; drift test on meetprofile/theme.ts
                                     reported DRIFT and exited 1, clean after restore
7. left in blank state               yes, all 29
```

5b and 5c were re-run on acropay and wanderhome, the two screens whose source
changed, and not on the other 27: `verify` proves their finished state is
byte-identical to what was audited during the build and the review pass, so
their rendered pixels cannot have moved. The per-screen audit and foot figures
above still stand.

Run the export in **finished** state. Run blank, it bundles only the assets the
uncommented imports still reach — 3.7KB of metadata against 7.2KB — and
succeeds, which reads as a pass and checks almost nothing.
