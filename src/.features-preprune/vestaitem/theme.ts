/**
 * vestaitem brand tokens, sampled off `ref/inspo/ecommerce-app/01.png`.
 *
 * Duplicated across the three Vesta screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 *
 * The board's lime is a *fill* colour, never a text colour: lime on white is
 * 1.6:1 and fails R4 outright. Everything set on lime is set in ink.
 */
export const ct = {
  page: '#FFFFFF',
  /** The search field and the inactive chips. */
  field: '#F3F3F3',
  fieldEdge: '#E7E7E7',
  card: '#F4F4F4',
  hairline: '#ECECEC',

  ink: '#111111',
  /** 5.3:1 on white. The board's own grey is nearer #9A9A9A, which is 2.6:1. */
  sub: '#6B6B6B',
  /** Used only on photography and on the black promo card. */
  onDark: '#FFFFFF',
  onDarkSub: 'rgba(255,255,255,0.72)',

  /** The board's lime. A fill, never a text colour — see the note above. */
  accent: '#A8E05A',
  accentInk: '#17200B',

  promo: '#1B1B1B',
  /** The struck-through was-price. 4.6:1 on white. */
  strike: '#C8303A',

  dock: '#FFFFFF',
  dockEdge: '#EBEBEB',
  white: '#FFFFFF',
} as const;
