# dashboards — one screen, three tabs, filmed by using it

One folder per **episode**. An episode is one dashboard design, rebuilt from a dropped
picture as a real, working app, and recorded by driving it with a cursor.

| Folder | Episode | Reference | Tabs built | Port |
|---|---|---|---|---|
| [`twisty/`](./twisty) | 1 — ZELPA, a freelancer workspace | posed board (inspo brief) | Home · Projects · Wallet | 5300 |
| [`teknova/`](./teknova) | 2 — Kovelt Store, an e-commerce control room | posed board (inspo brief) | Dashboard · Products · Orders & Invoices | 5304 |
| [`nocta/`](./nocta) | 3 — Nyxora, a dark finance overview | posed board (inspo brief) | Overview · Transactions · Invoices | 5308 |
| [`taskly/`](./taskly) | 4 — Plyra, a project workspace | posed board (inspo brief) | Dashboard · Task Overview · Calendar | 5312 |
| [`sypher/`](./sypher) | 5 — Veloq, a fleet and financials console | posed board (inspo brief) | Dashboard · Financials · Fleet | 5316 |
| [`finexy/`](./finexy) | 6 — Obolin, a multi-wallet money dashboard | posed board (inspo brief) | Overview · Activity · Manage | 5320 |
| [`mycogen/`](./mycogen) | 7 — Mylora, a store manager's dashboard | posed board (inspo brief) | Dashboard · Orders · Customers | 5324 |
| [`verdia/`](./verdia) | 8 — Pennora, a personal money dashboard | posed board (inspo brief) | Overview · Wealth · Cards | 5328 |
| [`aurelo/`](./aurelo) | 9 — Orvela, a personal finance dashboard | posed board (inspo brief) | Home · History · Wallet | 5332 |
| [`cindra/`](./cindra) | 10 — Corvane, a banking dashboard | **flat UI export (spec)** | Dashboard · Transactions · Saving Plans | 5336 |
| [`salvora/`](./salvora) | 11 — Dravelo, a store admin's dashboard | posed board (inspo brief) | Overview · Transactions · Customers | 5340 |
| [`quiro/`](./quiro) | 12 — Quilbo, a payments dashboard | posed board (inspo brief) | Dashboard · Reports · History | 5344 |
| [`obelio/`](./obelio) | 13 — Talero, a multi-currency wallet dashboard | posed board (inspo brief) | Dashboard · Transactions · Recurring | 5348 |
| [`orlin/`](./orlin) | 14 — Stakvio, an investment console | posed board (inspo brief) | Dashboard · Activity · Wallets | 5352 |
| [`kavira/`](./kavira) | 15 — Atelyra, a studio's financial overview | posed board + browser chrome (inspo brief) | Overview · Projection · Savings | 5356 |
| [`veltro/`](./veltro) | 16 — Selviq, a store's sales dashboard | posed board (inspo brief) | Dashboard · Products · Order | 5360 |
| [`ledgra/`](./ledgra) | 17 — Tallora, an accounting workspace | posed board (inspo brief) | Home · Statements · Tax | 5364 |
| [`glintly/`](./glintly) | 18 — Metriqo, a product-analytics dashboard | posed browser window (inspo brief) | Dashboard · Realtime · Conversion | 5368 |
| [`hesper/`](./hesper) | 19 — Caldrow Legal., a consulting firm's workspace | posed browser window (inspo brief) | Overview · Task · Payment | 5372 |

