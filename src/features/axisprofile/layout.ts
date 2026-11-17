import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for axisprofile, derived from the live window (I2).
 *
 * **The fact card is the remainder.** Everything else is budgeted and the card
 * grows into what is left, so the screen is full to the bottom edge with no
 * band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;
  const topH = 48;
  const gapTop = 18;
  const tabH = 44;
  const gapTabs = 22;
  const displayH = 82;
  const gapDisplay = 20;
  const gapCard = 22;
  const peopleH = 60;
  const gapPeople = 22;
  const sectionH = 20;
  const gapSection = 6;
  const bodyH = 46;
  const padBottom = 20;

  const used =
    insets.top +
    topH +
    gapTop +
    tabH +
    gapTabs +
    displayH +
    gapDisplay +
    gapCard +
    peopleH +
    gapPeople +
    sectionH +
    gapSection +
    bodyH +
    padBottom;

  return {
    W,
    H,
    insets,
    cardH: Math.max(180, H - used),
    margin,
    topH: 48,
    gapTop: 18,
    tabH: 44,
    gapTabs: 22,
    displayH: 82,
    gapDisplay: 20,
    card: { radius: 22 },
    gapCard: 22,
    peopleH: 60,
    gapPeople: 22,
    sectionH: 20,
    gapSection: 6,
    bodyH: 46,
    padBottom: 20,
  };
}
