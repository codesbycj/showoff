/**
 * sonicexplore brand tokens, sampled off `ref/inspo/music-app/01.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Sonic screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 *
 * **A dark theme needs tokens that clear a dark ground** (R4). Every grey here
 * is chosen against `page`, not against white.
 */
export const ct = {
  page: '#0A0A0A',
  card: '#151515',
  cardEdge: '#1F1F1F',
  disc: '#1C1C1C',
  hairline: '#1E1E1E',

  ink: '#FFFFFF',
  /** 4.9:1 on #0A0A0A. The board's own secondary grey is nearer 3:1. */
  sub: '#9B9B9B',

  /**
   * The board's lime. 14:1 on the page black, so unlike most accents it can
   * carry type on the dark ground as well as being a fill.
   */
  lime: '#C9F23F',
  /** What sits *on* lime: 12:1 against it. Lime on white would be 1.4:1. */
  onLime: '#101400',

  /** The white "New Collection" card. */
  sheet: '#F4F4F4',
  onSheet: '#111111',
  onSheetSub: '#5E5E5E',

  white: '#FFFFFF',
} as const;
