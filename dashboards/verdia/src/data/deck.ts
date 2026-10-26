/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Every name, figure and date is invented. The reference's merchant rows carry
 * Meta, Apple and Google marks over made-up amounts, which is exactly what this
 * series must not ship (rule 8) — so the counterparties here are invented
 * companies with drawn marks.
 *
 * Two of the reference's own numbers do not add up, and both are corrected
 * here rather than reproduced:
 *
 *  - Spending reads $916.10 over four categories that total $917.02.
 *  - Earning reads $7,110.12 over four sources that total $7,821.01 — and the
 *    "51%" pill on the salary bar is 4,000/7,821.01, so it is the *headline*
 *    that is wrong, not the parts. Keeping the parts keeps the 51% true.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  holder: 'Marisol Avendaño',
  greeting: 'Marisol',
  number: '48210663907',
  balance: 92142.1,
  opened: 'March 2021',
};

/* ---------------------------------------------------------------- currency */

export type CurrencyId = 'usd' | 'idr' | 'myr';

export interface Currency {
  id: CurrencyId;
  label: string;
  symbol: string;
  /** Units of this currency per USD. Invented, but plausible and fixed. */
  rate: number;
  /** IDR has no useful minor unit at these magnitudes. */
  cents: boolean;
}

export const CURRENCIES: Currency[] = [
  { id: 'usd', label: 'USD', symbol: '$', rate: 1, cents: true },
  { id: 'idr', label: 'IDR', symbol: 'Rp', rate: 16250, cents: false },
  { id: 'myr', label: 'MYR', symbol: 'RM', rate: 4.42, cents: true },
];

/* ----------------------------------------------------------------- rewards */

export const REWARDS = {
  total: 12172.07,
  delta: 40,
  points: 4780,
  vouchers: 124,
  tier: 'Priority',
  nextTier: 'Signature',
  toNextTier: 1220,
};

/* ---------------------------------------------------------------- spending */

export interface Category {
  id: string;
  label: string;
  /** The token name, so the donut and the legend cannot drift apart. */
  token: string;
}

export const CATEGORIES: Category[] = [
  { id: 'rent', label: 'Rent', token: '--color-cat-rent' },
  { id: 'transport', label: 'Transport', token: '--color-cat-transport' },
  { id: 'food', label: 'Food', token: '--color-cat-food' },
  { id: 'entertainment', label: 'Entertainment', token: '--color-cat-entertainment' },
];

export interface MonthSpend {
  id: string;
  label: string;
  /** Keyed by category id. The total is always their sum. */
  spend: Record<string, number>;
  /** Which category moved most, and by how much — the callout pill. */
  moverId: string;
  moverPct: number;
}

/*
 * April is the reference's own month and is written out; the other five come
 * from a seeded stream so they differ without being random (rule 5).
 */
const APRIL: Record<string, number> = {
  rent: 452.4,
  transport: 186.25,
  food: 158.3,
  entertainment: 119.15,
};

function syntheticMonth(seed: number): Record<string, number> {
  const next = rng(seed);
  return {
    rent: Math.round((380 + next() * 150) * 100) / 100,
    transport: Math.round((120 + next() * 160) * 100) / 100,
    food: Math.round((95 + next() * 170) * 100) / 100,
    entertainment: Math.round((45 + next() * 155) * 100) / 100,
  };
}

export const MONTHS: MonthSpend[] = [
  {
    id: 'dec',
    label: 'December',
    spend: syntheticMonth(81),
    moverId: 'entertainment',
    moverPct: 22.6,
  },
  { id: 'jan', label: 'January', spend: syntheticMonth(144), moverId: 'food', moverPct: -9.4 },
  {
    id: 'feb',
    label: 'February',
    spend: syntheticMonth(2207),
    moverId: 'transport',
    moverPct: 14.1,
  },
  { id: 'mar', label: 'March', spend: syntheticMonth(3310), moverId: 'food', moverPct: 6.8 },
  { id: 'apr', label: 'April', spend: APRIL, moverId: 'rent', moverPct: 8.4 },
  {
    id: 'may',
    label: 'May',
    spend: syntheticMonth(5512),
    moverId: 'entertainment',
    moverPct: -12.2,
  },
];

export const spendTotal = (m: MonthSpend) =>
  Math.round(CATEGORIES.reduce((t, c) => t + (m.spend[c.id] ?? 0), 0) * 100) / 100;

