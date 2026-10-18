/** The screen's content, kept out of the components so they stay presentational. */

export const user = {
  eyebrow: 'Welcome back,',
  name: 'Akmal Nasrulloh',
  initials: 'AN',
  title: 'Account',
} as const;

export type FlagName = 'us' | 'id';

export const cards = [
  {
    key: 'usd',
    flag: 'us' as FlagName,
    kind: 'US Dollar',
    scheme: true,
    balance: '$40,500.80',
    number: '**** 9934',
    valid: '05/28',
  },
  {
    key: 'idr',
    flag: 'id' as FlagName,
    kind: 'Rupiah',
    scheme: false,
    balance: 'Rp420,500',
    number: '**** 7732',
    valid: '11/27',
  },
] as const;

export const labels = {
  balance: 'Your balance',
  number: 'Account number',
  valid: 'Valid Thru',
  request: 'Request',
  transfer: 'Transfer',
  section: 'Transaction',
  viewAll: 'View all',
  today: 'TODAY',
} as const;

export const transactions = [
  {
    key: 'out',
    title: 'Transfer to Firmansyah A.',
    time: '04:03 PM',
    amount: '- $20',
    out: true,
  },
  {
    key: 'in',
    title: 'Receive from Adam S.',
    time: '02:15 PM',
    amount: '+ $1,300',
    out: false,
  },
  {
    key: 'coffee',
    title: 'Transfer to Kopi Kenangan',
    time: '11:42 AM',
    amount: '- $6',
    out: true,
  },
  {
    key: 'salary',
    title: 'Receive from PT Ananta',
    time: '09:05 AM',
    amount: '+ $2,400',
    out: false,
  },
  {
    key: 'rent',
    title: 'Transfer to Ibu Sari',
    time: '08:12 AM',
    amount: '- $340',
    out: true,
  },
] as const;

export type TabKey = 'home' | 'statistic' | 'activity' | 'card';

export const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'statistic', label: 'Statistic' },
  { key: 'activity', label: 'Activity' },
  { key: 'card', label: 'Card' },
];
