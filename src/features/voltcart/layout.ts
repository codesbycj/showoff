import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for voltcart, derived from the live window (I2).
 *
 * The line list takes the remainder, and the summary and the action sit above
 * the tab bar — so the screen always ends on its button and the foot cannot
 * open a band (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const headerH = 52;
  const gapHeader = 12;

  const addressH = 52;
  const gapAddress = 14;

  const selectH = 44;
  const lineH = 96;
  const lineGap = 10;

  const summaryH = 72;
  const ctaH = 56;
  const gapCta = 12;

  const barH = 64;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    address: { h: addressH, radius: 16 },
    gapAddress,
    selectH,
    line: { h: lineH, gap: lineGap, radius: 18 },
    summary: { h: summaryH },
    cta: { h: ctaH },
    gapCta,
    bar: { h: barH },
  };
}
