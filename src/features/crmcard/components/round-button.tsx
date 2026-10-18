import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { cc, radius, shadow } from '../theme';
import { Icon, type IconName } from './icon';

/**
 * A round white button with one glyph in it, used at three sizes on this
 * screen — the header's, the tool row's and the action row's.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the circle would lose its fill and its size in every harness shot.
 *
 * `dot` puts a small mark on the top-right, as a sibling rather than a child,
 * so the glyph's own centring is undisturbed.
 */
export function RoundButton({
  name,
  size,
  label,
  dot,
  onPress,
}: {
  name: IconName;
  size: number;
  label: string;
  dot?: boolean;
  onPress?: () => void;
}) {
  const [held, setHeld] = useState(false);

  return (
    <View>
      <Pressable
        onPress={onPress}
        onPressIn={() => setHeld(true)}
        onPressOut={() => setHeld(false)}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <View
          style={{
            width: size,
            height: size,
            borderRadius: radius.full,
            // MISTAKE 1.08 every button came in sitting low
            marginTop: 10,
            backgroundColor: cc.surface,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: held ? 0.75 : 1,
            ...shadow.soft,
          }}
        >
          <Icon name={name} size={size * 0.45} />
        </View>
      </Pressable>

      {dot ? (
        <View
          style={{
            position: 'absolute',
            right: 1,
            top: 1,
            width: 8,
            height: 8,
            borderRadius: radius.full,
            backgroundColor: cc.alert,
            borderWidth: 1.5,
            borderColor: cc.surface,
          }}
          pointerEvents="none"
        />
      ) : null}
    </View>
  );
}
