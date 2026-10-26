/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * The figures are the reference's own where it gives them — $562,000 of
 * balance, $78,000 in, $43,000 out, $56,000 saved, the five expense
 * categories, the three saving plans — because this is the one flat export in
 * the batch and those numbers are part of what was dropped. The names,
 * the brand and the counterparties are invented (rule 8).
 *
 * Where the reference's arithmetic does not hold, the parts win and the
 * headline follows them. Its own case: Total Savings reads $56,000 over three
 * plans totalling $15,250, and the Saving Plans card then reads $84,500 for
 * the same three. Both are derived here.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  holder: 'Idris Calloway',
  role: 'Personal · Premium',
  balance: 562000,
  cardExpiry: '11/29',
  cardCvv: '323',
  last4: '4190',
};

/* ------------------------------------------------------------------- stats */

export interface Stat {
  id: string;
  label: string;
  value: number;
  delta: number;
  /** Down is good for expense. */
  goodWhen: 'up' | 'down';
  icon: 'in' | 'out' | 'save';
}

export const STATS: Stat[] = [
  { id: 'income', label: 'Total Income', value: 78000, delta: 17.8, goodWhen: 'up', icon: 'in' },
  {
    id: 'expense',
    label: 'Total Expense',
    value: 43000,
    delta: -17.8,
    goodWhen: 'down',
    icon: 'out',
  },
  {
    id: 'savings',
    label: 'Total Savings',
    value: 56000,
    delta: 12.4,
    goodWhen: 'up',
    icon: 'save',
  },
];

/* --------------------------------------------------------------- cashflow */

export interface MonthFlow {
  id: string;
  label: string;
  income: number;
  expense: number;
}

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/*
 * A written-down shape with a seeded roughening on top. A plain
 * `base + random` clusters every column between 60% and 100% of the tallest,
 * which renders as twelve near-identical bars — a picture of a chart.
 */
const IN_SHAPE = [0.72, 0.55, 0.64, 0.95, 0.5, 0.78, 0.6, 0.45, 0.88, 0.52, 0.7, 0.83];
const OUT_SHAPE = [0.45, 0.62, 0.38, 0.7, 0.55, 0.66, 0.42, 0.58, 0.74, 0.4, 0.5, 0.6];

export interface Year {
  id: string;
  label: string;
}

export const YEARS: Year[] = [
  { id: 'y2029', label: 'This Year' },
  { id: 'y2028', label: 'Last Year' },
  { id: 'y2027', label: '2027' },
];

export function cashflow(yearId: string): MonthFlow[] {
  const next = rng(yearId.length * 977 + yearId.charCodeAt(yearId.length - 1));
  const lift = { y2029: 1, y2028: 0.86, y2027: 0.72 }[yearId] ?? 1;
  return MONTH_LABELS.map((label, i) => ({
    id: label.toLowerCase(),
    label,
    income: Math.round((1800 + IN_SHAPE[i] * 6400 + next() * 500) * lift),
    expense: Math.round((1200 + OUT_SHAPE[i] * 4600 + next() * 450) * lift),
  }));
}

/* -------------------------------------------------------------- statistic */

export interface Category {
  id: string;
  label: string;
  amount: number;
  token: string;
  /*
   * Which way the share badge's own type goes on this colour. Measured, not
   * guessed: white on #6aa86f is 2.82:1 and the ink is 5.69:1, while on
   * #1f4842 it is the other way round. A single text colour across five
   * swatches fails at one end or the other, always.
   */
  fg: 'light' | 'dark';
}

/** The reference's own five, with its own figures. They sum to $3,500. */
export const EXPENSE_CATEGORIES: Category[] = [
  { id: 'rent', label: 'Rent & Living', amount: 2100, token: '--color-cat-rent', fg: 'light' },
  { id: 'invest', label: 'Investment', amount: 525, token: '--color-cat-invest', fg: 'light' },
  { id: 'education', label: 'Education', amount: 420, token: '--color-cat-education', fg: 'dark' },
  { id: 'food', label: 'Food & Drink', amount: 280, token: '--color-cat-food', fg: 'dark' },
  { id: 'fun', label: 'Entertainment', amount: 175, token: '--color-cat-fun', fg: 'dark' },
];

export const INCOME_CATEGORIES: Category[] = [
  { id: 'salary', label: 'Salary', amount: 3200, token: '--color-cat-rent', fg: 'light' },
  { id: 'dividend', label: 'Dividends', amount: 760, token: '--color-cat-invest', fg: 'light' },
  { id: 'side', label: 'Side work', amount: 520, token: '--color-cat-education', fg: 'dark' },
  { id: 'rebate', label: 'Rebates', amount: 220, token: '--color-cat-food', fg: 'dark' },
  { id: 'interest', label: 'Interest', amount: 100, token: '--color-cat-fun', fg: 'dark' },
];

