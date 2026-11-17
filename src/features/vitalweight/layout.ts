import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for vitalweight, derived from the live window (I2).
 *
 * **The chart is the remainder.** A weight chart is the one block on this
 * screen that genuinely wants the slack — a taller plot is a better chart — so
 * everything below it is sized and the chart takes what is left. That is why
 * the foot cannot open a band (I3) and no spacer is ever needed.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;
  const gutter = 12;

  const backH = 40;
  const gapBack = 10;

  const gapChart = 18;
  const titleH = 27;
  const gapTitle = 14;
  const statsH = 172;
  const gapStats = 18;
  const predictTitleH = 27;
  const gapPredict = 12;
  const predictH = 102;
  const footer = Math.max(insets.bottom, 14);

  const below =
    gapChart +
    titleH +
    gapTitle +
    statsH +
    gapStats +
    predictTitleH +
    gapPredict +
    predictH +
    footer;
  const chartH = Math.max(150, H - insets.top - backH - gapBack - below);

  return {
    W,
    H,
    insets,
    margin,
    gutter,
    backH,
    gapBack,
    chart: { h: chartH, axisH: 18 },
    gapChart,
    titleH,
    gapTitle,
    stats: { h: statsH, radius: 16 },
    gapStats,
    predictTitleH,
    gapPredict,
    predict: { h: predictH, radius: 18 },
    footer,
  };
}
