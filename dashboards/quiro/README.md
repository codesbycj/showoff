# quiro — episode 12

A payments dashboard that carries its nav twice, rebuilt from a posed board as a working
three-tab app. Port 5344.

```bash
npm install && npm run dev                              # http://localhost:5344

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5344/ --click "[data-tab='reports']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 1200×899: a rounded panel on a flat grey ground. refscan read the palette
off it — `#f2f2f2` for the panel, white cards, `#108652` for the brand green, `#8ebda9`
for the hatched bars and `#e5f1ed` for the tints. It is a **posed board**, so this is an
**inspo brief**; the board is dropped and the panel's ground becomes the page.

**Sora** is the substitute — a geometric sans with the squared terminals and the wide,
even digits this design sets its figures in.

## The three tabs

**Dashboard, Reports and History** are built. **Documents** and **Contacts** stay in the
nav and are genuinely inert: muted, `aria-disabled`, skipped by the keyboard,
`cursor: not-allowed`, and a click does nothing.

This design carries the nav **twice** — five labelled pills across the header and an icon
rail down the left edge — and the rail is the same five destinations here rather than a
second, unexplained set of places. An entry that is inert is inert in both, because two
nav strips that disagree about what is available is the worst possible reading of the
picture. The rail's buttons are `tabIndex={-1}`: they duplicate the header, and a second
tab stop for the same destination is noise for anyone using a keyboard.

Dashboard because it is the screen that was dropped. Reports because the pill is there and
every card on the dashboard is a period that could be exported. History because the
payment table on the dashboard is four rows of fourteen with an open-out arrow that goes
nowhere.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**65 beats with zero problems**, including "did nothing" checks on both inert entries and
on the rail's copies of them.

| Control | What happens | Beats file |
|---|---|---|
| A goal | Picks that wallet: its own card, balance, dates and progress | `dashboard` |
| Send | Confirms in place and can be undone | `dashboard` |
| 3M / 6M / 1Y | Three different balance series, re-labelled axis | `dashboard`, `reports` |
| Monthly / Annually | Two different engagement series | `dashboard` |
| Hover a bar | The bar fills and the bubble carries **that bar's own** change | `dashboard` |
| A mandatory payee | Names them, their amount and when it is due | `dashboard` |
| Sort | Name, date and amount, both ways, with the direction in the header | `dashboard`, `history` |
| Add New Wallet | Confirms in place and can be undone | `dashboard` |
| See the full history | Opens the History tab | `dashboard` |
| Report kind | Five states | `reports` |
| Get | Queues a report and can be un-queued | `reports` |
| Status filter | Four states; the three figures and the counterparty split all restate | `history` |
| Search | Filters payments or reports — whichever tab is showing — with an empty state | all three |
| Documents, Contacts | **Nothing**, in the header and in the rail. Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **The brand green cannot carry small text.** `#108652` measured 4.36:1 under the
  off-white tint and 4.61:1 under pure white — too thin. It is the *mark* colour now
  (bars, dots, meters, rings) and `#0b5f3a` is the one anything with text on it uses: the
  card, Send, the bubble, the active rail pill. 7.74:1.
- **The wallet card stretched to 270×560.** `Face` fills its box, and given the whole
  column it drew a payment card twice as tall as it is wide. It carries a 1.55:1 aspect
  now — and the 300px that freed became the Goals list, which is the fact the slack was
  hiding.
- **The axis labels were clipped.** `$30,000` is wider than the chart's left gutter, so
  the dollar sign fell off the edge. Compact labels (`$30K`) fit.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

1. **The board is dropped** — the grey surround and the panel's shadow are a presentation
   effect. The header and the rail keep their pill shapes, because in this design they are
   floating controls rather than edges of the window.
2. **Built at 1440×900**, not at the board's 1200×899.
3. **The rail is the same five destinations as the header.** The reference's rail is nine
   icons in three groups with no labels and no relationship to its five pills; reading
   them as two views of one nav is the only reading that keeps every control honest.
4. **A design community, a payments network and a retailer are gone.** The reference puts
   three real marks on its payment rows over invented percentages in an invented account
   (rule 8). Six invented companies with their own drawn marks stand in their place.
5. **The engagement bubble carries the hovered bar's own change.** The reference pins
   "+17.8%" to a month that is not the tallest, over an axis topping out at 5k with bars
   drawn above it. The plot is scaled to the data and the deltas are computed from it.
6. **"Add New Wallet", "Send", "Get" and every open-out arrow do something.** They all go
   nowhere in the picture.
7. **A visible focus ring everywhere.** The board has none.
8. **The portraits are free-licensed Pexels photographs**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the bars are drawn at their heights, the curve at its points, the meters at
their widths, every figure at its final value. Shot as `shots/reduced.png`.
