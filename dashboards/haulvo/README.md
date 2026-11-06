# haulvo — episode 24

A freight shipment builder, rebuilt from a posed browser mock-up as a working three-tab
transport desk. Port 5392.

```bash
npm install && npm run dev                              # http://localhost:5392

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5392/ --click "[data-tab='shipments']"
node ../tools/drive.js drive/build.json
```

## The reference

`ref/shot.png`, 1200×900: a macOS browser window posed on a lilac board, showing
`shippit.com` building one shipment. An icon rail with six glyphs, a column of cargo
cards on the left, and a right-hand column carrying a map, a route list, a truck, a
driver, an end location, a start time and a note.

refscan read `#ffffff` across 57% of the frame, `#eceff6` for the page ground, `#c7cddd`
for the board the window sits on, and `#1161fe` for the one accent — the Submit button,
the stop markers and the route line. The board and the window chrome are presentation
furniture and both are dropped, so the rail runs to the window edge.

**Inter** is the substitute. The reference's face is a geometric grotesque with tabular
figures; this screen is three columns of times, weights and plate numbers, so tabular
figures mattered more than the exact letterforms.

### The split, measured

`#1161fe` carries white at 4.55:1 — over the line by a hair, which is not a margin for a
button that is the only thing on the screen you cannot undo — so it is the *mark* colour
and `#1d4ed8` (6.3:1) is the one anything with text on it uses. The three leg colours are
the same case in reverse: delivery green, pick-up amber and transfer blue all clear 4.5:1
under white type at the deep end of their ramp, which is what the `Delivery` / `Pick-Up` /
`Transfer` chips use.

One colour was added that the reference has no equivalent for: `--color-draft` `#8795ab`,
at 3.06:1 against white. A draft shipment's bar had been painted in `--color-sunken-deep`
and was invisible on the card — a bar that carries meaning is a graphic, and 3:1 is its
floor.

## The three tabs

**New shipment, Shipments and Tracking** are built. **Reports, Clients** and **Settings**
stay in the rail and are genuinely inert: muted, `aria-disabled`, skipped by the keyboard,
`cursor: not-allowed`, and a click does nothing. So is **Add load** — the one control in
the reference that would need a form this episode does not have.

New shipment because it is the screen that was dropped. Shipments because the builder
works on exactly one and a planner lives on the board of all of them. Tracking because
the builder's whole output is a truck that then has to get somewhere, and nothing in the
reference says where anything has got to.

**One shipment list feeds all three.** Six shipments carry their loads, each load its
client, its leg, its weight, its pallets and its stops; the board's four counts, the
builder's totals and utilisation, both charts and every tracking progress bar read them.
Change one load's weight and the stat tile, the bar chart, the meter and the leg totals
all move.

## Interactions

Every one is a beat in `drive/`. The three files run **67 beats with zero problems**, plus
a four-beat hover sweep.

| Control | What happens | Beats file |
|---|---|---|
| A cargo card | Expands to weight, pallets and leg; one open at a time | `build` |
| The filter glyph | Cycles Delivery → Pick-Up → Transfer → all, named in a chip | `build` |
| A client's call button | Swaps the company for their number, both ways | `build` |
| Change truck / change driver | Cycles the fleet and the roster; utilisation recomputes | `build` |
| Before departure | Three checks, toggled, counted in the heading | `build` |
| Search loads | By id, leg or client, with an empty state | `build` |
| Save as draft / Submit | Changes the button, its icon and the note's status line | `build` |
| A state tile | Filters the board to draft, booked, in transit or delivered | `shipments` |
| Sort | Starting soonest, heaviest, most loads | `shipments` |
| A shipment row | Expands to start, stops, pallets and how full the truck is | `shipments` |
| Hover a utilisation bar | Names the shipment and its weight against capacity | `shipments` |
| Search the board | By reference or driver, with an empty state | `shipments` |
| All runs / On the road / Booked | Three lenses over tracking | `tracking` |
| A run | Changes the progress, the driver, every stop and what is on the truck | `tracking` |
| Scroll | Four regions scroll inside the shell; the page never does | all three |
| Tab, Tab | A visible focus ring, proved as a beat | `build` |
| Five inert destinations | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **The resources card clipped its own content.** The third departure check was cut in
  half: the card needed 446px in a 410px row, and because the overflow was hidden rather
  than scrolled, `scrollHeight` matched `clientHeight` and nothing reported it. The right
  column is `1.4fr 1fr` now, and the route timeline spreads into the extra height instead
  of leaving a band under its last stop.
