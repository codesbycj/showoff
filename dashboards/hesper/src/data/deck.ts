/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the firm, the clients, the matters, the people. The
 * reference's own client list names two real companies, which is exactly what
 * rule 8 says a build like this must never carry over invented figures.
 *
 * **One list of matters, and everything else is derived from it.** Billable
 * hours per client, the Top Clients bars, the rate column, the invoices, the
 * monthly billed-and-collected chart and every total on three tabs all read
 * the same eighteen rows. The reference does not do this and it shows: its
 * Top Clients card is titled "by Billable Hours" and labelled in dollars,
 * and its bars get *shorter* as the labels get bigger — $2K, $1.5K, $900K,
 * $750K.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';

export const FIRM = { name: 'Caldrow', domain: 'caldrow.co', principal: 'Rowan Mercer' };

/* ------------------------------------------------------------------ people */

export interface Person {
  id: string;
  name: string;
  role: string;
  face: string;
}

export const TEAM: Person[] = [
  { id: 'p1', name: 'Rowan Mercer', role: 'Managing partner', face: face1 },
  { id: 'p2', name: 'Imani Okafor', role: 'Partner', face: face2 },
  { id: 'p3', name: 'Dara Whitfield', role: 'Senior associate', face: face3 },
  { id: 'p4', name: 'Noor Haddad', role: 'Associate', face: face4 },
  { id: 'p5', name: 'Felix Arden', role: 'Paralegal', face: face5 },
];

export const personOf = (id: string) => TEAM.find((p) => p.id === id) ?? TEAM[0];

/* ----------------------------------------------------------------- clients */

export interface Client {
  id: string;
  name: string;
  sector: string;
  since: number;
}

export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Palmerin Ltd', sector: 'Manufacturing', since: 2019 },
  { id: 'c2', name: 'Marlow Hotels', sector: 'Hospitality', since: 2021 },
  { id: 'c3', name: 'Hindmark Construction', sector: 'Construction', since: 2020 },
  { id: 'c4', name: 'Keystone Civils', sector: 'Infrastructure', since: 2022 },
  { id: 'c5', name: 'Vantor Freight', sector: 'Logistics', since: 2024 },
  { id: 'c6', name: 'Tideway Storage', sector: 'Warehousing', since: 2026 },
  { id: 'c7', name: 'Oakhurst Energy', sector: 'Energy', since: 2023 },
  { id: 'c8', name: 'Brightpoint Media', sector: 'Media', since: 2026 },
  { id: 'c9', name: 'Larkfield Dairy', sector: 'Food', since: 2026 },
  { id: 'c10', name: 'Aster Clinics', sector: 'Healthcare', since: 2025 },
];

export const clientOf = (id: string) => CLIENTS.find((c) => c.id === id) ?? CLIENTS[0];

/* ----------------------------------------------------------------- matters */

export type MatterStatus = 'waiting' | 'review' | 'filed' | 'closed';
export type Priority = 'high' | 'medium' | 'low';
export type MatterType = 'General' | 'Litigation' | 'Advisory' | 'Compliance' | 'Property';

export interface Matter {
  id: string;
  clientId: string;
  title: string;
  type: MatterType;
  /** USD per hour, as the reference's billable column prints it. */
  rate: number;
  hours: number;
  status: MatterStatus;
  priority: Priority;
  ownerId: string;
  opened: string;
  due: string;
}

