/**
 * The content deck: every figure, invoice, transaction and category.
 *
 * All invented (rule 5). Nyxora is not a company, nobody here was paid, and no
 * figure on this screen was ever banked — which is what lets the build use
 * free-licensed photographs of real people for the avatars without the page
 * being able to pass as anyone's live product.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export const account = {
  brand: 'Nyxora',
  user: { name: 'Emma Parson', email: 'emma.pars@nyxora.co', face: face1 },
};

/* ---------- revenue ------------------------------------------------------ */

export interface Bar {
  label: string;
  full: string;
  value: number;
  /** Change against the bar before it. */
  delta: number;
}

export interface Span {
  id: 'weekly' | 'monthly' | 'yearly' | 'range';
  label: string;
  bars: Bar[];
  total: number;
  delta: number;
  previous: number;
  /** Which bar opens selected. */
  initial: number;
  /** What the axis counts in. */
  unit: string;
}

const bars = (rows: [string, string, number, number][]): Bar[] =>
  rows.map(([label, full, value, delta]) => ({ label, full, value, delta }));

/*
 * Yearly is the reference's own state: twelve months from July, September
 * selected and up 12%. Weekly and monthly are the same business at two other
 * resolutions, so the span control has something real to switch between.
 */
export const SPANS: Span[] = [
  {
    id: 'weekly',
    label: 'Weekly',
    initial: 4,
    total: 6420,
    previous: 6035,
    delta: 6.4,
    unit: 'per day',
    bars: bars([
      ['Mon', 'Monday', 980, 4],
      ['Tue', 'Tuesday', 1240, 27],
      ['Wed', 'Wednesday', 760, -39],
      ['Thu', 'Thursday', 1410, 86],
      ['Fri', 'Friday', 1180, -16],
      ['Sat', 'Saturday', 520, -56],
      ['Sun', 'Sunday', 330, -37],
    ]),
  },
  {
    id: 'monthly',
    label: 'Monthly',
    initial: 2,
    total: 9870,
    previous: 10_410,
    delta: -5.2,
    unit: 'per week',
    bars: bars([
      ['W1', 'Week one', 2310, 8],
      ['W2', 'Week two', 2890, 25],
      ['W3', 'Week three', 3120, 8],
      ['W4', 'Week four', 1550, -50],
    ]),
  },
  {
    id: 'yearly',
    label: 'Yearly',
    initial: 2,
    total: 28_165,
    previous: 24_280,
    delta: 8.3,
    unit: 'per month',
    bars: bars([
      ['Jul', 'July', 3180, 6],
      ['Aug', 'August', 2440, -23],
      ['Sep', 'September', 1048, 12],
      ['Oct', 'October', 3420, 18],
      ['Nov', 'November', 4180, 22],
      ['Dec', 'December', 2010, -52],
      ['Jan', 'January', 1434, -29],
      ['Feb', 'February', 3340, 133],
      ['Mar', 'March', 2680, -20],
      ['Apr', 'April', 4260, 59],
      ['May', 'May', 1290, -70],
      ['Jun', 'June', 3090, 139],
    ]),
  },
  {
    id: 'range',
    label: 'Range',
    initial: 3,
    total: 14_720,
    previous: 13_050,
    delta: 12.8,
    unit: 'per fortnight',
    bars: bars([
      ['1–14 Nov', 'the first fortnight of November', 2240, 9],
      ['15–28 Nov', 'the second fortnight of November', 3610, 61],
      ['1–14 Dec', 'the first fortnight of December', 4050, 12],
      ['15–28 Dec', 'the second fortnight of December', 4820, 19],
    ]),
  },
];

/* ---------- the calendar ------------------------------------------------- */

export const CALENDAR = {
  month: 'January',
  year: 2026,
  /** 1 Jan 2026 is a Thursday; the grid starts on Monday. */
  startOffset: 3,
  days: 31,
  selected: 11,
  /** Days with money moving on them, for the dots under the numerals. */
  active: [3, 6, 11, 14, 19, 22, 27, 30],
};

/**
 * What moved on each active day, and the change against the same weekday a
 * month earlier. The reference shows one figure under the grid; here every
 * marked day has its own, so selecting a day does something.
 */
export const DAY_TOTALS: Record<number, { amount: number; delta: number }> = {
  3: { amount: 860, delta: -4.1 },
  6: { amount: 2140, delta: 18.6 },
  11: { amount: 1434, delta: 12.4 },
  14: { amount: 395, delta: -22.0 },
  19: { amount: 3080, delta: 31.5 },
  22: { amount: 1265, delta: 6.2 },
  27: { amount: 740, delta: -9.8 },
  30: { amount: 2610, delta: 14.7 },
};

/* ---------- spending ------------------------------------------------------ */

export interface Slice {
  id: string;
  label: string;
  value: number;
  colour: string;
}

export const WINDOWS = [
  { id: '30', label: 'Last 30 Days' },
  { id: '90', label: 'Last 90 Days' },
  { id: '365', label: 'This year' },
] as const;

