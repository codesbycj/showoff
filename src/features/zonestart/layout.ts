import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for zonestart, derived from the live window (I2).
 *
 * **The burger is the remainder.** A splash screen's hero is the one block
 * that genuinely wants the slack — a bigger burger is a better splash — so
 * everything else is sized and the photograph takes what is left. That is why
 * the foot cannot open a band (I3) and no spacer is ever needed.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;

  const bannerH = 36;
  const gapBanner = 14;
  const headlineH = 44 * 2;
  const gapHeadline = 10;

  const actionH = 54;
  const gapActions = 12;
  const gapHero = 10;
  /**
   * Two lines, which is what the trimmed legal line actually wraps to. Sizing
   * it for three left 36dp of dead canvas at the foot — `foot.py` catches that
   * and R1 fails it, and the fix is the real height, not a taller hero.
   */
  const legalH = 15 * 2;
  const gapLegal = 12;
  const footer = Math.max(insets.bottom, 14);

  const below = actionH * 2 + gapActions + gapLegal + legalH + footer;
  const heroH = Math.max(
    200,
    H - insets.top - bannerH - gapBanner - headlineH - gapHeadline - gapHero - below,
  );

  return {
    W,
    H,
    insets,
    margin,
    bannerH,
    gapBanner,
    headlineH,
    gapHeadline,
    hero: { h: heroH },
    gapHero,
    action: { h: actionH, radius: actionH / 2 },
    gapActions,
    legalH,
    gapLegal,
    footer,
  };
}
