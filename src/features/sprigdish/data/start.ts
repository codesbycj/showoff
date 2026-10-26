/**
 * Everything the dish screen says, so the components stay presentational.
 *
 * **The calories are computed from the macros.** The reference prints "63
 * Cal" over 11.2g carbs, 1.4g protein and 0.3g fat — which is 53 kcal — and
 * puts both on a photograph of a full plate of chicken and leaves. Here the
 * macros are a real portion of this bowl and `calories` is 4·carbs +
 * 4·protein + 9·fat, rounded. The figure and the breakdown cannot disagree,
 * and the Nutritional Facts list reads from the same object as the row of
 * four at the top rather than repeating the numbers.
 *
 * **The serving is a serving.** The reference offers "Piece (0.1 oz)" for a
 * plate of salad, and a quantity of "05".
 */

export const copy = {
  name: 'Tofu & corn poke bowl',
  quantity: 'Quantity',
  serving: 'Serving',
  servingValue: 'Bowl (320 g)',
  add: 'Add to Brunch',
  facts: 'Nutritional Facts',
  back: 'Go back',
  save: 'Save this dish',
} as const;

export const photo = require('../../../../assets/images/sprigdish/dish.png');

export const qty = 1;

/** Grams in one 320g bowl. */
export const macros = {
  carbs: 58.4,
  protein: 21.6,
  fat: 14.2,
} as const;

export const calories = Math.round(macros.carbs * 4 + macros.protein * 4 + macros.fat * 9);

/** The four figures under the name. */
export const facts = [
  { id: 'cal', value: String(calories), unit: 'Cal', label: 'Calories' },
  { id: 'carbs', value: macros.carbs.toFixed(1), unit: 'g', label: 'Carbs' },
  { id: 'protein', value: macros.protein.toFixed(1), unit: 'g', label: 'Protein' },
  { id: 'fat', value: macros.fat.toFixed(1), unit: 'g', label: 'Fat' },
] as const;

/** The list below, off the same numbers. */
export const rows = [
  { id: 'r1', name: 'Calories', value: `${calories} Cal` },
  { id: 'r2', name: 'Carbohydrate', value: `${macros.carbs.toFixed(1)} g` },
  { id: 'r3', name: 'Protein', value: `${macros.protein.toFixed(1)} g` },
  { id: 'r4', name: 'Total fat', value: `${macros.fat.toFixed(1)} g` },
  { id: 'r5', name: 'Fibre', value: '7.4 g' },
  { id: 'r6', name: 'Sodium', value: '480 mg' },
] as const;
