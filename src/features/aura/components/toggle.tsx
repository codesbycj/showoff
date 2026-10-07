import { Pressable, View } from 'react-native';

import { au } from '../theme';

/**
 * A switch.
 *
 * The knob is placed with `alignSelf` on a padded track rather than an absolute
 * `left`, so its travel is always the track minus the knob minus the padding and
 * both rest positions stay symmetrical at any size.
 */
export function Toggle({
  on,
  width = 46,
  onPress,
}: {
  on?: boolean;
  width?: number;
  onPress?: () => void;
}) {
  const h = width * 0.57;
  const knob = h - 4;
  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <View
        style={{
          width,
          height: h,
          borderRadius: h / 2,
          backgroundColor: on ? au.primaryBright : au.surfaceHighest,
          padding: 2,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: knob,
            height: knob,
            borderRadius: knob / 2,
            backgroundColor: au.surfaceLowest,
            alignSelf: on ? 'flex-end' : 'flex-start',
          }}
        />
      </View>
    </Pressable>
  );
}
