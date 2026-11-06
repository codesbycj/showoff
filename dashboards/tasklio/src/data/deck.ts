/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the product, the team, every client and every task.
 * The reference calls itself "weihu" and misspells its own name inside a card
 * ("Wehiu product task"); the brand is replaced rather than kept (rule 8).
 *
 * **One task list feeds all three tabs.** The board's columns, the list view
 * and the team's workload all read `TASKS`. Change one task's column and the
 * counts, the column totals, that person's load and the throughput figure all
 * move together.
 */
export const WORKSPACE = {
  name: 'Tasklio',
  team: 'Northside Studio',
  /** The clock everything reads. Frozen, so a take repeats — and, unlike the
      reference's "May / Saturday, Jul 9th 2023", one date rather than three. */
  today: '2023-07-09',
  todayLabel: 'Sunday, 9 July 2023',
  month: 'July 2023',
};

/* ------------------------------------------------------------------- people */

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export interface Person {
  id: string;
  name: string;
  role: string;
  face: string;
  email: string;
  /** Hours they can take this week, from the roster. */
  capacity: number;
}

export const PEOPLE: Person[] = [
  {
    id: 'u1',
    name: 'Brooklyn Simmons',
    role: 'Studio lead',
    face: face1,
    email: 'brooklyn@tasklio.studio',
    capacity: 24,
  },
  {
    id: 'u2',
    name: 'Devon Marsh',
    role: 'Product designer',
    face: face2,
    email: 'devon@tasklio.studio',
    capacity: 32,
  },
  {
    id: 'u3',
    name: 'Ama Boateng',
    role: 'Product designer',
    face: face3,
    email: 'ama@tasklio.studio',
    capacity: 32,
  },
  {
    id: 'u4',
    name: 'Rafał Nowicki',
    role: 'Front-end engineer',
    face: face4,
    email: 'rafal@tasklio.studio',
    capacity: 32,
  },
  {
    id: 'u5',
    name: 'Noor Haddad',
    role: 'Researcher',
    face: face5,
    email: 'noor@tasklio.studio',
    capacity: 24,
  },
  {
    id: 'u6',
    name: 'Theo Lindqvist',
    role: 'Front-end engineer',
    face: face6,
    email: 'theo@tasklio.studio',
    capacity: 32,
  },
];

export const personOf = (id: string) => PEOPLE.find((p) => p.id === id) ?? PEOPLE[0];

export const ME = PEOPLE[0];

/* ------------------------------------------------------------------ clients */

export interface Client {
  id: string;
  name: string;
  tint: Tint;
}

export const CLIENTS: Client[] = [
  { id: 'cl1', name: 'Brackwell Bank', tint: 'lilac' },
  { id: 'cl2', name: 'Tessaly Retail', tint: 'peach' },
  { id: 'cl3', name: 'Orvela Health', tint: 'mint' },
  { id: 'cl4', name: 'Larkfield Travel', tint: 'rose' },
  { id: 'cl5', name: 'Kelvo Energy', tint: 'sky' },
];

export const clientOf = (id: string) => CLIENTS.find((c) => c.id === id) ?? CLIENTS[0];

/* -------------------------------------------------------------------- tasks */

export type Column = 'todo' | 'doing' | 'review' | 'done';
export type Tint = 'lilac' | 'peach' | 'mint' | 'rose' | 'sky' | 'blush';

export const COLUMNS: { id: Column; label: string; token: string }[] = [
  { id: 'todo', label: 'To do', token: '--color-todo' },
  { id: 'doing', label: 'In progress', token: '--color-doing' },
  { id: 'review', label: 'In review', token: '--color-review' },
  { id: 'done', label: 'Done', token: '--color-done' },
];

export const COLUMN_DEEP: Record<Column, string> = {
  todo: '--color-todo-deep',
  doing: '--color-doing-deep',
  review: '--color-review-deep',
  done: '--color-done-deep',
};

export interface Step {
  id: string;
  what: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  /** The one sentence that says what still has to happen. */
  note: string;
  tags: string[];
  tint: Tint;
  column: Column;
  clientId: string;
  assigneeIds: string[];
  /** Hours budgeted and logged — the reference prints a percentage with no
      denominator and a dot meter that disagrees with it. */
  budget: number;
  logged: number;
  due: string;
  comments: number;
  files: number;
  steps: Step[];
}

const S = (id: string, what: string, done: boolean): Step => ({ id, what, done });

