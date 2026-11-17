/**
 * cocoacart brand tokens, sampled off `ref/inspo/ecommerce-app/30.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15–20% off.
 *
 * Duplicated across the three Cocoa screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#FFFFFF',
  card: '#F4F5F7',

  ink: '#1A1A1A',
  /** 5.7:1 on white. */
  muted: '#5B5B5B',
  line: '#E6E6E8',

  /** The two collection cards. */
  blush: '#FFEAED',
  lime: '#EEF3C9',

  /** The yellow the board puts its prices and totals on. Ink on it is 12:1. */
  yellow: '#FDED8A',
  onYellow: '#1A1A1A',

  /** The dark sheet the cart and the pinned bar are built from. */
  dark: '#1A1A1A',
  onDark: '#FFFFFF',

  white: '#FFFFFF',
} as const;
