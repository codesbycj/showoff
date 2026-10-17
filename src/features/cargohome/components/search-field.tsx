import { Pressable, View } from 'react-native';

import { Icon } from './icon';
import { T } from './text';
import { FIELD_HEIGHT } from '../layout';
import { radius, shadow, cg } from '../theme';

/**
 * The search field.
 *
 * Not a `TextInput`. Nothing on this screen is typed into, and a real input
 * would bring a caret, a keyboard on tap and a focus ring — three things to
 * suppress on a screen that is going to be filmed rather than used. It is a
 * button that *looks* like a field, labelled as one for a screen reader.
 *
 * It carries a shadow and no clip. `overflow: 'hidden'` and `elevation` on one
 * view is unreliable on Android, and there is nothing here to clip.
 */
export function SearchField({
  placeholder,
  onPress,
}: {
  placeholder: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={placeholder}>
      <View
        style={{
          height: FIELD_HEIGHT,
          borderRadius: radius.full,
          backgroundColor: cg.surface,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          gap: 12,
          ...shadow.field,
        }}
      >
        <Icon name="search" size={18} color={cg.placeholder} />
        <T variant="meta" color={cg.placeholder}>
          {placeholder}
        </T>
      </View>
    </Pressable>
  );
}
