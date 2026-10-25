/**
 * The content deck. Every figure, name, project and date on every pane.
 *
 * All of it is invented (rule 5). TWISTY is not a company, nobody here is a
 * real freelancer, and no rate on this screen was ever charged -- which is what
 * lets the build use free-licensed photographs of real people for the faces
 * without the page being able to masquerade as anyone's live product.
 *
 * Components stay presentational and read from here, so a figure is changed in
 * one place and the charts that draw it move with it.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export const FACES = [face1, face2, face3, face4, face5, face6];

export const brand = {
  name: 'TWISTY',
  user: { name: 'Mara Quill', handle: '@maraquill', role: 'Product designer', face: face1 },
};

/* ---------- income ------------------------------------------------------ */

export interface Point {
  /** The chip label under the mark: S, M, T ... or W1, or Jan. */
  label: string;
  /** The full name, for the tooltip and the accessible description. */
  full: string;
  value: number;
}

export interface Range {
  id: 'week' | 'month' | 'year';
  label: string;
  points: Point[];
  /** Change against the previous range of the same length. */
  delta: number;
  caption: string;
  /** Which mark is selected when the range opens. */
  initial: number;
}

/*
 * The week's shape is the reference's own: a dip at the weekend, Tuesday the
 * peak, and Thursday a second smaller one. The month and the year are the same
 * story told at two other resolutions, so the range control has something real
 * to switch between (rule 5) rather than three versions of one curve.
 */
export const RANGES: Range[] = [
  {
    id: 'week',
    label: 'Week',
    initial: 2,
    delta: 20,
    caption: "This week's income is higher than last week's",
    points: [
      { label: 'S', full: 'Sunday', value: 1540 },
      { label: 'M', full: 'Monday', value: 2100 },
      { label: 'T', full: 'Tuesday', value: 2567 },
      { label: 'W', full: 'Wednesday', value: 2040 },
      { label: 'T', full: 'Thursday', value: 2290 },
      { label: 'F', full: 'Friday', value: 1880 },
      { label: 'S', full: 'Saturday', value: 1510 },
    ],
  },
  {
    id: 'month',
    label: 'Month',
    initial: 3,
    delta: 12,
    caption: "This month's income is higher than last month's",
    points: [
      { label: 'W1', full: 'Week 1', value: 9800 },
      { label: 'W2', full: 'Week 2', value: 11450 },
      { label: 'W3', full: 'Week 3', value: 10270 },
      { label: 'W4', full: 'Week 4', value: 13925 },
      { label: 'W5', full: 'Week 5', value: 7360 },
    ],
  },
  {
    id: 'year',
    label: 'Year',
    initial: 9,
    delta: -4,
    caption: 'This year is tracking just below last year',
    points: [
      { label: 'J', full: 'January', value: 28400 },
      { label: 'F', full: 'February', value: 31200 },
      { label: 'M', full: 'March', value: 36750 },
      { label: 'A', full: 'April', value: 34100 },
      { label: 'M', full: 'May', value: 39900 },
      { label: 'J', full: 'June', value: 42300 },
      { label: 'J', full: 'July', value: 37600 },
      { label: 'A', full: 'August', value: 33050 },
      { label: 'S', full: 'September', value: 41800 },
      { label: 'O', full: 'October', value: 45120 },
      { label: 'N', full: 'November', value: 38400 },
      { label: 'D', full: 'December', value: 29750 },
    ],
  },
];

/* ---------- projects ---------------------------------------------------- */

export type PayState = 'paid' | 'unpaid';

