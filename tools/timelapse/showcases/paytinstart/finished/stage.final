import { View } from 'react-native';

import { useStage } from '../layout';
import { pt, radius } from '../theme';
import { HeroArt } from './hero-art';

/**
 * The artwork, on its disc.
 *
 * The two are composed here rather than nested so that each can be revealed on
 * its own — the disc lands, then the drawing arrives on it.
 *
 * The drawing is wider than the disc on purpose: in the reference the hand and
 * the wallet both break the circle's edge, which is what stops the composition
 * reading as a sticker. Nothing is clipped to achieve it, so no view needs
 * `overflow: 'hidden'` — which Android does not forgive next to an elevation.
 */
export function Stage() {
  const { disc, art } = useStage();

  return (
    <View style={{ width: art, height: art, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          position: 'absolute',
          width: disc,
          height: disc,
          borderRadius: radius.full,
          backgroundColor: pt.limeDeep,
        }}
      />
      <HeroArt size={art} />
    </View>
  );
}
