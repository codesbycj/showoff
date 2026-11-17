import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { margin: number; insetTop: number; onBack: () => void };

/**
 * The three controls the board floats over its map.
 *
 * Each disc is 44dp, which is the floor for a pressable (I2/R7), and each is a
 * **sibling** of the next rather than nested - a `role="button"` inside
 * another is torn apart by the static web build's HTML parser (RULES Part 7).
 */
export function MapControls({ margin, insetTop, onBack }: Props) {
  const disc = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ct.white,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: insetTop,
        left: margin,
        right: margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack}>
        <View style={disc}>
          <Glyph name="back" size={18} color={ct.ink} strokeWidth={1.9} />
        </View>
      </Pressable>

      <View style={{ gap: 10 }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Zoom in">
          <View style={disc}>
            <Glyph name="zoomIn" size={18} color={ct.ink} strokeWidth={1.8} />
          </View>
        </Pressable>

        <Pressable accessibilityRole="button" accessibilityLabel="Zoom out">
          <View style={disc}>
            <Glyph name="zoomOut" size={18} color={ct.ink} strokeWidth={1.8} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
