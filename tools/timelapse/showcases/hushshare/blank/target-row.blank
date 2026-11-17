import { Pressable, View } from 'react-native';

import { targets } from '../data/share';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; tile: number; height: number };

/**
 * Where the session can go.
 *
 * **Generic destinations, drawn** (I1 / I4): the board names Instagram, and
 * that mark is not ours to ship. Each tile is its own `Pressable` sibling, and
 * each is well past the 44dp floor (I2 / R7).
 *
 * The row centres its children. Left to stretch, the tiles sat 21dp below the
 * row's own top and 4dp above its bottom, which `dockcheck.js` reads as a bar
 * with its ink piled to one side - the defect I11 exists to catch.
 */
export function TargetRow({ margin, tile, height }: Props) {
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
      {targets.map((target) => (
        <Pressable key={target.id} accessibilityRole="button" accessibilityLabel={target.label}>
          <View style={{ alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: tile,
                height: tile,
                borderRadius: tile / 2,
                backgroundColor: ct.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name={target.icon} size={21} color={ct.onDark} strokeWidth={1.6} />
            </View>

            <T variant="target">{target.label}</T>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
