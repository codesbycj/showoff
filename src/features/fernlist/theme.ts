/**
 * fernlist brand tokens, sampled off `ref/inspo/travel-app/03.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15–20% off.
 *
 * Duplicated across the three Fernweh screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  /** The list screen's cream, warmer than the home screen's green. */
  page: '#F2F1E7',
  surface: '#FFFFFF',
  tray: '#E6E5D9',

  ink: '#16211A',
  /** 5.6:1 on the cream. */
  muted: '#54604E',
  line: '#DBDACD',

  /** The board's forest green, used as a ground for white type (12:1). */
  forest: '#1E3122',
  onForest: '#FFFFFF',

  /** The board's lime. Ink on it is 10:1; white on it is 1.7:1 (R4). */
  lime: '#C3E35A',
  limeDeep: '#7E9F22',
  onLime: '#16211A',

  white: '#FFFFFF',
} as const;
