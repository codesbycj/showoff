# obelio — episode 13

A multi-currency wallet dashboard, rebuilt from a posed board as a working three-tab app.
Port 5348.

```bash
npm install && npm run dev                              # http://localhost:5348

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5348/ --click "[data-tab='recurring']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 1200×900: a rounded panel on a very light grey ground. refscan read the
palette off it — white cards on `#eaeaea`, `#077b4a` and `#059055` for the greens,
`#f3fcf9` and `#e7f6f1` for the tints, `#1c1d22` for the dark Export pill. It is a
**posed board**, so this is an **inspo brief**; the board is dropped and the panel's own
ground becomes the page, with the sidebar running to the window edge.

**Inter** is the substitute — a neutral grotesque with tabular figures, which this design
needs for four wallet tiles, twelve bars and three tables of money.

## The three tabs

**Dashboard, Transactions and Recurring** are built. **Analytics, Invoices,
Subscriptions, Feedback, Settings and Help Desk** stay in the sidebar and are genuinely
inert: muted, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click
does nothing. The 20 on Analytics stays too — it is part of the picture, it just does not
open anything.

Dashboard because it is the screen that was dropped. Transactions because its Recent
Transaction card is three rows with a filter button pointing at a screen the design does
not have. Recurring because the sidebar puts a 16 against it and nothing behind it — a
count badge is a promise.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**74 beats with zero problems**, including "did nothing" checks on six of the inert
entries.

| Control | What happens | Beats file |
|---|---|---|
| A wallet tile, or the currency pill | **Restates the balance in that currency** | `dashboard` |
| Send Money / Request Money | Both confirm in place and can be undone | `dashboard` |
| This Year / Last Year / 2024 | Three different twelve-month series | `dashboard` |
| Hover a bar | A card naming that month and its figure — above the bar it points at | `dashboard` |
| A savings plan | Opens for what is left | `dashboard` |
| Sort | Activity, date and price, both ways, with the direction in the header | `dashboard`, `transactions` |
| Export | Confirms in place and can be undone | `dashboard` |
| Upgrade | Switches the account to Pro and back | `dashboard` |
| The filter button | Opens the full ledger | `dashboard` |
| Status filter | Four states; the three figures above the table restate | `transactions` |
| A category | Filters the ledger **and** redraws the year's curve beside it | `transactions` |
| Cadence filter | Four states | `recurring` |
| A recurring switch | Strikes the amount through, and the monthly cost, the yearly cost and the cadence split all follow | `recurring` |
| Search | Filters transactions or recurring rules — whichever tab is showing — with an empty state | all three |
| Six sidebar entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **The wallet tiles were clipped.** Four tiles, a balance, two buttons and a sub-heading
  did not fit the card's share of the row, so BDT and GBP were cut off at its edge. The
  row takes more of the height now and the tile lost its per-tile overflow dots, which
  were the first thing that could go.
- **The chart's tooltip rode into the card header.** It is pinned above the tallest bar,
  and in August that is near the top of the plot — so it translated up past the card's own
  padding. The plot has a deeper top gutter now and the card is clamped inside it.
- Zero contrast failures on the first pass, because the accent was split before anything
  was built: `#059055` is the brand's own and carries white at 3.3:1, so it is the *mark*
  colour and `#0a6b41` is the one anything with text on it uses.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

1. **The board is dropped** — the grey surround and the panel's shadow are a presentation
   effect, so the sidebar runs to the window edge.
2. **Built at 1440×900**, not at the board's 1200×900.
3. **Account Balance is the wallets, converted and summed.** The reference reads
   $35,340.89 over four wallets that come to about $178,700 once the taka line is
   converted — and its currency pill is decoration. Here the pill converts.
4. **The Overview tooltip and the bar it points at agree.** The reference reads
   $84,849.93 against an axis topping out at $40k, over a bar less than half that height.
5. **Three real software marks are gone.** The reference's transaction rows carry them
   over invented prices in an invented account (rule 8). Six invented vendors with their
   own drawn marks stand in their place.
6. **The wallet discs are drawn, not emoji** — a flag emoji is simply absent on Windows —
   and they are coloured discs carrying the currency code rather than traced flags,
   because at 26px a flag is two bands and a circle and the code is what identifies it.
7. **"Search ⌘K", "Export", "Upgrade" and the filter button all do something.** They go
   nowhere in the picture.
8. **A visible focus ring everywhere.** The board has none.
9. **The portrait is a free-licensed Pexels photograph**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the bars are drawn at their heights, the meters at their widths, the curve at
its points, every figure at its final value. Shot as `shots/reduced.png`.
