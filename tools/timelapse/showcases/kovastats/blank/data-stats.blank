/**
 * Everything kovastats says.
 *
 * **R9: every delta is computed from the two periods it compares**, so a tile
 * cannot print "+2.4% this week" beside numbers that fell. The board types all
 * four deltas and one of them disagrees with its own arrow.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES SS5.4, I7).
 */

export const header = { title: 'Insights', period: 'Last 7 days' };

export type Metric = {
  id: string;
  label: string;
  /** This period and the one before it, in whatever unit the label implies. */
  now: number;
  before: number;
  /** A percentage reads differently from a count; declared, not inferred. */
  unit?: 'percent';
};

export const metrics: Metric[] = [
  { id: 'followers', label: 'Followers', now: 48200, before: 47070 },
  // STEP 1.08 "Engagement"
  // { id: 'engagement', label: 'Engagement', now: 6.4, before: 5.6, unit: 'percent' },
  // STEP 1.09 "Reach"
  // { id: 'reach', label: 'Reach', now: 12100, before: 11400 },
  // STEP 1.10 "Impressions"
  // { id: 'impressions', label: 'Impressions', now: 34800, before: 35220 },
];

export type Post = {
  id: string;
  title: string;
  kind: string;
  date: string;
  rate: number;
  image: number;
};

export const topLabel = 'Top performing posts';

/**
 * Four, not the board's two. Two left 102dp of empty canvas above the dock -
 * an R1 GAP FAIL, and I3 says the fix is the rows the board cropped, never a
 * spacer. They are in rate order, which is what "top performing" claims (R9).
 */
export const posts: Post[] = [
  {
    id: 'collar',
    title: 'Cara designer dress, collar edit',
    kind: 'Reel',
    date: '23 Jan',
    rate: 8.9,
    image: require('../../../../assets/images/kovastats/p1.jpg'),
  },
  // STEP 1.15 "London day post"
  // {
  //   id: 'london',
  //   title: 'London day post',
  //   kind: 'Single',
  //   date: '23 Jan',
  //   rate: 7.1,
  //   image: require('../../../../assets/images/kovastats/p2.jpg'),
  // },
  // STEP 1.16 "Studio K brand teaser"
  // {
  //   id: 'studio',
  //   title: 'Studio K brand teaser',
  //   kind: 'Reel',
  //   date: '19 Jan',
  //   rate: 6.4,
  //   image: require('../../../../assets/images/kovastats/p3.jpg'),
  // },
  // STEP 1.17 "Nora portrait series"
  // {
  //   id: 'portrait',
  //   title: 'Nora portrait series',
  //   kind: 'Carousel',
  //   date: '16 Jan',
  //   rate: 5.8,
  //   image: require('../../../../assets/images/kovastats/p4.jpg'),
  // },
];

export type Tab = {
  id: string;
  label: string;
  glyph: 'home' | 'inbox' | 'stacks' | 'profile' | 'plus';
};

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.21 "Inbox"
  // { id: 'inbox', label: 'Inbox', glyph: 'inbox' },
  // STEP 1.22 "Jobs"
  // { id: 'jobs', label: 'Jobs', glyph: 'stacks' },
  // STEP 1.23 "Account"
  // { id: 'me', label: 'Account', glyph: 'profile' },
  // STEP 1.24 "New"
  // { id: 'new', label: 'New', glyph: 'plus' },
];

/** 48200 -> "48.2k". A count is a label, so it is formatted, never typed. */
export function show(metric: Metric) {
  if (metric.unit === 'percent') return `${metric.now.toFixed(1)}%`;
  if (metric.now >= 1000) return `${(metric.now / 1000).toFixed(1)}k`;
  return String(metric.now);
}

/**
 * The move against the period before, in percent.
 *
 * Guarded against a zero baseline: the reveal stages `metrics` one entry at a
 * time, and a divide by zero would print `Infinity%` (I7).
 */
export function delta(metric: Metric) {
  const base = Math.max(Math.abs(metric.before), 0.01);
  return ((metric.now - metric.before) / base) * 100;
}
