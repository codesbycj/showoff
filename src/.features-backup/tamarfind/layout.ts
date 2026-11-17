import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for tamarfind, derived from the live window (I2).
 *
 * **The map is the remainder.** A map is the one block on this screen that
 * genuinely wants the slack — more map is more use — so everything else is
 * sized and the map takes what is left. That is why the foot cannot open a
 * band (I3) and no spacer is ever needed.
 *
 * The result card floats over the map's lower edge, as the board draws it, and
 * the map is sized to leave room for it rather than being covered by it.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const headerH = 44;
  const gapHeader = 12;
  const searchH = 46;
  const gapSearch = 14;
  const catTitleH = 20;
  const gapCatTitle = 8;
  const chipsH = 40;
  const gapChips = 12;

  const cardH = 236;
  const gapCard = 12;
  const tabsH = 62;
  const footer = Math.max(insets.bottom, 10);

  const above =
    insets.top + headerH + gapHeader + searchH + gapSearch + catTitleH + gapCatTitle + chipsH + gapChips;
  const mapH = Math.max(200, H - above - cardH - gapCard - tabsH - footer);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    control: 38,
    searchH,
    gapSearch,
    catTitleH,
    gapCatTitle,
    chips: { h: chipsH, radius: 20 },
    gapChips,
    map: { h: mapH },
    card: { h: cardH, radius: 16, photoH: 104, reserveH: 36 },
    gapCard,
    tabs: { h: tabsH },
    footer,
  };
}
