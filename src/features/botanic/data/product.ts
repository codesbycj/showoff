import type { SymbolName } from '../symbols';
import { bt } from '../theme';

/**
 * Everything the screen says, kept out of the components so they stay
 * presentational. All of it is the export's own copy, verbatim.
 */

export const PRODUCT = {
  brand: 'Sprouts Brand',
  title: 'Sticky Sesame Chili Tofu Bowl',
  /** The markup sets a real `U+2022` here, not a hyphen. */
  size: '13 oz • $0.77 per oz',
  price: '$6.79',
  wasPrice: '$12.99',
  /** The watermark behind the dish, split across its two rotated lines. */
  watermark: ['STICKY SESAME', 'CHILI BOWL'],
} as const;

/** The two badges pinned to the dish. */
export const BADGES = [
  { icon: 'eco' as SymbolName, label: '100% Plant-Based', tint: bt.accent },
  { icon: 'localFireDepartment' as SymbolName, label: 'Mild Spice', tint: bt.gold },
] as const;

export const RATING = {
  score: '4.2/5',
  /** Four filled, one half — the half is the only one the font supplies. */
  filled: 4,
  reviews: '33 reviews',
} as const;

export const NUTRITION = {
  heading: 'Nutrition facts',
  split: 'FCP: 35 • 64 • 22',
  total: '480 kcal total',
} as const;

export const NOTE = {
  heading: "Chef's Note",
  body:
    'Plant-based ingredients combined for a fast yet fresh vegan meal, this ' +
    'Korean-inspired bowl features organic tofu tossed in a sticky sesame chili ' +
    'glaze and served over hearty turmeric-seasoned whole grains packed with ' +
    'edamame and scallions.',
} as const;

export const INGREDIENTS = {
  heading: 'Signature Ingredients',
  /** Each chip carries a dot, and the four dots are four different tokens. */
  items: [
    { label: 'Organic Glazed Tofu', dot: bt.accent },
    { label: 'Turmeric Grains', dot: bt.gold },
    { label: 'Quick-Pickled Cucumbers', dot: bt.accentFixed },
    { label: 'Sweet Chili Sesame', dot: bt.clay },
  ],
} as const;

export const VERIFIED = {
  title: 'Non-GMO & Dairy-Free',
  subtitle: 'Verified Sprouts Clean Kitchen',
} as const;

export const CTA = {
  label: 'Add to Basket • $6.79',
  /**
   * What the export's own script swaps the label to for 1800ms on tap, minus
   * its party-popper emoji. An emoji is drawn by whichever font claims the
   * codepoint, so it differs across Windows, Android and iOS, and the web
   * harness renders on one of them and cannot show the difference — the house
   * rule is to never ship one as UI. Nothing here replaces it: the sentence
   * carries the moment on its own.
   */
  added: 'Added to Basket!',
  confirmMs: 1800,
} as const;

export const APP_BAR = { title: 'Product Details' } as const;
