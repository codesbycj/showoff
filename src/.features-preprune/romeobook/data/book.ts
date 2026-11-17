/**
 * Everything romeobook says.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses every field that only appears on a later row
 * (RULES §5.4, INSPO-RULES I7).
 *
 * Copy follows the reference (I1) with its mistakes corrected (also I1). Each
 * fix is marked FIX and repeated in the handover.
 */

export type Day = { id: string; name: string; num: string; sold?: boolean };

export const venue = {
  name: 'Romeo Lane · Civil Lines',
  // The reference sets these with bullet separators. A JSX attribute string
  // would render the escape literally, so this is a JS string (Part 7).
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
  /** FIX: the reference reads "Enter Your name" — mid-sentence capital. */
  namePlaceholder: 'Enter your name',
  /**
   * Invented. The reference crops mid-form, so it shows no way to finish the
   * booking. I3 licenses filling the foot with the row the board cuts off, and
   * a booking screen without a confirm is not a working app (I2).
   */
  confirm: 'Confirm Booking',
} as const;

/**
 * Ten days, because the strip is a horizontal scroller. The reference shows
 * the fifth chip clipped by the card's edge, and R2 is explicit: a row that
 * runs off the edge is a scrolling row, not a wrap — a wrap physically cannot
 * reproduce it.
 */
export const days: Day[] = [
  { id: 'd10', name: 'Wed', num: '10' },
  { id: 'd11', name: 'Thu', num: '11' },
  { id: 'd12', name: 'Fri', num: '12' },
  { id: 'd13', name: 'Sat', num: '13' },
  { id: 'd14', name: 'Sun', num: '14' },
  { id: 'd15', name: 'Mon', num: '15' },
  { id: 'd16', name: 'Tue', num: '16' },
  { id: 'd17', name: 'Wed', num: '17' },
  { id: 'd18', name: 'Thu', num: '18' },
  { id: 'd19', name: 'Fri', num: '19' },
];

export const defaultDay = 'd13';
export const defaultParty = 1;
