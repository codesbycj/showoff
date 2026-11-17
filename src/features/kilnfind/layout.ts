import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for kilnfind, derived from the live window (I2).
 *
 * **The grid is the remainder and runs under the dock**, exactly as the board
 * crops it - which is what keeps the foot closed without a spacer (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 0;
  const searchH = 56;
  /** A pinned, full-width bar is its own height and nothing more (I11). */
  const dockH = 64;

  const cellW = W / 2;

  return {
    W,
    H,
    insets,
    margin,
    search: { h: searchH },
    resultHeaderH: 34,
    /* The cell is sized so three rows of caption clear the dock. The board
       crops its grid under the bar, but what it crops is PHOTOGRAPH - at 0.86
       the third row's price sat under the dock, and covering text is a FAIL
       (R3). The result header above the grid costs 34dp, so the image comes
       down again by the same amount spread over three rows. */
    cell: { w: cellW, imageH: cellW * 0.73, textH: 60 },
    dock: { h: dockH },
  };
}
