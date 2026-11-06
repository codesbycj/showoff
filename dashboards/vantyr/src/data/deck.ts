/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the platform, the funds, the companies, the holder.
 *
 * **One position list, and every figure derives from it.** Portfolio value,
 * total invested, net multiple, the step chart, the status counts, the
 * syndicate allocations and the company rows are all arithmetic over
 * `POSITIONS`.
 *
 * Private markets have one convention this build takes seriously: **every
 * figure is as of a valuation date**, because a position is marked at an
 * event, not continuously. The reference prints that date and so does this.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';

export const ACCOUNT = {
  holder: 'Rowan Mercer',
  /** Everything on screen is marked as of this date. */
  valuedOn: '28 June 2027',
  currency: 'USD',
};

/* -------------------------------------------------------------- positions */

export type Status = 'Live' | 'Exited' | 'Writing off';

export interface Position {
  id: string;
  name: string;
  kind: 'Company' | 'Fund';
  sector: string;
  status: Status;
  investedOn: string;
  /** What was put in, and what the last valuation marks it at. */
  invested: number;
  netValue: number;
  /** The round or vintage the position was taken in. */
  round: string;
  ownership: number;
  lead: string;
}

export const POSITIONS: Position[] = [
  {
    id: 'p01',
    name: 'Abelough',
    kind: 'Company',
    sector: 'Climate',
    status: 'Live',
    investedOn: '2024-06-30',
    invested: 40_000,
    netValue: 60_000,
    round: 'Seed',
    ownership: 1.4,
    lead: 'Marrow Ventures',
  },
  {
    id: 'p02',
    name: 'Finglory',
    kind: 'Company',
    sector: 'Fintech',
    status: 'Live',
    investedOn: '2024-06-22',
    invested: 5_000,
    netValue: 7_000,
    round: 'Pre-seed',
    ownership: 0.6,
    lead: 'Tessaly Capital',
  },
  {
    id: 'p03',
    name: 'Ravelin Bio',
    kind: 'Company',
    sector: 'Health',
    status: 'Live',
    investedOn: '2025-02-14',
    invested: 12_500,
    netValue: 21_800,
    round: 'Series A',
    ownership: 0.4,
    lead: 'Northgate Partners',
  },
  {
    id: 'p04',
    name: 'Oreholt Robotics',
    kind: 'Company',
    sector: 'Industrial',
    status: 'Live',
    investedOn: '2025-09-08',
    invested: 15_000,
    netValue: 14_200,
    round: 'Seed',
    ownership: 0.9,
    lead: 'Marrow Ventures',
  },
  {
    id: 'p05',
    name: 'Castwyn Fund I',
    kind: 'Fund',
    sector: 'Generalist',
    status: 'Live',
    investedOn: '2023-11-02',
    invested: 25_000,
    netValue: 41_500,
    round: 'Vintage 2023',
    ownership: 0.8,
    lead: 'Castwyn',
  },
  {
    id: 'p06',
    name: 'Pellmoor Labs',
    kind: 'Company',
    sector: 'Software',
    status: 'Exited',
    investedOn: '2022-04-19',
    invested: 8_000,
    netValue: 26_400,
    round: 'Seed',
    ownership: 1.1,
    lead: 'Tessaly Capital',
  },
  {
    id: 'p07',
    name: 'Sunderwick Mobility',
    kind: 'Company',
    sector: 'Mobility',
    status: 'Writing off',
    investedOn: '2023-03-27',
    invested: 10_000,
    netValue: 1_200,
    round: 'Pre-seed',
    ownership: 1.8,
    lead: 'Harlow Angels',
  },
  {
    id: 'p08',
    name: 'Quenby Data',
    kind: 'Company',
    sector: 'Software',
    status: 'Live',
    investedOn: '2026-01-26',
    invested: 18_000,
    netValue: 24_600,
    round: 'Series A',
    ownership: 0.5,
    lead: 'Northgate Partners',
  },
  {
    id: 'p09',
    name: 'Larkfield Agri',
    kind: 'Company',
    sector: 'Food',
    status: 'Live',
    investedOn: '2026-05-11',
    invested: 9_500,
    netValue: 11_900,
    round: 'Seed',
    ownership: 0.7,
    lead: 'Castwyn',
  },
  {
    id: 'p10',
    name: 'Verity Grid',
    kind: 'Company',
    sector: 'Energy',
    status: 'Live',
    investedOn: '2026-10-04',
    invested: 22_000,
    netValue: 29_800,
    round: 'Series A',
    ownership: 0.6,
    lead: 'Marrow Ventures',
  },
  {
    id: 'p11',
    name: 'Castwyn Fund II',
    kind: 'Fund',
    sector: 'Generalist',
    status: 'Live',
    investedOn: '2026-02-20',
    invested: 30_000,
    netValue: 34_500,
    round: 'Vintage 2026',
    ownership: 0.9,
    lead: 'Castwyn',
  },
  {
    id: 'p12',
    name: 'Brackwell Optics',
    kind: 'Company',
    sector: 'Hardware',
    status: 'Exited',
    investedOn: '2022-09-13',
    invested: 6_500,
    netValue: 18_200,
    round: 'Seed',
    ownership: 1.3,
    lead: 'Harlow Angels',
  },
];

