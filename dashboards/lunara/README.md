# lunara — episode 20

A crypto portfolio tracker, rebuilt from a posed board as a working three-tab app.
Port 5376.

```bash
npm install && npm run dev                              # http://localhost:5376

python ../tools/refscan.py ref/shot.png
node ../tools/probe.js http://localhost:5376/ --click "[data-tab='markets']"
node ../tools/drive.js drive/overview.json
```

The category standard this was built against is
[`../standards/crypto-portfolio.md`](../standards/crypto-portfolio.md) — written before the
build, so the three live tabs are the three that category ships.

## The reference

`ref/shot.png`, 656×472: a white page carrying white cards, a left icon rail, and a row of
pastel tiles — mint, lilac, peach, pale blue, pale lemon — which are the design's whole
identity. refscan called it a **posed board (inspo brief)** and read `#ffffff` across
three-quarters of the frame with `#355967` for the ink.

**Manrope** is the substitute: a geometric sans with a tall x-height and tabular figures,
which this design needs for a column of balances and a grid of percentages.

### Three greys and two greens, all measured

- `--color-muted` (5.55:1 on white) and `--color-muted-tile` (6.44:1 on the lilac tile).
  One grey cannot serve both grounds: `#5a6b73` is fine on a white card and **4.06:1** on
  lilac, which fails.
- `--color-positive` / `--color-danger` for white cards, and `--color-positive-tile` /
  `--color-danger-tile` for the 24h chips that sit **inside** a pastel tile. The page
  green is 4.51:1 on mint but 3.89:1 on lilac.
- The accent needs no split for once: `#355967` carries white at 7.56:1.

## The three tabs

**Overview, Markets and Activity** are built. **Earn, Price alerts** and **Settings** stay
in the rail and are genuinely inert: muted, `aria-disabled`, skipped by the keyboard,
`cursor: not-allowed`, and a click does nothing. The picture's five header words —
Cryptocurrency, Exchange, Resources, Community, Learn — stay too, and are inert for the
same reason: that row is the marketing site wearing an app's clothes, and removing it
would be a different design.

Overview because it is the screen that was dropped. Markets because every price on
Overview has to come from somewhere, and a tracker without a market table is half a
product. Activity because it is the tab a tax return is built from — and the one that
makes the realised figure, and its FIFO basis, visible.

**One holdings list feeds all three.** Six rows carry quantity, average cost and price;
the headline, the allocation tiles, the four index tiles, the table, the markets rows for
held assets and every figure on Activity are arithmetic over them.

## Interactions

Every one is a beat in `drive/`. The three files run **85 beats with zero problems**, plus
the six-beat hover sweep `probe.js --beats` generated.

| Control | What happens | Beats file |
|---|---|---|
| 24H / 7D / 30D / 1Y | A different series, re-ticked; the shorter spans move less | `overview` |
| Hover the curve | The column lights, and the tooltip names the date and the value | `overview` |
| A token tile | Dims the other five and filters the table under it | `overview` |
| The six column headers | Sort asset, balance, average cost, price, P&L or value, both ways | `overview` |
| Hover a cohort cell | Names the month bought and what it is worth by the later month | `overview` |
| Last 6 / 12 months | The cohort grid resizes to the window | `overview` |
| Export | Confirms in place, and can be undone | `overview` · `activity` |
| The bell | Marks the price alerts read; press again to restore | `overview` |
| All / Watchlist / My holdings | Three lenses over the same twenty rows | `markets` |
| Sort | Rank, price, 24h, 7d, volume, market cap — each reversible | `markets` |
| A market row | Expands to 1h, supply, volume/cap and your position | `markets` |
| The star | Adds and removes from the watchlist; the strip's count follows | `markets` |
| Type chips | Seven filters with live counts | `activity` |
| Account / sort pills | Real menus; the ledger reorders and refilters | `activity` |
| A ledger row | Expands to price-at-the-time, fee, status and hash — and, on a sell, what it realised against the average cost | `activity` |
| Search | Assets, types and hashes, with an empty state | `markets` · `activity` |
| Scroll | Three regions scroll inside the shell; the page never does | all three |
| Tab, Tab | A visible focus ring, proved as a beat | `overview` |
| Six inert destinations | **Nothing.** Proved with `expectUnchanged` | all three |

