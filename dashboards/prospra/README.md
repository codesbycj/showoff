# prospra — episode 21

A B2B sales and marketing CRM, rebuilt from a posed browser window as a working three-tab
app. Port 5380.

```bash
npm install && npm run dev                              # http://localhost:5380

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5380/ --click "[data-tab='sales']"
node ../tools/drive.js drive/dashboard.json
```

The category standard this was built against is
[`../standards/sales-crm.md`](../standards/sales-crm.md), written before the build.

## The reference

`ref/shot.png`, 1200×900: a browser window posed on a pale grey board, both dropped as
presentation furniture. refscan read `#fafafa` across two-thirds of the frame, `#eaeef1`
for the panel ground, `#57b6ec` for the blue and one near-black tile.

**Outfit** is the substitute — a geometric sans with a high x-height, which suits a design
whose headline figures are the loudest thing on screen.

### The accent split, measured

`#57b6ec` carries white at **2.26:1**, nowhere near a label, so it is strictly the mark
colour: the chart fill, the quota rings, the stage dots, a bar. `#176a99` (5.9:1) is the
one anything with text on it uses, and the near-black `--color-ink-fill` is the
reference's own primary tile.

## The three tabs

**Dashboard, Leads and Sales** are built. **Workflows** and **Reports** stay in the nav
pill and are genuinely inert: muted, `aria-disabled`, skipped by the keyboard, `cursor:
not-allowed`, and a click does nothing.

Dashboard because it is the screen that was dropped. Leads because the picture's funnel
has no list behind it, and lifecycle stage is the property the whole category is built on.
Sales because a CRM without a pipeline board is a report — and the board is where the
weighted figure comes from.

**One deal list feeds all three.** Twenty-four deals carry value, stage, owner, source,
close date and idle days; pipeline, weighted pipeline, win rate, average deal, cycle
length, quota attainment, the stage columns, the quarter bar and the "deals to work" queue
are all arithmetic over them.

## Interactions

Every one is a beat in `drive/`. The three files run **79 beats with zero problems**, plus
the four-beat hover sweep `probe.js --beats` generated.

| Control | What happens | Beats file |
|---|---|---|
| This quarter / 6 months / YTD | The revenue chart's window, with the forecast boundary moving | `dashboard` |
| Hover the revenue chart | Names the month, and gives actual, forecast and plan — with "in progress" on the open month | `dashboard` |
| Revenue / Leads / Deals | One chart, three measures, re-axised | `dashboard` |
| Largest / Stalled / Closing soon | Three queues over the open deals, with the counts stated above them | `dashboard` |
| A queue row, or View all | Opens the pipeline | `dashboard` |
| Share, and the message icon | Both confirm in place and can be undone | `dashboard` |
| A lifecycle tile | Filters the list to that stage; press again to clear | `leads` |
| Owner / sort pills | Real menus; the list refilters and reorders | `leads` · `sales` |
| A lead row | Expands to last activity, lifecycle, status and score, and offers the pipeline | `leads` |
| A deal card | Opens the detail: value, weighted value, owner, dates, stage track, and a notice when nobody has touched it | `sales` |
| Search | Names, companies, sources and accounts, with an empty state | `leads` · `sales` |
| Scroll | Six regions scroll inside the shell — the queue, the lead list and the four stage columns; the page never does | all three |
| Tab, Tab | A visible focus ring, proved as a beat | `dashboard` |
| Workflows, Reports, the bell | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **The board claimed 181% committed.** Closed-won plus the *whole* weighted book against
  one quarter's quota — and the book runs out to May. A commit figure may only count deals
  that close inside the quarter; with that, it reads 98%, which is a quarter on track
  rather than a nonsense.
- **The quotas were annual.** Six weeks into the quarter the team read as 18% attained,
  which is a failing team rather than a working one. Quarter-sized quotas put the ring
  colours across the amber/green bands they are there to show.
- **The channel card painted three lines into a two-line slot**, so each row's small print
  overlapped the next row's title. The leads count moved up into the first line.
- **The generated hover sweep hovered the same element twice.** The nav buttons carry both
  `hover:bg-sunken` and `hover:text-ink`, so the second beat was a no-op against the
  first. Every hover beat is diffed against the **resting** frame now, which is what a
  hover sweep means.
- Zero contrast failures on the first probe of every tab, because the accent was split
  before anything was built.
- After those: no duplicate SVG def ids, every chart labelled, no dead space over 24px, no
  document or horizontal scroll at 1280, 1440 or 1920, and no animation running at rest.

### Targets under 44px

Listed, with the reason. Nothing is under 24px: the segmented controls are 28px and the
menu pills 36px, which is the reference's own control scale; both sit clear of their
neighbours.

## Declared departures

1. **The browser chrome and the board are dropped**; built at 1440×900.
2. **The brand is invented.** "ForSelle" becomes **Prospra**, and the mark is drawn in the
   same idiom — two chevrons climbing to the right, which is what a pipeline does.
3. **The headline row is pipeline, not vanity.** The reference leads with audience growth,
   followers and emails sent — three activity counts. This leads with closed-won against
   quota, weighted pipeline, win rate and average deal, which is what the category leads
   with and what the picture never shows.
4. **Weighted pipeline is printed beside the raw figure everywhere.** A board that sums
   only the raw value overstates the quarter, every quarter.
5. **The world map is a country list.** The reference draws a world map carrying a single
   pin reading "USA 50k" — the most expensive way to show one number, and a map is a
   picture of a place rather than an idea, so drawing one is tracing (rule 8). Flag discs
   are interface and are in range, so the block is six countries with drawn discs, counts
   and share bars.
6. **"Total Sales Growth +83.42%" on a striped bar with no scale** becomes the quarter bar
   on the Sales tab: closed-won solid, weighted hatched, quota the full width.
7. **Top Deals carries stage, close date and owner.** The reference's three rows are the
   same customer id, the same date and the same amount — the placeholder tell.
8. **Lifecycle stage, lead status and score are three separate properties**, as the
   category's object model has them.
9. **A visible focus ring everywhere.** The picture has none.
10. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the chart is drawn at its points, the rings at their arcs, the bars at their
heights. Shot as `shots/reduced.png`.
