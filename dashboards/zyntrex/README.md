# zyntrex — episode 25

A crypto exchange front end, rebuilt from a posed design board as a working three-tab
desk. Port 5396.

```bash
npm install && npm run dev                              # http://localhost:5396

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5396/ --click "[data-tab='trade']"
node ../tools/probe.js http://localhost:5396/ --click "[data-theme-btn='dark']|[data-tab='trade']"
node ../tools/drive.js drive/dashboard.json
```

## The reference

`ref/shot.png`, 736×920: a browser window posed on a grey board, with the designer's own
chrome around it — a name chip, a year, a "Dashboard Design" label and a phone number.
All of that and the window frame are presentation furniture and all of it is dropped; the
dashboard inside is about 668×478 of the board, which is a little over a third of the
pixels this is built at.

refscan read `#e8e9ee` across 52% of the frame (the board), `#ffffff` for the cards and
`#fe7646` for the one accent. Sampling inside the window gives the page's own ground as
`#f7f7f7` and the accent as `#ff7747`, which is what this uses.

**Space Grotesk** carries the interface and **JetBrains Mono** every figure. The
reference sets its prices in a tracked-out monospace, and on a screen that is four
columns of prices, sizes and times that is not a stylistic choice — a proportional figure
column cannot be scanned down.

### The split, measured

`#ff7747` is **2.66:1** against white. It cannot carry type at all, so it is the _mark_
colour — the logo tile, the value chart's line and fill, a pressed pill's tint — and
`--color-accent-deep` `#c2410c` (5.18:1) is what anything with words on it uses. The
reference's own Deposit button is white on the coral, which is the first thing the probe
caught.

Dark inverts it: `#ff7747` clears 6.6:1 on the dark surface and carries type fine, while
the thing that then cannot take white is the coral _button_, so `--color-accent-fg`
becomes near-black (7.1:1) rather than white. One token, two meanings, and every
component reads it rather than a hex.

**Every asset tint was wrong the first time.** The discs carry a white letter, and five
of the ten tints were under 4.5:1 behind it — Bitcoin's orange at 2.30:1 worst. They are
darkened to clear it, which also makes the leader bars and the candles read on white.

## The three tabs

**Dashboard, Trade and Market** are built. **Analytics, Portfolio** and **OTC** stay in
the header and are genuinely inert: dimmed to their own token (`--color-muted-inert`,
still 4.8:1 — being inert does not exempt a word from being readable), `aria-disabled`,
skipped by the keyboard, `cursor: not-allowed`, and a click does nothing.

Dashboard because it is the screen that was dropped. Trade because it is the reason the
category exists and the reference has no trading surface at all. Market because every
price on the other two tabs is quoted without a ranked table to put it in.

**One asset list feeds all three.** Ten pairs carry a price, three change windows, volume
and market cap; the price strip, the balance, the holdings, the order book, the candles,
the fills, both charts and the market table all read them. Change one price in
`src/data/deck.ts` and the strip, the portfolio total, the book's mid and the table all
move together.

**The asset names are the market's; every figure is invented.** A ticker is a public fact
about a market rather than a company's branding, so BTC is BTC — but the discs are drawn
letters rather than the projects' own marks, because carrying a real token logo over
invented balances is the one thing this series must not produce (rule 8). The four
listings on the gainers board are invented outright: a micro-cap is exactly where a real
name beside an invented price would do harm.

## Interactions

Every one is a beat in `drive/`. The three files run **89 beats with zero problems**,
plus a six-beat hover sweep.

| Control                              | What happens                                                                                       | Beats file             |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------- |
| 1H / 24H / 7D / 30D / 1Y             | Five windows on the value chart, each a different series                                           | `dashboard`            |
| Hover the chart                      | A crosshair, a marker and the value at that point                                                  | `dashboard`            |
| Week / Month                         | Both leader windows, with the dates under them                                                     | `dashboard`            |
| Deposit · Withdraw · Swap · Transfer | Each opens what that action needs — network and address, limits and fee, the two ends and the rate | `dashboard`            |
| All / Buys / Sells                   | Three lenses over the account's own fills                                                          | `dashboard`            |
| A price card, a holding              | Opens Trade on that pair                                                                           | `dashboard`            |
| Light / Dark                         | A real theme, not a decoration                                                                     | all three              |
| Search                               | Filters the fills on Dashboard and the table on Market, with an empty state                        | `dashboard` · `market` |
| BTC / ETH / SOL / XRP                | Rebuilds the book, the candles and the trade feed from that pair                                   | `trade`                |
| 5m / 1H / 4H / 1D                    | Four candle intervals                                                                              | `trade`                |
| Both / bids / asks                   | The book's view switcher                                                                           | `trade`                |
| Group 0.1 / 1 / 10                   | Price grouping, on increments derived from the pair                                                | `trade`                |
| A level in the book                  | Fills the ticket's limit price                                                                     | `trade`                |
| 25 / 50 / 75 / 100%                  | The percentage rail, against the **free** balance                                                  | `trade`                |
| Limit / Market / Stop-limit          | Changes the price field and the fee from maker to taker                                            | `trade`                |
| Buy / Sell                           | Changes what the rail is a percentage of, and the CTA's colour                                     | `trade`                |
| Cancel an order                      | Removes it, and the card says so                                                                   | `trade`                |
| Sort on five columns                 | Both directions, `aria-sort` on the header                                                         | `market`               |
| A star                               | Adds or removes from the watchlist, which the lens then filters on                                 | `market`               |
| A row                                | Opens Trade on that pair                                                                           | `market`               |
| Scroll                               | Five regions scroll inside the shell; the page never does                                          | all three              |
| Tab, Tab                             | A visible focus ring, proved as a beat                                                             | `dashboard`            |
| Three inert destinations             | **Nothing.** Proved with `expectUnchanged`                                                         | all three              |

