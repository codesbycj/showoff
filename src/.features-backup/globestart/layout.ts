import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for globestart, derived from the live window (I2).
 *
 * **The photograph is full bleed and the copy is pinned to the foot**, so
 * there is no block that can leave a band: the screen *is* the picture, and
 * everything else sits on it. I3's "nothing empty at the bottom" is satisfied
 * by construction rather than by measurement.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 24;

  const stepH = 20;
  const gapStep = 8;
  const wordmarkH = 36;

  const headlineH = 40 * 2;
  const gapHeadline = 8;
  const sublineH = 20;
  const gapSubline = 26;
  const slideH = 58;
  const footer = Math.max(insets.bottom, 16) + 8;

  const copyH = headlineH + gapHeadline + sublineH + gapSubline + slideH;

  return {
    W,
    H,
    insets,
    margin,
    stepH,
    gapStep,
    wordmarkH,
    headlineH,
    gapHeadline,
    sublineH,
    gapSubline,
    slide: { h: slideH, radius: slideH / 2 },
    /** The scrim starts above the copy so the top of the frame stays the photo. */
    scrimH: Math.round(copyH + footer + 120),
    footer,
  };
}
