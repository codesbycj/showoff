/**
 * kovahome brand tokens, sampled off `ref/inspo/social-media-app/03.png`.
 *
 * Taken as the modal colour of a box - single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Kova screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#F4F5F7',
  surface: '#FFFFFF',
  tray: '#EBECEF',

  ink: '#111317',
  /** 5.3:1 on the page. */
  muted: '#646A77',
  faint: '#9BA1AD',
  line: '#E3E5EA',

  /** The dark pill the board uses for its primary marks. */
  dark: '#111317',
  onDark: '#FFFFFF',

  /** Up and down, both measured on white (R4). */
  up: '#1E7A4B',
  down: '#C62828',

  violet: '#6D5BD0',
  violetSoft: '#EDEAFA',
  white: '#FFFFFF',
} as const;
