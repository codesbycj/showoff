import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for wiseplaces, derived from the live window (I2).
 *
 * **The collage is the remainder.** The wordmark and the copy below it are
 * sized and the illustration takes what is left, so the action always sits on
 * the foot with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 26;

  const markH = 54;
  const gapMark = 10;

  const displayH = 82;
  const gapDisplay = 12;
  const bodyH = 42;
  const gapBody = 18;
  const dotsH = 16;
  const gapDots = 20;
  const ctaH = 58;
  const footer = insets.bottom + 14;

  const below = displayH + gapDisplay + bodyH + gapBody + dotsH + gapDots + ctaH + footer + 10;
  const collageH = Math.max(230, H - insets.top - markH - gapMark - below);

  return {
    W,
    H,
    insets,
    margin,
    markH,
    gapMark,
    collage: { h: collageH },
    displayH,
    gapDisplay,
    bodyH,
    gapBody,
    dotsH,
    gapDots,
    cta: { h: ctaH },
    footer,
  };
}
