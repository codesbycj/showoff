import { Image } from 'expo-image';
import { View } from 'react-native';

import { jf } from '../theme';

/**
 * A circular portrait, optionally ringed and optionally carrying a status dot.
 *
 * The dot overhangs the circle's edge, so nothing on the path down to it may
 * clip — the image is clipped by its own `borderRadius` rather than by a parent
 * with `overflow: 'hidden'`, which would take the dot off with it.
 */
export function Avatar({
  source,
  size = 44,
  ring = 0,
  ringTone = jf.card,
  dot,
  onPress,
}: {
  source: number;
  size?: number;
  ring?: number;
  ringTone?: string;
  /** The online pip. Green on the feed and the profile header. */
  dot?: string;
  onPress?: () => void;
}) {
  const inner = size - ring * 2;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: ring || undefined,
        borderColor: ring ? ringTone : undefined,
        backgroundColor: jf.hairline,
      }}
      onTouchEnd={onPress}
    >
      <Image
        source={source}
        style={{ width: inner, height: inner, borderRadius: inner / 2 }}
        contentFit="cover"
        transition={0}
      />
      {dot ? (
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: dot,
            borderWidth: 2,
            borderColor: ringTone,
          }}
        />
      ) : null}
    </View>
  );
}
