/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout. The reference's payment-history table carries a design
 * community, a payments network and a retailer — three real marks over
 * made-up percentages in a made-up account, which is the one thing this series
 * must not ship (rule 8).
 *
 * Its own arithmetic does not hold either: the engagement chart's axis tops
 * out at 5k with bars drawn above it, and the "+17.8%" bubble is pinned to a
 * month whose bar is not the tallest. Both are derived here.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  holder: 'Sujon Amari',
  first: 'Sujon',
  range: '29 Jun, 2025 — 29 Aug, 2025',
};

/* ------------------------------------------------------------------ wallets */

export interface Wallet {
  id: string;
  label: string;
  scheme: string;
  last4: string;
  expiry: string;
  balance: number;
  goal: number;
}

export const WALLETS: Wallet[] = [
  {
    id: 'main',
    label: 'Payment Goal',
    scheme: 'Quilbo Credit',
    last4: '9090',
    expiry: '09/26',
    balance: 78989.09,
    goal: 120000,
  },
  {
    id: 'reserve',
    label: 'Reserve Goal',
    scheme: 'Quilbo Reserve',
    last4: '4417',
    expiry: '03/28',
    balance: 41250.4,
    goal: 60000,
  },
  {
    id: 'travel',
    label: 'Travel Goal',
    scheme: 'Quilbo Voyage',
    last4: '2208',
    expiry: '11/27',
    balance: 12860.75,
    goal: 25000,
  },
];

export const WEEKLY_REVENUE = { amount: 3945, delta: 12.8 };
export const CREDIT = { amount: 8945.89, delta: 12.8 };
export const TOTAL_BALANCE = 32678.9;

/* -------------------------------------------------------- engagement rate */

export interface Period {
  id: string;
  label: string;
  /** The axis labels under the bars. */
  ticks: string[];
}

