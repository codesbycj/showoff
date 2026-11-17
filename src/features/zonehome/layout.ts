import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for zonehome, derived from the live window (I2).
 *
 * **The restaurant rail is the block that continues.** The board crops its
 * second card at the screen edge, so the row genuinely runs on — R2 says that
 * is a horizontal `ScrollView`, never a wrap, and a wrap physically cannot
 * reproduce a card clipped by the edge.
 *
 * Vertically the page runs a little past the fold, which R6 allows for a list
 * that genuinely continues, and the tab bar is flush to the foot — so no band
 * can open under it.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const barH = 44;
  const gapBar = 16;
  const promoH = 92;
  const gapPromo = 16;
  const searchH = 50;
  /** The header sheet wraps the bar, the promo and the search field. */
  const headerH = insets.top + barH + gapBar + promoH + gapPromo + searchH / 2;

  const gapHeader = searchH / 2 + 18;
  const catH = 96;
  const gapCats = 18;
  const sectionH = 26;
  const gapSection = 12;

  const cardW = Math.round(W * 0.74);
  const cardPhotoH = Math.round(cardW * 0.56);
  const cardH = cardPhotoH + 66;

  const gapRail = 20;
  const quickHeadH = 26;
  const gapQuickHead = 6;
  const quickRowH = 74;

  const tabsH = 62;

  return {
    W,
    H,
    insets,
    margin,
    header: { h: headerH, radius: 26 },
    barH,
    gapBar,
    promoH,
    gapPromo,
    search: { h: searchH, control: 44 },
    gapHeader,
    cats: { h: catH, tile: 62, gap: 14 },
    gapCats,
    sectionH,
    gapSection,
    card: { w: cardW, h: cardH, photoH: cardPhotoH, radius: 16, gap: 12 },
    gapRail,
    quickHeadH,
    gapQuickHead,
    quick: { rowH: quickRowH, thumb: 54, radius: 14 },
    tabs: { h: tabsH, cartLift: 14, cart: 48 },
    /** The scroller ends clear of the tab bar. */
    scrollPad: tabsH + insets.bottom + 16,
  };
}
