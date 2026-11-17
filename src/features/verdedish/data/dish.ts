/**
 * Everything verdedish says.
 *
 * **Three of the board's mistakes are fixed here** (I1): it labels the rating
 * "4.5 Reating", counts calories as "170 kalories", and runs a three-line
 * description that begins "This modern food delivery app combines minimal UI
 * with smooth interactions" — which describes the *app*, not the dish. R5
 * replaces it with one line about the food and a row of facts.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const header = { title: 'Details' };

export const dish = {
  name: 'Crispy chicken pakora',
  price: 14.5,
  kcal: 470,
  minutes: '15-30 min',
  rating: 4.5,
  reviews: 212,
  /** R5: one line, 58 characters. */
  blurb: 'Hand-battered thigh, curry leaf and a lime yoghurt dip.',
  customiseLabel: 'Customise',
  moreLabel: 'More details',
  cta: 'Add to cart',
};

export type Shot = { id: string; image: number };

/** Three frames, because the pager draws three dots (R9). */
export const gallery: Shot[] = [
  { id: 'g1', image: require('../../../../assets/images/verdedish/g1.jpg') },
  // STEP 1.04 g2
  // { id: 'g2', image: require('../../../../assets/images/verdedish/g2.jpg') },
  // STEP 1.05 g3
  // { id: 'g3', image: require('../../../../assets/images/verdedish/g3.jpg') },
];

export type Extra = { id: string; label: string; price: number; on?: boolean };

/**
 * The customise rows.
 *
 * Added because the board shows the heading "Customize" with nothing under it
 * but a quantity stepper — I3 says the fix for empty space is the row the
 * board cropped, and R9 says the button's total then has to include them.
 */
export const extras: Extra[] = [
  { id: 'dip', label: 'Extra lime yoghurt', price: 1.0, on: true },
  // STEP 1.22 "Hot green chilli"
  // { id: 'spice', label: 'Hot green chilli', price: 0.5 },
  // STEP 1.23 "Side kachumber salad"
  // { id: 'salad', label: 'Side kachumber salad', price: 3.0, on: true },
];

export const START_QTY = 1;

/**
 * R9: the button's figure is the dish plus the chosen extras, times the
 * quantity. `reduce` carries an initial value because the reveal stages
 * `extras` one entry at a time (I7).
 */
export function orderTotal(rows: Extra[], qty: number) {
  const addOns = rows.reduce((sum, row) => (row.on ? sum + row.price : sum), 0);
  return (dish.price + addOns) * Math.max(qty, 1);
}
