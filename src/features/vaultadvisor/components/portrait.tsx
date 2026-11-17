import { Image, View } from 'react-native';

import { advisor } from '../data/advisor';

type Props = { margin: number; height: number; radius: number };

/**
 * The advisor.
 *
 * **A face is a photograph** (I4). Initials on a coloured disc is a fallback
 * state, not a substitute - a screen built from one is visibly missing what
 * the board had.
 *
 * **No fill under the image.** The frame carried a grey ground so an emptied
 * frame would paint something, but the component is never emptied — it has one
 * child — and the ground cost a second step of 41.8%, the same 41.8% the
 * photograph then repainted. One event, one beat (I9).
 *
 * The `Image` carries a numeric size: absolute insets alone make it paint
 * nothing, silently (RULES Part 7).
 */
export function Portrait({ margin, height, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, borderRadius: radius, overflow: 'hidden' }}>
      <Image
        source={advisor.image}
        style={{ width: '100%', height }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}
