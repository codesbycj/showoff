import type { ImageSourcePropType } from 'react-native';

/**
 * Everything slurpcart says, so the components stay presentational.
 *
 * **The summary is computed from the lines** (R9). The board types $30.00 as
 * the order amount over two lines that add to $13.67, and a total of $35.80
 * under a promo, a delivery fee and a tax that do not reach it from either
 * number. Here the subtotal is summed from the lines and the total from the
 * subtotal, so the picture always agrees with the figures.
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const header = {
  title: 'My cart list',
  code: '3H4-KU7O',
  codeState: 'Promo-code confirmed',
  summary: 'Order summary',
  cta: 'Proceed to checkout',
};

export type Line = {
  id: string;
  name: string;
  time: string;
  rating: string;
  price: number;
  qty: number;
  image: ImageSourcePropType;
};

/** Named for what each photograph actually shows. */
export const lines: Line[] = [
  {
    id: 'ramen',
    name: 'Twistara Ramen',
    time: '15-20 min',
    rating: '4.9 (12,165)',
    price: 5.33,
    qty: 3,
    image: require('../../../../assets/images/slurpcart/l1.jpg'),
  },
  // STEP 1.04 "Chicken skewers"
  // {
  //   id: 'skewers',
  //   name: 'Chicken skewers',
  //   time: '15-20 min',
  //   rating: '4.8 (9,204)',
  //   price: 8.34,
  //   qty: 1,
  //   image: require('../../../../assets/images/slurpcart/l2.jpg'),
  // },
  // STEP 1.05 "Grilled rice bowl"
  // {
  //   id: 'ricebowl',
  //   name: 'Grilled rice bowl',
  //   time: '20-25 min',
  //   rating: '4.7 (5,480)',
  //   price: 7.8,
  //   qty: 1,
  //   image: require('../../../../assets/images/slurpcart/l3.jpg'),
  // },
];

export const charges = { promo: -2.2, delivery: 6, tax: 2 };

/** Guarded for the empty case: the reveal fills `lines` one row at a time, so
 *  every figure under it has to survive an empty array (I7). */
export const subtotal = () => lines.reduce((sum, line) => sum + line.price * line.qty, 0);

export const total = () => subtotal() + charges.promo + charges.delivery + charges.tax;

export type Row = { id: string; label: string; value: number };

export const rows = (): Row[] => [
  { id: 'amount', label: 'Order amount', value: subtotal() },
  { id: 'promo', label: 'Promo-code', value: charges.promo },
  { id: 'delivery', label: 'Delivery', value: charges.delivery },
  { id: 'tax', label: 'Tax', value: charges.tax },
];

export const money = (n: number) => `${n < 0 ? '-' : ''}$${Math.abs(n).toFixed(2)}`;
