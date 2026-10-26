# hesper — episode 19

A consulting firm's workspace, rebuilt from a posed browser window as a working three-tab
app. Port 5372.

```bash
npm install && npm run dev                              # http://localhost:5372

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5372/ --click "[data-tab='payments']"
node ../tools/drive.js drive/overview.json
```

## The reference

`ref/shot.png`, 1200×900: a macOS browser window titled `hydracorps.com`, posed on a pale
ground.

**refscan called it a flat UI export, and it is not one** — the same misread as episode
18, for the same reason. Its test is for crisp axis-aligned edges and a frame that is
interface all the way to its border, and a flat *render* of a mock-up passes both. But the
window chrome and the ground around it are a third of the picture, and the app area inside
the chrome is ~1080×760: an artboard, not a browser viewport. So it is read as an **inspo
brief**, built at 1440×900, with the chrome and the ground dropped.

Its palette, read off the picture: white, `#daebf2` for the tinted profit card, `#258196`
for the teal, with `#51bdca`, `#8fe8ee` and `#eeffff` as its lighter steps and `#1f6d7a`
as its darker one.

**Figtree** is the substitute — a humanist geometric sans with a single-storey `g` and
tabular figures, which this design needs for a column of `USD 320/h`.

### The accent split, measured

`#258196` carries white at **4.51:1**. That passes AA for normal text by a hundredth,
which is not a margin to build a dashboard on — a rounding difference in how a browser
composites a 13px semibold label is the whole budget. So the brand teal is the **mark**
colour (the billable cells, the profit curve, the meters, the bars) and `#1a5c69`, at
7.56:1, is the one anything with text on it uses: Export, View All, the active nav rule,
a filled chip. No dark theme, because the reference has none (rule 7).

## The three tabs

**Overview, Task and Payment** are built. **Team** and **Company** stay in the top bar and
are genuinely inert: muted, `aria-disabled`, skipped by the keyboard, `cursor:
not-allowed`, and a click does nothing.

Overview because it is the screen that was dropped. **Task** because both of the
reference's lower cards — "Client in progress" and "Progress Case" — are matters, and the
tab beside Overview is where a matter would open. **Payment** because every figure on the
dropped screen is `rate × hours`, and an invoice is the other end of that same sum: the
Payment tab is the proof that the Overview totals are real.

**One list of twenty matters feeds all three.** Billable hours per client, the Top Clients
bars, the rate column, the twenty-five invoices, the monthly billed-and-collected chart,
every total and every percentage are read off it. Change one matter's hours and all three
tabs move.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**95 beats with zero problems**, plus the six-beat hover sweep `probe.js --beats`
generated.

| Control | What happens | Beats file |
|---|---|---|
| The date-range pill | Three ranges; the curve, the axis, the total and the growth chip all restate | `overview` |
| Hover the curve | The column lights, and the tooltip names that point's date and fees | `overview` |
| A client in Top Clients | Dims the rest and filters the table under it to that client's matters | `overview` |
| The four column headers | Sort client, matter, type or rate, both ways, with the direction in the arrow | `overview` |
| This week / month / all open | A different set of cases, by how soon each matter is due | `overview` |
| Export | Confirms in place, and can be undone | `overview` |
| A table row, a case, View All | All three open the matter on Task, already expanded | `overview` |
| The header's search | Quick find over 20 matters and 10 clients, with an empty state | `overview` |
| The envelope | Three messages, from the people who own those matters | `overview` |
| The bell | Marks the alerts read; press again to restore | `overview` |
| Status chips | Five states, with live counts | `tasks` |
| Due / Value / Hours | Three sort keys, each reversible | `tasks` |
| A fee earner | Filters the list to their matters; their meter fills | `tasks` |
| A matter type | Same, by type, with the type's own value | `tasks` |
| A matter row | Expands to fee earner, billable, value and days left; press again to close | `tasks` |
| Search | Matters, clients and types, with an empty state | `tasks` |
| The four stat cards | Each filters the invoice list to exactly the invoices it counted | `payments` |
| Hover a bar | Names the month and whether it is billed or collected | `payments` |
| Newest / largest / by client | A real menu, and the list reorders | `payments` |
| An invoice row | Expands to its dates, its fee earner and what share of the matter it is | `payments` |
| Scroll | Three regions scroll inside the shell; the page never does | all three |
| Tab, Tab | A visible focus ring, proved as a beat | `overview` |
| Team and Company | **Nothing.** Proved with `expectUnchanged` on all three tabs | all three |

