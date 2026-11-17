import type { GlyphName } from '../components/glyph';

/**
 * Everything pulpitem says, so the components stay presentational.
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const drink = {
  /** Named for what the photograph shows - the board's own title is a
   *  strawberry drink over a dragon-fruit frame. */
  name: 'Dragon fruit & berry smoothie',
  size: '500 ml',
  price: 7.2,
  qty: 1,
  cta: 'Add to cart',
  section: 'Nutrition facts',
  image: require('../../../../assets/images/pulpitem/hero.jpg'),
};

export type Tag = { id: string; label: string; icon: GlyphName };

export const tags: Tag[] = [
  { id: 'vegan', label: 'Vegan', icon: 'sprout' },
  // STEP 1.08 "Energy boost"
  // { id: 'boost', label: 'Energy boost', icon: 'spark' },
];

export type Fact = { id: string; label: string; value: string };

export const facts: Fact[] = [
  { id: 'kcal', label: 'Calories', value: '180 kcal' },
  // STEP 1.15 "Sugar"
  // { id: 'sugar', label: 'Sugar', value: '30 g' },
  // STEP 1.16 "Fat"
  // { id: 'fat', label: 'Fat', value: '2 g' },
  // STEP 1.17 "Fiber"
  // { id: 'fiber', label: 'Fiber', value: '5 g' },
];

export const money = (n: number) => `$${n.toFixed(2)}`;
