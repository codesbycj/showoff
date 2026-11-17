import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for skyplan, derived from the live window (I2).
 *
 * The saved-trips rail is the remainder: the header, the search card and the
 * tab bar are sized, and whatever is left goes to the rail. That is what keeps
 * the foot closed (I3) — the rail's cards grow rather than a spacer appearing
 * under them.
 *
 * **The tab bar is not padded by `insets.bottom`.** It is a full-width bar
 * that stops at the frame, and the system already reserves the strip below it
 * (R1b).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 56;
  const gapHeader = 16;

  const fieldH = 62;
  const optionH = 62;
  const ctaH = 56;
  const cardPad = 16;
  const cardH = fieldH * 2 + optionH + ctaH + cardPad * 2 + 10;

  const gapCard = 22;
  const sectionH = 30;
  const gapSection = 12;

  const barH = 62;
  const railW = Math.round(W * 0.82);

  const used = insets.top + headerH + gapHeader + cardH + gapCard + sectionH + gapSection;
  const available = Math.max(170, H - used - barH - 10);
  /**
   * The ticket is capped and the slack goes to the rhythm above it, not into
   * the card. Stretched to the full remainder the stub carried two 30dp holes
   * either side of its chips — R1c: a hole inside a card is still a hole.
   */
  const railH = Math.min(262, available);
  const slack = available - railH;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    card: { h: cardH, radius: 24, pad: cardPad, fieldH, optionH, ctaH },
    gapCard: gapCard + Math.round(slack * 0.6),
    sectionH,
    gapSection: gapSection + Math.round(slack * 0.4),
    /** 26, not 12: the ticket notches overhang 9dp a side and touched. */
    rail: { w: railW, h: railH, radius: 20, gap: 26 },
    bar: { h: barH },
  };
}
