/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout. The reference's transaction rows carry three real
 * software marks over made-up prices in a made-up account (rule 8).
 *
 * Its own arithmetic does not hold either: Account Balance reads $35,340.89
 * over four wallets totalling about $178,700 once the BDT line is converted,
 * and the Overview chart's tooltip reads $84,849.93 against an axis that tops
 * out at $40k. Both are derived here.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  holder: 'Sajibur Rahman',
  date: 'Sun, 12 June 2026',
  delta: 3.2,
};

/* ---------------------------------------------------------------- wallets */

export type FlagId = 'usd' | 'eur' | 'bdt' | 'gbp';

export interface WalletAccount {
  id: FlagId;
  code: string;
  label: string;
  symbol: string;
  /** Units of this currency per USD. Invented, but plausible and fixed. */
  rate: number;
  /** Held, in this currency's own units. */
  held: number;
  active: boolean;
}

export const WALLETS: WalletAccount[] = [
  { id: 'usd', code: 'USD', label: 'US Dollar', symbol: '$', rate: 1, held: 22678.0, active: true },
  { id: 'eur', code: 'EUR', label: 'Euro', symbol: '€', rate: 0.92, held: 8345.0, active: true },
  {
    id: 'bdt',
    code: 'BDT',
    label: 'Bangladeshi Taka',
    symbol: '৳',
    rate: 118.5,
    held: 122678.0,
    active: true,
  },
  {
    id: 'gbp',
    code: 'GBP',
    label: 'Pound Sterling',
    symbol: '£',
    rate: 0.79,
    held: 2000.0,
    active: false,
  },
];

/** Every wallet, converted and summed. The headline is this, never a literal. */
export const accountBalance = () =>
  Math.round(WALLETS.reduce((t, w) => t + w.held / w.rate, 0) * 100) / 100;

/* ------------------------------------------------------------------ stats */

export const EXPENSES = { amount: 9845.2, delta: -2.1 };
export const SAVINGS = { amount: 18420.75, delta: 4.5 };

/* --------------------------------------------------------------- overview */

