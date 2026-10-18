import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { FAB_SIZE } from '../layout';
import { radius, sg, shadow } from '../theme';
import { Icon } from './icon';

/**
 * The one thing this screen adds: another journey.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the circle would lose its fill and its size in every harness shot.
 */
export function AddButton({ onPress }: { onPress?: () => void }) {
  const [held, setHeld] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setHeld(true)}
      onPressOut={() => setHeld(false)}
      accessibilityRole="button"
      accessibilityLabel="New journey"
    >
      <View
        style={{
          width: FAB_SIZE,
          height: FAB_SIZE,
          borderRadius: radius.full,
          backgroundColor: sg.fab,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: held ? 0.86 : 1,
          ...shadow.fab,
        }}
      >
        <Icon name="plus" size={24} color={sg.onFab} strokeWidth={2.2} />
      </View>
    </Pressable>
  );
}