## What the probe and the beats found

- **A sort key compared the wrong way round, and a beat caught it.** `rank` was written
  `b.rank - a.rank` while every other key compared ascending, so the market table opened
  at rank 20 with Bitcoin at the bottom. Three row beats and two watchlist beats reported
  `NO CHANGE` — correctly: the Ethereum row was **1,418px down a 455px scroller**, so the
  clicks worked and nothing visible happened. The same bug as episode 19's, found the
  same way.
- **Nine contrast failures on the first probe**, all from the pastel tiles: the cohort
  grid's white type on band 4 (3.47:1) and the 24h chips' green on lilac and peach. Band 4
  turned out to fail *both* ways — 3.47:1 under white and 4.497:1 under ink — so it was
  lightened to `#4a9db5` (5.04:1 under ink) and the white flip moved to band 5.
- **The allocation card painted its footer over its own tiles.** Six tiles in an
  auto-rowed grid plus a footer overflowed the card; `grid-rows-3` with `min-h-0` on the
  list *and* the item fixed it.
- **A stablecoin's sparkline was a violent zigzag.** The jitter was a fixed fraction of
  price, so USDT's 0.02% week drew like a 10% one — a chart contradicting the number
  printed beside it. The jitter is a fraction of the coin's own move now.
- **An export button kept its hover into the next beat.** The two inert checks on Activity
  diffed against a frame with the pointer still on Export; a `parked` beat between them
  fixed it. Same trap as episode 17.
- After those: 0 contrast failures on all three tabs, no duplicate SVG def ids, every
  chart labelled, no dead space over 24px, and no document or horizontal scroll at 1280,
  1440 or 1920.

### Targets under 44px

Listed, with the reason. Nothing is under 24px.

- **The column headers** (28px) and the rail icons (44px) are the reference's own control
  scale.
- **The five header words** are 32px tall. They are inert by design, so they are labels
  rather than targets; they keep a 32px box so they clear probe's 24px floor.

## Declared departures

1. **Built at 1440×900**, not at the picture's 656×472.
2. **The brand is invented.** "Fullmoon." becomes **Lunara.**, and the mark is drawn in
   the same idiom — three waxing discs, which is the name — rather than traced. Asset
   discs carry the ticker's first two letters, because a token logo is a mark and this
   build invents its figures.
3. **Every figure reconciles.** The reference's header reads $75,843.52, its allocation
   tiles sum to about $42,681, and its holdings table runs to $120,224,725. Here the
   headline *is* the sum of the holdings — $75,843.25, within thirty cents of the
   picture's own number, by construction rather than by coincidence.
4. **"Total profit" is "Portfolio value."** The card's own contents are a balance and an
   allocation, not a profit; the profit is stated under it, in currency and percent,
   against the cost basis — which the reference never shows.
5. **The four index tiles are computed and defined.** The reference prints "Resilience
   index 0.46" and "Portfolio score 75/100" with no basis for either. These four are
   average monthly growth, 1 − HHI diversification, 30-day max drawdown and the stablecoin
   share, each one line of arithmetic over the deck, each with its definition on hover.
6. **"Bitcoin retention" is "Buy cohorts."** Retention measures users coming back, and a
   coin cannot come back. Same grid, a name that means something: what each month's
   purchases are worth as a percent of what they cost.
7. **The date-range pill is a real control** with three windows, and it drives the cohort
   grid rather than being a label.
8. **A visible focus ring everywhere.** The picture has none.
9. **The portrait is a free-licensed Pexels photograph**, credited in
   `src/assets/img/CREDITS.md`.

## Reduced motion

`prefers-reduced-motion: reduce` switches the transitions off. Nothing is gated on an
entrance — the curve is drawn at its points, the tiles at their values, the cohort grid at
its fills. Shot as `shots/reduced.png`.
