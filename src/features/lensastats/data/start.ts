/**
 * Everything the figures screen says and counts.
 *
 * **The "Actual" pie is the day's own macros.** The reference prints 46 / 26
 * / 28 beside grams that come to 63 / 17 / 20 — a pie labelled "Actual" that
 * is not the actual split. Here `actual` is computed from the same grams the
 * first screen shows, at 4 kcal a gram for carbs and protein and 9 for fat.
 *
 * **The legend is the targets, exactly.** The reference's legend reads 198 g,
 * 51.2 g and 121.8 g against targets of 198, 52 and 122 — close enough to
 * look right and wrong enough to be noticed.
 *
 * **The axis brackets the data.** The top gridline is the target, which is
 * above every bar, so no bar stands taller than the scale that measures it.
 */

export const copy = {
  calories: 'Daily calories',
  kcal: 'kcal',
  targetLabel: 'Target: ',
  rangeLabel: 'Target range',
  nutrition: 'Nutrition info',
  recommended: 'Recommended',
  actual: 'Actual',
  carbs: 'Carbs',
  fat: 'Fat',
  protein: 'Protein',
} as const;

export const eaten = 1250;
export const goal = 1850;
export const scaleMax = 2000;
export const rangeLow = 1700;
export const rangeHigh = 1850;

/** The last eight days, in kcal. The last one is today. */
export const days = [
  { label: '24', kcal: 1480 },
  { label: '25', kcal: 980 },
  { label: '26', kcal: 1620 },
  { label: '27', kcal: 1120 },
  { label: '28', kcal: 1540 },
  { label: '29', kcal: 1760 },
  { label: '1', kcal: 860 },
  { label: '2', kcal: eaten },
] as const;

export const todayIndex = days.length - 1;

/** The gridlines, which bracket every bar because the top one is the target. */
export const gridlines = [goal, 1000, 0] as const;

/** Grams eaten today, the same pair of figures the day screen shows. */
export const macros = {
  carbs: { value: 109, target: 198, tone: 'pink' },
  fat: { value: 13.5, target: 52, tone: 'butter' },
  protein: { value: 34.2, target: 122, tone: 'sky' },
} as const;

const kcalOf = (carbs: number, fat: number, protein: number) => ({
  carbs: carbs * 4,
  fat: fat * 9,
  protein: protein * 4,
});

const pieOf = (parts: { carbs: number; fat: number; protein: number }) => {
  const total = parts.carbs + parts.fat + parts.protein;
  return [
    { id: 'carbs', name: copy.carbs, pct: Math.round((parts.carbs / total) * 100), tone: 'pink' },
    { id: 'fat', name: copy.fat, pct: Math.round((parts.fat / total) * 100), tone: 'butter' },
    {
      id: 'protein',
      name: copy.protein,
      pct: Math.round((parts.protein / total) * 100),
      tone: 'sky',
    },
  ];
};

export const recommended = pieOf(
  kcalOf(macros.carbs.target, macros.fat.target, macros.protein.target),
);

export const actual = pieOf(kcalOf(macros.carbs.value, macros.fat.value, macros.protein.value));

export const legend = [
  { id: 'carbs', name: copy.carbs, value: `${macros.carbs.target} g`, tone: 'pink' },
  { id: 'fat', name: copy.fat, value: `${macros.fat.target} g`, tone: 'butter' },
  { id: 'protein', name: copy.protein, value: `${macros.protein.target} g`, tone: 'sky' },
] as const;
