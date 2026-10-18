/** Everything the home screen says, kept out of the components. */

export const header = {
  wordmark: 'SPR\u00d8UTS',
} as const;

export const feature = {
  kicker: "Carol's favorite",
  display: 'FRENCH\nROAST',
  product: 'Organic Whole Bean Coffee',
  price: '$15.99',
} as const;

export const chips = [
  { key: 'organic', label: 'Organic' },
  { key: 'vegie', label: 'Vegie' },
  { key: 'grains', label: 'Grains' },
  { key: 'dairy', label: 'Dairy' },
] as const;

export const dishes = [
  { key: 'rice', art: 1 },
  { key: 'bowls', art: 2 },
] as const;

export const dock = [
  { key: 'home', icon: 'home' },
  { key: 'deals', icon: 'tag' },
  { key: 'basket', icon: 'basket' },
  { key: 'search', icon: 'search' },
] as const;

export const selectedDock = 'home';
