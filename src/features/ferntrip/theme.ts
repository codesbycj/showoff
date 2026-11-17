/**
 * ferntrip brand tokens, sampled off `ref/inspo/travel-app/03.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15–20% off.
 *
 * Duplicated across the three Fernweh screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  /** The sheet under the summit. */
  page: '#E2EDE2',
  surface: '#FFFFFF',

  ink: '#16211A',
  /** 5.4:1 on the sheet. */
  muted: '#505C4C',
  line: '#CCDCCD',

  forest: '#1F3324',
  onForest: '#FFFFFF',

  /** The board's star, golden rather than its lime. Ink on it is 9.6:1. */
  gold: '#EBD52B',
  /** The reviews link: 4.8:1 on white. */
  link: '#5C7A17',

  /** The controls that float on the photograph. */
  scrimDisc: 'rgba(28,32,30,0.42)',

  white: '#FFFFFF',
} as const;