export const TASKS: Task[] = [
  {
    id: 'k1',
    title: 'Search inspiration for the upcoming project',
    note: 'Twenty references, grouped by what they do rather than how they look.',
    tags: ['#website', '#client'],
    tint: 'lilac',
    column: 'todo',
    clientId: 'cl1',
    assigneeIds: ['u2', 'u5'],
    budget: 8,
    logged: 3,
    due: '12 Jul',
    comments: 12,
    files: 8,
    steps: [
      S('k1s1', 'Pull references', true),
      S('k1s2', 'Group them', false),
      S('k1s3', 'Write the one-pager', false),
    ],
  },
  {
    id: 'k2',
    title: 'Ginko mobile app design',
    note: 'Onboarding screens first; the rest of the flow can wait for research.',
    tags: ['#mobile app', '#client'],
    tint: 'rose',
    column: 'todo',
    clientId: 'cl3',
    assigneeIds: ['u3', 'u1'],
    budget: 20,
    logged: 3,
    due: '18 Jul',
    comments: 7,
    files: 2,
    steps: [
      S('k2s1', 'Create user flow', true),
      S('k2s2', 'Make wireframes', false),
      S('k2s3', 'Design onboarding screens', false),
      S('k2s4', 'Make prototype', false),
    ],
  },
  {
    id: 'k3',
    title: 'Make user flow of the mobile banking app',
    note: 'Two paths only: first run, and returning with a saved card.',
    tags: ['#mobile app', '#client'],
    tint: 'blush',
    column: 'todo',
    clientId: 'cl1',
    assigneeIds: ['u2', 'u3'],
    budget: 12,
    logged: 0,
    due: '20 Jul',
    comments: 4,
    files: 1,
    steps: [S('k3s1', 'Map the happy path', false), S('k3s2', 'Map the failures', false)],
  },
  {
    id: 'k4',
    title: 'Product task and the task process pages',
    note: 'The board, the list and the one task — three pages, one data model.',
    tags: ['#dribbble shot', '#product'],
    tint: 'peach',
    column: 'doing',
    clientId: 'cl2',
    assigneeIds: ['u2', 'u4'],
    budget: 16,
    logged: 14,
    due: '11 Jul',
    comments: 12,
    files: 8,
    steps: [S('k4s1', 'Board', true), S('k4s2', 'List', true), S('k4s3', 'One task', false)],
  },
  {
    id: 'k5',
    title: 'Design CRM shop product page, responsive',
    note: 'Has to hold at 360 as well as it does at 1440.',
    tags: ['#products', '#client'],
    tint: 'mint',
    column: 'doing',
    clientId: 'cl2',
    assigneeIds: ['u3', 'u6'],
    budget: 18,
    logged: 7,
    due: '14 Jul',
    comments: 12,
    files: 8,
    steps: [S('k5s1', 'Desktop', true), S('k5s2', 'Tablet', false), S('k5s3', 'Phone', false)],
  },
  {
    id: 'k6',
    title: 'Rewrite the empty states',
    note: 'Six of them. Each one says what to do next, not what went wrong.',
    tags: ['#product', '#copy'],
    tint: 'sky',
    column: 'doing',
    clientId: 'cl5',
    assigneeIds: ['u5', 'u1'],
    budget: 6,
    logged: 4,
    due: '13 Jul',
    comments: 3,
    files: 0,
    steps: [S('k6s1', 'Draft', true), S('k6s2', 'Review with support', false)],
  },
  {
    id: 'k7',
    title: 'Crypto product landing page, create in webflow',
    note: 'Build from the approved design; no new decisions in the browser.',
    tags: ['#development', '#client'],
    tint: 'rose',
    column: 'review',
    clientId: 'cl5',
    assigneeIds: ['u4', 'u6'],
    budget: 14,
    logged: 13,
    due: '10 Jul',
    comments: 12,
    files: 8,
    steps: [
      S('k7s1', 'Build sections', true),
      S('k7s2', 'Responsive pass', true),
      S('k7s3', 'Hand over', false),
    ],
  },
  {
    id: 'k8',
    title: 'Network video platform, web app design and develop',
    note: 'Waiting on a decision about the player before the rest can move.',
    tags: ['#product', '#client'],
    tint: 'lilac',
    column: 'review',
    clientId: 'cl3',
    assigneeIds: ['u2', 'u4', 'u6'],
    budget: 24,
    logged: 22,
    due: '10 Jul',
    comments: 12,
    files: 8,
    steps: [
      S('k8s1', 'Design', true),
      S('k8s2', 'Build', true),
      S('k8s3', 'Player decision', false),
    ],
  },
  {
    id: 'k9',
    title: 'Redesign grab website landing and login pages',
    note: 'Review comments are in; two of them need a design answer.',
    tags: ['#website', '#client'],
    tint: 'blush',
    column: 'review',
    clientId: 'cl4',
    assigneeIds: ['u5'],
    budget: 10,
    logged: 9,
    due: '11 Jul',
    comments: 12,
    files: 8,
    steps: [S('k9s1', 'Landing', true), S('k9s2', 'Login', true)],
  },
  {
    id: 'k10',
    title: 'Create Odyah app prototype for notification in Figma',
    note: 'Clickable through the three notification states.',
    tags: ['#mobile app', '#client'],
    tint: 'sky',
    column: 'review',
    clientId: 'cl4',
    assigneeIds: ['u3', 'u5'],
    budget: 8,
    logged: 8,
    due: '09 Jul',
    comments: 12,
    files: 8,
    steps: [S('k10s1', 'Build the prototype', true), S('k10s2', 'Record a walkthrough', true)],
  },
  {
    id: 'k11',
    title: 'Affinto product, full service',
    note: 'Everything shipped. Keeping it here until the invoice clears.',
    tags: ['#mobile app', '#client'],
    tint: 'sky',
    column: 'done',
    clientId: 'cl3',
    assigneeIds: ['u2', 'u4', 'u6'],
    budget: 40,
    logged: 41,
    due: '07 Jul',
    comments: 7,
    files: 2,
    steps: [
      S('k11s1', 'Branding', true),
      S('k11s2', 'Mobile app design and development', true),
      S('k11s3', 'Landing page design and development', true),
      S('k11s4', 'Dashboard design and development', true),
      S('k11s5', 'Marketing', true),
    ],
  },
  {
    id: 'k12',
    title: 'Design Moli app product page redesign',
    note: 'Approved on the second round.',
    tags: ['#products', '#client'],
    tint: 'blush',
    column: 'done',
    clientId: 'cl2',
    assigneeIds: ['u3'],
    budget: 12,
    logged: 11,
    due: '05 Jul',
    comments: 12,
    files: 8,
    steps: [S('k12s1', 'First round', true), S('k12s2', 'Second round', true)],
  },
  {
    id: 'k13',
    title: 'Accessibility pass on the booking flow',
    note: 'Contrast, focus order and labels. Two bugs raised and fixed.',
    tags: ['#product', '#a11y'],
    tint: 'mint',
    column: 'done',
    clientId: 'cl4',
    assigneeIds: ['u6', 'u5'],
    budget: 10,
    logged: 9,
    due: '06 Jul',
    comments: 5,
    files: 3,
    steps: [S('k13s1', 'Audit', true), S('k13s2', 'Fix', true), S('k13s3', 'Re-check', true)],
  },
];

