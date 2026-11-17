import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for pawsitem, derived from the live window (I2).
 *
 * **The product photograph is the remainder.** Everything under it is
 * budgeted block by block and the image takes what is left, so the screen
 * always ends on its button with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const headerH = 52;
  const gapHeader = 6;
  const titleH = 62;
  const gapTitle = 14;

  const factsH = 58;
  const gapFacts = 14;
  const bodyH = 64;
  const gapBody = 20;
  const ctaH = 58;
  /**
   * **The foot does not reserve the indicator's strip.** When the app is not
   * edge-to-edge the system already holds that space, and padding a pinned
   * surface by `insets.bottom` on top of it counts the strip twice - the
   * defect that put an empty band under four screens of a deleted batch
   * (R1b / I3 / I11).
   */
  const footer = 18;

  const used =
    insets.top +
    headerH +
    gapHeader +
    titleH +
    gapTitle +
    factsH +
    gapFacts +
    bodyH +
    gapBody +
    ctaH +
    footer;

  const heroH = Math.max(220, H - used);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    titleH,
    gapTitle,
    hero: { h: heroH, variant: 58 },
    factsH,
    gapFacts,
    bodyH,
    gapBody,
    cta: { h: ctaH },
    footer,
  };
}
