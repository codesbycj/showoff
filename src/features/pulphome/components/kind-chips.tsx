import { Pressable, ScrollView, View } from 'react-native';

import { kinds } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * The categories.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its third chip
 * at the screen edge, which is what tells you the row scrolls. `flexGrow: 0`
 * keeps it from eating the column's slack.
 */
export function KindChips({ margin, height, radius }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
    >
      {kinds.map((kind) => (
        <Pressable key={kind.id} accessibilityRole="button" accessibilityLabel={kind.label}>
          <View
            style={{
              height,
              borderRadius: radius,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              backgroundColor: ct.white,
              borderWidth: kind.on ? 1.4 : 0,
              borderColor: ct.ink,
            }}
          >
            <Glyph name={kind.icon} size={16} color={ct.ink} strokeWidth={1.6} />
            <T variant="chip">{kind.label}</T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
