# cindra — episode 10

A banking dashboard with a ten-item sidebar, rebuilt from a **flat UI export** as a
working three-tab app. Port 5336.

```bash
npm install && npm run dev                              # http://localhost:5336

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5336/ --click "[data-tab='plans']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 1199×861: interface edge to edge, no board behind it and no shadow around
it. `refscan.py` measured a 2px edge ramp and called it a flat export, and it is right —
this is **the one episode in this batch where rule 1 is on**.

W/1440 = 0.8326, so the capture is a 1440 viewport at 83% and a measurement in the picture
divided by 0.8326 is a CSS pixel. The spacing, the radii, the type scale, the 228px
sidebar and the palette are matched rather than interpreted, and the figures the reference
prints — $562,000, $78,000 / $43,000 / $56,000, the five expense categories, the three
saving plans, the five transaction rows — are kept, because on a flat export those numbers
are part of what was dropped.

**Plus Jakarta Sans** is the substitute: a humanist sans with the tall x-height and the
flat-sided digits this design sets its figures in.

## The three tabs

**Dashboard, Transactions and Saving Plans** are built. **Payments, Invoices, Cards,
Investments, Inbox, Promos and Insights** stay in the sidebar and are genuinely inert:
muted, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click does
nothing. The chevron on Payments and the 99 on Inbox stay too — they are part of the
picture, they just do not open anything.

This is the longest sidebar in the batch, so three live leaves seven inert rather than the
usual two.

Dashboard because it is the screen that was dropped. Transactions because its Recent
Transactions card is five rows of a table with nowhere to go, and the filter icon beside
it points at a screen the design does not have. Saving Plans because the card holds three
plans, a total and an "Add Plan" button, all of which imply one.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**80 beats with zero problems**, including "did nothing" checks on six of the seven inert
entries.

| Control | What happens | Beats file |
|---|---|---|
| The card's CVV | Masked by default; a control reveals it | `dashboard` |
| Top Up / Transfer / Request / History | Each arms, and the card says what it would do | `dashboard` |
| A saving plan | Opens for what is left, and closes again | `dashboard` |
| This Year / Last Year / 2027 | Three different twelve-month series | `dashboard` |
| Hover a month | A card naming that month's income and expense | `dashboard` |
| Income / Expense | Two different rings, legends and headlines | `dashboard` |
| This Month / Quarter / Year | Scales the figures, so the ring is not the same month three times | `dashboard` |
| Hover a ring segment, or click a legend row | Isolates that category and the centre follows it | `dashboard` |
| Sort | Four columns, both ways, with the direction in the header | `dashboard`, `transactions` |
| Get Pro | Switches the account to Pro and can be switched back | `dashboard` |
| The filter icon | Opens the full ledger | `dashboard` |
| Status filter | Four states; the three figures above the table are summed from the rows showing | `transactions` |
| A category | Filters the ledger to it, and clears | `transactions` |
| A plan | Picks it: its own year, its own target, its own top-up | `plans` |
| Add $50–$500 | Adds to the plan, twice over, and undoes | `plans` |
| An auto-save rule | A real switch, and the count above follows it | `plans` |
| Search | Filters transactions, the ledger or the plans — whichever tab is showing — with an empty state | all three |
| Seven sidebar entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **Picking a category hid every other category.** The list was built from the rows after
  the category filter had been applied, so choosing one left exactly one standing and
  there was no way to switch without clearing first. The beat that tried reported
  `MISSING`. It is built from the status-and-search rows now.
- **The compact table's columns collided.** The dashboard card is 540px wide and the full
  five-column set left the name column at about 70px, so "Transaction Name" ran straight
  over "Date & Time". There are two column sets now, and the compact one drops the note.
- **The Statistic legend was clipped.** The ring plus five rows needs more of its column
  than the activity list does; at 1:1 the last row fell outside the card.
- **The plan's year flattened halfway.** Accumulating a random step and clamping with
  `Math.min` hit the ceiling in month seven and drew a straight line across the right half
  of the card. The weights are normalised now, so the series ends exactly on the balance.
- **The plan list left a 400px band of empty card.** Auto-save is what the plans actually
  run on, so it went in the gap rather than padding filling it.
- Zero contrast failures on the first pass, which is the only episode so far — the
  category badges are the reason: each carries its own `fg`, measured, because white on
  `#6aa86f` is 2.82:1 and the ink is 5.69:1 while on `#1f4842` it is the other way round.
  One text colour across five swatches fails at one end or the other, always.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

Fewer here than anywhere else in the batch, because this is a spec rather than an inspo
brief. Each one is a correction, not an interpretation.

1. **Cashflow is a diverging chart.** The reference prints an axis running 8K / 4K / 0 /
   -4K / -8K and then draws every bar above the line, so half of its own axis is unused.
   Income goes up from zero and expense down, on one shared unit.
2. **Three figures that did not agree now do.** Total Savings reads $56,000, the Saving
   Plans card reads $84,500, and the three plans under it hold $15,250 — three answers to
   one question. The plans are the source and the totals follow them.
3. **The CVV is masked.** The reference prints a live security code in plain sight, which
   no real product does and no screenshot should.
4. **A falling expense is green.** The reference paints it red, which says the opposite of
   what it means. `Delta` takes `goodWhen`.
5. **The brand, the people and the counterparties are invented**, including the footer's
   copyright — the reference's belongs to a real studio.
6. **"Search placeholder" is a real search box**, filtering whichever pane is showing.
7. **The footer links are 44px tall.** An `<a>` is only as tall as its line box, so the
   padding is on the anchor and the underline on an inner span.
8. **A visible focus ring everywhere.** The export has none.
9. **The portraits are free-licensed Pexels photographs**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the ring is drawn at its angles, the bars at their heights, the meters at their
widths, every figure at its final value. Shot as `shots/reduced.png`.
