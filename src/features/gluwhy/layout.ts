/**
 * Sizes for a 393dp phone.
 *
 * The four reasons divide what is left between the headline and the button,
 * so the list ends on the button instead of stopping short of it.
 */
import { useWindowDimensions } from 'react-native';

const ROW_MIN = 76;
const ROW_MAX = 138;

export function useGluWhyLayout(insets: { top: number; bottom: number }, rows: number) {
  const { height } = useWindowDimensions();

  const fixed =
    insets.top +
    18 +
    16 + // the eyebrow
    8 +
    76 + // two display lines
    18 +
    58 + // the button
    insets.bottom +
    12;

  const rowH = Math.min(ROW_MAX, Math.max(ROW_MIN, Math.floor((height - fixed) / rows)));
  return { rowH };
}
