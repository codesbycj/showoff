import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for vitalday, derived from the live window (I2).
 *
 * **The month chart is the remainder.** A bar chart is the one block on this
 * screen that genuinely wants the slack — taller bars are a better chart — so
 * everything below it is sized and the chart takes what is left. That is why
 * the foot cannot open a band (I3) and no spacer is ever needed.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const barH = 44;
  const gapBar = 16;
  const ringsH = 56;
  const gapRings = 20;
  const headlineH = 37 * 2;
  const gapHeadline = 18;

  const gapChart = 18;
  const followTitleH = 27;
  const gapFollowTitle = 12;
  const tilesH = 104;
  const footer = Math.max(insets.bottom, 14);

  const below = gapChart + followTitleH + gapFollowTitle + tilesH + footer;
  const chartH = Math.max(
    140,
    H - insets.top - barH - gapBar - ringsH - gapRings - headlineH - gapHeadline - below,
  );

  return {
    W,
    H,
    insets,
    margin,
    bar: { h: barH, avatar: 36 },
    gapBar,
    rings: { h: ringsH, size: 34 },
    gapRings,
    headlineH,
    gapHeadline,
    chart: { h: chartH, axisH: 18 },
    gapChart,
    followTitleH,
    gapFollowTitle,
    tiles: { h: tilesH, radius: 16, gap: 10 },
    footer,
  };
}
