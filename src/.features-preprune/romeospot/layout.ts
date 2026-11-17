import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for romeospot, derived from the live window.
 *
 * **The hero is the remainder, not a fixed height.** Everything below it is
 * budgeted in dp, and the photograph takes whatever is left. That makes
 * INSPO-RULES I3 structural: the column cannot leave a band at the foot,
 * because there is nothing to leave — if the blocks below shrink, the hero
 * grows. On a 393x852 phone it lands at ~366dp (43% of the screen), which is
 * where the reference's hero sits too.
 *
 * The alternative - a fixed hero and a `flex: 1` spacer underneath - is what
 * puts 84dp of dead canvas above the home indicator, because a ScrollView
 * carries `flexGrow: 1` and eats every spare dp into one hole.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  // --- the budget below the hero, top to bottom -------------------------
  const heroToCard = 18;
  const rowH = 58;
  const cardPadV = 11;
  const cardH = rowH * 3 + cardPadV * 2; // 196
  const cardToHead = 24;
  const headH = 24;
  const headToChips = 16;
  const chipH = 40;
  const chipGap = 10;
  const chipRows = 2;
  const chipsH = chipH * chipRows + chipGap * (chipRows - 1); // 90
  const chipsToCta = 22;
  const ctaH = 56;

  // The button row clears the home indicator and nothing else. R1b: the
  // system already owns that strip when the app is not edge-to-edge, so this
  // is the design's own inset as a FALLBACK, never added on top of it.
  const footer = insets.bottom;

  const below =
    heroToCard + cardH + cardToHead + headH + headToChips + chipsH + chipsToCta + ctaH + footer;

  // Clamped so a very short window cannot collapse the photograph to nothing
  // and a tablet cannot turn it into the whole screen.
  const hero = Math.max(260, Math.min(H - below, Math.round(H * 0.52)));

  return {
    W,
    H,
    insets,
    margin,
    hero,
    heroToCard,
    card: { h: cardH, rowH, padV: cardPadV, radius: 18 },
    cardToHead,
    headH,
    headToChips,
    chip: { h: chipH, gap: chipGap, radius: 12 },
    chipsH,
    chipsToCta,
    cta: { h: ctaH, radius: 16, gap: 12 },
    footer,
    /**
     * Circular controls floating on the photograph. 44 rather than the
     * reference's ~36, because R7 wants every control at 44 in both
     * directions and a glass orb on a photo is the one people miss.
     */
    orb: 44,
    /** Icon tile inside an order-mode row. */
    tile: 38,
  };
}
