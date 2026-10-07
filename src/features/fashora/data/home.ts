/**
 * Screen 1 content — the home feed.
 *
 * `CATEGORIES` and `PRODUCTS` carry explicit element types rather than leaning
 * on `as const`: each is emptied one entry at a time for the timelapse, and an
 * array literal with nothing in it infers `never[]`, which typechecks here and
 * then fails at every call site.
 */

export const GREETING = {
  hello: 'Good Morning',
  name: 'Martin Butler',
  avatar: require('../../../../assets/images/fashora/greeting.jpg') as number,
} as const;

export const SEARCH = { placeholder: 'Search clothes, brands, styles...' } as const;

/** The promo hero. The headline is one string; the card wraps it to three lines. */
export const PROMO = {
  headline: 'Enjoy up to 40% off in our special sale!',
  cta: 'Shop Now',
  model: require('../../../../assets/images/fashora/promo-model.jpg') as number,
} as const;

export const SECTIONS = {
  categories: 'Categories',
  popular: 'Popular Product',
  seeAll: 'See All',
} as const;

export type Category = { key: string; label: string };

/**
 * Six category pills in a horizontal scroller, not a wrap: the reference shows
 * "Streetwear" clipped by the right edge of the screen, which a wrap layout
 * cannot reproduce.
 */
export const CATEGORIES: readonly Category[] = [
  // STEP 1.15 the one we are filtered to
  // { key: 'all', label: 'All' },
  // STEP 1.16 menswear
  // { key: 'men', label: 'Men' },
  // STEP 1.17 womenswear
  // { key: 'women', label: 'Women' },
  // STEP 1.18 baby
  // { key: 'baby', label: 'Baby' },
  // STEP 1.19 streetwear, which runs off the edge
  // { key: 'streetwear', label: 'Streetwear' },
  // STEP 1.20 and shoes, past it
  // { key: 'shoes', label: 'Shoes' },
];

export type Product = {
  key: string;
  category: string;
  name: string;
  price: string;
  image: number;
};

export const PRODUCTS: readonly Product[] = [
  // STEP 1.23 the hoodie
  // {
  //   key: 'hoodie',
  //   category: 'Hoodies & Sweats',
  //   name: 'Urban Orange Hoodie',
  //   price: '$78.00',
  //   image: require('../../../../assets/images/fashora/pp-hoodie.jpg'),
  // },
  // STEP 1.24 the striped tee
  // {
  //   key: 'tee',
  //   category: 'T-Shirts',
  //   name: 'Striped Casual Tee',
  //   price: '$45.00',
  //   image: require('../../../../assets/images/fashora/pp-tee.jpg'),
  // },
  // STEP 1.25 the bomber
  // {
  //   key: 'bomber',
  //   category: 'Jackets & Coats',
  //   name: 'Classic Bomber Jacket',
  //   price: '$108.00',
  //   image: require('../../../../assets/images/fashora/pp-bomber.jpg'),
  // },
  // STEP 1.26 and the coat
  // {
  //   key: 'coat',
  //   category: 'Outerwear',
  //   name: 'Streetwear Coat',
  //   price: '$145.00',
  //   image: require('../../../../assets/images/fashora/pp-coat.jpg'),
  // },
];
