import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for nordhome, derived from the live window (I2).
 *
 * The board is a posed phone on a grey board, so none of these numbers is a
 * measurement off it — they are phone sizes that carry the board's
 * proportions: a hero that owns the top third, a card rail that runs off the
 * right edge, and a dock that floats clear of the home indicator.
 *
 * **The content is taller than the screen**, which is what keeps the foot
 * honest (I3): the places rail runs under the dock exactly as the board shows
 * it, so there is no slack for a `ScrollView` to collect into a hole.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  /** The hero owns the top third and the status bar sits inside it. */
  const heroH = Math.round(H * 0.375);
  const pillH = 64;
  /** The search pill hangs off the bottom of the hero, inset by the margin. */
  const pillBottom = 18;

  const sectionH = 28;
  const gapSection = 18;
  const gapAfterTitle = 12;

  /** A card wide enough that the next one is cropped by the screen edge. */
  const cardW = Math.round(W * 0.78);
  const cardPhotoH = Math.round(cardW * 0.66);
  const cardTextH = 86;
  const cardH = cardPhotoH + cardTextH;
  const railGap = 12;

  const tileW = Math.round((W - margin * 2 - 12) / 2.35);
  const tileH = Math.round(tileW * 1.2);

  const dockH = 64;
  /**
   * The dock clears the home indicator and nothing else: the strip below it
   * belongs to the system, so padding the dock by the inset would reserve it
   * twice (R1b).
   */
  const dockBottom = insets.bottom + 8;

  return {
    W,
    H,
    insets,
    margin,
    hero: { h: heroH, radius: 28 },
    pill: { h: pillH, bottom: pillBottom, radius: 32 },
    sectionH,
    gapSection,
    gapAfterTitle,
    card: { w: cardW, photoH: cardPhotoH, textH: cardTextH, h: cardH, radius: 18 },
    railGap,
    tile: { w: tileW, h: tileH, radius: 18 },
    dock: { h: dockH, bottom: dockBottom, radius: 32 },
  };
}
