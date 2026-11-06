/**
 * Everything the analytics screen counts.
 *
 * **The chart is the figures.** The marked point is `months[4]` and the
 * tooltip prints that value, so the picture cannot disagree with the words —
 * and June is the series maximum, which is what a tooltip pinned to the peak
 * has to mean. The reference draws its peak in April and labels June.
 *
 * **"Suplies" is spelled "Supplies".** A design shot is not an authority on
 * spelling.
 */
export const copy = {
  title: 'Analytics',
  spendLabel: 'My Spending',
  deltaNote: 'From last week',
  expenseLabel: 'Expense',
  period: 'Jul 2024',
} as const;

export const spend = '$7,221.18';
export const deltaPct = 4.9;

/** The week behind the headline figure, Sunday first, with today picked out. */
export const week = [
  { id: 'su', label: 'S', value: 62 },
  { id: 'mo', label: 'M', value: 48 },
  { id: 'tu', label: 'T', value: 40 },
  { id: 'we', label: 'W', value: 86, on: true },
  { id: 'th', label: 'T', value: 96 },
  { id: 'fr', label: 'F', value: 54 },
  { id: 'sa', label: 'S', value: 72 },
] as const;

/** Six months of outgoings. The marked month is the one the tooltip names. */
export const months = [
  { id: 'feb', label: 'Feb', value: 1180 },
  { id: 'mar', label: 'Mar', value: 980 },
  { id: 'apr', label: 'Apr', value: 1760 },
  { id: 'may', label: 'May', value: 1410 },
  { id: 'jun', label: 'Jun', value: 1975, mark: true },
  { id: 'jul', label: 'Jul', value: 1830 },
] as const;

export const marked = months.find((m) => 'mark' in m && m.mark) ?? months[months.length - 1];

/** The headline expense is the sum of the categories under it, to the cent. */
export const categories = [
  { id: 'health', name: 'Healthcare', amount: 450 },
  { id: 'food', name: 'Food', amount: 250 },
  { id: 'utils', name: 'Utilities', amount: 275 },
  { id: 'supplies', name: 'Supplies', amount: 150 },
  { id: 'travel', name: 'Travel', amount: 957.12 },
] as const;

const total = categories.reduce((sum, c) => sum + c.amount, 0);

export const expense = `-$${total.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;

export const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