/** Month-on-month change in the total, which is what the +12% pill shows. */
export function spendDelta(index: number): number {
  if (index === 0) return 0;
  const now = spendTotal(MONTHS[index]);
  const was = spendTotal(MONTHS[index - 1]);
  return Math.round(((now - was) / was) * 1000) / 10;
}

/* ----------------------------------------------------------------- earning */

export interface EarningSource {
  id: string;
  label: string;
  amount: number;
}

export interface EarningPeriod {
  id: string;
  label: string;
  goal: number;
  sources: EarningSource[];
  /** Against the period before it. */
  delta: number;
}

export const EARNING: EarningPeriod[] = [
  {
    id: 'month',
    label: 'This month',
    goal: 8400,
    delta: 18,
    sources: [
      { id: 'investment', label: 'Investment', amount: 2000.0 },
      { id: 'salary', label: 'Salary', amount: 4000.0 },
      { id: 'freelance', label: 'Freelance', amount: 1335.01 },
      { id: 'others', label: 'Others', amount: 486.0 },
    ],
  },
  {
    id: 'quarter',
    label: 'This quarter',
    goal: 25200,
    delta: 11,
    sources: [
      { id: 'investment', label: 'Investment', amount: 5840.5 },
      { id: 'salary', label: 'Salary', amount: 12000.0 },
      { id: 'freelance', label: 'Freelance', amount: 4190.4 },
      { id: 'others', label: 'Others', amount: 1388.2 },
    ],
  },
  {
    id: 'year',
    label: 'This year',
    goal: 96000,
    delta: 26,
    sources: [
      { id: 'investment', label: 'Investment', amount: 21400.0 },
      { id: 'salary', label: 'Salary', amount: 48000.0 },
      { id: 'freelance', label: 'Freelance', amount: 15820.6 },
      { id: 'others', label: 'Others', amount: 5240.3 },
    ],
  },
];

export const earningTotal = (p: EarningPeriod) =>
  Math.round(p.sources.reduce((t, s) => t + s.amount, 0) * 100) / 100;

/* ------------------------------------------------------------ transactions */

/** The drawn counterparty marks. Invented companies, invented glyphs. */
export type MarkId = 'northform' | 'kestra' | 'payline' | 'avistra' | 'lumio' | 'tenter';

export interface Txn {
  id: string;
  title: string;
  note: string;
  when: string;
  amount: number;
  mark: MarkId;
  pending?: boolean;
}

export const TXNS: Txn[] = [
  {
    id: 't-pending',
    title: 'Avistra Subscriptions',
    note: 'Payment confirmation',
    when: 'Awaiting you',
    amount: -300,
    mark: 'avistra',
    pending: true,
  },
  {
    id: 't-salary',
    title: 'Salary Payment',
    note: 'Northform Studio',
    when: 'Today, 09:00 AM',
    amount: 5000,
    mark: 'northform',
  },
  {
    id: 't-laptop',
    title: 'Buy — Kestra Lumen 16',
    note: 'Card ending 4417',
    when: 'Yesterday, 2:30 PM',
    amount: -4000,
    mark: 'kestra',
  },
  {
    id: 't-refund',
    title: 'Refund — Payline',
    note: 'Duplicate charge reversed',
    when: 'Apr 1, 2026',
    amount: 120,
    mark: 'payline',
  },
  {
    id: 't-grocer',
    title: 'Tenter Grocer',
    note: 'Weekly shop',
    when: 'Mar 30, 2026',
    amount: -142.6,
    mark: 'tenter',
  },
  {
    id: 't-dividend',
    title: 'Kelvo Dividend',
    note: 'Q1 distribution',
    when: 'Mar 28, 2026',
    amount: 612.44,
    mark: 'lumio',
  },
  {
    id: 't-transfer',
    title: 'Transfer to Savings',
    note: 'Standing order',
    when: 'Mar 27, 2026',
    amount: -1500,
    mark: 'payline',
  },
  {
    id: 't-invoice',
    title: 'Invoice #2291 settled',
    note: 'Northform Studio',
    when: 'Mar 24, 2026',
    amount: 2350,
    mark: 'northform',
  },
];

/* ------------------------------------------------------------------ wealth */

export interface Holding {
  id: string;
  name: string;
  kind: 'Equity' | 'Bond' | 'Property' | 'Cash' | 'Digital';
  units: number;
  price: number;
  change: number;
}

