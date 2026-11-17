import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for vaultadvisor, derived from the live window (I2).
 *
 * **The portrait is the remainder.** Everything under it is budgeted and the
 * photograph takes the rest, so the screen is full to the bottom edge with no
 * band under it (I3) and the portrait grows with the device instead of the gap
 * doing it.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const topH = 48;
  const gapTop = 16;
  const gapPortrait = 26;
  const nameH = 52;
  const roleH = 24;
  const placeH = 24;
  const gapPlace = 24;
  const credH = 60;
  const gapCred = 22;
  const ruleH = 1;
  const gapRule = 20;
  const trustH = 52;
  const padBottom = 22;

  const used =
    insets.top +
    topH +
    gapTop +
    gapPortrait +
    nameH +
    roleH +
    placeH +
    gapPlace +
    credH +
    gapCred +
    ruleH +
    gapRule +
    trustH +
    padBottom;

  return {
    W,
    H,
    insets,
    margin,
    topH,
    gapTop,
    portrait: { h: Math.max(220, H - used), radius: 18 },
    gapPortrait,
    nameH,
    roleH,
    placeH,
    gapPlace,
    credH,
    gapCred,
    ruleH,
    gapRule,
    trustH,
    padBottom,
  };
}
