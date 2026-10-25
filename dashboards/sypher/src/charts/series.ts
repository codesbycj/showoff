export type SeriesId = 'revenue' | 'profit' | 'costs';

/**
 * The three lines, their colours and which axis each belongs to.
 *
 * In its own module rather than beside the chart because two components need
 * it, and exporting a constant from a file that also exports a component
 * breaks Fast Refresh for that file.
 */
export const SERIES_META: {
  id: SeriesId;
  label: string;
  colour: string;
  axis: 'left' | 'right';
}[] = [
  { id: 'revenue', label: 'Revenue', colour: 'var(--color-series-revenue)', axis: 'left' },
  { id: 'costs', label: 'Costs', colour: 'var(--color-series-costs)', axis: 'right' },
  { id: 'profit', label: 'Net profit', colour: 'var(--color-series-profit)', axis: 'left' },
];