- **Two panes ran a third empty.** The shipments board had six rows in a card with space
  for ten, and the tracking detail had four stops in 600px. probe's dead-space check is
  per scroll region and passes them both — it measures the foot of a region, not a hole in
  the middle of a card. Fixed by having more to say, not by padding: the board gained the
  two charts, tracking opens on all six runs and its detail card gained the driver, each
  stop's state and what is on the truck.
- **Two controls did nothing.** The filter glyph and the three call buttons were drawn,
  hovered and inert — the exact thing rule 5 exists to prevent. Both are real now.
- **Four beats changed zero pixels.** Two wheels on regions that overflow by 6px and 0px,
  and a click on a row the scroll had pushed out of sight. A scroll beat needs something
  to scroll and a click beat needs a visible row.
- **The seeded primitives carried another episode's showcase.** `Delta`, three `Meter`
  tones, three `IconButton` tones, a `Button` variant and four of the five number
  formatters had no caller here, and three doc comments still described a crypto wallet.
  All gone — and one of those unused tones is what made the hover sweep report a rule that
  matches nothing on the page.
- After those: 0 contrast failures across all three tabs, no duplicate SVG def ids, both
  charts labelled, no dead space over 24px, no document or horizontal scroll at 1280, 1440
  or 1920, and no animation running at rest.

### Targets under 44px

Listed by the probe, with the reason. Nothing is under 24px: the sort segments are 36px,
the search boxes 38px, the call buttons 30px and the departure checks 30px, which is the
reference's own control scale for a row of checkboxes.

## Declared departures

1. **Built at 1440×900**, and the desk runs to the window edge. The browser chrome and
   the lilac board are presentation furniture.
2. **The brand is invented.** The reference's window reads `shippit.com`. **Haulvo** is
   the name here, with the reference's own isometric-box mark redrawn in the same idiom.
3. **The truck marque is invented.** The reference names a Volvo FMX 460. A real
   manufacturer over invented cargo and invented drivers is the one thing this series must
   not produce (rule 8), so the fleet is Modrin, Harlo and Orelle.
4. **The map is a stop timeline.** A map is a picture of a place, so drawing one is
   tracing rather than expressing an idea (rule 8), and a static tile would be a network
   dependency in a take. The route card carries the six stops with their times and
   addresses — which is what the map was standing in for, and it is the thing the planner
   actually reads before pressing Submit.
5. **The reference's addresses do not exist and do not agree.** "Anytown, NY 12345" and
   "Springfield, IL 67890" are placeholder towns with placeholder zips, and the run
   crosses two states while the route is drawn as one afternoon's drive. The whole run is
   in Illinois here, out of a Springfield desk.
6. **The start time is after the first stop now.** The reference's start time is
   `12.08.2022, 8:30` against stops dated 06.05.2023 — a shipment that departs eight
   months after it arrives. Every date on this screen is in May 2027 and in order.
7. **The driver's email address is an email address.** The reference's driver card prints
   "Email address: Flatbed Truck", which is the truck type repeated into the wrong field.
8. **The phone numbers are local.** The reference gives an Illinois freight run a Munich
   landline. Drivers and clients are on `+1 217 555`, the reserved range.
9. **"1 loads" is "1 load".** The board counted in a plural whatever the number was.
10. **Utilisation is stated.** The reference prints a truck's capacity and a shipment's
    weight on two different cards and never divides one by the other. Here the builder
    shows how full the truck is as a meter, the board charts it across all six, and over
    100% turns the figure red.
11. **The departure checks are added.** The resources card ran a third empty below the
    driver block, and a planner has a real third thing to do there before a truck leaves.
12. **A visible focus ring everywhere.** The picture has none.
13. **The portraits are free-licensed Pexels photographs**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the meters are drawn at their widths, the bars at their heights, every figure at
its final value. Shot as `shots/reduced.png`, pixel-identical to `shots/build.png`.
