import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for kovacal, derived from the live window (I2).
 *
 * The job card is the remainder and runs under the floating dock exactly as
 * the board crops it, which is what keeps the foot closed (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 14;

  const titleH = 42;
  const gapTitle = 14;

  const rangeH = 52;
  const gapRange = 12;

  const modeH = 52;
  const gapMode = 16;

  const stripH = 86;
  const gapStrip = 18;

  const optionH = 64;
  const optionsH = 44 + optionH * 3;
  const gapOptions = 16;

  const dockH = 66;
  const dockBottom = insets.bottom + 6;

  const used =
    insets.top +
    headerH +
    gapHeader +
    titleH +
    gapTitle +
    rangeH +
    gapRange +
    modeH +
    gapMode +
    stripH +
    gapStrip +
    optionsH +
    gapOptions +
    dockH +
    dockBottom;
  const jobH = Math.max(90, H - used + 46);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    titleH,
    gapTitle,
    rangeH,
    gapRange,
    mode: { h: modeH, radius: 25 },
    gapMode,
    stripH,
    gapStrip,
    options: { h: optionsH, rowH: optionH, radius: 20 },
    gapOptions,
    job: { h: jobH, radius: 20 },
    dock: { h: dockH, bottom: dockBottom },
  };
}
