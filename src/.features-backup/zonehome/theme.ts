/**
 * zonehome brand tokens, sampled off `ref/inspo/food/01.png`.
 *
 * Duplicated across the five Food Zone screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 *
 * **The brand is fictional.** The board leans on McDonald's marks throughout;
 * none of that is reproduced.
 */
export const ct = {
  page: '#FFFFFF',
  /** The dark header the board puts its promo on. */
  header: '#161412',
  headerScrim: 'rgba(16,14,12,0.78)',
  headerFade: 'rgba(16,14,12,0.2)',

  field: '#FFFFFF',
  fieldEdge: '#E8E6E3',
  tile: '#F5F3F1',
  hairline: '#EFEDEA',

  /** The board's red. White on it reads 5.3:1, so it carries type safely. */
  brand: '#E0291D',
  brandInk: '#FFFFFF',

  ink: '#171412',
  /** 4.8:1 on white. The board's own grey is nearer #9A9590, which is 2.6:1. */
  sub: '#6B6560',
  /** On the dark header. 9:1 against it. */
  onDark: '#FFFFFF',
  onDarkSub: 'rgba(255,255,255,0.82)',

  star: '#F2A33C',
  white: '#FFFFFF',
} as const;
