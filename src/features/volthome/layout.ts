import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for volthome, derived from the live window (I2).
 *
 * The product grid is the remainder and its content is taller than that, so
 * the second row is cropped by the frame rather than leaving a band above the
 * tab bar (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const headerH = 52;
  const gapHeader = 12;

  const searchH = 50;
  const gapSearch = 12;

  const promoH = 62;
  const gapPromo = 20;

  const sectionH = 28;
  const gapSection = 12;

  const tileW = 68;
  const tileLabelH = 18;
  const tileH = tileW + 6 + tileLabelH;
  const gapTiles = 20;

  const cardW = (W - margin * 2 - 12) / 2;
  const cardImageH = Math.round(cardW * 0.92);

  const barH = 64;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    search: { h: searchH, radius: 25 },
    gapSearch,
    promo: { h: promoH, radius: 18 },
    gapPromo,
    sectionH,
    gapSection,
    tile: { w: tileW, h: tileH, labelH: tileLabelH },
    gapTiles,
    card: { w: cardW, imageH: cardImageH, radius: 18 },
    bar: { h: barH },
  };
}
