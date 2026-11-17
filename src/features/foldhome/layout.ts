import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for foldhome, derived from the live window (I2).
 *
 * **The transaction list is the remainder and it runs under the bottom edge**,
 * which is how the board ends: a row crossing the frame, never a band of empty
 * canvas (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const greetH = 60;
  const gapGreet = 16;
  const cardH = 168;
  const peek = 36;
  /** Two cards peek out behind the live one. */
  const stackH = cardH + peek * 2;
  const gapStack = 20;
  const actionH = 72;
  const gapActions = 18;
  const sectionH = 28;
  const gapSection = 12;

  const used =
    insets.top +
    greetH +
    gapGreet +
    stackH +
    gapStack +
    actionH +
    gapActions +
    sectionH +
    gapSection;

  const gapTile = 10;

  return {
    W,
    H,
    insets,
    margin,
    greetH,
    gapGreet,
    card: { w: W - margin * 2, h: cardH, peek },
    gapStack,
    action: { h: actionH, w: (W - margin * 2 - gapTile * 3) / 4, gap: gapTile },
    gapActions,
    sectionH,
    gapSection,
    list: { h: Math.max(200, H - used), rowH: 68, gap: 10 },
  };
}
