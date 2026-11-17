/**
 * Everything vitalday says.
 *
 * **The board's headline is broken grammar and is rewritten** (I1): "By
 * tracking these area consistently score" is not a sentence. R5 says the data
 * file carries what the screen says, and what it says is what the reference
 * says — trimmed to work.
 *
 * **Every figure derives from its own series** (R9): the average marker is the
 * mean of the bars under it, and each ring's sweep is its own completion — so
 * a label and the picture beside it cannot disagree. The board's "Avg 63.0%"
 * sits on a chart whose bars average something else entirely.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const avatar = require('../../../../assets/images/vitalday/avatar.jpg');

export const today = 'Thursday, 28 Jul';

export type Ring = { id: string; label: string; done?: number; unknown?: boolean };

/** `done` is 0 to 1. A day with no reading is `unknown`, and draws a "?". */
export const rings: Ring[] = [
  { id: 'r1', label: 'M', done: 0.82 },
  // STEP 1.07 "T"
  // { id: 'r2', label: 'T', unknown: true },
  // STEP 1.08 "W"
  // { id: 'r3', label: 'W', done: 0.64 },
  // STEP 1.09 "T"
  // { id: 'r4', label: 'T', done: 0.91 },
  // STEP 1.10 "F"
  // { id: 'r5', label: 'F', done: 0.3 },
  // STEP 1.11 "S"
  // { id: 'r6', label: 'S', done: 0.52 },
  // STEP 1.12 "S"
  // { id: 'r7', label: 'S', unknown: true },
];

/** FIX: the board's own line has no verb and no object. */
export const headline = ['Track these areas', 'consistently to score'];

export type Month = { id: string; label: string; value: number; active?: boolean };

export const months: Month[] = [
  { id: 'm1', label: 'Jan', value: 48 },
  // STEP 1.19 "Feb"
  // { id: 'm2', label: 'Feb', value: 61 },
  // STEP 1.20 "Mar"
  // { id: 'm3', label: 'Mar', value: 72 },
  // STEP 1.21 "Apr"
  // { id: 'm4', label: 'Apr', value: 55 },
  // STEP 1.22 "May"
  // { id: 'm5', label: 'May', value: 80 },
  // STEP 1.23 "Jun"
  // { id: 'm6', label: 'Jun', value: 62, active: true },
  // STEP 1.24 "Jul"
  // { id: 'm7', label: 'Jul', value: 69 },
];

/**
 * The average marker.
 *
 * Derived, and safe while `months` is still being staged: an empty array
 * returns 0 rather than dividing by zero (I7).
 */
export function average(): number {
  if (!months.length) return 0;
  return months.reduce((sum, m) => sum + m.value, 0) / months.length;
}

/** The tallest bar, so the plot can be scaled to the data (R9). */
export function peak(): number {
  return months.length ? Math.max(...months.map((m) => m.value), 1) : 1;
}

export const followingTitle = 'Following';

export type Follow = {
  id: string;
  label: string;
  value: string;
  glyph: 'walk' | 'body' | 'heart';
  tint: 'blush' | 'mint' | 'lilac';
};

/** R5: a label, a unit. Never a sentence. */
export const follows: Follow[] = [
  { id: 'f1', label: 'Activity', value: '3.0 points', glyph: 'walk', tint: 'mint' },
  // STEP 1.28 "Body"
  // { id: 'f2', label: 'Body', value: '67.0 kg', glyph: 'body', tint: 'blush' },
  // STEP 1.29 "Heart"
  // { id: 'f3', label: 'Heart', value: '68 bpm', glyph: 'heart', tint: 'lilac' },
];

export function pct(n: number) {
  return `${n.toFixed(1)}%`;
}
