# admyra — episode 31

A **clone of the Meta Ads Manager campaigns table**, rebuilt from a screen recording of
one and then stripped down.

```bash
cd dashboards/admyra && npm install && npm run dev    # http://localhost:5420
```

## Scope

The brief is: clone the Meta Ads Manager UI exactly, and take a lot out. What is in,
and what has been cut so far:

| | |
|---|---|
| **Built** | the level tabs, the date range, the table toolbar, and the table itself |
| **Cut** | the left icon rail |
| **Cut** | the account header — mark, `Campaigns` title, account picker, opportunity score, refresh, `Discard drafts`, `Review and publish`, overflow, avatar |
| **Cut** | the saved-view chips (`All ads` / `Actions` / `Active ads` / `Had delivery` / `See more`, `Create a view`, view settings) |
| **Cut** | the filter box |

So the page now starts at the level tabs. The series' usual "three live tabs, the rest
visibly inert" rule does not apply — this is one page by instruction.

## The reference

`ref/campaigns.png`, plus three zoomed crops of the same recording:

| File | What it gives |
|---|---|
| `campaigns.png` | the whole window — the screen this clones |
| `ads-toolbar.png` | the Ads level: selection pills, the enabled toolbar, real figures |
| `columns-right.png` | the columns from `Purchases` to `Conversion rate ranking` |
| `columns-far-right.png` | `Purchase ROAS` to `Landing page views`, and the add-column button |
| `sharp-columns.png` | **a second, high-resolution capture** — not a video frame. This is the authority for anything fine-grained: row treatment, the dotted drill-down rule, letterforms |

**It is a video frame, not a UI export.** 1082×618, downscaled and chroma-subsampled, so
`refscan.py` was not the right instrument and was not used: a frame this soft has no
trustworthy 1px edges to find a grid from. What survives compression is the large flat
areas, and those were sampled directly —

| Sampled | Hex | Used as |
|---|---|---|
| draft row tint | `#e6f4ef` | `--color-go-soft`, verbatim |
| zebra stripe | `#f6f5f8` | `--color-stripe`, verbatim |
| page ground | `#f2f3f8` | `--color-ground` `#f0f2f5` (the violet cast is compression) |
| primary text | `#1b2a32` | `--color-ink` `#1c2b33` |
| primary button | `#0878be` | `--color-accent` `#0064e0` |
| create button | `#016a4d` | `--color-go` `#006241` |

The last three are the same colours seen through 4:2:0 subsampling; they are set to the
values those samples point at rather than to the samples themselves.

Geometry came from **stacking the build against the reference at matched scale** and
reading the column boundaries off the pair. That pass moved the frozen lead region from
29.3% of the content width to 36.3%, cut the row height from 58px to 52px and the header
from 52px to 46px.

## What the sharp capture corrected

`ref/sharp-columns.png` arrived after the first build and overturned four things the
blurry frame had hidden. Each was verified by sampling pixels, not by eye:

1. **Rows are zebra-striped**, white / `#f6f5f8`. Sampled down a column across a row
   boundary: `#ffffff` at y=426, `#f6f5f8` at y=429.
2. **There is no horizontal rule between rows.** The same sample shows no dark pixel at
   any boundary — white goes straight to stripe — and the green draft block runs unbroken
   across all three of its rows. The zebra does the separating. The build had a
   `border-b` on every row; it is gone.
3. **The header's rule is real and darker** than the column dividers: `#cecece` under a
   2.25x capture, so the header uses `--color-line-strong` while the vertical dividers
   stay on `--color-line`.
4. **Drill-down metrics are ink with a DOTTED underline, not blue links.** `5.77` samples
   at `#15191d` — the ink colour — with evenly spaced round dots beneath it. The build had
   them as blue solid-underlined links, which was wrong. `Amount spent` and both CTRs
   carry no underline at all, so the rule is per column, not per value: see `drill` in
   `src/data/columns.ts`.

