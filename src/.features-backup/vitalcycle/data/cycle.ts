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
  { id: 'd2', label: 'M', litres: 2.1 },
  { id: 'd3', label: 'T', litres: 1.4 },
  { id: 'd4', label: 'W', litres: 2.5, today: true },
  { id: 'd5', label: 'T' },
  { id: 'd6', label: 'F' },
  { id: 'd7', label: 'S' },
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
  { id: 'c2', label: 'No discharge', glyph: 'drop', tint: 'mint' },
  { id: 'c3', label: 'Back pain', glyph: 'spine', tint: 'lilac' },
  { id: 'c4', label: 'Irregular', glyph: 'wave', tint: 'blue' },
  { id: 'c5', label: 'Contraception', glyph: 'shield', tint: 'mint' },
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
  { id: 'n2', title: 'Stay motivated', line: 'A better path to health', glyph: 'tag' },
];
