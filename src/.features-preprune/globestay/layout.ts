import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for globestay, derived from the live window (I2).
 *
 * **The hero photograph is the remainder.** A stay page's picture is the one
 * block that genuinely wants the slack — a bigger photograph is a better stay
 * page — so everything below it is sized and the hero takes what is left.
 * That is why the foot cannot open a band (I3) and no spacer is ever needed.
 *
 * The sheet laps over the hero's lower edge by its own radius, which is what
 * the board draws; it crosses the photograph's *edge*, never any text (R3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const sheetRadius = 26;
  const sheetTop = 18;
  const titleH = 52;
  const gapTitle = 14;
  const chipsH = 36;
  const gapChips = 18;
  const overviewH = 22;
  const gapOverview = 6;
  const aboutH = 19 * 3;
  const gapAbout = 16;
  const railH = 92;
  const gapRail = 18;
  const actionsH = 52;
  const totalH = 22;
  const footer = Math.max(insets.bottom, 14);

  const sheetH =
    sheetTop +
    titleH +
    gapTitle +
    chipsH +
    gapChips +
    overviewH +
    gapOverview +
    aboutH +
    gapAbout +
    railH +
    gapRail +
    totalH +
    10 +
    actionsH +
    footer;

  const heroH = Math.max(240, H - sheetH + sheetRadius);

  return {
    W,
    H,
    insets,
    margin,
    hero: { h: heroH, control: 38 },
    sheet: { h: sheetH, radius: sheetRadius, top: sheetTop },
    titleH,
    gapTitle,
    chipsH,
    gapChips,
    overviewH,
    gapOverview,
    aboutH,
    gapAbout,
    rail: { h: railH, w: 128, radius: 14 },
    gapRail,
    actions: { h: actionsH, radius: 26 },
    footer,
  };
}
