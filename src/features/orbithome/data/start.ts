/**
 * Everything the balance screen says and counts, so the components stay
 * presentational.
 *
 * **The chip over the chart is computed, not typed.** The reference prints
 * "$842.3" — a money figure with one decimal — beside a bar it does not
 * identify. Here the chip reads the selected day out of `spend`, so the bar
 * that is lit and the figure above it cannot disagree, and the figure is
 * formatted as money.
 *
 * **The card's balance is computed too.** `balance` is the pennies; the
 * screen formats it. Typing "8,656.60" as a string is how a design ends up
 * with a total that does not match its own rows.
 */

export const copy = {
  greeting: 'Hi, Remi!',
  balanceLabel: 'My Balance',
  statistics: 'Statistics',
  currency: 'USD',
  transfer: 'Transfer',
  request: 'Request',
  cashbackSub: 'cashback',
  recent: 'Recent Transaction',
  spent: 'Money spent',
  period: 'This month',
} as const;

/** In pennies, so nothing is ever a float. */
export const balance = 865660;

export const cashbackRate = 10;

export const faces = [
  require('../../../../assets/images/orbithome/face-1.jpg'),
  require('../../../../assets/images/orbithome/face-2.jpg'),
  require('../../../../assets/images/orbithome/face-3.jpg'),
];

/** The month's spend, in pennies, at the days the chart plots. */
export const spend = [
  { day: 1, amount: 31200 },
  { day: 3, amount: 18400 },
  { day: 5, amount: 46100 },
  { day: 7, amount: 25800 },
  { day: 10, amount: 62700 },
  { day: 12, amount: 21500 },
  { day: 15, amount: 38900 },
  { day: 17, amount: 29600 },
  { day: 20, amount: 84230 },
  { day: 22, amount: 44800 },
  { day: 25, amount: 52300 },
  { day: 27, amount: 27100 },
  { day: 30, amount: 39500 },
] as const;

/** The day the chip is reading. */
export const selectedDay = 20;

/** Only every other day gets a label, or they collide at 393dp. */
export const axisDays = [1, 5, 10, 15, 20, 25, 30];

export const money = (pennies: number) =>
  '$' +
  (pennies / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
