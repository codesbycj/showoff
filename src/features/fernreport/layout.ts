/**
 * Sizes for a 393dp phone.
 *
 * The income card takes most of what is free and the ledger rows take the
 * rest, so the last row lands on the dock. The reference's own list runs
 * under its dock with nothing beneath it; this one reaches it.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 20;
export const SEG_H = 52;
export const BANNER_H = 84;
export const DOCK_H = 58;

const ROW_MIN = 60;
const ROW_MAX = 78;
const CARD_MIN = 316;

export function useReportLayout(insets: { top: number; bottom: number }, rows: number) {
  const { height } = useWindowDimensions();

  const fixed =
    insets.top +
    6 +
    31 + // the title line
    16 +
    SEG_H +
    16 +
    14 +
    BANNER_H +
    16 +
    23 + // the section head
    DOCK_H +
    insets.bottom +
    8;

  // Fit first, then fill. `Math.max(MIN, remainder)` clamps *upward*: when
  // the remainder is smaller than the minimum it returns the minimum and the
  // column overflows, which pushes the dock clean off the bottom of the
  // screen. Shrink the rows instead, and if even that is not enough, accept
  // a shorter card — a short card is a design problem, a dock below the
  // screen edge is a broken one.
  const free = height - fixed;
  let rowH = Math.min(ROW_MAX, Math.max(ROW_MIN, Math.floor(free * 0.17)));
  if (free - rowH * rows < CARD_MIN) {
    rowH = Math.max(48, Math.floor((free - CARD_MIN) / rows));
  }
  const cardH = Math.max(200, free - rowH * rows);

  return { cardH, rowH, margin: MARGIN, segH: SEG_H, bannerH: BANNER_H };
}
