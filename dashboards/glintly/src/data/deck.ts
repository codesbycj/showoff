/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout. The reference's own tooltip reads "May 18, 20222",
 * which is a year with five digits, and its device split reads
 * 78.5 / 19.7 / 1.8 — which is 100, so that one holds. The year is corrected
 * and the split is computed from the counts here anyway.
 */
import { rng } from '@/data/rng';

export const SITE = { name: 'Metriqo', domain: 'metriqo.io', holder: 'Rin Adeyemi' };

/* -------------------------------------------------------------------- kpis */

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: number;
  icon: 'users' | 'revenue' | 'conv' | 'session';
}

export const KPIS: Kpi[] = [
  { id: 'users', label: 'Users', value: '284', delta: 1.02, icon: 'users' },
  { id: 'revenue', label: 'Revenue', value: '$3.194,24', delta: 2.75, icon: 'revenue' },
  { id: 'conv', label: 'Conv Rate', value: '2,85%', delta: 3.44, icon: 'conv' },
  { id: 'session', label: 'Session', value: '5.638', delta: 1.89, icon: 'session' },
];

/* ------------------------------------------------------ time-of-day heatmap */

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const SLOTS = ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm'];

/** A day-by-slot grid of users, seeded so it is the same every reload. */
export function byTimeOfDay(): number[][] {
  const next = rng(9011);
  return WEEKDAYS.map((_, d) =>
    SLOTS.map((_, s) => {
      /* Two humps: mid-morning and early evening, quieter at the weekend. */
      const shape =
        Math.exp(-((s - 5) ** 2) / 5) * 0.95 + Math.exp(-((s - 8) ** 2) / 4) * 0.6 + 0.08;
      const weekend = d === 0 || d === 6 ? 0.55 : 1;
      return Math.round(shape * weekend * (0.72 + next() * 0.56) * 820);
    }),
  );
}

/* ------------------------------------------------------------ active users */

export interface Span {
  id: string;
  label: string;
  points: number;
  ticks: string[];
}

export const SPANS: Span[] = [
  { id: 'day', label: 'Day', points: 24, ticks: ['00:00', '06:00', '12:00', '18:00', '23:00'] },
  { id: 'month', label: 'Month', points: 30, ticks: ['1', '8', '15', '22', '30'] },
  {
    id: 'year',
    label: 'Year',
    points: 32,
    ticks: ['Jan 2026', 'Mar 2026', 'May 2026', 'Jul 2026', 'Aug 2026'],
  },
];

const SHAPE = [0.42, 0.5, 0.38, 0.62, 1.0, 0.72, 0.58, 0.66];

export function activeUsers(spanId: string): number[] {
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[2];
  const next = rng(spanId.length * 1733 + span.points);
  return Array.from({ length: span.points }, (_, i) => {
    const f = SHAPE[Math.floor((i / span.points) * SHAPE.length)] ?? 0.5;
    return Math.round(5200 + f * 15800 + next() * 1600);
  });
}

export const peakIndex = (values: number[]) =>
  values.reduce((best, v, i) => (v > values[best] ? i : best), 0);

/**
 * What a point on the Active Users curve is.
 *
 * The reference's tooltip reads "May 18, 20222" — a five-digit year, and a
 * date that is nailed to the drawing rather than to the curve under it. This
 * one is computed from the index, so the callout over the peak names the
 * peak's own date whichever span is showing and wherever the peak falls.
 *
 * The year span runs Jan–Aug 2026, the eight months the reference labels, so
 * its 32 points are a touch over a week apart.
 */
