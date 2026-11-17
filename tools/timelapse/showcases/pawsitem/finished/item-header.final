import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { margin: number; height: number; onBack: () => void };

/** Back, save and share. */
export function ItemHeader({ margin, height, onBack }: Props) {
  const round = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ct.card,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack}>
        <View style={round}>
          <Glyph name="back" size={18} color={ct.ink} strokeWidth={2} />
        </View>
      </Pressable>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Save this product">
          <View style={round}>
            <Glyph name="heart" size={18} color={ct.ink} strokeWidth={1.8} />
          </View>
        </Pressable>

        <Pressable accessibilityRole="button" accessibilityLabel="Share this product">
          <View style={round}>
            <Glyph name="share" size={18} color={ct.ink} strokeWidth={1.8} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
