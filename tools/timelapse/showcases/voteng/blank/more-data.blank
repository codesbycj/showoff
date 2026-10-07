/**
 * The More tab's content.
 *
 * Like News, this screen has no reference render — it is designed from the same
 * tokens as the two built screens. What it is *for* comes from what the rest of
 * the app leaves unanswered: home and results both tell you the national
 * picture and neither tells you anything about your own vote. So this tab is
 * the personal half — which polling unit you are registered at, the tools that
 * act on it, and what the app is allowed to send you.
 *
 * The account, the polling unit and the toggle states are invented, like every
 * other figure in this showcase. See `assets/images/voteng/CREDITS.md`.
 */

export const MORE_PAGE = {
  title: 'More',
  subtitle: 'Your registration, tools and alerts',
  toolsTitle: 'Election tools',
  prefsTitle: 'Alerts',
  aboutTitle: 'About',
} as const;

export const ACCOUNT = {
  name: 'Adaeze Nwosu',
  meta: 'PVC verified • Lagos',
  /** Shown on the card face; the real thing would never be this legible. */
  voterId: 'VIN 9041 2277 0163',
  action: 'View card',
} as const;

export const UNIT = {
  label: 'Your polling unit',
  name: 'Ikoyi Primary School I',
  code: 'PU 07 / 12 / 04 / 011',
  lga: 'Eti-Osa',
  state: 'Lagos',
  status: 'Results in',
} as const;

export type MoreRow = {
  key: string;
  label: string;
  note?: string;
  icon: 'pin' | 'flag' | 'calendar' | 'archive' | 'info' | 'database' | 'scale' | 'exit';
  tint: string;
  ink: string;
  /** Sets the label in the error red and drops the chevron — for Sign out. */
  danger?: boolean;
};

export const TOOLS: readonly MoreRow[] = [
  // STEP 5.11 find my unit
  // {
  //   key: 'find-unit',
  //   label: 'Find my polling unit',
  //   note: 'Search by VIN or address',
  //   icon: 'pin',
  //   tint: '#ECFDF5',
  //   ink: '#0B844D',
  // },
  // STEP 5.12 report an incident
  // {
  //   key: 'report',
  //   label: 'Report an incident',
  //   note: 'Goes to the observer desk',
  //   icon: 'flag',
  //   tint: '#FEF2F2',
  //   ink: '#DC2626',
  // },
  // STEP 5.13 the calendar
  // {
  //   key: 'calendar',
  //   label: 'Election calendar',
  //   note: 'Declaration, tribunal, swearing-in',
  //   icon: 'calendar',
  //   tint: '#EFF6FF',
  //   ink: '#2563EB',
  // },
  // STEP 5.14 the archive
  // {
  //   key: 'archive',
  //   label: 'Results archive',
  //   note: 'Every cycle since 1999',
  //   icon: 'archive',
  //   tint: '#FAF5FF',
  //   ink: '#9333EA',
  // },
];

export type Pref = { key: string; label: string; note: string; on: boolean };

export const PREFS: readonly Pref[] = [
  // STEP 5.18 result alerts
  // {
  //   key: 'live',
  //   label: 'Live result alerts',
  //   note: 'When a state finishes collating',
  //   on: true,
  // },
  // STEP 5.19 breaking news
  // {
  //   key: 'breaking',
  //   label: 'Breaking news',
  //   note: 'Declarations and legal challenges only',
  //   on: true,
  // },
  // STEP 5.20 data saver
  // {
  //   key: 'data-saver',
  //   label: 'Data saver',
  //   note: 'Hold photographs until you tap',
  //   on: false,
  // },
];

export const ABOUT: readonly MoreRow[] = [
  // STEP 5.23 about the app
  // { key: 'about', label: 'About VoteNG', icon: 'info', tint: '#F1F5F9', ink: '#475569' },
  // STEP 5.24 where the numbers come from
  // {
  //   key: 'sources',
  //   label: 'Where the numbers come from',
  //   icon: 'database',
  //   tint: '#F1F5F9',
  //   ink: '#475569',
  // },
  // STEP 5.25 the paperwork
  // { key: 'terms', label: 'Terms and privacy', icon: 'scale', tint: '#F1F5F9', ink: '#475569' },
  // STEP 5.26 the way out
  // { key: 'signout', label: 'Sign out', icon: 'exit', tint: '#FEF2F2', ink: '#DC2626', danger: true },
];

/** The build line, which ties this screen back to the splash's own badge. */
export const FOOTER = 'VoteNG v2.6.4 • INEC certified feed';
