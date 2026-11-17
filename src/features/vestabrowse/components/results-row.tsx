import { Pressable, View } from 'react-native';

import { results } from '../data/browse';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; margin: number };

/**
 * How many results, and how they are ordered.
 *
 * **Mine, not the board's.** The board jumps from its chips straight to its
 * grid and never says what it is showing. A count and a sort are the two labels
 * a browse screen genuinely carries — both measurements, not prose (R5) — and
 * adding them is I3's lever rather than opening the rhythm out.
 *
 * The count comes from `data/browse.ts` so it cannot disagree with the grid.
 */
export function ResultsRow({ height, margin }: Props) {
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
      {/* STEP 1.11 t
      <T variant="sectionMore">{`${results.catalogue} items`}</T>
      */}

      {/* STEP 1.12 sort
      <Pressable
        hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={`${results.sortLabel}, ${results.sort}`}
      >
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              opacity: pressed ? 0.6 : 1,
            }}
          >
            <T variant="cardName">{results.sort}</T>
            <Glyph name="chevronDown" size={14} color={ct.sub} strokeWidth={2} />
          </View>
        )}
      </Pressable>
      */}
    </View>
  );
}
