/**
 * Everything nordhome says.
 *
 * **R5: labels, not prose.** Every string here is a label, a unit, a count or
 * a state — the board's own words, trimmed to fit, and nothing invented to
 * fill a block out.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const brand = { name: 'Nordvik' };

export const hero = {
  country: 'Norway',
  /** The board's greeting, verbatim. Two lines at 23dp on a 393dp phone. */
  headline: 'Hey, Martin! Tell us where you want to go',
  searchTitle: 'Search places',
  searchMeta: 'Date range · Number of guests',
};

export const sections = {
  relevant: 'The most relevant',
  discover: 'Discover new places',
};

/** Three nights, which is what the price bar on `nordstay` also books. */
export const NIGHTS = 3;

export type Stay = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  /** Each row is one fact; the card joins them with a middot. */
  facts: string[];
  wasNight: number;
  nightly: number;
  image: number;
  /** Only the first card is saved, so the field is optional and declared. */
  saved?: boolean;
};

/**
 * R9: the total under each card is `nightly * NIGHTS`, computed in the card
 * rather than typed here — the board prints €384 for three nights at €91.
 */
export const stays: Stay[] = [
  {
    id: 'raelingen',
    title: 'Lodge in Rælingen',
    rating: 4.96,
    reviews: 217,
    facts: ['4 guests', '2 bedrooms', '2 beds', '1 bathroom'],
    wasNight: 117,
    nightly: 91,
    image: require('../../../../assets/images/nordhome/s1.jpg'),
    saved: true,
  },
  // STEP 1.12 "Tiny home in Rondane"
  // {
  //   id: 'rondane',
  //   title: 'Tiny home in Rondane',
  //   rating: 4.89,
  //   reviews: 143,
  //   facts: ['2 guests', '1 bedroom', '1 bed', '1 bathroom'],
  //   wasNight: 104,
  //   nightly: 82,
  //   image: require('../../../../assets/images/nordhome/s2.jpg'),
  // },
  // STEP 1.13 "Cabin in Lillehammer"
  // {
  //   id: 'lillehammer',
  //   title: 'Cabin in Lillehammer',
  //   rating: 4.93,
  //   reviews: 167,
  //   facts: ['6 guests', '3 bedrooms', '4 beds', '2 bathrooms'],
  //   wasNight: 162,
  //   nightly: 128,
  //   image: require('../../../../assets/images/nordhome/s3.jpg'),
  // },
];

/**
 * Tiles are named for the *kind* of place, not for a town: the photography is
 * free-licensed Nordic and alpine stock, so a tile captioned with a specific
 * fjord would be a picture disagreeing with its label.
 */
export type Place = { id: string; label: string; count: string; image: number };

export const places: Place[] = [
  {
    id: 'fjord',
    label: 'Fjord cabins',
    count: '248 stays',
    image: require('../../../../assets/images/nordhome/d1.jpg'),
  },
  // STEP 1.18 "Mountain hytter"
  // {
  //   id: 'mountain',
  //   label: 'Mountain hytter',
  //   count: '192 stays',
  //   image: require('../../../../assets/images/nordhome/d2.jpg'),
  // },
  // STEP 1.19 "Lakeside stays"
  // {
  //   id: 'lake',
  //   label: 'Lakeside stays',
  //   count: '131 stays',
  //   image: require('../../../../assets/images/nordhome/d3.jpg'),
  // },
];

export const heroImage = require('../../../../assets/images/nordhome/hero.jpg');

export type Tab = {
  id: string;
  label: string;
  glyph: 'discover' | 'heart' | 'bookings' | 'messages';
};

export const tabs: Tab[] = [
  { id: 'discover', label: 'Discover', glyph: 'discover' },
  // STEP 1.22 "Favorites"
  // { id: 'favorites', label: 'Favorites', glyph: 'heart' },
  // STEP 1.23 "Bookings"
  // { id: 'bookings', label: 'Bookings', glyph: 'bookings' },
  // STEP 1.24 "Messages"
  // { id: 'messages', label: 'Messages', glyph: 'messages' },
];
