/**
 * Everything vitalweight says.
 *
 * **The board's own stat row is impossible and is fixed here** (R9): it prints
 * "Avg Wt 03.7 Kg" beside "Current Wt 67.0" and "Wt Track 62.9". An average of
 * 3.7 kg next to a current of 67 is not a rounding error, it is a different
 * quantity. Every tile below is computed from the one series.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const screen = { title: 'Weight Breakdown', predictions: 'Weight Predictions' };

export type Point = { label: string; kg: number };

/**
 * Five readings. Everything else on the screen is read off these.
 *
 * **Every consumer survives an empty array** (I7): the reveal fills this one
 * entry at a time, and `Math.max(...[])` is `-Infinity`, which becomes a `NaN`
 * coordinate and throws inside `react-native-svg`.
 */
export const series: Point[] = [
  { label: 'Q1', kg: 61.4 },
  { label: 'Q2', kg: 64.8 },
  { label: 'Q3', kg: 62.9 },
  { label: 'Q4', kg: 65.8 },
  { label: 'Q5', kg: 67.0 },
];

export const unit = 'Kg';

const values = () => series.map((p) => p.kg);

/** The latest reading. */
export function current(): number {
  return series.length ? series[series.length - 1].kg : 0;
}

/** FIX: a real average of the series, not the board's 03.7. */
export function average(): number {
  if (!series.length) return 0;
  return values().reduce((a, b) => a + b, 0) / series.length;
}

export function lowest(): number {
  const v = values();
  return v.length ? Math.min(...v) : 0;
}

export function logged(): number {
  const v = values();
  return v.length > 1 ? v[v.length - 2] : current();
}

export type Stat = {
  id: string;
  label: string;
  value: number;
  glyph: 'scale' | 'spark' | 'chart' | 'target';
};

/** Four tiles, every value derived — so none can contradict the chart above. */
export function stats(): Stat[] {
  return [
    { id: 's1', label: 'Weight Log', value: logged(), glyph: 'scale' },
    { id: 's2', label: 'Current Wt', value: current(), glyph: 'spark' },
    { id: 's3', label: 'Avg Wt', value: average(), glyph: 'chart' },
    { id: 's4', label: 'Lowest Wt', value: lowest(), glyph: 'target' },
  ];
}

/**
 * The prediction card.
 *
 * **Mine, not the board's.** The board's own card is cut off by the artboard
 * edge with nothing in it but a title. I3's lever for that space is the
 * section the board cut, and a prediction screen genuinely carries a target
 * and a date. The figure is derived from the trend, not typed.
 */
export function trendPerPeriod(): number {
  if (series.length < 2) return 0;
  return (current() - series[0].kg) / (series.length - 1);
}

export function projected(periods = 2): number {
  return current() + trendPerPeriod() * periods;
}

export const prediction = {
  label: 'Projected in 2 quarters',
  note: 'Based on your last 5 readings',
};

/** Weights read to one decimal, as a scale does. */
export function kg(n: number) {
  return n.toFixed(1);
}
