/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the account, the holder, the balances. The asset
 * names are the public chains' own, which are not a company's product the way
 * a brand is; the exchange, the figures and the person are all made up.
 *
 * **One holdings list, and every figure derives from it.** The portfolio
 * value, the allocation tiles, the four index tiles, the holdings table, the
 * markets rows for held assets and the activity ledger all read these six
 * rows. The reference does not do this and it shows: its header says
 * $75,843.52, its allocation tiles sum to about $42,681, and its holdings
 * table runs to $120,224,725 — three numbers for one portfolio.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  holder: 'Fariz Adeyemi',
  range: '12 January 2026 – 12 January 2027',
  updated: '14:32:08',
};

/* ------------------------------------------------------------------ assets */

export interface Holding {
  id: string;
  name: string;
  symbol: string;
  /** A pastel token from the theme, so the tile and the row cannot drift. */
  tile: string;
  quantity: number;
  /** Average cost per unit, in USD. */
  avgBuy: number;
  price: number;
  change24h: number;
}

export const HOLDINGS: Holding[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    tile: '--color-tile-peach',
    quantity: 0.3762,
    avgBuy: 54_900,
    price: 64_120,
    change24h: 2.14,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    tile: '--color-tile-sky',
    quantity: 4.185,
    avgBuy: 2_944,
    price: 3_908,
    change24h: 4.75,
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    tile: '--color-tile-lilac',
    quantity: 86.4,
    avgBuy: 112.4,
    price: 141.48,
    change24h: -1.83,
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    tile: '--color-tile-mint',
    quantity: 9_240,
    avgBuy: 0.585,
    price: 0.9617,
    change24h: 8.43,
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    tile: '--color-tile-lemon',
    quantity: 12.76,
    avgBuy: 496,
    price: 599.87,
    change24h: 0.62,
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    tile: '--color-tile-mint',
    quantity: 6_602,
    avgBuy: 1,
    price: 1,
    change24h: 0,
  },
];

export const value = (h: Holding) => h.quantity * h.price;
export const costBasis = (h: Holding) => h.quantity * h.avgBuy;
export const pnl = (h: Holding) => value(h) - costBasis(h);
export const pnlPct = (h: Holding) => (pnl(h) / costBasis(h)) * 100;

export const portfolioValue = () => HOLDINGS.reduce((t, h) => t + value(h), 0);
export const portfolioCost = () => HOLDINGS.reduce((t, h) => t + costBasis(h), 0);
export const portfolioPnl = () => portfolioValue() - portfolioCost();
export const portfolioReturn = () => (portfolioPnl() / portfolioCost()) * 100;
export const share = (h: Holding) => (value(h) / portfolioValue()) * 100;

export const holdingOf = (id: string) => HOLDINGS.find((h) => h.id === id) ?? HOLDINGS[0];

/** The 24h move of the whole book, weighted by each holding's value. */
export const change24h = () =>
  HOLDINGS.reduce((t, h) => t + h.change24h * (value(h) / portfolioValue()), 0);

/* ------------------------------------------------------------ value series */

export interface Span {
  id: string;
  label: string;
  points: number;
  ticks: string[];
}

export const SPANS: Span[] = [
  { id: '24h', label: '24H', points: 24, ticks: ['00:00', '06:00', '12:00', '18:00', 'now'] },
  { id: '7d', label: '7D', points: 28, ticks: ['Mon', 'Wed', 'Fri', 'Sun', 'now'] },
  { id: '30d', label: '30D', points: 30, ticks: ['1', '8', '15', '22', '30'] },
  { id: '1y', label: '1Y', points: 48, ticks: ['Jan', 'Apr', 'Jul', 'Oct', 'now'] },
];

const SHAPE = [0.63, 0.6, 0.68, 0.66, 0.74, 0.79, 0.76, 0.84, 0.88, 0.93, 0.97, 1.0];

/**
 * Portfolio value over a span, seeded, and **ending on the live total** — the
 * curve's last point is the headline figure, not a separate number that
 * happens to look similar.
 */
export function valueSeries(spanId: string): number[] {
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[3];
  const next = rng(3301 + span.points);
  const total = portfolioValue();
  /* A short span moves a little, a long one moves a lot: the 24h curve must
     not look like a year of growth squeezed into a day. */
  const depth = span.id === '24h' ? 0.04 : span.id === '7d' ? 0.11 : span.id === '30d' ? 0.22 : 0.4;
  const raw = Array.from({ length: span.points }, (_, i) => {
    const f = SHAPE[Math.floor((i / span.points) * SHAPE.length)] ?? 1;
    return 1 - depth * (1 - f) + (next() - 0.5) * depth * 0.22;
  });
  const last = raw[raw.length - 1];
  return raw.map((v) => Math.round(((v / last) * total + Number.EPSILON) * 100) / 100);
}

