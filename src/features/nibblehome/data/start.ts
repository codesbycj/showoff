/**
 * Everything the day screen says and counts.
 *
 * **The headline percentage is the ring.** The reference puts 91% beside a
 * ring reading 1350 Calories and a tile reading 1278 kcal — three numbers
 * about the same day that cannot all be true. Here `eaten` and `goal` are the
 * only two figures entered, and the percentage, the ring and the tile are all
 * computed from them.
 *
 * **The meal's calorie line is its macros.** The reference's "Breakfast / 350
 * calories" sits over 62.5g protein, 23.6g fat and 45.7g carbs, which is 645
 * kcal. `mealCalories` is 4·protein + 9·fat + 4·carbs.
 *
 * **RDC is a share, not a loose number.** It is the meal against the day's
 * goal, so it moves when either does.
 */

export const copy = {
  greet: 'Hello, Robin!',
  progress: 'Your Progress',
  calories: 'Calories',
  date: '19 September',
  weight: 'Current Weight',
  kg: 'Kg',
  weekAvg: 'Weekly average',
  lunch: 'Lunch',
  lunchNote: 'Nothing logged yet',
  kcal: 'Kcal',
  breakfast: 'Breakfast',
  today: 'Today',
  proteins: 'Proteins',
  fats: 'Fats',
  carbs: 'Carbs',
  rdc: 'RDC',
} as const;

export const avatar = require('../../../../assets/images/nibblehome/face-1.jpg');

export const goal = 1500;
export const eaten = 1350;

export const pct = Math.round((eaten / goal) * 100);
export const ringShare = Math.min(1, eaten / goal);

export const weight = 78.5;
export const weightDelta = -3;
export const weightPct = -3.8;

/**
 * The week's intake, in kcal. The second tile reads the *average* of these
 * rather than today's figure: in the reference it says "Today's Calories" and
 * prints a number the ring two inches above it contradicts. Two tiles cannot
 * both be today.
 */
export const week = [1402, 1318, 1511, 1264, 1390, 1476, 1350] as const;
export const weekAvg = Math.round(week.reduce((a, b) => a + b, 0) / week.length);

/** Last week's, so the arrow has something real to point at. */
export const lastWeekAvg = 1452;
export const weekDelta = Math.round(((weekAvg - lastWeekAvg) / lastWeekAvg) * 1000) / 10;

/** The same series, scaled 0..1 for the sparkline. */
const lo = Math.min(...week);
const hi = Math.max(...week);
export const trend = week.map((v) => (v - lo) / (hi - lo));

/** How much of the day's goal each macro covers, for the rails. */
export const macroTargets = { protein: 90, fat: 60, carbs: 180 } as const;

export const meal = {
  protein: 62.5,
  fat: 23.6,
  carbs: 45.7,
} as const;

export const mealCalories = Math.round(meal.protein * 4 + meal.fat * 9 + meal.carbs * 4);
export const rdc = Math.round((mealCalories / goal) * 100);

/**
 * Each column, with the share of its own target the meal covers. The rail
 * under the figure is that share — the reference leaves the columns as four
 * bare numbers and the card half empty beneath them.
 */
export const macros = [
  {
    id: 'protein',
    name: copy.proteins,
    value: meal.protein.toFixed(1),
    share: Math.min(1, meal.protein / macroTargets.protein),
  },
  {
    id: 'fat',
    name: copy.fats,
    value: meal.fat.toFixed(1),
    share: Math.min(1, meal.fat / macroTargets.fat),
  },
  {
    id: 'carbs',
    name: copy.carbs,
    value: meal.carbs.toFixed(1),
    share: Math.min(1, meal.carbs / macroTargets.carbs),
  },
  { id: 'rdc', name: copy.rdc, value: `${rdc}%`, share: mealCalories / goal },
] as const;
