/**
 * Everything the storage screen says, so the components stay presentational.
 *
 * **The three shares and the donut are one reading.** Videos, music and apps
 * are shares of what is used, and the donut is what is used out of what there
 * is — 120.3 of 254 GB, which is the 47% printed in it.
 */

export const copy = {
  brand: 'stash',
  title: 'My storage',
  search: 'search',
  memory: 'Memory status',
} as const;

const capacity = 254;
const used = 120.3;

export const stats = [
  { id: 'videos', label: 'videos', value: 42 },
  { id: 'music', label: 'music', value: 28 },
  { id: 'apps', label: 'apps', value: 30 },
] as const;

export const memory = {
  pct: Math.round((used / capacity) * 100),
  share: used / capacity,
  sub: used.toFixed(1) + ' of ' + capacity + ' GB used',
} as const;

export const dock = ['home', 'files', 'cloud', 'mic', 'me'] as const;
