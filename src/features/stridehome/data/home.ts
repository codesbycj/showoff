/**
 * Everything stridehome says.
 *
 * **R5: labels, units, counts and states.** Every string here is one of those;
 * the board sets them in tracked uppercase and so does the type scale.
 *
 * **R9: the week's distance is the sum of its days** and the focus session's
 * minutes are its own intervals, so no figure on the screen is typed beside a
 * picture that disagrees with it.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const brand = { name: 'Stride' };

export const day = {
  date: 'TUESDAY · JUL 8',
  greeting: 'Good morning,\nNasim',
  streak: 18,
  avatar: require('../../../../assets/images/stridehome/me.jpg'),
};

export const readiness = {
  label: 'READINESS',
  state: 'PRIMED',
  score: 82,
  scoreLabel: 'SCORE',
  delta: 4,
};

export type Metric = {
  id: string;
  label: string;
  value: string;
  unit: string;
  /** A metric may carry a move against yesterday; declared, not inferred. */
  delta?: number;
  /** …or a share, like the night's sleep quality. */
  share?: string;
};

export const metrics: Metric[] = [
  { id: 'hrv', label: 'HRV', value: '68', unit: 'MS', delta: 6 },
  // STEP 1.07 "RESTING HR"
  // { id: 'rhr', label: 'RESTING HR', value: '47', unit: 'BPM', delta: -2 },
  // STEP 1.08 "SLEEP"
  // { id: 'sleep', label: 'SLEEP', value: '7:42', unit: 'HRS', share: '91%' },
];

export type Tile = { id: string; value: string; unit: string; label: string };

export const tiles: Tile[] = [
  { id: 'spo2', value: '98', unit: '%', label: 'Blood O₂' },
  // STEP 1.09 "Rest rate"
  // { id: 'rest', value: '14', unit: '/m', label: 'Rest rate' },
  // STEP 1.10 "Load 7d"
  // { id: 'load', value: '342', unit: '', label: 'Load 7d' },
];

export const focus = {
  label: "TODAY'S FOCUS",
  week: 'WEEK 5 · WED',
  name: 'Intervals',
  reps: 6,
  repMetres: 800,
  targetPace: '3:55 /KM',
  /** R9: the session's length is its own blocks, not a typed number. */
  warmupMin: 12,
  repMin: 5,
  cooldownMin: 10,
  cta: 'START WORKOUT',
};

/** Eight blocks: six work reps between a warm-up and a cool-down. */
export const blocks: boolean[] = [false, true, true, true, true, true, true, false];

export const week = { label: 'THIS WEEK', goal: 45, unit: '/ 45 KM GOAL' };

export type Day = { id: string; label: string; km: number; today?: boolean };

export const days: Day[] = [
  { id: 'mon', label: 'M', km: 4.2 },
  // STEP 1.20 "T"
  // { id: 'tue', label: 'T', km: 12.4, today: true },
  // STEP 1.21 "W"
  // { id: 'wed', label: 'W', km: 0 },
  // STEP 1.22 "T"
  // { id: 'thu', label: 'T', km: 6.8 },
  // STEP 1.23 "F"
  // { id: 'fri', label: 'F', km: 3.1 },
  // STEP 1.24 "S"
  // { id: 'sat', label: 'S', km: 0 },
  // STEP 1.25 "S"
  // { id: 'sun', label: 'S', km: 6.1 },
];

/**
 * Guarded for the empty case, because the reveal stages `days` one entry at a
 * time: `reduce` carries an initial value, and the bar scale clamps its
 * divisor to at least one (I7).
 */
export function weekTotal(rows: Day[]) {
  return rows.reduce((sum, row) => sum + row.km, 0);
}

export function dayPeak(rows: Day[]) {
  return Math.max(...rows.map((row) => row.km), 1);
}

export function focusMinutes() {
  return focus.warmupMin + focus.reps * focus.repMin + focus.cooldownMin;
}

export type Tab = { id: string; label: string; glyph: 'home' | 'train' | 'compete' | 'you' };

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.29 "Train"
  // { id: 'train', label: 'Train', glyph: 'train' },
  // STEP 1.30 "Compete"
  // { id: 'compete', label: 'Compete', glyph: 'compete' },
  // STEP 1.31 "You"
  // { id: 'you', label: 'You', glyph: 'you' },
];
