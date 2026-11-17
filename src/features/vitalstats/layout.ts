import { useWindowDimensions } from 'react-native';

import { ATHLETE_ROWS } from './data/stats';
import { useInsets } from './use-insets';

/**
 * Every size for vitalstats, derived from the live window (I2).
 *
 * **The leaderboard is the remainder.** It is the block that genuinely
 * continues on this screen, so it takes the slack in whole rows — nothing is
 * clipped through its own text (R2) and the foot cannot open a band (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const backH = 40;
  const gapBack = 6;
  const kickerH = 20;
  const gapKicker = 6;
  const headlineH = 37 * 2;
  const gapHeadline = 18;
  const tabsH = 46;
  const gapTabs = 16;
  const footer = Math.max(insets.bottom, 14);

  const boardTop =
    insets.top + backH + gapBack + kickerH + gapKicker + headlineH + gapHeadline + tabsH + gapTabs;

  const stripH = 52;
  const boardH = Math.max(ATHLETE_ROWS * 76 + stripH, H - boardTop - footer);
  /** The leader's card carries the strip, so it is one row taller than the rest. */
  const rowH = (boardH - stripH - 10 * (ATHLETE_ROWS - 1)) / ATHLETE_ROWS;

  return {
    W,
    H,
    insets,
    margin,
    backH,
    gapBack,
    kickerH,
    gapKicker,
    headlineH,
    gapHeadline,
    tabsH,
    gapTabs,
    board: { h: boardH, rowH, stripH, radius: 16, avatar: 38 },
    footer,
  };
}
