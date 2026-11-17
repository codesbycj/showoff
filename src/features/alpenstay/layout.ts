import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for alpenstay, derived from the live window (I2).
 *
 * **The gallery is the remainder.** Every row below it is sized and the
 * photographs take what is left, so the price bar always sits on the foot (I3)
 * and the rows can never run beneath it (R3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;
  const control = 44;

  const titleH = 76;
  const gapTitle = 14;

  const factsH = 44;
  const gapFacts = 14;

  const amenityH = 78;
  const gapAmenity = 18;

  const barH = 72;
  const footer = insets.bottom + 10;

  const below = titleH + gapTitle + factsH + gapFacts + amenityH + gapAmenity + barH + footer + 12;
  const galleryH = Math.max(240, H - below);

  return {
    W,
    H,
    insets,
    margin,
    control,
    gallery: { h: galleryH, radius: 28 },
    titleH,
    gapTitle,
    factsH,
    gapFacts,
    amenity: { h: amenityH, radius: 18 },
    gapAmenity,
    bar: { h: barH },
    footer,
  };
}
