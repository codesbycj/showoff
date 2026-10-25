# twisty — episode 1

A freelancer's workspace dashboard, rebuilt from a posed presentation board as a working
three-tab app. Port 5300.

```bash
npm install && npm run dev                              # http://localhost:5300

node ../tools/probe.js http://localhost:5300/ --click "[data-tab='wallet']"
node ../tools/drive.js drive/home.json
node ../tools/shot.js http://localhost:5300/ shots/home.png
```

## The reference

A presentation board: one rounded panel on a slate-blue backdrop with a drop shadow under
it, at roughly 1200×900. That makes it an **inspo brief** and rule 1 is off (series rule
2) — the panel in it is whatever size the designer's artboard happened to be, and nothing
in it was ever on a real 1440px viewport.

So this is built at browser scale: a 1440×900 shell, 32px page gutters, 24px card radius,
14px body, 34px display, 40px controls, laid out in CSS grid fractions so it holds from
1280 to 1920. The board's backdrop is gone, because at real size **the panel is the
viewport**.

> **The picture is not in `ref/` yet.** It arrived in the conversation rather than as a
> file, so `refscan.py` has not been run on it and the palette below was read by eye off
> the shot rather than sampled. Drop it in `ref/` and run
> `python ../tools/refscan.py ref/<shot>.png` to confirm the hexes and the grid; the
> tokens in `src/styles/index.css` are the thing to check against its `roles` line.

| Token | Value | What it is in the shot |
|---|---|---|
| `--color-ground` | `#eceef2` | the page behind the cards |
| `--color-surface` | `#ffffff` | every card |
| `--color-sunken` | `#f3f4f7` | day chips, inert controls, the promo card |
| `--color-ink` | `#12161d` | headings, the selected day, the Paid pill |
| `--color-accent` | `#e8512a` | the TWISTY mark, Senior, the live strip |
| `--color-spark` | `#6d8ed6` | the dot on top of every income stem |

## The three tabs

**Home, Wallet, Projects** are built. **Messages** and **Discover** stay in the nav and
stay inert — dimmed, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and
a click does nothing at all.

Home because it is the screen that was dropped. Wallet and Projects because they are the
two that a freelancer's dashboard actually earns its place on, and the two with real
numbers and real lists in them: Messages and Discover would both have been another list of
people, which is a tab that shows nothing the other three do not already show.

The nav keeps the reference's five items in the reference's order. A three-item nav would
be a different design from the one in the picture.

Every beats file ends by clicking an inert tab with `expectUnchanged: true`, so "nothing
happened" is proved rather than assumed.

## Type

The board's face is a geometric-humanist sans that is not identified anywhere in it and is
almost certainly proprietary. The substitute is **Plus Jakarta Sans** (OFL, via fontsource,
one variable file per subset): single-storey `g`, open apertures, and numerals that hold
at 46px for the `+20%` without looking like a spreadsheet.

It runs slightly wider than the board's face at matched cap height, which cost the Income
Tracker subtitle nothing (it wraps to two lines in the reference too) and cost the premium
card's heading nothing (two lines there as well). No element needed its size changed to fit.

## Interactions

Every one of these is a beat in `drive/`, photographed and diffed. The three files run
67 beats between them with zero problems — including "did nothing" checks on both inert
tabs.

| Control | What happens | Beats file |
|---|---|---|
| Income chart, hover a day | The column, the stem and the dot light up; the pill moves to that day with its figure | `home` |
| Income chart, click a day / chip | Selects it; the pill stays there when the pointer leaves | `home` |
| Week / Month / Year | Three different series from the deck — 7, 5 and 12 marks, re-labelled chips, a recalculated `+20%`. **Year is negative**, so the card has to be able to say income fell | `home` |
| Recent Projects, chevron | Expands that project, closes the one that was open | `home` |
| Recent Projects, scroll | Inner scroll region, ten projects | `home` |
| Let's Connect, `+` | Becomes a tick, the role line becomes "Request sent", and it undoes | `home` |
| Upgrade now | Swaps the promo copy for what is actually in the plan, and back | `home` |
| Proposal figures | Selecting one writes the conversion line underneath — real arithmetic off the same three numbers | `home` |
| Date pill | Three real periods with three sets of figures and three strip shapes | `home` |
| Search | Filters the project list, has an empty state, and clears | all three |
| Sort | Four orders, by rate, progress, hours or recency | `projects` |
| Paid / Not paid | Filters the table; the footer totals what is *shown*, so one click changes two numbers | `projects` |
| A table row | Redraws the whole detail pane: ring, facts, sparkline, client, action | `projects` |
| Hours sparkline | The read-out follows the day under the pointer | `projects` |
| Request payment | Toggles, and resets when another project is selected | `projects` |
| Withdraw | Swaps the card art for a real panel, and back | `wallet` |
| Donut slice / legend row | Either one highlights both and writes that figure into the middle of the ring | `wallet` |
| Month bars | The read-out follows the bar under the pointer | `wallet` |
| Cleared / Pending | Filters the payouts; the footer total follows | `wallet` |
| Nav: Messages, Discover | **Nothing.** Proved with `expectUnchanged` | all three |

