import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for hushshare, derived from the live window (I2).
 *
 * **The artwork is the remainder.** Everything around it is budgeted and the
 * contours take the rest, so the screen is full to the bottom edge with no
 * band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const topH = 48;
  const gapTop = 18;
  const titleH = 40;
  const gapTitle = 10;
  const labelH = 46;
  const gapLabel = 26;
  const linkH = 52;
  const gapLink = 18;
  const targetH = 88;
  const padBottom = 26;

  const used =
    insets.top +
    topH +
    gapTop +
    titleH +
    gapTitle +
    labelH +
    gapLabel +
    linkH +
    gapLink +
    targetH +
    padBottom;

  return {
    W,
    H,
    insets,
    margin,
    topH,
    gapTop,
    titleH,
    gapTitle,
    waveH: Math.max(220, H - used),
    labelH,
    gapLabel,
    link: { h: linkH, radius: 18 },
    gapLink,
    target: { h: targetH, tile: 62 },
    padBottom,
  };
}
