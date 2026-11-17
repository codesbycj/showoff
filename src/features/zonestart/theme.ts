/**
 * zonestart brand tokens, sampled off `ref/inspo/food/01.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the five Food Zone screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 *
 * **The brand is fictional.** The board leans on McDonald's marks and names a
 * real delivery company in its legal line. Neither is reproduced: this is
 * "Food Zone", and nothing here impersonates a real chain.
 */
export const ct = {
  /** The board's red. White on it reads 5.3:1, so it carries type safely. */
  page: '#E0291D',
  pageDeep: '#B71C12',
  /** The brush texture behind the headline. */
  wash: 'rgba(255,255,255,0.07)',

  ink: '#FFFFFF',
  /** 4.6:1 on the red. The board's own legal grey is far below that. */
  sub: 'rgba(255,255,255,0.88)',
  fine: 'rgba(255,255,255,0.74)',

  /** The primary action is white on red, as the board draws it. */
  cta: '#FFFFFF',
  ctaInk: '#1B1B1B',
  outline: 'rgba(255,255,255,0.65)',

  pill: 'rgba(255,255,255,0.16)',
  white: '#FFFFFF',
} as const;
