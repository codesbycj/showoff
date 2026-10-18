/** Everything the product screen says, kept out of the components. */

export const header = {
  title: 'Details',
} as const;

export const product = {
  name: 'Eco Bites',
  rating: '4.5',
  tagline: 'Plant-Based Protein Balls',
} as const;

export const sizes = [
  { key: 'single', label: 'Single Pack' },
  { key: 'medium', label: 'Medium Pack' },
  { key: 'family', label: 'Family Pack' },
] as const;

export const selectedSize = 'medium';

export const description = {
  title: 'Description',
  body: 'Eco Bites are plant-based protein balls made with natural ingredients to fuel your day and support your healthy lifestyle. Packed with 12g protein per pack, no added sugar, vegan, gluten-free, and non-GMO. Perfect for a healthy snack anytime, anywhere.',
  sizeTitle: 'Select Pack Size',
} as const;

/** The three claims on the back of the pack, printed as chips. */
export const claims = ['Vegan', 'Gluten-free', 'Non-GMO'] as const;

export const cta = 'Add to Cart';

export const pack = {
  top: 'ECO',
  bottom: 'BITES',
} as const;
