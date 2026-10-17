import { vs } from '../theme';

/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * One correction to the reference, and it is deliberate: its six categories
 * read 32 + 18 + 14 + 12 + 10 + 14, which is 100 — but the donut it is drawn
 * beside has a visibly larger dark arc than 32% of a ring. The percentages are
 * what a legend is *for*, so they are kept and the ring is drawn from them,
 * which is the only way the two can agree.
 */

export const period = { label: 'Aug 2026' } as const;

export const spend = { total: '$754.33', caption: 'Total Spent' } as const;

/** Deepest green first, so the ring reads as a ranking as well as a split. */
export const breakdown = [
  { key: 'shopping', label: 'Shopping', pct: 32, color: vs.green },
  { key: 'food', label: 'Food & Drinks', pct: 18, color: vs.green2 },
  { key: 'transport', label: 'Transport', pct: 14, color: vs.green3 },
  { key: 'entertainment', label: 'Entertainment', pct: 12, color: vs.green4 },
  { key: 'bills', label: 'Bills & Utilities', pct: 10, color: vs.green5 },
  { key: 'others', label: 'Others', pct: 14, color: vs.green6 },
] as const;

export const insight = {
  title: "You're 12% under budget!",
  body: 'Great job managing your spending this month.',
} as const;

/**
 * The trend. `value` is in the axis's own units, so the chart never has to
 * know what a currency is — and the axis labels below are the same numbers.
 */
export const trend = {
  axis: ['1.5K', '1K', '500', '0'],
  max: 1500,
  months: [
    { key: 'mar', label: 'Mar', value: 690 },
    { key: 'apr', label: 'Apr', value: 780 },
    { key: 'may', label: 'May', value: 735 },
    { key: 'jun', label: 'Jun', value: 610 },
    { key: 'jul', label: 'Jul', value: 820 },
    { key: 'aug', label: 'Aug', value: 1010 },
  ],
  live: 'aug',
  callout: '$754.33',
} as const;

export type TabKey = 'home' | 'analytics' | 'cards' | 'profile';

export const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'cards', label: 'Cards' },
  { key: 'profile', label: 'Profile' },
];

export const segments = ['Spending', 'Income', 'Savings', 'Goals'] as const;
