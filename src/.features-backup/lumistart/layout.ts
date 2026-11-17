import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for lumistart, derived from the live window (I2).
 *
 * **The card stage is the remainder, and the card fills it.** The first pass
 * made the stage the remainder but left the card at a fixed 290dp, so a tall
 * stage put 94dp of empty mint between the mark and the artwork — `audit.js`
 * `GAP`, a FAIL, and exactly the hole R1 exists to catch.
 *
 * The fix is the one I3 names: scale the hero up, never spread the blocks out.
 * The card's width is derived from the stage's height, capped at what the page
 * margin allows, so the artwork grows with the screen instead of floating in
 * the middle of it.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 24;

  const logoH = 64;
  const gapLogo = 24;

  const headlineH = 50 * 3;
  const gapHeadline = 24;
  const bodyH = 23 * 2;
  const gapBody = 40;
  const ctaH = 58;
  const gapCta = 26;
  const asideH = 22;
  const footer = Math.max(insets.bottom, 16) + 14;

  const below = headlineH + gapHeadline + bodyH + gapBody + ctaH + gapCta + asideH + footer;
  const stageH = Math.max(210, H - insets.top - logoH - gapLogo - below);

  /**
   * The deck fills the stage. The card keeps a credit card's own 1.586 ratio;
   * the second card sits below and right of it, so the deck's own box is the
   * card plus that offset, and the whole thing is sized from the stage.
   */
  const offset = 22;
  const maxW = W - margin * 2 - offset;
  const cardH = Math.min(Math.round((stageH - offset) * 0.86), Math.round(maxW / 1.586));
  const cardW = Math.round(cardH * 1.586);

  return {
    W,
    H,
    insets,
    margin,
    logoH,
    gapLogo,
    stage: { h: stageH, cardW, cardH, offset, radius: 16, tilt: -9 },
    headlineH,
    gapHeadline,
    bodyH,
    gapBody,
    cta: { h: ctaH, radius: ctaH / 2 },
    gapCta,
    asideH,
    footer,
  };
}
