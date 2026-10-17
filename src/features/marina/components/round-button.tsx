import { Pressable, View } from 'react-native';

import { Icon, type IconName } from './icon';
import { radius, shadow, mr } from '../theme';

/**
 * A circular control with one glyph in it — the hero's back and favourite, and
 * the agent's message and call.
 *
 * The visual box is on an inner `View`, not on the `Pressable`. A `Pressable`
 * given a function style (`style={({ pressed }) => ...}`) renders with no
 * style at all in a static web render, which is what the preview harness
 * takes: the button silently loses its size and its fill. Keeping the box
 * inside means a press state can be added later without any of that mattering.
 */
export function RoundButton({
  name,
  label,
  size,
  onPress,
  color = mr.ink,
  filled = false,
  /** Over the hero the buttons are solid white and lifted; in the body they are outlined. */
  variant = 'solid',
}: {
  name: IconName;
  label: string;
  size: number;
  onPress?: () => void;
  color?: string;
  filled?: boolean;
  variant?: 'solid' | 'outline';
}) {
  const solid = variant === 'solid';
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: radius.circle,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: solid ? mr.surface : 'transparent',
          borderWidth: solid ? 0 : 1,
          borderColor: mr.rule,
          ...(solid ? shadow.round : null),
        }}
      >
        <Icon name={name} size={size * 0.44} color={color} filled={filled} />
      </View>
    </Pressable>
  );
}
