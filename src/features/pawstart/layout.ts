import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for pawstart, derived from the live window (I2) — no fixed
 * offsets copied off one device, and nothing divided by the board's scale.
 *
 * **The photograph is the remainder.** The copy panel under it is budgeted
 * block by block and the image takes what is left, so the screen always ends
 * on its button with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 26;

  const dotsH = 18;
  const gapDots = 20;
  const displayH = 78;
  const gapDisplay = 12;
  const bodyH = 44;
  const gapBody = 20;
  const benefitH = 30;
  const gapBenefits = 20;
  const ctaH = 58;
  const signinH = 48;
  /**
   * **The foot does not reserve the indicator's strip.** When the app is not
   * edge-to-edge the system already holds that space, and padding a pinned
   * surface by `insets.bottom` on top of it counts the strip twice - the
   * defect that put an empty band under four screens of a deleted batch
   * (R1b / I3 / I11).
   */
  const footer = 18;

  const panelH =
    gapDots +
    dotsH +
    gapDots +
    displayH +
    gapDisplay +
    bodyH +
    gapBody +
    benefitH +
    gapBenefits +
    ctaH +
    signinH +
    footer;
  const heroH = Math.max(300, H - panelH);

  return {
    W,
    H,
    insets,
    margin,
    hero: { h: heroH, radius: 30 },
    panel: { h: panelH },
    dotsH,
    gapDots,
    displayH,
    gapDisplay,
    bodyH,
    signinH,
    benefitH,
    gapBenefits,
    gapBody,
    cta: { h: ctaH },
    footer,
  };
}
