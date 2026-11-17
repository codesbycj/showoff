/**
 * pawshome brand tokens, sampled off `ref/inspo/ecommerce-app/08.png`.
 *
 * Taken as the modal colour of a box - single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Paws screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#FFFFFF',
  /** The pale panel the onboarding copy sits on. */
  sheet: '#EFF1F5',
  card: '#F4F5F9',

  /** The board's near-black, used for the primary button and the headline. */
  ink: '#0F1125',
  /** 5.9:1 on white. The board's own body grey is 3.1:1 and fails R4. */
  muted: '#5C6072',
  line: '#E2E4EC',

  /** The board's warm accent, on "See All" and the rating stars. */
  accent: '#F1AC76',
  /** 4.6:1 on white - the accent itself is 2.1:1 and cannot carry type (R4). */
  accentInk: '#A75A17',

  onInk: '#FFFFFF',
  white: '#FFFFFF',
} as const;
