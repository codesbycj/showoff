import { Image, View } from 'react-native';

import { scatter } from '../data/home';

const ART = {
  burger: require('../../../../assets/images/mileshome/burger.png'),
  pad: require('../../../../assets/images/mileshome/pad.png'),
  hotdog: require('../../../../assets/images/mileshome/hotdog.png'),
} as const;

/**
 * The food thrown across the page behind the balance.
 *
 * The reference drops 3D renders here. A render cannot be recreated and must
 * not be traced badly (AGENTS.md, "A 3D render in the shot"), so each one is
 * a free-licensed photograph cut off its backdrop by `tools/bake/miles.py` —
 * a burger, a cup, a pair of hot dogs. A burger is a specific subject and out
 * of drawing range; nothing here is vectored.
 *
 * `pointerEvents="none"` because this is scenery: it sits over the balance and
 * would otherwise swallow taps meant for the card underneath.
 *
 * Each item turns about its own centre, which is the only pivot React Native
 * offers whatever `transformOrigin` says.
 */
export function Scatter({ width, height }: { width: number; height: number }) {
  return (
    <View style={{ position: 'absolute', left: 0, top: 0, width, height }} pointerEvents="none">
      {/* STEP 1.14 three of them
      {scatter.map((s) => (
        <Image
          key={s.key}
          source={ART[s.art]}
          style={{
            position: 'absolute',
            left: width * s.x,
            top: height * s.y,
            width: s.w,
            height: undefined,
            aspectRatio: 1,
            transform: [{ rotate: `${s.angle}deg` }],
          }}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />
      ))}
      */}
    </View>
  );
}
