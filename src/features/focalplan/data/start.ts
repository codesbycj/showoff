/**
 * Everything the schedule says, so the components stay presentational.
 *
 * **The weekday is computed, and the month really starts on a Monday.** The
 * reference heads the screen "Mon, 12 Sep, 2024" — 12 September 2024 was a
 * Thursday — and then lays out a grid whose 01 sits in the first column,
 * which only happens in a month that begins on a Monday. May 2028 does, and
 * has 31 days, so the reference's grid shape survives intact and the label
 * above it is true.
 *
 * **The two synced services are invented.** The reference names two real
 * products and wears their marks; neither is a showcase's to use.
 *
 * The runs below say which days belong to which kind of task, and the grid
 * joins each run into one pill. They are data because the legend under the
 * grid is generated from the same list — a legend typed separately from the
 * thing it explains is how a chart ends up with a colour nothing uses.
 */

export const today = new Date(2028, 4, 15);

export const copy = {
  title: 'Track your schedule',
  syncedWith: 'synced with',
  statistics: 'Overview statistics',
  calendar: 'Calendar & Tasks',
} as const;

export const services = ['Quillpad', 'Meetly'] as const;

export const tiles = [
  { id: 'time', value: '12h 33m', label: 'Total time', tone: 'lilac' },
  { id: 'productivity', value: '74%', label: 'Productivity', tone: 'lime' },
  { id: 'successful', value: '97%', label: 'Successful', tone: 'violetSoft' },
  { id: 'streak', value: '9 days', label: 'Current streak', tone: 'blueSoft' },
] as const;

export const kinds = [
  { id: 'important', label: 'Important tasks', tone: 'blue' },
  { id: 'everyday', label: 'Everyday tasks', tone: 'lime' },
  { id: 'unfulfilled', label: 'Unfulfilled tasks', tone: 'lilac' },
  { id: 'team', label: 'Team tasks', tone: 'violet' },
] as const;

/** Inclusive day ranges, each one kind of task. */
export const runs = [
  { from: 1, to: 5, kind: 'everyday' },
  { from: 12, to: 14, kind: 'important' },
  { from: 18, to: 21, kind: 'team' },
  { from: 22, to: 25, kind: 'unfulfilled' },
  { from: 29, to: 31, kind: 'everyday' },
] as const;

/** Days with nothing booked but something pencilled in. */
export const pencilled = [10, 15, 28];

export const dateLabel = today.toLocaleDateString('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/** The month `today` falls in: its length, and which weekday it opens on. */
export const month = (() => {
  const first = new Date(today.getFullYear(), today.getMonth(), 1);
  const length = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  // Monday-first, so Sunday (0) becomes 6.
  const offset = (first.getDay() + 6) % 7;
  return { length, offset };
})();

export const kindOf = (day: number) => runs.find((r) => day >= r.from && day <= r.to)?.kind;
