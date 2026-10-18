import { rx } from '../theme';

/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * One correction to the reference, deliberately: its first card reads "Porshe
 * 911 GT3". A design shot is not an authority on its own spelling (AGENTS.md,
 * "Three kinds of reference"), so the marque is spelt correctly here.
 */

export const header = {
  brand: 'RentaX®',
  place: 'St. Celina, Delaware 10299',
  initials: 'JD',
} as const;

export const headline = { one: 'Premium', two: '& Rental Car' } as const;

export const tabs = [
  { key: 'premium', label: 'Premium', flag: null },
  { key: 'exclusive', label: 'Exclusive', flag: 'New' },
] as const;

export const date = { label: 'Choose Date', value: 'Today, 13 May' } as const;

export const cars = [
  {
    key: 'porsche',
    name: 'Porsche 911 GT3',
    range: '570 km',
    rating: '4,3',
    recommend: '82% Recommend',
    priceLabel: '1 day rental',
    price: '$900',
    card: rx.cardWarm,
    body: rx.cars[0],
    swatch: '#2f6df0',
  },
  {
    key: 'lamborghini',
    name: 'Lamborghini Huracan',
    range: '712 km',
    rating: '4,9',
    recommend: '97% Recommend',
    priceLabel: '1 day rental',
    price: '$1,250',
    card: rx.cardCoral,
    body: rx.cars[1],
    swatch: '#111111',
  },
] as const;

export type DockKey = 'browse' | 'stats' | 'saved' | 'profile';

export const dock: DockKey[] = ['browse', 'stats', 'saved', 'profile'];
