/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * **The asset names are the market's, the figures are not.** A ticker is a
 * public fact about a market rather than a company's branding, so BTC is BTC;
 * every price, size, balance and fill below is invented, and the discs beside
 * them are drawn letters rather than the projects' own marks — carrying a real
 * token logo over invented balances is the one thing this series must not
 * produce (rule 8). The four listings in Top gainers are invented outright.
 *
 * **One asset list feeds all three tabs.** The price strip, the balance, the
 * holdings, the order book, the fills, both charts and the market table all
 * read `ASSETS` and the account's positions in them. Change one price and the
 * strip, the portfolio total, the book's mid and the market table all move.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';

/** The clock every "as of" on the build reads. Frozen, so a take is repeatable. */
export const ASOF = { time: '16:12:45', zone: 'UTC', date: '2026-06-18' };

export const ACCOUNT = {
  name: 'Oripio Sajbur',
  handle: 'oripio',
  email: 'oripio@zyntrex.exchange',
  face: face1,
  /* Two account facts an exchange home always surfaces and the reference
     never does: which fee schedule you are on, and what it costs. */
  tier: 'Tier 3',
  makerFee: 0.0002,
  takerFee: 0.0005,
  verified: 'Verified · level 2',
  chain: 'BNB Chain',
};

/* -------------------------------------------------------------------- assets */

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  /** The drawn disc's ground. A token's own logo is its mark; this is not it. */
  tint: string;
  price: number;
  /** Percent, over the three windows the market table ranks on. */
  h1: number;
  h24: number;
  d7: number;
  volume24h: number;
  marketCap: number;
  supply: number;
  /** Price of a week ago, so "vs last week" is arithmetic rather than a label. */
  weekAgo: number;
}

const ASSET_ROWS: [string, string, string, number, number, number, number, number, number][] = [
  // symbol  name          tint       price      1h     24h     7d     vol(24h)      cap
  ['BTC', 'Bitcoin', '#9c5d00', 64280.5, 0.42, 3.45, 2.98, 18_435_780_000, 1_268_400_000_000],
  ['ETH', 'Ethereum', '#4a5ec0', 4320.75, -0.31, -2.89, -3.12, 32_435_500_000, 520_380_000_000],
  ['SOL', 'Solana', '#7636d4', 520.4, 0.88, 3.67, 3.51, 4_453_300_000, 248_160_000_000],
  ['XRP', 'Ripple', '#1d6ab8', 0.72, 0.12, -1.2, 0.84, 2_118_900_000, 41_280_000_000],
  ['LTC', 'Litecoin', '#5a6b7f', 135.1, 0.19, 0.8, 1.44, 1_146_200_000, 10_140_000_000],
  ['ADA', 'Cardano', '#2f6f9f', 1.08, -0.24, 1.92, 2.3, 946_500_000, 38_720_000_000],
  ['DOT', 'Polkadot', '#b32a63', 18.64, 0.51, 2.14, -0.92, 612_400_000, 26_180_000_000],
  ['LINK', 'Chainlink', '#3b5ec4', 42.18, 0.33, 4.26, 5.18, 884_100_000, 25_640_000_000],
  ['AVAX', 'Avalanche', '#c0392b', 76.3, -0.18, -1.44, 1.08, 538_700_000, 30_420_000_000],
  ['ATOM', 'Cosmos', '#4a4f66', 22.95, 0.26, 1.18, -1.64, 294_300_000, 8_960_000_000],
];

export const ASSETS: Asset[] = ASSET_ROWS.map(
  ([symbol, name, tint, price, h1, h24, d7, volume24h, marketCap]) => ({
    id: symbol.toLowerCase(),
    symbol,
    name,
    tint,
    price,
    h1,
    h24,
    d7,
    volume24h,
    marketCap,
    supply: Math.round(marketCap / price),
    weekAgo: price / (1 + d7 / 100),
  }),
);

export const assetOf = (symbol: string) =>
  ASSETS.find((a) => a.symbol === symbol) ?? (ASSETS[0] as Asset);

/* --------------------------------------------------------------------- pairs */

/**
 * Everything on an exchange is a pair, and a price with no quote currency is
 * ambiguous — the one convention the reference drops everywhere.
 */
export const QUOTE = 'USDT';

export const pairOf = (symbol: string) => `${symbol}/${QUOTE}`;

/** The four the account watches, which is the reference's own strip. */
export const WATCHED = ['BTC', 'LTC', 'XRP', 'ETH'];

