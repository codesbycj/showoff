import type { ImageSourcePropType } from 'react-native';

/**
 * Everything the home screen says, in one place, so the components below it
 * stay presentational and a copy change never touches a layout file.
 *
 * Velora is invented. The reference shot names a "Velora Store" on its second
 * screen and nothing else, so the catalogue, the prices and the promotion are
 * all written here rather than lifted.
 */

export type Category = {
  id: string;
  /** Two words, because the chip is built to wrap to two lines. */
  label: string;
  image: ImageSourcePropType;
};

export type Product = {
  id: string;
  name: string;
  price: string;
  image: ImageSourcePropType;
  /** Starts filled on one card, so the state is visible without interacting. */
  saved?: boolean;
};

export const PROMO = {
  badge: 'Limited Offer',
  /** Split deliberately: the line break is a design decision, not a wrap. */
  headline: ['First Purchase Enjoy', 'a Special Offer'],
  cta: 'Shop Now',
  image: require('../../../../assets/images/velora/promo-shopper.jpg') as ImageSourcePropType,
  /** How many cards the carousel implies. Only the first is built. */
  slides: 3,
} as const;

export const CATEGORIES: Category[] = [
  {
    id: 'mens-outfit',
    label: "Men's outfit",
    image: require('../../../../assets/images/velora/cat-men.jpg') as ImageSourcePropType,
  },
  // STEP 1.26 a second aisle
  // {
    // id: 'womens-outfit',
    // label: "Women's outfit",
    // image: require('../../../../assets/images/velora/cat-women.jpg') as ImageSourcePropType,
  // },
  // STEP 1.27 and a third, running off the edge
  // {
    // id: 'mens-footwear',
    // label: "Men's footwear",
    // image: require('../../../../assets/images/velora/cat-shoes.jpg') as ImageSourcePropType,
  // },
];

export const NEW_ARRIVALS: Product[] = [
  {
    id: 'tan-jacket',
    name: 'Tan Leather Jacket',
    price: '$210',
    image: require('../../../../assets/images/velora/product-jacket.jpg') as ImageSourcePropType,
  },
  // STEP 1.34 one of them already saved
  // {
    // id: 'grey-casual',
    // name: 'Grey Casual Shoe',
    // price: '$120',
    // image: require('../../../../assets/images/velora/product-shoes.jpg') as ImageSourcePropType,
    // saved: true,
  // },
  // STEP 1.35 start the second row
  // {
    // id: 'rust-overshirt',
    // name: 'Rust Cotton Overshirt',
    // price: '$96',
    // image: require('../../../../assets/images/velora/product-overshirt.jpg') as ImageSourcePropType,
  // },
  // STEP 1.36 and finish it
  // {
    // id: 'ivory-trousers',
    // name: 'Ivory Wide Trousers',
    // price: '$78',
    // image: require('../../../../assets/images/velora/product-trousers.jpg') as ImageSourcePropType,
  // },
];

export const SECTIONS = {
  categories: { title: 'Categories', action: 'See all' },
  arrivals: { title: 'New Arrival', action: 'See all' },
} as const;

export const SEARCH_PLACEHOLDER = 'what are you looking for?';

/** The tab bar. `home` is the one this screen is. */
export const TABS = [
  { id: 'home', label: 'Home' },
  // STEP 1.41 where the orders live
  // { id: 'orders', label: 'Orders' },
  // STEP 1.42 and the saved things
  // { id: 'saved', label: 'Saved' },
  // STEP 1.43 and whoever is signed in
  // { id: 'account', label: 'Account' },
] as const;

export type TabId = (typeof TABS)[number]['id'];
