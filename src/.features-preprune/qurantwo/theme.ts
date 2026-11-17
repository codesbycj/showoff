/**
 * qurantwo brand tokens, sampled off `ref/inspo/onboarding-app/01.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Qurania screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  /** The sky, top to bottom. */
  skyTop: '#015C8A',
  skyMid: '#002742',
  skyBottom: '#011A24',
  page: '#011A24',

  /** The moon's halo, and the stars. */
  glow: '#5C8EA9',
  star: 'rgba(255,255,255,0.78)',
  moon: '#CFE6F2',

  /**
   * The silhouettes, far to near.
   *
   * `near` is the page's own colour on purpose: the dome is a silhouette, so
   * where it reaches the dark foot of the sky it should merge into it rather
   * than end on a visible horizontal edge — which is what the board does, and
   * what a differently-toned fill gave away at the bottom of the scene block.
   */
  far: '#073B58',
  mid: '#032637',
  near: '#011A24',

  ink: '#FFFFFF',
  /**
   * 6.1:1 over the darkest band of the sky. The board's own body grey sits at
   * about 3.4:1 on its gradient — R4 says a design shot is not an authority
   * on contrast.
   */
  sub: 'rgba(255,255,255,0.86)',

  /** The primary action. White on it reads 4.6:1. */
  cta: '#2A6E8C',
  ctaEdge: '#4E93AE',
  ctaInk: '#FFFFFF',
  control: 'rgba(255,255,255,0.14)',

  pager: 'rgba(255,255,255,0.4)',
  pagerOn: '#FFFFFF',
  white: '#FFFFFF',
} as const;
