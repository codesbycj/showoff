/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout. The reference carries no real marks, which is rare in
 * this batch — but its figures still do not hold: "Weekly average" and
 * "Annual average" are both printed as 25.460,00, which cannot be true of the
 * same account, and the summary's two totals are not the sum of its own bars.
 * Both are derived here.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  holder: 'Uzui Marlowe',
  first: 'Uzui',
};

/* ---------------------------------------------------------------- summary */

export interface Span {
  id: string;
  label: string;
  bars: number;
  /** How many of the bars are the current period; the rest are the one before. */
  current: number;
  ticks: string[];
}

export const SPANS: Span[] = [
  { id: 'weekly', label: 'Weekly', bars: 12, current: 6, ticks: ['Mon', 'Wed', 'Fri', 'Sun'] },
  { id: 'monthly', label: 'Monthly', bars: 12, current: 6, ticks: ['W1', 'W2', 'W3', 'W4'] },
  { id: 'yearly', label: 'Yearly', bars: 12, current: 6, ticks: ['Q1', 'Q2', 'Q3', 'Q4'] },
];

export interface SummaryBar {
  id: string;
  label: string;
  value: number;
  /** The first half is this period; the rest is the one before it. */
  current: boolean;
}

/*
 * A written-down shape with a seeded roughening on top. `base + random`
 * clusters every bar between 60% and 100% of the tallest, which renders as
 * twelve near-identical blocks — a picture of a chart rather than one.
 */
const SHAPE = [0.52, 0.34, 0.86, 0.7, 0.62, 1.0, 0.46, 0.58, 0.4, 0.74, 0.5, 0.66];

export function summary(spanId: string): SummaryBar[] {
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[0];
  const next = rng(spanId.length * 1427 + span.bars);
  const lift = { weekly: 1, monthly: 4.2, yearly: 51 }[spanId] ?? 1;
  return Array.from({ length: span.bars }, (_, i) => ({
    id: 'b' + i,
    label: String(i + 1),
    value: Math.round((380 + SHAPE[i] * 1700 + next() * 180) * lift * 100) / 100,
    current: i < span.current,
  }));
}

/** Money in and money out, summed from the bars so the card cannot drift. */
export function summaryTotals(bars: SummaryBar[]) {
  const income = bars.filter((b) => b.current).reduce((s, b) => s + b.value, 0);
  const paid = bars.filter((b) => !b.current).reduce((s, b) => s + b.value, 0);
  return {
    income: Math.round(income * 100) / 100,
    paid: Math.round(paid * 100) / 100,
  };
}

/* --------------------------------------------------------------- activity */

export interface Tile {
  id: string;
  label: string;
  value: number;
  delta: number;
  /** The reference inverts one of its three. */
  dark: boolean;
}

export const TILES: Tile[] = [
  { id: 'receipts', label: 'Receipts', value: 120560.0, delta: 11.5, dark: false },
  { id: 'contributions', label: 'Contributions', value: 37272.0, delta: 4.5, dark: false },
  { id: 'owes', label: 'Owes', value: 9230.0, delta: -20.5, dark: true },
];

/** Twenty points of a tile's own trace, seeded. */
export function tileTrace(id: string): number[] {
  const next = rng(id.length * 619 + id.charCodeAt(0) * 11);
  return Array.from({ length: 22 }, (_, i) => {
    const t = i / 21;
    return Math.round((0.4 + Math.sin(t * Math.PI * 2.4) * 0.26 + next() * 0.3) * 1000) / 1000;
  });
}

/* ---------------------------------------------------------------- history */

export type Status = 'Completed' | 'Pending' | 'Declined';

export interface Txn {
  id: string;
  name: string;
  ref: string;
  status: Status;
  date: string;
  stamp: number;
  amount: number;
  face: number;
  wallet: string;
}

