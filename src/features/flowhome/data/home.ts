/**
 * Everything flowhome says.
 *
 * **R9 twice.** "Period in N days" is `CYCLE_LENGTH - day`, computed, and the
 * phase bar's marker sits at `day / CYCLE_LENGTH` — the board prints "Day 9 of
 * 28" and "Period in 19 days" beside a marker that is nowhere near a third of
 * the way along.
 *
 * **One of the board's own mistakes is fixed** (I1): its dock marks *Home* as
 * the current tab while the card on screen belongs to *Cycle*. Here the dot is
 * on Home and the card is the day's summary, which is what a home screen is.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const account = {
  greeting: 'Good morning,',
  name: 'Emma',
  avatar: require('../../../../assets/images/flowhome/me.jpg'),
};

export const CYCLE_LENGTH = 28;
export const CYCLE_DAY = 9;

export type WeekDay = { id: string; label: string; done?: boolean; today?: boolean };

export const week: WeekDay[] = [
  { id: 'mon', label: 'M', done: true },
  { id: 'tue', label: 'T', today: true },
  { id: 'wed', label: 'W' },
  { id: 'thu', label: 'T' },
  { id: 'fri', label: 'F' },
  { id: 'sat', label: 'S' },
  { id: 'sun', label: 'S' },
];

/** How far through today's plan the ring is, 0-1. */
export const DAY_PROGRESS = 0.35;

export const phase = {
  name: 'Follicular phase',
  /** R5: one line, 58 characters. */
  body: 'Energy is rising — a good week to build strength.',
  image: require('../../../../assets/images/flowhome/phase.jpg'),
};

export type PhaseBand = {
  id: string;
  label: string;
  days: number;
  colour: 'rose' | 'lilac' | 'amber' | 'mint';
};

/**
 * The four bands of the cycle. Their lengths add up to `CYCLE_LENGTH`, which
 * is what lets the marker be computed rather than placed by eye (R9).
 */
export const bands: PhaseBand[] = [
  { id: 'menstrual', label: 'Menstrual', days: 5, colour: 'rose' },
  { id: 'follicular', label: 'Follicular', days: 9, colour: 'amber' },
  { id: 'ovulation', label: 'Ovulation', days: 4, colour: 'mint' },
  { id: 'luteal', label: 'Luteal', days: 10, colour: 'lilac' },
];

export const training = {
  sectionLabel: "Today's training",
  seeAll: 'See full plan',
  tag: 'STRENGTH',
  name: 'Upper body power',
  meta: '35 min · Moderate',
  image: require('../../../../assets/images/flowhome/session.jpg'),
};

export const mood = { question: 'How do you feel today?' };

export type Mood = {
  id: string;
  label: string;
  colour: 'rose' | 'lilac' | 'amber' | 'mint';
  on?: boolean;
};

export const moods: Mood[] = [
  { id: 'energised', label: 'Energised', colour: 'amber', on: true },
  { id: 'calm', label: 'Calm', colour: 'lilac' },
  { id: 'tired', label: 'Tired', colour: 'mint' },
  { id: 'cramps', label: 'Cramps', colour: 'rose' },
];

export type Tab = {
  id: string;
  label: string;
  glyph: 'home' | 'cycle' | 'train' | 'nourish' | 'insights';
};

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  { id: 'cycle', label: 'Cycle', glyph: 'cycle' },
  { id: 'train', label: 'Train', glyph: 'train' },
  { id: 'nourish', label: 'Nourish', glyph: 'nourish' },
  { id: 'insights', label: 'Insights', glyph: 'insights' },
];

/** Days until the next period. Clamped, so it can never read negative (R9). */
export function daysToPeriod() {
  return Math.max(CYCLE_LENGTH - CYCLE_DAY, 0);
}

/** Where the marker sits on the phase bar, 0-1. Guarded against a zero cycle. */
export function cycleFraction() {
  return Math.min(Math.max(CYCLE_DAY / Math.max(CYCLE_LENGTH, 1), 0), 1);
}
