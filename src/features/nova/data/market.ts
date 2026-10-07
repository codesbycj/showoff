import type { CoinKey } from '../theme';

/** Everything the home dashboard says. */
export const HOME = {
  eyebrow: 'Welcome back',
  name: 'Alex Rivera',

  scope: 'Main Net Worth',
  balanceLabel: 'Total Balance',
  amount: '$74,820',
  cents: '.40',
  delta: '+5.42%',
  deltaAmount: '(+$3,840.10)',
  deltaNote: 'Last 24 hours',
  initials: 'AR',

  actions: { deposit: 'Deposit', trade: 'Trade', earn: 'Earn 8%' },

  promo: {
    eyebrow: 'Zero Fees Month',
    title: 'Smart Way to',
    titleAccent: 'Auto-Invest',
    body: 'Recurring buys starting from $5',
  },

  marketTitle: 'Market Highlights',
  marketAction: 'See all',
} as const;

export const MARKET_FILTERS = ['Hot', 'Gainers', 'DeFi', 'Layer 1'] as const;

export type Coin = {
  key: CoinKey;
  name: string;
  price: string;
  delta: string;
  up: boolean;
  /**
   * The sparkline, as 0–1 pairs. Normalised rather than pixel coordinates so
   * the component owns the box and the data owns only the shape.
   */
  spark: readonly (readonly [number, number])[];
};

export const COINS: Coin[] = [
  // STEP 2.12 the big one
  // {
  //   key: 'BTC',
  //   name: 'Bitcoin',
  //   price: '$64,230.15',
  //   delta: '+2.40%',
  //   up: true,
  //   spark: [
  //     [0, 0.3],
  //     [0.23, 0.55],
  //     [0.46, 0.4],
  //     [0.68, 0.95],
  //     [1, 1],
  //   ],
  // },
  // STEP 2.13 and the other big one
  // {
  //   key: 'ETH',
  //   name: 'Ethereum',
  //   price: '$3,450.80',
  //   delta: '+4.81%',
  //   up: true,
  //   spark: [
  //     [0, 0.22],
  //     [0.21, 0.66],
  //     [0.42, 0.52],
  //     [0.7, 0.92],
  //     [1, 1],
  //   ],
  // },
  // STEP 2.14 a fast one
  // {
  //   key: 'SOL',
  //   name: 'Solana',
  //   price: '$152.40',
  //   delta: '+9.12%',
  //   up: true,
  //   spark: [
  //     [0, 0.16],
  //     [0.29, 0.38],
  //     [0.5, 0.78],
  //     [0.75, 0.62],
  //     [1, 1],
  //   ],
  // },
  // STEP 2.15 one that is down
  // {
  //   key: 'UNI',
  //   name: 'Uniswap',
  //   price: '$10.84',
  //   delta: '-1.20%',
  //   up: false,
  //   spark: [
  //     [0, 0.86],
  //     [0.26, 0.62],
  //     [0.52, 0.74],
  //     [0.76, 0.34],
  //     [1, 0.2],
  //   ],
  // },
];
