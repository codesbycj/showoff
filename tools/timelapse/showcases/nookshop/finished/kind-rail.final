import { Pressable, ScrollView, View } from 'react-native';

import { kinds } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { margin: number; height: number; size: number };

/**
 * What kind of piece you are after.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its last mark at
 * the screen edge. `flexGrow: 0` is load-bearing - a ScrollView carries
 * `flexGrow: 1` and will eat every spare dp of the column into the rail.
 */
export function KindRail({ margin, height, size }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 12, alignItems: 'center' }}
    >
      {kinds.map((kind) => (
        <Pressable
          key={kind.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!kind.on }}
          accessibilityLabel={kind.label}
          hitSlop={{ top: 6, bottom: 6, left: 0, right: 0 }}
        >
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: kind.on ? ct.ink : ct.panel,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph
              name={kind.glyph}
              size={21}
              color={kind.on ? ct.onInk : ct.ink}
              strokeWidth={1.7}
            />
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
