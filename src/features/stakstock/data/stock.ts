/**
 * Everything the stock screen says, so the components stay presentational.
 *
 * The company, the ticker, the price and every figure are invented. The
 * reference prints Apple Inc. and AAPL over made-up numbers; a real company's
 * name above invented prices is the one thing this project must not ship.
 *
 * **The series is the chart.** 48 closes, and the price, the change and the
 * crosshair are all read from it rather than written beside it — so the
 * picture and the figures cannot disagree, which on a design shot they
 * usually do.
 */

export const stock = {
  name: 'Halcyon Instruments',
  ticker: 'HLCN',
} as const;

/** 48 closes for the day, as a share of the plot's height. */
export const series = [
  0.34, 0.37, 0.33, 0.41, 0.46, 0.44, 0.52, 0.58, 0.55, 0.62, 0.69, 0.66, 0.74, 0.8, 0.77, 0.83,
  0.88, 0.84, 0.79, 0.86, 0.9, 0.86, 0.8, 0.74, 0.78, 0.83, 0.79, 0.72, 0.68, 0.73, 0.7, 0.64, 0.6,
  0.66, 0.71, 0.67, 0.61, 0.57, 0.63, 0.59, 0.54, 0.6, 0.56, 0.5, 0.46, 0.52, 0.48, 0.44,
] as const;

/** Where the crosshair stands, as a share across the series. */
export const crosshair = { at: 0.42, label: '+4.32 %' } as const;

/** The line the day opened on, which is what the change is measured from. */
export const openLevel = 0.52;

export const price = { now: '$176.02', change: '-$0.18 (-0.10%)', down: true } as const;

export const ranges = ['1D', '1W', '1M', '3M', '1Y', '5Y'] as const;
export const activeRange = '1D';

export const stats = [
  { id: 'pe', value: '29.40', label: 'P/E Ratio', tone: 'acid' },
  { id: 'gain', value: '+243.03%', label: '5 years gain', tone: 'slab' },
] as const;

export const action = 'Buy Stock';
