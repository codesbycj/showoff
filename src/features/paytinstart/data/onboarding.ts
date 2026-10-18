/**
 * The screen's words, kept out of the components so they stay presentational.
 *
 * One correction to the reference, deliberately: its headline reads "Degital
 * Banking". A design shot is not an authority on its own spelling (AGENTS.md,
 * "Three kinds of reference"), so it is spelt correctly here.
 */
export const onboarding = {
  headline: { one: 'Digital Banking', two: 'Made for', three: 'Digital Users' },
  lede: 'Spend, earn and track financial activity',
  skip: 'Skip',
  start: "Let's Start",
} as const;

/** The marks scattered round the top of the screen, and where they sit. */
export type ScatterName = 'coin' | 'scan' | 'card' | 'receipt';

export const scatter: { key: string; name: ScatterName; x: number; y: number; size: number }[] = [
  { key: 'coin-l', name: 'coin', x: 0.06, y: 0.0, size: 30 },
  { key: 'scan', name: 'scan', x: 0.42, y: 0.03, size: 34 },
  { key: 'card', name: 'card', x: 0.78, y: 0.06, size: 36 },
  { key: 'receipt', name: 'receipt', x: 0.03, y: 0.62, size: 32 },
  { key: 'coin-r', name: 'coin', x: 0.86, y: 0.82, size: 26 },
];
