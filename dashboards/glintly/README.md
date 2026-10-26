# glintly — episode 18

A product-analytics dashboard, rebuilt from a posed browser window as a working three-tab
app — and the one episode in the batch with a **light/dark switch**, because the reference
puts one at the foot of its sidebar. Port 5368.

```bash
npm install && npm run dev                              # http://localhost:5368

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5368/ --click "[data-tab='realtime']"
node ../tools/probe.js "http://localhost:5368/?theme=dark"    # the dark design (rule 7)
node ../tools/drive.js drive/home.json
```

## The reference

`ref/shot.png`, 1200×900: a macOS browser window, titled `www.gotics.com`, posed on a pale
ground with ~45px of margin above and below.

**refscan called it a flat UI export, and it is not one.** Its test is for crisp
axis-aligned edges and a frame that is interface all the way to its border; this picture
is a flat *render* of a mock-up, so the edges are 2px clean and the border statistics look
like a screenshot. But a third of the frame is window furniture and pale ground, and the
app area inside the chrome is ~1080×760 — an artboard, not a browser viewport. So it is
read as an **inspo brief**: chrome and ground dropped, built at 1440×900, and the numbers
in it taken as a palette and a hierarchy rather than as a spec. This is what rule 2 means
by looking at the `.grid.png` before trusting the verdict.

Its palette, read off the picture: `#f3f4f8` for the page, white cards, `#245de8` for the
blue, with `#7b9ef2`, `#cad9fa` and `#e8eefc` as its tints.

**Inter** is the substitute, by variable subpath. The reference's own face is a geometric
grotesque with a single-storey `a` in the wordmark only; everything else in it is close
enough to Inter that the 10–15% width tax never showed up.

### The accent, unusually, can carry text

Every episode in this batch so far has needed an accent split — a brand colour for marks
and a deeper one for anything with type on it. `#245de8` carries white at **5.6:1**, so
here the brand blue itself is the button, the bubble and the active pill, and
`--color-accent-deep` is reserved for the dark theme, where the brand blue is too dark
against a dark card and the relationship inverts.

## The three tabs

