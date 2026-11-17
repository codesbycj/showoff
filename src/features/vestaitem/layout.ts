import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for vestaitem, derived from the live window (I2).
 *
 * **The hero photograph is the remainder.** The board ends this screen on its
 * button with a band of empty canvas above it; whichever block absorbs the
 * slack has to be one that genuinely scales, and a product photograph is the
 * obvious one — a bigger photograph is a better product page. So everything
 * below it is sized and the hero takes what is left, which means the screen
 * cannot leave a band by construction (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 44;
  const gapHeader = 12;

  const gapHero = 14;
  const railH = 54;
  const gapRail = 16;
  const titleH = 48;
  const gapTitle = 16;
  const sizeHeadH = 24;
  const gapSizeHead = 10;
  const sizeH = 40;
  const gapSize = 14;
  const blurbH = 40;
  const gapBlurb = 12;
  const deliveryH = 34;
  const gapDelivery = 12;
  const ctaH = 56;
  const footer = Math.max(insets.bottom, 14);

  const below =
    gapHero +
    railH +
    gapRail +
    titleH +
    gapTitle +
    sizeHeadH +
    gapSizeHead +
    sizeH +
    gapSize +
    blurbH +
    gapBlurb +
    deliveryH +
    gapDelivery +
    ctaH +
    footer;

  const heroH = Math.max(220, H - insets.top - headerH - gapHeader - below);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    control: 40,
    hero: { h: heroH, radius: 20 },
    gapHero,
    rail: { h: railH, thumb: 46, gap: 10 },
    gapRail,
    titleH,
    gapTitle,
    sizeHeadH,
    gapSizeHead,
    size: { h: sizeH, min: 44 },
    gapSize,
    blurbH,
    gapBlurb,
    deliveryH,
    gapDelivery,
    cta: { h: ctaH, radius: ctaH / 2, share: ctaH },
    footer,
  };
}