export const PERIODS: Period[] = [
  { id: 'annually', label: 'Annually', ticks: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'] },
  { id: 'monthly', label: 'Monthly', ticks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'] },
];

export interface Bar {
  id: string;
  label: string;
  value: number;
  /** Change against the bar before it, computed when the series is built. */
  delta: number;
}

/*
 * A written-down shape with a seeded roughening on top, so the bars differ
 * enough to read as a chart. The deltas are computed from the values, so the
 * bubble over the tallest bar cannot disagree with the bar under it.
 */
const SHAPES: Record<string, number[]> = {
  annually: [0.46, 0.72, 0.38, 1.0, 0.62, 0.84],
  monthly: [0.55, 0.42, 0.78, 0.6, 0.92, 0.7],
};

export function engagement(periodId: string): Bar[] {
  const period = PERIODS.find((p) => p.id === periodId) ?? PERIODS[0];
  const next = rng(periodId.length * 1361 + period.ticks.length);
  const shape = SHAPES[periodId] ?? SHAPES.annually;
  const values = shape.map((f) => Math.round(1200 + f * 3400 + next() * 260));
  return period.ticks.map((label, i) => ({
    id: label.toLowerCase(),
    label,
    value: values[i],
    delta: i === 0 ? 0 : Math.round(((values[i] - values[i - 1]) / values[i - 1]) * 1000) / 10,
  }));
}

/** The tallest bar: the one the reference pins its bubble to. */
export const peakOf = (bars: Bar[]) =>
  bars.reduce((best, b) => (b.value > best.value ? b : best), bars[0]);

/* ------------------------------------------------------------ the balance */

export interface Range {
  id: string;
  label: string;
  points: number;
  ticks: string[];
}

export const RANGES: Range[] = [
  { id: '3m', label: '3M', points: 26, ticks: ['Jun', 'Jul', 'Aug'] },
  { id: '6m', label: '6M', points: 34, ticks: ['Mar', 'May', 'Jul', 'Aug'] },
  { id: '1y', label: '1Y', points: 48, ticks: ['Sep', 'Dec', 'Mar', 'Jun', 'Aug'] },
];

export function balanceSeries(rangeId: string): number[] {
  const range = RANGES.find((r) => r.id === rangeId) ?? RANGES[0];
  const next = rng(range.points * 17 + rangeId.length);
  const end = TOTAL_BALANCE;
  const drop = { '3m': 0.1, '6m': 0.24, '1y': 0.46 }[range.id] ?? 0.1;
  const start = end * (1 - drop);
  const out: number[] = [];
  for (let i = 0; i < range.points; i++) {
    const t = i / (range.points - 1);
    out.push(
      Math.round((start + (end - start) * t + (next() - 0.45) * (end - start) * 0.5) * 100) / 100,
    );
  }
  out[out.length - 1] = end;
  return out;
}

/* ------------------------------------------------------------ payments */

export type MarkId = 'driblo' | 'payline' | 'amberly' | 'northform' | 'kestra' | 'lumio';

export type Status = 'Successful' | 'Pending' | 'Failed';

export interface Payment {
  id: string;
  name: string;
  mark: MarkId;
  date: string;
  stamp: number;
  time: string;
  status: Status;
  amount: number;
  delta: number;
}

export const PAYMENTS: Payment[] = [
  {
    id: 'y1',
    name: 'Driblo Design',
    mark: 'driblo',
    date: '16 Jun 2025',
    stamp: 20250616,
    time: '10:30 PM',
    status: 'Successful',
    amount: 89345.23,
    delta: 18.67,
  },
  {
    id: 'y2',
    name: 'Payline Transfer',
    mark: 'payline',
    date: '15 Jun 2025',
    stamp: 20250615,
    time: '11:45 PM',
    status: 'Successful',
    amount: 12345.89,
    delta: 9.34,
  },
  {
    id: 'y3',
    name: 'Amberly Shopping',
    mark: 'amberly',
    date: '14 Jun 2025',
    stamp: 20250614,
    time: '10:15 PM',
    status: 'Successful',
    amount: 32123.67,
    delta: 12.23,
  },
  {
    id: 'y4',
    name: 'Northform Studio',
    mark: 'northform',
    date: '12 Jun 2025',
    stamp: 20250612,
    time: '09:02 AM',
    status: 'Pending',
    amount: 18420.5,
    delta: -3.41,
  },
  {
    id: 'y5',
    name: 'Kestra Hardware',
    mark: 'kestra',
    date: '11 Jun 2025',
    stamp: 20250611,
    time: '04:28 PM',
    status: 'Successful',
    amount: 7640.12,
    delta: 5.08,
  },
  {
    id: 'y6',
    name: 'Kelvo Energy',
    mark: 'lumio',
    date: '09 Jun 2025',
    stamp: 20250609,
    time: '08:55 AM',
    status: 'Failed',
    amount: 2210.0,
    delta: -11.6,
  },
  {
    id: 'y7',
    name: 'Driblo Design',
    mark: 'driblo',
    date: '07 Jun 2025',
    stamp: 20250607,
    time: '02:14 PM',
    status: 'Successful',
    amount: 54210.4,
    delta: 21.9,
  },
  {
    id: 'y8',
    name: 'Payline Payout',
    mark: 'payline',
    date: '05 Jun 2025',
    stamp: 20250605,
    time: '07:40 PM',
    status: 'Successful',
    amount: 9875.3,
    delta: 2.77,
  },
  {
    id: 'y9',
    name: 'Amberly Shopping',
    mark: 'amberly',
    date: '03 Jun 2025',
    stamp: 20250603,
    time: '12:05 PM',
    status: 'Pending',
    amount: 4310.0,
    delta: -0.84,
  },
  {
    id: 'y10',
    name: 'Kestra Hardware',
    mark: 'kestra',
    date: '01 Jun 2025',
    stamp: 20250601,
    time: '05:22 PM',
    status: 'Successful',
    amount: 15980.75,
    delta: 7.65,
  },
  {
    id: 'y11',
    name: 'Northform Studio',
    mark: 'northform',
    date: '29 May 2025',
    stamp: 20250529,
    time: '11:11 AM',
    status: 'Successful',
    amount: 23105.6,
    delta: 14.02,
  },
  {
    id: 'y12',
    name: 'Kelvo Energy',
    mark: 'lumio',
    date: '27 May 2025',
    stamp: 20250527,
    time: '06:48 AM',
    status: 'Successful',
    amount: 3120.45,
    delta: 1.33,
  },
  {
    id: 'y13',
    name: 'Driblo Design',
    mark: 'driblo',
    date: '24 May 2025',
    stamp: 20250524,
    time: '03:30 PM',
    status: 'Failed',
    amount: 41200.0,
    delta: -6.12,
  },
  {
    id: 'y14',
    name: 'Payline Transfer',
    mark: 'payline',
    date: '21 May 2025',
    stamp: 20250521,
    time: '09:19 AM',
    status: 'Successful',
    amount: 6420.9,
    delta: 4.4,
  },
];

/* ------------------------------------------------- mandatory payments */

export interface Mandatory {
  id: string;
  name: string;
  face: number;
  amount: number;
  due: string;
}

export const MANDATORY: Mandatory[] = [
  { id: 'm1', name: 'Imani Reyes', face: 0, amount: 1240, due: 'Due in 2 days' },
  { id: 'm2', name: 'Teodor Blum', face: 1, amount: 860, due: 'Due in 5 days' },
  { id: 'm3', name: 'Soraya Khan', face: 2, amount: 2180, due: 'Due in 9 days' },
  { id: 'm4', name: 'Marcus Enfield', face: 3, amount: 540, due: 'Due in 12 days' },
  { id: 'm5', name: 'Noor Hadid', face: 4, amount: 1475, due: 'Due in 15 days' },
  { id: 'm6', name: 'Elena Marchetti', face: 5, amount: 990, due: 'Due in 18 days' },
];

/* --------------------------------------------------------------- reports */

export interface Report {
  id: string;
  label: string;
  period: string;
  size: string;
  kind: 'Statement' | 'Tax' | 'Summary' | 'Audit';
  ready: boolean;
}

export const REPORTS: Report[] = [
  {
    id: 'r1',
    label: 'Quarterly statement',
    period: 'Q2 2025',
    size: '2.4 MB',
    kind: 'Statement',
    ready: true,
  },
  { id: 'r2', label: 'Tax pack', period: 'FY 2024/25', size: '5.1 MB', kind: 'Tax', ready: true },
  {
    id: 'r3',
    label: 'Engagement summary',
    period: 'Jun 2025',
    size: '880 KB',
    kind: 'Summary',
    ready: true,
  },
  {
    id: 'r4',
    label: 'Wallet audit',
    period: 'Jun 2025',
    size: '1.2 MB',
    kind: 'Audit',
    ready: false,
  },
  {
    id: 'r5',
    label: 'Monthly statement',
    period: 'May 2025',
    size: '2.2 MB',
    kind: 'Statement',
    ready: true,
  },
  {
    id: 'r6',
    label: 'Refund summary',
    period: 'May 2025',
    size: '640 KB',
    kind: 'Summary',
    ready: true,
  },
  {
    id: 'r7',
    label: 'Counterparty audit',
    period: 'Apr 2025',
    size: '1.6 MB',
    kind: 'Audit',
    ready: true,
  },
  {
    id: 'r8',
    label: 'Quarterly statement',
    period: 'Q1 2025',
    size: '2.3 MB',
    kind: 'Statement',
    ready: true,
  },
];

/** Where the money went, by counterparty — computed from the ledger. */
export function byCounterparty(rows: Payment[]) {
  const names = [...new Set(rows.map((p) => p.name))];
  return names
    .map((name) => ({
      id: name,
      value: rows.filter((p) => p.name === name).reduce((s, p) => s + p.amount, 0),
      count: rows.filter((p) => p.name === name).length,
      mark: rows.find((p) => p.name === name)!.mark,
    }))
    .sort((a, b) => b.value - a.value);
}
