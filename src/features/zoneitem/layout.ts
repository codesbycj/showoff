import { useWindowDimensions } from 'react-native';

import { OPTION_ROWS } from './data/item';
import { useInsets } from './use-insets';

/**
 * Every size for zoneitem, derived from the live window (I2).
 *
 * **The hero photograph is the remainder.** A dish page's picture is the one
 * block that genuinely wants the slack, so everything below it is sized and
 * the photograph takes what is left — which means the foot cannot open a band
 * (I3) and no spacer is ever needed.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const gapHero = 14;
  const badgeH = 24;
  const gapBadge = 8;
  const nameH = 27;
  const metaH = 16;
  const priceH = 25;
  const gapTitle = 8;
  const blurbH = 19 * 2;
  const gapBlurb = 16;
  const addonHeadH = 36;
  const optionRowH = 42;
  const optionsH = optionRowH * OPTION_ROWS;
  const gapOptions = 12;
  const barH = 56;
  const footer = Math.max(insets.bottom, 14);

  const below =
    gapHero +
    badgeH +
    gapBadge +
    nameH +
    metaH +
    priceH +
    gapTitle +
    blurbH +
    gapBlurb +
    addonHeadH +
    optionsH +
    gapOptions +
    barH +
    footer;

  const heroH = Math.max(200, H - below);

  return {
    W,
    H,
    insets,
    margin,
    hero: { h: heroH, control: 36 },
    gapHero,
    badgeH,
    gapBadge,
    nameH,
    metaH,
    priceH,
    gapTitle,
    blurbH,
    gapBlurb,
    addonHeadH,
    options: { h: optionsH, rowH: optionRowH, box: 20 },
    gapOptions,
    bar: { h: barH, radius: barH / 2, step: 30 },
    footer,
  };
}
