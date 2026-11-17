import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for nookstart, derived from the live window (I2).
 *
 * **The posed pieces are the remainder.** The headline above them and the
 * action below are budgeted, and the field the three discs sit in takes what
 * is left — so the screen always ends on its button with no band under it
 * (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 28;

  const brandH = 40;
  const gapBrand = 20;
  const displayH = 108;
  const countH = 28;
  const gapDisplay = 10;
  const ctaH = 72;
  /**
   * **The foot does not reserve the indicator's strip.** When the app is not
   * edge-to-edge the system already holds that space, and padding a pinned
   * surface by `insets.bottom` on top of it counts the strip twice - the
   * defect that put an empty band under four screens of a deleted batch
   * (R1b / I3 / I11).
   */
  const footer = 22;

  const used = insets.top + brandH + gapBrand + displayH + countH + gapDisplay + ctaH + footer;
  const fieldH = Math.max(280, H - used);

  /** The three discs, sized off the field so they hold their proportions. */
  const big = Math.min(W * 0.58, fieldH * 0.44);
  const small = big * 0.68;

  return {
    brandH,
    gapBrand,
    countH,
    W,
    H,
    insets,
    margin,
    displayH,
    gapDisplay,
    field: { h: fieldH, big, small },
    cta: { h: ctaH },
    footer,
  };
}
