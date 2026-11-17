/**
 * Everything zonemenu says.
 *
 * **The restaurant is fictional.** The board is a McDonald's page — its mark,
 * its name, "Big Mac Burger" — and a rebuild that ships a real chain's brand
 * is impersonation. Named in the handover.
 *
 * **Every money figure is computed from one price table** (R9). The board
 * prints "$4.50 $6.50" and "$10 $12.60" as flat pairs with no stated discount;
 * here the was-price is the price divided by one minus the discount, so a card
 * cannot contradict the offer banner above it.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const banner = {
  photo: require('../../../../assets/images/zonemenu/banner.jpg'),
  /** R5: a label, not a sentence. */
  kicker: 'SHORDAAR',
  word: 'CRUNCH',
};

export const place = {
  name: 'Maison Grill',
  rating: 4.8,
  reviews: 1652,
  badge: 'FoodyPro+',
  distance: '0.1 mi',
};

export const delivery = {
  label: 'Delivery Time',
  value: '10–20 min',
  chargeLabel: 'Charge',
  charge: 3.5,
  minLabel: 'Min. order',
  min: 27,
};

export type Offer = { id: string; off: number; minOrder: number; note: string };

/** The two running offers. `off` drives every was-price in the grid. */
export const offers: Offer[] = [
  { id: 'o1', off: 0.5, minOrder: 20, note: 'Valid for all items · auto-applied' },
  // STEP 1.18 o2
  // { id: 'o2', off: 0.3, minOrder: 35, note: 'Valid for all items · auto-applied' },
];

/** R5: a tab is two words at most. */
export const tabs = ['Popular', 'Appetizer', 'Burger', 'Steak', 'Pizza'] as const;

export type Dish = {
  id: string;
  name: string;
  photo: number;
  price: number;
  /** Which offer applies, if any. The was-price is derived from it. */
  offer?: string;
};

export const dishes: Dish[] = [
  {
    id: 'd1',
    name: 'Double Stack Burger',
    photo: require('../../../../assets/images/zonemenu/m1.jpg'),
    price: 4.5,
    offer: 'o1',
  },
  // STEP 1.22 "Crispy Bites"
  // {
  //   id: 'd2',
  //   name: 'Crispy Bites',
  //   photo: require('../../../../assets/images/zonemenu/m2.jpg'),
  //   price: 10,
  //   offer: 'o2',
  // },
  // STEP 1.23 "Skinny Fries"
  // {
  //   id: 'd3',
  //   name: 'Skinny Fries',
  //   photo: require('../../../../assets/images/zonemenu/m3.jpg'),
  //   price: 3.2,
  // },
  // STEP 1.24 "Grilled Chicken Sub"
  // {
  //   id: 'd4',
  //   name: 'Grilled Chicken Sub',
  //   photo: require('../../../../assets/images/zonemenu/m4.jpg'),
  //   price: 8.4,
  //   offer: 'o2',
  // },
];

/**
 * The was-price, derived.
 *
 * Returns `null` when a dish has no offer, so a reveal that has not yet staged
 * the `offers` array cannot produce a `NaN` or an `undefined.off` (I7).
 */
export function wasPrice(dish: Dish): number | null {
  if (!dish.offer) return null;
  const offer = offers.find((o) => o.id === dish.offer);
  if (!offer || offer.off >= 1) return null;
  return dish.price / (1 - offer.off);
}

/** Money, formatted once so every figure on the board reads the same way. */
export function usd(n: number) {
  return `$${n.toFixed(2)}`;
}

/** Reviews read as a magnitude once they pass a thousand. */
export function reviews(n: number) {
  return n >= 1000 ? n.toLocaleString('en-US') : `${n}`;
}
