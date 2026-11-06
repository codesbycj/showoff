/**
 * Sizes for a 393dp phone.
 *
 * The memory fan takes what is left below the chips, so the row of
 * photographs reaches the dock instead of floating above a band of white —
 * which is what the reference's own crop hides.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 20;
export const PAD_TOP = 6;

export const HEAD_H = 44;
export const AVATAR = 132;
export const CHIP_H = 44;
export const DOCK_H = 58;

export const GAP_AVATAR_NAME = 14;
export const GAP_NAME_STATS = 8;
export const GAP_STATS_BIO = 8;
export const GAP_BIO_CHIPS = 16;
export const GAP_CHIPS_SECTION = 26;
export const GAP_SECTION_FAN = 14;

export function usePallyLayout(insets: { top: number; bottom: number }) {
  const { width, height } = useWindowDimensions();

  const above =
    insets.top +
    PAD_TOP +
    HEAD_H +
    40 + // the cover above the avatar
    AVATAR +
    GAP_AVATAR_NAME +
    40 + // the name
    GAP_NAME_STATS +
    20 +
    GAP_STATS_BIO +
    18 +
    GAP_BIO_CHIPS +
    CHIP_H +
    GAP_CHIPS_SECTION +
    25 +
    18 +
    GAP_SECTION_FAN;

  // What the floating dock really occupies: its own height plus the gap
  // it leaves to the screen edge, not a whole safe-area inset.
  const dockSpace = DOCK_H + Math.max(10, insets.bottom - 14) + 10;
  const fanH = Math.max(170, height - above - dockSpace);
  return { width, fanH, coverH: insets.top + PAD_TOP + HEAD_H + 40 + AVATAR / 2 };
}
