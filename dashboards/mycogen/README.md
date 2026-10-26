# mycogen — episode 7

A store manager's dashboard, rebuilt from a posed board as a working three-tab app.
Port 5324.

```bash
npm install && npm run dev                              # http://localhost:5324

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5324/ --click "[data-tab='customers']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 1200×800: a white panel on a pastel wash of pink, blue and cream.
`refscan.py` found exactly that — `#ffffff`, `#f3f6fb`, `#c5d5e4`, `#eadede` and `#f5e7e6`
are most of the frame between them.

It is a posed board, so this is an **inspo brief**. **The backdrop is kept here**, which is
the one place this series departs from its own habit: every other episode drops the
surround because it is a presentation effect, but this design's identity *is* the wash, and
a flat grey behind these cards is a different design rather than the same one at a
different size. It is rebuilt as three radial gradients rather than lifted as a bitmap, so
it stays sharp at any viewport and costs nothing.

**Inter** is the substitute — a neutral grotesque with tabular figures, which this design
needs for six KPI tiles and three tables of numbers.

## The three tabs

**Dashboard, Orders and Customers** are built. Products, Categories, Reviews, Discounts,
Analytics, Marketing and Settings stay in the menu and are genuinely inert: dimmed,
`aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click does nothing.

Dashboard because it is the screen that was dropped. Orders because every headline figure
on it — sales, order count, average order value — is an aggregate of the order table and
there is nowhere else to see a row. Customers because the whole right-hand column of the
dashboard is customer summaries with no page behind them; "See all" on that card is wired,
and the card reports upward rather than navigating itself (rule 4).

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**54 beats with zero problems**, including "did nothing" checks on five inert menu entries.

| Control | What happens | Beats file |
|---|---|---|
| Quick action chips | Select and deselect, with a real pressed state | `dashboard` |
| Daily / Weekly / Monthly | Three different series — seven bars, five or twelve — with the axis re-labelled | `dashboard` |
| Hover a bar | Dims the rest and names the period and its figure | `dashboard` |
| Promotion state | Pauses and resumes a running promotion | `dashboard` |
| New Order / Add Product | Both confirm in place and can be undone | `dashboard` |
| See all | Opens the Customers tab | `dashboard` |
| Order filters and sort | Five states and three orders; the three figures above the table are summed from the rows showing | `orders` |
| Customer segments | All, VIP, Returning, New | `customers` |
| A customer row | Fills the card beside it, including their own orders out of the same ledger the Orders tab shows | `customers` |
| Search | Filters orders or customers, with an empty state | `orders`, `customers` |
| Five menu entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **Cart abandonment was coloured as if down were bad.** The reference paints a falling
  abandonment red, which says the opposite of what it means — it is the one figure on the
  screen where down is the good news. `Delta` takes `goodWhen` now.
- **60% ink on the two palest quick-action tints was 4.40:1 and 4.48:1** — just under. Now
  70%.
- **The stat tiles sat at their content height** inside a taller row, leaving a band of
  empty page between them and the chart.
- **Two beats were pointed at the wrong element.** `data-mark` is on the `<g>` that draws a
  bar, but the transparent hit areas sit over the plot, so the group is never what the
  pointer reaches — the hover beats had to target `data-hit`. The numeric diff caught it as
  a hover that changed nothing.
- **The customer table had nothing to scroll** — twelve rows fitted its region, so the
  scroll beat proved nothing. Eighteen now.
- After those: 0 contrast failures on all three tabs, nothing under 24px, no duplicate SVG
  def ids, nothing animating at rest, no dead space over 24px, and no document or
  horizontal scroll at 1280, 1440 or 1920.

## Declared departures

1. **The backdrop is kept**, as the page's own ground. Explained above; it is the only
   episode of the seven that does this.
2. **Built at 1440×900**, not at the board's 1200×800.
3. **Cart abandonment's delta is coloured by meaning, not by sign.**
4. **The quick actions are real toggles.** The board draws four chips with arrows on them
   and nothing behind them.
5. **Twenty orders and eighteen customers**, not the handful the board shows: a short list
   does not fill a 1440×900 shell and gives the scrollers nothing to scroll.
6. **Promotions can be paused.** The board shows two with state pills and no way to act.
7. **A visible focus ring everywhere.** The board has none.
8. **The Mylora wordmark is drawn type**, not a logo — the reference sets its name in
   plain type with no mark at all, which is unusual enough to be the design, so this is the
   word with a single amber counter in the O. Invented, like the copy around it.
9. **No light/dark switch.** The reference has no sun/moon pair, and a second palette
   nobody asked for is a second palette to keep honest.
10. **The faces are free-licensed Pexels portraits**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the bars draw at their final heights, the retention meter is at its width, and
every control still works. Shot as `shots/reduced.png`.
