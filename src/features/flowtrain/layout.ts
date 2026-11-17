import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for flowtrain, derived from the live window (I2).
 *
 * **The photograph is the remainder.** The sheet under it is sized and the
 * image takes what is left, so the transport row always sits on the foot with
 * no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 24;
  const control = 44;

  const nameH = 44;
  const gapName = 4;
  const metaH = 22;
  const gapMeta = 16;

  const clockH = 86;
  const gapClock = 14;
  const barH = 8;
  const gapBar = 20;

  const tipH = 72;
  const gapTip = 22;

  const transportH = 84;
  const footer = insets.bottom + 10;

  const sheetH =
    26 +
    nameH +
    gapName +
    metaH +
    gapMeta +
    clockH +
    gapClock +
    barH +
    gapBar +
    tipH +
    gapTip +
    transportH +
    footer;
  const heroH = Math.max(240, H - sheetH + 30);

  return {
    W,
    H,
    insets,
    margin,
    control,
    hero: { h: heroH },
    sheet: { h: sheetH, radius: 32 },
    nameH,
    gapName,
    metaH,
    gapMeta,
    clockH,
    gapClock,
    barH,
    gapBar,
    tip: { h: tipH, radius: 18 },
    gapTip,
    transportH,
    footer,
  };
}