```bash
cd dashboards/twisty  && npm install && npm run dev    # http://localhost:5300
cd dashboards/teknova && npm install && npm run dev    # http://localhost:5304
cd dashboards/nocta   && npm install && npm run dev    # http://localhost:5308
cd dashboards/taskly  && npm install && npm run dev    # http://localhost:5312
cd dashboards/sypher  && npm install && npm run dev    # http://localhost:5316
cd dashboards/finexy  && npm install && npm run dev    # http://localhost:5320
cd dashboards/mycogen && npm install && npm run dev    # http://localhost:5324
cd dashboards/verdia  && npm install && npm run dev    # http://localhost:5328
cd dashboards/aurelo  && npm install && npm run dev    # http://localhost:5332
cd dashboards/cindra  && npm install && npm run dev    # http://localhost:5336
cd dashboards/salvora && npm install && npm run dev    # http://localhost:5340
cd dashboards/quiro   && npm install && npm run dev    # http://localhost:5344
cd dashboards/obelio  && npm install && npm run dev    # http://localhost:5348
cd dashboards/orlin   && npm install && npm run dev    # http://localhost:5352
cd dashboards/kavira  && npm install && npm run dev    # http://localhost:5356
cd dashboards/veltro  && npm install && npm run dev    # http://localhost:5360
cd dashboards/ledgra  && npm install && npm run dev    # http://localhost:5364
cd dashboards/glintly && npm install && npm run dev    # http://localhost:5368
cd dashboards/hesper  && npm install && npm run dev    # http://localhost:5372
```

From the repository root, `npm run dev:<slug>` and `npm run build:<slug>` do the same
thing without the `cd`. **Install from inside the folder**, with a plain `npm install`:
`npm --prefix dashboards/<slug> install` run from the root writes `"showoff": "file:../.."`
into that episode's `package.json` and symlinks the Expo project into its `node_modules`.

Each episode pins its own port with `strictPort`, four apart from the last: episode 1 is
5300, episode 2 is 5304. Starting one while it is already running then fails loudly
instead of quietly moving to the next free port and leaving every screenshot tool pointed
at the wrong dashboard.

[`tools/`](./tools) is the harness: `refscan.py` to read a dropped picture before building
anything from it, `shot.js` to photograph a state, `probe.js` to measure and audit a build,
`drive.js` to play a scripted sequence of real interactions and prove every one of them
does something, and `eval.js` for a one-off question. They talk to headless Chrome over
CDP with no dependencies. See [`tools/README.md`](./tools/README.md).

---

# The rules

Everything below is a rule, not a suggestion.

## 0. THE BRIEF

**A dashboard episode is one design, built as a dashboard that actually works, and the
video is a cursor using it.**

There is no reveal and no blank state. Nothing is staged, nothing is commented out, and
there is no `steps.json` — that machinery belongs to the app showcases and does not apply
here. The take is: open the finished thing and use it. Hover a bar and the tooltip rises,
click a range tab and the chart redraws, type in the search and the list filters, open a
row and it expands.

Which means the only thing that can ruin a take is **an interaction that does nothing**,
and that is what the harness is pointed at (rule 9).

## 1. Three tabs. The rest are visibly inert.

Every dashboard has a nav with five, six, eight destinations in it. **Build three.** Any
three, chosen for whichever has the most to show — the reference's own screen is always
one of them, because that is the design that was dropped.

The rest stay in the nav and **stay inactive**, because a nav with three items in it is a
different design from the one in the picture. Inactive means *visibly* inactive, not a
dead link:

- dimmed to the design's own muted token,
- `aria-disabled="true"` and `tabIndex={-1}`, so the keyboard skips them,
- `cursor: not-allowed`,
- and a click does nothing at all — no console error, no route change, no half-rendered
  empty pane.

The three that are built are built **fully**: each is a complete screen in the same design
language, with its own content and its own working interactions. A tab that switches to a
stub is worse than a tab that is honestly switched off.

Name the three in the episode's README, and say why those three.

## 2. The picture is one of two things. Find out which, first.

Run the scanner before writing a line:

```bash
python tools/refscan.py <slug>/ref/<shot>.png
```

It reports the crop, the capture density, the palette with exact hexes, the column and row
grid, and its read on which kind of picture this is. **Look at the `.grid.png` it writes
before trusting any number in it.**

**A flat UI export is a spec.** The whole frame is the interface, edges are one pixel
wide, and the grid is axis-aligned. Rule 1 of the app showcases applies: work out the
density, convert every measurement to CSS pixels, and match spacing, radii, type scale and
colour exactly. Use explicit values over eyeballed ones.

**A posed presentation board is an inspo brief, and pixel-matching is off.** One or two
rounded panels floating on a coloured board, drop shadows, maybe a tilt — that is a
*picture of an idea*, not a spec. The panel in it is whatever size the designer's artboard
happened to be.

