/**
 * Everything kilnfind says.
 *
 * **The maker names are invented.** The board searches a real brand and names
 * three more in its results; a marketplace is a plausible app, but somebody
 * else's marks are not ours to ship (I1).
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES SS5.4, I7).
 */

export const search = { query: 'Studio Fen' };

/**
 * What the search found, and how it is ordered.
 *
 * **The count is read off the results** (R9), so it cannot claim a number the
 * grid does not hold - and it survives the array being empty while the reveal
 * fills it (I7). A count and a state, not a sentence (R5).
 */
export const resultsLabel = { sort: 'Newest first' };

export type Result = { id: string; name: string; maker: string; price: number; image: number };

export const results: Result[] = [
  {
    id: 'ash',
    name: 'Ash Glaze Vessel',
    maker: 'Studio Fen',
    price: 480,
    image: require('../../../../assets/images/kilnfind/g1.jpg'),
  },
  // STEP 1.10 "Stacked Plates, six"
  // {
  //   id: 'stack',
  //   name: 'Stacked Plates, six',
  //   maker: 'Hollow Ware',
  //   price: 265,
  //   image: require('../../../../assets/images/kilnfind/g2.jpg'),
  // },
  // STEP 1.11 "Unglazed Forms"
  // {
  //   id: 'raw',
  //   name: 'Unglazed Forms',
  //   maker: 'Studio Fen',
  //   price: 390,
  //   image: require('../../../../assets/images/kilnfind/g3.jpg'),
  // },
  // STEP 1.12 "Everyday Cups, four"
  // {
  //   id: 'cups',
  //   name: 'Everyday Cups, four',
  //   maker: 'Mill & Clay',
  //   price: 180,
  //   image: require('../../../../assets/images/kilnfind/g4.jpg'),
  // },
  // STEP 1.13 "Morning Mug"
  // {
  //   id: 'mug',
  //   name: 'Morning Mug',
  //   maker: 'Hollow Ware',
  //   price: 72,
  //   image: require('../../../../assets/images/kilnfind/g5.jpg'),
  // },
  // STEP 1.14 "Market Seconds"
  // {
  //   id: 'market',
  //   name: 'Market Seconds',
  //   maker: 'Mill & Clay',
  //   price: 54,
  //   image: require('../../../../assets/images/kilnfind/g6.jpg'),
  // },
];

export type Tab = { id: string; label: string; glyph: 'home' | 'heart' | 'user'; on?: boolean };

export const tabs: Tab[] = [
  { id: 'home', label: 'Browse', glyph: 'home', on: true },
  // STEP 1.19 "Saved"
  // { id: 'saved', label: 'Saved', glyph: 'heart' },
  // STEP 1.20 "You"
  // { id: 'you', label: 'You', glyph: 'user' },
];

/** One money format, applied once (R9). */
export function money(value: number) {
  return '€' + value.toLocaleString('en-GB');
}
