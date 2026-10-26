# teknova — episode 2

Kovelt Store, an e-commerce control room, rebuilt from a posed presentation board as a
working three-tab app with a real light/dark switch. Port 5304.

```bash
npm install && npm run dev                              # http://localhost:5304

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5304/ --click "[data-tab='orders']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 1200×900. `refscan.py` calls it a **posed board**: edge ramp 11.4px — drop
shadows, not borders — so it is an **inspo brief** and rule 1 is off. The white panel sits
on a peach-to-mint gradient, and at real size that backdrop is gone, because the panel *is*
the viewport.

The scanner's palette is the board's, not the app's: its top three entries are the gradient
and its `accent` read of `#07060b` is the dark logo disc rather than the brand green. The
tokens in `src/styles/index.css` are the panel's own colours, read off the shot and then
corrected for contrast (below).

## The three tabs

**Dashboard, Products and Orders & Invoices** are built. The other seven menu entries —
Sales Analytics, Customer Insights, Reports, Settings, Team Members, Help Center, Logout —
stay in the sidebar and are genuinely inert: dimmed, `aria-disabled`, skipped by the
keyboard, `cursor: not-allowed`, and a click does nothing at all.

Dashboard because it is the screen that was dropped. Products and Orders & Invoices because
they are the two the dashboard keeps pointing at — every figure on it is either a product or
an order — and the two with a real catalogue and a real ledger behind them. Sales Analytics
and Customer Insights would both have been another page of the same charts.

Three of the beats files end by clicking an inert entry with `expectUnchanged: true`, so
"nothing happened" is proved rather than assumed.

## Type

The board's face is an unidentified geometric sans. The substitute is **Manrope** (OFL, via
fontsource, one variable file per subset): the closest free match for its tight apertures
and its very heavy numerals, which this design leans on hard — `$110,450` at 38px and
`1,660` at 22px are the two things the eye lands on first.

No element needed resizing to fit the substitute.

## Interactions

Every one of these is a beat in `drive/`, photographed and numerically diffed. The three
files run **81 beats with zero problems**, including "did nothing" checks on four separate
inert menu entries.

| Control | What happens | Beats file |
|---|---|---|
| Hover a profit bar | The bar fills, its badge lifts, and the dark read-out card moves to it with that period's highest day, lowest day and average | `dashboard` |
| Click a bar | Selects it; the read-out stays when the pointer leaves | `dashboard` |
| Month / Quarter / Year | Three different series — 7, 4 and 5 bars — with re-labelled axis ticks and a recalculated headline. **Year is negative**, so the card has to be able to say profit fell | `dashboard` |
| Category | Filters the transactions by the product's category; the footer counts what is left | `dashboard` |
| Row checkbox | Selects rows; the footer switches from a prompt to a count | `dashboard` |
| Top Market row | Hover or click highlights it; the fill under each row is its share, to scale | `dashboard` |
| Top Product tile | Moves the lead fill between the two best sellers | `dashboard` |
| Toast close | Dismisses it, and it stays dismissed | `dashboard` |
| Sun / moon | A real theme switch: every token is redefined for dark and the whole app changes | `dashboard`, `orders` |
| Stock: All / In / Low / Out | Filters the catalogue; the footer totals units on hand | `products` |
| Sort | Four orders — best selling, price, stock, rating | `products` |
| A catalogue row | Redraws the whole detail pane: stock meter, facts, sparkline, that product's own orders | `products` |
| Sparkline | The read-out follows the day under the pointer | `products` |
| Order restock | Toggles, and resets when another product is selected | `products` |
| Ledger tiles | Paid / Awaiting / Overdue / Draft each filter the invoice table; the bar above is the same four numbers to scale | `orders` |
| Donut slice / legend | Either highlights both and writes that figure into the ring | `orders` |
| Search | Filters transactions, catalogue or invoices depending on the tab, with an empty state | all three |
| Seven menu entries | **Nothing.** Proved with `expectUnchanged` | all three |

