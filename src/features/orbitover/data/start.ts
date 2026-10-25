/**
 * Everything the overview says and counts, so the components stay
 * presentational.
 *
 * **Every figure on this screen is derived from one of two arrays.** The
 * reference's are typed, and they disagree: it heads the screen "Jan 2022"
 * and then plots Feb to Aug; it prints the card's balance as "$1,924,3",
 * which is a truncated number with a comma for a decimal point; and it mixes
 * "-$102,24" with "$1,924.30" two blocks apart. Here the chart ends on the
 * month in the header, the lit month *is* the delta under the total, the day
 * header's figure is the sum of the rows beneath it, and `money` formats all
 * of them the same way.
 *
 * Each row carries what it was for rather than the date it happened on. The
 * reference repeats "13 jan 22" on every row under a heading that already
 * says "13 January 2022"; the useful second line is the category.
 *
 * **The merchants are invented.** The reference's rows name two real
 * companies; a showcase does not get to put words in someone else's mouth,
 * and their marks are theirs. These two are made up, and their marks are
 * small flat shapes — squarely inside drawing range.
 */

export const copy = {
  title: 'Overview',
  statistic: 'Statistic',
  day: '13 January 2022',
} as const;

/** In pennies, so nothing is ever a float. */
export const balance = 192430;

/** The last seven months' spend, ending on the month in the header. */
export const months = [
  { key: 'Jul', amount: 28140 },
  { key: 'Aug', amount: 51760 },
  { key: 'Sep', amount: 19320 },
  { key: 'Oct', amount: 37480 },
  { key: 'Nov', amount: 24910 },
  { key: 'Dec', amount: 60250 },
  { key: 'Jan', amount: 43535 },
] as const;

/** The month the screen is reading. The header, the delta and the chart's
 *  tooltip all come off this one key. */
export const selectedMonth = 'Jan';
export const year = 2022;

export const card = {
  last4: '3425',
  scheme: 'Everyday',
} as const;

export const pages = { total: 3, at: 0 };

export const rows = [
  { id: 't1', name: 'Loomwell', kind: 'Subscription', at: '3:24 PM', amount: -10224, tone: 'rose' },
  { id: 't2', name: 'Ardent Studio', kind: 'Design', at: '1:08 PM', amount: -3224, tone: 'amber' },
  { id: 't3', name: 'Harbour Press', kind: 'Books', at: '11:42 AM', amount: -5890, tone: 'mint' },
  {
    id: 't4',
    name: 'Nine Yards Gym',
    kind: 'Membership',
    at: '8:15 AM',
    amount: -2140,
    tone: 'lilac',
  },
] as const;

export const money = (pennies: number) => {
  const sign = pennies < 0 ? '-' : '';
  const value = Math.abs(pennies) / 100;
  return (
    sign +
    '$' +
    value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
};

/** The month in the header, written out. */
export const periodLabel = selectedMonth + ' ' + year;

/** What the lit month cost — the delta under the total, and the tooltip. */
export const monthSpend = months.find((m) => m.key === selectedMonth)?.amount ?? 0;

/** What the day on the sheet cost: the rows, added up. */
export const daySpend = rows.reduce((sum, r) => sum + r.amount, 0);
