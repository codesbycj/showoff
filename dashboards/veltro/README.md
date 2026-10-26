# veltro — episode 16

A store's sales dashboard, rebuilt from a posed board as a working three-tab app.
Port 5360.

```bash
npm install && npm run dev                              # http://localhost:5360

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5360/ --click "[data-tab='orders']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 1024×768: a rounded panel on a near-white ground. refscan read the palette
off it — white cards on `#e5e4e9`, `#fde9e0` and `#fff8ef` for the orange tints, `#0d0e13`
for the near-black. It is a **posed board**, so this is an **inspo brief**; the board is
dropped and the panel's own ground becomes the page.

**Manrope** is the substitute — a grotesque with the high waist and tight apertures this
design's headings have, and the tabular figures three tables of money need.

## The three tabs

**Dashboard, Products and Order** are built. **Customers, Chat, Email, Analytics,
Integration, Performance, Account** and **Members** stay in the sidebar and are genuinely
inert: muted, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click
does nothing. The 22 on Chat stays, because it is part of the picture.

Dashboard because it is the screen that was dropped. Products because Top Products is two
rows of a catalogue with a "See Details" arrow pointing at a screen the design does not
have. Order because every figure on the page is orders summed one way or another.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**70 beats with zero problems**, including "did nothing" checks on six of the eight inert
entries.

| Control | What happens | Beats file |
|---|---|---|
| All / Cosmetics / Houseware / Apparel | Restates the sales figure above it | `dashboard` |
| This month / quarter / year | Scales it again | `dashboard` |
| This year / Six months / This quarter | Three different band series | `dashboard` |
| Hover a month | The column lifts and the bubble carries **that month's** change | `dashboard` |
| Hover a heatmap cell | Names the day, the hour and the visits | `dashboard` |
| Add Widget / Export | Both confirm in place and can be undone | `dashboard` |
| See Details | Opens the Products tab | `dashboard` |
| Category filter | Four states; the three figures above the table restate | `products` |
| Sort | Name, sales, revenue and stock, both ways, with the direction in the header | `products`, `orders` |
| Hover a ring segment, or click a legend row | Isolates that category | `products` |
| State filter | Four states | `orders` |
| A channel | Filters the order book to it, and clears | `orders` |
| Search | Filters products or orders — whichever tab is showing — with an empty state | all three |
| Eight sidebar entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **The period pill was wired to nothing.** It was written with
  `onChange={() => undefined}` — a control that looks live and does nothing, which is the
  one failure this series is pointed at. It scales the figure now.
- **The last axis label lost its G.** `AUG` centred on the plot's right edge runs past it;
  the first and last labels are anchored to the edges now.
- **Top Products showed one row.** The rows were redistributed so the lower band takes
  more of the shell, which also gave the ledger something to scroll.
- **The gauge was drawn through its own legend.** At 190px inside the shorter row it
  overflowed its box; it is 158px and `shrink-0` now.
- **The active category chip was 3.21:1.** White on `#f4601f` at 11.5px. It carries the
  deeper orange.
- **Two scroll beats proved nothing**, because ten products fit the catalogue card. The
  honest fix was to delete them rather than pad the data until a scrollbar appeared.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

1. **The board is dropped** — the surround and the panel's shadow are a presentation
   effect, so the sidebar runs to the window edge.
2. **Built at 1440×900**, not at the board's 1024×768.
3. **Four of the reference's own words are corrected.** It writes "Housewest" for
   Houseware, "Perfomance" for Performance and "Setings" for Settings, and it names one
   product "Blid Shorts" in the card and "Biled Shorts" in the table two rows below.
4. **Total sales is the catalogue, summed.** The reference reads $43,630 over a table
   whose two rows come to $4,779.
5. **The analytics figure is a number.** The reference prints "-$4.5430", which is not
   one; both the net and the conversion rate are computed from the series.
6. **The heatmap's tooltip names both axes.** A cell on its own says nothing, and the
   reference's floating label gives a code rather than a day and an hour.
7. **A visible focus ring everywhere.** The board has none.
8. **The portraits are free-licensed Pexels photographs**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the band is drawn at its spread, the heatmap at its fills, the gauge at its
angle, every figure at its final value. Shot as `shots/reduced.png`.
