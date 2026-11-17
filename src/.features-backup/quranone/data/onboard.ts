/**
 * Everything quranone says.
 *
 * **The board's body copy has no punctuation at all** — "Discover holy verses
 * with translation audio bookmarks daily progress" is a list with the commas
 * missing. R5 says the data file carries what the screen says; here it says it
 * readably. Named in the handover.
 *
 * **The pager's dot count is `steps`, not a typed number** (R9), so it cannot
 * disagree with the flow it belongs to.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const brand = { name: 'Qurania', skip: 'Skip' };

/** Three screens in the flow, and this is the first. */
export const steps = 3;
export const step = 0;

/** Two lines, as the board sets them. */
export const headline = ['Read Quran With', 'Peace Daily'];

/** FIX: the board's own line runs the list together with no commas. */
export const body = 'Holy verses with translation, audio, bookmarks and daily progress.';

export const cta = { primary: 'Get Started' };

export type Star = { id: string; x: number; y: number; r: number; o: number };

/**
 * The stars, placed by fraction so they hold at any width (I2).
 *
 * Fixed rather than random: a reveal that re-randomised them would change
 * pixels on a step that is supposed to change nothing else, and the per-step
 * diff would read it as noise.
 */
export const stars: Star[] = [
  { id: 's1', x: 0.12, y: 0.1, r: 1.6, o: 0.7 },
  { id: 's2', x: 0.28, y: 0.17, r: 2.2, o: 0.9 },
  { id: 's3', x: 0.44, y: 0.08, r: 1.3, o: 0.6 },
  { id: 's4', x: 0.62, y: 0.14, r: 2, o: 0.85 },
  { id: 's5', x: 0.78, y: 0.09, r: 1.5, o: 0.7 },
  { id: 's6', x: 0.9, y: 0.2, r: 2.1, o: 0.8 },
  { id: 's7', x: 0.2, y: 0.28, r: 1.4, o: 0.55 },
  { id: 's8', x: 0.84, y: 0.33, r: 1.7, o: 0.6 },
  { id: 's9', x: 0.08, y: 0.4, r: 1.2, o: 0.45 },
  { id: 's10', x: 0.94, y: 0.44, r: 1.4, o: 0.5 },
];