export interface MonthEarning {
  id: string;
  label: string;
  value: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/*
 * A written-down shape with a seeded roughening on top. `base + random`
 * clusters every column between 60% and 100% of the tallest, which renders as
 * twelve near-identical bars — a picture of a chart rather than one.
 */
const SHAPE = [0.5, 0.62, 0.44, 0.78, 0.56, 0.36, 0.68, 1.0, 0.52, 0.74, 0.46, 0.82];

export interface Span {
  id: string;
  label: string;
  scale: number;
}

export const SPANS: Span[] = [
  { id: 'year', label: 'This Year', scale: 1 },
  { id: 'last', label: 'Last Year', scale: 0.84 },
  { id: 'two', label: '2024', scale: 0.71 },
];

export function earnings(spanId: string): MonthEarning[] {
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[0];
  const next = rng(spanId.length * 1109 + Math.round(span.scale * 100));
  return MONTHS.map((label, i) => ({
    id: label.toLowerCase(),
    label,
    value: Math.round((9000 + SHAPE[i] * 29000 + next() * 2400) * span.scale * 100) / 100,
  }));
}

export const peakOf = (ms: MonthEarning[]) =>
  ms.reduce((best, m) => (m.value > best.value ? m : best), ms[0]);

/* ----------------------------------------------------------- saving plans */

export interface Plan {
  id: string;
  label: string;
  saved: number;
  target: number;
  icon: 'target' | 'shield' | 'house' | 'plane';
}

export const PLANS: Plan[] = [
  { id: 'investment', label: 'Investment Goal', saved: 15600, target: 25000, icon: 'target' },
  { id: 'emergency', label: 'Emergency Fund', saved: 8240, target: 12000, icon: 'shield' },
  { id: 'house', label: 'House Deposit', saved: 31500, target: 90000, icon: 'house' },
  { id: 'travel', label: 'Travel Fund', saved: 4180, target: 9000, icon: 'plane' },
];

/* ------------------------------------------------------------ transactions */

export type MarkId = 'quill' | 'palette' | 'basket' | 'cloud' | 'bolt' | 'ticket';
export type Status = 'Success' | 'Pending' | 'Failed';

export interface Txn {
  id: string;
  activity: string;
  category: string;
  date: string;
  stamp: number;
  price: number;
  status: Status;
  mark: MarkId;
}

export const TXNS: Txn[] = [
  {
    id: 'x1',
    activity: 'Mobile App Purchase',
    category: 'Software',
    date: 'Wed, 12 Jun 2026',
    stamp: 20260612,
    price: 806.5,
    status: 'Success',
    mark: 'quill',
  },
  {
    id: 'x2',
    activity: 'Software License',
    category: 'Software',
    date: 'Tue, 11 Jun 2026',
    stamp: 20260611,
    price: 102.99,
    status: 'Success',
    mark: 'palette',
  },
  {
    id: 'x3',
    activity: 'Grocery Purchase',
    category: 'Living',
    date: 'Sun, 09 Jun 2026',
    stamp: 20260609,
    price: 2500.0,
    status: 'Success',
    mark: 'basket',
  },
  {
    id: 'x4',
    activity: 'Cloud Storage',
    category: 'Software',
    date: 'Sat, 08 Jun 2026',
    stamp: 20260608,
    price: 48.0,
    status: 'Pending',
    mark: 'cloud',
  },
  {
    id: 'x5',
    activity: 'Energy Bill',
    category: 'Living',
    date: 'Fri, 07 Jun 2026',
    stamp: 20260607,
    price: 184.35,
    status: 'Success',
    mark: 'bolt',
  },
  {
    id: 'x6',
    activity: 'Concert Tickets',
    category: 'Leisure',
    date: 'Thu, 06 Jun 2026',
    stamp: 20260606,
    price: 240.0,
    status: 'Failed',
    mark: 'ticket',
  },
  {
    id: 'x7',
    activity: 'Design Tooling',
    category: 'Software',
    date: 'Wed, 05 Jun 2026',
    stamp: 20260605,
    price: 64.0,
    status: 'Success',
    mark: 'palette',
  },
  {
    id: 'x8',
    activity: 'Weekly Shop',
    category: 'Living',
    date: 'Tue, 04 Jun 2026',
    stamp: 20260604,
    price: 312.8,
    status: 'Success',
    mark: 'basket',
  },
  {
    id: 'x9',
    activity: 'Backup Plan',
    category: 'Software',
    date: 'Mon, 03 Jun 2026',
    stamp: 20260603,
    price: 29.0,
    status: 'Success',
    mark: 'cloud',
  },
  {
    id: 'x10',
    activity: 'Festival Pass',
    category: 'Leisure',
    date: 'Sun, 02 Jun 2026',
    stamp: 20260602,
    price: 420.0,
    status: 'Pending',
    mark: 'ticket',
  },
  {
    id: 'x11',
    activity: 'Writing App',
    category: 'Software',
    date: 'Sat, 01 Jun 2026',
    stamp: 20260601,
    price: 18.5,
    status: 'Success',
    mark: 'quill',
  },
  {
    id: 'x12',
    activity: 'Water Bill',
    category: 'Living',
    date: 'Fri, 31 May 2026',
    stamp: 20260531,
    price: 76.2,
    status: 'Success',
    mark: 'bolt',
  },
  {
    id: 'x13',
    activity: 'Mobile App Purchase',
    category: 'Software',
    date: 'Thu, 30 May 2026',
    stamp: 20260530,
    price: 806.5,
    status: 'Failed',
    mark: 'quill',
  },
  {
    id: 'x14',
    activity: 'Grocery Purchase',
    category: 'Living',
    date: 'Wed, 29 May 2026',
    stamp: 20260529,
    price: 268.4,
    status: 'Success',
    mark: 'basket',
  },
  {
    id: 'x15',
    activity: 'Cinema Night',
    category: 'Leisure',
    date: 'Tue, 28 May 2026',
    stamp: 20260528,
    price: 54.0,
    status: 'Success',
    mark: 'ticket',
  },
  {
    id: 'x16',
    activity: 'Design Tooling',
    category: 'Software',
    date: 'Mon, 27 May 2026',
    stamp: 20260527,
    price: 64.0,
    status: 'Success',
    mark: 'palette',
  },
];

export const CATEGORIES = ['Software', 'Living', 'Leisure'] as const;

/* -------------------------------------------------------------- recurring */

export interface Recurring {
  id: string;
  label: string;
  cadence: 'Monthly' | 'Weekly' | 'Yearly';
  amount: number;
  next: string;
  mark: MarkId;
  on: boolean;
}

export const RECURRING: Recurring[] = [
  {
    id: 'r1',
    label: 'Design Tooling',
    cadence: 'Monthly',
    amount: 64,
    next: '27 Jun',
    mark: 'palette',
    on: true,
  },
  {
    id: 'r2',
    label: 'Cloud Storage',
    cadence: 'Monthly',
    amount: 48,
    next: '08 Jul',
    mark: 'cloud',
    on: true,
  },
  {
    id: 'r3',
    label: 'Writing App',
    cadence: 'Yearly',
    amount: 180,
    next: '01 Jun 2027',
    mark: 'quill',
    on: true,
  },
  {
    id: 'r4',
    label: 'Energy',
    cadence: 'Monthly',
    amount: 184.35,
    next: '07 Jul',
    mark: 'bolt',
    on: true,
  },
  {
    id: 'r5',
    label: 'Weekly Shop',
    cadence: 'Weekly',
    amount: 312.8,
    next: '11 Jun',
    mark: 'basket',
    on: true,
  },
  {
    id: 'r6',
    label: 'Festival Pass',
    cadence: 'Yearly',
    amount: 420,
    next: '02 Jun 2027',
    mark: 'ticket',
    on: false,
  },
  {
    id: 'r7',
    label: 'Backup Plan',
    cadence: 'Monthly',
    amount: 29,
    next: '03 Jul',
    mark: 'cloud',
    on: true,
  },
  {
    id: 'r8',
    label: 'Water',
    cadence: 'Monthly',
    amount: 76.2,
    next: '31 Jun',
    mark: 'bolt',
    on: true,
  },
  {
    id: 'r9',
    label: 'Mobile App',
    cadence: 'Monthly',
    amount: 12.99,
    next: '12 Jul',
    mark: 'quill',
    on: false,
  },
  {
    id: 'r10',
    label: 'Cinema Club',
    cadence: 'Monthly',
    amount: 22,
    next: '28 Jun',
    mark: 'ticket',
    on: true,
  },
  {
    id: 'r11',
    label: 'Grocery Plus',
    cadence: 'Monthly',
    amount: 14.5,
    next: '09 Jul',
    mark: 'basket',
    on: true,
  },
  {
    id: 'r12',
    label: 'Asset Library',
    cadence: 'Yearly',
    amount: 240,
    next: '05 Jun 2027',
    mark: 'palette',
    on: false,
  },
];

/** What the active rules cost in a month. Weekly counts four times, yearly once over twelve. */
export const monthlyCost = (on: Record<string, boolean>) =>
  Math.round(
    RECURRING.filter((r) => on[r.id]).reduce(
      (s, r) =>
        s +
        (r.cadence === 'Weekly' ? r.amount * 4 : r.cadence === 'Yearly' ? r.amount / 12 : r.amount),
      0,
    ) * 100,
  ) / 100;

/** Twelve months of spend on a category, seeded. */
export function categoryTrail(category: string): number[] {
  const next = rng(category.length * 877 + category.charCodeAt(0));
  const base = TXNS.filter((t) => t.category === category).reduce((s, t) => s + t.price, 0) / 6;
  return Array.from({ length: 12 }, () => Math.round(base * (0.45 + next() * 1.4) * 100) / 100);
}