/** What a point on the curve is, for the tooltip. */
export function pointLabel(spanId: string, i: number, points: number): string {
  if (spanId === '24h') return String(Math.round((i / points) * 24)).padStart(2, '0') + ':00';
  if (spanId === '7d')
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Math.floor((i / points) * 7)];
  if (spanId === '30d') return 'Day ' + (i + 1);
  return new Date(2026, Math.floor((i / points) * 12), 1).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });
}

/* ------------------------------------------------------------- index tiles */

export interface Index {
  id: string;
  label: string;
  value: string;
  tile: string;
  /** What the figure is, in one line. The reference prints four indices and
      defines none of them. */
  note: string;
}

/**
 * The reference's four pastel tiles, **computed and defined**. It prints
 * "Resilience index 0.46" and "Portfolio score 75/100" with no basis for
 * either; these four are each one line of arithmetic over the holdings and
 * the value series.
 */
export function indices(): Index[] {
  const year = valueSeries('1y');
  const steps = year.slice(1).map((v, i) => (v - year[i]) / year[i]);
  const monthly = (steps.reduce((t, v) => t + v, 0) / steps.length) * 4 * 100;

  /* 1 - HHI: 0 is everything in one asset, 100 is perfectly even. */
  const hhi = HOLDINGS.reduce((t, h) => t + (share(h) / 100) ** 2, 0);
  const spread = (1 - hhi) * 100;

  const thirty = valueSeries('30d');
  let peak = thirty[0];
  let drawdown = 0;
  for (const v of thirty) {
    peak = Math.max(peak, v);
    drawdown = Math.max(drawdown, (peak - v) / peak);
  }

  const stable = HOLDINGS.filter((h) => h.symbol === 'USDC').reduce((t, h) => t + value(h), 0);

  return [
    {
      id: 'growth',
      label: 'Avg. monthly growth',
      value: monthly.toFixed(2) + '%',
      tile: '--color-tile-mint',
      note: 'Mean month-on-month change of portfolio value over the year',
    },
    {
      id: 'spread',
      label: 'Diversification',
      value: Math.round(spread) + '%',
      tile: '--color-tile-lilac',
      note: '1 − HHI across the six holdings; 100% would be an even split',
    },
    {
      id: 'drawdown',
      label: 'Max drawdown, 30d',
      value: (drawdown * 100).toFixed(1) + '%',
      tile: '--color-tile-sky',
      note: 'Largest fall from a peak in the last thirty days',
    },
    {
      id: 'stable',
      label: 'Stable cushion',
      value: ((stable / portfolioValue()) * 100).toFixed(1) + '%',
      tile: '--color-tile-peach',
      note: 'Share of the book held in USD Coin',
    },
  ];
}

/* ----------------------------------------------------------------- markets */

export interface Coin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  volume: number;
  marketCap: number;
  supply: number;
  held: boolean;
}