**Dashboard, Realtime and Conversion** are built. **Customization, Audience, Behavior,
Settings** and **Help Center** stay in the sidebar and are genuinely inert: muted,
`aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click does nothing.
The 10 on Audience and the chevrons on Customization and Behavior stay, because they are
part of the picture — they just do not expand.

Dashboard because it is the screen that was dropped. Realtime because the reference's own
nav promises live numbers and the deck already holds the pages they would come from.
Conversion because "Conv Rate 2,85%" is printed on the dropped screen as a bare figure,
and a conversion rate is the end of a funnel — the tab is that funnel, and it resolves to
the same 2.85%.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**89 beats with zero problems**, plus the five-beat hover sweep `probe.js --beats`
generated.

| Control | What happens | Beats file |
|---|---|---|
| Day / Month / Year | A different series, re-ticked, with the peak callout re-dated | `home` |
| Hover the curve | The column lights, and the tooltip names that point's date and count | `home` |
| Hover a heat cell | Names the day, the slot and the users | `home` |
| Hover a ring slice | Names the device and its share | `home` |
| A device in the legend | Dims the other two, and the ring's centre becomes that device's count | `home` |
| The bell | Marks the notifications read; press again to restore | `home` |
| Search (header) | Quick find over every card and live tab, with an empty state, and a result jumps there | `home` |
| View report | Opens Conversion | `home` |
| Light / Dark | The whole palette, both ways — and both are probed | all three |
| 1 min / 30 min / 24 hrs | A different trail, re-ticked; the day window has the heatmap's two humps | `realtime` |
| A traffic source | Filters the page list to that source, and the clear chip removes it | `realtime` |
| Sort | Active or trend, both ways, with the direction in the arrow | `realtime` |
| A live page | Re-scales the live trail and the headline to that page's share | `realtime` |
| Scroll the page list | 16 pages in a 10-page region | `realtime` |
| Search (live pages) | Filters by path and title, with an empty state | `realtime` |
| All / New / Returning | A different funnel; the two segments sum to the total at every step | `conversion` |
| Hover or press a band | Tooltip, then a caption giving that step's two rates | `conversion` |
| A step in the list | Same selection from the other side | `conversion` |
| Goal sort | Completions, closest to target, or value — through a real menu | `conversion` |
| A goal row | Expands to remaining, worth and per-completion; press again to close | `conversion` |
| Search (goals) | Filters by label and note, with an empty state | `conversion` |
| Tab, Tab | A visible focus ring, proved as a beat | `home` |
| Seven sidebar entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **A zero flex-basis painted a row through its own border.** The goal rows are
  `grow` so the list fills the card, and with `basis-0` their height came from the free
  space alone — so a row whose content needed more than its share, and every expanded row,
  overflowed its box. `basis-auto` makes the content the floor and the growth the extra.
- **A straight-proportion funnel is a cone and then a pipe.** 42,180 visitors and four
  steps between 2.8% and 22.9% of them: as widths, four of the five bands land within a
  few pixels of each other and the drop-off the card exists to show is invisible. The
  bands are the **square root** of the ratio, and the list beside the chart carries the
  real counts and step rates.
- **The reference's heatmap legend does not line up with its own heatmap.** It prints
  50 / 200 / 400 / 600 / 800 under a gradient strip. Here the five bands are `max / 5`
  apart and the strip is labelled with those thresholds, computed from the grid.
- **The reference's tooltip reads "May 18, 20222"** — a five-digit year, on a date nailed
  to the drawing rather than to the curve under it. The callout is computed from the peak
  index, so it names the peak's own date on whichever span is showing.
- **A parked beat that follows a parked beat changes nothing**, which `drive.js` reports
  as a failure — correctly. The inert checks diff against `theme-light`, which is already
  a parked frame, rather than against a re-park that does nothing.
- Zero contrast failures on the first pass of every tab, in **both** themes: 78, 113 and
  82 text nodes measured in light, the same in dark.
- After those: no duplicate SVG def ids, every chart labelled, no dead space over 24px in
  any region, no document or horizontal scroll at 1280, 1440 or 1920, and no animation
  running at rest.

### Targets under 44px

Listed rather than fixed, with the reason:

- **The segmented controls** (28px) and the card menu buttons (32px) are the reference's
  own control scale, and a dashboard that pushes every pill to 44px stops looking like
  this design. Both sit well clear of their neighbours.
- **The device legend rows** (31px) and **the heatmap cells** (52×34) are marks, not
  controls — each is also reachable as a labelled button, and the figure each one carries
  is printed beside it.

## Declared departures

1. **The browser chrome and the pale ground are dropped** — both are presentation
   furniture, so the app's own sidebar starts at the window edge.
2. **Built at 1440×900**, not at the picture's ~1080×760 app area.
3. **The brand is invented.** "Gotics" becomes **Metriqo**, and the mark is drawn in the
   same idiom — a blue disc with a rising spark cut out of it — rather than traced.
4. **The five-digit year is corrected**, and the whole callout is computed (above).
5. **The heatmap legend is the heatmap's own thresholds** (above).
6. **"Behavior" keeps the reference's spelling**, because it is a label in the picture.
7. **The header search is a quick find**, not a dead box: it searches the cards and the
   live tabs, and a result jumps there. The per-list searches sit on the cards they
   filter.
8. **`?theme=dark` opens in the dark design.** It is how the dark theme is probed — the
   harness clicks one selector per run, and reaching dark-mode Realtime needs two — and a
   dashboard with an appearance switch should survive being linked to anyway.
9. **The device ring has gaps between its slices**, as the reference draws them, taken off
   the end of each arc and never more than half of it — Tablet is 1.8% and narrower than
   the gap.
10. **A visible focus ring everywhere.** The picture has none.
11. **The portrait is a free-licensed Pexels photograph**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the heatmap is drawn at its fills, the meters at their widths, the curve at its
points, the funnel at its widths, every figure at its final value. Shot as
`shots/reduced.png`.