Data is bundled and seeded (`src/data/rng.ts`), so the proposal strips and the per-project
sparklines are the same on every reload — the chart that was measured is the chart that
gets filmed.

## What the probe found

All of it in my own build, none of it visible in a screenshot:

- **The muted grey failed AA on every ground.** 3.21:1 against white across **37 text
  nodes** — most of the small print on Home. The board's secondary grey is lighter still.
  Darkened to `#656b78`: 5.34:1 on white, 4.60:1 on the page ground, 4.85:1 on a chip.
- **White on the brand red is 3.72:1**, under AA for the 12px "Senior" pill. Added
  `--color-accent-deep` (`#c73f1c`, 5.01:1) for the one place the accent carries text; the
  mark, the stems and the pending bar keep the brand red exactly.
- **The positive green was 2.95:1 on its own tint** behind every "Cleared" badge.
  Darkened to `#15704a`: 5.32:1.
- **The search input was a 20px tap target** inside a 44px pill — the text was centred by
  a line box rather than filling the control.
- Status pills were 11px; "Paid" and "Not Paid" are not decoration, so they are 12px.

After those four fixes: **0 contrast failures on all three tabs**, nothing under 24px, no
duplicate SVG def ids, every chart labelled, no animation running at rest, no dead space
over 24px in any region, and no document or horizontal scroll at 1280, 1440 or 1920.

Two of the finds were in the *harness*, not the build, and were fixed there:

- `probe.js` called the premium card's halftone sphere an unlabelled chart. It is
  `aria-hidden` decoration; a decorative SVG is now excluded, because an audit that cries
  wolf trains you to skip the line that matters.
- `drive.js` reported the donut's slice hovers as doing nothing. They were: **a donut
  segment's bounding box is centred in the hole**, so "hover the middle of the slice" was
  hovering the card behind it. `hitpoint.page.js` now probes the box for a point that
  `elementFromPoint` actually resolves to the element — and deliberately does not accept
  an ancestor, which is what made the first attempt still pass on the hole.

## Declared departures

Everywhere this differs from the picture, and why.

1. **No backdrop.** The board's slate-blue surround and the rounded panel floating on it
   are gone. At real size the panel is the browser viewport (series rule 2).
2. **Built at 1440×900, not at the board's scale.** No measurement was taken off the
   shot; the type scale, radii and spacing are chosen for a real screen.
3. **The muted grey, the accent-on-text red and the positive green are all darker than
   the board's**, for the contrast reasons above.
4. **Controls are bigger.** The board's circular buttons are about 30px; here they are
   36–40px, and the chart's day chips are 40px.
5. **Two tabs are built that the shot does not show.** Wallet and Projects are invented in
   the same design language — the board only ever shows Home.
6. **The date pill picks between three periods** instead of naming one, and **selecting a
   proposal figure writes a conversion line** under the three. Both are controls the board
   could not have, since it is a still picture; the conversion rate is the question those
   three figures exist to answer and the board leaves the reader to do the division.
7. **The income chart's range control is real.** The board shows "Week" with no menu.
8. **Ten projects, not three.** Three rows do not fill a 1440×900 shell and do not give
   the list anything to scroll.
9. **A visible focus ring, everywhere.** The board has none; no presentation board does.
10. **The TWISTY mark is invented**, drawn in the board's idiom — a rounded square in the
    brand red with a white twist cut out of it. The copy is invented, so the mark has to be
    (series rule 8).
11. **The faces are free-licensed Pexels portraits**, credited in
    `src/assets/img/CREDITS.md`, standing in for photography that is not redistributable.
12. **The month bars use a baseline below the smallest month**, not zero. Six months of one
    freelancer's income all sit in the same band and a zero baseline says nothing at 86px
    tall. There are no gridlines implying otherwise and the figure is printed above the
    chart.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing here is gated on an
entrance — the chart draws at its final height, the strips are at full length, every
tooltip still opens and every control still works — so the dashboard is fully usable with
it on. Shot as `shots/reduced.png`.