export const TXNS: Txn[] = [
  {
    id: 't1',
    name: 'Guy Hawkins',
    ref: '#1298970',
    status: 'Completed',
    date: 'May 29, 2024',
    stamp: 20240529,
    amount: -15.3,
    face: 0,
    wallet: 'everyday',
  },
  {
    id: 't2',
    name: 'Robert Fox',
    ref: '#1848230',
    status: 'Pending',
    date: 'May 11, 2024',
    stamp: 20240511,
    amount: -23.0,
    face: 1,
    wallet: 'everyday',
  },
  {
    id: 't3',
    name: 'Imani Reyes',
    ref: '#1904772',
    status: 'Completed',
    date: 'May 09, 2024',
    stamp: 20240509,
    amount: 1840.0,
    face: 2,
    wallet: 'growth',
  },
  {
    id: 't4',
    name: 'Soraya Khan',
    ref: '#1771045',
    status: 'Declined',
    date: 'May 04, 2024',
    stamp: 20240504,
    amount: -312.5,
    face: 3,
    wallet: 'everyday',
  },
  {
    id: 't5',
    name: 'Marcus Enfield',
    ref: '#1660318',
    status: 'Completed',
    date: 'Apr 28, 2024',
    stamp: 20240428,
    amount: -96.4,
    face: 4,
    wallet: 'reserve',
  },
  {
    id: 't6',
    name: 'Elena Marchetti',
    ref: '#1552901',
    status: 'Completed',
    date: 'Apr 22, 2024',
    stamp: 20240422,
    amount: 2450.0,
    face: 5,
    wallet: 'growth',
  },
  {
    id: 't7',
    name: 'Guy Hawkins',
    ref: '#1441276',
    status: 'Pending',
    date: 'Apr 18, 2024',
    stamp: 20240418,
    amount: -58.9,
    face: 0,
    wallet: 'everyday',
  },
  {
    id: 't8',
    name: 'Robert Fox',
    ref: '#1398844',
    status: 'Completed',
    date: 'Apr 11, 2024',
    stamp: 20240411,
    amount: -210.0,
    face: 1,
    wallet: 'reserve',
  },
  {
    id: 't9',
    name: 'Imani Reyes',
    ref: '#1287530',
    status: 'Completed',
    date: 'Apr 03, 2024',
    stamp: 20240403,
    amount: 980.75,
    face: 2,
    wallet: 'growth',
  },
  {
    id: 't10',
    name: 'Soraya Khan',
    ref: '#1174092',
    status: 'Completed',
    date: 'Mar 27, 2024',
    stamp: 20240327,
    amount: -44.2,
    face: 3,
    wallet: 'everyday',
  },
  {
    id: 't11',
    name: 'Marcus Enfield',
    ref: '#1068415',
    status: 'Declined',
    date: 'Mar 19, 2024',
    stamp: 20240319,
    amount: -1200.0,
    face: 4,
    wallet: 'reserve',
  },
  {
    id: 't12',
    name: 'Elena Marchetti',
    ref: '#0994318',
    status: 'Completed',
    date: 'Mar 12, 2024',
    stamp: 20240312,
    amount: 640.0,
    face: 5,
    wallet: 'growth',
  },
  {
    id: 't13',
    name: 'Guy Hawkins',
    ref: '#0881206',
    status: 'Completed',
    date: 'Mar 05, 2024',
    stamp: 20240305,
    amount: -31.6,
    face: 0,
    wallet: 'everyday',
  },
  {
    id: 't14',
    name: 'Robert Fox',
    ref: '#0770159',
    status: 'Pending',
    date: 'Feb 26, 2024',
    stamp: 20240226,
    amount: -88.0,
    face: 1,
    wallet: 'everyday',
  },
];

/**
 * Weekly and annual averages, from the same ledger.
 *
 * The reference prints both as 25.460,00, which cannot be true of one account
 * unless it moves exactly the same amount in a week as in a year.
 */
export function averages() {
  const magnitudes = TXNS.map((t) => Math.abs(t.amount));
  const total = magnitudes.reduce((s, v) => s + v, 0);
  /* Fourteen rows across about fourteen weeks. */
  const weekly = total / 14;
  return {
    weekly: Math.round(weekly * 100) / 100,
    weeklyDelta: -11.5,
    annual: Math.round(weekly * 52 * 100) / 100,
    annualDelta: 11.5,
  };
}

/* ---------------------------------------------------------------- wallets */

export interface Wallet {
  id: string;
  label: string;
  note: string;
  balance: number;
  limit: number;
  tone: 'accent' | 'cocoa' | 'bone';
}

export const WALLETS: Wallet[] = [
  {
    id: 'everyday',
    label: 'Everyday',
    note: 'Day to day spending',
    balance: 8420.6,
    limit: 12000,
    tone: 'accent',
  },
  {
    id: 'growth',
    label: 'Growth',
    note: 'Contributions and dividends',
    balance: 46180.25,
    limit: 60000,
    tone: 'cocoa',
  },
  {
    id: 'reserve',
    label: 'Reserve',
    note: 'Held against the unexpected',
    balance: 19340.0,
    limit: 25000,
    tone: 'bone',
  },
];

export const walletFlow = (id: string) => {
  const rows = TXNS.filter((t) => t.wallet === id);
  return {
    in: Math.round(rows.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0) * 100) / 100,
    out: Math.round(rows.filter((t) => t.amount < 0).reduce((s, t) => s - t.amount, 0) * 100) / 100,
    count: rows.length,
  };
};

/** Thirty days of a wallet's balance, seeded. */
export function walletTrail(id: string): number[] {
  const wallet = WALLETS.find((w) => w.id === id) ?? WALLETS[0];
  const next = rng(id.length * 859 + Math.round(wallet.limit));
  const weights = Array.from({ length: 29 }, () => 0.4 + next());
  const sum = weights.reduce((a, b) => a + b, 0);
  const start = wallet.balance * 0.74;
  const out = [Math.round(start * 100) / 100];
  let v = start;
  for (const w of weights) {
    v += (wallet.balance - start) * (w / sum);
    out.push(Math.round(v * 100) / 100);
  }
  return out;
}
