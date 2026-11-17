import { useWindowDimensions } from 'react-native';

import { marketRows } from './data/wallet';
import { useInsets } from './use-insets';

/**
 * Every size for crypinhome, derived from the live window.
 *
 * **The market list is the remainder.** That is the lever I3 actually asks for
 * here — "add the row the reference crops". The first pass filled the screen by
 * scaling every block up instead, which is the one thing I3 tells you not to
 * do, and the screen came out loose and generic. So: tight blocks at the top,
 * more rows at the bottom.
 *
 * The holding deck is sized from its own parts rather than pinned to a round
 * number, because the "View All" pill is the last step of that deck's taper. A
 * box too short for it is what put the pill across the Ethereum card's edge.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 42;
  const heroH = 196;
  const marketsHeadH = 26;
  const tabsH = 34;

  /** The holding deck: two thin cards, then the pill, each a step further in. */
  const cardH = 40;
  const cardGap = 5;
  const pillH = 26;
  const stackH = 2 * (cardH + cardGap) + pillH;

  const gapHeader = 10;
  const gapHero = 12;
  const gapStack = 10;
  const gapHead = 8;
  const gapTabs = 6;

  // A narrow centred pill, not a full-width bar. The reference's spans roughly
  // two thirds of the screen and floats clear of the content.
  const dockW = Math.round(W * 0.64);
  const dockH = 52;
  const dockLift = 16;

  const listTop =
    insets.top +
    headerH +
    gapHeader +
    heroH +
    gapHero +
    stackH +
    gapStack +
    marketsHeadH +
    gapHead +
    tabsH +
    gapTabs;

  /**
   * The list fills the space **above** the dock, in whole rows.
   *
   * The reference lets its last row run behind the floating pill, and copying
   * that failed the audit twice over: R2 `CLIPPED`, because a clipped list cuts
   * a row through its own text, and R3 `COVERED`, because the dock then paints
   * over that text — which R3 calls a FAIL outright. The rules outrank the
   * reference where they disagree, so the rows are sized to land exactly on the
   * dock instead. No clipping, nothing covered, and no dead canvas either: the
   * dock occupies the remainder.
   */
  const dockSpace = dockH + dockLift + insets.bottom;
  const listH = Math.max(140, H - listTop - dockSpace);
  const rows = Math.min(marketRows.length, Math.max(3, Math.round(listH / 60)));
  const rowH = listH / rows;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    hero: { h: heroH, radius: 22 },
    gapHero,
    /** Thin cards, bled wider than the page margin, tapering downward. */
    stack: { h: stackH, cardH, radius: 12, gap: cardGap, inset: 14, bleed: 8, pillH },
    gapStack,
    marketsHeadH,
    gapHead,
    tabsH,
    gapTabs,
    list: { h: listH, rowH, rows },
    dock: { w: dockW, h: dockH, lift: dockLift, radius: 26, item: 36 },
    /** Round action buttons in the portfolio card. */
    action: 46,
    coin: 34,
    avatar: 34,
  };
}
