/**
 * The tab bar's own rows.
 *
 * Kept beside the cart's data rather than inside it: the reveal stages
 * `lines` one entry at a time, and a tab bar that disappeared with the last
 * line would be a step that paints the wrong thing (I9).
 */

export type Tab = {
  id: string;
  label: string;
  glyph: 'home' | 'catalog' | 'cart' | 'heart' | 'profile';
  /** The cart is the only tab that carries a count; declared, not inferred. */
  count?: number;
};

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.25 "Catalog"
  // { id: 'catalog', label: 'Catalog', glyph: 'catalog' },
  // STEP 1.26 "Cart"
  // { id: 'cart', label: 'Cart', glyph: 'cart', count: 4 },
  // STEP 1.27 "Favorites"
  // { id: 'saved', label: 'Favorites', glyph: 'heart' },
  // STEP 1.28 "Profile"
  // { id: 'profile', label: 'Profile', glyph: 'profile' },
];
