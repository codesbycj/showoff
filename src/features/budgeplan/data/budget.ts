/**
 * Everything the plan screen says, so the components stay presentational.
 *
 * **The bar is the percentage.** The reference draws a filled bar beside
 * "84 %" whose fill is nearer two thirds. Here the fill *is* the figure.
 */

export const copy = {
  back: 'Back',
  title: 'Plan expenses',
  history: 'Expenses history',
} as const;

const planned = 920;
const spent = 773;

export const plan = {
  pct: Math.round((spent / planned) * 100),
  label: 'Plan expenses',
} as const;

export const history = [
  { id: 'h1', major: '$420', minor: '.00', label: 'Entertainment', when: 'Today', dot: '#4C6FFF' },
  { id: 'h2', major: '$260', minor: '.00', label: 'Groceries', when: 'Yesterday', dot: '#F8766B' },
] as const;

export const tiles = [
  { id: 't1', label: 'Food', tone: 'dark' },
  { id: 't2', label: 'Income', tone: 'coral' },
] as const;
