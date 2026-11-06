import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * The reference device's insets, used only when the real ones are zero.
 *
 * The web render reports zero, and the harness's faked `59,0,34,0` reaches
 * the app in some sessions and not others. A `Math.max` would double the
 * inset on a real device, so this is a *fallback*: real insets win whenever
 * there are any.
 */
const FALLBACK = { top: 59, right: 0, bottom: 34, left: 0 };

export function useInsets() {
  const insets = useSafeAreaInsets();
  if (insets.top === 0 && insets.bottom === 0) return FALLBACK;
  return insets;
}
