import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for flowmeals, derived from the live window (I2).
 *
 * **The hero meal is the remainder.** The rows under it are sized and the big
 * card takes what is left, so the dinner card always sits above the dock and
 * the foot can never open a band (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const introH = 112;
  const gapIntro = 18;

  const gapHero = 20;
  const sectionH = 26;
  const gapSection = 10;

  const pairW = (W - margin * 2 - 12) / 2;
  const pairH = 190;
  const pairImageH = 112;
  const gapPair = 12;

  const wideH = 96;

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
    introH +
    gapIntro +
    gapHero +
    sectionH +
    gapSection +
    pairH +
    gapPair +
    wideH +
    dockH +
    dockBottom +
    12;
  const heroH = Math.max(180, H - used);

  return {
    W,
    H,
    insets,
    margin,
    introH,
    gapIntro,
    hero: { h: heroH, imageH: Math.round(heroH * 0.62), radius: 22 },
    gapHero,
    sectionH,
    gapSection,
    pair: { w: pairW, h: pairH, imageH: pairImageH, radius: 20 },
    gapPair,
    wide: { h: wideH, radius: 20 },
    dock: { h: dockH, bottom: dockBottom },
  };
}
