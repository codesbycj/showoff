import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for verdedish, derived from the live window (I2).
 *
 * **The plate is the remainder.** Everything under it is sized and the
 * photograph takes what is left, so the order bar always sits on the foot (I3)
 * and the rows above it can never run beneath it (R3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const headerH = 52;
  const titleH = 60;
  const gapTitle = 14;

  const factsH = 34;
  const gapFacts = 14;

  const blurbH = 44;
  const gapBlurb = 14;

  const extraRowH = 44;
  const extrasHeadH = 28;
  const extrasH = extrasHeadH + extraRowH * 3;
  const gapExtras = 10;

  const barH = 64;
  const footer = insets.bottom + 8;

  const below =
    titleH + gapTitle + factsH + gapFacts + blurbH + gapBlurb + extrasH + gapExtras + barH + footer;
  /**
   * The header floats over the gallery, so neither it nor the status inset is
   * taken off the remainder — subtracting them left 119dp of dead canvas at
   * the foot, which `foot.py` failed and the eye read as "the screen stops
   * early" (I3).
   */
  const galleryH = Math.max(220, H - below);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gallery: { h: galleryH, radius: 28 },
    titleH,
    gapTitle,
    factsH,
    gapFacts,
    blurbH,
    gapBlurb,
    extras: { h: extrasH, headH: extrasHeadH, rowH: extraRowH },
    gapExtras,
    bar: { h: barH },
    footer,
  };
}
