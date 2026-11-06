/**
 * Everything the activity screen counts.
 *
 * **The axis brackets the data.** The tick step is chosen so the top
 * gridline is at or above the largest day — a nice-tick loop that stops at
 * the maximum leaves the tallest bar standing above its own axis, which is
 * the chart defect this repo has shipped before.
 *
 * **The total is summed from the days.** The reference prints $10,274.38
 * over a week whose bars do not add up to it; here the headline is the sum,
 * so the number and the picture cannot disagree.
 */
export const copy = {
  title: 'Account Activity',
  expense: 'Expense',
  income: 'Income',
  totalExpense: 'Total Expense',
  totalIncome: 'Total Income',
  period: 'This Week',
  overview: 'Overview',
  viewDetail: 'View detail',
} as const;

export const days = [
  { id: 'mon', label: 'Mon', value: 262.4 },
  { id: 'tue', label: 'Tue', value: 178.9 },
  { id: 'wed', label: 'Wed', value: 474.26, on: true },
  { id: 'thu', label: 'Thu', value: 318.2 },
  { id: 'fri', label: 'Fri', value: 241.5 },
  { id: 'sat', label: 'Sat', value: 352.8 },
  { id: 'sun', label: 'Sun', value: 446.32 },
] as const;

export const marked = days.find((d) => 'on' in d && d.on) ?? days[0];

const sum = days.reduce((t, d) => t + d.value, 0);

export const money = (n: number) =>
  `$ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const total = money(sum);

/** Five ticks, stepped so the top one is not below the tallest day. */
export const axisTop = Math.ceil(Math.max(...days.map((d) => d.value)) / 100) * 100;
export const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(axisTop * f));

export const categories = [
  {
    id: 'groceries',
    name: 'Groceries',
    spent: 260,
    budget: 400,
    tint: '#5B4BD6',
    icon: 'bag' as const,
  },
  {
    id: 'transport',
    name: 'Transport',
    spent: 138,
    budget: 250,
    tint: '#1C7A72',
    icon: 'car' as const,
  },
  { id: 'dining', name: 'Dining', spent: 184, budget: 200, tint: '#C2761B', icon: 'cup' as const },
];

export const tabs = [
  { id: 'home', label: 'Home', icon: 'home' as const },
  { id: 'stat', label: 'Statistic', icon: 'stat' as const },
  { id: 'activity', label: 'Activity', icon: 'bell' as const },
  { id: 'profile', label: 'Profile', icon: 'person' as const },
];
