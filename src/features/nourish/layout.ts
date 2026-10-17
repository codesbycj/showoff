/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the reference. The reference is a photograph of
 * a tilted phone (AGENTS.md, "Three kinds of reference") — there is no grid in
 * it to measure against, and the proportions it appears to have are the
 * camera's, not the design's. So these are the numbers that are right for a
 * real screen: a 20dp page margin, a hero sized off the window, 56dp rows, a
 * dock that clears the home indicator.
 *
 * Widths are never pinned. The gauge, the rings, the Today cards and the dock
 * all take what the margins leave, and the gauge is a fraction of the window
 * through `useHero()` below.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0`, but nothing inside an expo-router `Stack` ever
 * reads it — the navigator re-provides the context with its own zeroed
 * metrics. So the design's insets are pinned here as a *fallback*, and
 * `use-insets.ts` prefers the device's whenever it reports any.
 */
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type } from './theme';

/** The status bar, iPhone 14 Pro — which is also what `shoot.js` fakes. */
export const TOP_INSET = 59;

/** Its home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. */
export const MARGIN = 20;

/** The greeting, below the status bar. */
export const GREETING_TOP = 10;

/** Between the greeting and the top of the gauge. */
export const GAUGE_TOP = 6;
/** How thick the calorie arc is drawn. */
export const GAUGE_STROKE = 13;
/** The gap the arc leaves open at the bottom, in degrees. */
export const GAUGE_GAP_DEG = 118;

/** The three macro rings under it. */
export const RING_TOP = 6;
export const RING_SIZE = 58;
export const RING_STROKE = 5;
/** Between a ring and its label. */
export const RING_LABEL_TOP = 7;

/** The carousel dots under the hero. */
export const DOTS_TOP = 14;
export const DOT_SIZE = 6;
export const DOT_GAP = 6;

/** The white sheet that carries everything below the hero. */
export const SHEET_TOP = 16;
export const SHEET_PAD = 18;

/** Between a section heading and the thing under it. */
export const SECTION_GAP = 12;
/** Between one section and the next. */
export const SECTION_TOP = 22;

/** A Today card. */
export const CARD_WIDTH = 168;
/**
 * 84, not 78. Two lines of title plus one of meta plus the padding comes to
 * exactly 78 — and "exactly" means the meta's descenders sit on the card's
 * own edge, so the g in "Log your meals" was being shaved off. A text box is
 * as tall as its line box, not as tall as the ink in it.
 */
export const CARD_HEIGHT = 84;
export const CARD_GAP = 10;
export const CARD_PAD = 12;

/** A food log row. */
export const LOG_ROW = 52;
/** The pills on the right of one. */
export const PILL_HEIGHT = 18;
export const PILL_GAP = 5;
export const PILL_PAD = 7;

/** The dock. */
export const DOCK_HEIGHT = 58;
export const DOCK_ICON = 22;
/** Between a dock glyph and its label. */
export const DOCK_LABEL_TOP = 4;
/** The add button, which overhangs the dock's top edge. */
export const FAB_SIZE = 54;
export const FAB_RISE = 12;

/**
 * The hero — the calorie gauge and the three rings under it.
 *
 * Sized off the window and clamped at both ends: a wide phone must not blow
 * the arc up until it crowds the greeting, and a narrow one must not shrink it
 * below the point where "2116" fits inside it.
 */
export function useHero() {
  const { width } = useWindowDimensions();

  /** The arc's outer diameter. 62% of the page is what leaves the flanking
   *  figures room to sit beside it rather than under it. */
  const gauge = clamp(width * 0.62, 190, 268);

  return {
    gauge,
    /**
     * What the gauge's drawn box is tall. The arc stops short of the bottom —
     * `GAUGE_GAP_DEG` of nothing — so the box is cropped to where the ends
     * actually are rather than left as a full circle with air under it.
     */
    gaugeHeight: gauge * 0.78,
  };
}

/**
 * How tall the washed hero block is, so the backdrop can end exactly where
 * the white sheet begins.
 *
 * Arithmetic rather than an `onLayout`: every piece above the sheet is a known
 * number of dp — two insets, a line of serif, the gauge's cropped box, a ring
 * and its label, the dots — so measuring it would cost a second render pass
 * and a frame of the wash drawn at the wrong height, which is exactly the
 * frame a screenshot catches.
 *
 * `useSafeAreaInsets` is read directly rather than through `use-insets.ts`,
 * which imports this file — a cycle Metro would resolve but nobody should have
 * to reason about. The fallback is the same.
 */
export function useWash() {
  const insets = useSafeAreaInsets();
  const { gaugeHeight } = useHero();

  return (
    (insets.top || TOP_INSET) +
    GREETING_TOP +
    type.greeting.line +
    GAUGE_TOP +
    gaugeHeight +
    RING_TOP +
    RING_SIZE +
    RING_LABEL_TOP +
    type.ringLabel.line +
    DOTS_TOP +
    DOT_SIZE +
    SHEET_TOP
  );
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}
