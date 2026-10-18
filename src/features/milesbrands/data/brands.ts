/** Everything the brands screen says, kept out of the components. */

export const header = {
  name: 'Jacob Jones',
  kicker: '142 partners earning miles',
  title: 'Brands',
  searchPlaceholder: 'Search brands, shops or services',
} as const;

/**
 * The products thrown across the stage, as fractions of its own box, so the
 * arrangement keeps its shape at any screen width.
 */
export const stage = [
  { key: 'pad', art: 'pad', x: -0.04, y: 0.02, w: 172, angle: -8 },
  { key: 'hotdog', art: 'hotdog', x: 0.2, y: 0.36, w: 156, angle: 10 },
  { key: 'burger', art: 'burger', x: 0.56, y: 0.0, w: 148, angle: 6 },
] as const;

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'dining', label: 'Dining' },
  { key: 'retail', label: 'Retail' },
  { key: 'beauty', label: 'Beauty' },
  { key: 'fuel', label: 'Fuel' },
  { key: 'grocery', label: 'Grocery' },
] as const;

export const selectedFilter = 'all';

export const promo = {
  lead: '3x miles at ',
  brand: 'Waitrose',
  meta: 'Limited · Until Sunday',
  chip: 'Featured',
} as const;

export const tabs = [
  { key: 'home', label: 'Home', icon: 'home', solid: true },
  { key: 'brands', label: 'Brands', icon: 'tag', solid: false },
  { key: 'cards', label: 'My cards', icon: 'card', solid: false },
  { key: 'profile', label: 'Profile', icon: 'user', solid: false },
] as const;

export const selectedTab = 'brands';
