/**
 * Everything tamarstart says.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const brand = { name: 'tamarran' };

export const hero = require('../../../../assets/images/tamarstart/hero.jpg');

export type Line = { key: string; text: string };

/** Two lines, as the board sets them - and one row each, so the headline
 *  lands line by line rather than all at once (I5's third level). */
export const headline: Line[] = [
  { key: 'h1', text: 'A better way to' },
  // STEP 1.06 h2
  // { key: 'h2', text: 'book Classes' },
];

/**
 * The body copy.
 *
 * **Trimmed to 92 characters.** The board's own run is 127, over R5's ceiling
 * of 110 for a single run of body copy.
 */
export const body = 'Find and book live workouts, personal trainers and sport facilities near you.';

export const cta = { primary: 'Get Started', aside: 'I already have an account' };
