# verdia — episode 8

A personal money dashboard, rebuilt from a posed board as a working three-tab app.
Port 5328.

```bash
npm install && npm run dev                              # http://localhost:5328

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5328/ --click "[data-tab='wealth']"
node ../tools/drive.js drive/overview.json
```

## The reference

`ref/shot.png`, 1024×768: a white rounded panel floating on a flat `#d1d1d1` board, with
the panel's own ground at `#f3f3f3`, white cards, and a `#b3ed74` lime doing all the work.

`refscan.py` called it a flat export on a 2px edge ramp. It is not one — the panel is
inset 50px on every side with a board behind it, which is a **posed board**, so this is an
**inspo brief**: the palette, the hierarchy and the order of the blocks are the spec, and
the pixels are not. The board itself is dropped, as in every episode but one, and the
panel's pale ground becomes the page.

**Outfit** is the substitute — a geometric sans with the wide, round numerals this design
leans on for a 46px balance.

## The three tabs

**Overview, Wealth and Cards** are built. **Tools** stays in the nav and is genuinely
inert: muted, `aria-disabled`, skipped by the keyboard, `cursor: not-allowed`, and a click
does nothing.

This design's nav has **four** entries rather than the five or six most dashboards carry,
so three live leaves one inert rather than the usual two. Inventing a fifth to make the
arithmetic tidier would be a different design from the one in the picture.

Overview because it is the screen that was dropped. Wealth because the account card's
balance is the only figure on that screen with nothing behind it — a money app that cannot
show you what you own is a shell. Cards because "Buy — Kestra Lumen 16, card ending 4417"
is on the reference's own transaction list and nothing in the design opens it.

## Interactions

Every one is a beat in `drive/`, photographed and numerically diffed. The three files run
**92 beats with zero problems**, including the "did nothing" check on the inert tab.

| Control | What happens | Beats file |
|---|---|---|
| USD / IDR / MYR | **Converts every figure on the pane** — balance, rewards, spending, earning, each transaction | `overview` |
| Eye, on the balance | Masks and restores it | `overview` |
| Copy account number | Confirms in place | `overview` |
| Transfer / Request Balance | Both confirm in place and can be undone | `overview` |
| Eyes, on the two reward tiles | Each masks its own figure | `overview` |
| Month | Six months of real category spend; the ring, the total and the callout all restate | `overview` |
| Hover a ring segment | Names the category and its share, where the pointer is | `overview` |
| A legend entry | Isolates that category in the ring | `overview` |
| This month / quarter / year | Three different source mixes, and the goal meter with them | `overview` |
| Hover an earning bar | The share pill moves to that bar | `overview` |
| A transaction row | Opens to show its counterparty, and closes again | `overview` |
| Approve / decline | Answers the pending payment and the row leaves the list | `overview` |
| Range 1M / 6M / 1Y / All | Four different series, re-labelled axis | `wealth` |
| Hover the curve | A guide, a dot and the value at that point | `wealth` |
| Allocation ring and legend | Hover names a class; a legend entry isolates it | `wealth` |
| Sort | Name, value and 24h, both directions, with the direction shown in the header | `wealth` |
| A holding row | Opens for its weight, day move and class | `wealth` |
| A goal | Opens for what is left | `wealth` |
| Card picker | Three cards, each with its own face, limit, week and ledger | `cards` |
| Freeze / unfreeze | Dims the card, blocks payments, and switches every control off | `cards` |
| The four card controls | Real switches | `cards` |
| Hover a day | That day's spend on that card | `cards` |
| Hover a category bar | Swaps the amount for its share of spend | `cards` |
| Category filter | Five states, and the total above restates | `cards` |
| Search | Filters transactions, holdings or card spend — whichever tab is showing — with an empty state | all three |
| Tools | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **The legend could not pin anything.** Hovering a legend entry set the category and the
  click that followed immediately toggled it back off, so the control was a no-op that
  looked fine in a screenshot. The numeric diff reported 11 changed pixels on a beat that
  should have redrawn the ring. It is click-only now.
- **Three figures did not match their own parts**, which is the reference's own mistake
  repeated three times in my build: net worth was written at $284,610.55 over a table
  totalling $403,318.10, the allocation ring was a second set of percentages, and a card's
  monthly spend was written at $1,842.60 over a ledger of $5,193.09. All three are derived
  now, and `niceTicks` is the only remaining hand-written number in a chart.
- **The inert tab was unreadable, not inert.** `text-muted/55` measured 2.12:1. It is the
  muted token at full strength now, which is still visibly lighter than any live tab
  because those are the darker body colour.
- **Two tints carried text too light**: the pending note at 3.64:1 and the card's scheme
  line at 4.3:1.
- **The Cards pane was three bands of empty card.** The fix was not padding: the week's
  bars went under the limit, the category breakdown under the controls, and the ledger grew
  from eight charges to the length a real card's would be.
- After those: 0 contrast failures on all three tabs, nothing under 44px, no duplicate SVG
  def ids, every chart labelled, no dead space over 24px, and no document or horizontal
  scroll at 1280, 1440 or 1920.

## Declared departures

1. **The board is dropped.** The grey surround and the panel's drop shadow are a
   presentation effect; the page is the panel's own ground.
2. **Built at 1440×900**, not at the board's 1024×768.
3. **Both of the reference's arithmetic mistakes are corrected.** Spending reads $916.10
   over four categories that total $917.02; Earning reads $7,110.12 over four sources that
   total $7,821.01 — and its "51%" pill is 4,000/7,821.01, so the parts are right and the
   headline is not. Keeping the parts is what keeps the 51% true.
4. **The currency pills convert.** They are three decorative pills in the board.
5. **Meta, Apple and Google are gone.** The reference puts three real marks on its
   transaction rows over invented amounts in an invented account, which is the one thing
   this series must not produce (rule 8). Six invented companies with their own drawn
   marks stand in their place.
6. **The flag disc is drawn, not an emoji** — flags are simply missing on Windows — and it
   is a two-band disc rather than a traced flag, because fifty stars at 18px is
   reproducing an arrangement rather than drawing an idea.
7. **One inert tab, not two**, because the nav has four entries. Explained above.
8. **The search circle opens a real field.** The board draws a magnifying glass with
   nothing behind it.
9. **The share pill moves.** The board pins "51%" to the salary bar with no way to see any
   other source's share; here it rides whichever bar is hovered and falls back to salary at
   rest, so the card still reads the way the picture does.
10. **A visible focus ring everywhere.** The board has none.
11. **The portrait is a free-licensed Pexels photograph**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the ring is drawn at its angles, the meters at their widths, every figure at its
final value, and every control still works. Shot as `shots/reduced.png`.
