import { Pressable, View } from 'react-native';

import { keys } from '../data/send';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; gap: number };

/**
 * The amount keypad.
 *
 * Each key is sized from the block it is given rather than from a fixed
 * number, so the pad fills whatever the layout leaves it (I2) — and every key
 * clears 44dp by a wide margin (R7).
 */
export function Keypad({ margin, height, gap }: Props) {
  const rows = 4;
  const keyH = (height - gap * (rows - 1)) / rows;

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap,
      }}
    >
      {keys.map((key) => (
        <Pressable
          key={key.id}
          accessibilityRole="button"
          accessibilityLabel={key.label}
          style={{ width: `${(100 - 6) / 3}%`, height: keyH }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: key.kind === 'back' ? ct.ink : ct.tray,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {key.kind === 'back' ? (
              <Glyph name="delete" size={22} color={ct.white} strokeWidth={1.8} />
            ) : (
              <T variant="key">{key.label}</T>
            )}
          </View>
        </Pressable>
      ))}
    </View>
  );
}
