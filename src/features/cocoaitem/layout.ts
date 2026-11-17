import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for cocoaitem, derived from the live window (I2).
 *
 * **The product photograph is the remainder.** The title above it and the
 * stepper and bar below are budgeted, so the screen always ends on its action
 * with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 24;

  const headerH = 50;
  const gapHeader = 6;
  const titleH = 76;
  const gapTitle = 10;
  const stepH = 74;
  const gapStep = 14;
  const ctaH = 62;
  /**
   * **The foot does not reserve the indicator's strip.** When the app is not
   * edge-to-edge the system already holds that space, and padding a pinned
   * surface by `insets.bottom` on top of it counts the strip twice - the
   * defect that put an empty band under four screens of a deleted batch
   * (R1b / I3 / I11).
   */
  const footer = 18;

  const used =
    insets.top + headerH + gapHeader + titleH + gapTitle + stepH + gapStep + ctaH + footer;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    titleH,
    gapTitle,
    hero: { h: Math.max(220, H - used), variant: 52 },
    stepH,
    gapStep,
    cta: { h: ctaH, radius: 20 },
    footer,
  };
}
