import { nr } from '../theme';

/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * One correction to the reference, and it is deliberate. The shot's rings read
 * 22g / 18g / 14g while its two logged meals add up to 68g / 64g / 17g — the
 * numbers cannot both be totals. They are treated here as what is **left**,
 * which is the reading the rest of the screen supports: the big figure is
 * flanked by "1173 Left" in exactly the same way. Every ring's fill is then
 * `eaten / (eaten + left)`, and the whole hero means one thing instead of two.
 */

/** The calorie gauge. 2116 eaten and 1173 left makes the day's goal 3289. */
export const calories = {
  eaten: 2116,
  left: 1173,
  logs: 2,
} as const;

export const macros = [
  { key: 'protein', label: 'Protein', left: 22, eaten: 68, color: nr.protein },
  { key: 'carbs', label: 'Carbs', left: 18, eaten: 64, color: nr.carbs },
  { key: 'fat', label: 'Fat', left: 14, eaten: 17, color: nr.fat },
] as const;

export type GoalGlyph = 'target' | 'sleep' | 'water';

/**
 * The Today row. Three of them, because the reference's third card is cut by
 * the right edge of the screen — which is the tell for a horizontal scroll
 * rather than a wrap, and a wrap physically cannot reproduce it.
 */
export const goals: { key: string; title: string; meta: string; glyph: GoalGlyph }[] = [
  { key: 'macros', title: 'Hit your daily macros', meta: 'Log your meals', glyph: 'target' },
  { key: 'sleep', title: 'Get 8 hours of sleep', meta: 'Apple Health', glyph: 'sleep' },
  { key: 'water', title: 'Drink 2L of water', meta: 'Log your drinks', glyph: 'water' },
];

/** The food log. `macros` is protein, carbs, fat — the ring order, every time. */
export const log = [
  { key: 'eggs', title: 'Eggs & Toast', cal: 404, macros: [54, 42, 14] },
  { key: 'tuna', title: 'Spicy Tuna Roll', cal: 432, macros: [14, 22, 3] },
] as const;

export type TabKey = 'home' | 'journey' | 'explore' | 'profile';

export const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'journey', label: 'Journey' },
  { key: 'explore', label: 'Explore' },
  { key: 'profile', label: 'Profile' },
];