- **Match the spirit, not the pixels.** Take the palette, the type hierarchy, the shapes,
  the order of the blocks and the feel.
- **Build it at the real size.** A dashboard is a 1440×900 browser viewport, not a
  1200px-wide board. Page gutters 24–32px, card radius 16–24px, body 14px, a KPI number
  28–36px, a control 36–40px tall, a row 56–64px. Lay it out in CSS grid and flex so it
  holds from 1280 to 1920.
- **Fix the reference's mistakes.** A total that does not add up, a label that does not
  match its icon, contrast too low to read, a 20px tap target, a chart with no axis. Correct
  it silently and say so in the handover.
- **Improve it where it is obviously better as an app.** A real focus ring, a real empty
  state, a sort that sorts, a number that counts up once.
- **Everything else still holds.** Three tabs, components not markup, real interactions,
  and the done-gate.

**The screen fills the screen.** The shell is `100vh` by construction, so the failure here
is not a short page — it is a 200px band of empty canvas under the last card inside a
region. `probe.js` reports it per region. Scale up rather than pad: open the rhythm out,
let the list run to the bottom, add the row the board cropped.

## 3. A dashboard is a shell, not a page

`100vh`, no document scroll. A fixed sidebar or top bar, and **inner scroll regions** that
scroll independently. This is the structural difference from the websites series and it
changes the tooling: `window.scrollTo` does nothing in a shell, so `shot.js --bands` wheels
a named scroller instead, and `probe.js` reports `documentScrolls: YES` as a defect.

Consequences worth designing for:

- A table's header is sticky inside its own scroller, not fixed to the viewport.
- A region that scrolls needs its own overscroll containment, or the page bounces.
- Give every scroller and every mark a `data-` attribute. The harness drives the build
  through selectors, and a `data-scroller="table"` or `data-mark="bar-07"` is a stable
  handle; a Tailwind class string is not.

## 4. Everything is a component. A pane is assembly.

A pane file reads as a list of imported components — `<TopBar/>`, `<IncomeTracker/>`,
`<RecentProjects/>` — never as markup. Components are presentational: a card takes its data
and an `onSelect`, and the **pane** decides what selecting does. Adding a destination is
then one line in the pane, not a change to the component.

Finish a component, import it into the pane, look at it, and only then start the next one.

## 5. Real interactions, fake data

Everything the video will touch genuinely works, against a **bundled, deterministic**
dataset. No network, ever: a recording must not depend on it.

Deterministic matters more than it sounds. Data generated from `Math.random()` reshuffles
between the probe, the rehearsal and the take, so the chart you measured is not the chart
you film, and a diff against a previous shot is meaningless. Seed it (`src/data/rng.ts`)
and the same numbers come back every reload.

The baseline every episode ships, whatever the design:

| Interaction | What has to be true |
|---|---|
| Hover a chart mark | A tooltip appears **where the pointer is**, with that mark's real value |
| A range control | The series actually changes; the axis re-labels |
| A list row | Expands, selects or opens — and can be closed again |
| Search / filter | Narrows the list, and has an empty state when nothing matches |
| Sort | Sorts, both ways, with the direction shown |
| Tabs | The three live ones switch panes; the rest do nothing (rule 1) |
| Keyboard | Tab reaches every live control and the focus ring is visible |

Invent the content. Brand name, people, project names, figures, dates — all invented, so
the build cannot be mistaken for a real company's live product.

## 6. Charts are drawn, not imported

No chart library. Every chart is our own SVG, because a reference's chart is never the
shape a library's default is and the time goes into fighting it.

The split that makes this cheap: **the maths is shared, the look is not.** `src/charts/`
carries `scale.ts` (extent, linear scale, nice ticks) and `path.ts` (line, smoothed area,
arc) and nothing design-specific. The chart *component* — the radii, the gradient, the
grid, the tooltip — belongs to the episode.

- Every mark's geometry is **computed from the data deck**. The test: change one number in
  the deck and the chart moves. A hand-written `<path d="...">` traced off the reference is
  a picture of a chart, and it will not survive the range control in rule 5.
