import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for pawshome, derived from the live window (I2).
 *
 * **The product grid is the remainder.** Its cards grow into whatever the
 * header, the search field, the pet chips and the dock leave, so the screen
 * always ends on the dock with no band under it (I3).
 *
 * **The dock is part of the budget.** Leaving it out is what pushed a post's
 * caption under the bar on another screen — five R3 failures at once, every
 * one of them text covered by edge chrome.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 62;
  const gapHeader = 14;
  const searchH = 48;
  const gapSearch = 18;
  const petH = 84;
  const gapPets = 18;
  const sectionH = 26;
  const gapSection = 12;

  const dealH = 84;
  const gapDeal = 14;

  /** A pinned, full-width bar is its own height and nothing more (I11). */
  const dockH = 66;

  const used =
    insets.top +
    headerH +
    gapHeader +
    searchH +
    gapSearch +
    petH +
    gapPets +
    sectionH +
    gapSection +
    gapDeal +
    sectionH +
    gapSection +
    dealH +
    dockH +
    14;

  const gridH = Math.max(180, H - used);
  const cardW = (W - margin * 2 - 14) / 2;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    search: { h: searchH, radius: 14 },
    gapSearch,
    pet: { h: petH, size: 46 },
    gapPets,
    sectionH,
    gapSection,
    card: { w: cardW, h: gridH, radius: 18 },
    gapDeal,
    deal: { h: dealH, radius: 16, thumb: 60 },
    dock: { h: dockH },
  };
}
