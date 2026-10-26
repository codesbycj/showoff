# finexy — episode 6

A multi-wallet money dashboard, rebuilt from a posed board as a working three-tab app with
a real light/dark switch. Port 5320.

```bash
npm install && npm run dev                              # http://localhost:5320

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5320/ --click "[data-tab='manage']"
node ../tools/drive.js drive/overview.json
```

## The reference

`ref/shot.png`, 1200×900. `refscan.py` reads `#ffffff` and `#eaeaea` as 88% of the frame
and finds the orange at just over one per cent: `#ec5329`, with `#ef633f` and `#f77543` as
its lighter steps. The ink it found is `#1e1e16` — a warm near-black rather than a grey,
which is what makes this design feel like paper rather than like a screen, so it is kept.

It is a posed board, so this is an **inspo brief** and the backdrop goes.

**Figtree** is the substitute: a friendly grotesque with the slightly condensed figures
this design needs, since the balance, four KPI tiles and a price column all have to sit in
narrow cards.

## The three tabs, and the rail

**Overview, Activity and Manage** are built. Program, Account and Reports stay in the nav
and are inert.

Overview because it is the screen that was dropped. Activity because the five rows on it
are a sample of a ledger with nowhere else to read it. Manage because the wallets, the
cards and the spending limit are all shown on the Overview as summaries with no page
behind them — on Manage each one has room, which is the whole reason it is a tab rather
than another page of the same ledger.

**The left rail is a second presentation of the same destinations, not a second nav.**
Three of its icons carry the three live tabs and stay in step with the bar above; the other
six are inert in exactly the way the bar's inactive entries are. A rail that navigated
somewhere the top nav could not would be two navigations disagreeing on one screen. Every
rail icon is labelled; the reference's are not.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**71 beats with zero problems**, including "did nothing" checks on two inert nav entries
and two inert rail icons — and a live rail icon proving the rail really does navigate.

| Control | What happens | Beats file |
|---|---|---|
| Currency | Shows that wallet's balance in its own symbol rather than converting everything to dollars — which is what a multi-currency account does | `overview`, `manage` |
| A wallet row | Selects it, with a border rather than a tint four values from its own hover | `overview`, `manage` |
| Transfer | Raises the live-transfer count in the greeting | `overview`, `manage` |
| Hover the chart | Highlights that period and names both figures | `overview`, `manage` |
| Monthly / Quarterly | Two real series — eight months or four quarters — with the two totals under the legend recomputed | `overview`, `manage` |
| A card | Reveals its number and CVV, and hides them again | `overview`, `manage` |
| Activity filter | Five states; the footer counts and totals what is left | `overview`, `activity` |
| Row checkbox, select-all | Real selection across the filtered rows | `overview`, `activity` |
| Search | Filters the ledger, with an empty state | `overview`, `activity` |
| Theme | A real switch: every token is redefined for dark | `overview`, `manage` |
| Two nav entries, two rail icons | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **White on the brand orange was 3.60:1** — the lead figure tile, the orange card and
  every label on them, which is most of the colour on the screen. Added
  `--color-accent-strong` (`#cf440f`, 4.68:1) for the orange that *carries text*; the brand
  orange is unchanged everywhere it is a mark rather than a surface. The faded white
  (`/80`, `/85`) on those tiles went to full white, because on a filled tile the hierarchy
  has to come from size and weight — white at any reduced opacity on orange fails.
- **The positive green was 4.38:1 and the danger red 4.46:1** on their own tints. Both
  darkened.
- **The activity table was taller than its slot.** The card took its content height inside
  a `flex-1` wrapper, so eight of the eighteen rows were clipped by the shell and
  unreachable — the scroller could not scroll because it was not the thing overflowing.
  `drive.js` caught it as a scroll beat that changed nothing.
- **A Tailwind gotcha, and a good one.** `border-ink` added to a class string that already
  had `border-line` did nothing: two utilities that set the same property have equal
  specificity, so the winner is decided by their order in the generated stylesheet, not in
  the attribute. The selected wallet row stayed four values from its own hover state —
  invisible to the eye and below the threshold the numeric diff uses. The colour is
  conditional now, never additive. Written into the series rules.
- After those: 0 contrast failures on all three tabs **in both themes**, nothing under
  24px, no duplicate SVG def ids, nothing animating at rest, no dead space over 24px, and
  no document or horizontal scroll at 1280, 1440 or 1920.

## Declared departures

1. **No backdrop.** At real size the panel is the viewport.
2. **Built at 1440×900**, not at the board's scale.
3. **The text-bearing orange is three steps deeper** than the brand orange, for the
   contrast reason above. The green and the red are darker too.
4. **The card numbers are masked to four digits** and the reveal shows an obviously
   invented number. A build with invented copy should not display something shaped like a
   real card number, revealed or not.
5. **The spending-limit card says what its bar means** — the percentage and what is left —
   and turns amber past three quarters. The reference draws the bar and two figures and
   leaves the reader to do the division; the only reason to draw a limit is to notice
   approaching it.
6. **Eighteen activities, not five.** Five rows do not fill a 1440×900 shell and give the
   scroller nothing to scroll.
7. **The rail is labelled and partly live**, as described above.
8. **A visible focus ring everywhere.** The board has none.
9. **The Obolin mark is invented**, drawn in the board's idiom — an orange disc with a
   rising stroke cut out of it.
10. **The activity icons are drawn**, not brand marks: the reference shows what look like
    real app icons, and a real brand on an invented invoice is the one thing this series
    must not produce.
11. **The account portrait is a free-licensed Pexels photograph**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the bars draw at their final heights, the limit bar is at its width, and every
control still works. Shot as `shots/reduced.png`.