const MARKET_ROWS: [
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
][] = [
  [
    'btc',
    'Bitcoin',
    'BTC',
    64_120,
    0.21,
    2.14,
    6.48,
    28_400_000_000,
    1_264_000_000_000,
    19_720_000,
  ],
  ['eth', 'Ethereum', 'ETH', 3_908, 0.44, 4.75, 9.12, 14_900_000_000, 470_200_000_000, 120_300_000],
  ['usdt', 'Tether', 'USDT', 1, 0.01, 0.0, 0.02, 41_200_000_000, 112_800_000_000, 112_800_000_000],
  ['bnb', 'BNB', 'BNB', 599.87, -0.08, 0.62, 3.44, 1_640_000_000, 88_600_000_000, 147_700_000],
  ['sol', 'Solana', 'SOL', 141.48, -0.36, -1.83, 4.21, 2_880_000_000, 65_400_000_000, 462_300_000],
  ['usdc', 'USD Coin', 'USDC', 1, 0.0, 0.0, 0.01, 7_300_000_000, 33_900_000_000, 33_900_000_000],
  ['xrp', 'XRP', 'XRP', 0.6214, 0.12, 1.08, -2.14, 1_120_000_000, 34_600_000_000, 55_700_000_000],
  ['ada', 'Cardano', 'ADA', 0.9617, 0.67, 8.43, 14.2, 884_000_000, 33_800_000_000, 35_100_000_000],
  [
    'doge',
    'Dogecoin',
    'DOGE',
    0.1642,
    -0.22,
    3.11,
    7.86,
    1_040_000_000,
    23_700_000_000,
    144_300_000_000,
  ],
  ['avax', 'Avalanche', 'AVAX', 38.92, 0.31, -2.44, 1.18, 412_000_000, 15_200_000_000, 390_600_000],
  ['dot', 'Polkadot', 'DOT', 7.14, -0.14, 0.88, -4.32, 238_000_000, 10_100_000_000, 1_414_000_000],
  ['link', 'Chainlink', 'LINK', 16.84, 0.52, 5.21, 11.4, 496_000_000, 9_900_000_000, 587_900_000],
  [
    'matic',
    'Polygon',
    'MATIC',
    0.8142,
    0.08,
    -0.74,
    -6.12,
    342_000_000,
    8_100_000_000,
    9_950_000_000,
  ],
  ['ltc', 'Litecoin', 'LTC', 88.46, 0.19, 1.62, 2.9, 418_000_000, 6_600_000_000, 74_600_000],
  ['atom', 'Cosmos', 'ATOM', 9.68, -0.41, -3.18, -8.44, 186_000_000, 3_800_000_000, 392_600_000],
  ['near', 'NEAR', 'NEAR', 5.42, 0.74, 6.92, 18.6, 224_000_000, 5_900_000_000, 1_088_000_000],
  ['fil', 'Filecoin', 'FIL', 5.18, -0.26, -1.12, -3.74, 142_000_000, 2_900_000_000, 560_000_000],
  ['arb', 'Arbitrum', 'ARB', 1.084, 0.33, 2.88, 5.64, 298_000_000, 3_400_000_000, 3_140_000_000],
  ['op', 'Optimism', 'OP', 2.316, 0.17, 1.94, 4.08, 164_000_000, 2_600_000_000, 1_120_000_000],
  ['inj', 'Injective', 'INJ', 24.18, 1.12, 9.64, 22.4, 212_000_000, 2_300_000_000, 95_100_000],
];

export const COINS: Coin[] = MARKET_ROWS.map(
  ([id, name, symbol, price, change1h, c24, c7, volume, marketCap, supply], i) => ({
    id,
    rank: i + 1,
    name,
    symbol,
    price,
    change1h,
    change24h: c24,
    change7d: c7,
    volume,
    marketCap,
    supply,
    held: HOLDINGS.some((h) => h.id === id),
  }),
);

/** The whole market's headline figures, summed from the rows on screen. */
export const marketTotals = () => ({
  cap: COINS.reduce((t, c) => t + c.marketCap, 0),
  volume: COINS.reduce((t, c) => t + c.volume, 0),
  dominance:
    ((COINS.find((c) => c.id === 'btc')?.marketCap ?? 0) /
      COINS.reduce((t, c) => t + c.marketCap, 0)) *
    100,
});

/**
 * Seven days of price, for the sparkline column.
 *
 * The jitter is a fraction of the coin's **own** move, not a fixed fraction
 * of its price: with a flat 0.004 term a stablecoin that moved 0.02% in a
 * week drew a violent zigzag — a chart contradicting the number printed
 * beside it.
 */
export function spark(id: string): number[] {
  const coin = COINS.find((c) => c.id === id) ?? COINS[0];
  const next = rng(id.length * 977 + Math.round(coin.price));
  const drift = coin.change7d / 100;
  const jitter = Math.abs(drift) * 0.45;
  return Array.from({ length: 24 }, (_, i) => {
    const t = i / 23;
    return coin.price * (1 - drift + drift * t + (next() - 0.5) * jitter);
  });
}

/* ---------------------------------------------------------------- activity */

export type TxKind = 'buy' | 'sell' | 'receive' | 'send' | 'swap' | 'reward';

export interface Tx {
  id: string;
  kind: TxKind;
  assetId: string;
  quantity: number;
  /** Price per unit at the time, in USD. */
  priceAt: number;
  fee: number;
  account: string;
  status: 'confirmed' | 'pending' | 'failed';
  at: string;
  hash: string;
}

export const TX_LABEL: Record<TxKind, string> = {
  buy: 'Buy',
  sell: 'Sell',
  receive: 'Receive',
  send: 'Send',
  swap: 'Swap',
  reward: 'Reward',
};

