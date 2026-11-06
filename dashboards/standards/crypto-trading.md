# Crypto exchange / trading desk — the industry standard

**Reference picture:** the "Raxon" dashboard (nav: Dashboard · Trade · Market · Analytics ·
Portfolio · OTC). Not yet built.

---

## 1. The category and the reference products

An **exchange front end**: price discovery and order entry, with the account's balance
beside it. Conventions come from:

| Product | What it sets |
|---|---|
| **Kraken Pro / Kraken Desktop** | The canonical pro layout — chart, order book with cumulative-depth shading, order ticket with bid/ask fill, market-trades feed, open orders and positions with cancel-all |
| **Binance.US advanced trade** | The order-book view switcher (bids+asks, bids only, asks only) and open orders / order history on the same screen as the ticket **[secondary]** |
| **CoinGecko / CoinMarketCap** | The market table (see `crypto-portfolio.md` §5) |
| **Coinbase (consumer)** | The simplified home: balance, quick actions, holdings, recent activity |

The picture is the **consumer-facing home of an exchange**, not the pro trading surface —
balance, top assets, recent transactions, gainers. That is a legitimate screen; the pro
surface then lives behind Trade.

---

## 2. The nav a real one ships

| Entry | What it is | Build? |
|---|---|---|
| **Dashboard / Home** | Balance, market snapshot, recent activity | **yes** — the dropped screen |
| **Trade** | Chart, order book, order ticket, open orders | **yes** — the category's reason to exist |
| **Market** | The ranked table and per-pair stats | **yes** |
| Analytics | Portfolio analytics, PnL attribution, fees paid | inert |
| Portfolio | Holdings and allocation (see `crypto-portfolio.md`) | inert |
| OTC | Large-block quotes and RFQ | inert |
| Wallet / Funding | Deposit, withdraw, transfer, addresses | inert |
| Settings | Security, API keys, fee tier, notifications | inert |

---

## 3. Conventions that cut across every tab

1. **Everything is a pair.** `BTC/USDT`, not "Bitcoin". The pair selector is permanent and
   searchable, with the pair's price in the browser title on real desks.
2. **The price is live, and the UI says so** — flashing last-price, green/red tick
   direction, and an explicit connection state (`live` / `reconnecting`).
3. **Precision follows the pair's tick size**, not a global rule; the increment is shown
   in the ticket.
4. **Every amount field has a percentage rail** (25 / 50 / 75 / 100% of balance) — the
   single most-used control on an order ticket.
5. **Fees are quoted before submit**, with the fee tier and the resulting total.
6. **Destructive and irreversible actions confirm**: cancel-all, withdraw, market order at
   a price far from the book.
7. **Balances show free vs. locked** — funds held by open orders are not spendable, and a
   screen that shows only the total is lying.
8. **Nothing animates for decoration.** A tick flash means a tick happened.

---

## 4. Tab 1 — Dashboard (Home)

**Purpose:** what is my account worth, what is the market doing, what did I just do.

1. **Balance header** — total account value in fiat, 24h change in currency and percent,
   free vs. locked, and the four actions: **Deposit · Withdraw · Swap · Transfer**.
2. **Price strip** — four to six watched pairs, each with last price, 24h change and a
   `vs. last week`-style baseline label (name the window).
3. **Portfolio value chart** — value over 12h · 24h · 7d · 30d · 1y, hover reading time
   and value, and the same "as of" stamp the rest of the screen uses.
4. **Top assets** — the account's largest holdings: asset, price, 24h, value, share.
5. **Market leaders / top gainers / top losers** — three short lists, each a link into
   Market, each stating the window.
6. **Recent transactions** — the account's own fills and transfers: asset, side, price,
   amount, fee, status, time. Not to be confused with the market-trades feed, which is
   everyone's.
7. **Account state** — verification level, fee tier, open-order count, alerts.

---

## 5. Tab 2 — Trade

**Purpose:** place an order without leaving the screen that justifies it.

The pro layout, as Kraken and Binance arrange it:

- **Pair selector and pair header** — last price, 24h change, 24h high/low, 24h volume,
  mark/index price for derivatives.
