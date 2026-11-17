import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for flowstart, derived from the live window (I2).
 *
 * **The photograph is the remainder.** The sheet under it is sized and the
 * image takes what is left — a bigger hero is a better splash, and it is what
 * keeps the foot closed without a spacer (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 26;

  const displayH = 100;
  const gapDisplay = 14;
  const bodyH = 44;
  const gapBody = 18;
  const dotsH = 18;
  const gapDots = 20;

  const ctaH = 58;
  const gapCta = 16;
  const linkH = 20;
  const footer = insets.bottom + 12;

  const sheetH =
    28 + displayH + gapDisplay + bodyH + gapBody + dotsH + gapDots + ctaH + gapCta + linkH + footer;
  const heroH = Math.max(280, H - sheetH + 34);

  return {
    W,
    H,
    insets,
    margin,
    hero: { h: heroH },
    sheet: { h: sheetH, radius: 34 },
    displayH,
    gapDisplay,
    bodyH,
    gapBody,
    dotsH,
    gapDots,
    cta: { h: ctaH },
    gapCta,
    linkH,
    footer,
  };
}
