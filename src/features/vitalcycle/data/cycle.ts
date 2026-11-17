/**
 * Everything vitalcycle says.
 *
 * **Three of the board's own mistakes are fixed** (I1):
 *
 *   1. "Our advance**de**d weight tracking feature" → "advanced".
 *   2. "Control you're looking to track progress," — a sentence with no verb
 *      and a trailing comma. Rewritten as a label (R5).
 *   3. The day strip's selected column carries "2.5" with no unit anywhere on
 *      the screen. It is litres of water here, and the unit is printed.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

/** FIX: the board writes "advanceded". */
export const headline = ['Our advanced weight', 'tracking feature'];

export const ranges = ['Week', 'Month', 'Quarter'] as const;

export type Day = {
  id: string;
  label: string;
  /** Litres logged. Only the days already logged carry one. */
  litres?: number;
  today?: boolean;
};

export const days: Day[] = [
  { id: 'd1', label: 'S', litres: 1.8 },
  // STEP 1.07 "M"
  // { id: 'd2', label: 'M', litres: 2.1 },
  // STEP 1.08 "T"
  // { id: 'd3', label: 'T', litres: 1.4 },
  // STEP 1.09 "W"
  // { id: 'd4', label: 'W', litres: 2.5, today: true },
  // STEP 1.10 "T"
  // { id: 'd5', label: 'T' },
  // STEP 1.11 "F"
  // { id: 'd6', label: 'F' },
  // STEP 1.12 "S"
  // { id: 'd7', label: 'S' },
];

export const dayUnit = 'L';

export type Chip = {
  id: string;
  label: string;
  glyph: 'smile' | 'drop' | 'spine' | 'wave' | 'shield';
  tint: 'mint' | 'blue' | 'lilac' | 'blush';
};

/** R5: a chip is two words at most. */
export const chips: Chip[] = [
  { id: 'c1', label: 'Good', glyph: 'smile', tint: 'blush' },
  // STEP 1.15 "No discharge"
  // { id: 'c2', label: 'No discharge', glyph: 'drop', tint: 'mint' },
  // STEP 1.16 "Back pain"
  // { id: 'c3', label: 'Back pain', glyph: 'spine', tint: 'lilac' },
  // STEP 1.17 "Irregular"
  // { id: 'c4', label: 'Irregular', glyph: 'wave', tint: 'blue' },
  // STEP 1.18 "Contraception"
  // { id: 'c5', label: 'Contraception', glyph: 'shield', tint: 'mint' },
];

export const logTitle = 'Cycling Log';

/** FIX: the board's promo copy is a sentence fragment with a trailing comma. */
export const promo = {
  title: 'Track your progress',
  line: 'Here to support every step',
  cta: 'Check Your Health',
};

export type Note = { id: string; title: string; line: string; glyph: 'clock' | 'tag' };

/** R5: labels, not prose. Each is under 40 characters. */
export const notes: Note[] = [
  { id: 'n1', title: 'Measure daily', line: 'Body and well-being', glyph: 'clock' },
  // STEP 1.26 "Stay motivated"
  // { id: 'n2', title: 'Stay motivated', line: 'A better path to health', glyph: 'tag' },
];
