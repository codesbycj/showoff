import { Pressable, View } from 'react-native';

import { keys } from '../data/swap';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; cols: number };

/**
 * The numeric pad.
 *
 * **This is the block that absorbs the screen's slack** (see `layout.ts`): its
 * height comes from the layout as the remainder, and the rows divide it. A
 * keypad is the right block to give that job to, because taller keys are
 * better keys — unlike padding, which is what I3 forbids.
 *
 * Each key's visual box is an inner `View`: a `Pressable` function style is
 * dropped in a static render and the key would lose its height (Part 7).
 */
export function Keypad({ margin, height, cols }: Props) {
  const rows = Math.ceil(keys.length / cols);
  const rowH = height / rows;

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {keys.map((k) => (
        <Pressable
          key={k.id}
          accessibilityRole="button"
          accessibilityLabel={k.label}
          style={{ width: `${100 / cols}%`, height: rowH }}
        >
          {({ pressed }) => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.45 : 1,
              }}
            >
              {k.kind === 'back' ? (
                <Glyph name="backspace" size={26} color={ct.ink} strokeWidth={1.8} />
              ) : (
                <T variant="key">{k.label}</T>
              )}
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}
