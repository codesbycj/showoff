import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for skyresults, derived from the live window (I2).
 *
 * The list takes the remainder and its content is taller than that, so the
 * third offer is cropped by the frame rather than leaving a band under the
 * list (I3) — which is how the board crops its own list.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 18;

  const chipH = 44;
  const gapChips = 18;

  const cardH = 196;
  const cardGap = 16;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    chip: { h: chipH, radius: 22 },
    gapChips,
    card: { h: cardH, radius: 22 },
    cardGap,
  };
}
