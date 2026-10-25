/**
 * Everything the week screen says, so the components stay presentational.
 *
 * **The bar is the four cards.** The reference draws a segmented bar above
 * four food cards whose widths have no relation to the numbers printed on
 * them. Here each segment is that food's share of the day's calories, so the
 * bar and the cards are the same fact — and "calories left" is the target
 * less their sum rather than a figure of its own.
 */

const target = 2500;

export const copy = {
  title: 'Calories',
  sub: 'Week days',
  left: 'Calories left',
  unit: 'kcal',
} as const;

export const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

export const days = [14, 15, 16, 17, 18, 19, 20] as const;
export const today = 15;

export const foods = [
  { id: 'sweet', name: 'Sweet', calories: 366, carbs: '59g', tone: 'indigo' },
  { id: 'fish', name: 'Fish', calories: 456, carbs: '109g', tone: 'teal' },
  { id: 'fast', name: 'Fast food', calories: 668, carbs: '34g', tone: 'lime' },
  { id: 'choc', name: 'Chocolate', calories: 780, carbs: '42g', tone: 'sky' },
] as const;

const eaten = foods.reduce((sum, f) => sum + f.calories, 0);

export const left = (target - eaten).toLocaleString('en-GB');

/** Each food's share of the day, for the bar. */
export const shares = foods.map((f) => ({
  id: f.id,
  tone: f.tone,
  share: f.calories / target,
}));

export const restShare = (target - eaten) / target;

export const dock = ['home', 'flame', 'clock'] as const;
