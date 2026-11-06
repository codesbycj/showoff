/**
 * Sizes for a 393dp phone.
 *
 * The trend card and the two reading rows share what is left under the
 * insight card, so the list ends on the dock rather than above a band of
 * page.
 */
import { useWindowDimensions } from 'react-native';

const MARGIN = 22;
const ROW_MIN = 60;
const ROW_MAX = 78;
const CARD_MIN = 150;

export function useGluHomeLayout(insets: { top: number; bottom: number }, rows: number) {
  const { width, height } = useWindowDimensions();

  const fixed =
    insets.top +
    6 +
    48 + // the top row
    10 +
    22 + // the greeting
    10 +
    27 + // "Latest cgm reading"
    4 +
    68 + // the figure
    14 +
    78 + // the insight card
    12 +
    16 +
    27 + // "Today's readings"
    6 +
    58 +
    insets.bottom +
    8;

  // Fit first, then fill. `Math.max(MIN, remainder)` clamps *upward*: when
  // the remainder is smaller than the minimum it returns the minimum and the
  // column overflows, which pushes the dock clean off the bottom of the
  // screen. Shrink the rows instead, and if even that is not enough, accept
  // a shorter card — a short card is a design problem, a dock below the
  // screen edge is a broken one.
  const free = height - fixed;
  let rowH = Math.min(ROW_MAX, Math.max(ROW_MIN, Math.floor(free * 0.3)));
  if (free - rowH * rows < CARD_MIN) {
    rowH = Math.max(50, Math.floor((free - CARD_MIN) / rows));
  }
  const cardH = Math.max(120, free - rowH * rows);

  return { rowH, cardH, chartW: width - MARGIN * 2 - 28 };
}
