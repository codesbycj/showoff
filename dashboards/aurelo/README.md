# aurelo — episode 9

A personal finance dashboard with a dark icon rail, rebuilt from a posed board as a
working three-tab app. Port 5332.

```bash
npm install && npm run dev                              # http://localhost:5332

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5332/ --click "[data-tab='wallet']"
node ../tools/drive.js drive/home.json
```

## The reference

`ref/shot.png`, 1200×900: a rounded panel on a warm grey ground. `refscan.py` read the
palette straight off it — `#ebe9ea` around, white cards on it, `#82a2df` and `#99b3e4`
doing the accent work and `#272727` for type — and called it a flat export on a 1.5px
edge ramp. It is not one: the panel is inset with a board behind it, so this is a **posed
board** and an **inspo brief**. The board is dropped and the panel's ground is the page.

**DM Sans** is the substitute — a neutral grotesque with the slightly rounded terminals
this design's headline leans on.

## The three tabs

**Home, History and Wallet** are built. **People** and **Goals** stay in the rail and are
genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`,
and a click does nothing.

An icon-only rail makes the inert state harder rather than easier — there is no greyed
label to carry it — so each entry has a title and an accessible name, and the two that are
off say so.

Home because it is the screen that was dropped. History because every figure on Home is an
aggregate of one ledger and the reference shows three rows of it. Wallet because the card
is the centre of the design and nothing in the picture opens it.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**76 beats with zero problems**, including "did nothing" checks on both inert rail entries.

| Control | What happens | Beats file |
|---|---|---|
| A portrait in the strip | Selects that person and names them under the row | `home` |
| The strip's chevron | Pages the row, and pages back from the end | `home` |
| Send money | Opens the Wallet tab | `home` |
| 5 / 7 / 3 months | Three windows of real months; the columns and the wave both restate | `home` |
| Hover a column | That month's money in, where the pointer is | `home` |
| Everyday / Reserve / Shared | Three cards, each with its own number, dates and balance | `home`, `wallet` |
| Hover a gauge segment | Names the state and its share, and the headline follows it | `home` |
| A transaction row | Opens for its category, type and direction | `home` |
| Hover Expenses or Income | Swaps the share for the amount | `home` |
| Go to premium | Confirms in place and can be undone | `home` |
| Category filter | Seven states; the three figures above the table are summed from the rows showing | `history` |
| Sort | Counterparty, date and amount, both ways, with the direction in the header | `history` |
| Hover an in/out column | Names which side it is and its figure | `history` |
| Hover a day | That day's spend on the selected card | `wallet` |
| Hover the balance curve | A guide, a dot and the balance at that point | `wallet` |
| Pick a payee, pick an amount, send | Confirms, and can be undone | `wallet` |
| A standing payment's switch | Strikes the amount through and the monthly total follows it | `wallet` |
| Search | Filters transactions, the ledger or standing payments — whichever tab is showing — with an empty state | all three |
| People, Goals | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **The card's type was unreadable.** Every line on the reference's card is white on a pale
  periwinkle, about 2.4:1. Deepening the ground to `#4a6fbd` got it to 4.88:1 for the
  headline, and the probe then caught the three smaller lines still at `white/85` — 4.03:1.
  They are full white now and the hierarchy is carried by size and weight.
- **The contacts strip had nothing to scroll.** Six portraits and an overflow disc fitted
  its track to within five pixels, so the chevron's second press changed zero pixels. The
  "Send money" chip is what makes the row longer than its container — and it is also the
  one control on this pane that opens another tab.
- **The standing payments list had nothing to scroll either**, for the same reason: eight
  rows fitted the region. Twelve now.
- **The card did not stretch.** `Face` fills its box with `flex-1`, and its parent was a
  plain `div` — so the card sat at its content height and left 370px of empty page under
  it. The parent is a flex column now, with a 1.6:1 aspect so the card cannot stretch to
  350×570 either.
- **The columns were a picture of a chart.** `base + random * spread` clustered every month
  between 55% and 100% of the tallest, which renders as five near-identical blocks. The
  shape is written down now and the seed only roughens it.
- **The inert rail glyphs measured 2.95:1** at 35% opacity — invisible rather than off.
  45% is 3.96:1, against 9.3:1 for the live ones.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

1. **The board is dropped** — the grey surround and the panel's shadow are a presentation
   effect.
2. **Built at 1440×900**, not at the board's 1200×900.
3. **The card is a deeper blue and its type is full white.** Explained above; the
   reference's own pale periwinkle survives as the sheen and the corner disc.
4. **The scheme mark is invented** — one filled disc and one ring, set apart. The
   reference carries a real payment network's two interlocking circles over an invented
   account (rule 8).
5. **The transaction rows carry invented companies.** The reference's first row is a real
   computer maker's mark over a made-up $653.
6. **The gauge's headline is its own first segment.** The reference prints "90% Done" over
   three segments that are nothing like nine tenths of its arc.
7. **Expenses and Income are computed from the ledger**, which makes them 32/68 rather
   than the board's 60/40 — the board's two bars are nothing like 60:40 either.
8. **"Search me..." is a real search box**, filtering whichever pane is showing.
9. **Six portraits and an overflow disc**, where the board shows seven faces. Six is every
   distinct free-licensed portrait this repository holds, and the same face twice in one
   row is worse than an honest count.
10. **A visible focus ring everywhere.** The board has none.
11. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off, and the strip's paging
becomes an instant jump rather than a smooth scroll. Nothing is gated on an entrance — the
gauge is drawn at its angles, the columns at their heights, every figure at its final
value. Shot as `shots/reduced.png`.
