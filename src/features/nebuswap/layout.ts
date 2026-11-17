import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for nebuswap, derived from the live window (I2).
 *
 * The recent-swaps list is the remainder and runs under the floating dock, as
 * the board crops it — which is what keeps the foot closed (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 44;
  const gapHeader = 22;

  const fieldH = 92;
  const fieldGap = 10;

  const ctaH = 56;
  const gapCta = 16;

  const insightH = 120;
  const gapInsight = 22;

  const sectionH = 28;
  const gapSection = 14;
  const dayH = 28;

  const rowH = 72;
  const rowGap = 10;

  const dockH = 64;
  const dockBottom = insets.bottom + 8;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    field: { h: fieldH, gap: fieldGap, radius: 18 },
    cta: { h: ctaH, radius: 28 },
    gapCta,
    insight: { h: insightH, radius: 20 },
    gapInsight,
    sectionH,
    gapSection,
    dayH,
    row: { h: rowH, gap: rowGap, radius: 18 },
    dock: { h: dockH, bottom: dockBottom, radius: 32 },
    glowH: Math.round(H * 0.55),
  };
}
