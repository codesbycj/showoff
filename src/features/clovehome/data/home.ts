/**
 * Everything the home screen says, so the components stay presentational.
 *
 * **Four rows, not the reference's three.** The sheet runs from the action
 * buttons to the dock, and three rows leave about 90dp of nothing under the
 * last one. R1 says the fix is to add the row the reference crops, so the
 * fourth row is here and the list reaches the dock.
 *
 * The amounts are the reference's own, and the balance is the same figure the
 * opening screen's card carries, so the two showcases of this app agree.
 */
export const copy = {
  greeting: 'Hi, Jonathan',
  welcome: 'Welcome Back!',
  balanceLabel: 'Wallet Balance',
  balance: '$17,298.92',
  cards: 'Cards',
  send: 'Send',
  request: 'Request',
  activity: 'Recent Activity',
  seeDetails: 'See Details',
} as const;

export const unread = 6;

export const cards = [
  {
    id: 'mint',
    digits: '•••• 7391',
    art: require('../../../../assets/images/clovehome/card-mint.jpg'),
  },
  {
    id: 'onyx',
    digits: '•••• 4408',
    art: require('../../../../assets/images/clovehome/card-onyx.jpg'),
  },
] as const;

const avatar = require('../../../../assets/images/clovehome/avatar.jpg');
const avatar2 = require('../../../../assets/images/clovehome/avatar2.jpg');

export type Activity = {
  id: string;
  name: string;
  when: string;
  amount: string;
  kind: string;
  credit?: boolean;
  photo?: number;
  initials?: string;
  mark?: 'dribbble';
};

export const activity: Activity[] = [
  {
    id: 'a1',
    name: 'Dribbble',
    when: 'Today, 16.32',
    amount: '-$120',
    kind: 'Transfer',
    mark: 'dribbble',
  },
  {
    id: 'a2',
    name: 'Wilson Mango',
    when: 'Today, 10.12',
    amount: '-$240',
    kind: 'Transfer',
    initials: 'WM',
  },
  {
    id: 'a3',
    name: 'Abram Botosh',
    when: 'Yesterday',
    amount: '+$450',
    kind: 'Income',
    credit: true,
    photo: avatar,
  },
  {
    id: 'a4',
    name: 'Nora Albright',
    when: 'Yesterday',
    amount: '+$120',
    kind: 'Income',
    credit: true,
    photo: avatar2,
  },
];
