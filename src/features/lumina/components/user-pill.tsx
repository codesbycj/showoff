import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { FONT, ll } from '../theme';

/**
 * The greeting pill in the home screen's top-left — avatar, "Hello, Tommy!" and
 * a disclosure chevron, on a translucent white capsule.
 *
 * The two halves of the greeting are one `Text` with a nested `Text` for the
 * name, so the bold name sits on the same baseline as the light greeting
 * instead of in a second flex child that would have to be aligned by hand.
 */
export function UserPill({
  greeting,
  name,
  photo,
  onPress,
}: {
  greeting: string;
  name: string;
  photo: number;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderRadius: 999,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.05)',
          paddingLeft: 4,
          paddingRight: 14,
          paddingVertical: 4,
          shadowColor: '#23361e',
          shadowOpacity: 0.05,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 1 },
          elevation: 1,
        }}
      >
        <Image
          source={photo}
          style={{ width: 32, height: 32, borderRadius: 16, marginRight: 8 }}
          contentFit="cover"
        />

        <Text
          style={{
            fontFamily: FONT.semibold,
            fontSize: 14,
            lineHeight: 20,
            letterSpacing: -0.35,
            color: ll.ink,
            marginRight: 6,
          }}
        >
          {greeting} <Text style={{ fontFamily: FONT.bold }}>{name}</Text>
        </Text>

        <Icon name="chevronDown" size={12} color={ll.subtle} strokeWidth={2.5} />
      </View>
    </Pressable>
  );
}
