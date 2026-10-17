import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { HEADER_BUTTON } from '../layout';
import { radius, shadow, vs } from '../theme';
import { Icon, type IconName } from './icon';

/**
 * A round button with one glyph in it — the two either side of the title.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the circle would lose its fill and its size in every harness shot. The
 * pressed state is `useState` driven instead, which renders as a plain style
 * object and still gives a real one.
 */
export function IconButton({
  name,
  onPress,
  accessibilityLabel,
}: {
  name: IconName;
  onPress?: () => void;
  accessibilityLabel: string;
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
          width: HEADER_BUTTON,
          height: HEADER_BUTTON,
          borderRadius: radius.full,
          backgroundColor: vs.surface,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: held ? 0.75 : 1,
          ...shadow.soft,
        }}
      >
        <Icon name={name} size={19} color={vs.ink} />
      </View>
    </Pressable>
  );
}
