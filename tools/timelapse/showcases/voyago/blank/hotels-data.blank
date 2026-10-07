/**
 * Screen 2 content — the recommended hotels list.
 *
 * The export's own render clips three of these names ("Grand Cosmopolita",
 * "Caesars Palace Duba", and "Five Jumeirah Village" overflowing its card). The
 * markup does not wrap there; the render is at fault, not the copy, so the
 * names are carried in full.
 *
 * `STACKED` carries an explicit element type because it is emptied one entry at
 * a time for the timelapse, and an empty literal would infer `never[]`.
 */

/** The two-line screen title. The third fragment is set in the accent serif. */
export const TITLE = {
  line1: 'Recommended',
  line2: 'hotels',
  accent: 'for you',
} as const;

/** The 360dp photographic card at the bottom of the stack. */
export const FEATURED_HOTEL = {
  name: 'Address\nSky View',
  price: '120$',
  per: 'Night',
  rating: '5.0',
  image: require('../../../../assets/images/voyago/hotel-skyview.jpg') as number,
} as const;

/** Which fill a stacked card takes. Resolved to a hex in the component. */
export type StackedTone = 'orange' | 'mint' | 'white';

export type StackedHotel = { key: string; name: string; tone: StackedTone };

/**
 * The three cards stacked over the featured one, bottom to top.
 *
 * Each overlaps the one below by 24dp and sits a layer higher, so the order
 * here is the paint order. `tone` names the fill rather than giving a hex, so
 * the palette stays in `theme.ts`.
 */
export const STACKED: readonly StackedHotel[] = [
  // STEP 2.13 the orange one
  // {
  //   key: 'grand',
  //   name: 'Grand\nCosmopolitan',
  //   tone: 'orange',
  // },
  // STEP 2.14 the mint one
  // {
  //   key: 'caesars',
  //   name: 'Caesars\nPalace Dubai',
  //   tone: 'mint',
  // },
  // STEP 2.15 the one on top
  // {
  //   key: 'five',
  //   name: 'Five Jumeirah\nVillage',
  //   tone: 'white',
  // },
];
