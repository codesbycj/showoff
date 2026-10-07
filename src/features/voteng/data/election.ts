/**
 * What VoteNG is, and where its tabs go — the two things both screens need.
 *
 * Everything a single screen owns lives beside this in `home.ts` and
 * `results.ts` rather than here. That is a filming constraint as much as a
 * tidiness one: the reveal for a screen copies its finished files over the
 * staged ones when it ends, so a shared data file would arrive fully populated
 * and the next screen would have nothing left to fill in.
 *
 * None of the figures in either file are real. See the note at the top of
 * `assets/images/voteng/CREDITS.md`.
 */

export const BRAND = {
  name: 'Vote',
  nameAccent: 'NG',
  tagline: 'Your Vote. Our Future.',
} as const;

/* -------------------------------------------------------------- boot splash */

export const BOOT = {
  certified: 'INEC Certified Feed',
  version: 'v2.6.4',
  blurb: 'Independent Electoral Real-Time Tally & Transparency Platform',
  seal: 'Federal Republic of Nigeria • General Election 2026',
  /**
   * The loader cycles these as the bar fills. The export swaps them on a timer
   * that runs slightly ahead of the bar, so the last line is already up when
   * the splash dismisses.
   */
  status: [
    'Authenticating certified INEC tally channels...',
    'Syncing 176,846 polling unit endpoints...',
    'Verifying result sheet signatures...',
    'Ready.',
  ],
  /** How long the splash holds before handing over to home, in ms. */
  holdMs: 2600,
} as const;

export const NAV = [
  { key: 'home', label: 'Home', route: '/voteng/home' },
  { key: 'results', label: 'Results', route: '/voteng/results' },
  { key: 'news', label: 'News', route: '/voteng/news' },
  { key: 'more', label: 'More', route: '/voteng/more' },
] as const;
