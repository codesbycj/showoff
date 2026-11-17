import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for nebuhome, derived from the live window (I2).
 *
 * The holdings list is the remainder and its content is taller than that, so
 * the list runs under the floating dock exactly as the board crops it — which
 * is what keeps the foot closed (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const accountH = 48;
  const gapAccount = 26;

  const balanceH = 104;
  const gapBalance = 26;

  const chipH = 46;
  const gapChips = 26;

  const sectionH = 28;
  const gapSection = 12;

  const rowH = 76;
  const featureH = 164;
  const rowGap = 12;

  const dockH = 64;
  const dockBottom = insets.bottom + 8;

  return {
    W,
    H,
    insets,
    margin,
    accountH,
    gapAccount,
    balanceH,
    gapBalance,
    chip: { h: chipH, radius: 23 },
    gapChips,
    sectionH,
    gapSection,
    row: { h: rowH, featureH, gap: rowGap, radius: 18 },
    dock: { h: dockH, bottom: dockBottom, radius: 32 },
    /** The nebula fills the top half and is the page's own ground (§5.5). */
    glowH: Math.round(H * 0.55),
  };
}
