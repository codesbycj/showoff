/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * Two corrections to the reference, deliberately — a design shot is not an
 * authority on its own spelling (AGENTS.md, "Three kinds of reference"):
 *
 *   * its header reads "Car Detalis";
 *   * its title reads "Porshe 911 GT3".
 */
export const car = {
  title: 'Car Details',
  caption: 'Model 360°',
  name: 'Porsche 911 GT3',
  badge: 'P',
  body: 'The car will give you an unforgettable comfort and feeling of great speed.',
  note: 'For your safety we recommend not exceeding the speed limit.',
  rating: '4,3',
  reviews: 'Reviews',
  price: '$900',
  priceUnit: '/ 1 day',
  action: 'Book Car',
} as const;

export type StatName = 'range' | 'speed' | 'power';

export const stats: { key: StatName; value: string; unit: string }[] = [
  { key: 'range', value: '570', unit: 'km' },
  { key: 'speed', value: '250', unit: 'km/h' },
  { key: 'power', value: '300', unit: 'kw' },
];
