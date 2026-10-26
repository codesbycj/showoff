/**
 * Everything the ledger screen says.
 *
 * **The hidden amounts are hidden, not blurred.** The reference blurs them,
 * which on a real screen is a privacy feature that leaks: a blur of a short
 * string is still a shape you can read the length of. Here a hidden row
 * carries a padlock and a redacted bar, and the figure is simply not in the
 * tree — there is nothing to recover.
 *
 * The one visible row is the one the user has just unlocked, which is why it
 * is the one picked out in green.
 */

export const copy = {
  hello: 'Hello,',
  name: 'Robin Marcosa',
  title: 'ACTIONS',
  colInfo: 'Info',
  colUser: 'User',
  colAmount: 'Amount',
} as const;

export const avatar = require('../../../../assets/images/nestactions/face-1.jpg');

/**
 * `coin` names the mark drawn beside the row; `amount` is present only on the
 * row that is open.
 */
export const rows = [
  {
    id: 'r1',
    coin: 'btc',
    user: 'Daniella G.',
    photo: require('../../../../assets/images/nestactions/face-2.jpg'),
    amount: null,
  },
  {
    id: 'r2',
    coin: 'eth',
    user: 'Daniel K.',
    photo: require('../../../../assets/images/nestactions/face-3.jpg'),
    amount: '0.01523 ETH',
  },
  {
    id: 'r3',
    coin: 'ada',
    user: 'Anatoly B.',
    photo: require('../../../../assets/images/nestactions/face-4.jpg'),
    amount: null,
  },
  {
    id: 'r4',
    coin: 'dot',
    user: 'Anatoly B.',
    photo: require('../../../../assets/images/nestactions/face-5.jpg'),
    amount: null,
  },
  {
    id: 'r5',
    coin: 'sol',
    user: 'Arnold D.',
    photo: require('../../../../assets/images/nestactions/face-6.jpg'),
    amount: null,
  },
  {
    id: 'r6',
    coin: 'eth',
    user: 'Kenny L.',
    photo: require('../../../../assets/images/nestactions/face-7.jpg'),
    amount: null,
  },
  {
    id: 'r7',
    coin: 'ltc',
    user: 'John R.',
    photo: require('../../../../assets/images/nestactions/face-8.jpg'),
    amount: null,
  },
  {
    id: 'r8',
    coin: 'btc',
    user: 'Daniella G.',
    photo: require('../../../../assets/images/nestactions/face-9.jpg'),
    amount: null,
  },
] as const;

export const openRow = 'r2';
