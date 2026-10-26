import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy } from '../data/start';
import { SORT_HEIGHT, SORT_TOP } from '../layout';
import { ms, radius, type } from '../theme';
import { T } from './text';

/**
 * How the list is ordered, and the one view toggle.
 *
 * Both are real 38dp targets rather than labels: the reference's sort control
 * is a line of text with a chevron, which is a 17dp target on a screen where
 * everything else clears 40.
 */
export function SortRow({ onSort, onView }: { onSort?: () => void; onView?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SORT_TOP }}>
{/* STEP 1.13 the order
      <Pressable onPress={onSort} accessibilityRole="button" accessibilityLabel={copy.sortBy}>
        <View
          style={{
            height: SORT_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            borderRadius: radius.chip,
            backgroundColor: ms.well,
          }}
        >
          <T variant="filter" color={ms.muted} style={{ height: type.filter.line }}>
            {copy.sortBy}
          </T>
          <Svg width={13} height={13} viewBox="0 0 24 24" style={{ marginLeft: 5 }}>
            <Path
              d="m7 10 5 5 5-5"
              stroke={ms.muted}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      </Pressable>
*/}

      <View style={{ flex: 1 }} />

{/* STEP 1.14 and the view
      <Pressable onPress={onView} accessibilityRole="button" accessibilityLabel="Change the view">
        <View
          style={{
            width: SORT_HEIGHT,
            height: SORT_HEIGHT,
            borderRadius: radius.chip,
            backgroundColor: ms.well,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24">
            <Path
              d="M5 7h14M5 12h14M5 17h9"
              stroke={ms.ink}
              strokeWidth={1.9}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </Pressable>
*/}
    </View>
  );
}
