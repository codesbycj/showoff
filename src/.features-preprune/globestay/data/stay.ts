/**
 * Everything globestay says.
 *
 * **Two of the board's own mistakes are fixed** (I1):
 *
 *   1. It heads the screen "Lake Como" over a photograph of Venice. The hero
 *      baked for this screen is a lake under mountains, so the picture and the
 *      name agree (R9).
 *   2. It writes "Scehdule Overview". A typo is not a design.
 *
 * **The nightly rate and the total derive from one number** (R9), so the
 * headline price and the booking line cannot disagree — the board shows a rate
 * and never says what a stay costs.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const hero = require('../../../../assets/images/globestay/hero.jpg');

export const stay = {
  name: 'Lake Como',
  country: 'Italia',
  rating: 4.9,
  reviews: 318,
  /** Per night. Everything else on the screen derives from this. */
  rate: 899,
  nights: 3,
};

export const unit = '/night';

export type Include = { id: string; label: string; glyph: 'ticket' | 'hotel' | 'meal' };

/** R5: a chip is two words at most. */
export const includes: Include[] = [
  { id: 'ticket', label: 'Ticket', glyph: 'ticket' },
  { id: 'hotel', label: 'Hotel', glyph: 'hotel' },
  { id: 'meal', label: 'Meal', glyph: 'meal' },
];

/** FIX: the board writes "Scehdule Overview". */
export const overview = { title: 'Schedule Overview' };

/**
 * What the place is.
 *
 * **R5: one run, 108 characters.** The board's own paragraph is cut off
 * mid-word by the bottom of its artboard.
 */
export const about =
  'A glacial lake in northern Italy, ringed by villages and dramatic mountains. Boats run from the pier.';

export type Shot = { id: string; photo: number };

/**
 * The other shots.
 *
 * **Mine, not the board's.** The board's sheet ends on its two buttons with
 * its paragraph cropped above them; I3's lever for that space is the section
 * the board cut, and a stay page genuinely carries more than one picture.
 */
export const gallery: Shot[] = [
  { id: 'g1', photo: require('../../../../assets/images/globestay/s1.jpg') },
  { id: 'g2', photo: require('../../../../assets/images/globestay/s2.jpg') },
  { id: 'g3', photo: require('../../../../assets/images/globestay/s3.jpg') },
];

export const actions = { message: 'Message', book: 'Book Now' };

/** The total for the stay. Derived, so it cannot contradict the rate. */
export function total() {
  return stay.rate * Math.max(stay.nights, 1);
}

/** Money, formatted once so every figure on the screen reads the same way. */
export function usd(n: number) {
  return `$${n.toLocaleString('en-US')}`;
}
