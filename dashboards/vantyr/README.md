# vantyr — episode 22

A private-investment and syndicate portfolio, rebuilt from a posed mock-up as a working
three-tab app. Port 5384.

```bash
npm install && npm run dev                              # http://localhost:5384

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5384/ --click "[data-tab='syndicates']"
node ../tools/drive.js drive/investments.json
```

## The reference

`ref/shot.png`, 736×552: a rendered mock-up on a grey board, with 10px of board at the
sides and 28px at the top. **refscan called it a flat UI export for the third time in this
batch** — its test is for crisp axes and a clean border ring, and a flat render of a
mock-up passes both. The app area inside the board is 716×494, which is an artboard, not a
viewport. Read as an inspo brief; the board is dropped.

Its palette: a white page, `#f3f4f6` for the panel tint, `#f3e9df` for the cream invite
card, and `#225559` — a deep teal — for the portfolio card.

**Plus Jakarta Sans** is the substitute: a humanist grotesque with a tall x-height and
tabular figures, which this design needs for a column of multiples.

### The split, measured

The accent needs none for once — `#225559` carries white at 8.36:1. The **muted grey**
does: it has to clear white, the panel tint and the cream card, and the cream is the
tightest, so `--color-muted` is measured against that at 5.36:1.

## The three tabs

**Investments, Syndicates and Companies** are built — the picture's own three pills, all
live. The **sidebar** stays exactly as drawn (Dashboard, My documents, New deals,
Community, Insights, Knowledge base, the invite card and Help) and is entirely inert:
muted, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click does
nothing. A sidebar with its entries removed is a different design from the picture.

**One position list feeds all three.** Twelve positions carry what was invested, what the
last valuation marks them at, the status and the ownership; portfolio value, total
invested, net multiple, the step chart, the status dots, the company cards' implied
valuations and the syndicate list's companies are all arithmetic over them.

## Interactions

Every one is a beat in `drive/`. The three files run **74 beats with zero problems**, plus
the five-beat hover sweep `probe.js --beats` generated.

| Control | What happens | Beats file |
|---|---|---|
| 1 year / 3 years / All time | A different step series, re-ticked | `investments` |
| Hover the chart | Names the period and the mark | `investments` |
| The five column headers | Sort name, date, invested, net value or multiple, both ways | `investments` |
| Status filter | Live, Exited, Writing off — with the footer totals following the filter | `investments` |
| Submit tax information | Confirms in place, and can be undone | `investments` |
| Export, and the mail icon | Both confirm and revert | `investments` |
| Open to join / Joined / All | Three lenses over fourteen allocations | `syndicates` |
| Sort | Closing soonest, largest raise, most filled | `syndicates` |
| A syndicate row | Expands to minimum, target, committed and remaining, and registers interest | `syndicates` |
| A sector chip | Filters the company grid, with live counts | `companies` |
| A company card | Expands to your position, the mark, the multiple and the ownership | `companies` |
| Search | Positions, syndicates and companies, each with an empty state | all three |
| Scroll | Four regions scroll inside the shell; the page never does | `investments` · `syndicates` |
| Tab, Tab | A visible focus ring, proved as a beat | `investments` |
| Eight inert destinations | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **Two scroll beats were measuring nothing.** The activity feed held eight notes in a
  region that fits eight, and the syndicate list eight rows in a region that fits eight —
  so "scroll down" and "scroll back" both changed zero pixels. The honest fix is more
  rows, not a smaller region: a syndicate platform lists dozens of allocations and an
  activity feed runs for months. Twelve notes and fourteen allocations now.
- **The company grid genuinely does not scroll**, because the portfolio holds ten
  companies and ten cards fit. Those two beats were deleted rather than faked.
- **The seed script wiped the panes it had just helped write.** My own tooling, not the
  build: it cleared `panes/*.tsx` on every run, so re-running it to fix a missed patch
  deleted three finished files. Clearing is opt-in now.
- **A `size` prop went missing from the button** because the patch guarded on a string
  `Segmented` already contained. Guards have to be specific to the thing they guard.
- Zero contrast failures on the first probe of every tab.
- After those: no duplicate SVG def ids, every chart labelled, no dead space over 24px, no
  document or horizontal scroll at 1280, 1440 or 1920, and no animation running at rest.

### Targets under 44px

Listed, with the reason. Nothing is under 24px: the column headers and segmented controls
are 28px, which is the reference's own control scale.

## Declared departures

1. **The board is dropped**; built at 1440×900, not the picture's 716×494 app area.
2. **The brand is invented.** "odin" becomes **vantyr**, and the mark is drawn in the same
   idiom — a disc with two steps cut out of it, which is the shape this portfolio's own
   value chart draws.
3. **Every figure reconciles.** The portfolio value is the sum of the twelve marks, total
   invested the sum of the twelve costs, and the net multiple their ratio. The footer of
   the table re-states all three against whatever the filter is showing.
4. **The chart is a step, and that is the point.** A private position is marked at an
   event and holds that mark until the next one; a smooth curve between two marks claims a
   valuation nobody made. The reference draws a step too — it is the best thing in it.
5. **A company's implied valuation is derived**, not invented: the position's mark over
   its ownership.
6. **The valuation date is on every page**, as the category requires. The reference prints
   it once, on the portfolio card.
7. **The confidentiality notice and the tax prompt are real controls**, not decoration:
   the prompt counts the outstanding documents and can be submitted.
8. **A visible focus ring everywhere.** The picture has none.
9. **The portraits are free-licensed Pexels photographs**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the step chart is drawn at its marks, the meters at their widths, every figure
at its final value. Shot as `shots/reduced.png`.
