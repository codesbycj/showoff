import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for voltitem, derived from the live window (I2).
 *
 * **The gallery is the remainder.** Every row below it is sized and the
 * photographs take what is left, so the sheet can never run under the action
 * bar (R3) and the foot can never open a band (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;
  const control = 40;

  const sheetRadius = 26;
  const gapTitle = 18;
  const titleH = 56;

  const pillsH = 34;
  const gapRow = 14;

  const financeH = 54;
  const factH = 30;
  const factGap = 8;
  const factsH = factH * 3 + factGap * 2;

  const ctaH = 56;
  const deliveryH = 20;
  const footer = insets.bottom + 8;

  const below =
    gapTitle +
    titleH +
    gapRow +
    pillsH +
    gapRow +
    financeH +
    gapRow +
    factsH +
    gapRow +
    ctaH +
    6 +
    deliveryH +
    footer;
  const galleryH = Math.max(230, H - below);

  return {
    W,
    H,
    insets,
    margin,
    gallery: { h: galleryH, control },
    sheetRadius,
    gapTitle,
    titleH,
    pillsH,
    gapRow,
    financeH,
    fact: { h: factH, gap: factGap, total: factsH },
    cta: { h: ctaH },
    deliveryH,
    footer,
  };
}