/* ------------------------------------------------------------------ holdings */

export interface Holding {
  symbol: string;
  /** Total units. `locked` is the part an open order is sitting on. */
  units: number;
  locked: number;
}

export const HOLDINGS: Holding[] = [
  { symbol: 'BTC', units: 0.8642, locked: 0.12 },
  { symbol: 'ETH', units: 5.4, locked: 0 },
  { symbol: 'SOL', units: 42.6, locked: 12 },
  { symbol: 'LINK', units: 310, locked: 0 },
  { symbol: 'XRP', units: 8400, locked: 2400 },
];

export const valueOf = (h: Holding) => h.units * assetOf(h.symbol).price;
export const lockedValueOf = (h: Holding) => h.locked * assetOf(h.symbol).price;

/** The cash leg. Every exchange balance is holdings plus the quote currency. */
export const CASH = { free: 18_420.5, locked: 4_260.0 };

export const totalValue = () =>
  CASH.free + CASH.locked + HOLDINGS.reduce((t, h) => t + valueOf(h), 0);

export const lockedValue = () => CASH.locked + HOLDINGS.reduce((t, h) => t + lockedValueOf(h), 0);

export const freeValue = () => totalValue() - lockedValue();

/** Yesterday's total, from each asset's own 24h move. The header's change. */
export const valueYesterday = () =>
  CASH.free +
  CASH.locked +
  HOLDINGS.reduce(
    (t, h) => t + h.units * (assetOf(h.symbol).price / (1 + assetOf(h.symbol).h24 / 100)),
    0,
  );

export const change24h = () => ((totalValue() - valueYesterday()) / valueYesterday()) * 100;

export const shareOf = (h: Holding) => (valueOf(h) / totalValue()) * 100;

/* --------------------------------------------------------- portfolio history */

export interface Point {
  at: string;
  value: number;
}

export interface Range {
  id: string;
  label: string;
  /** How many points to draw, and what each step is called. */
  points: number;
  step: string;
}

/**
 * The reference's tabs read `12H · 2H · 1D · 7D · 1M · 1Y` — two hours after
 * twelve, a sequence nobody can scan. These are in order.
 */
export const RANGES: Range[] = [
  { id: '1h', label: '1H', points: 12, step: '5m' },
  { id: '24h', label: '24H', points: 24, step: '1h' },
  { id: '7d', label: '7D', points: 7, step: '1d' },
  { id: '30d', label: '30D', points: 30, step: '1d' },
  { id: '1y', label: '1Y', points: 12, step: '1mo' },
];

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

/**
 * A walk that *ends* on the real total, so the chart's last point and the
 * balance card are the same number whichever range is showing. Drift is wider
 * on the longer ranges, which is what a year of a crypto account looks like.
 */
export function series(range: Range): Point[] {
  const end = totalValue();
  const spread =
    { '1h': 0.004, '24h': 0.018, '7d': 0.06, '30d': 0.14, '1y': 0.42 }[range.id] ?? 0.05;
  const next = rng(range.id.length * 9173 + range.points * 31);
  const steps: number[] = [];
  for (let i = 0; i < range.points; i += 1) steps.push(next() - 0.47);

  // Walk backwards from the close so the series lands on it exactly.
  const out: Point[] = new Array(range.points);
  let v = end;
  for (let i = range.points - 1; i >= 0; i -= 1) {
    out[i] = { at: labelFor(range, i), value: v };
    v = v / (1 + (steps[i] * spread) / 2);
  }
  return out;
}

function labelFor(range: Range, i: number): string {
  if (range.id === '7d') return WEEKDAYS[i % 7];
  if (range.id === '1y') return MONTHS[i % 12];
  if (range.id === '24h') return `${String((i + 17) % 24).padStart(2, '0')}:00`;
  if (range.id === '1h') return `${String((i * 5 + 15) % 60).padStart(2, '0')}m`;
  return `${i + 1}`;
}

/* ------------------------------------------------------------- the own ledger */

export type Side = 'buy' | 'sell';
export type FillState = 'filled' | 'partial' | 'cancelled';

export interface Fill {
  id: string;
  at: string;
  symbol: string;
  side: Side;
  kind: 'limit' | 'market';
  price: number;
  units: number;
  /** Percent of the notional, from the account's own taker/maker schedule. */
  feeRate: number;
  state: FillState;
}

/**
 * **The account's own fills**, which is what "recent transactions" has to
 * mean. The reference's table under that heading is a market table — price,
 * 24h change, 7d change, volume, market cap — and the side, size, fee and
 * status of what you actually did are nowhere on the screen.
 */
