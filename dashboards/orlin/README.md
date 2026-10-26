# orlin — episode 14

An investment console with a tool rail down the left edge, rebuilt from a posed board as a
working three-tab app. Port 5352.

```bash
npm install && npm run dev                              # http://localhost:5352

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5352/ --click "[data-tab='wallets']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 1200×900: a rounded panel on a flat grey ground. refscan read the palette
off it — `#f5f5f5` for the panel, `#f05409` for the orange, `#402917` for the dark tile,
`#e7dfd4` and `#ffefd3` for the creams. It is a **posed board**, so this is an **inspo
brief**; the board is dropped and the panel's ground becomes the page.

**Space Grotesk** is the substitute — a grotesque with the squared bowls and the
distinctive single-storey figures this design sets its totals in. The figures are written
the continental way, `12.135,00`, because that is part of what the design looks like.

## The three tabs

**Dashboard, Activity and Wallets** are built. **Settings** stays in the nav and is
genuinely inert: muted, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`,
and a click does nothing.

This design's nav is four pills in the middle of the header, so three live leaves exactly
one inert rather than the usual two. Inventing a fifth to make the arithmetic tidier would
be a different design from the one in the picture.

**The left rail is not nav.** In the reference it is search, share, calendar, star and
shield — tools, not destinations — so it is built as a toolbar, and every one of its
controls does something: the star filters every pane's ledger to money in, the shield
masks every figure on the page, share copies a link, and the top control collapses the
rail itself. Six dead controls down the left edge would be worse than no rail at all.

Dashboard because it is the screen that was dropped. Activity because the three tiles are
summaries of a ledger with nowhere to go. Wallets because the nav pill carries a chevron
and nothing behind it.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**70 beats with zero problems**, including a "did nothing" check on the inert tab in each.

| Control | What happens | Beats file |
|---|---|---|
| Weekly / Monthly / Yearly | Three different twelve-bar series, re-labelled axis | `dashboard` |
| Hover a bar | Darkens it and names which side it is and its figure | `dashboard` |
| An activity tile | Selects it, including the inverted one | `dashboard` |
| **The star** | Filters every pane's ledger to money in | all three |
| **The shield** | Masks every figure on the page — totals, tiles, averages, amounts | all three |
| Share | Copies a link and can be un-copied | `dashboard` |
| The rail's top control | Collapses the toolbar and brings it back | `dashboard` |
| Add card | Confirms in place and can be undone | `dashboard` |
| The prompt's × | Dismisses it | `dashboard` |
| Sort | Name, date and amount, both ways, with the direction in the header | all three |
| Status filter | Four states; the three figures and the counterparty split all restate | `activity` |
| A wallet | Its own balance, its own thirty days, its own rows | `wallets` |
| Move 500,00 | Confirms in place and can be undone | `wallets` |
| Search | Filters the ledger on whichever tab is showing, with an empty state | all three |
| Settings | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **The active state never appeared.** `IconButton` stacked `active && 'bg-cocoa …'` on
  top of `tone === 'quiet' && '… hover:bg-sunken hover:text-ink'`, and both carry a hover
  background — so which one won was decided by their order in the generated stylesheet.
  With the pointer resting on the button, which is exactly where a beat leaves it, the
  base hover won and the toggle was invisible: `drive.js` reported un-sharing as **zero
  changed pixels**. The base tone is `!active` now, so there is nothing to override.
- **A card whose only content was a sentence explaining the toolbar** is padding dressed
  as content. It is the three wallets, summed from the same ledger the table beside it
  lists.
- Zero contrast failures on the first pass, because the accent was split before anything
  was built: `#f05409` carries white at 3.51:1 — fine for a 24px figure, not for a 13px
  button — so it is the *mark* colour and `#c0400a` is the one anything with text on it
  uses.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

1. **The board is dropped** — the grey surround and the panel's shadow are a presentation
   effect.
2. **Built at 1440×900**, not at the board's 1200×900.
3. **The left rail is a toolbar, not a second nav**, and all six of its controls work.
   Explained above.
4. **Weekly average and Annual average are different numbers.** The reference prints both
   as 25.460,00, which cannot be true of one account unless it moves the same amount in a
   week as in a year. Both are computed from the ledger.
5. **The summary's two totals are the sum of its own bars.** In the reference they are
   written separately from the chart beneath them.
6. **The shield and the star reach every pane.** They are two of three things that cross
   tabs here, which is what makes the rail worth having.
7. **A visible focus ring everywhere.** The board has none.
8. **The portraits are free-licensed Pexels photographs**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the bars are drawn at their heights, the traces at their points, the meters at
their widths, every figure at its final value. Shot as `shots/reduced.png`.
