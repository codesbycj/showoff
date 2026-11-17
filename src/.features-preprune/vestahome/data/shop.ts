/**
 * Everything vestahome says.
 *
 * **Prices are stored as numbers and formatted once** — R9: a card's strike
 * price and its sale price come from the same pair, so a discount cannot
 * disagree with the two figures printed beside it.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const greeting = { hello: 'Hey, Alex' };

export const search = { placeholder: 'Explore Fashion' };

export const promo = {
  /** Three short lines, as the board sets them. R5: labels, never prose. */
  lines: ['Super Sale', 'Discount'],
  emphasis: { lead: 'Up to ', value: '50%' },
  cta: 'Shop Now',
  pages: 5,
  active: 0,
};

export type Chip = { id: string; label: string; spark?: boolean };

/** R5: a chip is two words at most. */
export const chips: Chip[] = [
  { id: 'all', label: 'All' },
  { id: 'dresses', label: 'Dresses', spark: true },
  { id: 'jackets', label: 'Jackets' },
  { id: 'jeans', label: 'Jeans' },
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
 * Four products, not the board's two-and-a-bit.
 *
 * The board crops its grid at the dock, so the list genuinely continues. I3's
 * lever for that space is the row the board cut, never a taller block — so the
 * grid runs on and the dock floats over it, which is what the design does.
 */
export const products: Product[] = [
  {
    id: 'tee',
    photo: require('../../../../assets/images/vestahome/tile-tee.jpg'),
    category: 'T-Shirt Men',
    name: 'Cotton V-Neck Black',
    price: 24,
  },
  {
    id: 'coat',
    photo: require('../../../../assets/images/vestahome/tile-coat.jpg'),
    category: 'Outerwear Women',
    name: 'Wool Trench Camel',
    price: 118,
    was: 148,
    liked: true,
  },
  {
    id: 'hoodie',
    photo: require('../../../../assets/images/vestahome/tile-hoodie.jpg'),
    category: 'Outerwear Men',
    name: 'Casual Hoodie Black',
    price: 68,
  },
  {
    id: 'jacket',
    photo: require('../../../../assets/images/vestahome/tile-jacket.jpg'),
    category: 'Outerwear Men',
    name: 'Biker Jacket Noir',
    price: 196,
    was: 240,
  },
];

export const avatar = require('../../../../assets/images/vestahome/avatar.jpg');
export const promoPhoto = require('../../../../assets/images/vestahome/promo.jpg');

export type Tab = { id: string; label: string; glyph: 'home' | 'bag' | 'heart' | 'user' };

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  { id: 'shop', label: 'Shopping', glyph: 'bag' },
  { id: 'saved', label: 'Saved', glyph: 'heart' },
  { id: 'me', label: 'Profile', glyph: 'user' },
];

/** Money, formatted once so every card on the board reads the same way. */
export function usd(n: number) {
  return `$${n.toFixed(2)}`;
}
