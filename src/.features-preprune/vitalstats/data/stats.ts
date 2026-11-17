/**
 * Everything vitalstats says.
 *
 * **The board's leaderboard is out of order and is fixed here** (R9): it ranks
 * "David Bennett — 1,500 pts" first and "Kylee Danford — 2,458 pts" second. A
 * leaderboard whose rank 1 has fewer points than its rank 2 is not a
 * leaderboard. The rank is derived from the score here, so the order and the
 * numbers cannot disagree.
 *
 * **The board's stat strip is also unreadable** — "Calories 2,4 kcal" uses a
 * comma as a decimal point beside "Steps 4,259" using it as a thousands
 * separator. One convention, applied once.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const screen = { kicker: 'Stats', headline: ['Top performers', 'track progress'] };

export const tabs = ['Rankings', 'Activity'] as const;

export type Athlete = {
  id: string;
  name: string;
  avatar: number;
  score: number;
  /** The stat strip, shown only under the leader — hence the annotation. */
  workoutHours?: number;
  calories?: number;
  weightKg?: number;
  steps?: number;
};

/** Unsorted on purpose: `ranked()` is what orders them, so rank follows score. */
export const athletes: Athlete[] = [
  {
    id: 'a2',
    name: 'Kylee Danford',
    avatar: require('../../../../assets/images/vitalstats/a2.jpg'),
    score: 2458,
    workoutHours: 31,
    calories: 2740,
    weightKg: 6,
    steps: 5120,
  },
  {
    id: 'a1',
    name: 'David Bennett',
    avatar: require('../../../../assets/images/vitalstats/a1.jpg'),
    score: 1500,
  },
  {
    id: 'a3',
    name: 'Mira Okafor',
    avatar: require('../../../../assets/images/vitalstats/a3.jpg'),
    score: 1284,
  },
  {
    id: 'a4',
    name: 'Sam Whitfield',
    avatar: require('../../../../assets/images/vitalstats/a4.jpg'),
    score: 1097,
  },
];

/** FIX: rank follows score, so the list cannot contradict its own numbers. */
export function ranked(): Athlete[] {
  return [...athletes].sort((a, b) => b.score - a.score);
}

export type Stat = { id: string; label: string; value: string };

/**
 * The leader's stat strip.
 *
 * Returns `[]` while the list is still being staged, so nothing reads a
 * property off `undefined` (I7).
 */
export function leaderStats(): Stat[] {
  const top = ranked()[0];
  if (!top) return [];
  return [
    { id: 'w', label: 'Workouts', value: `${top.workoutHours ?? 0} h` },
    { id: 'c', label: 'Calories', value: `${(top.calories ?? 0).toLocaleString('en-US')} kcal` },
    { id: 'l', label: 'Weight lost', value: `${top.weightKg ?? 0} kg` },
    { id: 's', label: 'Steps', value: `${(top.steps ?? 0).toLocaleString('en-US')}` },
  ];
}

/** Points read with a thousands separator, and nothing else does. */
export function pts(n: number) {
  return `${n.toLocaleString('en-US')} pts`;
}