export const invested = () => POSITIONS.reduce((t, p) => t + p.invested, 0);
export const netValue = () => POSITIONS.reduce((t, p) => t + p.netValue, 0);

/** MOIC: what the book is worth for every dollar put in. */
export const multiple = () => netValue() / invested();
export const gain = () => netValue() - invested();

export const realised = () =>
  POSITIONS.filter((p) => p.status === 'Exited').reduce((t, p) => t + p.netValue, 0);
export const unrealised = () =>
  POSITIONS.filter((p) => p.status !== 'Exited').reduce((t, p) => t + p.netValue, 0);

export const positionMultiple = (p: Position) => p.netValue / p.invested;

export const countStatus = (s: Status) => POSITIONS.filter((p) => p.status === s).length;

export const STATUS_TOKEN: Record<Status, string> = {
  Live: '--color-live',
  Exited: '--color-exited',
  'Writing off': '--color-written',
};

/* ------------------------------------------------------------ value steps */

export interface Span {
  id: string;
  label: string;
  points: number;
  ticks: string[];
}

export const SPANS: Span[] = [
  { id: '1y', label: '1 year', points: 12, ticks: ['Jul', 'Oct', 'Jan', 'Apr', 'Jun'] },
  { id: '3y', label: '3 years', points: 18, ticks: ['2024', '2025', '2026', '2027'] },
  { id: 'all', label: 'All time', points: 24, ticks: ['2022', '2023', '2024', '2025', '2027'] },
];

/**
 * Net value over time, as a **step**: a private position is marked at an
 * event — a round, a secondary, an exit — and holds that mark until the next
 * one. A smooth curve would claim a valuation nobody made. The reference
 * draws a step too, which is the best thing in it.
 */
export function valueSteps(spanId: string): number[] {
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[2];
  const next = rng(5501 + span.points);
  const end = netValue();
  const start = end * (span.id === '1y' ? 0.74 : span.id === '3y' ? 0.42 : 0.12);
  /* A handful of marks, held flat between them. */
  const marks = span.id === '1y' ? 4 : span.id === '3y' ? 6 : 8;
  const steps: number[] = [];
  let current = start;
  for (let i = 0; i < span.points; i++) {
    if (i % Math.max(1, Math.round(span.points / marks)) === 0 && i > 0) {
      current += ((end - start) / marks) * (0.6 + next() * 0.9);
    }
    steps.push(Math.round(Math.min(current, end * 1.02)));
  }
  steps[steps.length - 1] = end;
  return steps;
}

export function stepLabel(spanId: string, i: number, points: number): string {
  if (spanId === '1y') {
    const d = new Date(2026, 6 + Math.floor((i / points) * 12), 1);
    return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  }
  const years = spanId === '3y' ? 3 : 5;
  const startYear = 2027 - years;
  return String(startYear + Math.floor((i / points) * years));
}

/* ------------------------------------------------------------ syndicates */

export interface Syndicate {
  id: string;
  name: string;
  company: string;
  sector: string;
  /** What the syndicate is raising, and how much is committed so far. */
  target: number;
  committed: number;
  minimum: number;
  closes: string;
  lead: string;
  joined: boolean;
}

