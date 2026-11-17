import { useWindowDimensions } from 'react-native';

import { TREND_ROWS } from './data/programs';
import { useInsets } from './use-insets';

/**
 * Every size for vitalprog, derived from the live window (I2).
 *
 * **The trending list is the remainder.** It is the block that genuinely
 * continues on this screen, so it takes the slack in whole rows — nothing is
 * clipped through its own text (R2) and the foot cannot open a band (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const backH = 40;
  const gapBack = 10;
  const calorieH = 72;
  const gapCalorie = 20;
  const programsH = 27;
  const gapPrograms = 12;
  const bannerH = 92;
  const gapBanner = 20;
  const trendingH = 27;
  const gapTrending = 12;
  const footer = Math.max(insets.bottom, 14);

  const listTop =
    insets.top +
    backH +
    gapBack +
    calorieH +
    gapCalorie +
    programsH +
    gapPrograms +
    bannerH +
    gapBanner +
    trendingH +
    gapTrending;

  const listH = Math.max(TREND_ROWS * 72, H - listTop - footer);
  const rowH = (listH - 10 * (TREND_ROWS - 1)) / TREND_ROWS;

  return {
    W,
    H,
    insets,
    margin,
    backH,
    gapBack,
    calorie: { h: calorieH, radius: 18, sparkW: 64 },
    gapCalorie,
    programsH,
    gapPrograms,
    banner: { h: bannerH, radius: 18 },
    gapBanner,
    trendingH,
    gapTrending,
    list: { h: listH, rowH, radius: 16 },
    footer,
  };
}
