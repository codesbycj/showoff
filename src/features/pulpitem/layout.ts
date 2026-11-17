import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for pulpitem, derived from the live window (I2).
 *
 * **The photograph is the remainder.** Everything under it is budgeted, so the
 * screen always ends on the buy row with no band beneath it (I3), and the
 * hero grows or shrinks with the device instead of the gap doing it.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const topH = 44;
  const gapTop = 14;
  const gapHero = 16;
  const titleH = 62;
  const sizeH = 18;
  const gapSize = 12;
  const tagH = 34;
  const gapTags = 20;
  const sectionH = 24;
  const gapSection = 10;
  const tileH = 72;
  const gapTiles = 18;
  const buyH = 60;
  const padBottom = 16;

  const used =
    insets.top +
    topH +
    gapTop +
    gapHero +
    titleH +
    sizeH +
    gapSize +
    tagH +
    gapTags +
    sectionH +
    gapSection +
    tileH +
    gapTiles +
    buyH +
    padBottom;

  const gapTile = 10;

  return {
    W,
    H,
    insets,
    margin,
    topH,
    gapTop,
    hero: { h: Math.max(240, H - used), radius: 22 },
    gapHero,
    titleH,
    sizeH,
    gapSize,
    tag: { h: tagH, radius: 17 },
    gapTags,
    sectionH,
    gapSection,
    tile: { h: tileH, w: (W - margin * 2 - gapTile * 3) / 4, gap: gapTile, radius: 14 },
    gapTiles,
    buy: { h: buyH, radius: 30, step: 44 },
    padBottom,
  };
}
