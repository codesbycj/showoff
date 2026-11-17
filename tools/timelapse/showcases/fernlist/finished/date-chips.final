import { Pressable, ScrollView, View } from 'react-native';

import { ranges } from '../data/list';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * When to go.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its last range
 * at the screen edge, and a wrap layout physically cannot reproduce that — it
 * would either fold the chip onto a second line or report `OFFSCREEN`.
 *
 * `flexGrow: 0` is load-bearing: a `ScrollView` carries `flexGrow: 1` and will
 * happily eat every spare dp of the column into the rail, which is a hole the
 * deck below should have had.
 */
export function DateChips({ margin, height, radius }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
    >
      {ranges.map((range) => (
        <Pressable
          key={range.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!range.on }}
          accessibilityLabel={range.label}
        >
          <View
            style={{
              height,
              paddingHorizontal: 16,
              borderRadius: radius,
              backgroundColor: range.on ? ct.forest : ct.white,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Glyph
              name="days"
              size={16}
              color={range.on ? ct.white : ct.limeDeep}
              strokeWidth={1.7}
            />
            <T variant={range.on ? 'chipOn' : 'chip'}>{range.label}</T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