export const SYNDICATES: Syndicate[] = [
  {
    id: 's01',
    name: 'Verity Grid, Series A',
    company: 'Verity Grid',
    sector: 'Energy',
    target: 2_400_000,
    committed: 1_860_000,
    minimum: 5_000,
    closes: '2027-07-18',
    lead: 'Marrow Ventures',
    joined: true,
  },
  {
    id: 's02',
    name: 'Hollowfield, Seed',
    company: 'Hollowfield',
    sector: 'Software',
    target: 900_000,
    committed: 742_000,
    minimum: 2_500,
    closes: '2027-07-04',
    lead: 'Castwyn',
    joined: false,
  },
  {
    id: 's03',
    name: 'Pell & Row, Pre-seed',
    company: 'Pell & Row',
    sector: 'Consumer',
    target: 450_000,
    committed: 198_000,
    minimum: 1_000,
    closes: '2027-08-01',
    lead: 'Harlow Angels',
    joined: false,
  },
  {
    id: 's04',
    name: 'Quenby Data, Series A',
    company: 'Quenby Data',
    sector: 'Software',
    target: 3_100_000,
    committed: 3_100_000,
    minimum: 10_000,
    closes: '2027-06-12',
    lead: 'Northgate Partners',
    joined: true,
  },
  {
    id: 's05',
    name: 'Ravelin Bio, Series B',
    company: 'Ravelin Bio',
    sector: 'Health',
    target: 5_600_000,
    committed: 2_240_000,
    minimum: 25_000,
    closes: '2027-09-05',
    lead: 'Northgate Partners',
    joined: false,
  },
  {
    id: 's06',
    name: 'Drayton Metals, Seed',
    company: 'Drayton Metals',
    sector: 'Industrial',
    target: 1_200_000,
    committed: 384_000,
    minimum: 5_000,
    closes: '2027-08-22',
    lead: 'Marrow Ventures',
    joined: false,
  },
  {
    id: 's07',
    name: 'Larkfield Agri, Bridge',
    company: 'Larkfield Agri',
    sector: 'Food',
    target: 600_000,
    committed: 540_000,
    minimum: 2_500,
    closes: '2027-07-29',
    lead: 'Castwyn',
    joined: true,
  },
  {
    id: 's08',
    name: 'Oreholt Robotics, Seed II',
    company: 'Oreholt Robotics',
    sector: 'Industrial',
    target: 1_800_000,
    committed: 612_000,
    minimum: 5_000,
    closes: '2027-09-19',
    lead: 'Harlow Angels',
    joined: false,
  },
  {
    id: 's09',
    name: 'Tideway Storage, Growth',
    company: 'Tideway Storage',
    sector: 'Logistics',
    target: 4_200_000,
    committed: 1_134_000,
    minimum: 10_000,
    closes: '2027-10-02',
    lead: 'Northgate Partners',
    joined: false,
  },
  {
    id: 's10',
    name: 'Marlow Hotels, Series B',
    company: 'Marlow Hotels',
    sector: 'Hospitality',
    target: 7_500_000,
    committed: 6_900_000,
    minimum: 25_000,
    closes: '2027-07-11',
    lead: 'Castwyn',
    joined: false,
  },
  {
    id: 's11',
    name: 'Abelough, Series A',
    company: 'Abelough',
    sector: 'Climate',
    target: 3_400_000,
    committed: 3_400_000,
    minimum: 10_000,
    closes: '2027-06-28',
    lead: 'Marrow Ventures',
    joined: true,
  },
  {
    id: 's12',
    name: 'Brackwell Optics, Bridge',
    company: 'Brackwell Optics',
    sector: 'Hardware',
    target: 800_000,
    committed: 268_000,
    minimum: 2_500,
    closes: '2027-09-30',
    lead: 'Harlow Angels',
    joined: false,
  },
  {
    id: 's13',
    name: 'Finglory, Seed II',
    company: 'Finglory',
    sector: 'Fintech',
    target: 1_600_000,
    committed: 912_000,
    minimum: 5_000,
    closes: '2027-08-14',
    lead: 'Tessaly Capital',
    joined: false,
  },
  {
    id: 's14',
    name: 'Sunderwick Mills, Recap',
    company: 'Sunderwick Mills',
    sector: 'Industrial',
    target: 2_100_000,
    committed: 441_000,
    minimum: 5_000,
    closes: '2027-10-16',
    lead: 'Northgate Partners',
    joined: false,
  },
];

export const filled = (s: Syndicate) => (s.committed / s.target) * 100;

