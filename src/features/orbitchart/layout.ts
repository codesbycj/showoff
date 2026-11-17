import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for orbitchart, derived from the live window (I2).
 *
 * The activity sheet is the remainder and its content is taller than that, so
 * the last row is cropped by the frame rather than leaving a band under the
 * list (I3) — which is how the board crops it.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 86;
  const gapHeader = 10;

  const chartH = Math.round(H * 0.34);
  const gapChart = 16;

  const rangeH = 52;
  const gapRange = 18;

  const rowH = 66;
  const rowGap = 8;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    chart: { h: chartH },
    gapChart,
    range: { h: rangeH, radius: 26 },
    gapRange,
    sheet: { radius: 26 },
    row: { h: rowH, gap: rowGap },
  };
}
