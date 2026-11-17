import type { GlyphName } from '../components/glyph';

/**
 * Everything foldspend says, so the components stay presentational.
 *
 * **Every figure on this screen is computed** (R9). The board types
 * "Total Spending $1,376.90" over a chart whose bars reach $3k and a category
 * row whose first two entries alone add to $7,814. Here the total is summed
 * from the months, the expense tile is the same sum, and the categories are a
 * breakdown of it - so the picture always agrees with the numbers.
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const header = {
  title: 'Activity',
  totalLabel: 'Total spending',
  range: 'Month',
  categories: 'Categories',
  categoryFilter: 'Expense',
  transfers: 'Recent transfer',
  transferFilter: 'Today',
  income: 'Income',
  expense: 'Expense',
};

export type Month = { id: string; label: string; value: number };

export const months: Month[] = [
  { id: 'feb', label: 'Feb', value: 1240 },
  // STEP 1.09 "Mar"
  // { id: 'mar', label: 'Mar', value: 980 },
  // STEP 1.10 "Apr"
  // { id: 'apr', label: 'Apr', value: 1560 },
  // STEP 1.11 "May"
  // { id: 'may', label: 'May', value: 2140 },
  // STEP 1.12 "Jun"
  // { id: 'jun', label: 'Jun', value: 1820 },
  // STEP 1.13 "Jul"
  // { id: 'jul', label: 'Jul', value: 2460 },
];

/** Guarded for the empty case: the reveal fills `months` one bar at a time,
 *  and `Math.max()` of nothing is -Infinity (I7). */
export const spent = () => months.reduce((sum, m) => sum + m.value, 0);

export const peak = () => Math.max(...months.map((m) => m.value), 1);

/** Ticks **bracket** the data: the top tick is the first round thousand at or
 *  above the tallest bar, so no bar can ever out-reach the axis (R9). */
export const ticks = () => {
  const top = Math.max(1000, Math.ceil(peak() / 1000) * 1000);
  const step = top / 3;
  return [0, step, step * 2, top];
};

export const income = 12480;

export type Category = { id: string; label: string; value: number; icon: GlyphName };

/** A breakdown of `spent()`: 3607 + 4207.01 + 1185.99 + 1200 = 10,200. The
 *  fourth sits past the right edge of the rail, so it is carried by the
 *  figure rather than drawn as a tile nothing can see. */
export const categories: Category[] = [
  { id: 'investments', label: 'Investments', value: 3607, icon: 'bank' },
  // STEP 1.20 "Travelling"
  // { id: 'travel', label: 'Travelling', value: 4207.01, icon: 'car' },
  // STEP 1.21 "Subscriptions"
  // { id: 'subs', label: 'Subscriptions', value: 1185.99, icon: 'crown' },
];

export type Transfer = { id: string; name: string; kind: string; amount: number; icon: GlyphName };

export const transfers: Transfer[] = [
  { id: 'brody', name: 'Brody Zmymo', kind: 'Sent', amount: -128.08, icon: 'arrowUp' },
  // STEP 1.28 "Nadia Ray"
  // { id: 'nadia', name: 'Nadia Ray', kind: 'Received', amount: 240, icon: 'arrowDown' },
];

export const money = (n: number) =>
  `$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const signed = (n: number) => `${n < 0 ? '- ' : '+ '}${money(n)}`;

export const axisLabel = (n: number) => `$${Math.round(n / 1000)}k`;
