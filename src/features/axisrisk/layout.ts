import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for axisrisk, derived from the live window (I2).
 *
 * Everything is budgeted and the slack lands above the assessor card, which
 * grows into it, so the screen is full to the bottom edge with no band under
 * it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const topH = 48;
  const gapTop = 20;
  const gapDisplay = 22;
  const scoreH = 136;
  const gapScore = 16;
  const gapFacts = 26;
  const sectionH = 30;
  const gapSection = 14;
  const assessorRow = 76;
  const padBottom = 20;
  /** The title wraps to two lines at 28/36, plus its own leading. */
  const displayH = 80;

  const used =
    insets.top +
    topH +
    gapTop +
    displayH +
    gapDisplay +
    scoreH +
    gapScore +
    gapFacts +
    sectionH +
    gapSection +
    assessorRow * 2 +
    12 +
    padBottom;

  return {
    W,
    H,
    insets,
    factH: Math.max(140, H - used),
    margin,
    topH: 48,
    gapTop: 20,
    gapDisplay: 22,
    score: { w: W - margin * 2, h: 136, radius: 22 },
    gapScore: 16,
    gapFacts: 26,
    sectionH: 30,
    gapSection: 14,
    assessor: { rowH: 76, radius: 22 },
    padBottom: 20,
  };
}
