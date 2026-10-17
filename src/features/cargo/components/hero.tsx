import { Image, View } from 'react-native';

import { HERO } from '../data/onboarding';
import { HERO_HEIGHT } from '../layout';

/**
 * The photograph behind everything.
 *
 * Absolutely positioned at the top and full-bleed, under the status bar. It
 * has no boundary with the page because it has none to draw: the asset is
 * desaturated, warmed, washed yellow and faded until its final row is the
 * page's own colour exactly — see `tools/bake/cargo.py`.
 */
export function Hero() {
  return (
    <View
      style={{ position: 'absolute', top: 0, left: 0, right: 0, height: HERO_HEIGHT }}
      pointerEvents="none"
    >
      {/* STEP 1.03 the truck, washed into the page
      <Image
        source={HERO}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
        accessible
        accessibilityRole="image"
        accessibilityLabel="A haulage truck on an open road"
      />
      */}
    </View>
  );
}
