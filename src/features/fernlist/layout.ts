import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for fernlist, derived from the live window (I2) — no fixed
 * offsets copied off one device, and nothing divided by the board's scale.
 *
 * **The deck is the remainder.** Its front card grows into whatever the
 * header, the title, the featured trip and the date chips leave, so the screen
 * always ends on the deck with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 14;

  const titleH = 54;
  const gapTitle = 18;

  const featH = 124;
  const gapFeat = 16;

  const chipH = 44;
  const gapChips = 16;

  const footer = insets.bottom + 8;

  const used =
    insets.top +
    headerH +
    gapHeader +
    titleH +
    gapTitle +
    featH +
    gapFeat +
    chipH +
    gapChips +
    footer;

  /** Each card behind the front one shows this much of its own top. */
  const peek = 34;
  const deckH = Math.max(260, H - used);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    titleH,
    gapTitle,
    feat: { h: featH, radius: 26, tile: { w: 64, h: 92, radius: 32 } },
    gapFeat,
    chip: { h: chipH, radius: 22 },
    gapChips,
    deck: {
      h: deckH,
      peek,
      front: deckH - peek * 2,
      w: W - margin * 2,
      radius: 26,
      inset: 13,
    },
    footer,
  };
}
