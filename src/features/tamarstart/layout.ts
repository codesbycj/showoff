import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for tamarstart, derived from the live window (I2).
 *
 * **The photograph is full bleed and the copy is pinned to the foot**, so there
 * is no block that can leave a band: the screen is the picture, and everything
 * else sits on it. I3's "nothing empty at the bottom" is satisfied by
 * construction rather than by measurement.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const wordmarkH = 34;
  const gapWordmark = 14;
  const headlineH = 38 * 2;
  const gapHeadline = 12;
  const bodyH = 21 * 2;
  const gapBody = 26;
  const ctaH = 56;
  const gapCta = 18;
  const asideH = 22;
  const footer = Math.max(insets.bottom, 16) + 10;

  const copyH =
    wordmarkH + gapWordmark + headlineH + gapHeadline + bodyH + gapBody + ctaH + gapCta + asideH;

  return {
    W,
    H,
    insets,
    margin,
    /** The scrim starts above the copy so the top of the frame stays the photo. */
    scrim: { h: Math.round(copyH + footer + 90) },
    wordmarkH,
    gapWordmark,
    headlineH,
    gapHeadline,
    bodyH,
    gapBody,
    cta: { h: ctaH, radius: ctaH / 2 },
    gapCta,
    asideH,
    footer,
  };
}
