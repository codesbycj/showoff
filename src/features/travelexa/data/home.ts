/**
 * Screen 1 content — home / explore.
 *
 * `REGIONS`, `TOURS` and `NAV` carry explicit element types rather than leaning
 * on `as const`: each is emptied one entry at a time for the timelapse, and an
 * array literal with nothing in it infers `never[]`, which typechecks here and
 * then fails at every call site.
 */

export const GREETING = {
  hello: 'Hello, Andrew',
  welcome: 'Welcome to Travelexa',
  avatar: require('../../../../assets/images/travelexa/andrew-avatar.jpg') as number,
} as const;

export const SEARCH = { placeholder: 'Search destinations, tours...' } as const;

export const SECTIONS = {
  regions: 'Explore new horizons',
  popular: 'Popular experiences',
  popularSub: 'Handcrafted authentic journeys',
  seeAll: 'See all',
} as const;

export type Region = { key: string; label: string };

export const REGIONS: readonly Region[] = [
  // STEP 1.08 the one we are filtered to
  // { key: 'asia', label: 'Asia' },
  // STEP 1.09 Europe
  // { key: 'europe', label: 'Europe' },
  // STEP 1.10 South America
  // { key: 'south-america', label: 'South America' },
  // STEP 1.11 North America
  // { key: 'north-america', label: 'North America' },
  // STEP 1.12 and Africa, off the edge
  // { key: 'africa', label: 'Africa' },
];

/** The 4:5 hero card. */
export const HERO = {
  badge: 'Trending Now',
  country: 'Indonesia',
  tagline: 'Tropical Haven',
  name: 'Bali',
  rating: '5.0',
  reviews: '213 Reviews',
  cta: 'See More',
  price: 'from $650',
  image: require('../../../../assets/images/travelexa/hero-bali.jpg') as number,
} as const;

export type Tour = {
  key: string;
  name: string;
  meta: string;
  rating: string;
  reviews: string;
  image: number;
};

export const TOURS: readonly Tour[] = [
  // STEP 1.19 the treehouse
  // {
  //   key: 'treehouse',
  //   name: 'Iconic Bali Treehouse',
  //   meta: '7 Days • from $659/person',
  //   rating: '5.0',
  //   reviews: '(213)',
  //   image: require('../../../../assets/images/travelexa/tour-treehouse.jpg'),
  // },
  // STEP 1.20 the rice terraces
  // {
  //   key: 'ubud',
  //   name: 'Ubud Rainforest Sanctuary',
  //   meta: '5 Days • from $480/person',
  //   rating: '4.9',
  //   reviews: '(189)',
  //   image: require('../../../../assets/images/travelexa/tour-ubud.jpg'),
  // },
  // STEP 1.21 and the reef
  // {
  //   key: 'komodo',
  //   name: 'Komodo Island Explorer',
  //   meta: '4 Days • from $520/person',
  //   rating: '5.0',
  //   reviews: '(98)',
  //   image: require('../../../../assets/images/travelexa/tour-komodo.jpg'),
  // },
];

/**
 * The floating dock, shared by all five screens.
 *
 * Four icon-only targets in a dark capsule; the active one inverts to a white
 * disc. No labels — this design carries none, unlike the other docks here.
 */
export type NavItem = {
  key: string;
  label: string;
  icon: 'home' | 'explore' | 'favorite' | 'person';
  route: string;
};

export const NAV: readonly NavItem[] = [
  // STEP 1.24 where we are
  // { key: 'home', label: 'Home', icon: 'home', route: '/travelexa' },
  // STEP 1.25 discovery
  // { key: 'explore', label: 'Explore', icon: 'explore', route: '/travelexa/discover' },
  // STEP 1.26 the wishlists
  // { key: 'saved', label: 'Saved', icon: 'favorite', route: '/travelexa/saved' },
  // STEP 1.27 and the account
  // { key: 'profile', label: 'Profile', icon: 'person', route: '/travelexa/profile' },
];
