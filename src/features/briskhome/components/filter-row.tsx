import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { filters } from '../data/start';
import { FILTER_HEIGHT, FILTER_TOP, MARGIN } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * Which kind of activity to show.
 *
 * A horizontal `ScrollView`, not a wrap. The reference's last chip is clipped
 * by the screen's right edge, and a wrap layout physically cannot reproduce
 * that (AGENTS.md, "A row that runs off the screen edge is a scrolling row").
 *
 * The selection is real state rather than a hard-coded index, so the chips
 * respond when the recording taps one.
 */
export function FilterRow() {
  const [at, setAt] = useState(0);

  return (
    <View style={{ marginTop: FILTER_TOP }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN }}
      >
        {filters.map((f, i) => {
          const on = i === at;
          return (
            <Pressable
              key={f}
              onPress={() => setAt(i)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={f}
            >
              <View
                style={{
                  height: FILTER_HEIGHT,
                  marginRight: 8,
                  paddingHorizontal: 18,
                  borderRadius: radius.chip,
                  backgroundColor: on ? br.navy : br.surface,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <T
                  variant="chip"
                  color={on ? br.onNavy : br.muted}
                  style={{ height: type.chip.line }}
                >
                  {f}
                </T>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
