import { Search } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, alpha, vy } from '../theme';

/**
 * The "Where would you like to go?" capsule.
 *
 * A pressable row rather than a `TextInput`, on the same reasoning as every
 * other search field here: there is no results screen behind it, and a live
 * input would raise the keyboard mid-take over the half of the screen the
 * recording is about.
 *
 * The export positions the icon absolutely at `left-4` and starts the text at
 * `pl-11`. That is rebuilt as a flex row — 16dp of padding, a 16dp glyph, then
 * 12dp of gap — which puts the text at the same 44dp and survives the row
 * growing, which an absolute offset would not.
 */
export function SearchField({
  placeholder,
  onPress,
}: {
  placeholder: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: alpha(vy.white, 0.35),
          borderRadius: R.full,
          paddingVertical: 12,
          paddingLeft: 16,
          paddingRight: 16,
          shadowColor: vy.ink,
          shadowOpacity: 0.05,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 1 },
          elevation: 1,
        }}
      >
        <Search size={16} color={alpha(vy.ink, 0.6)} strokeWidth={2.25} />
        <Text
          style={{
            marginLeft: 12,
            fontFamily: FONT.medium,
            fontSize: 12,
            lineHeight: 16,
            color: alpha(vy.ink, 0.65),
          }}
        >
          {placeholder}
        </Text>
      </View>
    </Pressable>
  );
}
