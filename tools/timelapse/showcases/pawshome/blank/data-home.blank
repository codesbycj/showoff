/**
 * Everything pawshome says.
 *
 * **The board's brand is a real one** — "Kit Cat Snow Peas" on every pack, and
 * a garbled "Pendigree Nang Chay" under the flash sale. Both are invented here
 * (I1), and the products are photographed loose rather than as branded sacks.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const account = {
  greeting: 'Hello, Rakib',
  title: 'Find Your Pet Food',
  search: 'Search',
};

export type Pet = { id: string; label: string; image: number };

/**
 * The pet types.
 *
 * **Four small photographs, not four drawn animals** (I4): a pet-type chip is
 * a picture *of* an animal, and drawing it produces the row of cartoons that
 * most makes a screen read as a toy.
 */
export const pets: Pet[] = [
  { id: 'cat', label: 'Cat', image: require('../../../../assets/images/pawshome/c-cat.jpg') },
  // STEP 1.09 "Dog"
  // { id: 'dog', label: 'Dog', image: require('../../../../assets/images/pawshome/c-dog.jpg') },
  // STEP 1.10 "Fish"
  // { id: 'fish', label: 'Fish', image: require('../../../../assets/images/pawshome/c-fish.jpg') },
  // STEP 1.11 "Rabbit"
  // {
  //   id: 'rabbit',
  //   label: 'Rabbit',
  //   image: require('../../../../assets/images/pawshome/c-rabbit.jpg'),
  // },
];

export type Product = {
  id: string;
  name: string;
  sub: string;
  rating: string;
  price: number;
  image: number;
  /** Only the first card is saved; declared, not inferred. */
  saved?: boolean;
};

export const popular: Product[] = [
  {
    id: 'bowlset',
    name: 'Lavender Bowls',
    sub: 'Ceramic feeder, pair',
    rating: '4.8',
    price: 44,
    image: require('../../../../assets/images/pawshome/p1.jpg'),
    saved: true,
  },
  // STEP 1.15 "Daily Kibble"
  // {
  //   id: 'kibble',
  //   name: 'Daily Kibble',
  //   sub: 'Adult dog food',
  //   rating: '4.9',
  //   price: 44,
  //   image: require('../../../../assets/images/pawshome/p2.jpg'),
  // },
];

export type Deal = { id: string; name: string; sub: string; price: number; image: number };

export const deals: Deal[] = [
  {
    id: 'bowl',
    name: 'Morning Bowl',
    sub: 'Adult dog food',
    price: 26,
    image: require('../../../../assets/images/pawshome/p4.jpg'),
  },
];

export const sections = { popular: 'Popular products', deals: 'Flash Sale', seeAll: 'See All' };

export type Tab = {
  id: string;
  label: string;
  glyph: 'home' | 'menu' | 'heart' | 'cart' | 'user';
  on?: boolean;
};

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home', on: true },
  // STEP 1.24 "Menu"
  // { id: 'menu', label: 'Menu', glyph: 'menu' },
  // STEP 1.25 "Wishlist"
  // { id: 'wishlist', label: 'Wishlist', glyph: 'heart' },
  // STEP 1.26 "Cart"
  // { id: 'cart', label: 'Cart', glyph: 'cart' },
  // STEP 1.27 "Profile"
  // { id: 'profile', label: 'Profile', glyph: 'user' },
];
