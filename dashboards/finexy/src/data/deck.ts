/**
 * The content deck: every balance, wallet, card, figure and activity row.
 *
 * All invented (rule 5). Finexy is not a bank, no card number here is a card
 * number, and nobody has been charged for anything on this screen.
 */
import type { Country, IconName } from '@/components/Icon';
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';

export const account = {
  brand: 'Finexy',
  user: {
    name: 'Sajibur Rahman',
    first: 'Sajibur',
    email: 'sajibur.rahman@gmail.com',
    face: face1,
  },
  greeting: 'Good morning',
  strapline: 'Stay on top of your tasks, monitor progress, and track status.',
};

/* ---------- balance and wallets -------------------------------------------- */

export interface Wallet {
  id: string;
  code: 'USD' | 'EUR' | 'GBP';
  country: Country;
  symbol: string;
  balance: number;
  limit: number;
  limitLabel: string;
  active: boolean;
}

export const WALLETS: Wallet[] = [
  {
    id: 'usd',
    code: 'USD',
    country: 'us',
    symbol: '$',
    balance: 22_678,
    limit: 10_000,
    limitLabel: '$10k a month',
    active: true,
  },
  {
    id: 'eur',
    code: 'EUR',
    country: 'eu',
    symbol: '€',
    balance: 18_345,
    limit: 8000,
    limitLabel: '€8k a month',
    active: true,
  },
  {
    id: 'gbp',
    code: 'GBP',
    country: 'gb',
    symbol: '£',
    balance: 15_000,
    limit: 75_000,
    limitLabel: '£75k a month',
    active: false,
  },
];

export const BALANCE = {
  total: 689_372,
  delta: 5,
  wallets: 6,
};

/* ---------- the four figures ------------------------------------------------ */

export interface Figure {
  id: string;
  label: string;
  value: number;
  delta: number;
  icon: IconName;
  /** The reference fills one of the four in the brand orange. */
  lead?: boolean;
}

export const FIGURES: Figure[] = [
  { id: 'earnings', label: 'Total Earnings', value: 950, delta: 7, icon: 'wallet', lead: true },
  { id: 'spending', label: 'Total Spending', value: 700, delta: -5, icon: 'card' },
  { id: 'income', label: 'Total Income', value: 1050, delta: 8, icon: 'layers' },
  { id: 'revenue', label: 'Total Revenue', value: 850, delta: 4, icon: 'trend-up' },
];

/* ---------- profit and loss -------------------------------------------------- */

export interface Month {
  label: string;
  profit: number;
  loss: number;
}

export const PERIODS = [
  { id: 'months', label: 'Monthly' },
  { id: 'quarters', label: 'Quarterly' },
] as const;

export type PeriodId = (typeof PERIODS)[number]['id'];

export const PROFIT_LOSS: Record<PeriodId, Month[]> = {
  months: [
    { label: 'Jan', profit: 31_000, loss: 18_500 },
    { label: 'Feb', profit: 26_400, loss: 22_000 },
    { label: 'Mar', profit: 35_800, loss: 19_200 },
    { label: 'Apr', profit: 29_100, loss: 25_600 },
    { label: 'May', profit: 41_200, loss: 17_400 },
    { label: 'Jun', profit: 38_500, loss: 28_900 },
    { label: 'Jul', profit: 33_700, loss: 21_300 },
    { label: 'Aug', profit: 45_100, loss: 24_800 },
  ],
  quarters: [
    { label: 'Q1', profit: 93_200, loss: 59_700 },
    { label: 'Q2', profit: 108_800, loss: 71_900 },
    { label: 'Q3', profit: 124_300, loss: 68_400 },
    { label: 'Q4', profit: 97_600, loss: 83_100 },
  ],
};

/* ---------- the spending limit ------------------------------------------------ */

export const LIMIT = { spent: 1400, of: 5500 };

/* ---------- cards -------------------------------------------------------------- */

export interface PayCard {
  id: string;
  label: string;
  last4: string;
  expires: string;
  cvv: string;
  tone: 'ink' | 'accent';
  active: boolean;
}

export const CARDS: PayCard[] = [
  {
    id: 'c1',
    label: 'Everyday',
    last4: '6782',
    expires: '09/29',
    cvv: '611',
    tone: 'ink',
    active: true,
  },
  {
    id: 'c2',
    label: 'Business',
    last4: '4356',
    expires: '04/28',
    cvv: '204',
    tone: 'accent',
    active: true,
  },
];

/* ---------- activities ---------------------------------------------------------- */

export type ActivityState = 'Completed' | 'Pending' | 'In Progress' | 'Failed';

export interface Activity {
  id: string;
  name: string;
  kind: IconName;
  tint: string;
  price: number;
  state: ActivityState;
  date: string;
  time: string;
}

const KINDS: [string, IconName, string][] = [
  ['Mobile App Purchase', 'mobile', '#2f6fd0'],
  ['Hotel Booking', 'hotel', '#1a7f4b'],
  ['Flight Ticket Booking', 'flight', '#6b4ad6'],
  ['Grocery Purchase', 'grocery', '#d98324'],
  ['Software License', 'software', '#c63a30'],
];

const STATES: ActivityState[] = ['Completed', 'Pending', 'In Progress', 'Completed', 'Failed'];

/**
 * Eighteen rows, seeded, so the table is the same on every reload and has
 * enough in it to scroll and paginate.
 */
export const ACTIVITIES: Activity[] = (() => {
  const next = rng(52_117);
  return Array.from({ length: 18 }, (_, i) => {
    const [name, kind, tint] = KINDS[i % KINDS.length];
    const day = 17 - Math.floor(i / 2);
    return {
      id: 'INV_0000' + (76 - i),
      name,
      kind,
      tint,
      price: Math.round((9000 + next() * 46_000) / 50) * 50,
      state: STATES[(i + Math.floor(next() * 2)) % STATES.length],
      date: String(day).padStart(2, '0') + ' Apr, 2026',
      time:
        1 +
        Math.floor(next() * 11) +
        ':' +
        String(Math.floor(next() * 59)).padStart(2, '0') +
        ' PM',
    };
  });
})();
