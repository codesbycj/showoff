import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for tamargym, derived from the live window (I2).
 *
 * **The hero photograph is the remainder.** A venue page's picture is the one
 * block that genuinely wants the slack — a bigger photograph is a better venue
 * page — so everything below it is sized and the hero takes what is left. That
 * is why the foot cannot open a band (I3) and no spacer is ever needed.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const gapHero = 16;
  const titleH = 32;
  const addressH = 20;
  const gapTitle = 14;
  const chipsH = 36;
  const gapChips = 16;
  const priceH = 34;
  const gapPrice = 14;
  const aboutH = 20 * 3;
  const gapAbout = 14;
  const factsH = 56;
  const gapFacts = 16;
  const ctaH = 56;
  const footer = Math.max(insets.bottom, 14);

  const below =
    gapHero +
    titleH +
    addressH +
    gapTitle +
    chipsH +
    gapChips +
    priceH +
    gapPrice +
    aboutH +
    gapAbout +
    factsH +
    gapFacts +
    ctaH +
    footer;

  const heroH = Math.max(220, H - below);

  return {
    W,
    H,
    insets,
    margin,
    hero: { h: heroH, radius: 0, control: 38 },
    gapHero,
    titleH,
    addressH,
    gapTitle,
    chips: { h: chipsH, radius: 18 },
    gapChips,
    priceH,
    gapPrice,
    aboutH,
    gapAbout,
    facts: { h: factsH, radius: 14 },
    gapFacts,
    cta: { h: ctaH, radius: ctaH / 2 },
    footer,
  };
}
