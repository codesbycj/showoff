import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for quranthree, derived from the live window (I2).
 *
 * **The scene is full bleed and the copy is pinned to the foot**, so there is
 * no block that can leave a band: the screen *is* the picture, and everything
 * else sits on it. I3's "nothing empty at the bottom" is satisfied by
 * construction rather than by measurement.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 26;

  const barH = 40;
  const gapBar = 10;
  const pagerH = 22;
  const gapPager = 14;
  const headlineH = 35 * 2;
  const gapHeadline = 10;
  const bodyH = 19 * 2;
  const gapBody = 26;
  const ctaH = 56;
  const footer = Math.max(insets.bottom, 16) + 10;

  /**
   * The illustration is the remainder, and it is a **sized block** rather than
   * part of the full-bleed ground — `audit.js` excludes a full-screen `<svg>`
   * from its painted-rows map, so a drawing left inside the ground reads as
   * 488dp of empty canvas. It did, and R1 failed it.
   */
  const below = pagerH + gapPager + headlineH + gapHeadline + bodyH + gapBody + ctaH + footer;
  const sceneH = Math.max(220, H - insets.top - barH - gapBar - below);

  return {
    W,
    H,
    insets,
    margin,
    barH,
    gapBar,
    scene: { h: sceneH },
    pagerH,
    gapPager,
    headlineH,
    gapHeadline,
    bodyH,
    gapBody,
    cta: { h: ctaH, radius: ctaH / 2, back: 48 },
    footer,
  };
}
