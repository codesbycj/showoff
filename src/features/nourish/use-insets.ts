import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOTTOM_INSET, TOP_INSET } from './layout';

/**
 * The device's safe-area insets, or the design's where the device reports none.
 *
 * A *fallback*, not a maximum — see the note in `layout.ts`. Under the preview
 * harness every inset reads 0, and without this the greeting would sit behind
 * the status bar.
 */
export function useInsets() {
  const insets = useSafeAreaInsets();
  return {
    top: insets.top || TOP_INSET,
    bottom: insets.bottom || BOTTOM_INSET,
  };
}
