# kavira — episode 15

A studio's financial overview, rebuilt from a posed board as a working three-tab app.
Port 5356.

```bash
npm install && npm run dev                              # http://localhost:5356

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5356/ --click "[data-tab='savings']"
node ../tools/drive.js drive/overview.json
```

## The reference

`ref/shot.png`, 1200×900 — and a **posed board with furniture**: the picture is a macOS
browser window, traffic lights and URL bar and all, sitting on a grey ground. The chrome
is a presentation effect exactly as the board is, so both are dropped and the page starts
at the app's own header.

refscan read the palette off it: white cards on `#f4f4f4`, `#e16448` for the orange-red,
`#0c0c0c` for the near-black.

**Rubik** is the substitute — a slightly rounded grotesque with the open apertures this
design's headings have.

## The three tabs

**Overview, Financial Projection and Savings** are built. **Legality Statement, Account**
and **Emergency Funds** stay in the sidebar and are genuinely inert: muted,
`aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click does nothing.

Overview because it is the screen that was dropped. Financial Projection because the
sidebar names it and the whole page is figures that could be projected. Savings because
POCKET is a group of two with nothing behind either.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**68 beats with zero problems**, including "did nothing" checks on all three inert
entries.

| Control | What happens | Beats file |
|---|---|---|
| Direct Debits / Payroll / Suppliers | Three cards, each with its own number, fee and linked account | `overview` |
| Receive / Send | Both confirm in place and can be undone | `overview` |
| Weekly / Monthly / Quarterly | Scales the figure above each dot matrix | `overview` |
| Hover a dot | Names what the grid is worth up to that dot | `overview`, `savings` |
| Hover a growth bar | Darkens it | `overview` |
| System Lock | A real toggle | `overview` |
| 2022 / 2023 | Two different stock series | `overview` |
| Team / Insights / Today | Three chips that really filter the activity list | `overview` |
| A business plan | Selects it | `overview` |
| Enable | Turns two-step verification on and off | `overview` |
| 15 day free-trial | Confirms in place and can be undone | `overview` |
| Share | Copies a link and can be un-copied | `overview` |
| 6 / 12 / 24 months | Stretches every projected line and the net above them | `projection` |
| A line | Its own curve, its own projected figure | `projection` |
| A pocket | Its own dot matrix, filled to its own share | `savings` |
| Add 250 / 1.000 / 5.000 | Adds to the pocket, twice over, and undoes | `savings` |
| Search | Filters activities, projection lines or pockets — whichever tab is showing — with an empty state | all three |
| Three sidebar entries | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **`active` only applied to one tone.** `IconButton` wrote it as
  `active && tone === 'quiet' && …`, so the header's share control — which is
  outline-toned — toggled a label and not a single pixel. `drive.js` reported un-sharing
  as zero changed pixels. It applies to any tone now.
- **Two scroll beats proved nothing**, because five projection lines and four pockets fit
  their cards. The honest fix was to delete the beats rather than pad the data until a
  scrollbar appeared.
- **The waving hand was a blob.** The sidebar greeting ends in one, an emoji is out
  (rule 8), and five fingers drawn as outlines collapse at 17px. It is a filled
  silhouette now, with two motion strokes beside it.
- **The trial badge was 3.43:1.** White on `#e16448` at 10px. It carries the deeper red.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

1. **The browser chrome is dropped**, along with the board. Both are presentation.
2. **Built at 1440×900**, not at the board's 1200×900.
3. **The dot matrices mean something.** In the reference the two grids have no stated
   relationship to the figures above them; here the filled share *is* each figure's share
   of the pair, so a denser grid is more money and the two read against each other.
4. **"13 Days" is 4 days.** The reference reads "13 Days / 109 hours, 23 minutes", and
   thirteen days is 312 hours. The hours are the source and the days follow them.
5. **The card's scheme mark is invented.** The reference carries a real payment network's
   wordmark over an invented account (rule 8).
6. **The person in the promo card is a free-licensed portrait.** A face is a picture, not
   an icon, and a drawn figure there would be visibly missing what the reference had.
7. **Every control in the activity manager works** — the chips, the search, the plan list
   and Enable. They are decoration in the picture.
8. **A visible focus ring everywhere.** The board has none.
9. **The portraits are free-licensed Pexels photographs**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off, including the dot's hover
scale. Nothing is gated on an entrance — the grids are drawn filled, the bars at their
heights, the curve at its points. Shot as `shots/reduced.png`.