export type WindowId = (typeof WINDOWS)[number]['id'];

const MIX: Record<WindowId, [string, number][]> = {
  '30': [
    ['activity', 9280],
    ['meals', 6120],
    ['office', 4350],
    ['rewards', 3140],
    ['internet', 1840],
    ['other', 3435],
  ],
  '90': [
    ['activity', 24_100],
    ['meals', 19_450],
    ['office', 9800],
    ['rewards', 7260],
    ['internet', 5520],
    ['other', 8170],
  ],
  '365': [
    ['activity', 88_400],
    ['meals', 71_200],
    ['office', 34_600],
    ['rewards', 28_900],
    ['internet', 22_080],
    ['other', 31_500],
  ],
};

const LABELS: Record<string, string> = {
  activity: 'Activity',
  meals: 'Meals',
  office: 'Office supplies',
  rewards: 'Rewards',
  internet: 'Internet & Telephone',
  other: 'Other',
};

export const spendingFor = (id: WindowId): Slice[] =>
  MIX[id].map(([key, value]) => ({
    id: key,
    label: LABELS[key],
    value,
    colour: 'var(--color-cat-' + key + ')',
  }));

/** The sentence under the donut, written from the figures rather than fixed. */
export function spendingNote(slices: Slice[]): string {
  const sorted = slices.slice().sort((a, b) => b.value - a.value);
  const total = slices.reduce((t, s) => t + s.value, 0);
  const share = Math.round((sorted[0].value / total) * 100);
  // "Other" is a bucket, not a line, so it cannot be the smallest named one --
  // the first version of this sentence said Rewards (11%) was, with Internet &
  // Telephone sitting at 7% two rows below it.
  const named = sorted.filter((s) => s.id !== 'other');

  return (
    'Most of it is ' +
    sorted[0].label +
    ' and ' +
    sorted[1].label +
    ' — ' +
    share +
    '% on ' +
    sorted[0].label.toLowerCase() +
    ' alone. ' +
    named[named.length - 1].label +
    ' is the smallest named line.'
  );
}

/* ---------- invoices ------------------------------------------------------ */

export type InvoiceState = 'Unpaid' | 'Paid' | 'Pending';

export interface Invoice {
  id: string;
  date: string;
  due: string;
  state: InvoiceState;
  name: string;
  face: string;
  amount: number;
  ref: string;
}

export const PAYMENT_SCORE = 76;

export const INVOICES: Invoice[] = [
  {
    id: 'i1',
    date: 'Aug 9',
    due: 'in 1 week',
    state: 'Unpaid',
    name: 'Leonard Kim',
    face: face2,
    amount: 130,
    ref: 'NC-4411',
  },
  {
    id: 'i2',
    date: 'Aug 24',
    due: 'in 2 weeks',
    state: 'Paid',
    name: 'John Smith',
    face: face3,
    amount: 220,
    ref: 'NC-4412',
  },
  {
    id: 'i3',
    date: 'Sep 9',
    due: 'in 1 month',
    state: 'Pending',
    name: 'Anna Spirid',
    face: face4,
    amount: 2080,
    ref: 'NC-4413',
  },
  {
    id: 'i4',
    date: 'Sep 18',
    due: 'in 5 weeks',
    state: 'Unpaid',
    name: 'Marcus Webb',
    face: face5,
    amount: 640,
    ref: 'NC-4414',
  },
  {
    id: 'i5',
    date: 'Oct 2',
    due: 'in 7 weeks',
    state: 'Paid',
    name: 'Dia Okonjo',
    face: face6,
    amount: 1450,
    ref: 'NC-4415',
  },
  {
    id: 'i6',
    date: 'Oct 14',
    due: 'in 2 months',
    state: 'Pending',
    name: 'Ruth Vandal',
    face: face2,
    amount: 310,
    ref: 'NC-4416',
  },
  {
    id: 'i7',
    date: 'Oct 29',
    due: 'in 3 months',
    state: 'Unpaid',
    name: 'Søren Dahl',
    face: face3,
    amount: 980,
    ref: 'NC-4417',
  },
  {
    id: 'i8',
    date: 'Nov 11',
    due: 'in 4 months',
    state: 'Paid',
    name: 'Priya Anand',
    face: face4,
    amount: 1720,
    ref: 'NC-4418',
  },
  {
    id: 'i9',
    date: 'Nov 23',
    due: 'in 5 months',
    state: 'Unpaid',
    name: 'Tomas Belka',
    face: face5,
    amount: 430,
    ref: 'NC-4419',
  },
  {
    id: 'i10',
    date: 'Dec 4',
    due: 'in 5 months',
    state: 'Pending',
    name: 'Grace Oyelaran',
    face: face6,
    amount: 2340,
    ref: 'NC-4420',
  },
  {
    id: 'i11',
    date: 'Dec 15',
    due: 'in 6 months',
    state: 'Paid',
    name: 'Idris Mbeki',
    face: face2,
    amount: 870,
    ref: 'NC-4421',
  },
  {
    id: 'i12',
    date: 'Dec 29',
    due: 'in 6 months',
    state: 'Unpaid',
    name: 'Hannah Royce',
    face: face3,
    amount: 1190,
    ref: 'NC-4422',
  },
  {
    id: 'i13',
    date: 'Jan 8',
    due: 'in 7 months',
    state: 'Pending',
    name: 'Oskar Lindgren',
    face: face4,
    amount: 560,
    ref: 'NC-4423',
  },
  {
    id: 'i14',
    date: 'Jan 19',
    due: 'in 8 months',
    state: 'Paid',
    name: 'Yuki Tanaka',
    face: face5,
    amount: 3120,
    ref: 'NC-4424',
  },
];

