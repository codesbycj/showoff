import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for cocoahome, derived from the live window (I2).
 *
 * **The collection cards are the remainder.** The title, the chips and the
 * pinned bar are budgeted, and the rail grows into what is left, so the screen
 * always ends on the bar with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const headerH = 86;
  const gapHeader = 18;
  const chipH = 44;
  const gapChips = 20;
  const sectionH = 28;
  const gapSection = 14;

  /** A pinned, full-width bar is its own height and nothing more (I11). */
  const barH = 74;

  const used =
    insets.top + headerH + gapHeader + chipH + gapChips + sectionH + gapSection + barH + 16;

  const cardH = Math.max(220, H - used);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    chip: { h: chipH, radius: 21 },
    gapChips,
    sectionH,
    gapSection,
    card: { w: W * 0.56, h: cardH, radius: 22 },
    bar: { h: barH, radius: 24 },
  };
}
