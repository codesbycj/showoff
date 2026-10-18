import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { HEADER_BUTTON } from '../layout';
import { ps, radius, shadow } from '../theme';
import { Icon, type IconName } from './icon';

/**
 * A round white button with one glyph in it.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the circle would lose its fill and its size in every harness shot.
 */
export function IconButton({
  name,
  onPress,
  accessibilityLabel,
  size = HEADER_BUTTON,
}: {
  name: IconName;
  onPress?: () => void;
  accessibilityLabel: string;
  size?: number;
}) {
  const [held, setHeld] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setHeld(true)}
      onPressOut={() => setHeld(false)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: radius.full,
          backgroundColor: ps.surface,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: held ? 0.75 : 1,
          ...shadow.soft,
        }}
      >
        <Icon name={name} size={size * 0.5} color={ps.text} />
      </View>
    </Pressable>
  );
}
