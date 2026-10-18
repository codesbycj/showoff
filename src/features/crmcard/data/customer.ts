/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * Everyone carries a free-licensed portrait, bundled and credited in
 * `assets/images/crmcard/CREDITS.md`. The indices match `crmnet`'s, so Eva is
 * the same person on both screens of the board.
 */

export const header = { one: 'Customer', two: 'Information' } as const;

export const customer = {
  name: 'Eva Robinson',
  role: 'CEO. Inc. Alabama Machinery\n& Supply',
  face: 3,
} as const;

export type ActionKey = 'edit' | 'mail' | 'call' | 'book' | 'plan';

export const actions: ActionKey[] = ['edit', 'mail', 'call', 'book', 'plan'];

export const section = { label: 'Detailed Information' } as const;

export const schedule = {
  title: 'Tasks Schedule',
  month: 'October',
  /**
   * The whole month. A calendar that stops on the 21st is a calendar with a
   * hole in it, and three weeks left the screen ending in a band of dead
   * canvas — the one thing a design shot never does.
   */
  days: 31,
  /** The day that is live, and the three with someone booked on them. */
  live: 4,
  booked: [11, 12, 16] as const,
  /** Who is booked on each, in that order. */
  bookedFaces: [1, 0, 2] as const,
} as const;
