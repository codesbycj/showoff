/** The screen's words, kept out of the components so they stay presentational. */

export const intro = {
  headlineBold: 'Your Favorite\nTreats,',
  headlineSoft: ' Anytime',
  body: 'Snacks delivered fast, fresh, anytime.',
  cta: 'Get Start',
} as const;

export const products = [
  { key: 'chips', name: 'Potato Chips', price: '$2.00 USD', art: 'violet' },
  { key: 'curls', name: 'Cheese Curls', price: '$1.80 USD', art: 'sky' },
] as const;

export const labels = {
  price: 'Price',
  addToCart: 'Add To Cart',
} as const;
