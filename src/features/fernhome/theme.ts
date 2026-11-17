/**
 * fernhome brand tokens, sampled off `ref/inspo/travel-app/03.png`.
 *
 * Taken as the modal colour of a box - single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Fernweh screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#E9F0E4',
  surface: '#FFFFFF',
  tray: '#DCE7D6',

  ink: '#16211A',
  /** 5.5:1 on the page. */
  muted: '#55604F',
  faint: '#8B9586',
  line: '#D2DECB',

  /** The board's forest green, used as a ground for white type (6.8:1). */
  forest: '#1F3324',
  onForest: '#FFFFFF',

  /** The board's lime. Ink on it is 10:1; white on it is 1.7:1 (R4). */
  lime: '#C3E35A',
  limeDeep: '#8FB22B',
  onLime: '#16211A',

  white: '#FFFFFF',
} as const;
