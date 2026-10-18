/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference"). These are the numbers that are
 * right for a real screen: a 26dp page margin, a 31dp display, a 56dp round
 * action button, and an illustration that takes whatever height the copy
 * leaves.
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
export const MARGIN = 26;

/**
 * The scattered glyphs sit in a band that starts under the status bar and
 * runs down past the artwork's shoulder. It is a layer over the screen's own
 * stack, not a row in it, so it takes its full drawn height and nothing has
 * to overflow.
 */
export const GLYPH_TOP = 24;
export const GLYPH_BAND = 260;

/** Between the headline block and the lede. */
export const LEDE_TOP = 14;

/** The pill set into the second line of the headline. */
export const PILL_HEIGHT = 32;
export const PILL_WIDTH = 62;

/** The footer row. */
export const FOOTER_TOP = 26;
export const FOOTER_BOTTOM = 8;
export const START_SIZE = 56;
/** Between "Let's Start" and its button. */
export const START_GAP = 14;

/**
 * The illustration's stage.
 *
 * Sized off the window rather than pinned, and off the *height* as well as the
 * width: everything else on this screen is a fixed number of dp, so what the
 * artwork may occupy is arithmetic — and doing it here means the drawing
 * shrinks on a short phone instead of overflowing into the headline. Relying
 * on overflow is what Android does not forgive.
 */
export function useStage() {
  const { width, height } = useWindowDimensions();

  /** Everything the artwork has to share the screen with. */
  const chrome =
    TOP_INSET +
    GLYPH_TOP +
    42 * 3 +
    LEDE_TOP +
    18 +
    FOOTER_TOP +
    START_SIZE +
    FOOTER_BOTTOM +
    BOTTOM_INSET;
  const slot = height - chrome;

  const disc = clamp(Math.min(width * 0.62, slot * 0.92), 150, 250);

  return {
    /** The lime disc behind everything. */
    disc,
    /** The drawing itself, which overhangs the disc on purpose. */
    art: disc * 1.22,
  };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}