export interface Project {
  id: string;
  name: string;
  client: string;
  clientFace: string;
  rate: number;
  pay: PayState;
  tags: string[];
  summary: string;
  location: string;
  when: string;
  /** Per cent complete, for the Projects pane. */
  progress: number;
  /** The tile behind the project's glyph. */
  tint: string;
  glyph: 'code' | 'quill' | 'brush' | 'spark' | 'grid';
  hours: number;
  due: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'webdev',
    name: 'Web Development Project',
    client: 'Halden & Rowe',
    clientFace: face2,
    rate: 10,
    pay: 'paid',
    tags: ['Remote', 'Part-time'],
    summary:
      'This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs.',
    location: 'Germany',
    when: '2h ago',
    progress: 72,
    tint: '#f2543d',
    glyph: 'code',
    hours: 86,
    due: '2024-04-26',
  },
  {
    id: 'copyright',
    name: 'Copyright Project',
    client: 'Ilse Brandt',
    clientFace: face3,
    rate: 10,
    pay: 'unpaid',
    tags: ['Remote', 'Contract'],
    summary:
      'Rewriting the product tour and the onboarding emails, then auditing every legal line that ships with the app.',
    location: 'Netherlands',
    when: '5h ago',
    progress: 40,
    tint: '#2b3340',
    glyph: 'quill',
    hours: 31,
    due: '2024-05-02',
  },
  {
    id: 'webdesign',
    name: 'Web Design Project',
    client: 'Nura Collective',
    clientFace: face4,
    rate: 10,
    pay: 'paid',
    tags: ['Hybrid', 'Full-time'],
    summary:
      'A marketing site rebuilt around one product story, with an illustration set and a component library the team can keep.',
    location: 'Portugal',
    when: '1d ago',
    progress: 88,
    tint: '#3f7ad6',
    glyph: 'brush',
    hours: 112,
    due: '2024-04-19',
  },
  {
    id: 'brandkit',
    name: 'Brand Kit Refresh',
    client: 'Oster Labs',
    clientFace: face5,
    rate: 12,
    pay: 'paid',
    tags: ['Remote', 'Part-time'],
    summary:
      'A wordmark, a type scale and a one-page system that survives being handed to somebody else on a Monday.',
    location: 'Sweden',
    when: '2d ago',
    progress: 55,
    tint: '#7a5cf0',
    glyph: 'spark',
    hours: 44,
    due: '2024-05-10',
  },
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    client: 'Fennimore Group',
    clientFace: face6,
    rate: 14,
    pay: 'unpaid',
    tags: ['Remote', 'Contract'],
    summary:
      'Six screens of reporting for a team that currently reads its numbers out of a spreadsheet on a Friday afternoon.',
    location: 'Ireland',
    when: '3d ago',
    progress: 18,
    tint: '#18a07a',
    glyph: 'grid',
    hours: 9,
    due: '2024-06-01',
  },
  {
    id: 'onboarding',
    name: 'Onboarding Rewrite',
    client: 'Halden & Rowe',
    clientFace: face2,
    rate: 11,
    pay: 'paid',
    tags: ['Remote', 'Part-time'],
    summary:
      'Five screens of first-run, rewritten around what somebody can actually do on day one.',
    location: 'Germany',
    when: '4d ago',
    progress: 100,
    tint: '#d9873c',
    glyph: 'quill',
    hours: 27,
    due: '2024-04-05',
  },
  {
    id: 'iconset',
    name: 'Icon Set, 120 glyphs',
    client: 'Nura Collective',
    clientFace: face4,
    rate: 9,
    pay: 'unpaid',
    tags: ['Remote', 'Fixed price'],
    summary: 'One grid, one stroke width, and a naming scheme the engineers can guess at.',
    location: 'Portugal',
    when: '5d ago',
    progress: 64,
    tint: '#4a4f5c',
    glyph: 'brush',
    hours: 38,
    due: '2024-05-17',
  },
  {
    id: 'designsystem',
    name: 'Design System Audit',
    client: 'Oster Labs',
    clientFace: face5,
    rate: 15,
    pay: 'paid',
    tags: ['Hybrid', 'Contract'],
    summary:
      'Every component counted, every duplicate named, and a short list of what to delete first.',
    location: 'Sweden',
    when: '1w ago',
    progress: 92,
    tint: '#2f6fd0',
    glyph: 'grid',
    hours: 61,
    due: '2024-04-22',
  },
  {
    id: 'microcopy',
    name: 'Microcopy Pass',
    client: 'Ilse Brandt',
    clientFace: face3,
    rate: 10,
    pay: 'paid',
    tags: ['Remote', 'Part-time'],
    summary:
      'Every empty state, error and confirmation in the product, rewritten to say what happened.',
    location: 'Netherlands',
    when: '1w ago',
    progress: 76,
    tint: '#8a4fd4',
    glyph: 'quill',
    hours: 19,
    due: '2024-05-06',
  },
  {
    id: 'motionkit',
    name: 'Motion Guidelines',
    client: 'Fennimore Group',
    clientFace: face6,
    rate: 13,
    pay: 'unpaid',
    tags: ['Remote', 'Contract'],
    summary: 'Durations, easings and the three places the product is allowed to move at all.',
    location: 'Ireland',
    when: '2w ago',
    progress: 34,
    tint: '#167f8c',
    glyph: 'spark',
    hours: 23,
    due: '2024-06-14',
  },
];

