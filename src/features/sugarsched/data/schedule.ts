import { ss } from '../theme';

/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * One correction to the reference, deliberately: its second row reads "Meeting
 * Leed". A design shot is not an authority on its own spelling (AGENTS.md,
 * "Three kinds of reference").
 *
 * The people carry free-licensed portraits, bundled and credited in
 * `assets/images/sugarsched/CREDITS.md`.
 */

export const header = { one: 'Scheduled', two: 'Assignments', face: 1 } as const;

export const assignments = [
  { key: 'sprint', title: 'Design Sprint', status: 'Executed', color: ss.executed, face: 0 },
  { key: 'meeting', title: 'Meeting Lead', status: 'Scheduled', color: ss.scheduled, face: 2 },
  { key: 'review', title: 'Client Review', status: 'Scheduled', color: ss.scheduled, face: 4 },
  { key: 'handover', title: 'Handover', status: 'Executed', color: ss.executed, face: 5 },
] as const;

/**
 * The range picker.
 *
 * October 2023 began on a Sunday, so the grid starts flush and the trailing
 * days spill into November — which is what the reference draws down its right
 * edge, and why `days` and `spill` are separate.
 */
export const picker = {
  title: 'Allocate to\nResolution Team!',
  face: 3,
  month: 'October',
  nextMonth: 'November',
  days: 31,
  spill: [1, 2, 3, 4],
  range: { from: 16, to: 18 },
  startLabel: 'Start Date',
  endLabel: 'End Date',
  start: '2023-10-16',
  end: '2023-10-18',
} as const;
