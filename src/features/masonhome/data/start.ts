/**
 * Everything the project update says and counts, so the components stay
 * presentational.
 *
 * **One set of numbers drives every figure.** The reference calls the same
 * thing "Project Snapshot 72%" on one screen and "Overall Completion 66%" on
 * another; they are the same measurement under two names, and a dashboard
 * whose headline contradicts itself two screens apart is worse than one with
 * no headline. Here `completion` is computed from the work logged in
 * `areas`, and both screens read it.
 *
 * **"Spent 40% Total" is computed too**, from `spent` against `budget`.
 *
 * **No emoji.** The reference ends its greeting with a waving hand. An emoji
 * is a different glyph on every platform and simply absent for some
 * codepoints on Windows, so it is never shipped as UI (AGENTS.md).
 */

export const copy = {
  greetLines: [
    [{ text: 'Hey Rubel,', weight: 'bold' }],
    [
      { text: "Here's your ", weight: 'light' },
      { text: 'project', weight: 'bold', accent: true },
    ],
    [{ text: 'update.', weight: 'bold', accent: true }],
  ],
  snapshot: 'Project Snapshot',
  completionLabel: 'Project completion',
  onTrack: 'On Track',
  budgetLabel: 'Budget',
  spentLabel: 'Spent',
  spendChip: 'Total Spend',
  tasks: "Today's Tasks",
  viewAll: 'View All',
} as const;

export const avatar = require('../../../../assets/images/masonhome/face-1.jpg');

/** In whole pounds, so nothing is ever a float. */
export const budget = 120000;
export const spent = 48000;

/** The work the project is made of. `completion` falls out of it. */
export const areas = [
  { id: 'a1', label: 'Foundations', done: 100 },
  { id: 'a2', label: 'Steel frame', done: 100 },
  { id: 'a3', label: 'Concrete', done: 60 },
  { id: 'a4', label: 'Electrical', done: 25 },
  { id: 'a5', label: 'Fit-out', done: 0 },
] as const;

export const completion = Math.round(areas.reduce((s, a) => s + a.done, 0) / areas.length);
export const spentShare = Math.round((spent / budget) * 100);

/** The snapshot chart: work logged per week, as a share of the best week. */
export const weeks = [0.42, 0.58, 0.5, 0.86, 1, 0.64, 0.78] as const;
export const budgetBars = [0.35, 0.5, 0.78, 1, 0.62, 0.4] as const;
export const spentBars = [0.3, 0.46, 0.6, 0.88, 1, 0.7] as const;

export const tasks = [
  { id: 't1', title: 'Install steel frame', where: 'Building A', state: 'In progress' },
  { id: 't2', title: 'Pour level 3 slab', where: 'Building A', state: 'In progress' },
  { id: 't3', title: 'First-fix electrical', where: 'Building B', state: 'Delayed' },
] as const;

export const money = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
