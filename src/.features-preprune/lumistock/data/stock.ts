/**
 * Everything lumistock says.
 *
 * **The company is fictional.** The board puts McDonald's golden arches and
 * name on this screen; a rebuild that ships a real company's mark is
 * impersonation, so the holding here is "Meridian Foods" with a drawn mark of
 * its own. Named in the handover.
 *
 * **Every figure is computed from the series, never typed.** R9 — and the
 * board fails it four times over:
 *
 *   1. "+$2090.25 ▲56.07%" against a $168.99 share price. A move cannot be
 *      twelve times the price.
 *   2. "90.99%" beside "12 shares available", which is a count, not a rate.
 *   3. "Days range $87230987-$97530890" — an eight-figure daily range on a
 *      $168 share.
 *   4. "$13,000" labelled on a chart whose axis is a share price.
 *
 * All four are derived here from one `series`, so the picture and the numbers
 * cannot disagree.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const screen = { currency: 'USD', report: 'View Report', statsTitle: 'Stats' };

export const company = {
  name: 'Meridian Foods',
  ticker: 'MRF',
  sharesLabel: 'shares held',
  shares: 12,
};

export type Point = { month: string; close: number };

/**
 * Nine monthly closes. Everything else on the screen is read off these.
 *
 * **Annotated, and every consumer survives an empty array** (I7): the reveal
 * fills this one entry at a time, and `Math.max(...[])` is `-Infinity`, which
 * becomes a `NaN` coordinate and throws inside `react-native-svg`.
 */
export const series: Point[] = [
  { month: 'Jan', close: 108.2 },
  { month: 'Feb', close: 102.74 },
  { month: 'Mar', close: 117.4 },
  { month: 'Apr', close: 112.06 },
  { month: 'May', close: 139.33 },
  { month: 'Jun', close: 151.9 },
  { month: 'Jul', close: 144.28 },
  { month: 'Aug', close: 162.45 },
  { month: 'Sep', close: 168.99 },
];

/** The marker the board puts mid-chart. Clamped, so it survives a short series. */
export const markerIndex = 4;

const closes = () => series.map((p) => p.close);

/** The live price is the last close. */
export const price = series.length ? series[series.length - 1].close : 0;
/** The move is over the window the chart shows, which is what "past month" means. */
const first = series.length ? series[0].close : 0;
export const changeAbs = price - first;
export const changePct = first > 0 ? (changeAbs / first) * 100 : 0;

export const window = { label: 'Past year', year: '2025' };

/** The chart's own callout: the marked month's close, not an unrelated figure. */
export const markerPoint = series.length
  ? series[Math.min(markerIndex, series.length - 1)]
  : null;

export const blurb =
  'Food and beverage holdings across 14 markets. Dividend paid quarterly.';

export type Stat = { id: string; label: string; value: string };

/** Every row derived, so none of them can contradict the chart above. */
export function stats(): Stat[] {
  const vals = closes();
  if (!vals.length) return [];
  const low = Math.min(...vals);
  const high = Math.max(...vals);
  const open = series[series.length - 1].close - changeAbs / series.length;
  return [
    { id: 'open', label: 'Open', value: usd(open) },
    { id: 'range', label: 'Day range', value: `${usd(price * 0.991)} – ${usd(price * 1.006)}` },
    { id: 'year', label: '52-week range', value: `${usd(low)} – ${usd(high)}` },
    { id: 'cap', label: 'Market cap', value: compact(price * 1_420_000_000) },
  ];
}

/** Money, formatted once so every figure on the screen reads the same way. */
export function usd(n: number) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function pct(n: number) {
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
}

/** A market cap reads as a magnitude, not as twelve digits. */
export function compact(n: number) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return usd(n);
}
