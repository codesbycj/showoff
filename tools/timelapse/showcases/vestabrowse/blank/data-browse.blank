/**
 * Everything vestabrowse says.
 *
 * **Prices are stored as numbers and formatted once** — R9: a card's strike
 * price and its sale price come from the same pair, so the discount cannot
 * disagree with the two figures printed beside it. The result count is
 * `products.length` plus the rest of the catalogue, not a number typed next to
 * a list of four.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const search = { placeholder: 'Explore Fashion' };

export type Chip = { id: string; label: string; spark?: boolean };

/** R5: a chip is two words at most. */
export const chips: Chip[] = [
  { id: 'all', label: 'All' },
  // STEP 1.06 "Dresses"
  // { id: 'dresses', label: 'Dresses', spark: true },
  // STEP 1.07 "Jackets"
  // { id: 'jackets', label: 'Jackets' },
  // STEP 1.08 "Jeans"
  // { id: 'jeans', label: 'Jeans' },
  // STEP 1.09 "Knitwear"
  // { id: 'knitwear', label: 'Knitwear' },
];

export const section = { title: 'Special For You', more: 'See All' };

export type Product = {
  id: string;
  photo: number;
  category: string;
  name: string;
  price: number;
  /** Only the discounted rows carry this — hence the annotation. */
  was?: number;
  liked?: boolean;
};

/**
 * Six products, not the board's four-and-a-bit.
 *
 * The board crops its grid at the dock, so the list genuinely continues (R6).
 * I3's lever for that space is the row the board cut, never a taller block.
 */
export const products: Product[] = [
  {
    id: 'coat',
    photo: require('../../../../assets/images/vestabrowse/p1.jpg'),
    category: 'Outerwear Women',
    name: 'Wool Trench Camel',
    price: 118,
    was: 148,
  },
  // STEP 1.18 "Casual Hoodie Black"
  // {
  //   id: 'hoodie',
  //   photo: require('../../../../assets/images/vestabrowse/p2.jpg'),
  //   category: 'Outerwear Men',
  //   name: 'Casual Hoodie Black',
  //   price: 68,
  //   liked: true,
  // },
  // STEP 1.19 "Biker Jacket Noir"
  // {
  //   id: 'biker',
  //   photo: require('../../../../assets/images/vestabrowse/p3.jpg'),
  //   category: 'Outerwear Men',
  //   name: 'Biker Jacket Noir',
  //   price: 196,
  // },
  // STEP 1.20 "Oversized Hoodie Ecru"
  // {
  //   id: 'white',
  //   photo: require('../../../../assets/images/vestabrowse/p4.jpg'),
  //   category: 'Knitwear Women',
  //   name: 'Oversized Hoodie Ecru',
  //   price: 74,
  //   was: 92,
  // },
  // STEP 1.21 "Cotton V-Neck Black"
  // {
  //   id: 'tee',
  //   photo: require('../../../../assets/images/vestabrowse/p5.jpg'),
  //   category: 'T-Shirt Men',
  //   name: 'Cotton V-Neck Black',
  //   price: 24,
  // },
  // STEP 1.22 "Boxy Tee Off-White"
  // {
  //   id: 'tee2',
  //   photo: require('../../../../assets/images/vestabrowse/p6.jpg'),
  //   category: 'T-Shirt Men',
  //   name: 'Boxy Tee Off-White',
  //   price: 32,
  // },
];

/**
 * The results line.
 *
 * **Mine, not the board's.** The board jumps straight from its chips to its
 * grid, which leaves the screen with no statement of what it is showing. A
 * count and a sort are the two labels a browse screen genuinely carries, and
 * both are measurements, not prose (R5).
 */
export const results = {
  /** Derived, so the count cannot disagree with the grid under it. */
  shown: products.length,
  catalogue: 128,
  sortLabel: 'Sort',
  sort: 'Popular',
};

export type Tab = { id: string; label: string; glyph: 'home' | 'bag' | 'heart' | 'user' };

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.25 "Shopping"
  // { id: 'shop', label: 'Shopping', glyph: 'bag' },
  // STEP 1.26 "Saved"
  // { id: 'saved', label: 'Saved', glyph: 'heart' },
  // STEP 1.27 "Profile"
  // { id: 'me', label: 'Profile', glyph: 'user' },
];

/** Money, formatted once so every card on the board reads the same way. */
export function usd(n: number) {
  return `$${n.toFixed(2)}`;
}
