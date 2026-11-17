import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for alpenfly, derived from the live window (I2).
 *
 * The ticket list is the remainder and its content is taller than that, so the
 * second fare is cropped by the frame rather than leaving a band under the
 * list (I3) - which is how the board crops it.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 16;

  const routeH = 150;
  const gapRoute = 14;

  const filtersH = 46;
  const gapFilters = 14;

  const stripH = 76;
  const gapStrip = 16;

  const countH = 38;
  const gapCount = 10;

  const ticketH = 184;
  const ticketGap = 14;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    route: { h: routeH, radius: 22 },
    gapRoute,
    filters: { h: filtersH, radius: 23 },
    gapFilters,
    stripH,
    gapStrip,
    countH,
    gapCount,
    ticket: { h: ticketH, gap: ticketGap, radius: 20 },
  };
}