A fifth was checked and found **not** to be a difference: the row-height-to-text rhythm.
Row pitch ÷ header ink height is 4.48 in the reference and 4.33 in the build, within 3%,
so the type size and row height are right and were left alone.

## Type

Meta's **Optimistic** is proprietary and cannot be bundled, so this is a substitute —
the one place the clone cannot be exact.

It was chosen by measurement, not by eye, and re-checked against the sharp capture. The
reference's `Purchases` was isolated to its ink box (147×23px) for a scale-free shape
metric, ink width ÷ ink height = **6.391**, and the same string measured in fifteen
candidates at two weights through canvas text metrics. **600 fits, 700 does not** — which
is also what the build already used for headers.

| Family (600) | w/h | off by |
|---|---|---|
| Open Sans | 6.420 | 0.5% |
| Plus Jakarta Sans | 6.453 | 1.0% |
| Outfit 700 | 6.318 | 1.1% |
| **Figtree** | **6.481** | **1.4%** |
| Hanken Grotesk | 6.505 | 1.8% |
| Public Sans | 6.512 | 1.9% |

Width alone does not discriminate — everything is inside 2%. The decision was made on one
letterform instead. Blown up, the reference's **`a` is double-storey with a straight stem
that ends flat at the baseline, carrying no spur or tail.** That rules out Open Sans,
Public Sans and Source Sans, which all have one, and keeps Figtree, Plus Jakarta and
Outfit. **Figtree** is used: closest of those three on width, and it carries the other two
features the reference shows — tall x-height and a single-storey `g` with a left hook.

Inter was the first attempt and was the thing that read wrong; it is 2.4% off and tighter
in the lowercase.

Imported by subpath from fontsource. 13px body, 11px captions.

## Layout

A `100vh` shell, no document scroll. One inner scroll region: the table, both ways.

```
LevelTabs     44px   Campaigns · Ad sets · Ads, joined to the card | date range
card
  Toolbar     56px   Create · Duplicate · Edit · delete · Analyze · A/B test · More
                     | Columns · Breakdown · Compare · Reports · Export · Full screen
  table              46px header · 52px rows · 60px summary, all sticky
```

**The first three columns are frozen** — tick, switch, Campaign. The vertical rule running
through the body after the Campaign column is the freeze boundary, and it is in the
reference too; it is also why `columns-far-right.png` still shows a name column after
scrolling right. The header is sticky to the top of the scroller and the summary row to
its bottom, and a filler row absorbs the slack so the summary sits at the foot of the
region rather than leaving a band of white under the last campaign.

The table is 3,418px against a 1,440px viewport, which puts the scrollbar thumb at 42% —
the reference's is about 45%.

## Data

`src/data/campaigns.ts`, bundled and deterministic — no network and no `Math.random`, so
the table that was measured is the table that gets filmed.

Five campaigns in the reference's own shape: three unpublished drafts carrying the green
tint and the green edge bar, one stopped on a payment error, one switched off with real
spend behind it. The account is a Naira account, which is what the reference's own budget
column (`₦4,97…`) shows.

The summary row is **computed from the rows on screen**, not typed: total spent, total
impressions, total landing page views, and cost per landing page view as spend ÷ views
(`₦225.77`). Change a figure in the deck and the summary moves.

## Interactions

Every one is a beat in `drive/campaigns.json`, and `drive.js` diffs each pair numerically
— **21 beats, 0 problems**.

| Interaction | What happens |
|---|---|
| Hover a row | Row lifts to the hover tint; the Actions cell reveals duplicate / edit / charts |
| Tick a row | Row goes blue, `N selected` pills appear on all three level tabs, Duplicate / Edit / delete enable |
| Tick the header | Selects and clears all five |
| The Off/On switch | Flips, and Delivery follows it — a row turned off reads `Off`, a dormant row turned on reads `Active` |
| Sort a column | Sorts both ways, the head turns blue and the paired arrows become one solid arrow |
| Sort Delivery | Sorts by state — drafts, live, broken, off — not alphabetically |
| Scroll right | Metrics scroll under the frozen tick / switch / Campaign columns |
| Keyboard | Tab reaches every live control; the focus ring is the accent at 2px |

