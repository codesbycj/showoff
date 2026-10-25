/**
 * Everything the month screen says, so the components stay presentational.
 *
 * **The two bars are the two figures.** The reference draws a filled bar and
 * a hatched one under "Financial" and "Bills & Utilities", both labelled
 * "$424 of $920 spent" — the same sentence twice, under bars of different
 * lengths. Here each line has its own spend and its own budget, and the bar
 * is that ratio.
 */

const face = require('../../../../assets/images/budgecal/face-1.jpg');

export const me = face;

export const copy = {
  month: 'January',
  day: '11 January',
  sub: 'Analytics',
} as const;

export const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

/** `on` is a day with something booked against it; `today` is the one open. */
export const weeks = [
  [{ d: 1, on: true }, { d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }, { d: 6 }, { d: 7, pad: true }],
  [
    { d: 8 },
    { d: 9 },
    { d: 10, on: true },
    { d: 11, today: true },
    { d: 12, on: true },
    { d: 13, on: true },
    { d: 14, pad: true },
  ],
  [{ d: 14, on: true }, { d: 15, on: true }, { d: 16 }, { d: 17 }, { d: 18 }, { d: 19 }, { d: 20 }],
  [
    { d: 21 },
    { d: 22, on: true },
    { d: 23, on: true },
    { d: 24 },
    { d: 25, on: true },
    { d: 26, on: true },
    { d: 27 },
  ],
  [
    { d: 28, on: true },
    { d: 29 },
    { d: 30 },
    { d: 31 },
    { d: 1, pad: true },
    { d: 2, pad: true },
    { d: 3, pad: true },
  ],
] as const;

const money = (n: number) => '$' + n.toLocaleString('en-GB');

const lines = [
  { id: 'fin', label: 'Financial', spent: 424, budget: 920 },
  { id: 'bills', label: 'Bills & utilities', spent: 268, budget: 540 },
  // A third line, which the reference crops: two bars and then 120dp of paper
  // above the summary is a screen that stops before it ends.
  { id: 'food', label: 'Groceries', spent: 186, budget: 300 },
];

export const splits = lines.map((l) => ({
  ...l,
  share: l.spent / l.budget,
  right: 'of ' + money(l.budget) + ' spent',
  amount: money(l.spent),
}));

export const change = '+2%';

export const summary = [
  { id: 's1', major: '$214', minor: '.30' },
  { id: 's2', major: '$125', minor: '.50' },
  { id: 's3', major: '$152', minor: '.40' },
] as const;
