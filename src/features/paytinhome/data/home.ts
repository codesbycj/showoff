/**
 * The screen's content, kept out of the components so they stay presentational.
 */

export const account = {
  name: 'William Current',
  greeting: 'Welcome Back',
  brand: 'VISA',
  balanceLabel: 'Balance',
  balance: '$ 25,453.00',
  number: '**** **** **** 7281',
  expiryLabel: 'Exp',
  expiry: '07/26',
  budget: 'Set Budget',
} as const;

export type ActionName = 'send' | 'bill' | 'mobile' | 'more';

export const actions: { key: ActionName; label: string; accent: boolean }[] = [
  { key: 'send', label: 'Send', accent: false },
  { key: 'bill', label: 'Bill', accent: false },
  { key: 'mobile', label: 'Mobile', accent: false },
  { key: 'more', label: 'More', accent: true },
];

/**
 * The quick-send contacts.
 *
 * Each contact carries a free-licensed portrait, bundled and credited in
 * `assets/images/paytinhome/CREDITS.md`. `face` is an index into `FACES`.
 */
export const contacts = [
  { key: 'azie', name: 'Azie', face: 1 },
  { key: 'chaoir', name: 'Chaoir', face: 2 },
  { key: 'fandit', name: 'Fandit', face: 3 },
  { key: 'happy', name: 'Happy', face: 4 },
  { key: 'nayu', name: 'Nayu', face: 5 },
] as const;

export type ActivityGlyph = 'basket' | 'house' | 'subscription' | 'basket-alt';

export const activity: {
  key: string;
  title: string;
  date: string;
  amount: string;
  glyph: ActivityGlyph;
}[] = [
  {
    key: 'food-1',
    title: 'Food Store',
    date: 'Monday, 25 January',
    amount: '-$15.00',
    glyph: 'basket',
  },
  {
    key: 'rent',
    title: 'House Rent',
    date: 'Monday, 25 January',
    amount: '-$290.00',
    glyph: 'house',
  },
  {
    key: 'sub',
    title: 'Subscription',
    date: 'Sunday, 24 January',
    amount: '-$27.00',
    glyph: 'subscription',
  },
  {
    key: 'food-2',
    title: 'Food Store',
    date: 'Sunday, 24 January',
    amount: '-$15.00',
    glyph: 'basket-alt',
  },
  {
    key: 'rent-2',
    title: 'House Rent',
    date: 'Saturday, 23 January',
    amount: '-$290.00',
    glyph: 'house',
  },
  {
    key: 'sub-2',
    title: 'Subscription',
    date: 'Friday, 22 January',
    amount: '-$27.00',
    glyph: 'subscription',
  },
];

export type DockKey = 'stats' | 'scan' | 'more';

export const dock: { key: DockKey; accent: boolean }[] = [
  { key: 'stats', accent: false },
  { key: 'scan', accent: true },
  { key: 'more', accent: false },
];