One beat is worth knowing about: `sort-spent` has to be preceded by `scroll-to-spent`.
`Amount spent` sits past the card's right clip at rest — it is cut off in the reference
too — so a click at its box centre lands outside the card and does nothing. The beat
scrolls to it first, which is what a hand would do.

## What the probe found

```
document scrolls      no          horizontal scroll   no
dead space at foot    none over 24px
motion at rest        0 animations
duplicate svg ids     none
contrast failures     2
widths                1280 and 1920: no document or horizontal scroll
```

**The two contrast failures are the disabled `Duplicate` and `Edit` buttons** at 1.83:1.
That is the reference's own rendering of a disabled control, and WCAG 1.4.3 exempts
inactive components. Kept.

**Targets under 44px** are all drawn at the reference's sizes: the 18px tick, the 38×22
switch, the 20px per-column caret. The tick and the switch were given a `.hit` overlay
(`inset: -11px`) that makes each a 40px target without moving a pixel of the control. The
column carets were left alone — an overlay there would reach across the narrow columns and
steal clicks from the sort button beside it.

## Declared departures

Where the build differs from the reference, beyond the cuts listed under **Scope**.

1. **The typeface.** Optimistic is proprietary; Figtree substitutes. See **Type**.
2. **The browser chrome is gone** — tab strip, URL bar, the recording's webcam overlay.
   That is the recording, not the app.
3. **`whatapp` → `WhatsApp`, `october sales` → `October sales`.** Typo and casing fixed
   silently; the reference is a recording of someone typing, not a spec for spelling.
4. **`Columns: Copy of Performance` → `Columns: Performance`.** "Copy of" is an artefact
   of that account's saved column set.
5. **Captions are not truncated.** The reference clips `Website Completed R…` because its
   columns are narrower; at 1440 they fit, so they are shown whole.
6. **Figures are invented** at plausible Naira magnitudes. The reference is a recording of
   a live ad account and its figures are real spend.
7. **The muted grey is `#5a6b75`, not the `#637681` the frame suggests.** At 11px on the
   draft tint that read 4.18:1; this reads 4.79:1 on the tint and 5.47:1 on white.
8. **The row actions reveal on hover.** The reference's Actions column is empty in a still
   frame; this is what it does in use.
9. **`Purchases conversion value` is not built.** It is in `sharp-columns.png` but not in
   the account the main reference was recorded from, so the column set still follows the
   latter.

## Not built yet

- **The `Ad sets` and `Ads` levels.** Styled, with working selection pills, but they do
  not switch panes.
- **Every dropdown menu**: the date range, `More`, `Columns`, `Breakdown`, the per-column
  carets, and the add-column button.
- **`Create`, `Analyze`, `A/B test`** — present and styled, no behaviour behind them.
- **The column set itself.** `src/data/columns.ts` holds 18 metric columns read off
  `columns-right.png` and `columns-far-right.png`; which ones belong and how wide they
  should be is the next conversation.

## Files

```
src/App.tsx                 assembly + the one piece of state the deck has (the switches)
src/icons.tsx               every glyph, inline SVG on one 24 grid
src/data/campaigns.ts       the five campaigns
src/data/columns.ts         the 18 metric columns, widths, sorts and summaries
src/components/LevelTabs    the three levels + date range
src/components/Toolbar      the table's toolbar
src/components/DataTable    header, rows, summary, freezing, sorting
src/components/ui           Button, IconButton, Toggle, Tick
drive/campaigns.json        21 beats
shots/08-rest.png           the page at rest
shots/07-fixed.png          scrolled to the far-right columns
```
