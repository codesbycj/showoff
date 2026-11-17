import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for globehome, derived from the live window (I2).
 *
 * **The destination list is the block that continues.** The board crops its
 * second card at the tab bar, so the page genuinely scrolls — R6's "a list or
 * a sheet that genuinely continues" — and the cards are sized from the page
 * width rather than stretched to meet the fold (I3: never a spacer).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const barH = 44;
  const gapBar = 14;
  const greetingH = 34;
  const gapGreeting = 16;
  const regionH = 46;
  const gapRegion = 18;

  const cardH = Math.round((W - margin * 2) * 0.62);
  const tabsH = 60;

  return {
    W,
    H,
    insets,
    margin,
    barH,
    gapBar,
    control: 40,
    greetingH,
    gapGreeting,
    region: { h: regionH, thumb: 34 },
    gapRegion,
    card: { h: cardH, gap: 14, radius: 20 },
    tabs: { h: tabsH },
    /** The scroller ends clear of the tab bar. */
    scrollPad: tabsH + insets.bottom + 16,
  };
}