## What the probe and the beats found

- **A click on a row nobody can see reports `NO CHANGE` — correctly.** Two beats expanded
  rows that the list's own sort had pushed below the fold of its scroller, so the pane
  redrew something invisible. That is exactly the beat a take cannot perform, and the
  fix is to name a row that is on screen at that point in the sequence rather than to
  widen the diff.
- **The first filled cell was the colour of an empty one.** The billable-hours cells
  stepped `bill-0 … bill-5` by index, and `bill-0` is the track, so every bar read one
  cell short.
- **The growth chip came out at +60.7%.** The reference prints +20%; the chip is the last
  third of the range against the first third, so the profit shape has to be chosen
  *through* that rather than on its own. A gentler ramp puts it at +15.1%.
- **"Clients with repeat work: 100%"** — a figure that could only ever say one thing,
  because every client in the deck had more than one matter. Two single-matter clients
  make it a measurement.
- **A sort written per key was lying about one sort in three.** With `due` compared
  descending and the other two ascending, "low to high" meant soonest-*last*. Every key
  compares ascending now and `descending` is the only thing that flips it.
- **The column headers were 17px tall**, which `probe.js` reports under its 24px floor.
  A column header you have to aim at is a sort nobody uses.
- **Every invoice was issued at a quarter end**, which put one month's bar at four times
  the rest and left January empty. The dates are spread the way a firm actually bills.
- **"1 days left."** The day counts agree with their number now.
- **Two screens printed two totals of the same money.** The Task tab's By-type
  values sum to the firm's whole book, $473,820, while Payment's "Billed this
  year" read $457,290 — one matter had never been invoiced. Every matter is
  billed now, and the two figures are the same sum read from either end.
- Zero contrast failures on the first pass of all three tabs — 153, 125 and 138 text nodes
  measured — because the accent was split before anything was built.
- After those: no duplicate SVG def ids, every chart labelled, no dead space over 24px in
  any region, no document or horizontal scroll at 1280, 1440 or 1920, and no animation
  running at rest.

### Targets under 44px

Listed rather than fixed, with the reason. Nothing is under 24px.

- **The top-nav entries** are 36–60px wide and 46px tall. They are text links in a
  horizontal bar, as the reference draws them, and widening them to 44px each would
  change the one piece of the design the picture is most recognisable by.
- **The header's three round controls** are 40px, the two pills 40px, the card menus 36px,
  the sort headers 32px and "View all" 36px. These are the reference's own control scale;
  all sit clear of their neighbours.

## Declared departures

1. **The browser chrome and the pale ground are dropped** — both are presentation
   furniture, so the app's own header runs to the window edge.
2. **Built at 1440×900**, not at the picture's ~1080×760 app area.
3. **The brand is invented.** "Hydra Corps." becomes **Caldrow Legal.**, and the mark is
   drawn in the same idiom — a crescent with a four-point star in its opening — rather
   than traced.
4. **Every client name is invented.** The reference's list names two real companies, and
   a real company's name over invented billing figures is the one thing this series must
   not produce (rule 8).
5. **Top Clients is measured in hours, because that is what the card says it is.** The
   reference titles it "by Billable Hours" and labels it in dollars — $2K, $1.5K, $900K,
   $750K — so its bars get shorter as its labels get bigger.
6. **The four metric tiles say what their figures are.** "Increase in success cases 97.5%"
   is a rate wearing the word "increase"; all four are computed from the deck and labelled
   for what they measure.
7. **"12 September – 12 Oktober 2024" is spelled in one language**, and the range is a
   control: three ranges, and the curve follows.
8. **Today is pinned to the deck** (`2026-10-23`), so "This week" means the same seven
   matters at every reload. A window read off the real clock empties itself a fortnight
   after filming.
9. **The View All button floats over the case list, as the reference draws it**, but the
   scroller carries matching bottom padding so nothing is permanently hidden behind it.
10. **A visible focus ring everywhere.** The picture has none.
11. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the curve is drawn at its points, the cells at their fills, the meters at their
widths, every figure at its final value. Shot as `shots/reduced.png`.
