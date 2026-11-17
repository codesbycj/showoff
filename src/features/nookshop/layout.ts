import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for nookshop, derived from the live window (I2).
 *
 * **The product cards are the remainder.** The header, the title, the kind
 * rail and the promo card are budgeted, and the two cards grow into what is
 * left, so the screen always ends on the promo with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 8;
  const titleH = 50;
  const gapTitle = 16;
  const kindH = 54;
  const gapKind = 18;
  const gapCards = 18;
  const promoH = 190;
  /**
   * **The foot does not reserve the indicator's strip.** When the app is not
   * edge-to-edge the system already holds that space, and padding a pinned
   * surface by `insets.bottom` on top of it counts the strip twice - the
   * defect that put an empty band under four screens of a deleted batch
   * (R1b / I3 / I11).
   */
  const footer = 18;

  const used =
    insets.top +
    headerH +
    gapHeader +
    titleH +
    gapTitle +
    kindH +
    gapKind +
    gapCards +
    promoH +
    footer;

  const cardH = Math.max(150, H - used);
  const cardW = (W - margin * 2 - 12) / 2;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    titleH,
    gapTitle,
    kind: { h: kindH, size: 46 },
    gapKind,
    card: { w: cardW, h: cardH, radius: 16 },
    gapCards,
    promo: { h: promoH, radius: 20 },
    footer,
  };
}
