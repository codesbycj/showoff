/** Everything the shop screen says, kept out of the components. */

export const header = {
  titleLead: 'Plant-Based Protein\nBalls For ',
  titleAccent: 'Health',
  body: 'Plant-based protein balls made with natural ingredients to fuel your day.',
} as const;

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'balls', label: 'Protein Balls' },
  { key: 'best', label: 'Best Sellers' },
  { key: 'new', label: 'New In' },
] as const;

export const selectedFilter = 'all';

export const section = {
  title: 'Best Picks for You',
  more: 'See All',
} as const;

export const products = [
  { key: 'classic', art: 'leaf', name: 'Eco Bites', price: '' },
  { key: 'cocoa', art: 'apricot', name: 'Cocoa Bites', price: '$12.99' },
] as const;

export const pack = {
  top: 'ECO',
  bottom: 'BITES',
} as const;