/* ---------- people ------------------------------------------------------ */

export type Seniority = 'Senior' | 'Middle' | 'Junior';

export interface Person {
  id: string;
  name: string;
  role: string;
  seniority: Seniority;
  face: string;
  mutual: number;
}

export const CONNECTIONS: Person[] = [
  {
    id: 'randy',
    name: 'Randy Gouse',
    role: 'Cybersecurity specialist',
    seniority: 'Senior',
    face: face2,
    mutual: 12,
  },
  {
    id: 'giana',
    name: 'Giana Schleifer',
    role: 'UX/UI Designer',
    seniority: 'Middle',
    face: face3,
    mutual: 8,
  },
  {
    id: 'omar',
    name: 'Omar Lindqvist',
    role: 'Backend engineer',
    seniority: 'Senior',
    face: face4,
    mutual: 5,
  },
  {
    id: 'nia',
    name: 'Nia Okafor',
    role: 'Motion designer',
    seniority: 'Middle',
    face: face5,
    mutual: 21,
  },
  {
    id: 'teo',
    name: 'Teodor Vrana',
    role: 'Technical writer',
    seniority: 'Junior',
    face: face6,
    mutual: 3,
  },
];

/* ---------- proposals --------------------------------------------------- */

export interface Stat {
  id: string;
  label: string;
  value: number;
  /** Bar heights, 0-1, for the strip under the figure. */
  strip: number[];
  tone: 'line' | 'accent' | 'ink';
}

/*
 * The strips are generated from a fixed seed, not from Math.random(): the same
 * numbers have to come back on every reload, or the chart that was measured is
 * not the chart that gets filmed and every numeric diff is meaningless.
 */
function strip(seed: number, n: number, floor: number): number[] {
  const next = rng(seed);
  return Array.from({ length: n }, () => floor + next() * (1 - floor));
}

export interface ProposalPeriod {
  id: string;
  /** What the date pill shows. */
  date: string;
  stats: Stat[];
}

/*
 * Three periods, not one, because the date pill has to do something (rule 5).
 * The reference shows a single date beside a single set of figures, which is
 * all a still picture can show.
 */
export const PROPOSAL_PERIODS: ProposalPeriod[] = [
  {
    id: 'apr',
    date: '2024-04-11',
    stats: [
      {
        id: 'sent',
        label: 'Proposals sent',
        value: 64,
        strip: strip(10_241, 26, 0.35),
        tone: 'line',
      },
      {
        id: 'interviews',
        label: 'Interviews',
        value: 12,
        strip: strip(70_118, 26, 0.3),
        tone: 'accent',
      },
      { id: 'hires', label: 'Hires', value: 10, strip: strip(31_559, 26, 0.4), tone: 'ink' },
    ],
  },
  {
    id: 'mar',
    date: '2024-03-11',
    stats: [
      {
        id: 'sent',
        label: 'Proposals sent',
        value: 48,
        strip: strip(55_013, 26, 0.3),
        tone: 'line',
      },
      {
        id: 'interviews',
        label: 'Interviews',
        value: 9,
        strip: strip(9_907, 26, 0.26),
        tone: 'accent',
      },
      { id: 'hires', label: 'Hires', value: 6, strip: strip(44_281, 26, 0.34), tone: 'ink' },
    ],
  },
  {
    id: 'feb',
    date: '2024-02-11',
    stats: [
      {
        id: 'sent',
        label: 'Proposals sent',
        value: 71,
        strip: strip(26_644, 26, 0.38),
        tone: 'line',
      },
      {
        id: 'interviews',
        label: 'Interviews',
        value: 14,
        strip: strip(81_120, 26, 0.28),
        tone: 'accent',
      },
      { id: 'hires', label: 'Hires', value: 7, strip: strip(12_765, 26, 0.3), tone: 'ink' },
    ],
  },
];

