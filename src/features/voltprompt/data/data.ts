/**
 * Everything the prompts screen says, so the components stay presentational.
 *
 * **The chart is the figures.** Five hourly readings, the headline is the
 * change across them, and the tooltip is the hour it marks — all read from
 * `hours`. The reference prints "+360%" over a chart whose bars do not move
 * by anything like that, which is what happens when the number and the
 * picture are placed separately.
 */

export const copy = {
  title: 'AI Assistant',
  prompts: 'Prompts',
  draft: 'Prompt…',
} as const;

export const savedCount = 8;

/** The hour each bar stands for, and what was taken that hour. */
export const hours = [
  { id: 'h1', label: '01 pm', value: 2680, on: false },
  { id: 'h2', label: '02 pm', value: 12321, on: true },
  { id: 'h3', label: '03 pm', value: 5120, on: false },
  { id: 'h4', label: '04 pm', value: 7460, on: false },
  { id: 'h5', label: '05 pm', value: 9240, on: false },
] as const;

export const peak = hours[1];

/** +360% is the rise from the first hour to the peak, and it is computed. */
export const rise = `+${Math.round((peak.value / hours[0].value - 1) * 100)}%`;

export const salesNote = '234 orders';

export const leads = [
  { id: 'l1', value: '6,234', label: 'New leads' },
  { id: 'l2', value: '2,800', label: 'Active leads' },
  { id: 'l3', value: '23,487', label: 'Total market' },
] as const;

export const prompts = [
  { id: 'p1', label: 'Show sales statistics' },
  { id: 'p2', label: 'Show leads' },
] as const;
