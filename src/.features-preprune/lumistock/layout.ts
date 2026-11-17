import { useWindowDimensions } from 'react-native';

import { stats } from './data/stock';
import { useInsets } from './use-insets';

/**
 * Every size for lumistock, derived from the live window (I2).
 *
 * **The chart is the remainder.** A price chart is the one block on this screen
 * that genuinely wants the slack — a taller plot is a better chart — so
 * everything else is sized and the chart takes what is left. That is why the
 * foot cannot open a band (I3) and no spacer is ever needed.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 44;
  const gapHeader = 14;
  const idH = 54;
  const gapId = 14;
  const priceH = 37;
  const moveH = 18;
  const gapPrice = 14;
  const blurbH = 22 * 2;
  const gapBlurb = 14;

  const gapChart = 18;
  const statsTitleH = 21;
  const gapStatsTitle = 6;
  const statRowH = 34;
  const statsH = statRowH * stats().length;
  const gapStats = 14;
  const ctaH = 54;
  const footer = Math.max(insets.bottom, 14);

  const above =
    insets.top + headerH + gapHeader + idH + gapId + priceH + moveH + gapPrice + blurbH + gapBlurb;
  const below = gapChart + statsTitleH + gapStatsTitle + statsH + gapStats + ctaH + footer;
  const chartH = Math.max(170, H - above - below);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    control: 38,
    id: { h: idH, mark: 46 },
    gapId,
    priceH,
    moveH,
    gapPrice,
    blurbH,
    gapBlurb,
    chart: { h: chartH, axisH: 18, calloutH: 28 },
    gapChart,
    statsTitleH,
    gapStatsTitle,
    stats: { h: statsH, rowH: statRowH },
    gapStats,
    cta: { h: ctaH, radius: ctaH / 2 },
    footer,
  };
}
