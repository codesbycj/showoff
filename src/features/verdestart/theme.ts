/**
 * verdestart brand tokens, sampled off `ref/inspo/food/03.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Verdeat screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 *
 * **The brand and every dish on it are invented** (I1).
 */
export const ct = {
  page: '#FFFFFF',
  surface: '#FFFFFF',
  /** The tray a dish card sits on. */
  tray: '#F6F7F4',

  ink: '#171A16',
  /** 5.2:1 on white. */
  muted: '#5E6459',
  line: '#E8EAE4',

  /**
   * The board's green. **White on it is 2.5:1**, which fails R4 at every size
   * — so it is never a ground for type. Anything carrying white takes
   * `greenDeep` (5.6:1), and this one is left for marks and fills.
   */
  green: '#7CB518',
  greenDeep: '#4F7A0B',
  greenSoft: '#EDF6DD',
  onGreen: '#FFFFFF',

  /** Prices, which the board sets in green on white: 4.8:1 at this step. */
  priceInk: '#4F7A0B',

  /** The saved heart and the calorie flame. */
  heart: '#E23D28',
  flame: '#E2731B',

  dark: '#171A16',
  onDark: '#FFFFFF',
  white: '#FFFFFF',
} as const;
