/**
 * Everything the assistant screen says, so the components stay
 * presentational.
 *
 * The brand and every figure are invented.
 *
 * **The changes have a direction and a colour that agrees with it.** The
 * reference prints a red-ish chip on a figure that went up and an acid one on
 * a figure that went down, which is the kind of thing a design shot does
 * because the chips were placed for balance rather than read from the data.
 * Here `up` decides both the sign and the fill.
 */

export const copy = {
  title: 'AI Assistant',
  ask: 'How can I help you?',
  draft: 'Show sales statistics',
} as const;

export const readings = [
  { id: 'm1', label: 'Total Market', value: '23,487', change: '2.4%', up: false, mark: 'box' },
  { id: 'm2', label: 'Total Sales', value: '6,848', change: '1.6%', up: true, mark: 'folder' },
  { id: 'm3', label: 'Leads', value: '128,024', change: '3.0%', up: true, mark: 'target' },
] as const;

/** What it offers to do next. The middle one is what the draft is about. */
export const chips = [
  { id: 'c1', label: 'Lead statistics', on: false },
  { id: 'c2', label: 'Show statistics', on: true },
  { id: 'c3', label: 'Sales statistics', on: false },
  { id: 'c4', label: 'Market share', on: false },
] as const;
