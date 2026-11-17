/**
 * alpenpick brand tokens, sampled off `ref/inspo/travel-app/02.png`.
 *
 * Taken as the modal colour of a box - single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Alpenroute screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#F4F3EC',
  surface: '#FFFFFF',
  tray: '#EDEDE3',

  ink: '#141712',
  /** 5.2:1 on the page. */
  muted: '#5F6358',
  faint: '#9A9D90',
  line: '#E2E2D6',

  /**
   * The board's lime. Ink on it is 11:1; white on it is 1.6:1, which is why
   * every label on the lime is dark (R4).
   */
  lime: '#C6E94B',
  limeDeep: '#A8CC28',
  onLime: '#141712',

  /** The dark pill the board uses for its primary chips. */
  dark: '#141712',
  onDark: '#FFFFFF',

  white: '#FFFFFF',
} as const;
