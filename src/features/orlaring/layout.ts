import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for orlaring, derived from the live window (I2).
 *
 * **The ring is the remainder.** The title above it and the facts and action
 * below are budgeted, so the screen always ends on its action with no band
 * under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 26;
  const headerH = 50;
  const gapHeader = 8;
  const titleH = 76;
  const gapTitle = 8;
  const factsH = 78;
  const gapFacts = 16;
  const ctaH = 56;
  /**
   * **The foot does not reserve the indicator's strip.** When the app is not
   * edge-to-edge the system already holds that space, and padding a pinned
   * surface by `insets.bottom` on top of it counts the strip twice - the
   * defect that put an empty band under four screens of a deleted batch
   * (R1b / I3 / I11).
   */
  const footer = 20;

  const used =
    insets.top + headerH + gapHeader + titleH + gapTitle + factsH + gapFacts + ctaH + footer;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    titleH,
    gapTitle,
    hero: { h: Math.max(240, H - used), finish: 44 },
    factsH,
    gapFacts,
    cta: { h: ctaH },
    footer,
  };
}
