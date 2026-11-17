import { useWindowDimensions } from 'react-native';

import { route } from './data/confirm';
import { useInsets } from './use-insets';

/**
 * Every size for crypinconfirm, derived from the live window (I2).
 *
 * **The route timeline is the remainder.** The reference leaves roughly a third
 * of this screen empty between its detail rows and its slide bar; I3's lever
 * for that is the section the board cut, not a spacer. A timeline is the right
 * block to hand the slack to, because its steps genuinely breathe — so the
 * screen cannot leave a band at the foot by construction.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 44;
  const gapHeader = 18;

  const badge = 54;
  const gapBadge = 12;
  const pairH = 30;
  const gapPair = 20;

  const legRowH = 56;
  const legsH = legRowH * 2 + 1;
  const gapLegs = 12;

  const detailRowH = 38;
  const detailPad = 10;
  const detailsH = detailRowH * 4 + detailPad * 2;
  const gapDetails = 16;

  /** The net-receive line, which the board implies but never states. */
  const totalH = 40;
  const gapTotal = 10;

  const slideH = 58;
  const gapSlide = 16;
  const footer = Math.max(insets.bottom, 14);

  const routeTop =
    insets.top +
    headerH +
    gapHeader +
    badge +
    gapBadge +
    pairH +
    gapPair +
    legsH +
    gapLegs +
    detailsH +
    gapDetails;

  const belowRoute = gapTotal + totalH + gapSlide + slideH + footer;

  const routeH = Math.max(route.length * 52, H - routeTop - belowRoute);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    control: 36,
    badge: { size: badge, disc: 46 },
    gapBadge,
    pairH,
    gapPair,
    legs: { h: legsH, rowH: legRowH, radius: 16, coin: 20 },
    gapLegs,
    details: { h: detailsH, rowH: detailRowH, pad: detailPad, radius: 16 },
    gapDetails,
    routeBlock: { h: routeH, rowH: routeH / route.length, dot: 10, rail: 2 },
    total: { h: totalH },
    gapTotal,
    gapSlide,
    slide: { h: slideH, radius: slideH / 2, knob: slideH - 12 },
    footer,
  };
}
