import { LinearGradient } from 'expo-linear-gradient';
import { Image, View } from 'react-native';

import { burger } from '../data/start';
import { ct } from '../theme';
import { HeroProps } from './_start-parts-shared';

/**
 * The burger.
 *
 * **A photograph, because a burger is a picture *of* something** (I4). The
 * board floats a cut-out on red; a cut-out of a photographed burger against a
 * brand red is a soft-edge job that goes wrong more often than it goes right,
 * so this sits in the red as a bled frame with the page's own colour fading
 * into it from both ends — the same idea, built as a gradient rather than as a
 * bad mask.
 *
 * **This is the page's ground for its region** (§5.5), so it may paint before
 * the chrome above and below it is staged.
 *
 * The gradients run top to bottom, which `expo-linear-gradient` handles; only
 * a *diagonal* is mirrored on web (Part 7).
 */
export function BurgerHero({ width, height }: HeroProps) {
  return (
    <View style={{ width, height }}>
      {/* STEP 1.10 image
      <Image source={burger} style={{ width, height }} resizeMode="cover" />
      */}
      {/* STEP 1.11 linear gradient
      <LinearGradient
        colors={[ct.page, 'rgba(224,41,29,0)']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: height * 0.3 }}
        pointerEvents="none"
      />
      */}
      {/* STEP 1.12 linear gradient
      <LinearGradient
        colors={['rgba(224,41,29,0)', ct.page]}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: height * 0.32 }}
        pointerEvents="none"
      />
      */}
    </View>
  );
}
