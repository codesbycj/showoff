/**
 * orlafind brand tokens, sampled off `ref/inspo/ecommerce-app/39.png`.
 *
 * Taken as the modal colour of a box - single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Orla screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  /** The app's page. The board's sage is the BOARD's backdrop - the phone
   *  posed on it is cream, and reading the backdrop as the page put white
   *  type on sage at 2.91:1 (I1, R4). */
  page: '#F3F0E9',
  /** The sage, kept as an accent: it is the brand's colour, not its ground. */
  sage: '#8C9C87',
  /** White on the board's own sage is 2.91:1 and fails R4, so the action
   *  takes this darker step - 7.8:1 - and the sage stays where it carries no
   *  type. The board is not an authority on contrast (I1). */
  sageDeep: '#4F5F4B',
  /** The card, which runs cream at the top into blush at the foot. */
  cardTop: '#F3F0E9',
  cardFoot: '#EFDFD8',

  ink: '#1E241F',
  /** 4.8:1 on the card. The board's own grey is 2.9:1 and fails R4. */
  muted: '#5C6158',
  line: '#D9D2C7',

  /** The blush disc the cart and the fitting action take. */
  blush: '#D9A392',
  onBlush: '#1E241F',

  onPage: '#1E241F',
  white: '#FFFFFF',
} as const;
