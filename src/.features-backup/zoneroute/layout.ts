import { useWindowDimensions } from 'react-native';

import { steps } from './data/route';
import { useInsets } from './use-insets';

/**
 * Every size for zoneroute, derived from the live window (I2).
 *
 * **The map is the remainder.** A tracking screen is its map, so the sheet is
 * sized from its own rows and the map takes everything above it — which means
 * the foot cannot open a band (I3) and no spacer is ever needed.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const etaH = 56;
  const riderH = 60;
  const stepH = 30;
  const sheetPad = 14;
  const footer = Math.max(insets.bottom, 14);
  const sheetH = sheetPad + etaH + riderH + 8 + stepH * steps.length + footer;

  return {
    W,
    H,
    insets,
    margin,
    control: 38,
    /**
     * The map stops just under the sheet's rounded top rather than running the
     * full height. At full height its lowest street label sat *behind* the
     * sheet, which R3 calls a FAIL outright — covering text — and `audit.js`
     * reported it as one.
     */
    map: { h: H - sheetH + 44 },
    sheet: { h: sheetH, radius: 26, etaH, riderH, stepH },
    footer,
  };
}
