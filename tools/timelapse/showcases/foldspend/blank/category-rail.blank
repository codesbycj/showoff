import { Pressable, ScrollView, View } from 'react-native';

import { categories, money } from '../data/activity';
import { ct } from '../theme';
import { Folder } from './folder';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; gap: number };

/**
 * Where the spending went.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its third tile
 * at the screen edge, which is what tells you the row scrolls. `flexGrow: 0`
 * keeps it from eating the column's slack.
 *
 * The four values are a breakdown of the chart's own total, so the row and the
 * figure above it cannot disagree (R9).
 */
export function CategoryRail({ margin, width, height, gap }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap }}
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          accessibilityRole="button"
          accessibilityLabel={`${category.label}, ${money(category.value)}`}
        >
          <Folder width={width} height={height} fill={ct.card} radius={18} notchW={26} notchH={14}>
            <View style={{ flex: 1, padding: 14, paddingTop: 20, justifyContent: 'space-between' }}>
              <Glyph name={category.icon} size={20} color={ct.ink} strokeWidth={1.6} />
              <View>
                <T variant="catLabel" numberOfLines={1}>
                  {category.label}
                </T>
                <T variant="catValue">{money(category.value)}</T>
              </View>
            </View>
          </Folder>
        </Pressable>
      ))}
    </ScrollView>
  );
}
