/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout. The reference puts an Apple mark on its first
 * transaction row and a card scheme's two interlocking discs on its card,
 * both over made-up amounts in a made-up account — which is the one thing
 * this series must not ship (rule 8). The counterparties here are invented
 * companies with their own drawn marks, and the card carries an invented
 * scheme.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  holder: 'Dana Okafor',
  first: 'Dana',
  last: 'Okafor',
  role: 'Personal account',
  balance: 38729.61,
  delta: 14,
};

/* ---------------------------------------------------------------- contacts */

export interface Contact {
  id: string;
  name: string;
  note: string;
  face: string;
}

/** Filled in by the pane, which owns the bundled portraits. */
export const CONTACT_SEED: Omit<Contact, 'face'>[] = [
  { id: 'p1', name: 'Imani Reyes', note: 'Sent $240 · Tue' },
  { id: 'p2', name: 'Teodor Blum', note: 'Requested $65 · Mon' },
  { id: 'p3', name: 'Soraya Khan', note: 'Split dinner · Sun' },
  { id: 'p4', name: 'Marcus Enfield', note: 'Rent share · Apr 1' },
  { id: 'p5', name: 'Noor Hadid', note: 'Sent $18 · Mar 29' },
  { id: 'p6', name: 'Elena Marchetti', note: 'Paid you $310 · Mar 27' },
];

/** The reference shows seven discs and a chevron; eight more sit behind it. */
export const CONTACTS_BEHIND = 8;

/* ------------------------------------------------------- balance statistics */

export interface MonthPoint {
  id: string;
  label: string;
  earned: number;
  spent: number;
}

/*
 * Five months, as the reference draws them, but with a sixth month of history
 * behind each window so the ranges differ from one another.
 */
const MONTH_LABELS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

/*
 * The columns have to differ enough to read as a chart. A flat
 * `base + random * spread` clustered every month between 55% and 100% of the
 * tallest, which renders as five near-identical blocks — a picture of a chart
 * rather than one. The shape is written down and the seed only roughens it.
 */
const SHAPE = [0.58, 0.74, 0.46, 0.93, 0.66, 1.0, 0.81];

function buildMonths(seed: number): MonthPoint[] {
  const next = rng(seed);
  return MONTH_LABELS.map((label, i) => ({
    id: label.toLowerCase(),
    label,
    earned: Math.round((2400 + SHAPE[i] * 5600 + next() * 420) * 100) / 100,
    spent: Math.round((1500 + SHAPE[(i + 3) % SHAPE.length] * 3400 + next() * 380) * 100) / 100,
  }));
}

export const MONTHS = buildMonths(4817);

export interface Span {
  id: string;
  label: string;
  /** How many of the trailing months this span shows. */
  months: number;
}

export const SPANS: Span[] = [
  { id: '5m', label: '5 months', months: 5 },
  { id: '7m', label: '7 months', months: 7 },
  { id: '3m', label: '3 months', months: 3 },
];

/** The wave behind the total. Seeded, so it is the same every reload. */
export function balanceWave(spanId: string): number[] {
  const next = rng(spanId.length * 613 + 77);
  return Array.from({ length: 24 }, (_, i) => {
    const t = i / 23;
    return Math.round((0.45 + Math.sin(t * Math.PI * 1.6) * 0.3 + next() * 0.22) * 1000) / 1000;
  });
}

/* --------------------------------------------------------------- analytics */

export interface TaskState {
  id: string;
  label: string;
  share: number;
  token: string;
}

/**
 * The gauge. The reference labels it "90% Done" over three states whose own
 * segments are nowhere near nine tenths of the arc — so the share drives the
 * arc here and the headline is read off the same number.
 */
export const TASKS: TaskState[] = [
  { id: 'done', label: 'Done', share: 62, token: '--color-task-done' },
  { id: 'progress', label: 'In progress', share: 26, token: '--color-task-progress' },
  { id: 'todo', label: 'To do', share: 12, token: '--color-task-todo' },
];

/* --------------------------------------------------------- the bank card */

export interface BankCard {
  id: string;
  label: string;
  scheme: string;
  last4: string;
  from: string;
  to: string;
  balance: number;
  limit: number;
}

export const CARDS: BankCard[] = [
  {
    id: 'everyday',
    label: 'Everyday',
    scheme: 'Orvela Open',
    last4: '2734',
    from: '3/18',
    to: '3/28',
    balance: 12480.4,
    limit: 20000,
  },
  {
    id: 'reserve',
    label: 'Reserve',
    scheme: 'Orvela Keep',
    last4: '8162',
    from: '1/22',
    to: '1/30',
    balance: 21360.9,
    limit: 25000,
  },
  {
    id: 'shared',
    label: 'Shared',
    scheme: 'Orvela Two',
    last4: '5509',
    from: '2/04',
    to: '2/14',
    balance: 4888.31,
    limit: 8000,
  },
];

