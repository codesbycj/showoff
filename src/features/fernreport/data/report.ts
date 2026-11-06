/**
 * Everything the report screen counts.
 *
 * **Three of the reference's strings are corrected.** "Expance" is
 * "Expense", "MAr" is "Mar", and "Vew more" is "View more". A design shot is
 * not an authority on spelling.
 *
 * **The tooltip was "$1.300" for a bar on an axis marked 10 to 40.** The
 * axis here is in the same unit as the data, its top tick is rounded up past
 * the largest month, and the tooltip prints the marked month's own value —
 * so there is one number and one picture of it.
 */
export const copy = {
  title: 'Report',
  income: 'Income',
  expense: 'Expense',
  totalIncome: 'Total Income',
  totalExpense: 'Total Expense',
  delta: '16%',
  bannerTitle: 'Get a new card type',
  bannerNote: 'View more',
  recent: 'Recent Transactions',
  seeAll: 'See All',
} as const;

export const months = [
  { id: 'jan', label: 'Jan', value: 420 },
  { id: 'feb', label: 'Feb', value: 686 },
  { id: 'mar', label: 'Mar', value: 512 },
  { id: 'apr', label: 'Apr', value: 744 },
  { id: 'may', label: 'May', value: 1300, on: true },
  { id: 'jun', label: 'Jun', value: 574 },
] as const;

export const marked = months.find((m) => 'on' in m && m.on) ?? months[0];

const sum = months.reduce((t, m) => t + m.value, 0);

export const money = (n: number) =>
  `$ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const total = money(sum);

/** The top tick is rounded up past the largest month, never level with it. */
export const axisTop = Math.ceil(Math.max(...months.map((m) => m.value)) / 500) * 500;
export const ticks = [500, 1000, axisTop];

export const transactions = [
  {
    id: 'r1',
    name: 'Top Up DANA',
    when: 'Today · 09:41',
    amount: '-$358.00',
    photo: require('../../../../assets/images/fernreport/payee.jpg'),
  },
  {
    id: 'r2',
    name: 'Salary',
    when: 'Yesterday · 08:00',
    amount: '+$2,400.00',
    credit: true,
    photo: require('../../../../assets/images/fernreport/payee.jpg'),
  },
];

export const tabs = [
  { id: 'home', label: 'Home', icon: 'home' as const },
  { id: 'stats', label: 'Report', icon: 'stats' as const },
  { id: 'goals', label: 'Goals', icon: 'target' as const },
  { id: 'profile', label: 'Profile', icon: 'person' as const },
];
