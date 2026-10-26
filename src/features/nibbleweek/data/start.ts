/**
 * Everything the week screen says and counts.
 *
 * **What is left is the goal less what has been logged.** The reference
 * prints "Calorie left 1230 kcal" beside two food cards adding to 891 under
 * a bar filled about a third — none of which agree. Here `logged` is the sum
 * of the cards, `left` is `goal - logged`, and the bar's three segments are
 * the macros' share of that same total.
 *
 * **The bar's segments add up to the bar.** A stacked bar whose parts do not
 * sum to the whole is a picture of a bar.
 */

export const copy = {
  title: 'Calories',
  weekDays: 'Week Days',
  left: 'Calorie left',
  kcal: 'kcal',
  calories: 'Calories',
  carbs: 'Carbs',
  protein: 'Protein',
  fat: 'Fat',
  count: 'Calorie count',
} as const;

/** Monday the 12th through Sunday the 18th; the 14th is today. */
export const days = [
  { letter: 'M', num: 12 },
  { letter: 'T', num: 13 },
  { letter: 'W', num: 14 },
  { letter: 'T', num: 15 },
  { letter: 'F', num: 16 },
  { letter: 'S', num: 17 },
  { letter: 'S', num: 18 },
] as const;

export const todayNum = 14;

export const goal = 2100;

export const foods = [
  { id: 'taco', name: 'Taco', cal: 635, carbs: 72, protein: 26, fat: 24, tone: 'blue' },
  { id: 'donut', name: 'Donut', cal: 256, carbs: 34, protein: 4, fat: 12, tone: 'plain' },
] as const;

export const logged = foods.reduce((s, f) => s + f.cal, 0);
export const left = Math.max(0, goal - logged);

/** The three segments of the bar, in kcal, from the same two cards. */
const carbKcal = foods.reduce((s, f) => s + f.carbs, 0) * 4;
const proteinKcal = foods.reduce((s, f) => s + f.protein, 0) * 4;
const fatKcal = foods.reduce((s, f) => s + f.fat, 0) * 9;
const macroTotal = carbKcal + proteinKcal + fatKcal;

export const segments = [
  { id: 'carbs', label: copy.carbs, share: (carbKcal / macroTotal) * (logged / goal) },
  { id: 'protein', label: copy.protein, share: (proteinKcal / macroTotal) * (logged / goal) },
  { id: 'fat', label: copy.fat, share: (fatKcal / macroTotal) * (logged / goal) },
] as const;

export const restShare = Math.max(0, 1 - segments.reduce((s, x) => s + x.share, 0));