/* -------------------------------------------------------------- companies */

export interface Company {
  id: string;
  name: string;
  sector: string;
  stage: string;
  /** Headcount and last-round valuation, as a company page would carry. */
  team: number;
  valuation: number;
  founded: number;
  held: boolean;
}

export const COMPANIES: Company[] = POSITIONS.filter((p) => p.kind === 'Company').map((p, i) => ({
  id: 'c' + (i + 1),
  name: p.name,
  sector: p.sector,
  stage: p.round,
  team: 8 + ((i * 13) % 54),
  /* Valuation implied by the position's mark and its ownership — one figure,
     not a second invented one. */
  valuation: Math.round(p.netValue / (p.ownership / 100) / 1000) * 1000,
  founded: 2016 + ((i * 3) % 8),
  held: p.status !== 'Writing off',
}));

/* -------------------------------------------------------------- activity */

export interface Note {
  id: string;
  kind: 'report' | 'press' | 'record' | 'achievement';
  title: string;
  detail: string;
  at: string;
  face?: string;
}

export const FACES = [face1, face2, face3, face4];

export const NOTES: Note[] = [
  {
    id: 'n1',
    kind: 'report',
    title: 'New report from Abelough',
    detail: 'Abelough · Q2 2027 · 14 pages',
    at: 'Today',
    face: face1,
  },
  {
    id: 'n2',
    kind: 'press',
    title: 'Mention in press: Finglory',
    detail: 'Finglory raised a bridge at a 1.4× markup',
    at: 'Today',
    face: face2,
  },
  {
    id: 'n3',
    kind: 'achievement',
    title: 'Castwyn Fund I returned capital',
    detail: 'First distribution, $12,400 released',
    at: 'Yesterday',
    face: face3,
  },
  {
    id: 'n4',
    kind: 'report',
    title: 'New report from Quenby Data',
    detail: 'Quenby Data · H1 2027 · 9 pages',
    at: '3 days ago',
    face: face4,
  },
  {
    id: 'n5',
    kind: 'record',
    title: 'Net value passed $290,000',
    detail: 'A personal record for this portfolio',
    at: '5 days ago',
  },
  {
    id: 'n6',
    kind: 'press',
    title: 'Mention in press: Verity Grid',
    detail: 'Named in a national grid pilot',
    at: 'Last week',
    face: face1,
  },
  {
    id: 'n7',
    kind: 'report',
    title: 'New report from Ravelin Bio',
    detail: 'Ravelin Bio · Q2 2027 · 22 pages',
    at: 'Last week',
    face: face2,
  },
  {
    id: 'n8',
    kind: 'achievement',
    title: 'Pellmoor Labs exit completed',
    detail: 'Acquired; 3.3× returned on a $8,000 position',
    at: '2 weeks ago',
    face: face3,
  },
  {
    id: 'n9',
    kind: 'report',
    title: 'New report from Castwyn Fund II',
    detail: 'Castwyn Fund II · H1 2027 · 31 pages',
    at: '2 weeks ago',
    face: face4,
  },
  {
    id: 'n10',
    kind: 'press',
    title: 'Mention in press: Oreholt Robotics',
    detail: 'Shortlisted for a national manufacturing award',
    at: '3 weeks ago',
    face: face1,
  },
  {
    id: 'n11',
    kind: 'achievement',
    title: 'Larkfield Agri closed its bridge',
    detail: 'Oversubscribed; your allocation held at 0.7%',
    at: '3 weeks ago',
    face: face2,
  },
  {
    id: 'n12',
    kind: 'record',
    title: 'Twelfth position added',
    detail: 'Verity Grid, Series A — $22,000 committed',
    at: 'Last month',
  },
];

/* ------------------------------------------------------------- documents */

export interface TaxDoc {
  id: string;
  label: string;
  year: number;
  status: 'Ready' | 'Awaiting' | 'Submitted';
}

export const TAX_DOCS: TaxDoc[] = [
  { id: 't1', label: 'Annual statement', year: 2026, status: 'Ready' },
  { id: 't2', label: 'Capital gains summary', year: 2026, status: 'Ready' },
  { id: 't3', label: 'Investor declaration', year: 2027, status: 'Awaiting' },
];

export const awaitingDocs = () => TAX_DOCS.filter((d) => d.status === 'Awaiting').length;
