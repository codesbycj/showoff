import { Pressable, View } from 'react-native';

import { banner } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { BlockProps } from './_start-parts-shared';

/** The rewards banner. A pill, not a brush stroke: the board's is a painted
 *  shape in its artboard, and tracing it would be copying an arrangement
 *  rather than expressing an idea (§2.5). */
export function JoinBanner({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center' }}>
      <Pressable
        hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={banner.label}
      >
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              height,
              paddingHorizontal: 16,
              borderRadius: height / 2,
              backgroundColor: ct.pill,
              opacity: pressed ? 0.75 : 1,
            }}
          >
            {/* STEP 1.02 glyph
            <Glyph name="crown" size={15} color={ct.ink} />
            */}
            {/* STEP 1.03 label
            <T variant="banner">{banner.label}</T>
            */}
          </View>
        )}
      </Pressable>
    </View>
  );
}
