import modelBag from '@/assets/images/model-bag.webp';
import modelBase from '@/assets/images/model-base.webp';
import modelCap from '@/assets/images/model-cap.webp';
import modelEarrings from '@/assets/images/model-earrings.webp';
import modelHeadphones from '@/assets/images/model-headphones.webp';
import modelSunglasses from '@/assets/images/model-sunglasses.webp';
import modelWatch from '@/assets/images/model-watch.webp';
import productBag from '@/assets/images/product-bag.webp';
import productCap from '@/assets/images/product-cap.webp';
import productEarrings from '@/assets/images/product-earrings.webp';
import productHeadphones from '@/assets/images/product-headphones.webp';
import productSunglasses from '@/assets/images/product-sunglasses.webp';
import productWatch from '@/assets/images/product-watch.webp';

export type Product = {
  key: string;
  /** The caption under the tile. */
  label: string;
  /** The cut-out shown on the tile. */
  image: string;
  /** The figure wearing it, shown while this tile is the active one. */
  figure: string;
};

/**
 * The six tiles, in the order they cycle. The marquee repeats this list as many
 * times as it takes to fill the stage, so the order here is the order products
 * pass the figure.
 */
export const PRODUCTS: Product[] = [
  { key: 'cap', label: 'Limited Edition', image: productCap, figure: modelCap },
  { key: 'headphones', label: 'Audio', image: productHeadphones, figure: modelHeadphones },
  { key: 'earrings', label: 'Jewelry', image: productEarrings, figure: modelEarrings },
  { key: 'sunglasses', label: 'Eyewear', image: productSunglasses, figure: modelSunglasses },
  { key: 'watch', label: 'Watch', image: productWatch, figure: modelWatch },
  { key: 'bag', label: 'Bag', image: productBag, figure: modelBag },
];

/** Shown before the first frame has chosen an active tile. */
export const FIGURE_BASE = modelBase;

/** Every figure, so they can all be decoded up front. */
export const FIGURES = [FIGURE_BASE, ...PRODUCTS.map((p) => p.figure)];
