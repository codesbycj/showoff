/** The screen's words, kept out of the components so they stay presentational. */

export const header = {
  wordmark: 'Nutrilens',
  sup: 'AI',
  skip: 'Skip',
} as const;

export const intro = {
  display: 'Personal\nMeals,\nYour Way,\nAnytime.',
  pill: 'Welcome to\nNutrilens',
  cta: 'Get Started',
} as const;

/** The two readings pinned over the photograph, as fractions of its width. */
export const readings = [
  { key: 'left', label: '150 Kcal', x: 0.1 },
  { key: 'right', label: '340 Kcal', x: 0.56 },
] as const;
