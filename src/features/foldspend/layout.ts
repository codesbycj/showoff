import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for foldspend, derived from the live window (I2).
 *
 * **The transfer list is the remainder and it runs under the bottom edge**,
 * which is how the board ends: a row crossing the frame, never a band of empty
 * canvas (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const topH = 48;
  const gapTop = 18;
  const totalLabelH = 18;
  const totalH = 44;
  const gapTotal = 22;
  const chartH = 224;
  const gapChart = 20;
  const flowH = 78;
  const gapFlow = 24;
  const sectionH = 28;
  const gapSection = 14;
  const catH = 118;
  const gapCats = 22;

  const used =
    insets.top +
    topH +
    gapTop +
    totalLabelH +
    totalH +
    gapTotal +
    chartH +
    gapChart +
    flowH +
    gapFlow +
    sectionH +
    gapSection +
    catH +
    gapCats +
    sectionH +
    gapSection;

  return {
    W,
    H,
    insets,
    margin,
    topH,
    gapTop,
    totalLabelH,
    totalH,
    gapTotal,
    chart: { w: W - margin * 2, h: chartH },
    gapChart,
    flow: { w: (W - margin * 2 - 12) / 2, h: flowH, gap: 12 },
    gapFlow,
    sectionH,
    gapSection,
    cat: { w: 132, h: catH, gap: 12 },
    gapCats,
    list: { h: Math.max(140, H - used), rowH: 68, gap: 10 },
  };
}
