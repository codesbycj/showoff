/**
 * Everything the wallet home says and counts, so the components stay
 * presentational.
 *
 * **The two flow cards are the history, added up.** The reference prints
 * "$9,080.00" in and "$3,080.00" out beside three rows that do not come to
 * either figure, and two of its three rows are the same transfer to the same
 * person for the same amount. Here `moneyIn` and `moneyOut` are computed from
 * `history`, and the rows are four different people.
 *
 * **The dates are real.** "Sun 02, 2026" names no month and may not be a
 * Sunday; 2 August 2026 is one.
 */

export const copy = {
  greeting: 'Good morning!',
  balanceLabel: 'Total Balance',
  moneyIn: 'Money In',
  moneyOut: 'Money Out',
  history: 'Transaction History',
  seeAll: 'See all',
  state: 'Successful',
} as const;

/** In pennies, so nothing is ever a float. */
export const balance = 3089060;

export const actions = [
  { id: 'add', label: 'Add' },
  { id: 'send', label: 'Send', primary: true },
  { id: 'more', label: 'More' },
] as const;

export const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'cards', label: 'Cards' },
  { id: 'stats', label: 'Stats' },
  { id: 'profile', label: 'Profile' },
] as const;

export const faces = [
  require('../../../../assets/images/kitehome/face-1.jpg'),
  require('../../../../assets/images/kitehome/face-2.jpg'),
  require('../../../../assets/images/kitehome/face-3.jpg'),
  require('../../../../assets/images/kitehome/face-4.jpg'),
  require('../../../../assets/images/kitehome/face-5.jpg'),
  require('../../../../assets/images/kitehome/face-6.jpg'),
];

export const history = [
  { id: 'h1', name: 'Transfer to Nahim', on: 'Sun, 2 Aug 2026', amount: -109000, face: 1 },
  { id: 'h2', name: 'Transfer to Ayomide', on: 'Sat, 1 Aug 2026', amount: -69000, face: 2 },
  { id: 'h3', name: 'From Dalia Mensah', on: 'Fri, 31 Jul 2026', amount: 908000, face: 3 },
  { id: 'h4', name: 'Transfer to Kwame', on: 'Thu, 30 Jul 2026', amount: -130000, face: 4 },
  { id: 'h5', name: 'From Imani Sowore', on: 'Wed, 29 Jul 2026', amount: 214500, face: 5 },
] as const;

export const moneyIn = history.filter((h) => h.amount > 0).reduce((s, h) => s + h.amount, 0);
export const moneyOut = -history.filter((h) => h.amount < 0).reduce((s, h) => s + h.amount, 0);

export const money = (pennies: number) =>
  '$' +
  (Math.abs(pennies) / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
