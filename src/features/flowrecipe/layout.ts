import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for flowrecipe, derived from the live window (I2).
 *
 * **The photograph is the remainder.** The sheet under it is sized and the
 * image takes what is left, so the action always sits on the foot with no band
 * under it (I3) and the rows above can never run beneath it (R3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;
  const control = 44;

  const handleH = 20;
  const slotH = 18;
  const titleH = 42;
  const factsH = 22;
  const gapFacts = 14;

  const ringsH = 68;
  const gapRings = 14;

  const tipH = 66;
  const gapTip = 14;

  const tabsH = 42;
  const gapTabs = 6;

  const itemH = 42;
  const itemsH = itemH * 4;
  const gapItems = 12;

  const ctaH = 56;
  const footer = insets.bottom + 10;

  const sheetH =
    handleH +
    slotH +
    titleH +
    factsH +
    gapFacts +
    ringsH +
    gapRings +
    tipH +
    gapTip +
    tabsH +
    gapTabs +
    itemsH +
    gapItems +
    ctaH +
    footer;
  const heroH = Math.max(200, H - sheetH + 26);

  return {
    W,
    H,
    insets,
    margin,
    control,
    hero: { h: heroH },
    sheet: { h: sheetH, radius: 30 },
    handleH,
    slotH,
    titleH,
    factsH,
    gapFacts,
    ringsH,
    gapRings,
    tip: { h: tipH, radius: 16 },
    gapTip,
    tabsH,
    gapTabs,
    item: { h: itemH },
    gapItems,
    cta: { h: ctaH },
    footer,
  };
}
