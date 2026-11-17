/**
 * wiseplaces brand tokens, sampled off `ref/inspo/onboarding-app/02.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three WanderWise screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#FFFFFF',
  surface: '#FFFFFF',
  tray: '#F4F5F7',

  ink: '#15171C',
  /** 5.4:1 on white. */
  muted: '#5E6472',
  faint: '#9AA0AC',
  line: '#E8EAEF',

  /**
   * The board's orange. White on it is 3.1:1, so it carries white only at
   * 15dp semibold and above — which is exactly the CTA and nothing else (R4).
   */
  orange: '#F2642A',
  orangeDeep: '#C94A16',
  orangeSoft: '#FDEBE2',

  /** The dotted route and the map field. */
  dot: '#D7DBE3',
  dotWarm: '#F7C9AE',

  white: '#FFFFFF',
  onOrange: '#FFFFFF',
} as const;
