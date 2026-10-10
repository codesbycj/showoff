import { Pressable, Text, View } from 'react-native';

import { Scan, Search } from './icons';
import { R, TYPE, dt } from '../theme';

/**
 * The tracking-number field in the hero.
 *
 * A 32dp white pill running the hero's full inner width — x 36..358 in the
 * reference, which is the 20dp of hero padding either side. It is a `Pressable`
 * rather than a `TextInput`: nothing is typed into it on camera, and a real
 * input would bring up a keyboard the moment the recording taps it.
 *
 * Both glyphs are larger than they look: the magnifier's ink measures 18dp
 * across and the scan disc is 27dp in a 32dp field, with its own glyph at 22.
 * They fill the field rather than floating in it.
 */
export function TrackingField({
  placeholder,
  onPress,
  onScan,
}: {
  placeholder: string;
  onPress?: () => void;
  onScan?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="search" accessibilityLabel={placeholder}>
      <View
        style={{
          height: 32,
          borderRadius: R.full,
          backgroundColor: dt.surface,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 9.5,
          paddingRight: 3,
        }}
      >
        <Search size={25} color={dt.ink} />

        <Text style={[TYPE.body, { color: dt.subtle, marginLeft: 7.5, flex: 1 }]}>
          {placeholder}
        </Text>

        <Pressable onPress={onScan} accessibilityRole="button" accessibilityLabel="Scan a label">
          <View
            style={{
              width: 27,
              height: 27,
              borderRadius: 13.5,
              borderWidth: 1,
              borderColor: dt.hairline,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Scan size={22} color={dt.ink} />
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
}
