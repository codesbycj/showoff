import { Search } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, SP, vt } from '../theme';

/**
 * The search capsule.
 *
 * It is a pressable row rather than a `TextInput`. The export has no results
 * screen behind it, so nothing can be typed *into*; and a live input would open
 * the keyboard on the emulator mid-take, which would cover the half of the
 * screen the recording is about. It takes `onPress` so a screen can still send
 * it somewhere once there is somewhere to send it.
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
          backgroundColor: vt.card,
          borderWidth: 1,
          borderColor: vt.lineStrong,
          borderRadius: R.full,
          paddingVertical: 10,
          paddingLeft: 14,
          paddingRight: SP.md,
          shadowColor: vt.ink,
          shadowOpacity: 0.04,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 1 },
          elevation: 1,
        }}
      >
        <Search size={20} color={vt.faint} strokeWidth={2} />
        <Text
          style={{
            marginLeft: 10,
            fontFamily: FONT.medium,
            fontSize: 12,
            lineHeight: 16,
            color: vt.faint,
          }}
        >
          {placeholder}
        </Text>
      </View>
    </Pressable>
  );
}
