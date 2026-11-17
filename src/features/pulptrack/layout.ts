import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for pulptrack, derived from the live window (I2).
 *
 * **The map is the remainder.** The sheet is budgeted from its own contents
 * and the map takes the rest, so the screen ends on the sheet's bottom edge
 * with no band under it (I3).
 *
 * The sheet is pinned flush to the foot and **does not reserve the
 * indicator's strip**: when the app is not edge-to-edge the system already
 * holds that space, and adding `insets.bottom` here counts it twice (I11).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const padTop = 14;
  const grabberH = 4;
  const gapGrabber = 18;
  const titleH = 28;
  const gapTitle = 22;
  const railH = 62;
  const gapRail = 20;
  const rowH = 56;
  const padBottom = 22;

  const sheetH =
    padTop + grabberH + gapGrabber + titleH + gapTitle + railH + gapRail + rowH + padBottom;

  return {
    W,
    H,
    insets,
    margin,
    map: { h: Math.max(300, H - sheetH) },
    sheet: {
      h: sheetH,
      radius: 26,
      padTop,
      grabberH,
      gapGrabber,
      titleH,
      gapTitle,
      railH,
      disc: 40,
      gapRail,
      rowH,
      padBottom,
    },
  };
}