## What the probe and the beats found

- **32 contrast failures on the first render**, in four groups: the asset discs' white
  letters on five tints that were too light; the coral buttons; the inert nav words at
  `text-muted/55` (2.34:1); and the green chips, whose `#15803d` on its own soft ground
  was 4.39:1 — eleven hundredths under. All four are token changes, which is the point of
  having tokens.
- **Dark mode failed on one node** the light theme passed: a solid button set in
  `text-white` rather than `text-accent-fg`. A hard-coded `white` is a token that cannot
  flip, and it is invisible until the theme does.
- **Two targets under the 24px floor**: the header's search `input` (19px inside a 44px
  pill — the pill is not the target) and the order-book rows at 23px.
- **Three hover rules matched nothing.** Two were seeded `IconButton` tones no pane calls;
  the third was real, but the only solid button at rest lives on Trade, so the sweep
  clicks through to it rather than reporting the rule as dead.
- **The React Compiler refused three `useMemo`s** around the book, the candles and the
  trade feed. They are seeded loops; the manual memoisation came out.
- After those: 0 contrast failures on all three tabs **in both themes**, no duplicate SVG
  def ids, both charts labelled, no dead space over 24px, no document or horizontal scroll
  at 1280, 1440 or 1920, and no animation running at rest.

### Targets under 44px

Listed by the probe, with the reason. Nothing is under 24px: the segmented controls are
28px, which is the reference's own control scale; the watchlist stars are 32px; the book's
rows are 25px, because a book that shows four levels a side is not a book.

## Declared departures

1. **Built at 1440×900**, and the desk runs to the window edge. The board, the browser
   chrome and the designer's own labels are presentation furniture.
2. **The brand is invented.** The reference's window reads "Raxon". **Zyntrex** is the
   name here, with the mark drawn in the same idiom — a Z cut as two rails and the
   diagonal between them, which is also an order crossing a book.
3. **"Recent transactions" is the account's own fills.** The reference's table under that
   heading has price, 24h change, 7d change, volume and market cap — that is the Market
   tab, and the side, size, fee and status of what you actually did are nowhere on the
   screen. This one has them.
4. **Balance is free against locked.** The reference shows one number. The moment an order
   is open that number is not what you can spend, and the percentage rail on the ticket is
   a percentage of the free part for the same reason.
5. **The range tabs are in order.** The reference's read `12H · 2H · 1D · 7D · 1M · 1Y` —
   two hours after twelve.
6. **Every price agrees with every other price.** The reference quotes Bitcoin at
   $12,540.00 in the strip, $68,420 in Top Assets and $64,280.50 in the table; Ethereum at
   $1,040.50, $15.82 and $4,320.75; Ripple at $0.72 and $0.62. Here there is one price per
   asset and everything derives from it.
7. **Everything is a pair.** The reference quotes per coin and never names a quote
   currency, so "$12,540.00" is ambiguous about what it is denominated in. Every price on
   this build is `BTC/USDT`.
8. **The feed has a state.** Live prices with no freshness marker is the oldest lie in the
   category; the header carries `live`, its latency and the as-of stamp the whole build
   reads.
9. **The account facts are on the screen.** Fee tier, maker and taker rates, verification
   level and the open-order count — two of which the ticket needs to quote a fee at all.
10. **"Top gainers" states its window.** Gainers over what was not answerable from the
    picture.
11. **The ticket's CTA is the side's colour, not the brand's.** Green buys and red sells;
    a coral button for both is the one place a brand colour costs a reader time.
12. **Dark is real.** The reference draws a sun and a moon and this is the category where
    people sit in front of the screen for hours, so it is a theme rather than two icons.
13. **A visible focus ring everywhere.** The picture has none.
14. **The portrait is a free-licensed Pexels photograph**, credited in
    `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the chart is drawn at its path, the candles at their bodies, the bars at their
widths, every figure at its final value. Shot as `shots/reduced.png`, pixel-identical to
`shots/dashboard.png`.
