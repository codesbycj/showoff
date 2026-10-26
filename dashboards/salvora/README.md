# salvora — episode 11

A store admin's dashboard with a dark green sidebar, rebuilt from a posed board as a
working three-tab app. Port 5340.

```bash
npm install && npm run dev                              # http://localhost:5340

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5340/ --click "[data-tab='customers']"
node ../tools/drive.js drive/overview.json
```

## The reference

`ref/shot.png`, 736×552: a rounded panel on a flat grey ground. refscan read the palette
off it — `#042314` for the sidebar and the filled controls, `#d8d9c7` for the pale upsell
panel, white cards on a near-white page, and lime for everything that moves.

It is a **posed board**, so this is an **inspo brief** — and a *small* one: at 736px
across, a 14px label is ten pixels tall and nothing in it can be measured. The palette,
the hierarchy and the order of the blocks are the brief; the sizes are what is right for a
1440×900 browser.

**Urbanist** is the substitute — a geometric sans with the tall, narrow digits this design
sets its figures in.

## The three tabs

**Overview, Transactions and Customers** are built. **Statistics, Product, Messages,
Settings and Security** stay in the sidebar and are genuinely inert: dimmed against the
dark ground, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click
does nothing. The 23 on Messages stays, because it is part of the picture; it just does
not open anything.

Overview because it is the screen that was dropped. Transactions because the left-hand
list is sixteen orders with nowhere to go and a "See Statistics" link pointing at a screen
the design does not have. Customers because every figure on the board is an aggregate of
people buying things, and the design never shows one.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**65 beats with zero problems** — the only episode so far to pass all three on the first
run — including "did nothing" checks on four of the five inert entries.

| Control | What happens | Beats file |
|---|---|---|
| An order in the list | Opens for its quantity, unit price and total | `overview` |
| 6 / 12 / 3 months | Three different windows of real months | `overview` |
| Hover a revenue column | Names which side it is and its figure | `overview` |
| Hover a report bar | Darkens it and bolds its label | `overview` |
| Hover a ring segment, or click a legend entry | Isolates it and the centre follows | `overview` |
| Guide Views | Swaps the tip for the real advice, and back | `overview` |
| Update to Dravelo+ | Confirms in place and can be undone | `overview` |
| Add new product | Saves a draft and can be undone | `overview` |
| See Statistics | Opens the full order book | `overview` |
| Status filter | Four states; the three figures above the table are summed from the rows showing | `transactions` |
| Sort | Product, date and total, both ways, with the direction in the header | `transactions` |
| Tier filter | Four states | `customers` |
| A customer | Their spend, their orders, their twelve weeks | `customers` |
| Search | Filters orders, the order book or the customer list — whichever tab is showing — with an empty state | all three |
| Five sidebar entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **The ledger was at the wrong scale.** Written at two and three units an order, it
  summed to $2,921 of net income directly under a revenue chart reading $168,697 — the
  same figure told at two scales on one screen. A store admin's order book is stockists
  ordering by the carton, so the quantities are wholesale and net income now lands at
  $196,088, next to the reference's own $193,000.
- **The inert sidebar labels measured 4.04:1** at 45% against the dark ground — dimmed
  past readable rather than dimmed. 55% is 5.38:1, against 85% for the live entries.
- **Customers had two bands of empty card**: six people in a 790px column, and a "Their
  orders" list with fewer than three rows each. The ledger grew to thirty orders and the
  tier split went under the list — both are facts about the same six people, not padding.
- **The "margin" was a ratio of the wrong pair.** Income over expenses reads 131%; income
  minus expenses over income reads 57%, which is what a margin is.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

1. **The board is dropped** — the grey surround and the panel's shadow are a presentation
   effect. The sidebar keeps its rounded corners, because in this design it is a dark
   panel sitting *on* the ground rather than a rail attached to the edge.
2. **Built at 1440×900**, not at the board's 736×552.
3. **A games console, a phone and a coffee chain are gone.** The reference puts three real
   marks on its order rows over invented references in an invented store (rule 8). The
   catalogue here is this store's own goods, drawn — a shirt at 32px in a list is
   interface, not a photograph of a shirt.
4. **Net Income and Total Return are summed from the ledger.** The reference prints
   $193.000 here and again as the Revenue card's headline, over twelve months of bars that
   are nothing like it.
5. **Total View Performance adds up.** The reference labels its ring 16% / 23% / 68%,
   which is 107%. These are counts, and the shares are computed from them.
6. **A falling return is green.** A return that falls is good news, so `Delta` takes
   `goodWhen` rather than assuming up is green.
7. **"Search anything in Dravelo" is a real search box**, filtering whichever pane is
   showing.
8. **The three dark-card actions all work.** "See Statistics", "Guide Views" and "Update
   to Dravelo+" go nowhere in the picture.
9. **A visible focus ring everywhere.** The board has none.
10. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the ring is drawn at its angles, the columns at their heights, the report bars
at their widths, every figure at its final value. Shot as `shots/reduced.png`.
