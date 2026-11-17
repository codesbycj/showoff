import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for sonicexplore, derived from the live window (I2).
 *
 * **The genre grid is the remainder.** It is the block that genuinely
 * continues on this screen, so it takes the slack in whole rows — nothing is
 * clipped through its own text (R2) and the foot cannot open a band (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;
  const gutter = 12;

  const searchH = 46;
  const gapSearch = 20;
  const exploreH = 24;
  const gapExplore = 12;
  const railH = 172;
  const gapRail = 22;
  const moodsH = 24;
  const gapMoods = 12;

  const dockW = Math.round(W * 0.84);
  const dockH = 54;
  const dockLift = 12;

  const gridTop =
    insets.top + searchH + gapSearch + exploreH + gapExplore + railH + gapRail + moodsH + gapMoods;
  const dockSpace = dockH + dockLift + insets.bottom + 10;
  const gridH = Math.max(180, H - gridTop - dockSpace);
  /** Three rows of two, so the row height follows from the space. */
  const rowH = (gridH - gutter * 2) / 3;

  return {
    W,
    H,
    insets,
    margin,
    gutter,
    searchH,
    gapSearch,
    exploreH,
    gapExplore,
    rail: { h: railH, w: Math.round(W * 0.38), radius: 14 },
    gapRail,
    moodsH,
    gapMoods,
    grid: { h: gridH, rowH, radius: 14, art: Math.min(rowH - 16, 46) },
    dock: { w: dockW, h: dockH, lift: dockLift, item: 38 },
  };
}
