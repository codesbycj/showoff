/**
 * Everything the task screen says, so the components stay presentational.
 *
 * The chart is data rather than a picture of a chart: six days, each with a
 * height and a change, and the chips are placed from those numbers. A design
 * shot can draw a chart that does not add up — this one does.
 */

export const copy = {
  title: 'Delivery App UI Kit',
  progress: 'Task Progress',
  timeline: 'Task Timeline',
  notice: 'You have a good progress',
} as const;

/**
 * The six days on the chart. `height` is a share of the plot, `peak` marks the
 * day the card is about, and `chip` is the change pinned beside that column.
 */
export const days = [
  { day: '12', height: 0.3, peak: false, chip: { text: '+8%', tone: 'green', lift: 0.46 } },
  { day: '13', height: 0.24, peak: false, chip: { text: '+2%', tone: 'dark', lift: 0.2 } },
  { day: '14', height: 0.42, peak: false, chip: { text: '+10%', tone: 'orange', lift: 0.37 } },
  { day: '15', height: 0.55, peak: false, chip: { text: '+5%', tone: 'green', lift: 0.56 } },
  { day: '16', height: 1, peak: true, chip: { text: '+8%', tone: 'orange', lift: 0.3 } },
  { day: '17', height: 0.5, peak: false, chip: { text: '+6%', tone: 'green', lift: 0.55 } },
] as const;

export const peakLabel = '65%';

/**
 * The three bars on the timeline. `from` and `to` are positions across the
 * same six days the chart uses, so the two cards share one scale and the
 * marker line can sit on day 16 in both.
 */
export const timeline = [
  { id: 'interview', label: 'Interview', from: 0, to: 0.56, tone: 'orange' },
  { id: 'ideate', label: 'Ideate', from: 0.2, to: 0.84, tone: 'green' },
  { id: 'wireframe', label: 'Wireframe', from: 0.42, to: 1, tone: 'blue' },
] as const;

/** Which day the marker line stands on, as a share of the axis. */
export const marker = 0.8;
