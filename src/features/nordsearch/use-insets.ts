import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Safe-area insets with the design's device as a **FALLBACK**, never a max.
 *
 * RULES R1b / I3, the rule that put an empty band under four screens of a
 * deleted batch: the web render reports zero insets, and the harness's faked
 * `59,0,34,0` reaches the app in some sessions and not others. A screen laid
 * out against 0 and then run on a device gains a band it was never measured
 * with.
 *
 * `Math.max(real, design)` is the trap, not the fix — it silently takes
 * whichever is larger, so on a device whose real inset is already correct it
 * adds the design's on top and counts the strip twice.
 */
const DESIGN = { top: 59, bottom: 34 };

export function useInsets() {
  const raw = useSafeAreaInsets();
  return {
    top: raw.top || DESIGN.top,
    bottom: raw.bottom || DESIGN.bottom,
  };
}
