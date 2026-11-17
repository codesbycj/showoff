import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for crypinswap, derived from the live window (I2).
 *
 * **The keypad is the remainder.** Whichever block absorbs the slack has to be
 * one that genuinely scales, and a numeric pad does: taller keys are better
 * keys. So the two panels and the CTA are fixed and the pad takes whatever is
 * left, which means the screen cannot leave a band at the foot by construction
 * (I3) and no padding or spacer is ever needed to fill one.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 44;
  const gapHeader = 14;

  /** The pay panel carries the chips row, so it is the taller of the two. */
  const payH = 136;
  const receiveH = 104;
  /** The flip control sits on the seam between the panels. */
  const seam = 10;
  const flip = 38;

  const gapPanels = 14;
  /** The rate line, which the board crops off (see `rate-row.tsx`). */
  const rateH = 34;
  const gapRate = 10;
  const ctaH = 56;
  const gapCta = 14;
  const footer = Math.max(insets.bottom, 12);

  const padTop =
    insets.top + headerH + gapHeader + payH + seam + receiveH + gapPanels + rateH + gapRate;
  const padH = Math.max(220, H - padTop - gapCta - ctaH - footer);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    control: 36,
    panel: {
      payH,
      receiveH,
      radius: 18,
      seam,
      flip,
      /** The coin selector pill inside each panel. */
      pillH: 30,
      coin: 20,
      chipH: 24,
    },
    gapPanels,
    rate: { h: rateH },
    gapRate,
    pad: { h: padH, rows: 4, cols: 3 },
    gapCta,
    cta: { h: ctaH, radius: ctaH / 2 },
    footer,
  };
}
