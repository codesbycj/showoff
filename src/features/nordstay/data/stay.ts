/**
 * Everything nordstay says.
 *
 * **R5: labels, not prose.** The one sentence on the screen is the board's own
 * check-in note, at 66 characters.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const stay = {
  title: 'Entire cabin in Lillehammer',
  rating: 4.92,
  reviews: 116,
  kind: 'Entire home',
  host: 'Hosted by Isabelle',
  dates: '18 - 21 Oct',
  nights: 3,
  /**
   * R9: the bar's total is `nightly * nights` = €384. The board prints €384
   * under "3 nights" beside a listing it priced at €91 a night, which is €273
   * — the one arithmetic mistake on the board, fixed by computing it.
   */
  nightly: 128,
};

export const hostAvatar = require('../../../../assets/images/nordstay/host.jpg');

export type Shot = { id: string; image: number };

/** Four frames, because the pager counts four dots (R9). */
export const gallery: Shot[] = [
  { id: 'g1', image: require('../../../../assets/images/nordstay/g1.jpg') },
  // STEP 1.05 g2
  // { id: 'g2', image: require('../../../../assets/images/nordstay/g2.jpg') },
  // STEP 1.06 g3
  // { id: 'g3', image: require('../../../../assets/images/nordstay/g3.jpg') },
  // STEP 1.07 g4
  // { id: 'g4', image: require('../../../../assets/images/nordstay/g4.jpg') },
];

export const amenityTitle = 'Amenities';

export type Amenity = { id: string; label: string };

export const amenities: Amenity[] = [
  { id: 'wifi', label: 'Wi-Fi' },
  // STEP 1.20 "65" HDTV"
  // { id: 'tv', label: '65" HDTV' },
  // STEP 1.21 "Indoor fireplace"
  // { id: 'fire', label: 'Indoor fireplace' },
  // STEP 1.22 "Hair dryer"
  // { id: 'dryer', label: 'Hair dryer' },
  // STEP 1.23 "Washing machine"
  // { id: 'washer', label: 'Washing machine' },
  // STEP 1.24 "Dryer"
  // { id: 'tumble', label: 'Dryer' },
  // STEP 1.25 "Refrigerator"
  // { id: 'fridge', label: 'Refrigerator' },
  // STEP 1.26 "Dishwasher"
  // { id: 'dish', label: 'Dishwasher' },
];

export type Note = { id: string; glyph: 'key' | 'badge'; title: string; body: string };

export const notes: Note[] = [
  {
    id: 'self',
    glyph: 'key',
    title: 'Self check-in',
    body: 'Check yourself in with the lockbox',
  },
  // STEP 1.28 "Great check-in experience"
  // {
  //   id: 'great',
  //   glyph: 'badge',
  //   title: 'Great check-in experience',
  //   body: '100% of recent guests rated check-in 5 stars',
  // },
];

export const cta = { label: 'Book now' };
