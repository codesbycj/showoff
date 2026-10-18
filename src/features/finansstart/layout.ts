/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference"). These are the numbers that are
 * right for a real screen: a 24dp page margin, a 33dp display, a 56dp primary
 * button, and a collage that takes whatever height the copy leaves.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0`, but nothing inside an expo-router `Stack` ever
 * reads it. So the design's insets are pinned here as a *fallback*, and
 * `use-insets.ts` prefers the device's whenever it reports any.
 */
import { useWindowDimensions } from 'react-native';

/** The status bar, iPhone 14 Pro — which is also what `shoot.js` fakes. */
export const TOP_INSET = 59;

/** Its home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. */
export const MARGIN = 24;

/** The wordmark at the top. */
export const MARK_TOP = 6;
export const MARK_GLYPH = 22;

/** Between the collage and the headline. */
export const COPY_TOP = 20;
/** Between the headline and its paragraph. */
export const BODY_TOP = 14;
/** How wide the paragraph runs, as a fraction of the page. */
export const BODY_WIDTH = 0.92;

/** The button at the foot. */
export const BUTTON_TOP = 22;
export const BUTTON_HEIGHT = 56;
export const BUTTON_BOTTOM = 8;

/**
 * The collage of cards and pills.
 *
 * Sized off the window and off the height left over, because everything else
 * on this screen is a fixed number of dp — so the artwork shrinks on a short
 * phone instead of overflowing into the headline. Relying on overflow is what
 * Android does not forgive.
 */
export function useCollage() {
  const { width, height } = useWindowDimensions();

  const chrome =
    TOP_INSET +
    MARK_TOP +
    25 +
    COPY_TOP +
    40 * 2 +
    BODY_TOP +
    17 * 3 +
    BUTTON_TOP +
    BUTTON_HEIGHT +
    BUTTON_BOTTOM +
    BOTTOM_INSET;
  const slot = height - chrome;

  /** The front card's width. Everything else in the collage is a fraction. */
  const card = clamp(Math.min(width * 0.62, slot * 0.95), 170, 250);

  return { card, slot };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}
