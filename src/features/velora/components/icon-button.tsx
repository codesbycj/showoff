import { Pressable, View } from 'react-native';

import { Icon, type IconName } from './icon';
import { ICON_BUTTON } from '../layout';
import { radius, vl } from '../theme';

/**
 * A square control with one glyph in it — the two in the header.
 *
 * The visual box is on an inner `View`, not on the `Pressable`. A `Pressable`
 * given a function style (`style={({ pressed }) => ...}`) renders with no style
 * at all in a static web render, which is what the preview harness takes: the
 * button silently loses its size and its fill and the header collapses. Keeping
 * the box inside means the press state can be added later without any of that
 * mattering.
 */
export function IconButton({
  name,
  onPress,
  dark = false,
  label,
}: {
  name: IconName;
  onPress?: () => void;
  /** The bag, which is filled rather than outlined. */
  dark?: boolean;
  label: string;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: ICON_BUTTON,
          height: ICON_BUTTON,
          // A circle, like the reference. The squircle a first pass used
          // fought the rounded language of everything below it.
          borderRadius: radius.full,
          backgroundColor: dark ? vl.pill : vl.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={name} size={20} color={dark ? vl.onPill : vl.ink} />
      </View>
    </Pressable>
  );
}
