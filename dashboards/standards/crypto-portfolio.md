# Crypto portfolio tracker — the industry standard

**Reference picture:** the "Fullmoon" overview dashboard (nav: Cryptocurrency · Exchange ·
Resources · Community · Learn). Not yet built.

> Same format as every standard in this folder: §1 category and reference products, §2 the
> nav a real one ships, §3 conventions, §4–6 the three tabs worth building, §7 the inert
> rest, §8 what the picture already has and what it is missing, §9 calls to keep.
> **[secondary]** marks a third-party source rather than a vendor's own docs.

---

## 1. The category and the reference products

A **retail crypto portfolio tracker**: what someone opens to see what their holdings are
worth and what they have done. Conventions come from three places:

| Product | What it sets |
|---|---|
| **Coinbase (consumer)** | The portfolio header — total value, per-holding price and 24h move — with recent activity beneath, and Buy/Sell · Send/Receive · Accounts · Trade · Learn as the nav **[secondary]** |
| **CoinGecko / CoinMarketCap** | The market table: rank, asset, price, 1h/24h/7d change, 24h volume, market cap, circulating supply, 7-day sparkline |
| **CoinStats / CoinTracking / Kryptos** | The tracker layer: cost basis, unrealised P&L, allocation grouped by coin, exchange, chain or account, and tax-lot method (FIFO/LIFO/HIFO) **[secondary]** |

The split that matters: **a tracker is not an exchange.** A tracker answers "what do I hold,
what did it cost, what is it worth now". An exchange answers "what can I trade right now"
(see `crypto-trading.md`). This picture is a tracker with an Exchange tab, which is the
common hybrid — but the home screen must be the tracker.

---

## 2. The nav a real one ships

| Entry | What it is | Build? |
|---|---|---|
| **Portfolio / Dashboard** | Value, allocation, performance, holdings | **yes** — the dropped screen |
| **Markets** | The ranked asset table and the watchlist | **yes** |
| **Activity / Transactions** | Every buy, sell, transfer, swap and reward | **yes** |
| Exchange / Trade | Order ticket, book, open orders | inert |
| Earn / Staking | Positions, APY, rewards accrued | inert |
| Accounts / Wallets | Connected exchanges and chains, sync state | inert |
| Learn / Resources | Articles and guides | inert |
| Community | Feeds, discussion | inert |
| Settings | Fiat currency, tax method, privacy, alerts | inert |

---

## 3. Conventions that cut across every tab

1. **Every figure carries an "as of".** A price screen with no timestamp and no refresh
   control is the category's cardinal sin. `Updated 14:32:08 · auto every 30s`.
2. **Price precision scales with price.** Large caps 2 decimals; sub-dollar assets 4–8
   significant figures. Never 2dp on a $0.0000041 token.
3. **Quantity and value are different columns.** `0.4412 BTC` and `$28,431.10` never share
   a cell.
4. **Red/green is reinforcement, never the carrier.** A sign and an arrow do the work; the
   colour helps. (Also: the convention is inverted in some East-Asian markets — state yours.)
5. **One fiat currency selector**, applied everywhere, with the symbol on every figure.
6. **A percentage always names its window** — 24h, 7d, since purchase, all-time.
7. **Cost basis and market value are both shown, and their difference is labelled** as
   unrealised P&L in both currency and percent.
8. **Sorting on every numeric column**, and a persistent watchlist.
9. **No fabricated precision.** If a value is estimated (unpriced token, stale feed), it is
   marked, not silently rounded into the total.

---

## 4. Tab 1 — Portfolio

**Purpose:** what am I holding, what is it worth, and am I up or down.

### 4.1 The metric block

| Metric | Definition |
|---|---|
| **Portfolio value** | Σ (quantity × current price) across all accounts |
| **Cost basis** | Σ (quantity × average buy price), per asset and in total |
| **Unrealised P&L** | Portfolio value − cost basis, shown in currency **and** percent |
| **Realised P&L** | Proceeds − cost basis on closed positions, by tax-lot method |
| **24h change** | Value now − value 24h ago, in currency and percent |
| **Allocation** | Asset value ÷ portfolio value, as a percent |
| **Best / worst performer** | Largest and smallest 24h (or period) move among holdings |

### 4.2 The blocks, in priority order

1. **Value header** — total value, period change in currency and percent, period selector
   (24h · 7d · 30d · 1y · All), and the "as of" stamp.
2. **Performance chart** — value over the selected period, with the option to overlay cost
   basis (the line that makes "am I up?" answerable) or a BTC/index benchmark.
3. **Allocation** — donut or treemap, by asset; a second grouping by account/chain is the
   tracker-specific feature worth having. Each slice: asset, value, share, 24h move.
4. **Holdings table** — asset (icon, name, ticker) · price · 24h % · 7d sparkline ·
   quantity · average buy price · cost basis · market value · unrealised P&L (currency and
   %) · allocation %. Sortable on all of them; a row opens the asset detail.
5. **Quick actions** — buy, sell, swap, send, receive, add manual transaction, connect
   wallet.
6. **Account/connection health** — last sync per connected exchange or wallet, with a
   re-sync control and an obvious failure state.

### 4.3 Asset detail (row click)

Price chart with the user's own buy marks on it · position summary (quantity, average cost,
value, P&L) · that asset's transactions · supply and market-cap facts · the watchlist toggle.

