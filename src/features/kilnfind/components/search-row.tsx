import { Pressable, View } from 'react-native';

import { search } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/** The query, with filter and sort beside it. */
export function SearchRow({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin + 18,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <Glyph name="search" size={20} color={ct.ink} strokeWidth={1.8} />
      <View style={{ flex: 1 }}>
        <T variant="query">{search.query}</T>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Filter results"
        hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
      >
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="filter" size={19} color={ct.ink} strokeWidth={1.8} />
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sort results"
        hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
      >
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          {/* STEP 1.02 glyph
          <Glyph name="sort" size={19} color={ct.ink} strokeWidth={1.8} />
          */}
        </View>
      </Pressable>
    </View>
  );
}
