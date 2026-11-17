import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for ferntrip, derived from the live window (I2) — no fixed
 * offsets copied off one device, and nothing divided by the board's scale.
 *
 * **The summit is the remainder.** The sheet under it is budgeted block by
 * block from the foot up, and the photograph takes whatever is left, so the
 * stay card always lands on the foot with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  /**
   * How far the sheet's dome rises into the photograph. It is drawn inside the
   * hero, across its own bottom edge, so it costs the column nothing — the
   * clearance under it is `gapDome`.
   */
  const dome = 26;
  const gapDome = 20;

  const countryH = 20;
  const gapCountry = 10;
  const titleH = 124;
  const gapTitle = 18;
  const chipH = 46;
  const gapChips = 16;
  const stayH = 156;
  const footer = insets.bottom + 8;

  const sheetH =
    gapDome + countryH + gapCountry + titleH + gapTitle + chipH + gapChips + stayH + footer;
  const heroH = Math.max(300, H - sheetH);

  return {
    W,
    H,
    insets,
    margin,
    hero: { h: heroH, dome, disc: 46 },
    sheet: { h: sheetH },
    gapDome,
    countryH,
    gapCountry,
    titleH,
    gapTitle,
    chip: { h: chipH, radius: 23 },
    gapChips,
    stay: { h: stayH, radius: 26, thumb: 124, thumbRadius: 24 },
    footer,
  };
}
