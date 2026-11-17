import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for verdehome, derived from the live window (I2).
 *
 * The dish grid is the remainder and its content is taller than that, so the
 * second row runs under the floating dock exactly as the board crops it —
 * which is what keeps the foot closed (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 56;
  const gapHeader = 14;

  const searchH = 52;
  const gapSearch = 18;

  const promoH = 158;
  const gapPromo = 20;

  const sectionH = 30;
  const gapSection = 10;

  const chipH = 44;
  const gapChips = 16;

  const cardW = (W - margin * 2 - 14) / 2;
  const cardImageH = Math.round(cardW * 0.74);

  const dockH = 66;
  const dockBottom = insets.bottom + 6;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    search: { h: searchH, radius: 26 },
    gapSearch,
    promo: { h: promoH, radius: 22 },
    gapPromo,
    sectionH,
    gapSection,
    chip: { h: chipH, radius: 22 },
    gapChips,
    card: { w: cardW, imageH: cardImageH, radius: 18 },
    dock: { h: dockH, bottom: dockBottom },
  };
}