export const HOLDINGS: Holding[] = [
  { id: 'h1', name: 'Norlight Index', kind: 'Equity', units: 412.5, price: 288.4, change: 1.84 },
  { id: 'h2', name: 'Harrow Global', kind: 'Equity', units: 160.0, price: 404.12, change: -0.62 },
  {
    id: 'h3',
    name: 'Castell Treasury 10y',
    kind: 'Bond',
    units: 300.0,
    price: 98.75,
    change: 0.21,
  },
  { id: 'h4', name: 'Marden Yield Fund', kind: 'Bond', units: 180.0, price: 112.4, change: -0.35 },
  { id: 'h5', name: 'Ferrow REIT', kind: 'Property', units: 95.0, price: 341.9, change: 2.47 },
  { id: 'h6', name: 'Pellam Logistics', kind: 'Property', units: 54.0, price: 210.6, change: 0.92 },
  { id: 'h7', name: 'Reserve Account', kind: 'Cash', units: 1, price: 34120.0, change: 0.04 },
  { id: 'h8', name: 'Pennora Money Market', kind: 'Cash', units: 1, price: 12480.0, change: 0.11 },
  { id: 'h9', name: 'Oryn Protocol', kind: 'Digital', units: 42.0, price: 318.25, change: -3.18 },
  {
    id: 'h10',
    name: 'Sable Mining Trust',
    kind: 'Equity',
    units: 220.0,
    price: 86.3,
    change: 1.12,
  },
  {
    id: 'h11',
    name: 'Vantis Infrastructure',
    kind: 'Equity',
    units: 130.0,
    price: 174.95,
    change: 0.58,
  },
  {
    id: 'h12',
    name: 'Kestrel Short Bond',
    kind: 'Bond',
    units: 240.0,
    price: 101.2,
    change: -0.08,
  },
];

export const holdingValue = (h: Holding) => Math.round(h.units * h.price * 100) / 100;

/**
 * Net worth is the holdings, summed — not a separate figure that happens to
 * look like one. Writing both by hand had the headline at $284,610.55 over a
 * table that totalled $403,318.10, which is the same class of mistake as the
 * reference's own spending card and is just as invisible while building.
 */
export const NET_WORTH = Math.round(HOLDINGS.reduce((t, h) => t + holdingValue(h), 0) * 100) / 100;

export interface Goal {
  id: string;
  label: string;
  saved: number;
  target: number;
  due: string;
}

export const GOALS: Goal[] = [
  { id: 'g1', label: 'Emergency fund', saved: 18400, target: 24000, due: 'Dec 2026' },
  { id: 'g2', label: 'House deposit', saved: 61250, target: 140000, due: 'Aug 2028' },
  { id: 'g3', label: 'Sabbatical', saved: 9100, target: 30000, due: 'Jun 2027' },
];

/** Net worth, one point per month, per range. Seeded so it never reshuffles. */
export interface Range {
  id: string;
  label: string;
  points: number;
  ticks: string[];
}

