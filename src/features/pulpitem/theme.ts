/**
 * pulpitem brand tokens, sampled off `ref/inspo/food/22.png` as the modal
 * colour of a box - single-pixel reads land on antialiased edges and come back
 * 15-20% off.
 *
 * Duplicated across the three Pulp screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#F3F3F3',
  card: '#FFFFFF',

  ink: '#141414',
  /** 5.8:1 on the page, 6.2:1 on white. The board's grey is 4.0:1 (R4). */
  muted: '#5F5F5F',
  line: '#E4E4E2',

  /** The green the board puts its route pin on. Ink on it reads 11:1. */
  green: '#64D294',
  onGreen: '#141414',

  /** The floating dock. */
  dark: '#141414',
  onDark: '#FFFFFF',
  /** The dock's inactive glyph - 5.1:1 on the dark pill. */
  onDarkMuted: '#9A9A9A',

  white: '#FFFFFF',
} as const;
