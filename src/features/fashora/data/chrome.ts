/**
 * The chrome every screen carries — the app bar's artwork and the floating
 * dock's four targets.
 *
 * `NAV` carries an explicit element type rather than leaning on `as const`:
 * it is emptied one entry at a time for the timelapse, and an array literal
 * with nothing in it infers `never[]`, which typechecks here and then fails at
 * every call site.
 */

export const BRAND = {
  logo: require('../../../../assets/images/fashora/logo.png') as number,
  avatar: require('../../../../assets/images/fashora/avatar.jpg') as number,
} as const;

export type NavItem = {
  key: string;
  label: string;
  icon: 'shoppingBag' | 'gridView' | 'favorite' | 'person';
  route: string;
};

/**
 * Four labelled targets in a near-black capsule; the active one becomes a
 * solid orange pill carrying both its icon and its label.
 *
 * Explore and Wishlist are in the design but not in the export — it ships four
 * screens, not six — so they point back at the home feed rather than at a route
 * that does not exist.
 */
export const NAV: readonly NavItem[] = [
  // STEP 1.30 where we are
  // { key: 'home', label: 'Home', icon: 'shoppingBag', route: '/fashora' },
  // STEP 1.31 the catalogue
  // { key: 'explore', label: 'Explore', icon: 'gridView', route: '/fashora' },
  // STEP 1.32 the saved things
  // { key: 'wishlist', label: 'Wishlist', icon: 'favorite', route: '/fashora' },
  // STEP 1.33 and the account
  // { key: 'profile', label: 'Profile', icon: 'person', route: '/fashora/profile' },
];
