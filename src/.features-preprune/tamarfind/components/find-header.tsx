import { Pressable, View } from 'react-native';

import { brand, categories, search } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { BarProps } from './_find-header-shared';

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
