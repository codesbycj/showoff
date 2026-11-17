/**
 * Everything quranthree says.
 *
 * **The board's body copy has no punctuation** — "Fill your heart with peace
 * through daily Quran reading and reflection" runs on without a stop. R5 says
 * the data file carries what the screen says; here it says it readably.
 *
 * **The pager's dot count is `steps`, not a typed number** (R9), so it cannot
 * disagree with the flow it belongs to.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const brand = { name: 'Qurania', skip: 'Skip' };

/** Three screens in the flow, and this is the last. */
export const steps = 3;
export const step = 2;

/** Two lines, as the board sets them. */
export const headline = ['Light Your Heart', 'With Quran'];

/** FIX: the board's own line runs on with no stop. */
export const body = 'Fill your heart with peace through daily reading and reflection.';

export const cta = { primary: 'Next' };

export type Star = { id: string; x: number; y: number; r: number; o: number };

/** Fixed rather than random, so a reveal step that should change nothing
 *  else does not move them (and the per-step diff stays honest). */
export const stars: Star[] = [
  { id: 's1', x: 0.1, y: 0.12, r: 1.5, o: 0.6 },
  { id: 's2', x: 0.26, y: 0.07, r: 2, o: 0.8 },
  { id: 's3', x: 0.72, y: 0.1, r: 1.3, o: 0.55 },
  { id: 's4', x: 0.88, y: 0.18, r: 1.8, o: 0.7 },
  { id: 's5', x: 0.18, y: 0.26, r: 1.2, o: 0.45 },
  { id: 's6', x: 0.58, y: 0.05, r: 1.6, o: 0.65 },
  { id: 's7', x: 0.94, y: 0.34, r: 1.3, o: 0.5 },
];

export type Arch = { id: string; x: number; w: number; h: number };

/**
 * The arcade along the base of the dome.
 *
 * Positions and sizes are fractions of the scene's own box, so the colonnade
 * holds at any width (I2). Each is a flat shape standing for the *idea* of an
 * arch (§2.5), not a trace of one.
 */
export const arcade: Arch[] = [
  { id: 'a1', x: 0.3, w: 0.07, h: 0.17 },
  { id: 'a2', x: 0.42, w: 0.07, h: 0.19 },
  { id: 'a3', x: 0.54, w: 0.07, h: 0.19 },
  { id: 'a4', x: 0.66, w: 0.07, h: 0.17 },
];
