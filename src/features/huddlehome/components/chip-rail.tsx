import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { CHIP_H, MARGIN } from '../layout';
import { ct, radius, type } from '../theme';
import { chips } from '../data/home';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The categories, as a rail that runs off the right edge.
 *
 * The reference clips its fourth chip against the screen edge, which is
 * always a horizontal scroller and never a wrap. The rail is pinned to its
 * own height so it cannot take the column's spare space with it.
 *
 * The selection is real state, so the recording can tap a chip and have it
 * answer.
 */
export function ChipRail() {
  const [active, setActive] = useState(chips.findIndex((c) => c.on));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: CHIP_H, flexGrow: 0 }}
      contentContainerStyle={{ paddingLeft: MARGIN, paddingRight: MARGIN, alignItems: 'center' }}
    >
      {chips.map((c, i) => {
        const on = i === active;
        return (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            accessibilityLabel={c.label}
            accessibilityState={{ selected: on }}
            onPress={() => setActive(i)}
          >
            <View
              style={{
                height: CHIP_H,
                borderRadius: radius.chip,
                paddingHorizontal: 16,
                marginRight: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: ct.card,
                borderWidth: 1,
                borderColor: on ? 'transparent' : ct.hairline,
                shadowColor: '#1B1B2A',
                shadowOpacity: on ? 0.1 : 0,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: on ? 3 : 0,
              }}
            >
              <Glyph name={c.icon} size={16} tint={on ? ct.ink : ct.muted} strokeWidth={1.8} />
              <T
                variant={on ? 'chipOn' : 'chip'}
                color={on ? ct.ink : ct.muted}
                style={{ height: type.chip.line, marginLeft: 7 }}
              >
                {c.label}
              </T>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
