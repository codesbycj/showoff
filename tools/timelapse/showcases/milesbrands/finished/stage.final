import { Image, View } from 'react-native';

import { stage } from '../data/brands';

const ART = {
  burger: require('../../../../assets/images/milesbrands/burger.png'),
  pad: require('../../../../assets/images/milesbrands/pad.png'),
  hotdog: require('../../../../assets/images/milesbrands/hotdog.png'),
} as const;

/**
 * The products thrown across the stage under the title.
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
export function Stage({ width, height }: { width: number; height: number | `${number}%` }) {
  return (
    <View style={{ width, height }} pointerEvents="none">
      {stage.map((s) => (
        <Image
          key={s.key}
          source={ART[s.art]}
          style={{
            position: 'absolute',
            left: width * s.x,
            // Percent heights cannot be multiplied, so a caller that hands the
            // stage its whole slot gets the throw placed against the screen's
            // own height instead.
            top: typeof height === 'number' ? height * s.y : `${s.y * 100}%`,
            width: s.w,
            height: undefined,
            aspectRatio: 1,
            transform: [{ rotate: `${s.angle}deg` }],
          }}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />
      ))}
    </View>
  );
}