export function spanPointLabel(spanId: string, i: number): string {
  if (spanId === 'day') return String(i).padStart(2, '0') + ':00';
  if (spanId === 'month')
    return new Date(2026, 4, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const day = new Date(2026, 0, 1 + Math.round((i * 242) / 31));
  return day.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* --------------------------------------------------------- device sessions */

export interface Device {
  id: string;
  label: string;
  sessions: number;
  token: string;
}

export const DEVICES: Device[] = [
  { id: 'desktop', label: 'Desktop', sessions: 8430, token: '--color-dev-desktop' },
  { id: 'mobile', label: 'Mobile', sessions: 2116, token: '--color-dev-mobile' },
  { id: 'tablet', label: 'Tablet', sessions: 193, token: '--color-dev-tablet' },
];

export const deviceTotal = () => DEVICES.reduce((t, d) => t + d.sessions, 0);

/* --------------------------------------------------------------- realtime */

export type SourceId = 'search' | 'direct' | 'social' | 'referral';

export interface LivePage {
  id: string;
  path: string;
  title: string;
  active: number;
  trend: number;
  source: SourceId;
}

/**
 * Sixteen pages, not the ten that fit: the list is the one region on this tab
 * that scrolls, and a list that fits its card has nothing for a scroll beat
 * to move (rule 9).
 */
export const LIVE_PAGES: LivePage[] = [
  { id: 'l1', path: '/pricing', title: 'Pricing', active: 148, trend: 12.4, source: 'search' },
  { id: 'l2', path: '/', title: 'Home', active: 126, trend: -3.2, source: 'direct' },
  {
    id: 'l3',
    path: '/docs/getting-started',
    title: 'Getting started',
    active: 92,
    trend: 8.1,
    source: 'search',
  },
  {
    id: 'l4',
    path: '/blog/measuring-funnels',
    title: 'Measuring funnels',
    active: 71,
    trend: 24.6,
    source: 'social',
  },
  { id: 'l5', path: '/changelog', title: 'Changelog', active: 54, trend: -1.1, source: 'direct' },
  {
    id: 'l6',
    path: '/integrations',
    title: 'Integrations',
    active: 41,
    trend: 4.7,
    source: 'referral',
  },
  {
    id: 'l7',
    path: '/docs/api',
    title: 'API reference',
    active: 33,
    trend: -6.3,
    source: 'search',
  },
  { id: 'l8', path: '/about', title: 'About', active: 21, trend: 0.9, source: 'direct' },
  { id: 'l9', path: '/careers', title: 'Careers', active: 17, trend: 15.2, source: 'social' },
  { id: 'l10', path: '/support', title: 'Support', active: 12, trend: -2.4, source: 'direct' },
  {
    id: 'l11',
    path: '/docs/events',
    title: 'Event reference',
    active: 9,
    trend: 6.8,
    source: 'search',
  },
  { id: 'l12', path: '/legal/privacy', title: 'Privacy', active: 7, trend: -0.4, source: 'direct' },
  {
    id: 'l13',
    path: '/blog/retention-cohorts',
    title: 'Retention cohorts',
    active: 6,
    trend: 31.5,
    source: 'social',
  },
  { id: 'l14', path: '/partners', title: 'Partners', active: 5, trend: 2.2, source: 'referral' },
  {
    id: 'l15',
    path: '/docs/sdk-js',
    title: 'JavaScript SDK',
    active: 4,
    trend: -1.7,
    source: 'search',
  },
  { id: 'l16', path: '/status', title: 'Status', active: 3, trend: 0.5, source: 'direct' },
];

export const liveTotal = () => LIVE_PAGES.reduce((t, p) => t + p.active, 0);

export interface Source {
  id: SourceId;
  label: string;
  icon: 'search' | 'globe' | 'users' | 'link';
  token: string;
}

export const SOURCES: Source[] = [
  { id: 'search', label: 'Search', icon: 'search', token: '--color-src-search' },
  { id: 'direct', label: 'Direct', icon: 'globe', token: '--color-src-direct' },
  { id: 'social', label: 'Social', icon: 'users', token: '--color-src-social' },
  { id: 'referral', label: 'Referral', icon: 'link', token: '--color-src-referral' },
];

/**
 * Each source's live count, **summed from the pages** rather than declared.
 *
 * A declared share is a second set of figures for the same thing, and the two
 * drift the moment a page's count changes — which is the defect that had a
 * card's spend disagreeing with its own ledger two episodes ago.
 */
export const sourceTotals = (): Record<SourceId, number> => {
  const out: Record<SourceId, number> = { search: 0, direct: 0, social: 0, referral: 0 };
  for (const p of LIVE_PAGES) out[p.source] += p.active;
  return out;
};

export interface LiveWindow {
  id: string;
  label: string;
  points: number;
  ticks: string[];
}

export const LIVE_WINDOWS: LiveWindow[] = [
  { id: 'm1', label: '1 min', points: 60, ticks: ['-60s', '-45s', '-30s', '-15s', 'now'] },
  { id: 'm30', label: '30 min', points: 30, ticks: ['-30m', '-22m', '-15m', '-7m', 'now'] },
  { id: 'h24', label: '24 hrs', points: 24, ticks: ['00:00', '06:00', '12:00', '18:00', 'now'] },
];

/**
 * Concurrent users over one of those windows, seeded.
 *
 * The day window gets the same two humps as the heatmap, because it is the
 * same traffic seen at a different resolution; the two short windows drift
 * around the live total instead.
 */
export function liveTrail(windowId: string): number[] {
  const win = LIVE_WINDOWS.find((w) => w.id === windowId) ?? LIVE_WINDOWS[0];
  const next = rng(2719 + win.points);
  const total = liveTotal();
  return Array.from({ length: win.points }, (_, i) => {
    if (win.id === 'h24') {
      const h = (i / win.points) * 24;
      const shape =
        Math.exp(-((h - 11) ** 2) / 18) * 0.95 + Math.exp(-((h - 17) ** 2) / 10) * 0.65 + 0.12;
      return Math.round(shape * total * (0.85 + next() * 0.3));
    }
    /* Two slow swells and a little jitter. Jitter alone — which is what a
       bare `base + random` gives — draws a 60-point saw that reads as noise
       rather than as traffic. */
    const swell =
      Math.sin(i / (win.points / 5)) * total * 0.09 +
      Math.sin(i / (win.points / 13)) * total * 0.04;
    return Math.round(total * 0.88 + swell + next() * total * 0.06);
  });
}

/* ------------------------------------------------------------- conversion */

export interface Segment {
  id: string;
  label: string;
}

export const SEGMENTS: Segment[] = [
  { id: 'all', label: 'All visitors' },
  { id: 'new', label: 'New' },
  { id: 'returning', label: 'Returning' },
];

export interface FunnelStep {
  id: string;
  label: string;
  users: number;
}

/**
 * The funnel, by segment.
 *
 * New and returning sum to the total at every step — the two segments are a
 * split of the same traffic, so a figure that does not add up is a figure the
 * viewer can catch on screen.
 */
const STEPS = [
  { id: 'visit', label: 'Visited the site', all: 42_180, new: 29_460, returning: 12_720 },
  { id: 'signup', label: 'Started a sign-up', all: 9_640, new: 6_020, returning: 3_620 },
  { id: 'verify', label: 'Verified an email', all: 6_210, new: 3_540, returning: 2_670 },
  { id: 'trial', label: 'Began a trial', all: 3_480, new: 1_760, returning: 1_720 },
  { id: 'paid', label: 'Paid', all: 1_202, new: 448, returning: 754 },
] as const;

export function funnelFor(segmentId: string): FunnelStep[] {
  const key = segmentId === 'new' ? 'new' : segmentId === 'returning' ? 'returning' : 'all';
  return STEPS.map((s) => ({ id: s.id, label: s.label, users: s[key] }));
}

/** End-to-end rate, to two places. */
export const funnelRate = (steps: FunnelStep[]) =>
  Math.round((steps[steps.length - 1].users / steps[0].users) * 10000) / 100;

/** What a step kept of the step before it. */
export const stepRate = (steps: FunnelStep[], i: number) =>
  i === 0 ? 100 : Math.round((steps[i].users / steps[i - 1].users) * 1000) / 10;

export interface Goal {
  id: string;
  label: string;
  note: string;
  completions: number;
  target: number;
  /** Money the goal is worth, where it has a price. 0 where it does not. */
  value: number;
}

/**
 * The goals. Sign-up, trial and paid carry the funnel's own figures, so the
 * two cards on this tab cannot disagree.
 */
export const GOALS: Goal[] = [
  {
    id: 'signup',
    label: 'Sign-up completed',
    note: 'Account created and first project opened',
    completions: 9640,
    target: 12_000,
    value: 0,
  },
  {
    id: 'verify',
    label: 'Email verified',
    note: 'Verification link followed within 24 hours',
    completions: 6210,
    target: 8000,
    value: 0,
  },
  {
    id: 'trial',
    label: 'Trial started',
    note: '14 days of the Growth plan, no card taken',
    completions: 3480,
    target: 4000,
    value: 0,
  },
  {
    id: 'newsletter',
    label: 'Newsletter joined',
    note: 'Opted in from the docs footer',
    completions: 2890,
    target: 3000,
    value: 0,
  },
  {
    id: 'paid',
    label: 'Subscription paid',
    note: 'First invoice settled',
    completions: 1202,
    target: 1500,
    value: 48_080,
  },
  {
    id: 'demo',
    label: 'Demo booked',
    note: 'Call held with the team',
    completions: 418,
    target: 600,
    value: 12_540,
  },
  {
    id: 'invite',
    label: 'Teammate invited',
    note: 'At least one invitation accepted',
    completions: 1964,
    target: 2400,
    value: 0,
  },
  {
    id: 'export',
    label: 'Report exported',
    note: 'A dashboard saved as PDF or CSV',
    completions: 884,
    target: 1000,
    value: 0,
  },
  {
    id: 'sdk',
    label: 'SDK installed',
    note: 'First event received from a live site',
    completions: 2412,
    target: 3200,
    value: 0,
  },
];

export const goalValue = () => GOALS.reduce((t, g) => t + g.value, 0);