export const catTotal = (cs: Category[]) => cs.reduce((t, c) => t + c.amount, 0);

export interface Span {
  id: string;
  label: string;
  /** Multiplies the category figures, so the ring really changes. */
  scale: number;
}

export const SPANS: Span[] = [
  { id: 'month', label: 'This Month', scale: 1 },
  { id: 'quarter', label: 'This Quarter', scale: 2.85 },
  { id: 'year', label: 'This Year', scale: 11.4 },
];

/* ------------------------------------------------------------ daily limit */

export const DAILY = { spent: 2500, limit: 20000 };

/* ----------------------------------------------------------- saving plans */

export interface Plan {
  id: string;
  label: string;
  saved: number;
  target: number;
  icon: 'shield' | 'palm' | 'house' | 'car';
}

export const PLANS: Plan[] = [
  { id: 'emergency', label: 'Emergency Fund', saved: 5000, target: 10000, icon: 'shield' },
  { id: 'vacation', label: 'Vacation Fund', saved: 3000, target: 5000, icon: 'palm' },
  { id: 'home', label: 'Home Down Payment', saved: 7250, target: 20000, icon: 'house' },
  { id: 'car', label: 'Car Replacement', saved: 4120, target: 14000, icon: 'car' },
];

export const planTotal = () => PLANS.reduce((t, p) => t + p.saved, 0);

/* ------------------------------------------------------------ transactions */

export type Status = 'Completed' | 'Pending' | 'Failed';

export interface Txn {
  id: string;
  name: string;
  category: string;
  date: string;
  /** Sorted on. */
  stamp: number;
  time: string;
  amount: number;
  note: string;
  status: Status;
}

export const TXNS: Txn[] = [
  {
    id: 'x1',
    name: 'Electricity Bill',
    category: 'Payments',
    date: '2028-03-01',
    stamp: 20280301,
    time: '04:28:48',
    amount: 295.81,
    note: 'Payment for monthly electricity bill',
    status: 'Failed',
  },
  {
    id: 'x2',
    name: 'Weekly Groceries',
    category: 'Shopping',
    date: '2028-03-04',
    stamp: 20280304,
    time: '04:28:48',
    amount: 204.07,
    note: 'Groceries shopping at local supermarket',
    status: 'Completed',
  },
  {
    id: 'x3',
    name: 'Movie Night',
    category: 'Entertainment',
    date: '2028-02-27',
    stamp: 20280227,
    time: '04:28:48',
    amount: 97.84,
    note: 'Tickets for movies and snacks',
    status: 'Pending',
  },
  {
    id: 'x4',
    name: 'Medical Check-up',
    category: 'Healthcare',
    date: '2028-02-07',
    stamp: 20280207,
    time: '04:28:48',
    amount: 323.33,
    note: 'Routine health check-up and medications',
    status: 'Pending',
  },
  {
    id: 'x5',
    name: 'Dinner at Italian Restaurant',
    category: 'Dining Out',
    date: '2028-02-11',
    stamp: 20280211,
    time: '04:28:48',
    amount: 226.25,
    note: 'Dining out with family and friends',
    status: 'Pending',
  },
  {
    id: 'x6',
    name: 'Rail Season Ticket',
    category: 'Transport',
    date: '2028-02-02',
    stamp: 20280202,
    time: '08:12:03',
    amount: 612.0,
    note: 'Three-month commuter pass',
    status: 'Completed',
  },
  {
    id: 'x7',
    name: 'Studio Rent',
    category: 'Payments',
    date: '2028-02-01',
    stamp: 20280201,
    time: '06:00:00',
    amount: 2100.0,
    note: 'Monthly rent for the studio',
    status: 'Completed',
  },
  {
    id: 'x8',
    name: 'Language Course',
    category: 'Education',
    date: '2028-01-28',
    stamp: 20280128,
    time: '19:45:11',
    amount: 420.0,
    note: 'Evening classes, spring term',
    status: 'Completed',
  },
  {
    id: 'x9',
    name: 'Phone Contract',
    category: 'Payments',
    date: '2028-01-24',
    stamp: 20280124,
    time: '09:02:40',
    amount: 48.5,
    note: 'Monthly mobile plan',
    status: 'Failed',
  },
  {
    id: 'x10',
    name: 'Bookshop',
    category: 'Shopping',
    date: '2028-01-19',
    stamp: 20280119,
    time: '13:30:22',
    amount: 74.9,
    note: 'Two hardbacks and a notebook',
    status: 'Completed',
  },
  {
    id: 'x11',
    name: 'Dentist',
    category: 'Healthcare',
    date: '2028-01-15',
    stamp: 20280115,
    time: '11:05:00',
    amount: 180.0,
    note: 'Six-month check and clean',
    status: 'Completed',
  },
  {
    id: 'x12',
    name: 'Gym Membership',
    category: 'Health',
    date: '2028-01-11',
    stamp: 20280111,
    time: '07:15:18',
    amount: 59.0,
    note: 'Monthly membership renewal',
    status: 'Pending',
  },
  {
    id: 'x13',
    name: 'Coffee Subscription',
    category: 'Dining Out',
    date: '2028-01-08',
    stamp: 20280108,
    time: '10:41:52',
    amount: 24.0,
    note: 'Beans delivered fortnightly',
    status: 'Completed',
  },
  {
    id: 'x14',
    name: 'Car Insurance',
    category: 'Payments',
    date: '2028-01-04',
    stamp: 20280104,
    time: '16:20:09',
    amount: 388.4,
    note: 'Annual policy, paid monthly',
    status: 'Completed',
  },
  {
    id: 'x15',
    name: 'Concert Tickets',
    category: 'Entertainment',
    date: '2027-12-29',
    stamp: 20271229,
    time: '21:11:37',
    amount: 142.0,
    note: 'Two tickets, standing',
    status: 'Failed',
  },
  {
    id: 'x16',
    name: 'Winter Coat',
    category: 'Shopping',
    date: '2027-12-22',
    stamp: 20271222,
    time: '15:55:04',
    amount: 219.99,
    note: 'Replacement for the old one',
    status: 'Completed',
  },
];