export const FILLS: Fill[] = [
  {
    id: 'f1',
    at: '16:04:18',
    symbol: 'BTC',
    side: 'buy',
    kind: 'limit',
    price: 64_102.0,
    units: 0.045,
    feeRate: ACCOUNT.makerFee,
    state: 'filled',
  },
  {
    id: 'f2',
    at: '15:47:02',
    symbol: 'SOL',
    side: 'sell',
    kind: 'market',
    price: 518.9,
    units: 18,
    feeRate: ACCOUNT.takerFee,
    state: 'filled',
  },
  {
    id: 'f3',
    at: '15:12:55',
    symbol: 'ETH',
    side: 'buy',
    kind: 'limit',
    price: 4_344.6,
    units: 1.2,
    feeRate: ACCOUNT.makerFee,
    state: 'partial',
  },
  {
    id: 'f4',
    at: '14:38:41',
    symbol: 'LINK',
    side: 'buy',
    kind: 'limit',
    price: 41.52,
    units: 120,
    feeRate: ACCOUNT.makerFee,
    state: 'filled',
  },
  {
    id: 'f5',
    at: '13:56:09',
    symbol: 'XRP',
    side: 'sell',
    kind: 'limit',
    price: 0.734,
    units: 3_200,
    feeRate: ACCOUNT.makerFee,
    state: 'cancelled',
  },
  {
    id: 'f6',
    at: '13:21:30',
    symbol: 'BTC',
    side: 'sell',
    kind: 'market',
    price: 63_880.0,
    units: 0.019,
    feeRate: ACCOUNT.takerFee,
    state: 'filled',
  },
  {
    id: 'f7',
    at: '12:44:17',
    symbol: 'ETH',
    side: 'sell',
    kind: 'limit',
    price: 4_402.1,
    units: 0.8,
    feeRate: ACCOUNT.makerFee,
    state: 'filled',
  },
  {
    id: 'f8',
    at: '11:58:53',
    symbol: 'SOL',
    side: 'buy',
    kind: 'limit',
    price: 502.15,
    units: 24,
    feeRate: ACCOUNT.makerFee,
    state: 'filled',
  },
  {
    id: 'f9',
    at: '11:12:06',
    symbol: 'ADA',
    side: 'buy',
    kind: 'market',
    price: 1.062,
    units: 4_000,
    feeRate: ACCOUNT.takerFee,
    state: 'filled',
  },
  {
    id: 'f10',
    at: '10:35:44',
    symbol: 'LINK',
    side: 'sell',
    kind: 'limit',
    price: 40.88,
    units: 60,
    feeRate: ACCOUNT.makerFee,
    state: 'cancelled',
  },
];

export const notionalOf = (f: Fill) => f.price * f.units;
export const feeOf = (f: Fill) => (f.state === 'cancelled' ? 0 : notionalOf(f) * f.feeRate);

export const FILL_TONE: Record<FillState, 'positive' | 'warn' | 'quiet'> = {
  filled: 'positive',
  partial: 'warn',
  cancelled: 'quiet',
};

/* ------------------------------------------------------------- open orders */

export interface Order {
  id: string;
  symbol: string;
  side: Side;
  kind: 'limit' | 'stop-limit';
  price: number;
  units: number;
  filled: number;
  placed: string;
}

/** What `locked` is locked by. The two tables reconcile. */
export const ORDERS: Order[] = [
  {
    id: 'o1',
    symbol: 'BTC',
    side: 'sell',
    kind: 'limit',
    price: 66_400.0,
    units: 0.12,
    filled: 0,
    placed: '15:52',
  },
  {
    id: 'o2',
    symbol: 'SOL',
    side: 'sell',
    kind: 'limit',
    price: 548.0,
    units: 12,
    filled: 0,
    placed: '15:20',
  },
  {
    id: 'o3',
    symbol: 'XRP',
    side: 'sell',
    kind: 'stop-limit',
    price: 0.681,
    units: 2_400,
    filled: 0,
    placed: '14:09',
  },
  {
    id: 'o4',
    symbol: 'ETH',
    side: 'buy',
    kind: 'limit',
    price: 4_180.0,
    units: 1.0,
    filled: 0.18,
    placed: '13:40',
  },
];

export const orderNotional = (o: Order) => o.price * o.units;

/* --------------------------------------------------------------- order book */