export const MATTERS: Matter[] = [
  {
    id: 'm01',
    clientId: 'c1',
    title: 'Acquisition of Dorney Works',
    type: 'Advisory',
    rate: 320,
    hours: 186,
    status: 'review',
    priority: 'high',
    ownerId: 'p1',
    opened: '2026-02-03',
    due: '2026-11-12',
  },
  {
    id: 'm02',
    clientId: 'c1',
    title: 'Supply contract review',
    type: 'General',
    rate: 240,
    hours: 92,
    status: 'waiting',
    priority: 'medium',
    ownerId: 'p3',
    opened: '2026-04-21',
    due: '2026-10-30',
  },
  {
    id: 'm03',
    clientId: 'c1',
    title: 'Trademark renewal',
    type: 'Compliance',
    rate: 180,
    hours: 34,
    status: 'closed',
    priority: 'low',
    ownerId: 'p5',
    opened: '2026-01-19',
    due: '2026-06-05',
  },
  {
    id: 'm04',
    clientId: 'c2',
    title: 'Licensing for the Gare Street site',
    type: 'Compliance',
    rate: 260,
    hours: 128,
    status: 'review',
    priority: 'medium',
    ownerId: 'p2',
    opened: '2026-03-09',
    due: '2026-10-28',
  },
  {
    id: 'm05',
    clientId: 'c2',
    title: 'Employment claim, kitchen staff',
    type: 'Litigation',
    rate: 350,
    hours: 96,
    status: 'waiting',
    priority: 'high',
    ownerId: 'p2',
    opened: '2026-05-14',
    due: '2026-10-26',
  },
  {
    id: 'm06',
    clientId: 'c3',
    title: 'Construction permits, phase two',
    type: 'Property',
    rate: 300,
    hours: 164,
    status: 'filed',
    priority: 'medium',
    ownerId: 'p3',
    opened: '2026-02-17',
    due: '2026-11-20',
  },
  {
    id: 'm07',
    clientId: 'c3',
    title: 'Subcontractor dispute',
    type: 'Litigation',
    rate: 350,
    hours: 58,
    status: 'review',
    priority: 'high',
    ownerId: 'p4',
    opened: '2026-06-02',
    due: '2026-10-29',
  },
  {
    id: 'm08',
    clientId: 'c4',
    title: 'Bridge maintenance framework',
    type: 'Advisory',
    rate: 280,
    hours: 142,
    status: 'filed',
    priority: 'low',
    ownerId: 'p1',
    opened: '2026-01-28',
    due: '2026-12-04',
  },
  {
    id: 'm09',
    clientId: 'c4',
    title: 'Health and safety audit response',
    type: 'Compliance',
    rate: 220,
    hours: 46,
    status: 'closed',
    priority: 'medium',
    ownerId: 'p5',
    opened: '2026-03-30',
    due: '2026-07-18',
  },
  {
    id: 'm10',
    clientId: 'c5',
    title: 'Insurance consultancy',
    type: 'Advisory',
    rate: 250,
    hours: 118,
    status: 'waiting',
    priority: 'medium',
    ownerId: 'p4',
    opened: '2026-04-06',
    due: '2026-10-31',
  },
  {
    id: 'm11',
    clientId: 'c5',
    title: 'Cross-border haulage terms',
    type: 'General',
    rate: 210,
    hours: 74,
    status: 'review',
    priority: 'low',
    ownerId: 'p3',
    opened: '2026-05-25',
    due: '2026-11-07',
  },
  {
    id: 'm12',
    clientId: 'c6',
    title: 'Warehouse lease renegotiation',
    type: 'Property',
    rate: 300,
    hours: 88,
    status: 'filed',
    priority: 'medium',
    ownerId: 'p2',
    opened: '2026-03-16',
    due: '2026-11-14',
  },
  {
    id: 'm13',
    clientId: 'c6',
    title: 'Goods-in-transit claim',
    type: 'Litigation',
    rate: 330,
    hours: 41,
    status: 'waiting',
    priority: 'high',
    ownerId: 'p4',
    opened: '2026-07-08',
    due: '2026-10-27',
  },
  {
    id: 'm14',
    clientId: 'c7',
    title: 'Grid connection agreement',
    type: 'Advisory',
    rate: 420,
    hours: 96,
    status: 'review',
    priority: 'high',
    ownerId: 'p1',
    opened: '2026-02-24',
    due: '2026-11-03',
  },
  {
    id: 'm15',
    clientId: 'c7',
    title: 'Environmental reporting',
    type: 'Compliance',
    rate: 240,
    hours: 52,
    status: 'closed',
    priority: 'low',
    ownerId: 'p5',
    opened: '2026-01-13',
    due: '2026-05-29',
  },
  {
    id: 'm16',
    clientId: 'c8',
    title: 'Content licensing library',
    type: 'General',
    rate: 230,
    hours: 64,
    status: 'waiting',
    priority: 'low',
    ownerId: 'p3',
    opened: '2026-06-18',
    due: '2026-11-21',
  },
  {
    id: 'm17',
    clientId: 'c8',
    title: 'Defamation response',
    type: 'Litigation',
    rate: 380,
    hours: 37,
    status: 'review',
    priority: 'high',
    ownerId: 'p2',
    opened: '2026-08-04',
    due: '2026-10-25',
  },
  {
    id: 'm18',
    clientId: 'c1',
    title: 'Pension scheme advice',
    type: 'Advisory',
    rate: 290,
    hours: 57,
    status: 'filed',
    priority: 'low',
    ownerId: 'p1',
    opened: '2026-05-07',
    due: '2026-12-11',
  },
  {
    id: 'm19',
    clientId: 'c9',
    title: 'Supplier terms, first review',
    type: 'General',
    rate: 190,
    hours: 28,
    status: 'waiting',
    priority: 'low',
    ownerId: 'p5',
    opened: '2026-08-19',
    due: '2026-11-18',
  },
  {
    id: 'm20',
    clientId: 'c10',
    title: 'Patient records audit',
    type: 'Compliance',
    rate: 260,
    hours: 44,
    status: 'review',
    priority: 'medium',
    ownerId: 'p4',
    opened: '2026-07-22',
    due: '2026-10-24',
  },
];