/* ---------- wallet ------------------------------------------------------ */

export interface Payout {
  id: string;
  from: string;
  face: string;
  project: string;
  amount: number;
  date: string;
  state: 'cleared' | 'pending';
  method: 'Bank transfer' | 'Card' | 'Wire';
}

export const WALLET = {
  balance: 18_430.5,
  available: 14_120.0,
  pending: 4310.5,
  thisMonth: 7920,
  lastMonth: 7065,
  card: { label: 'TWISTY balance', last4: '4417', expires: '09/27' },
};

export const PAYOUTS: Payout[] = [
  {
    id: 'p1',
    from: 'Halden & Rowe',
    face: face2,
    project: 'Web Development Project',
    amount: 2340,
    date: '2024-04-11',
    state: 'cleared',
    method: 'Bank transfer',
  },
  {
    id: 'p2',
    from: 'Nura Collective',
    face: face4,
    project: 'Web Design Project',
    amount: 1880,
    date: '2024-04-09',
    state: 'cleared',
    method: 'Wire',
  },
  {
    id: 'p3',
    from: 'Oster Labs',
    face: face5,
    project: 'Brand Kit Refresh',
    amount: 1240,
    date: '2024-04-05',
    state: 'pending',
    method: 'Card',
  },
  {
    id: 'p4',
    from: 'Fennimore Group',
    face: face6,
    project: 'Analytics Dashboard',
    amount: 3070.5,
    date: '2024-04-02',
    state: 'pending',
    method: 'Bank transfer',
  },
  {
    id: 'p5',
    from: 'Ilse Brandt',
    face: face3,
    project: 'Copyright Project',
    amount: 960,
    date: '2024-03-28',
    state: 'cleared',
    method: 'Card',
  },
  {
    id: 'p6',
    from: 'Halden & Rowe',
    face: face2,
    project: 'Retainer, March',
    amount: 2400,
    date: '2024-03-21',
    state: 'cleared',
    method: 'Bank transfer',
  },
  {
    id: 'p7',
    from: 'Nura Collective',
    face: face4,
    project: 'Illustration set',
    amount: 1540,
    date: '2024-03-14',
    state: 'cleared',
    method: 'Wire',
  },
];

export interface Slice {
  id: string;
  label: string;
  value: number;
  colour: string;
}

export const INCOME_MIX: Slice[] = [
  { id: 'dev', label: 'Development', value: 8600, colour: 'var(--color-accent)' },
  { id: 'design', label: 'Design', value: 6150, colour: 'var(--color-spark)' },
  { id: 'writing', label: 'Writing', value: 2480, colour: 'var(--color-ink)' },
  { id: 'advisory', label: 'Advisory', value: 1200, colour: '#9aa3b2' },
];

/** The last six months of income, for the bar chart under the mix. */
export const MONTHLY: Point[] = [
  { label: 'Nov', full: 'November', value: 6240 },
  { label: 'Dec', full: 'December', value: 4980 },
  { label: 'Jan', full: 'January', value: 7310 },
  { label: 'Feb', full: 'February', value: 6875 },
  { label: 'Mar', full: 'March', value: 7065 },
  { label: 'Apr', full: 'April', value: 7920 },
];

/* ---------- derived series ---------------------------------------------- */

/** A stable 32-bit hash of a string, so a project's series is its own. */
const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/**
 * Hours logged per day over a fortnight, for the sparkline on a project.
 *
 * Seeded off the project's id, so every project has its own shape and that
 * shape is the same on every reload -- the sparkline is measured in one session
 * and filmed in another.
 */
export function hoursSeries(id: string, days = 14): number[] {
  const next = rng(hash(id));
  let level = 2 + next() * 3;
  return Array.from({ length: days }, () => {
    level = Math.max(0, Math.min(8, level + (next() - 0.45) * 3.2));
    return Math.round(level * 10) / 10;
  });
}