export interface Level {
  price: number;
  units: number;
  /** Units at this level and every better one, for the depth shading. */
  cumulative: number;
}

export interface Book {
  bids: Level[];
  asks: Level[];
  spread: number;
  spreadPct: number;
  mid: number;
}

/**
 * Twelve levels a side, grouped on a tick the pair can actually quote.
 * Generated from the asset's own price, so switching pair rebuilds the book
 * rather than re-labelling one.
 */
export function book(symbol: string, grouping: number, depth = 12): Book {
  const asset = assetOf(symbol);
  const next = rng(symbol.length * 7717 + Math.round(asset.price));
  const mid = asset.price;
  const bids: Level[] = [];
  const asks: Level[] = [];
  let bidTotal = 0;
  let askTotal = 0;

  for (let i = 0; i < depth; i += 1) {
    // Size grows away from the mid, which is the shape of a real book.
    const bidUnits = round(sizeFor(symbol) * (0.4 + next() * 0.9) * (1 + i * 0.22), symbol);
    const askUnits = round(sizeFor(symbol) * (0.4 + next() * 0.9) * (1 + i * 0.2), symbol);
    bidTotal += bidUnits;
    askTotal += askUnits;
    bids.push({ price: mid - grouping * (i + 1), units: bidUnits, cumulative: bidTotal });
    asks.push({ price: mid + grouping * (i + 1), units: askUnits, cumulative: askTotal });
  }

  const spread = asks[0].price - bids[0].price;
  return { bids, asks, spread, spreadPct: (spread / mid) * 100, mid };
}

/** What one order in this pair usually looks like, so sizes are plausible. */
const sizeFor = (symbol: string) => {
  const price = assetOf(symbol).price;
  if (price > 10_000) return 0.4;
  if (price > 1_000) return 4;
  if (price > 100) return 40;
  if (price > 10) return 400;
  return 20_000;
};

const round = (n: number, symbol: string) => {
  const price = assetOf(symbol).price;
  const dp = price > 10_000 ? 4 : price > 100 ? 2 : price > 1 ? 1 : 0;
  return Math.round(n * 10 ** dp) / 10 ** dp;
};

/**
 * The increments a pair can be grouped by, derived from its price rather than
 * from a global rule — the tick size is per pair on every real desk.
 */
export function groupings(symbol: string): number[] {
  const price = assetOf(symbol).price;
  if (price > 10_000) return [0.1, 1, 10];
  if (price > 1_000) return [0.01, 0.1, 1];
  if (price > 100) return [0.01, 0.1, 1];
  if (price > 1) return [0.001, 0.01, 0.1];
  return [0.0001, 0.001, 0.01];
}

/** How many decimals this pair quotes in. */
export const tickDp = (symbol: string) => {
  const price = assetOf(symbol).price;
  return price > 10_000 ? 1 : price > 100 ? 2 : price > 1 ? 3 : 4;
};

/* -------------------------------------------------------------- market trades */

export interface Trade {
  id: string;
  at: string;
  price: number;
  units: number;
  side: Side;
}

/** Everyone's executions, which is not the account's own ledger. */
export function trades(symbol: string, count = 18): Trade[] {
  const asset = assetOf(symbol);
  const next = rng(symbol.length * 3313 + count);
  const out: Trade[] = [];
  let second = 44;
  for (let i = 0; i < count; i += 1) {
    const drift = (next() - 0.5) * asset.price * 0.0008;
    second -= 1 + Math.floor(next() * 7);
    const minute = 12 + Math.floor((44 - second) / 60);
    out.push({
      id: `t${i}`,
      at: `16:${String(minute).padStart(2, '0')}:${String(((second % 60) + 60) % 60).padStart(2, '0')}`,
      price: asset.price + drift,
      units: round(sizeFor(symbol) * (0.08 + next() * 0.5), symbol),
      side: next() > 0.46 ? 'buy' : 'sell',
    });
  }
  return out;
}

/* ------------------------------------------------------------- candle series */