export const matterValue = (m: Matter) => m.rate * m.hours;

export const STATUS_LABEL: Record<MatterStatus, string> = {
  waiting: 'Waiting document',
  review: 'In review',
  filed: 'Filed',
  closed: 'Closed',
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const STATUSES: MatterStatus[] = ['waiting', 'review', 'filed', 'closed'];

export const openMatters = () => MATTERS.filter((m) => m.status !== 'closed');

export const countByStatus = (status: MatterStatus) =>
  MATTERS.filter((m) => m.status === status).length;

/** Billable hours per client, summed from the matters. */
export const clientHours = (clientId: string) =>
  MATTERS.filter((m) => m.clientId === clientId).reduce((t, m) => t + m.hours, 0);

export const clientValue = (clientId: string) =>
  MATTERS.filter((m) => m.clientId === clientId).reduce((t, m) => t + matterValue(m), 0);

/** The Top Clients card: the five with the most billable hours. */
export const topClients = (n = 5) =>
  CLIENTS.map((c) => ({ client: c, hours: clientHours(c.id), value: clientValue(c.id) }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, n);

/** Hours per fee earner, for the workload card on Task. */
export const workload = () =>
  TEAM.map((p) => ({
    person: p,
    hours: MATTERS.filter((m) => m.ownerId === p.id).reduce((t, m) => t + m.hours, 0),
    open: MATTERS.filter((m) => m.ownerId === p.id && m.status !== 'closed').length,
  })).sort((a, b) => b.hours - a.hours);

/* ------------------------------------------------------------ total profit */

export interface Range {
  id: string;
  label: string;
  /** What the date pill reads when this range is chosen. */
  period: string;
  points: number;
  ticks: string[];
  /** The range's own total, which the curve is scaled to land on. */
  total: number;
}

export const RANGES: Range[] = [
  {
    id: '30d',
    label: 'Last 30 days',
    period: '12 September – 12 October 2026',
    points: 30,
    ticks: ['12 Sep', '19 Sep', '26 Sep', '3 Oct', '12 Oct'],
    total: 102_524.2,
  },
  {
    id: 'q',
    label: 'This quarter',
    period: 'July – September 2026',
    points: 13,
    ticks: ['Jul', 'Aug', 'Sep', 'Oct'],
    total: 318_940,
  },
  {
    id: 'ytd',
    label: 'Year to date',
    period: 'January – October 2026',
    points: 10,
    ticks: ['Jan', 'Mar', 'May', 'Jul', 'Oct'],
    total: 1_142_380,
  },
];

/*
 * A gentle ramp, not a doubling.
 *
 * The first shape ran 0.52 to 1.0, which put the "+20%" chip the reference
 * draws at +60.7% — growth no consultancy posts in a month. The chip is the
 * last third of the range against the first third, so the shape has to be
 * read through that rather than chosen on its own.
 */
const SHAPE = [0.74, 0.71, 0.78, 0.76, 0.82, 0.8, 0.86, 0.85, 0.9, 0.92];

/**
 * Profit per point over a range, seeded, and scaled so the points add up to
 * the range's own total — the headline is then the sum of the curve rather
 * than a figure printed beside it.
 */
export function profitSeries(rangeId: string): number[] {
  const range = RANGES.find((r) => r.id === rangeId) ?? RANGES[0];
  const next = rng(4517 + range.points);
  const raw = Array.from({ length: range.points }, (_, i) => {
    const f = SHAPE[Math.floor((i / range.points) * SHAPE.length)] ?? 0.6;
    return f * (0.82 + next() * 0.36);
  });
  const sum = raw.reduce((t, v) => t + v, 0);
  const values = raw.map((v) => Math.round(((v / sum) * range.total + Number.EPSILON) * 100) / 100);
  /* The rounding residual goes on the last point, so the sum is the printed
     headline to the cent rather than a few cents off it. */
  const drift = Math.round((range.total - values.reduce((t, v) => t + v, 0)) * 100) / 100;
  values[values.length - 1] = Math.round((values[values.length - 1] + drift) * 100) / 100;
  return values;
}

export const profitTotal = (values: number[]) =>
  Math.round(values.reduce((t, v) => t + v, 0) * 100) / 100;

/** The "+20%" chip: the last third of the range against the first third. */
export function profitGrowth(values: number[]): number {
  const cut = Math.max(1, Math.round(values.length / 3));
  const first = values.slice(0, cut).reduce((t, v) => t + v, 0);
  const last = values.slice(-cut).reduce((t, v) => t + v, 0);
  return Math.round(((last - first) / first) * 1000) / 10;
}

/** What a point on the profit curve is, for the tooltip. */
export function pointLabel(rangeId: string, i: number): string {
  if (rangeId === '30d') {
    const d = new Date(2026, 8, 12 + i);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }
  if (rangeId === 'q') return 'Week ' + (i + 1) + ', Q3';
  return new Date(2026, i, 1).toLocaleDateString('en-GB', { month: 'long' });
}

/* ------------------------------------------------------------- the metrics */

/**
 * The reference's four tiles, computed.
 *
 * It prints "Increase in success cases 97.5%" — which is a rate wearing the
 * word "increase" — so the labels say what the figures are.
 */
export interface Metric {
  id: string;
  label: string;
  value: string;
  icon: 'growth' | 'clients' | 'cases' | 'returning';
}

const CLOSED_WON = ['m03', 'm09'];

export function metrics(): Metric[] {
  const ytd = profitSeries('ytd');
  const steps = ytd.slice(1).map((v, i) => (v - ytd[i]) / ytd[i]);
  const avgGrowth = (steps.reduce((t, v) => t + v, 0) / steps.length) * 100;

  const newClients = CLIENTS.filter((c) => c.since === 2026).length;
  const closed = MATTERS.filter((m) => m.status === 'closed');
  const returning = CLIENTS.filter(
    (c) => MATTERS.filter((m) => m.clientId === c.id).length > 1,
  ).length;

  return [
    {
      id: 'growth',
      label: 'Avg. monthly growth',
      value: avgGrowth.toFixed(2) + '%',
      icon: 'growth',
    },
    {
      id: 'clients',
      label: 'New clients this year',
      value: Math.round((newClients / CLIENTS.length) * 1000) / 10 + '%',
      icon: 'clients',
    },
    {
      id: 'cases',
      label: 'Matters closed in favour',
      value: Math.round((CLOSED_WON.length / Math.max(1, closed.length)) * 1000) / 10 + '%',
      icon: 'cases',
    },
    {
      id: 'returning',
      label: 'Clients with repeat work',
      value: Math.round((returning / CLIENTS.length) * 1000) / 10 + '%',
      icon: 'returning',
    },
  ];
}

/* ---------------------------------------------------------------- invoices */

export type InvoiceStatus = 'paid' | 'due' | 'overdue';

export interface Invoice {
  id: string;
  matterId: string;
  issued: string;
  due: string;
  /** A share of the matter's value; the two halves of a split matter add up. */
  amount: number;
  status: InvoiceStatus;
  paidOn?: string;
}

/*
 * Twenty-two invoices against eighteen matters: the four largest are billed
 * in two stages, and the pair sums to the matter's own value. Nothing here
 * carries a figure that is not `rate x hours`.
 */
const half = (id: string) => Math.round(matterValue(MATTERS.find((m) => m.id === id)!) / 2);
const whole = (id: string) => matterValue(MATTERS.find((m) => m.id === id)!);

export const INVOICES: Invoice[] = [
  {
    id: 'INV-2601',
    matterId: 'm01',
    issued: '2026-04-30',
    due: '2026-05-30',
    amount: half('m01'),
    status: 'paid',
    paidOn: '2026-05-21',
  },
  {
    id: 'INV-2602',
    matterId: 'm01',
    issued: '2026-09-30',
    due: '2026-10-30',
    amount: whole('m01') - half('m01'),
    status: 'due',
  },
  {
    id: 'INV-2603',
    matterId: 'm02',
    issued: '2026-07-31',
    due: '2026-08-30',
    amount: whole('m02'),
    status: 'paid',
    paidOn: '2026-08-18',
  },
  {
    id: 'INV-2604',
    matterId: 'm03',
    issued: '2026-03-10',
    due: '2026-04-09',
    amount: whole('m03'),
    status: 'paid',
    paidOn: '2026-03-28',
  },
  {
    id: 'INV-2605',
    matterId: 'm04',
    issued: '2026-06-30',
    due: '2026-07-30',
    amount: half('m04'),
    status: 'paid',
    paidOn: '2026-07-14',
  },
  {
    id: 'INV-2606',
    matterId: 'm04',
    issued: '2026-08-31',
    due: '2026-09-30',
    amount: whole('m04') - half('m04'),
    status: 'due',
  },
  {
    id: 'INV-2607',
    matterId: 'm05',
    issued: '2026-08-31',
    due: '2026-09-30',
    amount: whole('m05'),
    status: 'overdue',
  },
  {
    id: 'INV-2608',
    matterId: 'm06',
    issued: '2026-05-29',
    due: '2026-06-28',
    amount: half('m06'),
    status: 'paid',
    paidOn: '2026-06-16',
  },
  {
    id: 'INV-2609',
    matterId: 'm06',
    issued: '2026-09-30',
    due: '2026-10-30',
    amount: whole('m06') - half('m06'),
    status: 'due',
  },
  {
    id: 'INV-2610',
    matterId: 'm07',
    issued: '2026-08-31',
    due: '2026-09-30',
    amount: whole('m07'),
    status: 'overdue',
  },
  {
    id: 'INV-2611',
    matterId: 'm08',
    issued: '2026-04-30',
    due: '2026-05-30',
    amount: half('m08'),
    status: 'paid',
    paidOn: '2026-05-12',
  },
  {
    id: 'INV-2612',
    matterId: 'm08',
    issued: '2026-08-31',
    due: '2026-09-30',
    amount: whole('m08') - half('m08'),
    status: 'paid',
    paidOn: '2026-09-22',
  },
  {
    id: 'INV-2613',
    matterId: 'm09',
    issued: '2026-07-20',
    due: '2026-08-19',
    amount: whole('m09'),
    status: 'paid',
    paidOn: '2026-08-03',
  },
  {
    id: 'INV-2614',
    matterId: 'm10',
    issued: '2026-07-31',
    due: '2026-08-30',
    amount: whole('m10'),
    status: 'paid',
    paidOn: '2026-08-25',
  },
  {
    id: 'INV-2615',
    matterId: 'm11',
    issued: '2026-07-31',
    due: '2026-08-30',
    amount: whole('m11'),
    status: 'due',
  },
  {
    id: 'INV-2616',
    matterId: 'm12',
    issued: '2026-06-30',
    due: '2026-07-30',
    amount: whole('m12'),
    status: 'paid',
    paidOn: '2026-07-27',
  },
  {
    id: 'INV-2617',
    matterId: 'm13',
    issued: '2026-08-31',
    due: '2026-09-30',
    amount: whole('m13'),
    status: 'due',
  },
  {
    id: 'INV-2618',
    matterId: 'm14',
    issued: '2026-05-29',
    due: '2026-06-28',
    amount: half('m14'),
    status: 'paid',
    paidOn: '2026-06-09',
  },
  {
    id: 'INV-2619',
    matterId: 'm14',
    issued: '2026-08-31',
    due: '2026-09-30',
    amount: whole('m14') - half('m14'),
    status: 'overdue',
  },
  {
    id: 'INV-2620',
    matterId: 'm15',
    issued: '2026-02-27',
    due: '2026-03-29',
    amount: whole('m15'),
    status: 'paid',
    paidOn: '2026-03-16',
  },
  {
    id: 'INV-2621',
    matterId: 'm16',
    issued: '2026-09-30',
    due: '2026-10-30',
    amount: whole('m16'),
    status: 'due',
  },
  {
    id: 'INV-2622',
    matterId: 'm17',
    issued: '2026-10-15',
    due: '2026-11-14',
    amount: whole('m17'),
    status: 'due',
  },
  {
    id: 'INV-2623',
    matterId: 'm19',
    issued: '2026-10-15',
    due: '2026-11-14',
    amount: whole('m19'),
    status: 'due',
  },
  {
    id: 'INV-2624',
    matterId: 'm20',
    issued: '2026-08-31',
    due: '2026-09-30',
    amount: whole('m20'),
    status: 'paid',
    paidOn: '2026-09-15',
  },
  /* m18 was the one matter with no invoice against it, which put the Payment
     tab's billed total 16,530 under the sum of the matter values the Task
     tab prints — two screens, two totals of the same thing. Every matter is
     billed now, and `billed()` is the firm's whole book. */
  {
    id: 'INV-2625',
    matterId: 'm18',
    issued: '2026-09-30',
    due: '2026-10-30',
    amount: whole('m18'),
    status: 'due',
  },
];

export const matterOf = (id: string) => MATTERS.find((m) => m.id === id) ?? MATTERS[0];

export const billed = () => INVOICES.reduce((t, i) => t + i.amount, 0);
export const collected = () =>
  INVOICES.filter((i) => i.status === 'paid').reduce((t, i) => t + i.amount, 0);
export const outstanding = () =>
  INVOICES.filter((i) => i.status !== 'paid').reduce((t, i) => t + i.amount, 0);
export const overdue = () =>
  INVOICES.filter((i) => i.status === 'overdue').reduce((t, i) => t + i.amount, 0);

export const INVOICE_STATUSES: InvoiceStatus[] = ['paid', 'due', 'overdue'];

export const INVOICE_LABEL: Record<InvoiceStatus, string> = {
  paid: 'Paid',
  due: 'Due',
  overdue: 'Overdue',
};

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

/**
 * Billed and collected per month, read off the invoices' own dates: an
 * invoice counts as billed in the month it was issued and as collected in the
 * month it was paid. Nothing is declared twice.
 */
export function billingByMonth(): { month: string; billed: number; collected: number }[] {
  const out = MONTHS.map((month) => ({ month, billed: 0, collected: 0 }));
  for (const inv of INVOICES) {
    const bi = Number(inv.issued.slice(5, 7)) - 1;
    if (out[bi]) out[bi].billed += inv.amount;
    if (inv.paidOn) {
      const ci = Number(inv.paidOn.slice(5, 7)) - 1;
      if (out[ci]) out[ci].collected += inv.amount;
    }
  }
  return out;
}

/* ------------------------------------------------------------ progress case */

export const CASE_WINDOWS = [
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
  { id: 'all', label: 'All open' },
];

/**
 * The Progress Case list, by how soon the matter is due. "Today" is pinned to
 * the deck's own date so the list is the same at every reload (rule 5) — a
 * window read off the real clock empties itself a fortnight after filming.
 */
export const TODAY = '2026-10-23';

export function casesIn(windowId: string): Matter[] {
  const open = openMatters()
    .slice()
    .sort((a, b) => a.due.localeCompare(b.due));
  if (windowId === 'all') return open;
  const until = new Date(TODAY + 'T00:00:00');
  until.setDate(until.getDate() + (windowId === 'week' ? 7 : 31));
  const limit = until.toISOString().slice(0, 10);
  return open.filter((m) => m.due <= limit);
}

export const daysLeft = (due: string) =>
  Math.round(
    (new Date(due + 'T00:00:00').getTime() - new Date(TODAY + 'T00:00:00').getTime()) / 86_400_000,
  );