- **Chart** — candlesticks, interval selector (1m → 1M), indicator and drawing tools, and
  (Kraken's touch worth stealing) the ability to place or edit an order from the price axis.
- **Order book** — bids and asks, grouped by a selectable price increment, with
  **cumulative-depth shading** behind the rows; a view switcher for both sides / bids only /
  asks only; the spread stated in the middle. Clicking a level fills the ticket's price.
- **Market trades feed** — recent executions with price, quantity, time, side-coloured.
- **Order ticket** — buy/sell toggle; spot/margin selector; order type (market, limit,
  stop-limit, take-profit, trailing); amount with the percentage rail; price with
  bid/ask auto-fill buttons; estimated fee and total; post-only / reduce-only /
  time-in-force where the type allows.
- **Open orders / positions** — a table under the ticket with cancel per row and
  **cancel all**, plus tabs for order history and fills.
- **Depth chart** (optional second view of the book) and a **balance strip** showing the
  pair's two assets, free and locked.

**States:** no open orders (not an empty box — a line of text); a rejected order with the
exchange's reason; a disconnected feed that greys the book rather than freezing it.

---

## 6. Tab 3 — Market

As `crypto-portfolio.md` §5: global strip, ranked table (rank · asset · price · 1h/24h/7d ·
volume · market cap · supply · sparkline · star), search, category and chain filters, sort
on every column, watchlist. Exchange-specific additions: **quote-currency tabs**
(USD / USDT / BTC markets), the pair's own 24h volume **on this exchange** rather than
globally, and a "trade" action on every row.

---

## 7. What the inert tabs would hold

**Analytics** — realised and unrealised PnL by asset and by period, fees paid, win rate,
funding costs. **Portfolio** — allocation and cost basis. **OTC** — RFQ form, quote with a
countdown, settlement instructions. **Wallet** — per-asset deposit addresses with network
selector, withdrawal with whitelist and 2FA, transfer between spot and margin.

---

## 8. The dropped picture against the standard

**What it has:** four pair cards with `vs Last Week` baselines (the baseline label is
right, and most designs omit it); Market Leaders with a Week/Month toggle; a portfolio
value chart with range tabs (12H · 2H · 1D · 7D · 1M · 1Y) and a hover tooltip; a balance
card with Deposit · Withdraw · Swap · Transfer; Top Assets; a recent-transactions table
with 24h change, 7d change, volume, a 24h trend sparkline and market cap; Top Gainers.

**Gaps, worst first:**

| # | Gap | Why it matters |
|---|---|---|
| 1 | **"Recent transactions" is a market table, not transactions** | Its columns are price, 24h change, 7d change, volume, market cap — that is the Market tab. The account's own fills (side, amount, fee, status, time) are missing entirely, and they are the thing a user checks after trading |
| 2 | **Balance is one number** | Free vs. locked is the distinction that matters the moment an order is open |
| 3 | **The range tabs are out of order** — `12H · 2H · 1D · 7D · 1M · 1Y` | 2H after 12H; a sequence nobody can scan |
| 4 | **No "as of" / connection state** | Live prices with no freshness marker |
| 5 | **No pair context anywhere** | Prices are quoted per coin, never per pair; an exchange home that never names a quote currency is ambiguous about what "$12,540.00" is |
| 6 | **No open-order count or fee tier** | Two account facts every exchange surfaces on home |
| 7 | **Top Gainers has no window** | Gainers over what — 1h, 24h, 7d? |

---

## 9. What to keep from the picture

- **`vs Last Week` under every price.** The baseline-on-the-card convention, done right.
- **The four-action balance card.** Deposit/Withdraw/Swap/Transfer is exactly the set.
- **The sparkline column** in the asset table.
- **The light/dark toggle in the header** — standard for this category, where people stare
  at the screen for hours.

---

## 10. Sources

- [Kraken Pro trading interface guide](https://support.kraken.com/articles/360022627732-Trading-Interface-Guide=) — order book bid/ask sides, price grouping, cumulative-depth shading, market-trades feed, open orders and positions with cancel-all.
- [How to trade on Kraken Desktop](https://support.kraken.com/at/articles/how-to-trade-on-kraken-desktop) — order ticket, bid/ask auto-fill (and that it does not apply to market orders), spot/margin selector, order entry from the chart.
- [Binance.US advanced trade redesign](https://blog.binance.us/advanced-trading-redesign/) **[secondary]** — order-book view switcher, open orders and order history on one screen.
- [Guide to crypto exchange order books](https://coinloan.io/blog/guide-to-crypto-exchange-order-book/) **[secondary]** — order-book entry fields.
- [CoinGecko market explorer spec](https://www.mintlify.com/peLuis123/cryptodash/features/market-explorer) **[secondary]** and [CoinMarketCap historical snapshot](https://coinmarketcap.com/historical/20140220/) — the market table's column set.
