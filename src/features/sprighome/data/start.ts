/**
 * Everything the day screen says and counts, so the components stay
 * presentational.
 *
 * **The date and the selected day agree.** The reference's header reads
 * "Today 15 Dec" over a strip whose selected day is the 12th. One of them is
 * wrong and a user would see both at once, so the header is written from the
 * strip.
 *
 * **The ring is a ratio, not three equal numbers.** The reference prints
 * 1200 eaten, 1200 cals and 1200 burned under an arc drawn nearly full. Here
 * `eaten` is the sum of the meals, the goal is the goal, and the arc is the
 * one over the other — so the picture cannot disagree with the figures.
 *
 * **Every macro tile's bar is its own ratio** for the same reason.
 */

export const copy = {
  greetWhen: 'Wednesday 12 Dec',
  greet: 'Good Morning',
  today: 'Today',
  weekly: 'Weekly',
  eaten: 'Eaten',
  cals: 'Cals left',
  burned: 'Burned',
  generate: 'Generate My Day',
  meals: 'Today Meals',
  add: 'Add',
} as const;

export const avatar = require('../../../../assets/images/sprighome/face-1.jpg');

/** Sunday the 9th through Saturday the 15th; the 12th is today. */
export const days = [
  { letter: 'S', num: 9 },
  { letter: 'M', num: 10 },
  { letter: 'T', num: 11 },
  { letter: 'W', num: 12 },
  { letter: 'T', num: 13 },
  { letter: 'F', num: 14 },
  { letter: 'S', num: 15 },
] as const;

export const todayNum = 12;

export const goal = 1850;
export const burned = 420;

export const meals = [
  {
    id: 'brunch',
    name: 'Brunch',
    items: [
      // Each name is the food in its own photograph. A row that says
      // "Flat white" beside a picture of a salad is the kind of mismatch
      // nobody reads past.
      {
        id: 'b1',
        name: 'Feta garden salad',
        cal: 284,
        photo: require('../../../../assets/images/sprighome/meal-3.jpg'),
      },
      {
        id: 'b2',
        name: 'Tofu & corn bowl',
        cal: 196,
        photo: require('../../../../assets/images/sprighome/meal-2.jpg'),
      },
    ],
  },
  {
    id: 'lunch',
    name: 'Lunch',
    items: [
      {
        id: 'l1',
        name: 'Shrimp poke bowl',
        cal: 512,
        photo: require('../../../../assets/images/sprighome/meal-1.jpg'),
      },
    ],
  },
] as const;

/** Spelled out so a card can be staged on its own. */
export const brunch = meals[0];
export const lunch = meals[1];

const sum = (m: (typeof meals)[number]) => m.items.reduce((s, i) => s + i.cal, 0);

export const mealTotals: Record<string, number> = {
  brunch: sum(meals[0]),
  lunch: sum(meals[1]),
};

export const eaten = meals.reduce((s, m) => s + sum(m), 0);
export const left = Math.max(0, goal - eaten);
export const ringShare = Math.min(1, eaten / goal);

export const macros = [
  { id: 'carbs', name: 'Carbs', value: 160, target: 225, tone: 'blue' },
  { id: 'protein', name: 'Protein', value: 80, target: 112, tone: 'lime' },
  { id: 'fats', name: 'Fats', value: 35, target: 50, tone: 'peach' },
] as const;
