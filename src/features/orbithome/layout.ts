import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for orbithome, derived from the live window (I2).
 *
 * The transaction list is the remainder and its content is taller than that,
 * so it runs under the floating dock exactly as the board crops it — which is
 * what keeps the foot closed (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const greetH = 52;
  const gapGreet = 18;

  const balanceH = 86;
  const gapBalance = 20;

  const actionH = 86;
  const washPad = 18;
  const washH = insets.top + greetH + gapGreet + balanceH + gapBalance + actionH + washPad;

  const sectionH = 30;
  const gapSection = 10;

  const contactW = 60;
  const contactH = 86;
  const gapContacts = 16;

  const promoW = Math.round(W * 0.72);
  const promoH = 78;
  const gapPromo = 18;

  const rowH = 66;
  const rowGap = 6;

  const dockH = 62;
  const dockBottom = insets.bottom + 8;

  return {
    W,
    H,
    insets,
    margin,
    greetH,
    gapGreet,
    balanceH,
    gapBalance,
    actionH,
    wash: { h: washH, radius: 30 },
    sectionH,
    gapSection,
    contact: { w: contactW, h: contactH },
    gapContacts,
    promo: { w: promoW, h: promoH, radius: 18 },
    gapPromo,
    row: { h: rowH, gap: rowGap, radius: 16 },
    dock: { h: dockH, bottom: dockBottom, radius: 31 },
  };
}
