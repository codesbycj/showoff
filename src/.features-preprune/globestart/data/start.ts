/**
 * Everything globestart says.
 *
 * **The progress bar is built from `segments`, not a typed count** (R9), so it
 * cannot disagree with the flow it belongs to.
 */

export const brand = { name: 'GlobeGo' };

export const hero = require('../../../../assets/images/globestart/hero.jpg');

export type Segment = { key: string; done: boolean };

/**
 * The flow's segments, one row each.
 *
 * A count would reveal the whole bar in one beat; the segments are what the
 * bar is made of, so they are rows and the bar fills one at a time (I5's third
 * level). `done` lives on the row rather than being compared to an index, so
 * the bar cannot disagree with the flow it belongs to (R9).
 */
export const segments: Segment[] = [
  { key: 's1', done: true },
  { key: 's2', done: true },
  { key: 's3', done: true },
];

export type Line = { key: string; text: string };

/** Two lines, as the board sets them - and one row each, so the headline
 *  lands line by line rather than all at once. */
export const headline: Line[] = [
  { key: 'h1', text: 'Journeys' },
  { key: 'h2', text: 'Made Simple' },
];

/** R5: one run, 27 characters. A line, not a paragraph. */
export const subline = 'Travel smarter with GlobeGo';

export const slide = { label: 'Continue', hint: 'Slide' };
