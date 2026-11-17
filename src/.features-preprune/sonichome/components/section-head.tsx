import { Image, Pressable, ScrollView, View } from 'react-native';

import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

import { HeadProps } from './_home-parts-shared';

/** A section heading and its "See all". */
export function SectionHead({ margin, height, title, more }: HeadProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="sectionTitle">{title}</T>
      <Pressable
        hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={`${more}, ${title}`}
      >
        {({ pressed }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, opacity: pressed ? 0.6 : 1 }}>
            <T variant="sectionMore">{more}</T>
            <Glyph name="chevronRight" size={13} color={ct.sub} strokeWidth={2} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
