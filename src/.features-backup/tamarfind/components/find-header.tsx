import { Pressable, View } from 'react-native';

import { brand, categories, search } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type BarProps = { height: number; margin: number; control: number };

/** The mark and the bell. The board sets an Arabic lockup beside the latin
 *  wordmark; Plus Jakarta Sans carries no Arabic glyphs, so rendering it would
 *  come out as tofu on Android — the class of failure §4.4 says to design out.
 *  Named in the handover. */
export function FindHeader({ height, margin, control }: BarProps) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
        <Glyph name="runner" size={22} color={ct.accent} />
        <T variant="wordmark">{brand.name}</T>
      </View>

      <Pressable hitSlop={6} accessibilityRole="button" accessibilityLabel="Notifications">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              borderRadius: control / 2,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: ct.fieldEdge,
              backgroundColor: ct.white,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="bell" size={18} color={ct.ink} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

type SearchProps = { height: number; margin: number };

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
          <Glyph name="search" size={17} color={ct.sub} />
          <T variant="placeholder" numberOfLines={1} style={{ flex: 1 }}>
            {search.placeholder}
          </T>
          <View style={{ width: 1, height: 20, backgroundColor: ct.fieldEdge }} />
          <View style={{ width: 30, alignItems: 'center' }}>
            <Glyph name="sliders" size={17} color={ct.ink} />
          </View>
        </View>
      )}
    </Pressable>
  );
}

type TitleProps = { height: number; margin: number };

/** "Category". */
export function CategoryTitle({ height, margin }: TitleProps) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <Glyph name="layers" size={15} color={ct.accent} />
      <T variant="sectionTitle">{categories.title}</T>
    </View>
  );
}
