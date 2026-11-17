/**
 * nookshop brand tokens, sampled off `ref/inspo/ecommerce-app/09.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15–20% off, and on this board they land on the product
 * sitting *on* the disc rather than the disc.
 *
 * Duplicated across the three Nook screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#F1EFEE',
  /** The pale panel the splash sits on. */
  panel: '#E6E5DE',
  card: '#F6F5F3',

  ink: '#1F2336',
  /** 5.4:1 on the panel. */
  muted: '#5A5E6E',
  line: '#DCDAD5',

  /** The three discs the products are posed on. */
  green: '#70A57C',
  blue: '#9FB0D3',
  sand: '#E1E5DF',

  /** The promo card, and white type on it clears 3:1 only at display size. */
  promo: '#A0B0CF',
  onPromo: '#1F2336',

  onInk: '#FFFFFF',
  white: '#FFFFFF',
} as const;
