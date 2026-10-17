import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOTTOM_INSET, TOP_INSET } from './layout';

/**
 * The device's safe-area insets, or the design's where the device reports none.
 *
 * A *fallback*, not a maximum. Under the preview harness every inset reads 0
 * (see the note in `layout.ts`), and without this the button would sit against
 * the bottom of the render. Taking the larger of the two instead would push a
 * 24dp Android status bar up to an iPhone's 59 on every Android device.
 */
export function useInsets() {
  const insets = useSafeAreaInsets();
  return {
    top: insets.top || TOP_INSET,
    bottom: insets.bottom || BOTTOM_INSET,
  };
}
