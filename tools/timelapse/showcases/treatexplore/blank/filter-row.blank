import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { filters } from '../data/explore';
import { FILTER_BADGE, FILTER_GAP, FILTER_HEIGHT, MARGIN } from '../layout';
import { radius, tr } from '../theme';
import { T } from './text';

type Filter = (typeof filters)[number];

/**
 * The explore filters, in a row that runs off the right edge.
 *
 * Each pill carries a badge rather than changing colour when it is on: a tick
 * for the one that is applied, a plus for the ones that can be added. That is
 * what the reference does, and it is also the clearer control — "Offers +"
 * says what tapping will do, where a grey pill does not.
 */
export function FilterRow({ onSelect }: { onSelect?: (f: Filter) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -MARGIN }}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: FILTER_GAP }}
    >
      {/* STEP 1.05 every filter
      {filters.map((f) => (
        <Pill key={f.key} filter={f} onPress={() => onSelect?.(f)} />
      ))}
      */}
    </ScrollView>
  );
}

function Pill({ filter, onPress }: { filter: Filter; onPress?: () => void }) {
  const on = filter.badge === 'check';

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={filter.label}>
      <View
        style={{
          height: FILTER_HEIGHT,
          // MISTAKE 1.07 the pills came in squeezed
          paddingVertical: 12,
          paddingLeft: 20,
          paddingRight: 7,
          borderRadius: radius.pill,
          backgroundColor: tr.well,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <T variant="filter" color={tr.ink}>
          {filter.label}
        </T>
        {/* STEP 1.06 and what tapping it does
        <View
          style={{
            width: FILTER_BADGE,
            height: FILTER_BADGE,
            borderRadius: radius.full,
            backgroundColor: on ? tr.action : tr.canvas,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {on ? <Tick /> : <Plus />}
        </View>
        */}
      </View>
    </Pressable>
  );
}

/** The applied mark. Drawn at 11dp, where an icon set's corners read as mush. */
function Tick() {
  return (
    <Svg width={12} height={10} viewBox="0 0 12 10">
      <Path
        d="M1 5 L4.4 8.4 L11 1.6"
        stroke={tr.onDark}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** The add mark. */
function Plus() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12">
      <Path d="M6 1 V11 M1 6 H11" stroke={tr.ink} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