export const TXN_CATEGORIES = [
  'Payments',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Dining Out',
  'Transport',
  'Education',
  'Health',
] as const;

/* --------------------------------------------------------------- activity */

export interface Activity {
  id: string;
  who: string;
  what: string;
  time: string;
  day: 'Today' | 'Yesterday';
  face: number;
}

export const ACTIVITY: Activity[] = [
  {
    id: 'a1',
    who: 'Jamie Smith',
    what: 'updated account settings',
    time: '16:05',
    day: 'Today',
    face: 0,
  },
  { id: 'a2', who: 'Alex Johnson', what: 'logged in', time: '13:05', day: 'Today', face: 1 },
  {
    id: 'a3',
    who: 'Morgan Lee',
    what: 'added a new savings goal for vacation',
    time: '02:05',
    day: 'Today',
    face: 2,
  },
  {
    id: 'a4',
    who: 'Taylor Green',
    what: 'reviewed recent transactions',
    time: '21:05',
    day: 'Yesterday',
    face: 3,
  },
  {
    id: 'a5',
    who: 'Wilson Baptista',
    what: 'transferred funds to emergency fund',
    time: '09:05',
    day: 'Yesterday',
    face: 4,
  },
  {
    id: 'a6',
    who: 'Priya Raman',
    what: 'approved a standing order',
    time: '08:20',
    day: 'Yesterday',
    face: 5,
  },
];

/* ------------------------------------------------- saving-plan projection */

/**
 * Twelve months of a plan's balance, seeded.
 *
 * The weights are normalised so the series ends exactly on the plan's balance.
 * Accumulating a random step and clamping with `Math.min` instead reached the
 * ceiling in month seven and drew a flat line across the right half of the
 * card — a chart that stops being a chart halfway.
 */
export function planTrail(planId: string): number[] {
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];
  const next = rng(planId.length * 733 + plan.target);
  const weights = Array.from({ length: 11 }, () => 0.45 + next());
  const sum = weights.reduce((a, b) => a + b, 0);
  const start = plan.saved * 0.28;
  const out = [Math.round(start)];
  let v = start;
  for (const w of weights) {
    v += (plan.saved - start) * (w / sum);
    out.push(Math.round(v));
  }
  return out;
}

/* ------------------------------------------------------------- auto-save */

export interface Rule {
  id: string;
  label: string;
  note: string;
  on: boolean;
}

export const RULES: Rule[] = [
  { id: 'roundup', label: 'Round up every card payment', note: 'To the nearest dollar', on: true },
  { id: 'payday', label: 'Move 10% on payday', note: 'On the 28th, from Everyday', on: true },
  { id: 'spare', label: 'Sweep anything over $5,000', note: 'Checked every Sunday', on: false },
  { id: 'refunds', label: 'Save refunds automatically', note: 'Any credit under $500', on: true },
];
