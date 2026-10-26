/**
 * Everything the performance screen says and counts.
 *
 * **One decimal separator**, as on the wallet screen: the reference writes
 * "+1,52%" here and "$145,752.90" there.
 *
 * **The chart's tag is the chart.** `tagAt` names the point the callout
 * belongs to and the figure is that point against the one before it, so the
 * callout cannot drift off the line it is labelling.
 *
 * The news cards' marks are drawn; the second card's photograph is a
 * photograph, because it is a picture *of* someone.
 */

export const copy = {
  hello: 'Hello,',
  name: 'Robin Marcosa',
  performance: 'PERFORMANCE',
  news: 'LATEST NEWS',
  more: 'See More',
} as const;

export const avatar = require('../../../../assets/images/nestperf/face-1.jpg');

/**
 * Six months of portfolio value, in thousands.
 *
 * **These are values, not chart positions.** Plotting a share of the chart's
 * height directly and then taking a percentage *of that share* gives a figure
 * about the picture rather than about the money — the first version of this
 * read "+106.67%" for one month, which is what a ratio of two y-positions
 * looks like when you print it as a return. The share is derived from the
 * values instead, so the line and the callout are the same measurement.
 */
export const months = [
  { month: 'Nov', k: 142 },
  { month: 'Dec', k: 118 },
  { month: 'Jan', k: 128 },
  { month: 'Feb', k: 112 },
  { month: 'Mar', k: 149 },
  { month: 'Apr', k: 121 },
] as const;

const lo = Math.min(...months.map((m) => m.k));
const hi = Math.max(...months.map((m) => m.k));

/** The same six, placed on the chart: 0 at the lowest month, 1 at the highest. */
export const points = months.map((m) => ({
  month: m.month,
  value: 0.12 + ((m.k - lo) / (hi - lo)) * 0.76,
}));

/** The point the callout belongs to. */
export const tagAt = 2;

export const tagPct =
  Math.round(((months[tagAt].k - months[tagAt - 1].k) / months[tagAt - 1].k) * 10000) / 100;
export const tagText = `${tagPct > 0 ? '+' : ''}${tagPct.toFixed(2)}%`;

/** What the small square marker on the line counts. */
export const markerCount = 3;

export const news = [
  {
    id: 'n1',
    tone: 'mist',
    mark: 'percent',
    text: 'New discounts on cloud wallets are out',
    photo: null,
  },
  {
    id: 'n2',
    tone: 'blush',
    mark: 'flame',
    text: 'New coins and new features. Be sure to pick up a prize',
    photo: require('../../../../assets/images/nestperf/face-2.jpg'),
  },
] as const;