export const taskOf = (id: string) => TASKS.find((t) => t.id === id) ?? TASKS[0];

export const inColumn = (c: Column) => TASKS.filter((t) => t.column === c);

/** Steps done over steps, which is what the card's meter draws. */
export const stepProgress = (t: Task) =>
  t.steps.length ? (t.steps.filter((s) => s.done).length / t.steps.length) * 100 : 0;

export const hoursProgress = (t: Task) => Math.min(100, (t.logged / t.budget) * 100);

export const TAGS = Array.from(new Set(TASKS.flatMap((t) => t.tags))).sort();

export const TINTS: Record<Tint, string> = {
  lilac: 'var(--color-tint-lilac)',
  peach: 'var(--color-tint-peach)',
  mint: 'var(--color-tint-mint)',
  rose: 'var(--color-tint-rose)',
  sky: 'var(--color-tint-sky)',
  blush: 'var(--color-tint-blush)',
};

/* ------------------------------------------------------------- the figures */

export const tasksOf = (personId: string) => TASKS.filter((t) => t.assigneeIds.includes(personId));

/** A task's hours are split evenly across the people on it. */
export const loadOf = (personId: string) =>
  tasksOf(personId)
    .filter((t) => t.column !== 'done')
    .reduce((h, t) => h + t.budget / t.assigneeIds.length, 0);

export const loadPercent = (personId: string) =>
  (loadOf(personId) / personOf(personId).capacity) * 100;

export const openTasks = () => TASKS.filter((t) => t.column !== 'done').length;

export const dueThisWeek = () =>
  TASKS.filter((t) => t.column !== 'done' && Number(t.due.slice(0, 2)) <= 14).length;

export const overdue = () =>
  TASKS.filter((t) => t.column !== 'done' && Number(t.due.slice(0, 2)) < 9).length;

export const hoursBudgeted = () => TASKS.reduce((h, t) => h + t.budget, 0);
export const hoursLogged = () => TASKS.reduce((h, t) => h + t.logged, 0);