export const ACCOUNTS = ['Exchange', 'Cold wallet', 'Hot wallet'];

export const TXS: Tx[] = [
  {
    id: 't01',
    kind: 'buy',
    assetId: 'btc',
    quantity: 0.0624,
    priceAt: 61_480,
    fee: 12.4,
    account: 'Exchange',
    status: 'confirmed',
    at: '2027-01-11 14:12',
    hash: '0x9f2a…41c7',
  },
  {
    id: 't02',
    kind: 'reward',
    assetId: 'sol',
    quantity: 1.84,
    priceAt: 139.2,
    fee: 0,
    account: 'Hot wallet',
    status: 'confirmed',
    at: '2027-01-11 06:00',
    hash: '0x3b71…9ae2',
  },
  {
    id: 't03',
    kind: 'sell',
    assetId: 'ada',
    quantity: 1_200,
    priceAt: 0.9412,
    fee: 4.1,
    account: 'Exchange',
    status: 'confirmed',
    at: '2027-01-10 19:45',
    hash: '0x77c0…2d14',
  },
  {
    id: 't04',
    kind: 'swap',
    assetId: 'eth',
    quantity: 0.84,
    priceAt: 3_844,
    fee: 8.2,
    account: 'Hot wallet',
    status: 'confirmed',
    at: '2027-01-10 11:28',
    hash: '0x1ed9…b833',
  },
  {
    id: 't05',
    kind: 'send',
    assetId: 'btc',
    quantity: 0.018,
    priceAt: 62_010,
    fee: 3.6,
    account: 'Cold wallet',
    status: 'pending',
    at: '2027-01-09 22:05',
    hash: '0x6a44…77f1',
  },
  {
    id: 't06',
    kind: 'buy',
    assetId: 'eth',
    quantity: 1.2,
    priceAt: 3_612,
    fee: 9.8,
    account: 'Exchange',
    status: 'confirmed',
    at: '2027-01-09 09:31',
    hash: '0xcb20…5e6d',
  },
  {
    id: 't07',
    kind: 'receive',
    assetId: 'usdc',
    quantity: 1_500,
    priceAt: 1,
    fee: 0,
    account: 'Exchange',
    status: 'confirmed',
    at: '2027-01-08 16:50',
    hash: '0x4d8f…1a09',
  },
  {
    id: 't08',
    kind: 'buy',
    assetId: 'sol',
    quantity: 18.4,
    priceAt: 128.7,
    fee: 6.4,
    account: 'Exchange',
    status: 'confirmed',
    at: '2027-01-08 10:02',
    hash: '0x92b6…c447',
  },
  {
    id: 't09',
    kind: 'reward',
    assetId: 'ada',
    quantity: 86.2,
    priceAt: 0.8844,
    fee: 0,
    account: 'Hot wallet',
    status: 'confirmed',
    at: '2027-01-07 06:00',
    hash: '0x08e3…bb52',
  },
  {
    id: 't10',
    kind: 'sell',
    assetId: 'bnb',
    quantity: 2.4,
    priceAt: 578.4,
    fee: 5.2,
    account: 'Exchange',
    status: 'confirmed',
    at: '2027-01-06 21:14',
    hash: '0xa14c…3f90',
  },
  {
    id: 't11',
    kind: 'buy',
    assetId: 'ada',
    quantity: 2_400,
    priceAt: 0.7128,
    fee: 7.1,
    account: 'Exchange',
    status: 'confirmed',
    at: '2027-01-05 12:40',
    hash: '0x5fd1…8c26',
  },
  {
    id: 't12',
    kind: 'swap',
    assetId: 'usdc',
    quantity: 820,
    priceAt: 1,
    fee: 2.4,
    account: 'Hot wallet',
    status: 'confirmed',
    at: '2027-01-04 18:22',
    hash: '0xe730…d4a8',
  },
  {
    id: 't13',
    kind: 'buy',
    assetId: 'btc',
    quantity: 0.0412,
    priceAt: 58_240,
    fee: 10.6,
    account: 'Exchange',
    status: 'confirmed',
    at: '2027-01-03 15:07',
    hash: '0x2c98…60b3',
  },
  {
    id: 't14',
    kind: 'receive',
    assetId: 'eth',
    quantity: 0.46,
    priceAt: 3_488,
    fee: 0,
    account: 'Cold wallet',
    status: 'confirmed',
    at: '2027-01-02 08:55',
    hash: '0xbf42…7719',
  },
  {
    id: 't15',
    kind: 'reward',
    assetId: 'sol',
    quantity: 1.76,
    priceAt: 124.1,
    fee: 0,
    account: 'Hot wallet',
    status: 'confirmed',
    at: '2027-01-01 06:00',
    hash: '0x6719…ea0c',
  },
  {
    id: 't16',
    kind: 'sell',
    assetId: 'eth',
    quantity: 0.62,
    priceAt: 3_402,
    fee: 6.8,
    account: 'Exchange',
    status: 'confirmed',
    at: '2026-12-30 20:18',
    hash: '0x9d05…4b67',
  },
  {
    id: 't17',
    kind: 'buy',
    assetId: 'bnb',
    quantity: 4.8,
    priceAt: 512.3,
    fee: 8.4,
    account: 'Exchange',
    status: 'confirmed',
    at: '2026-12-29 11:46',
    hash: '0x3a8e…22d5',
  },
  {
    id: 't18',
    kind: 'send',
    assetId: 'usdc',
    quantity: 640,
    priceAt: 1,
    fee: 1.2,
    account: 'Hot wallet',
    status: 'failed',
    at: '2026-12-28 17:33',
    hash: '0x7b16…f381',
  },
  {
    id: 't19',
    kind: 'buy',
    assetId: 'sol',
    quantity: 22.6,
    priceAt: 108.4,
    fee: 5.9,
    account: 'Exchange',
    status: 'confirmed',
    at: '2026-12-27 13:21',
    hash: '0xd248…90ab',
  },
  {
    id: 't20',
    kind: 'reward',
    assetId: 'ada',
    quantity: 84.4,
    priceAt: 0.7642,
    fee: 0,
    account: 'Hot wallet',
    status: 'confirmed',
    at: '2026-12-26 06:00',
    hash: '0x1c67…55e8',
  },
  {
    id: 't21',
    kind: 'buy',
    assetId: 'eth',
    quantity: 1.64,
    priceAt: 3_188,
    fee: 11.2,
    account: 'Exchange',
    status: 'confirmed',
    at: '2026-12-24 09:12',
    hash: '0x84fa…31c0',
  },
  {
    id: 't22',
    kind: 'receive',
    assetId: 'btc',
    quantity: 0.0244,
    priceAt: 55_900,
    fee: 0,
    account: 'Cold wallet',
    status: 'confirmed',
    at: '2026-12-22 15:40',
    hash: '0x50db…7e23',
  },
  {
    id: 't23',
    kind: 'buy',
    assetId: 'usdc',
    quantity: 3_200,
    priceAt: 1,
    fee: 0,
    account: 'Exchange',
    status: 'confirmed',
    at: '2026-12-21 10:04',
    hash: '0xaa31…1d76',
  },
  {
    id: 't24',
    kind: 'swap',
    assetId: 'bnb',
    quantity: 3.2,
    priceAt: 486.7,
    fee: 4.6,
    account: 'Hot wallet',
    status: 'confirmed',
    at: '2026-12-20 19:58',
    hash: '0x6e29…c812',
  },
];

