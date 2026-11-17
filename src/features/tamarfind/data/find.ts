/**
 * Everything tamarfind says.
 *
 * **The venues are invented.** The board names "GymNation Stars", "GMAX GYM"
 * and "Catalonia" at a real street address; a rebuild that ships a real
 * business's name and location is impersonation, so these are fictional clubs
 * on an invented street. Named in the handover.
 *
 * **Prices come from one table** (R9), shared with the sibling screens, so a
 * card and a detail page cannot disagree about what a session costs.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const brand = { name: 'tamarran' };

export const search = { placeholder: 'Try another keyword or filter your search' };

export type Category = {
  id: string;
  label: string;
  glyph: 'strength' | 'swim' | 'cardio' | 'yoga';
};

export const categories = {
  title: 'Category',
  /** R5: a chip is two words at most. */
  items: [
    { id: 'strength', label: 'Strength', glyph: 'strength' },
    { id: 'swim', label: 'Swimming', glyph: 'swim' },
    { id: 'cardio', label: 'Cardio', glyph: 'cardio' },
    { id: 'yoga', label: 'Yoga', glyph: 'yoga' },
  ] as Category[],
};

export type Pin = { id: string; label: string; x: number; y: number; active?: boolean };

/** Positions are fractions of the map's own box, so they hold at any width. */
export const pins: Pin[] = [
  { id: 'p1', label: 'Harbour Lifts', x: 0.22, y: 0.22 },
  // STEP 1.23 "Atlas Strength"
  // { id: 'p2', label: 'Atlas Strength', x: 0.56, y: 0.42, active: true },
  // STEP 1.24 "Mesa Fitness"
  // { id: 'p3', label: 'Mesa Fitness', x: 0.27, y: 0.68 },
];

export type Venue = {
  id: string;
  name: string;
  photo: number;
  rating: number;
  reviews: number;
  address: string;
  classes: number;
  /** Hours per session, as a range. Only some venues publish one. */
  hours?: string;
};

export const venue: Venue = {
  id: 'atlas',
  name: 'Atlas Strength',
  photo: require('../../../../assets/images/tamarfind/gym.jpg'),
  rating: 4.8,
  reviews: 130,
  address: '6157 Marin Rd, Al Zahra',
  classes: 16,
  hours: '1–2 hours per session',
};

/** One price table for the board. A session, and what a month of them costs. */
export const PRICE = { session: 23, month: 200 };

export const card = { reserve: 'Reserve', courseLabel: 'Course' };

export type Tab = { id: string; label: string; glyph: 'explore' | 'saved' | 'me' | 'search' };

/** The board labels every tab "Lorem Ipsum". R5: a label is a label. */
export const tabs: Tab[] = [
  { id: 'explore', label: 'Explore', glyph: 'explore' },
  // STEP 1.34 "Saved"
  // { id: 'saved', label: 'Saved', glyph: 'saved' },
  // STEP 1.35 "Account"
  // { id: 'me', label: 'Account', glyph: 'me' },
  // STEP 1.36 "Search"
  // { id: 'search', label: 'Search', glyph: 'search' },
];

/** Money, formatted once so every figure on the board reads the same way. */
export function usd(n: number) {
  return `$${n.toFixed(2)}`;
}
