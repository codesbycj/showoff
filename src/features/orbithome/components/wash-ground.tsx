import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { ct } from '../theme';

type Props = { width: number; height: number; radius: number };

/**
 * The peach wash behind the greeting, the balance and the actions.
 *
 * **It is an absolutely-filled child of the header block, not a
 * `backgroundColor` on it** (§5.5, I9) — left on the block, the wash would
 * paint in frame one and the take would open on a peach panel instead of the
 * page.
 *
 * It is an `<svg>` gradient rather than `expo-linear-gradient`, which flips a
 * diagonal on web (§7), and its id comes from `useId` because SVG ids are
 * document-global there.
 *
 * `@not-a-ground`: It fills the WASH behind the balance, not the page: it stops at 339dp,
 * so this surface is a step of the reveal.
 * `stage.js` reads a component's own root to decide whether it is the
 * page's ground, and an absolute fill looks the same either way (SS5.5).
 */
export function WashGround({ width, height, radius }: Props) {
  const gid = useId();

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
        overflow: 'hidden',
      }}
    >
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id={gid} x1="0.1" y1="0" x2="0.9" y2="1">
            <Stop offset="0" stopColor={ct.washTop} />
            <Stop offset="0.55" stopColor={ct.washMid} />
            <Stop offset="1" stopColor={ct.washEnd} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill={`url(#${gid})`} />
      </Svg>
    </View>
  );
}
