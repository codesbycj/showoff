import { Pressable, View } from 'react-native';

import { actions } from '../data/home';
import { ct } from '../theme';
import { Folder } from './folder';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; gap: number };

/**
 * The four things the account can do.
 *
 * Each tile is a `Folder` so the row carries the board's notched shape, and
 * each is its own `Pressable` **sibling** - a `role="button"` inside another
 * is torn apart by the static web build's HTML parser (RULES Part 7).
 */
export function ActionRow({ margin, width, height, gap }: Props) {
  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', gap }}>
      {actions.map((action) => (
        <Pressable key={action.id} accessibilityRole="button" accessibilityLabel={action.label}>
          <Folder width={width} height={height} fill={ct.card} radius={16} notchW={18} notchH={10}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Glyph name={action.icon} size={21} color={ct.ink} strokeWidth={1.6} />
              <T variant="action">{action.label}</T>
            </View>
          </Folder>
        </Pressable>
      ))}
    </View>
  );
}
