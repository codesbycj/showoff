import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for orbitsend, derived from the live window (I2).
 *
 * **The keypad is the remainder.** Every block above it is sized and the keys
 * take what is left, so the slide control always sits on the foot with no band
 * under it (I3) and the keypad never collides with the amount above it (R3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 18;

  const railH = 66;
  const gapRail = 18;

  const recipientH = 72;
  const gapRecipient = 20;

  const amountH = 118;
  const gapAmount = 10;
  const balanceH = 24;
  const gapBalance = 16;

  const ctaH = 62;
  const gapCta = 14;
  const footer = insets.bottom + 8;

  const used =
    insets.top +
    headerH +
    gapHeader +
    railH +
    gapRail +
    recipientH +
    gapRecipient +
    amountH +
    gapAmount +
    balanceH +
    gapBalance +
    gapCta +
    ctaH +
    footer;

  const keypadH = Math.max(220, H - used);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    railH,
    gapRail,
    recipient: { h: recipientH, radius: 36 },
    gapRecipient,
    amount: { h: amountH, radius: 22 },
    gapAmount,
    balanceH,
    gapBalance,
    keypad: { h: keypadH, gap: 10 },
    gapCta,
    cta: { h: ctaH },
    footer,
  };
}
