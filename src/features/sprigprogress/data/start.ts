/**
 * Everything the progress screen says and counts.
 *
 * **One percentage, used three times.** The reference prints 40% in the
 * bubble, says "by 40%" in the body copy, and draws a rail at about a
 * quarter. Here `pct` is `weeksDone / weeksPlanned` and the bubble, the rail
 * and the sentence all read it, so the picture cannot disagree with the
 * words.
 *
 * **The two tiles say different things.** The reference gives both "1900
 * kcal", which makes the pair meaningless — one is what goes in and the
 * other is what goes out.
 */

export const copy = {
  title: 'Progress',
  lede: "You're off to a strong start. Your body fat is down 1.4% this month.",
  total: 'Total progress',
  nutrition: 'Nutrition',
  fitness: 'Fitness',
  unit: 'kcal',
  streakUnit: 'DAY STREAK',
  streakCheer: 'KEEP GOING!',
  goal: 'Your Goal',
  goalNote: 'At this pace you reach 68 kg in five weeks.',
} as const;

export const streakPhoto = require('../../../../assets/images/sprigprogress/streak.jpg');
export const goalPhoto = require('../../../../assets/images/sprigprogress/goal.jpg');

export const weeksDone = 6;
export const weeksPlanned = 15;

export const pct = Math.round((weeksDone / weeksPlanned) * 100);
export const share = weeksDone / weeksPlanned;

export const note = `Balanced meals fuel energy, steady focus and consistent progress — you are ${pct}% of the way there.`;

export const tiles = [
  { id: 'nutrition', name: copy.nutrition, value: 1900, tone: 'peach' },
  { id: 'fitness', name: copy.fitness, value: 620, tone: 'blue' },
] as const;

export const streakDays = 4;
