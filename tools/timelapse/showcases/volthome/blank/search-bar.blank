import { Pressable, View } from 'react-native';

import { search } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * The shop search.
 *
 * The visual box is an inner `View`: a `Pressable` whose style is a function
 * of `pressed` is dropped in a static render and loses its height and fill
 * (§7).
 */
export function SearchBar({ margin, height, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <Pressable accessibilityRole="search" accessibilityLabel={search.hint}>
        <View
          style={{
            height,
            borderRadius: radius,
            backgroundColor: ct.surface,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 18,
            gap: 11,
          }}
        >
          {/* STEP 1.06 glyph
          <Glyph name="search" size={19} color={ct.muted} strokeWidth={1.8} />
          */}
          {/* STEP 1.07 hint
          <T variant="searchHint" style={{ flex: 1 }}>
            {search.hint}
          </T>
          */}
        </View>
      </Pressable>
    </View>
  );
}