export const RANGES: Range[] = [
  { id: '1m', label: '1M', points: 30, ticks: ['Apr 1', 'Apr 10', 'Apr 20', 'Apr 30'] },
  { id: '6m', label: '6M', points: 26, ticks: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'] },
  { id: '1y', label: '1Y', points: 48, ticks: ['May', 'Aug', 'Nov', 'Feb', 'Apr'] },
  { id: 'all', label: 'All', points: 60, ticks: ['2021', '2022', '2023', '2024', '2025', '2026'] },
];

export function netWorthSeries(rangeId: string): number[] {
  const range = RANGES.find((r) => r.id === rangeId) ?? RANGES[1];
  const next = rng(range.id.length * 977 + range.points);
  const end = NET_WORTH;
  /* A longer window starts further back, so the curve has somewhere to climb. */
  const drop = { '1m': 0.03, '6m': 0.14, '1y': 0.3, all: 0.72 }[range.id] ?? 0.14;
  const start = end * (1 - drop);
  const out: number[] = [];
  for (let i = 0; i < range.points; i++) {
    const t = i / (range.points - 1);
    const trend = start + (end - start) * t;
    const wobble = (next() - 0.45) * (end - start) * 0.22;
    out.push(Math.round((trend + wobble) * 100) / 100);
  }
  out[out.length - 1] = end;
  return out;
}

/**
 * Allocation is the holdings grouped by class, not a second set of figures.
 * Change a price in the table above and the ring moves with it (rule 6).
 */
const CLASS_TOKENS: Record<Holding['kind'], string> = {
  Equity: '--color-cat-rent',
  Property: '--color-cat-transport',
  Bond: '--color-cat-food',
  Cash: '--color-cat-entertainment',
  Digital: '--color-goal',
};

const CLASS_LABELS: Record<Holding['kind'], string> = {
  Equity: 'Equities',
  Property: 'Property',
  Bond: 'Bonds',
  Cash: 'Cash',
  Digital: 'Digital',
};

export const ALLOCATION = (['Equity', 'Bond', 'Property', 'Cash', 'Digital'] as const)
  .map((kind) => {
    const value = HOLDINGS.filter((h) => h.kind === kind).reduce((t, h) => t + holdingValue(h), 0);
    return {
      id: kind.toLowerCase(),
      label: CLASS_LABELS[kind],
      value,
      share: Math.round((value / NET_WORTH) * 1000) / 10,
      token: CLASS_TOKENS[kind],
    };
  })
  .sort((a, b) => b.value - a.value);

/* ------------------------------------------------------------------- cards */

export interface PaymentCard {
  id: string;
  label: string;
  last4: string;
  expiry: string;
  scheme: string;
  limit: number;
  tone: 'lime' | 'deep' | 'pale';
  frozen: boolean;
}

export const CARDS: PaymentCard[] = [
  {
    id: 'everyday',
    label: 'Everyday',
    last4: '4417',
    expiry: '08/29',
    scheme: 'Pennora Flex',
    limit: 8000,
    tone: 'lime',
    frozen: false,
  },
  {
    id: 'travel',
    label: 'Travel',
    last4: '9025',
    expiry: '11/27',
    scheme: 'Pennora Voyage',
    limit: 2500,
    tone: 'deep',
    frozen: false,
  },
  {
    id: 'savings',
    label: 'Savings',
    last4: '7731',
    expiry: '02/30',
    scheme: 'Pennora Reserve',
    limit: 1000,
    tone: 'pale',
    frozen: true,
  },
];

export interface CardTxn {
  id: string;
  cardId: string;
  title: string;
  category: 'Shopping' | 'Travel' | 'Food' | 'Bills';
  when: string;
  amount: number;
  mark: MarkId;
}

export const CARD_TXNS: CardTxn[] = [
  {
    id: 'c1',
    cardId: 'everyday',
    title: 'Kestra Lumen 16',
    category: 'Shopping',
    when: 'Yesterday',
    amount: -4000,
    mark: 'kestra',
  },
  {
    id: 'c2',
    cardId: 'everyday',
    title: 'Tenter Grocer',
    category: 'Food',
    when: 'Mar 30',
    amount: -142.6,
    mark: 'tenter',
  },
  {
    id: 'c3',
    cardId: 'everyday',
    title: 'Avistra Subscriptions',
    category: 'Bills',
    when: 'Mar 29',
    amount: -300,
    mark: 'avistra',
  },
  {
    id: 'c4',
    cardId: 'everyday',
    title: 'Kelvo Coffee Bar',
    category: 'Food',
    when: 'Mar 28',
    amount: -18.4,
    mark: 'lumio',
  },
  {
    id: 'c5',
    cardId: 'everyday',
    title: 'Payline Top-up',
    category: 'Bills',
    when: 'Mar 26',
    amount: -60,
    mark: 'payline',
  },
  {
    id: 'c6',
    cardId: 'travel',
    title: 'Northform Rail',
    category: 'Travel',
    when: 'Mar 25',
    amount: -214.8,
    mark: 'northform',
  },
  {
    id: 'c7',
    cardId: 'travel',
    title: 'Harrow Hotel, Lisbon',
    category: 'Travel',
    when: 'Mar 22',
    amount: -342.1,
    mark: 'kestra',
  },
  {
    id: 'c8',
    cardId: 'travel',
    title: 'Tenter Airside',
    category: 'Food',
    when: 'Mar 22',
    amount: -55.5,
    mark: 'tenter',
  },
  {
    id: 'c9',
    cardId: 'everyday',
    title: 'Ferrow Hardware',
    category: 'Shopping',
    when: 'Mar 20',
    amount: -89.9,
    mark: 'lumio',
  },
  {
    id: 'c10',
    cardId: 'everyday',
    title: 'Marden Utilities',
    category: 'Bills',
    when: 'Mar 18',
    amount: -128.4,
    mark: 'payline',
  },
  {
    id: 'c11',
    cardId: 'travel',
    title: 'Pellam Car Hire',
    category: 'Travel',
    when: 'Mar 16',
    amount: -176.2,
    mark: 'northform',
  },
  {
    id: 'c12',
    cardId: 'everyday',
    title: 'Castell Books',
    category: 'Shopping',
    when: 'Mar 14',
    amount: -42.75,
    mark: 'kestra',
  },
];

/*
 * More of the ledger. The first pass gave the everyday card eight charges,
 * which fitted its region with 290px of empty card under them — the scroller
 * had nothing to scroll and the pane looked unfinished (rule 2).
 */
CARD_TXNS.push(
  {
    id: 'c13',
    cardId: 'everyday',
    title: 'Harrow Pharmacy',
    category: 'Shopping',
    when: 'Mar 13',
    amount: -27.4,
    mark: 'lumio',
  },
  {
    id: 'c14',
    cardId: 'everyday',
    title: 'Tenter Grocer',
    category: 'Food',
    when: 'Mar 12',
    amount: -96.15,
    mark: 'tenter',
  },
  {
    id: 'c15',
    cardId: 'everyday',
    title: 'Norlight Broadband',
    category: 'Bills',
    when: 'Mar 11',
    amount: -54,
    mark: 'payline',
  },
  {
    id: 'c16',
    cardId: 'everyday',
    title: 'Marden Bakery',
    category: 'Food',
    when: 'Mar 10',
    amount: -12.8,
    mark: 'tenter',
  },
  {
    id: 'c17',
    cardId: 'everyday',
    title: 'Kestra Accessories',
    category: 'Shopping',
    when: 'Mar 8',
    amount: -164.9,
    mark: 'kestra',
  },
  {
    id: 'c18',
    cardId: 'everyday',
    title: 'Pellam Taxi',
    category: 'Travel',
    when: 'Mar 7',
    amount: -31.2,
    mark: 'northform',
  },
  {
    id: 'c19',
    cardId: 'everyday',
    title: 'Avistra Music',
    category: 'Bills',
    when: 'Mar 5',
    amount: -14.99,
    mark: 'avistra',
  },
  {
    id: 'c20',
    cardId: 'everyday',
    title: 'Kelvo Coffee Bar',
    category: 'Food',
    when: 'Mar 4',
    amount: -9.6,
    mark: 'lumio',
  },
  {
    id: 'c21',
    cardId: 'travel',
    title: 'Harrow Lounge Pass',
    category: 'Travel',
    when: 'Mar 12',
    amount: -48,
    mark: 'kestra',
  },
  {
    id: 'c22',
    cardId: 'travel',
    title: 'Ferrow Transfers',
    category: 'Travel',
    when: 'Mar 9',
    amount: -62.5,
    mark: 'northform',
  },
  {
    id: 'c23',
    cardId: 'travel',
    title: 'Tenter Deli, Porto',
    category: 'Food',
    when: 'Mar 8',
    amount: -24.3,
    mark: 'tenter',
  },
);

/** What this card has been spent on, by category — computed, never written. */
export function cardByCategory(cardId: string) {
  const rows = CARD_TXNS.filter((t) => t.cardId === cardId);
  const cats: CardTxn['category'][] = ['Shopping', 'Travel', 'Food', 'Bills'];
  return cats
    .map((c) => ({
      id: c,
      label: c,
      value:
        Math.round(
          rows.filter((t) => t.category === c).reduce((s, t) => s + Math.abs(t.amount), 0) * 100,
        ) / 100,
      count: rows.filter((t) => t.category === c).length,
    }))
    .filter((c) => c.value > 0)
    .sort((a, b) => b.value - a.value);
}

/** Seven days of spend on a card, seeded so it is the same every reload. */
export function cardWeek(cardId: string): number[] {
  const card = CARDS.find((c) => c.id === cardId) ?? CARDS[0];
  const next = rng(cardId.length * 7919 + Math.round(card.limit));
  return Array.from({ length: 7 }, () => Math.round(next() * (card.limit / 9) * 100) / 100);
}

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * What a card has been spent, summed from its own ledger.
 *
 * It was written out by hand first, and the limit card then read $1,842.60
 * over a list of charges that came to $5,193.09 — the third figure in this
 * build that did not match its own parts, which is why every one of them is
 * now derived.
 */
export const cardSpent = (cardId: string) =>
  Math.round(
    CARD_TXNS.filter((t) => t.cardId === cardId).reduce((s, t) => s + Math.abs(t.amount), 0) * 100,
  ) / 100;
