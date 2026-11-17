import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for slurpdish, derived from the live window (I2).
 *
 * **The hero is the remainder.** The sheet below it is budgeted from its own
 * contents and the dark region takes the rest, so the screen always ends on
 * the pinned bar with no band under it (I3).
 *
 * The bar is pinned flush to the foot and **does not reserve the indicator's
 * strip**: when the app is not edge-to-edge the system already holds that
 * space, and adding `insets.bottom` here counts it twice (I11).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const topH = 46;
  const sizeH = 84;

  const domeH = 30;
  const sheetTitleH = 26;
  const gapTitle = 8;
  const bodyH = 40;
  const gapBody = 14;
  const chipH = 32;
  const gapChips = 18;
  const sectionH = 22;
  const gapSection = 10;
  const extraH = 44;
  const gapExtras = 14;
  const barH = 62;
  const padBottom = 14;

  const sheetH =
    domeH +
    sheetTitleH +
    gapTitle +
    bodyH +
    gapBody +
    chipH +
    gapChips +
    sectionH +
    gapSection +
    extraH +
    gapExtras +
    barH +
    padBottom;

  return {
    W,
    H,
    insets,
    margin,
    topH,
    hero: { h: Math.max(240, H - insets.top - topH - sizeH - sheetH) },
    size: { h: sizeH, disc: 50 },
    sheet: {
      h: sheetH,
      domeH,
      titleH: sheetTitleH,
      gapTitle,
      bodyH,
      gapBody,
      chipH,
      gapChips,
      sectionH,
      gapSection,
      extraH,
      gapExtras,
      barH,
      padBottom,
      radius: 26,
    },
  };
}