- Ticks come from the data, not from a guess. Four or five, on nice numbers.
- Label the chart: `role="img"` and an `aria-label` saying what it shows, or a `<title>`.
- Give every mark a `data-mark` so `drive.js` can hover it.
- **Gradient, mask, clip and filter ids are document-global.** Two chart instances that
  both define `id="fade"` collapse into one and every chart after the first paints in the
  first one's colour. Generate ids with `useId()`. `probe.js` reports duplicates.

## 7. Theming and type

Tokens in one `@theme` block, read off the reference by `refscan.py` — never a hex scattered
through a component. The scanner's `roles` line (ground / surface / ink / accent) is the
starting set; name the rest for what they do, not what colour they are.

If the design is dark, it is dark because the reference is, not as a preference. If the
build offers a light/dark switch, both are designed and both are probed — a dark palette
with a light-mode afterthought fails contrast somewhere, every time.

Most dashboard designs use a proprietary typeface. Pick the closest free substitute, say so
in the episode README, and expect it to run 10–15% wider at matched cap height. Import by
subpath from fontsource; never the package barrel.

## 8. Assets

**Draw the interface, photograph the picture.** Every real app draws its chrome as
vectors and ships its pictures as bitmaps; match that split and most of these questions
answer themselves. A chevron, a filter glyph, a flag disc, a progress ring, a card, a
wordmark: vectors. Food, people, places, vehicles, interiors: photographs. If drawing it
means reproducing a specific arrangement rather than expressing an idea, it is out of
range — a map and a plate of food are both out, however small they are on screen.

**And then the brand constraint cuts across it.** The copy in every episode is invented,
so the build must never carry a real company's mark over invented figures. That rules out
most free-licensed photography of *products*: Wikimedia Commons' consumer electronics are
almost entirely identifiable hardware — Apple, Samsung, SanDisk, LG — and the logo is
often only visible at 1:1, after the thumbnail looks fine.

So, in order:

1. **Free-licensed, unbranded photography** of the real subject — best, when it exists.
   `tools/stock.py` searches Commons, filters to CC0/PD/CC-BY/CC-BY-SA, square-crops and
   writes the attribution. **Use `--list` first and look at the names**: a result called
   *Samsung T5 Portable SSD* is a brand in your catalogue.
2. **A different subject that keeps the plot** — allowed, and often better.
3. **Keep it as interface**: a glyph on a tinted tile, which reads as a product *marker*
   rather than a bad drawing of a product. Legitimate only when 1 and 2 genuinely fail,
   and it goes in Declared departures with the reason.

What is never acceptable: a vector cartoon of a photographic subject at display size, or a
real brand's product sitting in an invented store at an invented price.

**Faces are the easy case**, because unbranded portraits are everywhere. Avatar stacks,
contact rows, reviewer lists: free-licensed portraits of real people, bundled, credited in
`src/assets/img/CREDITS.md`. Initials on a coloured disc is a fallback state, not a
substitute — a screen built from it is visibly missing what the reference had.

**The rest of the asset rules:**

- **Icons are drawn as inline SVG paths** in one `icons.tsx`, at one stroke width, on one
  grid. Never an emoji: they differ across Windows, Android and iOS, and flags are missing
  on Windows.
- **The brand mark is invented**, drawn in the same idiom as the reference's, at the same
  size, in the same place — because the copy is invented and a page carrying a real
  company's mark over invented figures is the one thing this series must not produce.
- Nothing hotlinked. Nothing unused shipped.

## 9. Verify by measuring, and prove the take before filming it

```bash
node ../tools/probe.js http://localhost:5300/ --beats drive/hovers.json
node ../tools/drive.js drive/home.json
```

`probe.js` audits what is on screen: the shell, the inner scrollers, dead space at the foot
of every region, the column grid, the type scale actually in use, every text node that
fails WCAG against its own ground, every target under 44px, animations running at rest,
every chart and whether it is labelled, duplicate SVG ids, and every hover rule that matches
something. **Run it on your own build first.** Its value is not a score; it is that it keeps
finding things in my own page.

