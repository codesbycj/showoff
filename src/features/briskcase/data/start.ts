/**
 * Everything the task detail says and counts, so the components stay
 * presentational.
 *
 * **The spelling is corrected throughout.** The reference writes "Ux
 * Research", "High Priorty", "Managment", "Enhace ... throught", and "Mark as
 * Complate". A design shot is not an authority on spelling (AGENTS.md, "Fix
 * the reference's mistakes").
 *
 * **The rail's fill is computed from the dates.** The reference draws a bar
 * at roughly 45% between "Sep 1" and "Sep 10" and says nothing about where
 * today is; here `today` sits between `start` and `end` and the share falls
 * out of the three.
 *
 * **"2h 14 min" is formatted from minutes**, so the figure and the label
 * cannot drift apart.
 */

export const copy = {
  titleLines: [[{ text: 'Wallet App', weight: 'bold' }], [{ text: 'UX Research', weight: 'bold' }]],
  tags: ['High Priority', 'Management'],
  timeLabel: 'Time spent',
  description: 'Task Description',
  body: 'Enhance the wallet app UX through targeted research, identifying user needs and streamlining usability for optimal satisfaction.',
  attachments: 'Attachments',
  checklist: 'Checklist',
  addSubtask: '+ Add Subtask',
  primary: 'Mark as Complete',
} as const;

export const minutesSpent = 134;

export const start = new Date(2026, 8, 1);
export const end = new Date(2026, 8, 10);
export const today = new Date(2026, 8, 5);

export const files = ['Instructions.pdf', 'Estimates.pdf'] as const;

export const checklist = [
  { id: 's1', text: 'Identify key user scenarios', done: true },
  { id: 's2', text: 'Study functionality and UX of similar apps', done: false },
  { id: 's3', text: 'Conduct testing of current user paths', done: false },
  { id: 's4', text: 'Evaluate current security measures', done: false },
] as const;

const day = 24 * 60 * 60 * 1000;

/** How far through the window today is, clamped to it. */
export const progress = Math.min(
  1,
  Math.max(0, (today.getTime() - start.getTime()) / (end.getTime() - start.getTime())),
);

export const label = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export const timeSpent = Math.floor(minutesSpent / 60) + 'h ' + String(minutesSpent % 60) + ' min';

export const days = Math.round((end.getTime() - start.getTime()) / day);
