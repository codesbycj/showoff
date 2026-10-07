import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { FONT, LEVEL, ll } from '../theme';

/**
 * The library's search well.
 *
 * A `Pressable` showing placeholder text rather than a `TextInput`, for the
 * same reason as the chat composer: the recording never types into it, and a
 * real input would put a caret in every frame.
 */
export function SearchField({
  placeholder,
  onPress,
}: {
  placeholder: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="search">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            height: 48,
            borderRadius: 16,
            paddingHorizontal: 16,
            backgroundColor: ll.surface,
            borderWidth: 1,
            borderColor: 'rgba(232,239,227,0.7)',
          },
          LEVEL.card,
        ]}
      >
        <Icon name="search" size={16} color={ll.muted} strokeWidth={2.2} />
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 13.5,
            lineHeight: 20,
            color: ll.subtle,
            marginLeft: 12,
          }}
        >
          {placeholder}
        </Text>
      </View>
    </Pressable>
  );
}
