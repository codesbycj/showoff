import { Pressable, View } from 'react-native';

import { CLUSTER, STICKERS, type Sticker } from '../data/onboarding';
import { MoodFace } from './mood-faces';

/**
 * The seven characters, arranged.
 *
 * Each sticker is its own `Pressable` so the screen can decide where a tap
 * goes — the cluster reports which character was hit and nothing more.
 *
 * The rotation sits on an inner `View`, not on the `Pressable`. Two reasons,
 * and both have cost time before: a `Pressable` with a function style drops
 * that style entirely in a static render, so anything visual on it vanishes
 * from the harness; and React Native rotates about an element's centre whatever
 * `transformOrigin` says, which is exactly what these want — each is a whole
 * badge tilted in place — but only if the rotated box is the badge itself
 * rather than a stretched touch target.
 *
 * The box does not clip. Three characters hang off its edges by design, and
 * `overflow: 'hidden'` here would shave them on Android while the web harness
 * showed them intact.
 */
export function StickerCluster({ onSelect }: { onSelect?: (s: Sticker) => void }) {
  return (
    <View
      style={{
        width: CLUSTER.width,
        height: CLUSTER.height,
        alignSelf: 'center',
        position: 'relative',
      }}
    >
      {STICKERS.map((s) => (
        <Pressable
          key={s.key}
          onPress={() => onSelect?.(s)}
          style={{
            position: 'absolute',
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            width: s.width,
            height: s.height,
            zIndex: s.z ?? 1,
          }}
        >
          <View style={{ transform: [{ rotate: `${s.rotate}deg` }] }}>
            <MoodFace kind={s.key} width={s.width} height={s.height} />
          </View>
        </Pressable>
      ))}
    </View>
  );
}