/* ------------------------------------------------------------ transactions */

export type MarkId = 'halcyon' | 'verity' | 'tidepoint' | 'orchard' | 'corvid' | 'belmont';

export interface Txn {
  id: string;
  title: string;
  kind: 'Company' | 'Person';
  category: 'Software' | 'Transfer' | 'Groceries' | 'Travel' | 'Utilities' | 'Income';
  date: string;
  /** Sorted on, and shown as "03 April 2026". */
  stamp: number;
  amount: number;
  mark: MarkId;
  /** Index into the bundled portraits, for the rows that are people. */
  face?: number;
}

export const TXNS: Txn[] = [
  {
    id: 't1',
    title: 'Quenby Software',
    kind: 'Company',
    category: 'Software',
    date: '03 April 2026',
    stamp: 20260403,
    amount: -653,
    mark: 'halcyon',
  },
  {
    id: 't2',
    title: 'Elena Marchetti',
    kind: 'Person',
    category: 'Transfer',
    date: '01 April 2026',
    stamp: 20260401,
    amount: -2643,
    mark: 'verity',
    face: 5,
  },
  {
    id: 't3',
    title: 'Marcus Enfield',
    kind: 'Person',
    category: 'Transfer',
    date: '27 March 2026',
    stamp: 20260327,
    amount: -20,
    mark: 'verity',
    face: 3,
  },
  {
    id: 't4',
    title: 'Tidepoint Energy',
    kind: 'Company',
    category: 'Utilities',
    date: '26 March 2026',
    stamp: 20260326,
    amount: -148.2,
    mark: 'tidepoint',
  },
  {
    id: 't5',
    title: 'Orchard Market',
    kind: 'Company',
    category: 'Groceries',
    date: '24 March 2026',
    stamp: 20260324,
    amount: -96.45,
    mark: 'orchard',
  },
  {
    id: 't6',
    title: 'Corvid Rail',
    kind: 'Company',
    category: 'Travel',
    date: '22 March 2026',
    stamp: 20260322,
    amount: -214.8,
    mark: 'corvid',
  },
  {
    id: 't7',
    title: 'Belmont Studio',
    kind: 'Company',
    category: 'Income',
    date: '20 March 2026',
    stamp: 20260320,
    amount: 5400,
    mark: 'belmont',
  },
  {
    id: 't8',
    title: 'Imani Reyes',
    kind: 'Person',
    category: 'Transfer',
    date: '18 March 2026',
    stamp: 20260318,
    amount: 240,
    mark: 'verity',
    face: 0,
  },
  {
    id: 't9',
    title: 'Orchard Market',
    kind: 'Company',
    category: 'Groceries',
    date: '17 March 2026',
    stamp: 20260317,
    amount: -62.1,
    mark: 'orchard',
  },
  {
    id: 't10',
    title: 'Quenby Software',
    kind: 'Company',
    category: 'Software',
    date: '15 March 2026',
    stamp: 20260315,
    amount: -29,
    mark: 'halcyon',
  },
  {
    id: 't11',
    title: 'Corvid Rail',
    kind: 'Company',
    category: 'Travel',
    date: '13 March 2026',
    stamp: 20260313,
    amount: -88.4,
    mark: 'corvid',
  },
  {
    id: 't12',
    title: 'Tidepoint Energy',
    kind: 'Company',
    category: 'Utilities',
    date: '11 March 2026',
    stamp: 20260311,
    amount: -132.75,
    mark: 'tidepoint',
  },
  {
    id: 't13',
    title: 'Soraya Khan',
    kind: 'Person',
    category: 'Transfer',
    date: '09 March 2026',
    stamp: 20260309,
    amount: -75,
    mark: 'verity',
    face: 2,
  },
  {
    id: 't14',
    title: 'Belmont Studio',
    kind: 'Company',
    category: 'Income',
    date: '06 March 2026',
    stamp: 20260306,
    amount: 5400,
    mark: 'belmont',
  },
  {
    id: 't15',
    title: 'Orchard Market',
    kind: 'Company',
    category: 'Groceries',
    date: '04 March 2026',
    stamp: 20260304,
    amount: -121.3,
    mark: 'orchard',
  },
  {
    id: 't16',
    title: 'Noor Hadid',
    kind: 'Person',
    category: 'Transfer',
    date: '02 March 2026',
    stamp: 20260302,
    amount: 18,
    mark: 'verity',
    face: 4,
  },
  {
    id: 't17',
    title: 'Corvid Rail',
    kind: 'Company',
    category: 'Travel',
    date: '28 February 2026',
    stamp: 20260228,
    amount: -342.6,
    mark: 'corvid',
  },
  {
    id: 't18',
    title: 'Quenby Software',
    kind: 'Company',
    category: 'Software',
    date: '25 February 2026',
    stamp: 20260225,
    amount: -653,
    mark: 'halcyon',
  },
];

