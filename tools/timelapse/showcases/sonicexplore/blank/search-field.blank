import { Pressable, View } from 'react-native';

import { search } from '../data/explore';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { SearchProps } from './_explore-parts-shared';

/**
 * The search field.
 *
 * A `Pressable`, not a `TextInput`: this showcase is filmed, not typed into,
 * and a focused input would put a blinking caret in every frame.
 */
export function SearchField({ margin, height }: SearchProps) {
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
            paddingHorizontal: 16,
            borderRadius: height / 2,
            borderWidth: 1,
            borderColor: ct.cardEdge,
            backgroundColor: ct.card,
            opacity: pressed ? 0.8 : 1,
          }}
        >
          {/* STEP 1.02 placeholder
          <T variant="placeholder" style={{ flex: 1 }}>
            {search.placeholder}
          </T>
          */}
          {/* STEP 1.03 glyph
          <Glyph name="search" size={17} color={ct.sub} />
          */}
        </View>
      )}
    </Pressable>
  );
}
