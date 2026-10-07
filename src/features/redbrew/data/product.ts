/** Everything the product-detail screen says. */
export const PRODUCT = {
  title: 'Product Detail',
  back: 'Back to Brew',
  dispatch: 'Fast Dispatch',

  eyebrow: 'Freshly Pulled Roast',
  batch: 'Batch #04',
  /** Set uppercase in Space Grotesk — the spec's hero treatment. */
  name: 'Cappuccino hot and ready',
  body: 'Double-shot velvety espresso crowned with dense microfoam, dusted with Valrhona single-origin cocoa.',

  temperature: '68°C',
  extraction: 'Artisanal Steam Extraction',

  sizeLabel: 'Select Cup Size',
  milkLabel: 'Milk & Alternative',
  milkNote: 'Craft Froth',

  roastTitle: 'Roast Strength',
  roastSub: 'Dark Italian Roast • Heavy Body',
  /** Filled bars out of four. */
  roastLevel: 3,

  deliveryLabel: 'Express Delivery',
  deliveryTime: '4-6 mins',

  cta: 'Order now',
  another: 'Brew another cup',
} as const;

export type Size = { key: string; short: string; label: string; full: string; price: string };

export const SIZES: Size[] = [
  { key: 's', short: 'S', label: '8 oz', full: '8 oz Small', price: '$8.49' },
  { key: 'm', short: 'M', label: '12 oz', full: '12 oz Medium', price: '$9.99' },
  { key: 'l', short: 'L', label: '16 oz', full: '16 oz Large', price: '$11.49' },
];

/**
 * The milk options.
 *
 * The reference writes the first as "Oat M!lk" — a typo, not a brand
 * affectation: every other screen in the export spells it "Oat milk". It is
 * corrected here.
 */
export const MILKS = ['Oat Milk', 'Almond', 'Whole'] as const;
