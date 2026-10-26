# ledgra — episode 17

An accounting workspace, rebuilt from a posed board as a working three-tab app.
Port 5364.

```bash
npm install && npm run dev                              # http://localhost:5364

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5364/ --click "[data-tab='tax']"
node ../tools/drive.js drive/home.json
```

## The reference

`ref/shot.png`, 1024×768: a rounded panel on a light grey ground — and the one picture in
this batch refscan called correctly, reading a 1.5px ramp and saying "posed board". So
this is an **inspo brief**; the board is dropped and the panel's own ground becomes the
page.

Its palette, read off the picture: `#fcfcfc` for the page, `#e0f9e3`, `#def4d0` and
`#caffd7` for the green tints, `#25942d` and `#33933c` for the greens, `#fcb407` for the
amber.

**Public Sans** is the substitute — a plain, slightly condensed grotesque with tabular
figures, which this design needs for rupiah written as `IDR 12.450.000`.

## The three tabs

**Home, Financial Statements and Tax & Compliance** are built. **Inbox, Accounts
Management, Key Metrics, Budgeting & Forecasting, Settings** and **Help & centre** stay in
the sidebar and are genuinely inert: muted, `aria-disabled`, skipped by the keyboard,
`cursor: not-allowed`, and a click does nothing. The 12 on Inbox stays, because it is part
of the picture.

Home because it is the screen that was dropped. Financial Statements because the three
figures at the top of Home are sums of a ledger the design never shows. Tax & Compliance
because the sidebar puts a 3 against it — three lines not yet paid — and a count badge is
a promise.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**62 beats with zero problems**, including "did nothing" checks on six of the inert
entries.

| Control | What happens | Beats file |
|---|---|---|
| August / July / June | Scales revenue, expenses, the net and the whole heatmap | `home` |
| Inflow / Outflow | **A different grid**, not the same one relabelled | `home` |
| Hover a cell | Names the band, the day and the money moved | `home` |
| Export / Share / Upgrade | All three confirm in place and can be undone | `home` |
| The banner's × | Dismisses it | `home` |
| See all | Opens Tax & Compliance | `home` |
| Group filter | Five states; the three figures above the statement restate | `statements` |
| A group | Its own twelve-month curve | `statements` |
| August / July / June | Scales every line and the curve with it | `statements` |
| Mark paid | Moves the badge, the outstanding figure and the meter at once | `tax` |
| Status filter | Four states, against the *current* paid state | `tax` |
| Sort | Tax type, amount and date, both ways, with the direction in the header | `tax` |
| Search | Filters tax lines or statement lines — whichever tab is showing — with an empty state | all three |
| Six sidebar entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **A dismissed banner left a hover behind.** Removing it moved the toolbar up under the
  resting pointer, so Export lit up — and the next beat, which clicks an inert tab, moved
  the pointer away and un-lit it. `drive.js` reported the inert check as **changed**,
  which is exactly what that check is for. A parked beat sits between them now.
- **`faces.ts` imported six portraits and two were bundled.** `tsc` cannot see it —
  Vite's asset module declaration accepts any path — so it took the dev server's overlay
  to find. This design shows two people, so two are bundled and the module names two.
- **The receivable meter was brown.** The shared `goal` tone maps to the warning colour,
  and this design's second meter is the reference's own amber.
- **The heatmap read upside down.** The reference prints 12-16h at the top; written the
  other way round the whole grid is inverted against the picture.
- Zero contrast failures on the first pass, because the accent was split before anything
  was built: `#25942d` carries white at 3.6:1, so it is the *mark* colour and `#1a6d20`
  is the one anything with text on it uses.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

1. **The board is dropped** — the surround and the panel's shadow are a presentation
   effect, so the sidebar runs to the window edge.
2. **Built at 1440×900**, not at the board's 1024×768.
3. **The tax split is computed from the lines.** The reference prints 80.4% / 11.6% /
   8.0% over a table holding a single row — three shares of nothing.
4. **Net Profit/Loss is revenue less expenses**, always, rather than a third figure typed
   in beside them.
5. **Outflow is a different grid.** A direction toggle that redraws the same numbers is a
   toggle that does nothing.
6. **"Setting" and "Help & center" are spelled correctly**, and the heatmap's hours are
   labelled every fifth day rather than all thirty-one, which at this width is a smear.
7. **A visible focus ring everywhere.** The board has none.
8. **The portraits are free-licensed Pexels photographs**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the heatmap is drawn at its fills, the meters at their widths, the curve at its
points, every figure at its final value. Shot as `shots/reduced.png`.
