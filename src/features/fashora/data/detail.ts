/**
 * Screen 2 content — the product detail sheet.
 *
 * `ANGLES`, `COLORS`, `SIZES` and `HIGHLIGHTS` carry explicit element types
 * rather than leaning on `as const`: each is emptied one entry at a time for
 * the timelapse, and an array literal with nothing in it infers `never[]`,
 * which typechecks here and then fails at every call site.
 */
import { fa } from '../theme';

export const DETAIL = {
  title: 'Product Details',
  kicker: 'Outdoor Essentials',
  name: 'Bomber Jacket',
  price: '$108.00',
  rating: '4.9',
  reviews: '1.4k Reviews',
  stock: 'In Stock',
  blurb:
    'The bomber jacket is a timeless piece known for its casual yet stylish appeal. Originally designed for pilots, it now adds a bold, edgy touch to everyday fashion.',
  colorLabel: 'Select Color',
  sizeLabel: 'Select Size',
  guide: 'Guide',
  buy: 'Buy Now',
  hero: require('../../../../assets/images/fashora/pd-main.jpg') as number,
} as const;

/** The turntable's three angle thumbnails. */
export type Angle = { key: string; label: string; image: number };

export const ANGLES: readonly Angle[] = [
  // STEP 2.09 the zipper, close up
  // {
  //   key: 'zipper',
  //   label: 'Zipper detail',
  //   image: require('../../../../assets/images/fashora/pd-zipper.jpg'),
  // },
  // STEP 2.10 the jacket head on
  // {
  //   key: 'front',
  //   label: 'Front view',
  //   image: require('../../../../assets/images/fashora/pd-front.jpg'),
  // },
  // STEP 2.11 and the ribbed cuff
  // {
  //   key: 'cuff',
  //   label: 'Cuff detail',
  //   image: require('../../../../assets/images/fashora/pd-cuff.jpg'),
  // },
];

/**
 * The colourways.
 *
 * The export names Tailwind's own `sky-500`, `emerald-500` and `fuchsia-600`
 * for the three alternatives rather than anything in its palette, which is why
 * those sit in `theme.ts` under their own heading instead of among the brand
 * tokens.
 */
export type Colorway = { key: string; label: string; swatch: string };

export const COLORS: readonly Colorway[] = [
  // STEP 2.21 the one it is sold in
  // { key: 'solar', label: 'Solar Orange', swatch: fa.primaryContainer },
  // STEP 2.22 electric blue
  // { key: 'electric', label: 'Electric Blue', swatch: fa.swatchBlue },
  // STEP 2.23 neon pine
  // { key: 'pine', label: 'Neon Pine', swatch: fa.swatchGreen },
  // STEP 2.24 and cyber magenta
  // { key: 'cyber', label: 'Cyber Magenta', swatch: fa.swatchMagenta },
];

export type Size = { key: string; label: string };

export const SIZES: readonly Size[] = [
  // STEP 2.25 small
  // { key: 's', label: 'S' },
  // STEP 2.26 medium, which is the one selected
  // { key: 'm', label: 'M' },
  // STEP 2.27 large
  // { key: 'l', label: 'L' },
  // STEP 2.28 extra large
  // { key: 'xl', label: 'XL' },
  // STEP 2.29 and the one past it
  // { key: 'xxl', label: '2X' },
];

export type Highlight = {
  key: string;
  icon: 'localShipping' | 'replay';
  label: string;
  action?: string;
};

export const HIGHLIGHTS: readonly Highlight[] = [
  // STEP 2.32 it arrives Friday
  // {
  //   key: 'delivery',
  //   icon: 'localShipping',
  //   label: 'Free express delivery by Friday',
  //   action: 'Details',
  // },
  // STEP 2.33 and it can go back for a month
  // { key: 'returns', icon: 'replay', label: '30-Day effortless returns' },
];
