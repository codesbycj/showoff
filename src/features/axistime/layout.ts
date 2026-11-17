import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for axistime, derived from the live window (I2).
 *
 * **The plot is the remainder.** Everything under it is budgeted and the chart
 * grows into what is left, so the screen is full to the bottom edge with no
 * band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const topH = 48;
  const gapTop = 20;
  const displayH = 84;
  const gapDisplay = 10;
  const axisH = 30;
  const gapAxis = 24;
  const cardH = 136;
  const cardGap = 12;
  const padBottom = 20;

  const used =
    insets.top +
    topH +
    gapTop +
    displayH +
    gapDisplay +
    axisH +
    gapAxis +
    cardH * 2 +
    cardGap +
    padBottom;

  return {
    W,
    H,
    insets,
    margin,
    topH,
    gapTop,
    displayH,
    gapDisplay,
    chartH: Math.max(160, H - used),
    axisH,
    gapAxis,
    card: { h: cardH, gap: cardGap, radius: 22 },
    padBottom,
  };
}
