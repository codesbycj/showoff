import { Pressable, View } from 'react-native';

import { company, screen } from '../data/stock';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { BarProps } from './_stock-head-shared';

/** Back, and the currency the screen is quoted in. */
export function StockBar({ height, margin, control, onBack }: BarProps) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Pressable hitSlop={8} onPress={onBack} accessibilityRole="button" accessibilityLabel="Back">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.6 : 1,
            }}
          >
            <Glyph name="back" size={20} color={ct.ink} />
          </View>
        )}
      </Pressable>

      <Pressable
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Currency, ${screen.currency}`}
      >
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              height: 30,
              paddingHorizontal: 8,
              borderRadius: 15,
              backgroundColor: ct.tile,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="flag" size={17} />
            <T variant="currency">{screen.currency}</T>
            <Glyph name="chevronDown" size={13} color={ct.sub} strokeWidth={2.1} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
