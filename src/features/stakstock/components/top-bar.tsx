import { Pressable, View } from 'react-native';

import { stock } from '../data/stock';
import { HEADER_SIZE } from '../layout';
import { radius, sk, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/** The way back, which stock this is, and its alert. */
export function TopBar({ onBack }: { onBack?: () => void }) {
  const disc = {
    width: HEADER_SIZE,
    height: HEADER_SIZE,
    borderRadius: radius.control,
    backgroundColor: sk.slab,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
        <View style={disc}>
          <Glyph name="back" size={19} tint={sk.ink} />
        </View>
      </Pressable>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <T variant="name" color={sk.ink} style={{ height: type.name.line }}>
          {stock.name}
        </T>
        <T variant="ticker" color={sk.muted} style={{ height: type.ticker.line }}>
          {stock.ticker}
        </T>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Alerts">
        <View style={disc}>
          <Glyph name="bell" size={19} tint={sk.ink} />
        </View>
      </Pressable>
    </View>
  );
}
