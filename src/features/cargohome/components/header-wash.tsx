import { LinearGradient } from 'expo-linear-gradient';

import { WASH_HEIGHT } from '../layout';
import { cg } from '../theme';

/**
 * The warm wash behind the greeting and the search field.
 *
 * A gradient here rather than a baked asset, which is the opposite call to the
 * onboarding screen's hero — and for a good reason. That one had a photograph
 * inside it, so the tint, the fade and the image all had to be composited
 * together and baking collapsed three layers into one. This is three colour
 * stops over nothing. `expo-linear-gradient` draws it natively, it costs no
 * asset, and it reflows to any width, where a baked image of a gradient would
 * be stretched.
 *
 * Three stops, not two: the reference's header runs yellow at the top-left
 * into a peach at the right *and* fades downward. A single yellow-to-white
 * diagonal loses the peach entirely and the header goes flat.
 *
 * It is scenery, so it takes no pointer events — without that it sits over the
 * greeting row and swallows the taps meant for the bell.
 */
export function HeaderWash() {
  return (
    <LinearGradient
      colors={cg.wash}
      locations={[0, 0.45, 1]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, height: WASH_HEIGHT }}
      pointerEvents="none"
    />
  );
}
