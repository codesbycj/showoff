import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for verdestart, derived from the live window (I2).
 *
 * **The hero is the remainder.** Everything under it is sized and the
 * photograph takes what is left — a bigger hero is a better splash, and it is
 * what keeps the foot closed without a spacer (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 24;

  const titleH = 44;
  const gapTitle = 22;
  const bodyH = 24;
  const gapBody = 26;

  const ctaH = 56;
  const gapCta = 12;

  const footH = 22;
  const gapFoot = 18;
  const footer = insets.bottom + 10;

  const below =
    gapTitle + titleH + 6 + bodyH + gapBody + ctaH + gapCta + ctaH + gapFoot + footH + footer;
  const heroH = Math.max(240, H - below);

  return {
    W,
    H,
    insets,
    margin,
    hero: { h: heroH, radius: 36 },
    gapTitle,
    titleH,
    bodyH,
    gapBody,
    cta: { h: ctaH },
    gapCta,
    footH,
    gapFoot,
    footer,
  };
}
