/**
 * Everything vitalprog says.
 *
 * **Every figure derives from its own series** (R9): the calorie headline is
 * the sum of the sparkline under it, and each trending row's percentage is the
 * share of its week that is filled — so a number and the picture beside it
 * cannot disagree.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const screen = { programs: 'Your Programs', trending: 'Trending' };

/** Today's calorie burn, hour by hour. The headline is their sum. */
export const calorieSeries: number[] = [42, 61, 38, 74, 52, 66, 59];

export function calories(): number {
  return calorieSeries.reduce((a, b) => a + b, 0);
}

export const calorieRow = { label: 'Steady calories', time: '12:08 PM', unit: 'kcal' };

export const leaderboard = { title: 'Leaderboard', day: 5, of: 7 };

export type Week = boolean[];

export type Trend = {
  id: string;
  title: string;
  meta: string;
  glyph: 'dumbbell' | 'walk' | 'heart';
  tint: 'blush' | 'mint' | 'lilac';
  /** Seven days, true where the day was completed. The percentage derives. */
  week: Week;
  /** Only the rows with a distance carry one — hence the annotation. */
  km?: number;
  kmGoal?: number;
};

export const trends: Trend[] = [
  {
    id: 't1',
    title: 'Gaining muscle',
    meta: 'Last week',
    glyph: 'dumbbell',
    tint: 'blush',
    week: [true, true, false, true, true, true, true],
  },
  // STEP 1.25 "Walking"
  // {
  //   id: 't2',
  //   title: 'Walking',
  //   meta: '12:08 PM',
  //   glyph: 'walk',
  //   tint: 'mint',
  //   week: [true, true, true, true, false, false, false],
  //   km: 5,
  //   kmGoal: 8,
  // },
  // STEP 1.26 "Resting heart rate"
  // {
  //   id: 't3',
  //   title: 'Resting heart rate',
  //   meta: 'This week',
  //   glyph: 'heart',
  //   tint: 'lilac',
  //   week: [true, true, true, false, true, true, false],
  // },
];

/**
 * How many trend rows the layout reserves.
 *
 * Declared rather than read off `trends.length`: the reveal stages entries
 * one at a time, so a height taken from the live length shrinks on every
 * revealed row and drags whatever is sized against it - here the hero - with
 * it, repainting half the frame for one new row (RULES 0.3).
 */
export const TREND_ROWS = 3;

export const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/**
 * A row's completion.
 *
 * Derived, and safe while `week` is still being staged: a zero-length array
 * returns 0 rather than dividing by zero (I7).
 */
export function share(week: Week): number {
  if (!week.length) return 0;
  return (week.filter(Boolean).length / week.length) * 100;
}

/** A distance row's progress, clamped so a staged `kmGoal` cannot divide by zero. */
export function kmShare(t: Trend): number | null {
  if (t.km === undefined || !t.kmGoal) return null;
  return Math.min(t.km / Math.max(t.kmGoal, 1), 1);
}

export function pct(n: number) {
  return `${n.toFixed(1)}%`;
}