export const CATEGORIES = [
  'Software',
  'Transfer',
  'Groceries',
  'Travel',
  'Utilities',
  'Income',
] as const;

/* -------------------------------------------------- expenses versus income */

/**
 * The reference prints 60% Expenses / 40% Income and draws two bars that are
 * nothing like 60:40. Both are computed from the ledger here, so the split and
 * the bars are the same fact told twice.
 */
export function flow() {
  const income = TXNS.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expense = TXNS.filter((t) => t.amount < 0).reduce((s, t) => s - t.amount, 0);
  const total = income + expense || 1;
  return {
    income: Math.round(income * 100) / 100,
    expense: Math.round(expense * 100) / 100,
    incomeShare: Math.round((income / total) * 100),
    expenseShare: Math.round((expense / total) * 100),
  };
}

/* ------------------------------------------------------------- recurring */

export interface Recurring {
  id: string;
  label: string;
  cadence: string;
  amount: number;
  mark: MarkId;
  next: string;
  on: boolean;
}

export const RECURRING: Recurring[] = [
  {
    id: 'r1',
    label: 'Quenby Software',
    cadence: 'Monthly',
    amount: 29,
    mark: 'halcyon',
    next: '15 May',
    on: true,
  },
  {
    id: 'r2',
    label: 'Tidepoint Energy',
    cadence: 'Monthly',
    amount: 148.2,
    mark: 'tidepoint',
    next: '26 Apr',
    on: true,
  },
  {
    id: 'r3',
    label: 'Corvid Rail pass',
    cadence: 'Monthly',
    amount: 88.4,
    mark: 'corvid',
    next: '13 May',
    on: false,
  },
  {
    id: 'r4',
    label: 'Orchard Market plus',
    cadence: 'Weekly',
    amount: 12,
    mark: 'orchard',
    next: '19 Apr',
    on: true,
  },
  {
    id: 'r5',
    label: 'Belmont Studio retainer',
    cadence: 'Monthly',
    amount: 240,
    mark: 'belmont',
    next: '01 May',
    on: true,
  },
  {
    id: 'r6',
    label: 'Corvid Rail insurance',
    cadence: 'Monthly',
    amount: 34.5,
    mark: 'corvid',
    next: '08 May',
    on: true,
  },
  {
    id: 'r7',
    label: 'Tidepoint water',
    cadence: 'Monthly',
    amount: 41.9,
    mark: 'tidepoint',
    next: '22 Apr',
    on: false,
  },
  {
    id: 'r8',
    label: 'Quenby backup',
    cadence: 'Monthly',
    amount: 9,
    mark: 'halcyon',
    next: '15 May',
    on: true,
  },
  {
    id: 'r9',
    label: 'Orchard Market box',
    cadence: 'Weekly',
    amount: 34.5,
    mark: 'orchard',
    next: '20 Apr',
    on: true,
  },
  {
    id: 'r10',
    label: 'Belmont Studio cloud',
    cadence: 'Monthly',
    amount: 58,
    mark: 'belmont',
    next: '03 May',
    on: true,
  },
  {
    id: 'r11',
    label: 'Corvid Rail parking',
    cadence: 'Monthly',
    amount: 22.4,
    mark: 'corvid',
    next: '11 May',
    on: false,
  },
  {
    id: 'r12',
    label: 'Tidepoint broadband',
    cadence: 'Monthly',
    amount: 46,
    mark: 'tidepoint',
    next: '28 Apr',
    on: true,
  },
];

/** Running balance over the last n days, seeded. */
export function balanceTrail(cardId: string, days = 30): number[] {
  const card = CARDS.find((c) => c.id === cardId) ?? CARDS[0];
  const next = rng(cardId.length * 311 + Math.round(card.balance));
  const out: number[] = [];
  let v = card.balance * 0.82;
  for (let i = 0; i < days; i++) {
    v += (next() - 0.42) * (card.balance * 0.06);
    out.push(Math.round(Math.max(card.balance * 0.4, v) * 100) / 100);
  }
  out[out.length - 1] = card.balance;
  return out;
}

/** Seven days of spend on a card, seeded so it is the same every reload. */
export function cardWeek(cardId: string): number[] {
  const card = CARDS.find((c) => c.id === cardId) ?? CARDS[0];
  const next = rng(cardId.length * 5231 + Math.round(card.limit));
  return Array.from({ length: 7 }, () => Math.round(next() * (card.limit / 26) * 100) / 100);
}

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
