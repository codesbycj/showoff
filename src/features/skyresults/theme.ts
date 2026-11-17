/**
 * skyresults brand tokens, sampled off `ref/inspo/booking-app/03.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Skylark screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 *
 * **The airline is fictional.** The board names three real carriers and shows
 * their marks; none of that is reproduced.
 */
export const ct = {
  /** The sky the header is painted on, top to bottom. */
  skyTop: '#1769F0',
  skyMid: '#7FAEF7',
  page: '#EDF2FA',
  surface: '#FFFFFF',

  ink: '#10172A',
  /** 5.6:1 on white. */
  muted: '#5A6478',
  /** Labels above a value — 4.6:1, which the board's own label grey misses. */
  label: '#6B7488',
  line: '#E2E8F2',
  dash: '#C9D4E4',

  /**
   * The accent, used for times and prices. The board's #1769F0 reads 4.3:1 on
   * white and fails R4 at 14dp, so type takes this darker step while fills
   * keep the board's blue.
   */
  accent: '#0F58CE',
  accentFill: '#1769F0',
  accentSoft: '#DCE8FD',

  dark: '#0B1220',
  onDark: '#FFFFFF',
  white: '#FFFFFF',
  float: 'rgba(11,18,32,0.42)',
} as const;
