import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for flowhome, derived from the live window (I2).
 *
 * **The phase card is the remainder.** Everything else is sized and the card
 * with the photograph in it takes what is left, so the mood row always sits
 * above the dock and the foot can never open a band (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const greetH = 56;
  const gapGreet = 14;

  const weekH = 64;
  const gapWeek = 16;

  const gapCard = 18;
  const sectionH = 28;
  const gapSection = 10;
  const sessionH = 92;
  const gapSession = 18;

  const questionH = 24;
  const gapQuestion = 10;
  const moodH = 44;

  const dockH = 66;
  const dockBottom = 0;
  /**
   * **A pinned, full-width bar does not reserve the indicator's strip.** R1b:
   * when the app is not edge-to-edge the system already holds that space, so a
   * bar padded by `insets.bottom` as well counts it twice - and what it looks
   * like is not a gap under the bar but a bar with 34dp of dead height inside
   * it, below its own labels. The bar is flush to the frame and its ink is
   * centred in its own band, which `dockcheck.js` measures as `under` (I11).
   */

  const used =
    insets.top +
    greetH +
    gapGreet +
    weekH +
    gapWeek +
    gapCard +
    sectionH +
    gapSection +
    sessionH +
    gapSession +
    questionH +
    gapQuestion +
    moodH +
    dockH +
    dockBottom +
    14;
  const phaseH = Math.max(210, H - used);

  return {
    W,
    H,
    insets,
    margin,
    greetH,
    gapGreet,
    weekH,
    gapWeek,
    phase: { h: phaseH, radius: 24 },
    gapCard,
    sectionH,
    gapSection,
    session: { h: sessionH, radius: 20 },
    gapSession,
    questionH,
    gapQuestion,
    mood: { h: moodH, radius: 20 },
    dock: { h: dockH, bottom: dockBottom },
  };
}
