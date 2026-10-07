import { Pressable, Text, View } from 'react-native';

import { LEVEL, R, TYPE, ps } from '../theme';
import { type SymbolName } from '../symbols';
import { Symbol } from './symbol';

/**
 * The Send / Receive pair.
 *
 * The arrow inside is one glyph rotated — up-right for Send, down-left for
 * Receive. React Native rotates about an element's centre, which is exactly
 * what is wanted here: the glyph sits in a circular well and turns on its own
 * axis, so no amount of rotation moves it out of the well.
 */
export function ActionPill({
  icon,
  label,
  rotate = 0,
  onPress,
}: {
  icon: SymbolName;
  label: string;
  rotate?: number;
  onPress?: () => void;
}) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderRadius: R.full,
            backgroundColor: ps.surfaceLowest,
          },
          LEVEL.container,
        ]}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: R.full,
            backgroundColor: ps.surfaceLow,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol
            name={icon}
            size={20}
            color={ps.onSurface}
            style={{ transform: [{ rotate: `${rotate}deg` }] }}
          />
        </View>
        <Text style={[TYPE.labelLg, { color: ps.onSurface, fontWeight: undefined }]}>{label}</Text>
      </View>
    </Pressable>
  );
}
