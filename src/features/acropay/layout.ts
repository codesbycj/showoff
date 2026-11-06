/**
 * Sizes for a 393dp phone.
 *
 * Everything below the hero has a fixed height, so the hero takes the
 * remainder: the button lands on the safe area on any phone and there is no
 * band of white above it.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 22;

const ROW_MIN = 56;
const ROW_MAX = 68;

export function useAcroLayout(insets: { top: number; bottom: number }, rows: number) {
  const { height } = useWindowDimensions();

  const fixed =
    insets.top +
    8 +
    14 +
    44 + // the close control
    6 +
    66 + // two headline lines
    18 +
    40 + // the rating cluster
    18 +
    16 +
    150 + // the savings panel
    58 + // the button
    12 +
    18 + // the footnote
    insets.bottom +
    10;

  // The hero is a flexible band in the screen, so this only has to size the
  // feature rows: how tall they can be without pushing the footnote off.
  const free = height - fixed - 104;
  const rowH = Math.min(ROW_MAX, Math.max(ROW_MIN, Math.floor(free / rows)));

  return { rowH, margin: MARGIN };
}
