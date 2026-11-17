/**
 * Everything orbithome says.
 *
 * **The bank and its people are invented** (I1). The board's activity list
 * names a real design tool and a real AI subscription.
 *
 * **R9: the balance is the opening balance plus the transactions**, so the
 * headline cannot disagree with the list under it, and `orbitsend` spends from
 * the same number.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const brand = { name: 'Orbit' };

export const account = {
  hello: 'Hello, Marcella',
  welcome: 'Welcome back',
  balanceLabel: 'Account balance',
  avatar: require('../../../../assets/images/orbithome/me.jpg'),
};

/** What the account held before today's movements. */
export const OPENING = 24037;

export type Action = {
  id: string;
  label: string;
  glyph: 'transfer' | 'withdraw' | 'topup' | 'more';
};

export const actions: Action[] = [
  { id: 'transfer', label: 'Transfer', glyph: 'transfer' },
  // STEP 1.10 "Withdraw"
  // { id: 'withdraw', label: 'Withdraw', glyph: 'withdraw' },
  // STEP 1.11 "Top up"
  // { id: 'topup', label: 'Top up', glyph: 'topup' },
  // STEP 1.12 "More"
  // { id: 'more', label: 'More', glyph: 'more' },
];

export const sections = {
  quickSend: 'Quick Send',
  transactions: 'Transactions',
  seeAll: 'See all',
};

export type Contact = { id: string; name: string; image: number };

export const contacts: Contact[] = [
  { id: 'adrian', name: 'Adrian', image: require('../../../../assets/images/orbithome/c1.jpg') },
  { id: 'martin', name: 'Martin', image: require('../../../../assets/images/orbithome/c2.jpg') },
  { id: 'stefan', name: 'Stefan', image: require('../../../../assets/images/orbithome/c3.jpg') },
  { id: 'sophie', name: 'Sophie', image: require('../../../../assets/images/orbithome/c4.jpg') },
  { id: 'nadia', name: 'Nadia', image: require('../../../../assets/images/orbithome/c5.jpg') },
];

export type Promo = { id: string; title: string; body: string; glyph: 'gift' | 'stats' };

export const promos: Promo[] = [
  {
    id: 'referral',
    title: 'Referral bonus',
    body: 'Invite a friend, earn £15 each',
    glyph: 'gift',
  },
  // STEP 1.20 "Almost there"
  // {
  //   id: 'almost',
  //   title: 'Almost there',
  //   body: 'Two more sends to hit this tier',
  //   glyph: 'stats',
  // },
];

export type Movement = {
  id: string;
  name: string;
  time: string;
  /** Negative is money out. The row's colour and its state both read this. */
  amount: number;
  image: number;
  /** Only a transfer carries a reference; declared, not inferred. */
  reference?: string;
};

export const movements: Movement[] = [
  {
    id: 'adrian',
    name: 'Adrian Keller',
    time: '08:19 AM',
    amount: -399,
    image: require('../../../../assets/images/orbithome/c1.jpg'),
    reference: 'Rent share',
  },
  {
    id: 'stefan',
    name: 'Stefan Kutch',
    time: '10:19 PM',
    amount: 962,
    image: require('../../../../assets/images/orbithome/c3.jpg'),
  },
  {
    id: 'sophie',
    name: 'Sophie Varela',
    time: '09:02 PM',
    amount: -120,
    image: require('../../../../assets/images/orbithome/c4.jpg'),
  },
  {
    id: 'nadia',
    name: 'Nadia Brandt',
    time: '07:44 PM',
    amount: 120,
    image: require('../../../../assets/images/orbithome/c5.jpg'),
  },
];

/**
 * Guarded for the empty case, because the reveal stages `movements` one entry
 * at a time: `reduce` carries an initial value (I7).
 */
export function balanceFrom(rows: Movement[]) {
  return rows.reduce((sum, row) => sum + row.amount, OPENING);
}

export type Tab = { id: string; label: string; glyph: 'home' | 'cards' | 'stats' | 'me' };

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.24 "Cards"
  // { id: 'cards', label: 'Cards', glyph: 'cards' },
  // STEP 1.25 "Stats"
  // { id: 'stats', label: 'Stats', glyph: 'stats' },
  // STEP 1.26 "Account"
  // { id: 'me', label: 'Account', glyph: 'me' },
];
