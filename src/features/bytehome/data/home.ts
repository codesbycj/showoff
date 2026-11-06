/**
 * Everything the home screen says.
 *
 * **Three rows, each sized to fill the sheet.** A fourth was tried: the
 * raised scan control rises 29dp above the dock, and once that clearance is
 * paid for there is room for three rows at a readable height and none for a
 * fourth. The rows grow to fill the space instead, so the list still ends on
 * the dock.
 */
export const copy = {
  brand: 'Byte',
  balanceLabel: 'Personal balance',
  balance: '$ 252,312.00',
  quickSend: 'Quick Send',
  recent: 'Recent Transaction',
  viewAll: 'View all',
  add: 'Add',
} as const;

export const actions = [
  { id: 'topup', label: 'Top Up', icon: 'topup' as const },
  { id: 'transfer', label: 'Transfer', icon: 'transfer' as const },
  { id: 'bill', label: 'Bill', icon: 'bill' as const },
  { id: 'other', label: 'Other', icon: 'other' as const },
];

export const people = [
  { id: 'sam', name: 'Sam', photo: require('../../../../assets/images/bytehome/sam.jpg') },
  { id: 'ana', name: 'Ana', photo: require('../../../../assets/images/bytehome/ana.jpg') },
  { id: 'john', name: 'John', photo: require('../../../../assets/images/bytehome/john.jpg') },
  { id: 'kate', name: 'Kate', photo: require('../../../../assets/images/bytehome/kate.jpg') },
];

export type Tx = {
  id: string;
  name: string;
  when: string;
  amount: string;
  credit?: boolean;
  mark: 'apple' | 'amazon' | 'paypal' | 'byte';
};

export const transactions: Tx[] = [
  {
    id: 't1',
    name: 'Apple services',
    when: '03 July 2024 · 18:24',
    amount: '- $50.00',
    mark: 'apple',
  },
  { id: 't2', name: 'Amazon', when: '12 June 2024 · 17:37', amount: '- $32.00', mark: 'amazon' },
  {
    id: 't3',
    name: 'Transfer from Paypal',
    when: '29 June 2024 · 09:12',
    amount: '+ $125.00',
    credit: true,
    mark: 'paypal',
  },
];

export const tabs = [
  { id: 'home', label: 'Home', icon: 'home' as const },
  { id: 'stat', label: 'Statistic', icon: 'stat' as const },
  { id: 'activity', label: 'Activity', icon: 'bell' as const },
  { id: 'profile', label: 'Profile', icon: 'person' as const },
];
