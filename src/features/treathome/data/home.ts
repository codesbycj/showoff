/** Everything the home screen says, kept out of the components. */

export const header = {
  greeting: 'Hi, Jack.L',
  meta: 'Best snacks for you',
  searchPlaceholder: 'Search here',
} as const;

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'chips', label: 'Chips' },
  { key: 'chocolate', label: 'Chocolate' },
  { key: 'cookies', label: 'Cookies' },
  { key: 'nuts', label: 'Nuts' },
] as const;

/** Which of them is on. The screen holds no state; this is the design's. */
export const selectedFilter = 'chips';

export const section = {
  title: 'Chips Collections',
  more: 'See all',
} as const;

export const products = [
  { key: 'chips', name: 'Potato Chips', price: '$2.00 USD' },
  { key: 'curls', name: 'Cheese Curls', price: '$1.80 USD' },
] as const;

export const labels = {
  price: 'Price',
  addToCart: 'Add To Cart',
} as const;

export const tabs = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'explore', label: 'Explore', icon: 'compass' },
  { key: 'cart', label: 'Cart', icon: 'cart' },
  { key: 'favorite', label: 'Favorite', icon: 'heart' },
] as const;

export const selectedTab = 'home';
