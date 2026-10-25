# nocta — episode 3

A dark finance overview, rebuilt from a posed board as a working three-tab app. Port 5308.

```bash
npm install && npm run dev                              # http://localhost:5308

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5308/ --click "[data-tab='invoices']"
node ../tools/drive.js drive/overview.json
```

## The reference

`ref/shot.png`, 1200×900. `refscan.py` calls it a **flat UI export** on its edge ramp of
1px — and it is wrong, which is worth recording: the panel has a rounded border, a drop
shadow, and board showing on all four sides with a faint embossed pattern in it. The
scanner's ramp test measures the *panel's own* hard internal edges, and a dark shadow
against a dark board is not a ramp it can see. It is a posed board, so this is an **inspo
brief** and the backdrop goes.

Its palette read is the useful part and those hexes are the tokens: `#111113` ground,
`#1f1f1f` surface, `#303030`/`#404040` for the bar fills, and the three accents it found
at under half a per cent of the frame each — `#67a0f5`, `#fe832f`, `#48c783`.

**Dark only.** The reference has no sun/moon pair, so there is no light theme: a second
palette nobody asked for is a second palette to keep honest. (Episode 2 has the switch,
because its reference draws one.)

## The three tabs

**Overview, Transactions and Invoices** are built. The other five rail entries — Analytics,
Scheduled, Connected apps, Settings and Log out — stay in the rail and are genuinely inert:
dimmed, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click does
nothing at all.

Overview because it is the screen that was dropped. Transactions because every figure on the
Overview is an aggregate of it and there is nowhere else to see the rows. Invoices because
the Overview card explicitly points at it — and that pointer is wired: "View all invoices"
reports upward and `OverviewPane` routes it, which is one line in the pane and no knowledge
of navigation inside the card (rule 4).

Every rail entry carries an `aria-label` and a `title`. The reference's rail is eight
unlabelled glyphs, which is fine in a picture and unusable with a keyboard.

## Type

The board's face is a tight grotesque with flat-sided numerals. The substitute is **Geist**
(OFL, via fontsource): the closest free match for its narrow apertures and its tabular
figures, which this design needs — the revenue headline, the ledger column and the calendar
grid are all numerals that have to line up.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**71 beats with zero problems**, including "did nothing" checks on four inert rail entries
*and* on a disabled button.

| Control | What happens | Beats file |
|---|---|---|
| Hover a revenue bar | The bar fills, and the change pill moves to its head | `overview` |
| Click a bar | Selects it; its figure appears inside the foot of the column | `overview` |
| Weekly / Monthly / Yearly / Range | Four different series — 7, 4, 12 and 4 bars — with a re-labelled axis and a recalculated headline. **Monthly is negative** | `overview` |
| Calendar arrows | Step the month; the day chip says so when you leave January | `overview` |
| Click a day | Rewrites the figure under the grid; a day with nothing on it says so | `overview` |
| Suggestion chip | Fills the ask box | `overview` |
| Ask + send | Appends the question to a short thread. It does not pretend to answer — there is no model behind this build, and a fabricated reply would be the one dishonest thing on the screen | `overview` |
| Read more | Expands the summary in place | `overview` |
| Last 30 / 90 / year | Swaps the whole spending mix; the sentence under the donut is rewritten from whichever set is showing | `overview` |
| Donut slice / legend row | Either highlights both and writes that category's figure into the note | `overview` |
| View all invoices | Switches to the Invoices tab | `overview` |
| All / Money in / Money out | Filters the ledger; the footer totals both directions of what is left | `transactions` |
| Category | Filters by category; the detail's category bar moves with it | `transactions` |
| A row | Redraws the detail: amount, facts, that category's share, and the rest of the category | `transactions` |
| Flag for review | Toggles, and resets when another transaction is selected | `transactions` |
| Invoice state | Filters the ledger; the footer totals what is shown | `invoices` |
| A row | Redraws the health card's selection block | `invoices` |
| Send reminder | Toggles — **and is disabled on a settled invoice**, proved with `expectUnchanged` | `invoices` |
| Search | Filters transactions or invoices, with an empty state | all three |
| Five rail entries | **Nothing.** Proved with `expectUnchanged` | all three |

Data is bundled and seeded (`src/data/rng.ts`), so the payment-score meter's tick heights
are identical on every reload.

## What the probe found

- **The spending donut rendered five of its six segments black.** Tailwind 4 tree-shakes
  `@theme` variables that no utility class references, and a colour handed to a chart as
  `fill="var(--color-cat-meals)"` is not a reference it can see. The only category that
  survived was the one a `bg-cat-office` class happened to use for the score meter. Fixed
  with `@theme static`, and applied to every episode — this one would have shipped silently
  in any build whose chart colours come from tokens.
- **Two text controls were 19px tall** — "Read more" inside a paragraph and "View all
  invoices" — because a text control is only as tall as its line box. Padded and pulled back
  with a negative margin, which makes a 27px target without moving a pixel of the text.
- **The spending note named the wrong line.** It said Rewards (11%) was the smallest named
  category with Internet & Telephone (7%) two rows below it: the sentence was taking the
  second-from-last entry to skip "Other", which is only correct when "Other" sorts last.
- 0 contrast failures on all three tabs, no duplicate SVG def ids, every chart labelled,
  nothing animating at rest, no dead space over 24px, and no document or horizontal scroll
  at 1280, 1440 or 1920.

## Declared departures

1. **No backdrop.** The board's surround and its embossed pattern are gone; at real size the
   panel is the viewport. The floating rail is kept, because that separation of navigation
   from content is a real part of the design rather than a presentation effect.
2. **Built at 1440×900**, not at the board's scale.
3. **Every rail entry is labelled.** The reference labels none of them.
4. **The assistant does not answer.** It takes the question and says it is working on one.
   A canned "AI reply" in a build with no model behind it would be the only outright
   untrue thing on the screen.
5. **The calendar's arrows work and every marked day has its own figure.** The reference
   shows one selected date and one number under it, which is all a still can show.
6. **Fourteen invoices and eighteen transactions**, not the three and none the board shows:
   three rows do not fill a 1440×900 shell and give the scrollers nothing to scroll.
7. **"Other" is excluded from "the smallest named line"**, per the fix above.
8. **A visible focus ring everywhere.** The board has none.
9. **The delta triangles are drawn**, not the geometric-shape codepoints: Geist has no
   U+25B2, so they would fall back to whatever symbol font the platform has.
10. **The Nocta mark is invented**, drawn in the board's idiom — two angular chevrons meeting
    at a seam. The copy is invented, so the mark has to be.
11. **The faces are free-licensed Pexels portraits**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the bars draw at their final heights, the meter is lit to its score, the donut is
whole, and every control still works. Shot as `shots/reduced.png`.
