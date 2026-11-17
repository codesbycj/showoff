/**
 * Everything alpenstay says.
 *
 * **The hotel and its region are invented** (I1); the board names a real one.
 *
 * **R9: the stay total is the nightly rate times the nights**, so the two
 * figures on the screen cannot disagree.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES SS5.4, I7).
 */

export const stay = {
  name: 'Lenas Donau Lodge',
  region: 'Tyrolean Alps',
  reviews: '72k reviews',
  nightly: 80,
  nights: 10,
  cta: 'Book now',
};

export type Shot = { id: string; image: number };

/** Three frames, because the pager draws three dots (R9). */
export const gallery: Shot[] = [
  { id: 'g1', image: require('../../../../assets/images/alpenstay/g1.jpg') },
  { id: 'g2', image: require('../../../../assets/images/alpenstay/g2.jpg') },
  { id: 'g3', image: require('../../../../assets/images/alpenstay/g3.jpg') },
];

export type Fact = { id: string; label: string; glyph: 'pin' | 'party' | 'calendar' };

export const facts: Fact[] = [
  { id: 'centre', label: '1 km to centre', glyph: 'pin' },
  { id: 'guests', label: '2 guests', glyph: 'party' },
  { id: 'nights', label: '10 nights', glyph: 'calendar' },
];

export type Amenity = { id: string; label: string; glyph: 'bed' | 'wifi' | 'tv' };

export const amenities: Amenity[] = [
  { id: 'bed', label: '1 king bed', glyph: 'bed' },
  { id: 'wifi', label: 'Free wi-fi', glyph: 'wifi' },
  { id: 'tv', label: 'Smart TV', glyph: 'tv' },
];

/** R9: the total the button books is the rate times the nights. */
export function stayTotal() {
  return stay.nightly * Math.max(stay.nights, 1);
}