export const txValue = (t: Tx) => t.quantity * t.priceAt;

/** Fees paid, and what the sells realised against their average cost. */
export const feesPaid = () => TXS.reduce((t, x) => t + x.fee, 0);

export const realised = () =>
  TXS.filter((t) => t.kind === 'sell' && t.status === 'confirmed').reduce(
    (t, x) => t + (x.priceAt - holdingOf(x.assetId).avgBuy) * x.quantity,
    0,
  );

/** The cost-basis method, printed beside the realised figure — the number is
    meaningless without it. */
export const COST_METHOD = 'FIFO';

/* ------------------------------------------------------------ buy cohorts */

export const COHORT_MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * What each month's purchases are worth, month by month, as a percent of what
 * they cost. 100% is the month of purchase, so the first column is always 100
 * and the grid fills in below the diagonal.
 *
 * The reference calls this "Bitcoin retention", which is a product-analytics
 * cohort grid wearing a crypto label — retention measures users coming back,
 * and a coin cannot come back. Same picture, a name that means something.
 */
export function cohorts(): (number | null)[][] {
  const next = rng(6421);
  return COHORT_MONTHS.map((_, row) =>
    COHORT_MONTHS.map((_, col) => {
      if (col < row) return null;
      if (col === row) return 100;
      const months = col - row;
      /* A rising market, so cohorts gain with age — with enough spread that
         two cohorts of the same age are not the same number. */
      return Math.round(100 + months * (6 + next() * 9) - (1 - next()) * 6);
    }),
  );
}
