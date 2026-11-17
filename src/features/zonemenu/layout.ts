import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for zonemenu, derived from the live window (I2).
 *
 * **The dish grid is the block that continues.** The board crops its grid at
 * the screen edge, so the page genuinely scrolls — R6's "a list or a sheet
 * that genuinely continues" — and the cards are sized from the column width
 * rather than stretched to meet the fold (I3: never a spacer).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;
  const gutter = 12;
  const col = (W - margin * 2 - gutter) / 2;

  const bannerH = 168;
  /** The brand disc straddles the banner's lower edge, as the board draws it. */
  const disc = 56;

  const gapDisc = disc / 2 + 8;
  const placeH = 28;
  const metaH = 18;
  const gapPlace = 14;
  const deliveryH = 62;
  const gapDelivery = 12;
  const offerH = 64;
  const gapOffer = 14;
  const tabsH = 38;
  const gapTabs = 14;

  const photoH = Math.round(col * 0.74);
  const cardH = photoH + 56;

  return {
    W,
    H,
    insets,
    margin,
    gutter,
    col,
    banner: { h: bannerH, disc, control: 36 },
    gapDisc,
    placeH,
    metaH,
    gapPlace,
    delivery: { h: deliveryH, radius: 14 },
    gapDelivery,
    offer: { h: offerH, radius: 12 },
    gapOffer,
    tabsH,
    gapTabs,
    card: { h: cardH, photoH, radius: 14, add: 26 },
    scrollPad: Math.max(insets.bottom, 12) + 12,
  };
}
