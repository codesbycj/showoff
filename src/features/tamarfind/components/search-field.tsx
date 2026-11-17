import { Pressable, View } from 'react-native';

import { search } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { SearchProps } from './_find-header-shared';

/**
 * The search field.
 *
 * A `Pressable`, not a `TextInput`: this showcase is filmed, not typed into,
 * and a focused input would put a blinking caret in every frame.
 */
export function SearchField({ height, margin }: SearchProps) {
  return (
    <Pressable
      accessibilityRole="search"
      accessibilityLabel={search.placeholder}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingLeft: 14,
            paddingRight: 8,
            borderRadius: height / 2,
            borderWidth: 1,
            borderColor: ct.fieldEdge,
            backgroundColor: ct.field,
            opacity: pressed ? 0.75 : 1,
          }}
        >
          {/* STEP 1.05 glyph
          <Glyph name="search" size={17} color={ct.sub} />
          */}
          {/* STEP 1.06 placeholder
          <T variant="placeholder" numberOfLines={1} style={{ flex: 1 }}>
            {search.placeholder}
          </T>
          */}
          {/* STEP 1.07 view
          <View style={{ width: 1, height: 20, backgroundColor: ct.fieldEdge }} />
          */}
          {/* STEP 1.08 glyph
          <View style={{ width: 30, alignItems: 'center' }}>
            <Glyph name="sliders" size={17} color={ct.ink} />
          </View>
          */}
        </View>
      )}
    </Pressable>
  );
}
