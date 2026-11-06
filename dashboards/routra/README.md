# routra — episode 23

A fleet and driver console, rebuilt from a posed mock-up as a working three-tab app.
Port 5388.

```bash
npm install && npm run dev                              # http://localhost:5388

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5388/ --click "[data-tab='routes']"
node ../tools/drive.js drive/fleet.json
```

## The reference

`ref/shot.png`, 1200×900: a dispatch console — near-black icon rail, a driver list, and a
detail column carrying a vehicle, its routes and the driver's day. refscan read `#ffffff`
across half the frame, `#e1e4e9` for the panel ground and a blue for the status bars.

**DM Sans** is the substitute: a geometric sans with tabular figures, which this design
needs for a column of times and payloads.

### The split, measured

`#2f6fed` carries white at 4.55:1 — over the line by a hair, which is not a margin for a
status pill read from across a dispatch desk — so it is the *mark* colour and `#1f5ad4`
(6.05:1) is the one anything with text on it uses. The two state colours are the opposite
case: the amber is 2.36:1 under white and the light blue 2.43:1, while both clear 5:1
under ink, so those two chips carry ink type.

## The three tabs

**Fleet, Routes and Vehicles** are built. **Live map, Depot, Messages, Paperwork** and
**Alerts** stay in the rail and are genuinely inert: muted, `aria-disabled`, skipped by the
keyboard, `cursor: not-allowed`, and a click does nothing.

Fleet because it is the screen that was dropped. Routes because the fleet screen shows one
driver's loads at a time and a depot runs on the whole board. Vehicles because the fleet
screen names a van and gives its payload, and there is nowhere to see the other seven — or
which of them is out of service.

**One driver list feeds all three.** Twelve drivers carry a vehicle, a state and a shift
start; the rail's counts, the detail header, the route cards, the day-by-category bar, the
week chart and the vehicle crewing all read them.

## Interactions

Every one is a beat in `drive/`. The three files run **61 beats with zero problems**, plus
the five-beat hover sweep `probe.js --beats` generated.

| Control | What happens | Beats file |
|---|---|---|
| A driver | Changes the vehicle, the load diagram, the routes and the whole day panel | `fleet` |
| A state in the day bar, or its row | Dims the other three, both ways round | `fleet` |
| Hover the day bar or a week bar | Names the state and the hours, against the average | `fleet` |
| Search drivers | By name or vehicle, with an empty state | `fleet` |
| On the way / Planned / Completed | Four lenses over every route in the depot | `routes` |
| Sort | Packages, distance, route id | `routes` · `vehicles` |
| A route row | Expands to weight, volume, time left and every stop | `routes` |
| Trucks / Vans | Two lenses over the fleet | `vehicles` |
| A vehicle card | Expands to payload, volume, last service, loads logged and the crew | `vehicles` |
| Scroll | Four regions scroll inside the shell; the page never does | `fleet` · `routes` |
| Tab, Tab | A visible focus ring, proved as a beat | `fleet` |
| Six inert destinations | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **Six contrast failures from using a mark colour as text.** The driver rows printed each
  state in its own colour on white — amber at 2.36:1, light blue at 2.43:1. The colour
  belongs to the dot on the avatar; the label is muted type now, and the two pills that
  keep a coloured ground carry ink.
- **An inert link was an 18px target.** Being inert does not exempt it from the floor: it
  is 28px now.
- **The React Compiler refused two `useMemo`s** around the seeded day and week generators.
  They are two cheap loops; the manual memoisation came out and the compiler does it.
- After those: 0 contrast failures on all three tabs, no duplicate SVG def ids, every
  chart labelled, no dead space over 24px, no document or horizontal scroll at 1280, 1440
  or 1920, and no animation running at rest.

### Targets under 44px

Listed, with the reason. Nothing is under 24px: the segmented controls are 28px, which is
the reference's own control scale.

## Declared departures

1. **Built at 1440×900**, and the console runs to the window edge as the picture does.
2. **The brand is invented.** The reference has no wordmark at all; **Routra** is added
   above the driver list with a mark drawn in the same idiom — a route turning through two
   stops.
3. **Every vehicle marque is invented.** The reference names Volkswagen, Mercedes-Benz,
   Volvo and MAN. A real manufacturer's model over invented payloads and invented drivers
   is the one thing this series must not produce (rule 8), so the fleet is Tolvan, Orelle,
   Harlo and Modrin.
4. **The vehicle photograph is a dimensioned load space.** A van is a picture of a thing,
   so it cannot be drawn as a cartoon — and unbranded photography of one barely exists,
   because every van carries a marque on its nose. The hero is the thing a dispatcher
   actually reads: the load space as an elevation with its length and width on it, which
   is interface rather than a drawing of a van.
5. **The map thumbnail is a stop timeline.** A map is a picture of a place, so drawing one
   is tracing rather than expressing an idea (rule 8), and a static tile would be a
   network dependency in a take. The stops carry where it has been, where it is going and
   when — which is what the map was standing in for.
6. **The day's percentages have a total.** The reference prints 39.7 / 28.3 / 17.4 / 14.6
   with no total anywhere — four shares of an unstated day. Here the bar states the hours
   logged, and each percentage is computed from the minutes printed beside it.
7. **The weekly average is one line, not a second bar.** It is the same number every day;
   drawing it seven times says otherwise.
8. **A visible focus ring everywhere.** The picture has none.
9. **The portraits are free-licensed Pexels photographs**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the day bar is drawn at its widths, the week bars at their heights, every figure
at its final value. Shot as `shots/reduced.png`.