`drive.js` plays a beats file — the exact sequence the take will perform — photographs every
beat and **diffs each pair numerically**. A beat that changed zero pixels is reported as
`NO CHANGE` and exits 1. That is the whole point: a hover that does nothing, a range tab
that re-renders the same path, and a search box that filters nothing all look perfect in a
screenshot and all ruin a take.

Never drive a take by hand to find this out. Prove the sequence once, then film it.

Every episode ships a beats file per built tab, plus the hover sweep that `probe.js --beats`
generates.

## 10. Traps that have already cost time elsewhere in this repo

- **`captureBeyondViewport` and `position: fixed` do not mix** — the crop comes back as
  whatever is at that page offset. The harness shoots the viewport instead, which is the
  right frame for a shell anyway.
- **`scroll-behavior: smooth` makes a scroll animate**, so measuring in the same breath
  measures the old position. `cdp.js` turns it off after every navigation.
- **The first capture after a cold Vite server is pre-hydration** — blank image boxes, the
  chart undrawn. `cdp.js` takes a throwaway shot first.
- **`el.click()` is not a click.** No pointer history, so anything armed on `pointerdown`,
  every outside-click close and every `:active` style is skipped. The harness dispatches
  real pointer events.
- **Two Tailwind utilities that set the same property cannot override each other from the
  class attribute.** They have equal specificity, so which one wins is decided by their
  order in the generated *stylesheet*. Adding `border-ink` to a string that already has
  `border-line` silently does nothing — a selected row stayed four values away from its own
  hover state, invisible to the eye and below the diff threshold that would have caught it.
  Make the colour conditional (`selected ? 'border-ink' : 'border-line'`), never additive.
- **Prettier's Tailwind plugin eats the leading space in a class template literal** —
  `` `card${on ? ' -active' : ''}` `` silently becomes `card-active`. Build conditional
  classes with `cx(...)`, never an interpolation.
- **Never read a ref during render** to size a transition. It lints, and the first open
  animates to whatever the height was last time. Measure into state with a ResizeObserver.
- **A negative z-index paints below the page background** inside a stacking context.
  Use document order.
- **`will-change` on a scaled SVG rasterises it at natural size** and it goes blocky.
- **An element that clips itself with `clip-path` can never trigger its own
  IntersectionObserver reveal.** Observe the parent.
- **Reduced motion is not a shorter duration.** Entrances do not play, counters render at
  their final values, tickers do not start — and then check what that leaves behind: an
  uninitialised carousel is a dead end.

## 11. The done-gate

An episode is finished when all of these pass:

1. `npx tsc -b --noEmit` clean.
2. `npx eslint src --ext .ts,.tsx` clean.
3. `npx prettier --check "src/**/*.{ts,tsx,css}"` clean.
4. `npm run build` succeeds.
5. `probe.js` on **every built tab**: no document scroll, no horizontal scroll, no dead
   space over 24px, no duplicate SVG ids, no unlabelled chart, and every contrast failure
   and sub-44px target either fixed or listed in the README with a reason.
6. `drive.js` on **every** beats file: zero problems. Every interaction in rule 5's table
   is a beat somewhere.
7. The two inert tabs: clicked, and nothing happened. It is a beat with
   `expectUnchanged: true`.
8. Rendered at 1280 and 1920 with no horizontal scroll at either.
9. Reduced motion on, and the dashboard still usable.
10. Every tab photographed end to end and **looked at** — measurement does not catch a
    wrong avatar in the wrong row.
11. Registered: the table at the top of this file, and `dev:`/`build:` in the root
    `package.json`.

## 12. Starting an episode

```bash
node tools/new.js <slug> <port>          # from dashboards/, with no dev server running
cd <slug> && npm install && npm run dev
python ../tools/refscan.py ref/<shot>.png
```

`new.js` writes the invariants and **no design at all**: the configs, the shell with its
three live tabs and its inert ones, the token block with nothing in it yet, the chart
maths, the formatters, and a beats stub. There is deliberately no placeholder look to
inherit — the episodes are distinguished by their references, and a scaffold with a style
in it is a scaffold that quietly becomes the style of every episode.

The episode's README is the handover: the reference and which kind it is, the three tabs
and why, the type substitution, the interaction table, what the probe found, and
**Declared departures** — every place the build differs from the picture, with the reason.
