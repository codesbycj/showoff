import { Pressable, ScrollView, View } from 'react-native';

import { filters, selectedFilter } from '../data/brands';
import { FILTER_GAP, FILTER_HEIGHT, MARGIN } from '../layout';
import { ml, radius } from '../theme';
import { T } from './text';

type Filter = (typeof filters)[number];

/**
 * The partner categories, in a row that runs off the right edge.
 *
 * A horizontal scroll and not a wrap: the reference clips the last pill at the
 * screen edge, and a wrap layout physically cannot reproduce that (AGENTS.md,
 * "Verifying pixel accuracy").
 */
export function FilterRow({ onSelect }: { onSelect?: (f: Filter) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -MARGIN }}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: FILTER_GAP }}
    >
      {/* STEP 1.13 every category
      {filters.map((f) => (
        <Pill key={f.key} filter={f} onPress={() => onSelect?.(f)} />
      ))}
      */}
    </ScrollView>
  );
}

function Pill({ filter, onPress }: { filter: Filter; onPress?: () => void }) {
  const on = filter.key === selectedFilter;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={filter.label}>
      <View
        style={{
          // MISTAKE 1.21 the pills came in dropped
          marginTop: 14,
          height: FILTER_HEIGHT,
          paddingHorizontal: 17,
          borderRadius: radius.pill,
          backgroundColor: on ? ml.surface : ml.glass,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="filter" color={on ? ml.ink : ml.onCanvas}>
          {filter.label}
        </T>
      </View>
    </Pressable>
  );
}
