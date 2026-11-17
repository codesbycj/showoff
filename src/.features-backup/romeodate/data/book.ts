/**
 * Everything romeodate says — the booking form with the month open.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses every field that only appears on a later row
 * (RULES §5.4, INSPO-RULES I7).
 *
 * Copy follows the reference (I1) with its mistakes corrected (also I1).
 */

export const venue = {
  name: 'Romeo Lane · Civil Lines',
  // Bullet separators live in a JS string, never a JSX attribute — an
  // attribute string does not process escapes (RULES Part 7).
  tags: 'Crafted Cocktails • Gourmet Cuisine • Best Bar',
  address: '7 Bell Yard, Holborn',
} as const;

export const fields = {
  dateLabel: 'Date',
  dateValue: 'Sat 13 Dec',
  timeLabel: 'Time',
  timeEmpty: 'Choose Time',
  partyLabel: 'Party size',
  /** FIX: the reference reads "1 Guests" on both booking screens. */
  partyUnit: (n: number) => `${n} ${n === 1 ? 'Guest' : 'Guests'}`,
  requests: 'Special Requests',
  requestsHint: 'Any dietary restriction, Celebrations',
  bookingBy: 'Booking by',
  namePlaceholder: 'Enter your name',
  /** Invented — the reference crops before any way to finish the booking. */
  confirm: 'Confirm Booking',
} as const;

export const month = {
  title: 'December 2025',
  /** Sunday-first, matching the reference's "S M T W T F S" header row. */
  weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const,
} as const;

/**
 * December 2025, weeks starting Sunday. `0` is a blank cell.
 *
 * Checked rather than copied: the 1st is a Monday and the 13th a Saturday, so
 * the reference's grid — a leading blank, then 1 under M, and 13 under the
 * trailing S — is correct and is reproduced as drawn. The reference gets this
 * right; several of its other screens do not, which is why it was checked.
 */
export const weeks: number[][] = [
  [0, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, 0, 0, 0],
];

export const selectedDay = 13;
export const defaultParty = 1;
