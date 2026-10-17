import { Image, View } from 'react-native';

import { HERO } from '../data/onboarding';
import { HERO_HEIGHT } from '../layout';

/**
 * The photograph at the top of the screen.
 *
 * One flat asset and one draw. The reference lays a cut-out stylist on a mauve
 * wash that fades to white where the page begins; here the wash and the fade
 * are **baked into the file** by `tools/bake/elite.py` rather than layered at
 * runtime.
 */
export function Hero() {
  return (
    <View style={{ height: HERO_HEIGHT }}>
      {/* STEP 1.03 the stylist, washed and faded into the page
      <Image
        source={HERO}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
        accessible
        accessibilityRole="image"
        accessibilityLabel="A stylist at work in the salon"
      />
      */}
    </View>
  );
}
