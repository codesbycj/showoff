/**
 * Everything the home screen says, so the components stay presentational.
 *
 * **Every figure comes from two numbers.** The reference prints "$420.50 left
 * balance", "$424 of $920 spent" and a gauge reading "$1240 total expensed"
 * on one screen — three sums that cannot all be true of the same month. Here
 * the month has a budget and a list of what went out; the balance is the
 * difference, the gauge is the total, and the progress is the ratio.
 */

const face1 = require('../../../../assets/images/budgehome/face-1.jpg');
const face2 = require('../../../../assets/images/budgehome/face-2.jpg');

export const month = 'November';

const budget = 1660;

export const outgoings = [
  { id: 'o1', label: 'Bills & utilities', amount: 424 },
  { id: 'o2', label: 'Groceries', amount: 386 },
  { id: 'o3', label: 'Transport', amount: 198 },
  { id: 'o4', label: 'Everything else', amount: 232 },
] as const;

const spent = outgoings.reduce((sum, o) => sum + o.amount, 0);

const money = (n: number) => '$' + n.toLocaleString('en-GB');

export const balance = {
  major: money(budget - spent),
  minor: '.00',
  caption: 'Left balance',
} as const;

export const spentLine = {
  text: money(spent) + ' of ' + money(budget) + ' spent',
  pct: Math.round((spent / budget) * 100) + '%',
  // The reference reads "+18% than last month" beside a figure that is a
  // share of this month's budget, not a change against another month. The
  // label now says what the number is.
  note: 'of your budget',
} as const;

export const planner = {
  title: 'Budge planner',
  total: money(spent),
  label: 'Total expensed',
  /** The gauge's sweep, as a share of the budget. */
  share: spent / budget,
  crew: [face1, face2],
  action: outgoings[0].label,
} as const;

export const limit = {
  section: 'Statistics',
  title: 'Set your limit',
  value: '1200',
  minor: '.00',
  caption: 'Monthly spending limit',
  edit: 'Edit',
} as const;