/* ---------- transactions -------------------------------------------------- */

export type Direction = 'in' | 'out';

export interface Txn {
  id: string;
  merchant: string;
  category: string;
  categoryId: string;
  date: string;
  amount: number;
  direction: Direction;
  method: 'Card' | 'Transfer' | 'Direct debit';
}

const TXN_ROWS: [string, string, string, string, string, number, Direction, Txn['method']][] = [
  ['t1', 'Harlow Studios', 'Activity', 'activity', '11 Jan', 1840, 'out', 'Card'],
  ['t2', 'Client retainer', 'Rewards', 'rewards', '11 Jan', 3200, 'in', 'Transfer'],
  ['t3', 'Fen & Thistle', 'Meals', 'meals', '10 Jan', 86.4, 'out', 'Card'],
  ['t4', 'Northgate Print', 'Office supplies', 'office', '10 Jan', 214, 'out', 'Card'],
  ['t5', 'Broadline Fibre', 'Internet & Telephone', 'internet', '9 Jan', 62, 'out', 'Direct debit'],
  ['t6', 'Studio sublet', 'Office supplies', 'office', '9 Jan', 950, 'out', 'Transfer'],
  ['t7', 'Mabel & Crow', 'Meals', 'meals', '8 Jan', 43.2, 'out', 'Card'],
  ['t8', 'Workshop fee', 'Activity', 'activity', '8 Jan', 480, 'out', 'Transfer'],
  ['t9', 'Invoice NC-4412', 'Rewards', 'rewards', '7 Jan', 220, 'in', 'Transfer'],
  ['t10', 'Kestrel Coffee', 'Meals', 'meals', '7 Jan', 11.8, 'out', 'Card'],
  ['t11', 'Loom Telecom', 'Internet & Telephone', 'internet', '6 Jan', 38, 'out', 'Direct debit'],
  ['t12', 'Paper & Press', 'Office supplies', 'office', '6 Jan', 129, 'out', 'Card'],
  ['t13', 'Field recording day', 'Activity', 'activity', '5 Jan', 1260, 'out', 'Transfer'],
  ['t14', 'Invoice NC-4415', 'Rewards', 'rewards', '4 Jan', 1450, 'in', 'Transfer'],
  ['t15', 'Vellum Supplies', 'Office supplies', 'office', '4 Jan', 76.5, 'out', 'Card'],
  ['t16', 'The Ember Room', 'Meals', 'meals', '3 Jan', 132, 'out', 'Card'],
  ['t17', 'Archive storage', 'Other', 'other', '3 Jan', 290, 'out', 'Direct debit'],
  ['t18', 'Signal & Co', 'Internet & Telephone', 'internet', '2 Jan', 54, 'out', 'Direct debit'],
];

export const TRANSACTIONS: Txn[] = TXN_ROWS.map(
  ([id, merchant, category, categoryId, date, amount, direction, method]) => ({
    id,
    merchant,
    category,
    categoryId,
    date,
    amount,
    direction,
    method,
  }),
);

/* ---------- the assistant ------------------------------------------------- */

export const ASSISTANT = {
  heading: 'How can I help you?',
  summary:
    'Your financial activity this period remains stable. Revenue shows expected seasonal variation, spending is balanced across key categories, and no unusual patterns were detected.',
  more: 'The two lines worth watching are Internet & Telephone, up a little on last period, and the Sep dip, which is a billing month with one fewer working week in it rather than a fall in work.',
  tiles: [
    { label: 'Spending Trends', value: '7', tag: 'Stable', tone: 'warn' as const },
    { label: 'Customer Payments', value: '25', tag: 'Processed', tone: 'positive' as const },
  ],
  prompts: ['Why did September dip?', 'Which category grew most?', 'Forecast next month'],
};

/* ---------- derived ------------------------------------------------------- */

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/**
 * The payment-score meter's ticks: 40 bars, the lit ones up to the score.
 * Seeded per score so the little height variation is stable across reloads.
 */
export function scoreTicks(score: number, n = 40): number[] {
  const next = rng(hash('score' + score));
  return Array.from({ length: n }, () => 0.55 + next() * 0.45);
}