---

## 5. Tab 2 — Markets

**Purpose:** what is the whole market doing, and what should I watch.

- **Global strip:** total market cap, 24h volume, BTC dominance, (optionally) a sentiment
  index — each with its own 24h change.
- **Table columns:** rank · asset (icon, name, symbol) · price · 1h % · 24h % · 7d % ·
  24h volume · market cap · circulating supply · 7-day sparkline · watchlist star.
- **Controls:** search; category and chain filters; sort on every column; "watchlist only";
  pagination or infinite scroll with the row count visible.
- **Row click** → the same asset detail as the portfolio table, so one screen serves both.
- **States:** a watchlist with nothing in it explains how to add; a filter that matches
  nothing names the filter and offers to clear it.

---

## 6. Tab 3 — Activity / Transactions

**Purpose:** the ledger — and the thing a tax return is built from.

- **Row:** type (buy · sell · send · receive · swap · reward · fee) · asset and quantity ·
  price at the time · fee · value in fiat · account/wallet · status (pending, confirmed,
  failed) · timestamp · transaction hash where there is one.
- **Filters:** type, asset, account, date range, status. Search on hash or note.
- **Realised P&L per disposal**, with the cost-basis method stated (**FIFO / LIFO / HIFO**)
  and changeable in settings — the figure is meaningless without the method.
- **Export CSV** — the single most-used feature in this tab.
- **Add manual transaction** for off-exchange activity.
- **States:** pending rows pinned to the top with a spinner; failed rows with the reason.

---

## 7. What the inert tabs would hold

**Exchange** — order ticket, order book, open orders (see `crypto-trading.md`).
**Earn** — staked positions, APY, rewards accrued and claimable, lock-up periods.
**Accounts** — connected exchanges and wallets, sync status, API-key scopes, add/remove.
**Learn / Community / Settings** — articles; feeds; fiat currency, tax method, alerts.

---

## 8. The dropped picture against the standard

**What it already has:** a value header with a sparkline; token allocation tiles with
direction arrows; a holdings table (asset, balance, average buy price, profit/loss %,
value); a "highest 24h volume" callout; a year-on-year performance comparison; and a
month-by-month retention grid.

**What it is missing, worst first:**

| # | Gap | Why it matters |
|---|---|---|
| 1 | **The figures do not reconcile.** The header reads $75,843.52, the allocation tiles sum to ~$42,681, and the holdings table's values run to $120,224,725 | Three numbers for one portfolio. Everything else here is cosmetic next to this — in a rebuild, every figure is derived from one holdings list |
| 2 | **No cost basis and no P&L in currency** | The table has average buy price and a percentage, so both are one multiplication away. "Up 8.43%" without "+$9,120" is half the answer |
| 3 | **No "as of" timestamp and no refresh** | A price screen that cannot say when it was right |
| 4 | **No period selector on the header** | The sparkline covers an unnamed window |
| 5 | **No allocation % column**, and the tiles do not state their share | Allocation is the tracker's second question after value |
| 6 | **No 24h change per holding** in the table | Present on the tiles, absent where it is compared |
| 7 | **"Bitcoin retention" is not a crypto metric** | It is a product-analytics cohort grid wearing a crypto label. The honest equivalents are **HODL waves** (supply by age band) or **holder cohorts by entry month** — same picture, a name that means something |
| 8 | **No quick actions** (buy/sell/swap/send) | Every tracker in the category has them on the portfolio screen |

**Fix order:** one holdings list that every figure derives from (1), then cost basis and
P&L (2), then the timestamp (3). Those three are most of the credibility.

---

## 9. What to keep from the picture

- **The token-allocation tiles.** Unusual and good — a treemap in card form, with the
  direction arrow doing the work a legend usually does.
- **The year-on-year comparison column.** Rare in this category and genuinely useful.
- **The retention grid as a shape** — keep the grid, rename the metric (gap 7).
- **The single-screen layout.** No scrolling for the primary answer is right for a tracker.

---

## 10. Sources

- [Kraken Pro trading interface guide](https://support.kraken.com/articles/360022627732-Trading-Interface-Guide=) — order book, depth, order ticket (used mainly in `crypto-trading.md`).
- [CoinTracking dashboard](https://www.cointracking.info/product/dashboard) **[secondary]** — balance, allocation per coin, performance over time, unrealised gains, grouping by exchange/blockchain/asset type.
- [Kryptos portfolio tracker](https://kryptos.io/portfolio-tracker) **[secondary]** — per-wallet cost basis and unrealised P&L.
- [CoinGecko market explorer spec](https://www.mintlify.com/peLuis123/cryptodash/features/market-explorer) **[secondary]** — rank, price, 24h/7d change, volume, market cap, 7-day sparkline columns.
- [CoinMarketCap historical snapshot](https://coinmarketcap.com/historical/20140220/) — the canonical column set: rank, name, symbol, market cap, price, circulating supply, 24h volume, %1h, %24h, %7d.
- [Managing a Coinbase account](https://grandavehousing.calpoly.edu/news/manage-your-coinbase-account) **[secondary]** — portfolio header, recent activity, nav labels.
- [TradingView portfolio treemap](https://my.tradingview.com/scripts/portfolio) **[secondary]** — market value, cost basis, unrealised P&L and percent return from quantity and buy price.
