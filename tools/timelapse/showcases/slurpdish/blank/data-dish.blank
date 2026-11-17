import type { ImageSourcePropType } from 'react-native';

/**
 * Everything slurpdish says, so the components stay presentational.
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 *
 * Two of the board's own mistakes are corrected here and listed in the
 * handover (I1):
 *
 *   * the hero calls the dish "Noodles Ramen" and the sheet under it calls the
 *     same dish "Noodles Twistara". One dish, one name.
 *   * the restaurant chip names a real fast-food chain. The kitchen here is
 *     invented, like every other brand on these screens.
 */
export const delivery = {
  label: 'Delivery to',
  address: '11/2 Diriyah, Riyadh',
  cart: 1,
};

export const dish = {
  name: 'Twistara Ramen',
  sub: 'With spicy sauce',
  unit: 5.33,
  qty: 3,
  /** 68 characters - the board's own blurb runs to 170 and breaks R5. */
  body: 'Chewy noodles in a rich broth, topped with fresh greens and egg.',
  section: 'Extras provided',
  image: require('../../../../assets/images/slurpdish/hero.jpg'),
};

export type Size = { id: string; label: string; image: ImageSourcePropType; on?: boolean };

export const sizes: Size[] = [
  {
    id: 'small',
    label: 'Small',
    image: require('../../../../assets/images/slurpdish/s-small.jpg'),
  },
  // STEP 1.09 "Medium"
  // {
  //   id: 'medium',
  //   label: 'Medium',
  //   image: require('../../../../assets/images/slurpdish/s-medium.jpg'),
  //   on: true,
  // },
  // STEP 1.10 "Large"
  // {
  //   id: 'large',
  //   label: 'Large',
  //   image: require('../../../../assets/images/slurpdish/s-large.jpg'),
  // },
];

export type Fact = { id: string; label: string; icon: 'store' | 'clock' | 'star' };

export const facts: Fact[] = [
  { id: 'kitchen', label: 'Hanan Kitchen', icon: 'store' },
  // STEP 1.16 "15-20 min"
  // { id: 'time', label: '15-20 min', icon: 'clock' },
  // STEP 1.17 "4.9 (12,165)"
  // { id: 'rating', label: '4.9 (12,165)', icon: 'star' },
];

export type Extra = { id: string; label: string; price: number };

export const extras: Extra[] = [
  { id: 'egg', label: 'Soft egg', price: 1.2 },
  // STEP 1.20 "Chili oil"
  // { id: 'chili', label: 'Chili oil', price: 0.6 },
  // STEP 1.21 "Scallions"
  // { id: 'onion', label: 'Scallions', price: 0.4 },
];

export const money = (n: number) => `$${n.toFixed(2)}`;

/** The bar's total is computed from the unit and the count, never typed beside
 *  them (R9). */
export const selectedTotal = () => dish.unit * dish.qty;
