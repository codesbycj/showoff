/**
 * Everything the day screen says and counts.
 *
 * The reference's own arithmetic holds here — 109/198 is 55%, 1250/1850 is
 * 68% — so the figures are kept. What is derived rather than typed is every
 * *percentage* and every bar, so they cannot come apart later: change a gram
 * and the ring, the rails and the headline all move together.
 *
 * "Nutritions" is corrected to "Nutrition".
 */

export const copy = {
  brand: 'Lensa',
  syncedBefore: 'Last synced with your ',
  syncedLink: 'devices',
  syncedAfter: ' at 19:01',
  today: 'Today',
  intake: 'Daily intake',
  nutrition: 'Nutrition',
  weight: 'Weight',
  carbs: 'Carbs',
  fat: 'Fat',
  protein: 'Protein',
  weightValue: '64.8 kg',
  weightNote: 'Down 0.6 kg this week',
} as const;

export const avatar = require('../../../../assets/images/lensahome/face-1.jpg');

export const eaten = 1250;
export const goal = 1850;

export const pct = Math.round((eaten / goal) * 100);
export const ringShare = Math.min(1, eaten / goal);

export const macros = [
  { id: 'carbs', name: copy.carbs, value: 109, target: 198, tone: 'pink' },
  { id: 'fat', name: copy.fat, value: 13.5, target: 52, tone: 'butter' },
  { id: 'protein', name: copy.protein, value: 34.2, target: 122, tone: 'sky' },
] as const;

/** Each rail and each percentage come off the same pair of grams. */
export const macroRows = macros.map((m) => ({
  ...m,
  share: Math.min(1, m.value / m.target),
  pct: Math.round((m.value / m.target) * 100),
  label: `${m.value} / ${m.target} g`,
}));
