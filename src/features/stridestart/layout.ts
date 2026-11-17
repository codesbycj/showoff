import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for stridestart, derived from the live window (I2).
 *
 * **The map is the remainder.** The sheet below it is sized and the map takes
 * what is left, so the controls always sit on the foot (I3) and the sheet can
 * never run off the bottom of the frame.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const handleH = 22;
  const modeH = 86;
  const gapRow = 12;
  const optionH = 60;
  const controlsH = 118;
  const footer = insets.bottom + 6;

  const sheetH = handleH + modeH + gapRow + optionH + controlsH + footer + 10;
  const mapH = Math.max(260, H - sheetH + 26);

  return {
    W,
    H,
    insets,
    margin,
    map: { h: mapH },
    sheet: { h: sheetH, radius: 28 },
    handleH,
    mode: { h: modeH, radius: 18 },
    gapRow,
    option: { h: optionH, radius: 16 },
    controlsH,
    footer,
  };
}
