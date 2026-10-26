/**
 * Everything the statistics screen says and counts, so the components stay
 * presentational.
 *
 * **The spelling is corrected.** The reference writes "planned shedule" and
 * "This Weak". A design shot is not an authority on spelling (AGENTS.md,
 * "Fix the reference's mistakes").
 *
 * **The completion figure is computed from the same work list the home
 * screen uses.** The reference calls it 72% on one screen and 66% on
 * another for the same measurement. The list is duplicated here rather than
 * shared, per "One showcase per screen" — two showcases sharing a feature
 * folder would each report the other's blanked files as DRIFT.
 *
 * **The forecast's percentage is derived from the two series.** The
 * reference prints "75% ahead of plan" over bars that do not differ by
 * anything like it.
 */

export const copy = {
  title: 'Tasks',
  progress: 'Progress',
  timeline: 'Timeline',
  dailyChart: 'Daily Progress chart',
  workAreas: 'Work Areas',
  overall: 'Overall Completion',
  completionLabel: 'Project completion',
  onTrack: 'On Track',
  forecast: 'Progress forecast',
  planned: 'Planned',
  actual: 'Actual',
  aheadChip: 'Ahead of plan',
  tipUnit: 'cu yd completed',
  tipWhen: 'This Week',
  month: 'July',
} as const;

export const avatar = require('../../../../assets/images/masonstats/face-1.jpg');

/** The same work list the home screen carries, duplicated on purpose. */
export const areas = [
  { id: 'a1', label: 'Foundations', done: 100 },
  { id: 'a2', label: 'Steel frame', done: 100 },
  { id: 'a3', label: 'Concrete', done: 60 },
  { id: 'a4', label: 'Electrical', done: 25 },
  { id: 'a5', label: 'Fit-out', done: 0 },
] as const;

export const completion = Math.round(areas.reduce((s, a) => s + a.done, 0) / areas.length);

export const weeks = [0.42, 0.58, 0.5, 0.86, 1, 0.64, 0.78] as const;

/** Cubic yards placed per week: what was planned, and what happened. */
export const planned = [820, 980, 1100, 1240, 1180, 1320, 1400] as const;
export const actual = [900, 1120, 1380, 1600, 1740, 1980, 2140] as const;

export const plannedTotal = planned.reduce((a, b) => a + b, 0);
export const actualTotal = actual.reduce((a, b) => a + b, 0);
export const ahead = Math.round(((actualTotal - plannedTotal) / plannedTotal) * 100);

/** The week the tooltip is reading. */
export const peakWeek = actual.length - 1;
export const peakValue = actual[peakWeek];

export const axis = [100, 75, 50, 25, 0];
