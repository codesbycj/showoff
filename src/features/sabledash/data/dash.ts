/**
 * Everything the dashboard says, so the components stay presentational.
 *
 * The brand and every figure are invented. The faces are free-licensed
 * photographs, credited in `assets/images/sabledash/CREDITS.md`.
 *
 * **The card number is masked, not printed.** The reference shows "**** 4527"
 * which is right; what it also does is show the full balance, the month and
 * the count as three unrelated numbers. Here the count is the length of the
 * month's transaction list.
 */

const f1 = require('../../../../assets/images/sabledash/face-1.jpg');
const f2 = require('../../../../assets/images/sabledash/face-2.jpg');
const f3 = require('../../../../assets/images/sabledash/face-3.jpg');

export const copy = {
  title: ['Financial', 'Dashboard'],
  balanceCaption: 'Total balance',
  transactions: 'Transactions',
  thisMonth: 'This month',
} as const;

export const balance = { major: '$10,7', unit: 'k' } as const;

export const actions = [
  { id: 'withdraw', label: 'Withdraw', out: true },
  { id: 'deposit', label: 'Deposit', out: false },
] as const;

export const months = ['August', 'September', 'October'] as const;
export const activeMonth = 'September';

export const card = '•••• 4527';

/**
 * The month's activity. The count is this list's length, not a figure beside
 * it — and the three most recent are shown, because a card headed
 * "Transactions" that lists none of them is a card with a hole in it.
 */
export const recent = [
  { id: 'r1', who: 'Keme Hardware', when: 'Today', amount: '-$84.20' },
  { id: 'r2', who: 'Salary', when: '28 Sep', amount: '+$3,120.00', in: true },
  { id: 'r3', who: 'Northline Rail', when: '26 Sep', amount: '-$41.60' },
];

const activity = Array.from({ length: 37 }, (_, i) => i);
export const count = String(activity.length);

export const crew = [f1, f2, f3] as const;
export const crewMore = '+7';
