/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout. The reference's card carries a real payment network's
 * wordmark over an invented account (rule 8), and its "13 Days / 109 hours,
 * 23 minutes" does not hold either — thirteen days is 312 hours, not 109.
 * Both are corrected here.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  holder: 'Shohanur Rohaman',
  role: 'CEO Assistant',
  org: 'Atelyra Studio',
  date: '19 Tue, December',
};

/* ------------------------------------------------------------------- card */

export interface DebitCard {
  id: string;
  label: string;
  last4: string;
  fee: number;
  linked: string;
}

export const CARDS: DebitCard[] = [
  { id: 'direct', label: 'Direct Debits', last4: '2719', fee: 25.0, linked: 'main account' },
  { id: 'payroll', label: 'Payroll', last4: '4482', fee: 40.0, linked: 'staff account' },
  { id: 'supplier', label: 'Suppliers', last4: '6031', fee: 18.5, linked: 'trading account' },
];

/* ------------------------------------------------------------ dot figures */

export interface Span {
  id: string;
  label: string;
  scale: number;
}

export const SPANS: Span[] = [
  { id: 'weekly', label: 'Weekly', scale: 1 },
  { id: 'monthly', label: 'Monthly', scale: 4.3 },
  { id: 'quarterly', label: 'Quarterly', scale: 13 },
];

export const INCOME = 23194.8;
export const PAID = 8145.2;

/**
 * A dot matrix's filled share.
 *
 * The reference draws two grids of dots with no stated relationship to the
 * figures above them. Here the share filled *is* the figure's share of the
 * pair, so the two grids read against each other.
 */
export const dotShare = (value: number) => value / (INCOME + PAID);

/* ----------------------------------------------------------- growth rate */

export const GROWTH = { pct: 36, delta: 4.2 };

/** Twelve little bars behind the growth figure, seeded. */
export function growthBars(): number[] {
  const next = rng(4211);
  return Array.from({ length: 14 }, (_, i) => Math.round((0.3 + next() * 0.7 + i * 0.015) * 100));
}

/* -------------------------------------------------------------- the clock */

/**
 * The reference reads "13 Days / 109 hours, 23 minutes". Thirteen days is 312
 * hours. The hours are the source here and the days follow them.
 */
export const CLOCK = { hours: 109, minutes: 23 };
export const clockDays = () => Math.floor(CLOCK.hours / 24);
export const clockRemainder = () => CLOCK.hours % 24;

/* ------------------------------------------------------------- main stocks */

export const STOCKS = { value: 16073.49, delta: 9.3, note: 'Extended & Limited' };

export interface Year {
  id: string;
  label: string;
}

export const YEARS: Year[] = [
  { id: 'y2023', label: '2023' },
  { id: 'y2022', label: '2022' },
];

export function stockSeries(yearId: string): number[] {
  const next = rng(yearId.length * 733 + yearId.charCodeAt(yearId.length - 1));
  const end = yearId === 'y2023' ? STOCKS.value : STOCKS.value * 0.78;
  const start = end * 0.62;
  const weights = Array.from({ length: 29 }, () => 0.35 + next());
  const sum = weights.reduce((a, b) => a + b, 0);
  const out = [Math.round(start * 100) / 100];
  let v = start;
  for (const w of weights) {
    v += (end - start) * (w / sum);
    out.push(Math.round((v + (next() - 0.5) * end * 0.06) * 100) / 100);
  }
  out[out.length - 1] = end;
  return out;
}

/* ------------------------------------------------------- activity manager */

export type ChipId = 'team' | 'insights' | 'today';

export const CHIPS: { id: ChipId; label: string }[] = [
  { id: 'team', label: 'Team' },
  { id: 'insights', label: 'Insights' },
  { id: 'today', label: 'Today' },
];

export interface Activity {
  id: string;
  title: string;
  who: string;
  face: number;
  amount: number;
  when: string;
  stamp: number;
  tags: ChipId[];
}

