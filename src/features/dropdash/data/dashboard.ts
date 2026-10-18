import { dd } from '../theme';

/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * One correction to the reference, deliberately: its second tile reads "Total
 * Payment Recived". A design shot is not an authority on its own spelling
 * (AGENTS.md, "Three kinds of reference").
 */

export const user = {
  eyebrow: 'Ready to deliver!',
  name: 'Oliver Bennet',
  initials: 'OB',
} as const;

export const search = { placeholder: 'Search...' } as const;

export type TileGlyph = 'box' | 'note' | 'shop' | 'chart';

export const tiles: {
  key: string;
  label: string;
  value: string;
  glyph: TileGlyph;
  accent: boolean;
}[] = [
  { key: 'products', label: 'Total Products', value: '345', glyph: 'box', accent: true },
  {
    key: 'payment',
    label: 'Total Payment Received',
    value: '₹10,326.00',
    glyph: 'note',
    accent: false,
  },
  { key: 'store', label: 'Find Store', value: '112', glyph: 'shop', accent: false },
  { key: 'stacks', label: 'Product Stacks', value: '234', glyph: 'chart', accent: false },
];

export const stock = {
  title: 'Stock Overview',
  items: [
    { key: 'in', label: 'In Stock', value: '345', color: dd.ok, mark: 'ok' as const },
    { key: 'low', label: 'Low Stock', value: '15', color: dd.low, mark: 'low' as const },
    { key: 'out', label: 'Out of Stock', value: '6', color: dd.out, mark: 'out' as const },
  ],
} as const;

export const deliveries = {
  title: 'Recent Deliveries',
  link: 'See all',
  rows: [
    { key: 'noodles', title: 'Noodles (Chicken flavour)', meta: '2 packs · Nila Supermarket' },
    { key: 'rice', title: 'Basmati Rice 5kg', meta: '1 sack · MC Road Store' },
  ],
} as const;

export type TabKey = 'home' | 'delivery' | 'products' | 'profile';

export const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'delivery', label: 'My delivery' },
  { key: 'products', label: 'Products' },
  { key: 'profile', label: 'Profile' },
];
