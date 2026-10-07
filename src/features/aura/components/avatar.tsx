import { Image } from 'expo-image';
import { View } from 'react-native';

import { au } from '../theme';

/**
 * The account photo, with an optional status dot.
 *
 * The dot overhangs the circle's edge, so nothing on the path down to it may
 * clip — the image is clipped by its own `borderRadius` rather than by a parent
 * with `overflow: 'hidden'`, which would cut the dot off with it.
 */
export function Avatar({
  source,
  size = 48,
  dot,
  ring,
}: {
  source: number;
  size?: number;
  dot?: boolean;
  ring?: string;
}) {
  const d = size * 0.29;
  return (
    <View>
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: ring ? 3 : 0,
          borderColor: ring ?? 'transparent',
          backgroundColor: au.surfaceHigh,
        }}
        contentFit="cover"
        transition={0}
      />
      {dot ? (
        <View
          style={{
            position: 'absolute',
            right: -1,
            bottom: -1,
            width: d,
            height: d,
            borderRadius: d / 2,
            backgroundColor: au.secondaryBright,
            borderWidth: 2,
            borderColor: au.surface,
          }}
        />
      ) : null}
    </View>
  );
}
