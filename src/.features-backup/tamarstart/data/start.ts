/**
 * Everything tamarstart says.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const brand = { name: 'tamarran' };

export const hero = require('../../../../assets/images/tamarstart/hero.jpg');

/** Two lines, as the board sets them. */
export const headline = ['A better way to', 'book Classes'];

/**
 * The body copy.
 *
 * **Trimmed to 92 characters.** The board's own run is 127, over R5's ceiling
 * of 110 for a single run of body copy.
 */
export const body =
  'Find and book live workouts, personal trainers and sport facilities near you.';

export const cta = { primary: 'Get Started', aside: 'I already have an account' };
