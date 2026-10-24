/** The screen's words, kept out of the components so they stay presentational. */

export const header = {
  wordmark: 'Nutrilens',
  sup: 'AI',
  skip: 'Skip',
} as const;

/**
 * The headline is three separate lines, not one string with newlines in it.
 * The middle line carries a drawn disc between two words, and a wrapping row
 * of `<T>`s puts the tail's first line at the top of the row rather than on
 * the line the disc is on.
 */
export const intro = {
  displayTop: 'Daily Tracking To',
  displayMid: ['Stay', 'On'],
  displayBottom: 'Track',
  cta: 'Get Started',
} as const;

export const calendar = {
  month: 'Dec 2025',
  days: [
    { key: 'sun', weekday: 'S', day: '11' },
    { key: 'mon', weekday: 'M', day: '12' },
    { key: 'tue', weekday: 'T', day: '13' },
    { key: 'wed', weekday: 'W', day: '14' },
    { key: 'thu', weekday: 'T', day: '15' },
    { key: 'fri', weekday: 'F', day: '16' },
    { key: 'sat', weekday: 'S', day: '17' },
  ],
  selected: 'wed',
} as const;

export const stats = {
  goal: 'Goal 1650',
  eaten: '670',
  percent: '43%',
  /** How far round the ring that is — kept here so the arc and the label agree. */
  fraction: 0.43,
  macros: [
    { key: 'proteins', value: '45/165g', label: 'Proteins', mark: 'protein' },
    { key: 'carbs', value: '78/140g', label: 'Carbs', mark: 'carb' },
    { key: 'fats', value: '15/155', label: 'Fats', mark: 'fat' },
  ],
} as const;
