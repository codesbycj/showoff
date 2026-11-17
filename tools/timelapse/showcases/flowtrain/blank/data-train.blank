/**
 * Everything flowtrain says.
 *
 * **R9: the bar under the clock is the set's own progress** — elapsed over
 * the set's length — and the "Exercise 2 of 6" pill counts the same list the
 * dots at the foot count.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const session = {
  exerciseAt: 2,
  exerciseCount: 6,
  name: 'Dumbbell shoulder press',
  setAt: 2,
  setCount: 3,
  reps: 12,
  weight: '6 kg',
  /** Seconds elapsed in this set, and the set's own length. */
  elapsed: 38,
  setSeconds: 75,
  image: require('../../../../assets/images/flowtrain/hero.jpg'),
};

export const tip = {
  label: 'Follicular tip',
  /** R5: one line, 62 characters. */
  body: 'You recover faster this week — try +1 kg on the next set.',
};

export type Control = { id: string; label: string; glyph: 'prev' | 'pause' | 'next' };

export const controls: Control[] = [
  { id: 'prev', label: 'Previous exercise', glyph: 'prev' },
  // STEP 1.20 "Pause"
  // { id: 'pause', label: 'Pause', glyph: 'pause' },
  // STEP 1.21 "Next exercise"
  // { id: 'next', label: 'Next exercise', glyph: 'next' },
];

/** "00:38" from seconds. */
export function clock(totalSeconds: number) {
  const s = Math.max(0, Math.round(totalSeconds));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

/**
 * How far through the set, 0-1.
 *
 * The divisor is clamped to at least one second: the reveal can leave this
 * screen with a zeroed set, and a divide by zero would make the bar `NaN`
 * wide (I7).
 */
export function setProgress() {
  return Math.min(Math.max(session.elapsed / Math.max(session.setSeconds, 1), 0), 1);
}
