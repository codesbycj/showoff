import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for skyticket, derived from the live window (I2).
 *
 * **The passenger card is the remainder.** The flight card, the barcode and
 * the action are sized, and the passengers take what is left — so the screen
 * ends on its button with no band under it (I3) and no hole in the middle
 * (R1c).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 16;

  const flightH = 206;
  const gapCard = 16;

  const barcodeH = 104;
  const ctaH = 58;
  const gapCta = 18;
  const footer = insets.bottom + 10;

  const used =
    insets.top + headerH + gapHeader + flightH + gapCard + gapCta + ctaH + footer + barcodeH;
  const passengersH = Math.max(176, H - used);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    flight: { h: flightH, radius: 22 },
    gapCard,
    passengers: { h: passengersH, radius: 22 },
    barcode: { h: barcodeH },
    cta: { h: ctaH },
    gapCta,
    footer,
  };
}
