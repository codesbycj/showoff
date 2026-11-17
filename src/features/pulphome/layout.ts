import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for pulphome, derived from the live window (I2).
 *
 * **The bottle list is the remainder and it runs under the dock**, which is
 * how the board ends: a card crossing the bottom edge, never a band of empty
 * canvas (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const greetH = 44;
  const gapGreet = 20;
  const displayH = 84;
  const subH = 20;
  const gapSub = 20;
  const chipH = 44;
  const gapChips = 16;

  const used = insets.top + greetH + gapGreet + displayH + subH + gapSub + chipH + gapChips;

  return {
    W,
    H,
    insets,
    margin,
    greetH,
    gapGreet,
    displayH,
    subH,
    gapSub,
    chip: { h: chipH, radius: 21 },
    gapChips,
    /** What is left for the list, which then scrolls past it. */
    listH: Math.max(240, H - used),
    card: { h: 218, radius: 20 },
    /** A floating pill, so its slack is even top and bottom (I11). */
    dock: { h: 64, w: Math.round(W * 0.62), radius: 32, bottom: 16, disc: 44 },
  };
}