export const ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: 'Supplier invoice cleared',
    who: 'Imani Reyes',
    face: 0,
    amount: -43.2,
    when: 'Today, 09:12',
    stamp: 20231219,
    tags: ['team', 'today'],
  },
  {
    id: 'a2',
    title: 'Payroll run approved',
    who: 'Teodor Blum',
    face: 1,
    amount: -8420.0,
    when: 'Today, 08:40',
    stamp: 20231219,
    tags: ['team', 'today'],
  },
  {
    id: 'a3',
    title: 'Quarterly insight filed',
    who: 'Soraya Khan',
    face: 2,
    amount: 0,
    when: 'Yesterday, 17:05',
    stamp: 20231218,
    tags: ['insights'],
  },
  {
    id: 'a4',
    title: 'Bank loan drawdown',
    who: 'Marcus Enfield',
    face: 3,
    amount: 12000.0,
    when: 'Yesterday, 11:22',
    stamp: 20231218,
    tags: ['team'],
  },
  {
    id: 'a5',
    title: 'HR headcount review',
    who: 'Noor Hadid',
    face: 4,
    amount: 0,
    when: '17 Dec, 15:48',
    stamp: 20231217,
    tags: ['team', 'insights'],
  },
  {
    id: 'a6',
    title: 'Accounting close started',
    who: 'Elena Marchetti',
    face: 5,
    amount: 0,
    when: '17 Dec, 09:00',
    stamp: 20231217,
    tags: ['insights'],
  },
  {
    id: 'a7',
    title: 'Card limit raised',
    who: 'Imani Reyes',
    face: 0,
    amount: 0,
    when: '16 Dec, 14:30',
    stamp: 20231216,
    tags: ['team'],
  },
  {
    id: 'a8',
    title: 'Supplier refund received',
    who: 'Teodor Blum',
    face: 1,
    amount: 318.4,
    when: '15 Dec, 10:02',
    stamp: 20231215,
    tags: ['team'],
  },
  {
    id: 'a9',
    title: 'Projection model updated',
    who: 'Soraya Khan',
    face: 2,
    amount: 0,
    when: '14 Dec, 16:11',
    stamp: 20231214,
    tags: ['insights'],
  },
  {
    id: 'a10',
    title: 'Emergency pot topped up',
    who: 'Marcus Enfield',
    face: 3,
    amount: -2500.0,
    when: '13 Dec, 09:35',
    stamp: 20231213,
    tags: ['team'],
  },
  {
    id: 'a11',
    title: 'Audit note resolved',
    who: 'Noor Hadid',
    face: 4,
    amount: 0,
    when: '12 Dec, 13:19',
    stamp: 20231212,
    tags: ['insights'],
  },
  {
    id: 'a12',
    title: 'Travel spend reimbursed',
    who: 'Elena Marchetti',
    face: 5,
    amount: 640.0,
    when: '11 Dec, 08:55',
    stamp: 20231211,
    tags: ['team'],
  },
];

export interface Plan {
  id: string;
  label: string;
  open: boolean;
}

export const BUSINESS_PLANS: Plan[] = [
  { id: 'loans', label: 'Bank loans', open: true },
  { id: 'accounting', label: 'Accounting', open: false },
  { id: 'hr', label: 'HR management', open: false },
];

/* -------------------------------------------------------------- projection */

export interface ProjectionRow {
  id: string;
  label: string;
  now: number;
  projected: number;
}

export const PROJECTION: ProjectionRow[] = [
  { id: 'revenue', label: 'Revenue', now: 184000, projected: 236000 },
  { id: 'costs', label: 'Direct costs', now: 96400, projected: 112800 },
  { id: 'payroll', label: 'Payroll', now: 52100, projected: 61400 },
  { id: 'overheads', label: 'Overheads', now: 18900, projected: 20100 },
  { id: 'tax', label: 'Tax set aside', now: 14200, projected: 19600 },
];

export function projectionSeries(id: string): number[] {
  const row = PROJECTION.find((r) => r.id === id) ?? PROJECTION[0];
  const next = rng(id.length * 911 + Math.round(row.now / 100));
  const weights = Array.from({ length: 11 }, () => 0.4 + next());
  const sum = weights.reduce((a, b) => a + b, 0);
  const out = [row.now];
  let v = row.now;
  for (const w of weights) {
    v += (row.projected - row.now) * (w / sum);
    out.push(Math.round(v));
  }
  return out;
}

/* ---------------------------------------------------------------- savings */

export interface Pot {
  id: string;
  label: string;
  saved: number;
  target: number;
  note: string;
}

export const POTS: Pot[] = [
  { id: 'runway', label: 'Runway', saved: 182400, target: 240000, note: 'Nine months of costs' },
  { id: 'equipment', label: 'Equipment', saved: 34200, target: 60000, note: 'Studio refit' },
  { id: 'tax', label: 'Tax', saved: 14200, target: 19600, note: 'Set aside quarterly' },
  { id: 'bonus', label: 'Team bonus', saved: 21800, target: 48000, note: 'Paid in July' },
];

export const potTotal = () => POTS.reduce((t, p) => t + p.saved, 0);
