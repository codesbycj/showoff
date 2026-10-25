import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { copy, dayChips } from '../data/start';
import { CHIP_HEIGHT, CHIPS_TOP, MARGIN, SECTION_TOP } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

/**
 * Which day's tasks to show.
 *
 * A horizontal `ScrollView`, not a wrap. The reference's last chip is clipped
 * by the screen's right edge, and a wrap layout physically cannot reproduce
 * that (AGENTS.md, "A row that runs off the screen edge is a scrolling row").
 *
 * The labels are generated from one `Date`, so the row cannot name a day the
 * rest of the screen does not have. The selection is real state, so the chips
 * respond when the recording taps one.
 */
export function ChipRow({ onSeeAll }: { onSeeAll?: () => void }) {
  const [at, setAt] = useState(0);

  return (
    <View style={{ marginTop: SECTION_TOP }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: MARGIN }}>
        <T
          variant="sectionTitle"
          color={fc.ink}
          style={{ flex: 1, height: type.sectionTitle.line }}
        >
          {copy.overview}
        </T>
        <Pressable onPress={onSeeAll} accessibilityRole="button" accessibilityLabel={copy.seeAll}>
          <T variant="sectionLink" color={fc.blue} style={{ height: type.sectionLink.line }}>
            {copy.seeAll}
          </T>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN, paddingTop: CHIPS_TOP }}
      >
        {dayChips.map((c, i) => {
          const on = i === at;
          return (
            <Pressable
              key={c.id}
              onPress={() => setAt(i)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={c.label}
            >
              <View
                style={{
                  height: CHIP_HEIGHT,
                  marginRight: 8,
                  paddingHorizontal: 14,
                  borderRadius: radius.chip,
                  backgroundColor: on ? fc.lime : fc.violetSoft,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <T
                  variant="chip"
                  color={on ? fc.onLime : fc.muted}
                  style={{ height: type.chip.line }}
                >
                  {c.label}
                </T>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
