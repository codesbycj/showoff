import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for fernhome, derived from the live window (I2) — no fixed
 * offsets copied off one device, and nothing divided by the board's scale.
 *
 * **The hero is the remainder.** It grows into whatever the header, the
 * headline, the chips and the dock leave, so the screen always ends on the
 * dock with no band under it (I3). The dock's own clearance is budgeted here
 * once, as a FALLBACK inset — never `Math.max` (R1b).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 18;

  const countryH = 18;
  const displayH = 94;
  const gapDisplay = 14;

  const chipH = 46;
  const gapChips = 16;

  const gapHero = 16;
  const dockH = 64;
  const footer = insets.bottom + 8;

  const used =
    insets.top +
    headerH +
    gapHeader +
    countryH +
    displayH +
    gapDisplay +
    chipH +
    gapChips +
    gapHero +
    dockH +
    footer;

  const heroH = Math.max(260, H - used);
  const heroW = W - margin * 2;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    countryH,
    displayH,
    gapDisplay,
    chip: { h: chipH, radius: 23 },
    gapChips,
    gapHero,
    hero: { w: heroW, h: heroH, radiusTop: Math.round(heroW / 2), radiusBottom: 44 },
    dock: { h: dockH, radius: 32, pill: 44 },
    search: 56,
    footer,
  };
}
