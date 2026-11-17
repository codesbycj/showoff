import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for vitalcycle, derived from the live window (I2).
 *
 * **The day strip is the remainder.** The board's own column heights are what
 * give the screen its rhythm, and a taller strip is a better one — so
 * everything else is sized and the strip takes what is left, which means the
 * foot cannot open a band (I3) and no spacer is ever needed.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const backH = 40;
  const gapBack = 14;
  const headlineH = 37 * 2;
  const gapHeadline = 16;
  const tabsH = 34;
  const gapTabs = 18;

  const gapStrip = 18;
  const chipsH = 76;
  const gapChips = 18;
  const logH = 27;
  const gapLog = 10;
  const promoH = 134;
  const gapPromo = 12;
  const notesH = 74;
  const footer = Math.max(insets.bottom, 14);

  const below = gapStrip + chipsH + gapChips + logH + gapLog + promoH + gapPromo + notesH + footer;
  const stripH = Math.max(96, H - insets.top - backH - gapBack - headlineH - gapHeadline - tabsH - gapTabs - below);

  return {
    W,
    H,
    insets,
    margin,
    backH,
    gapBack,
    headlineH,
    gapHeadline,
    tabsH,
    gapTabs,
    strip: { h: stripH, disc: 44, gap: 6 },
    gapStrip,
    chips: { h: chipsH, rowH: 32, gap: 8 },
    gapChips,
    logH,
    gapLog,
    promo: { h: promoH, radius: 18, cta: 44 },
    gapPromo,
    notes: { h: notesH, radius: 14, gap: 12 },
    footer,
  };
}
