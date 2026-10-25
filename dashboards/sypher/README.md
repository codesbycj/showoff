# sypher — episode 5

A fleet and financials console, rebuilt from a posed board as a working three-tab app.
Port 5316.

```bash
npm install && npm run dev                              # http://localhost:5316

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5316/ --click "[data-tab='fleet']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 1200×900: a white panel with a hairline border on a pale sage ground.
`refscan.py` reads `#ffffff` and `#e5e8e5` as 92% of the frame between them, which is
exactly right — this design is almost entirely white cards on one grey, with colour used
only by the charts. Its accents are the greens it found at a tenth of a per cent each:
`#13b040`, `#14c14e`, `#80f09c`.

It is a posed board, so this is an **inspo brief** and the backdrop goes.

This is the densest of the seven: flat 14px cards, a 52px nav, a 38px range strip, and
tabular figures everywhere. **Inter** is the substitute, chosen for its tabular numerals —
four of the five cards on the dashboard are columns of numbers that have to line up.

## The three tabs

**Dashboard, Financials and Fleet** are built. Customers, Reports, Insights and Employees
stay in the nav and are genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard,
`cursor: not-allowed`, and a click does nothing.

Dashboard because it is the screen that was dropped. Financials because the revenue chart
and the cost breakdown on it are summaries with no page behind them. Fleet because "fleet
utilisation 95.1%" is the first figure on the dashboard and there is nowhere to see what
it is a percentage of. The other four would each have been another table of the same
ledger.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**75 beats with zero problems**, including "did nothing" checks on four inert nav entries.

| Control | What happens | Beats file |
|---|---|---|
| Range (Last month / quarter / year) | Redraws the delivery figures *and* the revenue series — three different data sets | `dashboard`, `financials` |
| Hover the revenue chart | A crosshair, a marker on every visible line, and a read-out with all three figures at that date | `dashboard`, `financials` |
| Revenue / Costs / Net profit | Real legend toggles: each one adds and removes its line and its read-out row | `dashboard`, `financials` |
| Line / bar | Redraws the same three series as grouped bars | `dashboard`, `financials` |
| Vs. previous period | Toggles, and says what the comparison would be rather than pretending to draw it | `dashboard` |
| Balance bars | Hovering any month names it and dims the rest | `dashboard` |
| Costs: bar or row | Either lights both and the figure at the top becomes that category's | `dashboard`, `financials` |
| Invoice filters | All / Unpaid / Resent / Paid, with the page and the totals following | `dashboard` |
| Row checkbox, select-all | Real selection, including select-every-row-on-this-page | `dashboard` |
| Show by | Auto fits the page to the card; 10 and 25 are fixed | `dashboard` |
| Pagination | Real pages, with the ends disabled | `dashboard` |
| Generate Report | Toggles to "Report queued" | `dashboard` |
| Fleet state filters | Four states, each with vehicles in it; the summary re-states itself from the rows showing | `fleet` |
| Sort | Utilisation, miles or driver | `fleet` |
| A vehicle row | Selects it into the summary card | `fleet` |
| Search | Filters invoices or vehicles, with an empty state | all three |
| Four nav entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the shots found

**One bug here was in the shared chart maths and it affected every episode.**
`niceTicks` stopped its loop at `max`, which can leave the top tick *below* the largest
value — with max 110,450 and a step of 50,000 the ticks ended at 100,000. Every chart in
this series maps its plot height onto the last tick, so the tallest bar came out at 110%
of the plot and ran off the top of its card, and this episode's revenue line clipped its
own peak. Fixed in all seven `scale.ts` files and in the scaffold; episodes 2 and 3 were
re-verified afterwards.

The rest:

- **The danger red was 4.39:1 on white** behind every falling figure. Darkened to
  `#c62f42`: 5.40:1.
- **Thirty-odd targets were under 24px**, almost all of them text controls only as tall as
  their line box — the legend toggles, "Vs. previous period", "Manage layout". Padded and
  pulled back with a negative margin, which makes a 26px target without moving the text.
  The invoice checkbox keeps its 18px box inside a 24px button.
- **The cost bar's segments were 10px tall.** The band still is; each segment's button now
  carries a 26px hit area through `py-2 -my-2` with `bg-clip-content`.
- **The invoice table left a band of empty rows.** "Show by" now defaults to Auto, which
  measures the region and paginates to it — so the table is full at 820, 900 and anything
  else, which a fixed ten could not be.
- **The fleet had no vehicles in Maintenance.** The seeded draw happened to miss it, so one
  of the four filters had nothing to show and the beat exercising it proved nothing. States
  are assigned round-robin now.
- After those: 0 contrast failures on all three tabs, no duplicate SVG def ids, nothing
  animating at rest, and no document or horizontal scroll at 1280, 1440 or 1920.

## Declared departures

1. **No backdrop.** At real size the panel is the viewport.
2. **Built at 1440×900**, not at the board's scale.
3. **The on-time meter's marker sits on its reading.** The reference draws the same
   red-to-green bar but puts the marker at the far right whatever the number says.
4. **The utilisation meter's amber ticks are the band between the target and the figure**,
   rather than two amber ticks placed for looks.
5. **"Show by" defaults to Auto**, not the reference's 10 — see above.
6. **Twenty-two invoices and eighteen vehicles**, not the ten the board shows: ten rows do
   not fill a 1440×900 shell and give the scrollers nothing to scroll.
7. **"Vs. previous period" names the comparison instead of drawing it.** There is one
   period of data in this build; a second ghosted series would be invented twice over.
8. **The balance chart's hit strips are 13px wide.** They are chart marks over a continuous
   series and every figure is in the chart's `aria-label`; widening them would mean fewer
   months. Listed rather than fixed.
9. **A visible focus ring everywhere.** The board has none.
10. **Every customer mark is invented** — eight abstract solids on one grid. A real logo
    here would put a real company on an invented invoice.
11. **No photographs.** Nothing on this design is a picture of anything: the only human is
    the account, and the reference draws that as a monogram too.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — every chart draws at its final values and every control still works. Shot as
`shots/reduced.png`.
