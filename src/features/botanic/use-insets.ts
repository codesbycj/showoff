import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOTTOM_INSET, TOP_INSET } from './layout';

/**
 * The safe area, as this screen should actually use it.
 *
 * Three things have to be true at once, which is why this is a hook rather than
 * two constants:
 *
 *  - **On a device, the device wins.** The two bars are anchored to the status
 *    bar and the navigation bar, and those are not the same height on every
 *    phone — an Android status bar is commonly 24-30dp against an iPhone's 59.
 *    Pinning the design's number leaves a band of dead canvas above the header
 *    on anything that is not the phone the design was drawn for, which is
 *    exactly how this first shipped.
 *  - **Under the preview harness, the design wins.** `useSafeAreaInsets()`
 *    reports 0 there — `shoot.js` fakes `59,0,34,0` through a `getComputedStyle`
 *    patch, but nothing inside an expo-router `Stack` ever calls it, because the
 *    navigator re-provides the context with its own zeroed metrics. Falling back
 *    to the pinned value is what keeps a web render framed like the reference
 *    instead of jamming both bars against the screen edges.
 *  - **The screen and the bars must agree.** The scroller's top padding has to
 *    equal the header's full height, and its bottom padding has to clear the
 *    dock. Reading the same hook in all three places is what makes that
 *    structural rather than something to keep in sync by hand.
 *
 * `|| ` rather than `Math.max`: taking the larger of the two would re-pin a
 * 24dp Android status bar back up to 59, which is the bug this exists to fix.
 * Zero means "nobody told us", and only then does the design's number stand in.
 */
export function useBotanicInsets() {
  const insets = useSafeAreaInsets();
  return {
    top: insets.top || TOP_INSET,
    bottom: insets.bottom || BOTTOM_INSET,
  };
}
