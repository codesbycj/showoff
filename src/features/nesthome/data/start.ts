/**
 * Everything the wallet screen says and counts.
 *
 * **One decimal separator.** The reference writes the balance as
 * "$145,752.90" and the change beside it as "+3,27%" — a comma for thousands
 * in one and for decimals in the other, two inches apart. Everything here
 * uses the same convention.
 *
 * **The BTC line is the balance converted**, not a second figure typed in,
 * so the two cannot drift apart.
 *
 * The account name is gender-neutral: the portraits come from a fixed pool,
 * so a gendered name pinned to whichever face lands first says something
 * about a real person that the data has no business saying.
 */

export const copy = {
  hello: 'Hello,',
  name: 'Robin Marcosa',
  label: 'ACCOUNT BALANCE',
  approx: '≈ ',
  btc: ' BTC',
} as const;

export const avatar = require('../../../../assets/images/nesthome/face-1.jpg');

export const balance = 145752.9;
export const btcPrice = 72155;
export const changePct = 3.27;

export const balanceText = balance.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const btcText = (balance / btcPrice).toFixed(2);
export const changeText = `${changePct > 0 ? '+' : ''}${changePct.toFixed(2)}%`;

export const contacts = [
  {
    id: 'c1',
    name: 'Caroline L.',
    tone: 'blush',
    photo: require('../../../../assets/images/nesthome/face-2.jpg'),
  },
  {
    id: 'c2',
    name: 'George L.',
    tone: 'mist',
    photo: require('../../../../assets/images/nesthome/face-3.jpg'),
  },
  {
    id: 'c3',
    name: 'Daniella G.',
    tone: 'lilac',
    photo: require('../../../../assets/images/nesthome/face-4.jpg'),
  },
  {
    id: 'c4',
    name: 'Islam A.',
    tone: 'mist',
    photo: require('../../../../assets/images/nesthome/face-5.jpg'),
  },
  {
    id: 'c5',
    name: 'Denis H.',
    tone: 'blush',
    photo: require('../../../../assets/images/nesthome/face-6.jpg'),
  },
  {
    id: 'c6',
    name: 'Nikita O.',
    tone: 'lilac',
    photo: require('../../../../assets/images/nesthome/face-7.jpg'),
  },
  {
    id: 'c7',
    name: 'Alex F.',
    tone: 'mist',
    photo: require('../../../../assets/images/nesthome/face-8.jpg'),
  },
] as const;
