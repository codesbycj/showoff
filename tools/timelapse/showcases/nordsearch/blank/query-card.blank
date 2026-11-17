import { Pressable, View } from 'react-native';

import { query } from '../data/search';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * What is being searched for: the place, the dates and the party.
 *
 * The visual box is an inner `View`: a `Pressable` whose style is a function
 * of `pressed` is dropped in a static render and loses its height and fill
 * (§7).
 */
export function QueryCard({ margin, height, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <Pressable accessibilityRole="search" accessibilityLabel={`${query.place}, ${query.meta}`}>
        <View
          style={{
            height,
            borderRadius: radius,
            backgroundColor: ct.surface,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            gap: 13,
            shadowColor: '#1C1B1A',
            shadowOpacity: 0.08,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
          }}
        >
          {/* STEP 1.10 glyph
          <Glyph name="search" size={19} color={ct.ink} strokeWidth={1.9} />
          */}
          <View>
            {/* STEP 1.11 place
            <T variant="queryPlace">{query.place}</T>
            */}
            {/* STEP 1.12 meta
            <T variant="queryMeta">{query.meta}</T>
            */}
          </View>
        </View>
      </Pressable>
    </View>
  );
}