export interface Candle {
  at: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const INTERVALS = [
  { id: '5m', label: '5m', minutes: 5 },
  { id: '1h', label: '1H', minutes: 60 },
  { id: '4h', label: '4H', minutes: 240 },
  { id: '1d', label: '1D', minutes: 1440 },
];

/**
 * Candles that close on the pair's real price, so the chart, the book's mid
 * and the price strip cannot disagree.
 */
export function candles(symbol: string, interval: string, count = 42): Candle[] {
  const asset = assetOf(symbol);
  const next = rng(symbol.length * 911 + interval.length * 77 + count);
  const vol = { '5m': 0.0025, '1h': 0.008, '4h': 0.018, '1d': 0.035 }[interval] ?? 0.01;

  const closes: number[] = new Array(count);
  let v = asset.price;
  for (let i = count - 1; i >= 0; i -= 1) {
    closes[i] = v;
    v = v / (1 + (next() - 0.48) * vol * 2);
  }

  return closes.map((close, i) => {
    const open = i === 0 ? close / (1 + (next() - 0.5) * vol) : closes[i - 1];
    const wick = Math.abs(close - open) + close * vol * (0.3 + next() * 0.7);
    return {
      at: candleLabel(interval, i, count),
      open,
      close,
      high: Math.max(open, close) + wick * 0.5,
      low: Math.min(open, close) - wick * 0.5,
      volume: Math.round(asset.volume24h * (0.004 + next() * 0.01)),
    };
  });
}

function candleLabel(interval: string, i: number, count: number): string {
  const back = count - 1 - i;
  if (interval === '1d') return `D-${back}`;
  if (interval === '4h') return `${String((16 - back * 4 + 48) % 24).padStart(2, '0')}:00`;
  if (interval === '1h') return `${String((16 - back + 48) % 24).padStart(2, '0')}:00`;
  return `${String((12 - ((back * 5) % 60) + 60) % 60).padStart(2, '0')}m`;
}

/** A seven-point trend for the market table's sparkline column. */
export function spark(symbol: string): number[] {
  const asset = assetOf(symbol);
  const next = rng(symbol.length * 5519 + Math.round(asset.price * 100));
  const out: number[] = [];
  let v = asset.weekAgo;
  for (let i = 0; i < 7; i += 1) {
    out.push(v);
    v = v * (1 + (next() - 0.47) * 0.045);
  }
  out[6] = asset.price;
  return out;
}

/* -------------------------------------------------------- leaders and gainers */

export interface LeaderWindow {
  id: string;
  label: string;
  /** Stated, because "top gainers" over an unnamed window means nothing. */
  note: string;
  from: string;
  to: string;
}

export const LEADER_WINDOWS: LeaderWindow[] = [
  { id: 'week', label: 'Week', note: 'by volume traded, 11–18 June', from: 'Jun 11', to: 'Jun 18' },
  { id: 'month', label: 'Month', note: 'by volume traded, 1–30 June', from: 'Jun 1', to: 'Jun 30' },
];

/** Share of this desk's volume, which is what a leaderboard on an exchange ranks. */
export function leaders(windowId: string) {
  const top = ASSETS.slice()
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 3);
  const scale = windowId === 'month' ? 30 : 7;
  const rows = top.map((a) => ({
    symbol: a.symbol,
    name: a.name,
    tint: a.tint,
    volume: a.volume24h * scale,
    change: windowId === 'month' ? a.d7 * 1.4 : a.d7,
  }));
  const total = rows.reduce((t, r) => t + r.volume, 0);
  return rows.map((r) => ({ ...r, share: (r.volume / total) * 100 }));
}

export interface Gainer {
  symbol: string;
  name: string;
  tint: string;
  cap: number;
  price: number;
  change: number;
}

/**
 * Invented listings, unlike the majors above: these are the small caps a
 * gainers board is made of, and inventing a micro-cap token is safer than
 * naming a real one beside an invented price.
 */
export const GAINERS: Gainer[] = [
  {
    symbol: 'ROSE',
    name: 'Rosewater',
    tint: '#b32a63',
    cap: 274_800_000,
    price: 36.89,
    change: 12.99,
  },
  { symbol: 'JSPR', name: 'Jasper', tint: '#7636d4', cap: 198_400_000, price: 25.43, change: 9.87 },
  {
    symbol: 'AZUR',
    name: 'Azure Lane',
    tint: '#1d6ab8',
    cap: 145_600_000,
    price: 19.78,
    change: 7.45,
  },
  { symbol: 'EMBR', name: 'Ember', tint: '#c2410c', cap: 267_300_000, price: 33.52, change: 11.68 },
  { symbol: 'VELD', name: 'Veldt', tint: '#15803d', cap: 92_100_000, price: 8.14, change: 6.22 },
];

export const GAINER_WINDOW = 'past 24 hours';

/* ------------------------------------------------------------------- the feed */

/** The connection state an exchange home always shows and this reference does not. */
export const FEED = { state: 'live' as const, latencyMs: 42, since: ASOF.time };
