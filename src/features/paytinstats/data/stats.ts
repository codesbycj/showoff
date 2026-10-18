/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * One correction to the reference, deliberately: its earning card reads
 * "comared to last month". A design shot is not an authority on its own
 * spelling (AGENTS.md, "Three kinds of reference"), so it is spelt correctly
 * here.
 */

export const periods = ['Today', 'Weekly', 'Monthly', 'Yearly'] as const;

export const earning = {
  kind: 'Earning',
  figure: '24%',
  body: 'Your current month earning is increased by 24% compared to last month.',
  goalLabel: 'Goal',
  goal: '$2567/$5000',
  /** How much of the goal is met, which is what fills the dots. */
  fraction: 2567 / 5000,
  dots: 11,
} as const;

export const spending = {
  kind: 'Spending',
  amount: '$3,250',
  cents: '.80',
  legend: ['Debit Card', 'Credit Card'],
} as const;

export const overview = {
  label: 'Total Balance',
  total: '$25,453.00',
  keys: ['Debit Card Spending', 'Credit Card Spending'],
  axis: ['$3500', '$3000', '$2500', '$2000', '$1000', '$0'],
  callout: '$2,410.00',
  summaryLabel: 'Highest month · May',
  summary: '$2,410.00',
  live: 'MAY',
  /**
   * Six months, each a stack of blocks: how many of the lime kind and how many
   * of the dark. Blocks rather than a bar height, because that is what the
   * reference draws and what gives the chart its texture.
   */
  months: [
    { key: 'JAN', debit: 3, credit: 2 },
    { key: 'FEB', debit: 2, credit: 3 },
    { key: 'MAR', debit: 4, credit: 3 },
    { key: 'APR', debit: 5, credit: 2 },
    { key: 'MAY', debit: 6, credit: 3 },
    { key: 'JUN', debit: 3, credit: 2 },
  ],
} as const;
