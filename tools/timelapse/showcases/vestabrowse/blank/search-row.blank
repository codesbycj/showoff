import { Pressable, View } from 'react-native';

import { search } from '../data/browse';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; margin: number };

/**
 * The search field, and the filter button beside it.
 *
 * The field is a `Pressable`, not a `TextInput`: this showcase is filmed, not
 * typed into, and a focused input would put a blinking caret in every frame of
 * the recording.
 *
 * The filter button is lime with **ink** on it. Lime carries text nowhere on
 * this board — lime on white is 1.6:1 and fails R4 — so it is only ever a fill.
 */
export function SearchRow({ height, margin }: Props) {
  return (
    <View style={{ height, marginHorizontal: margin, flexDirection: 'row', gap: 10 }}>
      {/* STEP 1.02 placeholder
      <Pressable
        accessibilityRole="search"
        accessibilityLabel={search.placeholder}
        style={{ flex: 1 }}
      >
        {({ pressed }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: 16,
              borderRadius: height / 2,
              borderWidth: 1,
              borderColor: ct.fieldEdge,
              backgroundColor: ct.field,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="search" size={18} color={ct.sub} />
            <T variant="placeholder">{search.placeholder}</T>
          </View>
        )}
      </Pressable>
      */}

      {/* STEP 1.03 "Filters"
      <Pressable accessibilityRole="button" accessibilityLabel="Filters">
        {({ pressed }) => (
          <View
            style={{
              width: height,
              height,
              borderRadius: height / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.accent,
              opacity: pressed ? 0.8 : 1,
            }}
          >
            <Glyph name="sliders" size={20} color={ct.accentInk} strokeWidth={2} />
          </View>
        )}
      </Pressable>
      */}
    </View>
  );
}
