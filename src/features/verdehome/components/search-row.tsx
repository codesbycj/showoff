import { Pressable, View } from 'react-native';

import { search } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * The search field and the filter control.
 *
 * The visual box is an inner `View`: a `Pressable` whose style is a function
 * of `pressed` is dropped in a static render and loses its height and fill
 * (§7).
 */
export function SearchRow({ margin, height, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', gap: 10 }}>
      {/* STEP 1.06 hint
      <Pressable accessibilityRole="search" accessibilityLabel={search.hint} style={{ flex: 1 }}>
        <View
          style={{
            height,
            borderRadius: radius,
            borderWidth: 1.5,
            borderColor: ct.line,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 18,
            gap: 11,
          }}
        >
          <Glyph name="search" size={19} color={ct.muted} strokeWidth={1.8} />
          <T variant="searchHint" style={{ flex: 1 }}>
            {search.hint}
          </T>
        </View>
      </Pressable>
      */}

      {/* STEP 1.07 "Filters"
      <Pressable accessibilityRole="button" accessibilityLabel="Filters">
        <View
          style={{
            width: height,
            height,
            borderRadius: radius,
            backgroundColor: ct.dark,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="filter" size={19} color={ct.onDark} strokeWidth={1.8} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
