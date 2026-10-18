/** Everything the product screen says, kept out of the components. */

export const panel = {
  ghost: 'STICKY\nSESAME',
} as const;

export const product = {
  brand: 'Sprouts brand',
  name: 'STICKY SESAME\nCHILI TOFU BOWL',
  price: '$6.79',
  was: '$12.99',
  unit: '13 oz · $0.77 per oz',
} as const;

export const stats = [
  { key: 'rating', value: '4.2/5', meta: '33 reviews', stars: 4 },
  { key: 'nutrition', value: 'Nutrition facts', meta: 'FCP: 35·64·22' },
] as const;

export const description =
  'Plant-based ingredients combined for a fast yet fresh vegan meal, this Korean-inspired bowl features organic tofu tossed in a sticky sesame chili glaze and served over hearty turmeric-seasoned whole grains, packed with a sesame-ginger drizzle.';

export const cta = 'ADD TO BASKET';
