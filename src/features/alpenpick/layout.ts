import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for alpenpick, derived from the live window (I2).
 *
 * **The grid is the remainder.** Its cards grow into whatever the header, the
 * chips and the action leave, so the screen always ends on its button with no
 * band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 16;

  const titleH = 80;
  const gapTitle = 16;

  const chipH = 46;
  const gapChips = 18;

  const ctaH = 58;
  const gapCta = 18;
  const footer = insets.bottom + 10;

  const used =
    insets.top +
    headerH +
    gapHeader +
    titleH +
    gapTitle +
    chipH +
    gapChips +
    gapCta +
    ctaH +
    footer;
  const gridH = Math.max(280, H - used);
  const cardW = (W - margin * 2 - 12) / 2;
  const cardH = (gridH - 12) / 2;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    titleH,
    gapTitle,
    chip: { h: chipH, radius: 23 },
    gapChips,
    card: { w: cardW, h: cardH, radius: 20 },
    gridH,
    gapCta,
    cta: { h: ctaH },
    footer,
  };
}