Data is bundled and seeded (`src/data/rng.ts`), so the per-product sparklines are identical
on every reload — the chart that was measured is the chart that gets filmed.

## What the probe found

In my own build, none of it visible in a screenshot:

- **White on the vivid green was 2.70:1 and on the vivid orange 3.45:1** — every `+8%` /
  `-5%` pill on the screen, at 11.5px. Ink on the same two fills is 6.64:1 and 5.19:1, so
  the pills keep the reference's vivid colour and became readable, rather than being muted
  into a darker green nobody chose.
- **The sidebar count badges** (11px, white on red) went to a deeper red at 5.91:1.
- **The chart tooltip's date column was white at 50%** over near-black.
- **A 22px row checkbox**, under the 24px floor.
- **Dark mode was broken in a way light mode could not show.** Every filled control —
  the active menu pill, Export, Invite, the toast, the selected bar, the lead product tile
  — was `bg-ink text-white`, and `ink` is the *text* colour, so in dark it inverted to
  white-on-white. Split into `--color-fill` / `--color-fill-fg`, which fixed all eleven
  places at once. **Only shooting the dark theme caught this**; both themes are now probed
  separately on every tab.

After those: **0 contrast failures on all three tabs in both themes**, no duplicate SVG def
ids, every chart labelled, nothing animating at rest, no dead space over 24px, and no
document or horizontal scroll at 1280, 1440 or 1920.

One harness bug surfaced here and was fixed in `tools/probe.page.js`: Tailwind 4 writes
every opacity-modified colour as `color-mix(in oklab, …)` and Chrome reports it as
`oklab(L a b / α)`. The probe was reading those three numbers as r/g/b, so `text-white/70`
came back as 1.12:1 — the worst "failure" on the screen, and completely wrong. It now
converts oklab and oklch properly. **Every earlier episode's probe result predates that
fix.**

## Declared departures

1. **No backdrop.** The board's gradient surround and the floating panel are gone; at real
   size the panel is the viewport.
2. **Built at 1440×900**, not at the board's scale. No measurement was taken off the shot.
3. **The accent greens, the warn orange and the muted grey are all adjusted** for the
   contrast reasons above.
4. **The product thumbnails are drawn glyphs on tinted tiles, not photographs** — and this
   one is a rule in tension with itself. Series rule 8 says photograph the picture, and a
   product *is* a picture. But every free-licensed photograph of consumer electronics on
   Wikimedia Commons is identifiable branded hardware — the searches returned Apple, Samsung,
   SanDisk, Alcatel and LG — and shipping a real manufacturer's product in an invented store
   at an invented price is the one thing this series must never produce. With no unbranded
   stock available and no second subject that keeps an electronics shop's plot, the third
   option applies: keep it as interface. The tile reads as a product *marker*, not as a bad
   drawing of a product. `tools/stock.py` exists for the cases where unbranded stock does
   turn up.
5. **The sparkline's 14 hit strips are 21px wide**, under the 24px target floor. They are
   chart hit areas over a continuous series, the whole series is in the chart's
   `aria-label`, and widening them would mean showing fewer days. Listed rather than fixed.
6. **Twelve products and eighteen transactions**, not the six the board shows. Six rows do
   not fill a 1440×900 shell and give the scrollers nothing to scroll.
7. **The period control, the category filter, the sort, the stock bands and the ledger
   tiles are all real controls** the board could only draw as a single state.
8. **A visible focus ring everywhere.** The board has none; no presentation board does.
9. **The Kovelt mark is invented**, drawn in the board's idiom — a dark disc with a white
   bolt and a green flash. The copy is invented, so the mark has to be.
10. **The waving hand after the name is drawn**, not an emoji: Windows, Android and iOS each
    render that codepoint differently and one of them picks a different skin tone.
11. **The faces are free-licensed Pexels portraits**, credited in
    `src/assets/img/CREDITS.md`, standing in for photography that is not redistributable.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the bars draw at their final heights, the gauge is lit to its goal, every
tooltip opens and every control works — so the dashboard is fully usable with it on. Shot
as `shots/reduced.png`.
