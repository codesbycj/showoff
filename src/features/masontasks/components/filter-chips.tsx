import { Pressable, ScrollView, View } from 'react-native';

import { copy, counts } from '../data/start';
import { CHIP_HEIGHT, CHIPS_TOP, MARGIN } from '../layout';
import { ms, radius, type } from '../theme';
import { T } from './text';

/** One filter. The whole 40dp chip is the target. */
function Chip({
  label,
  count,
  on,
  onPress,
}: {
  label: string;
  count: number;
  on: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      accessibilityLabel={label + ', ' + count}
    >
      <View
        style={{
          height: CHIP_HEIGHT,
          marginRight: 8,
          paddingHorizontal: 16,
          borderRadius: radius.chip,
          backgroundColor: on ? ms.panel : ms.well,
          alignItems: 'center',
          // MISTAKE 1.25 the chips came in half-faded
          opacity: 0.5,
          justifyContent: 'center',
        }}
      >
        <T variant="filter" color={on ? ms.onPanel : ms.muted} style={{ height: type.filter.line }}>
          {label + ' (' + count + ')'}
        </T>
      </View>
    </Pressable>
  );
}

/**
 * Which tasks to show.
 *
 * Every count is derived from the list. The reference shows All (24),
 * In Progress (6) and Completed (12) — 6 and 12 is 18, not 24 — which is what
 * happens when the numbers beside a filter are typed rather than counted.
 *
 * A horizontal `ScrollView`, not a wrap: the reference's last chip is clipped
 * by the screen's edge and a wrap layout physically cannot reproduce that.
 */
export function FilterChips({ picked, onPick }: { picked: string; onPick?: (id: string) => void }) {
  return (
    <View style={{ marginTop: CHIPS_TOP }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN }}
      >
{/* STEP 1.08 all of them
        <Chip
          label={copy.all}
          count={counts.all}
          on={picked === 'all'}
          onPress={() => onPick?.('all')}
        />
*/}
{/* STEP 1.09 the open ones
        <Chip
          label={copy.inProgress}
          count={counts.inProgress}
          on={picked === 'progress'}
          onPress={() => onPick?.('progress')}
        />
*/}
{/* STEP 1.10 and the done
        <Chip
          label={copy.completed}
          count={counts.completed}
          on={picked === 'done'}
          onPress={() => onPick?.('done')}
        />
*/}
      </ScrollView>
    </View>
  );
}
