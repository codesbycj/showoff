/**
 * Everything globestart says.
 *
 * **The progress bar's segment count is `steps`, not a typed number** (R9), so
 * it cannot disagree with the flow it belongs to.
 */

export const brand = { name: 'GlobeGo' };

export const hero = require('../../../../assets/images/globestart/hero.jpg');

/** Three segments, and this is the last. */
export const steps = 3;
export const step = 2;

/** Two lines, as the board sets them. */
export const headline = ['Journeys', 'Made Simple'];

/** R5: one run, 27 characters. A line, not a paragraph. */
export const subline = 'Travel smarter with GlobeGo';

export const slide = { label: 'Continue', hint: 'Slide' };
