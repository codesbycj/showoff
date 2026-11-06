import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { DOCK_H, MARGIN } from '../layout';
import { ct, radius, type } from '../theme';
import { tabs } from '../data/home';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The floating dock.
 *
 * It sits over the list rather than under it, which is the reference's own
 * composition and the reason the last card is clipped by it. That is a
 * legitimate overlap: the bar is chrome and the list is meant to run beneath.
 *
 * It is a real selection, so a recording can move between tabs.
 */
export function Dock({ bottom }: { bottom: number }) {
  const [active, setActive] = useState(0);

  return (
    <View
      style={{
        position: 'absolute',
        left: MARGIN,
        right: MARGIN,
        // 20dp from the screen edge, not 42. A floating bar sits just
        // clear of the home indicator; parked a whole safe-area inset
        // above it, it reads as a bar that failed to reach the bottom.
        bottom: Math.max(10, bottom - 20),
        height: DOCK_H,
        borderRadius: radius.dock,
        backgroundColor: ct.dock,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#15151F',
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 12,
      }}
    >
      {tabs.map((tab, i) => {
        const on = i === active;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: on }}
            onPress={() => setActive(i)}
            style={{ flex: 1, height: DOCK_H, alignItems: 'center', justifyContent: 'center' }}
          >
            <Glyph name={tab.icon} size={21} tint={on ? ct.ink : ct.muted} strokeWidth={1.8} />
            <T
              variant={on ? 'tabOn' : 'tab'}
              color={on ? ct.ink : ct.muted}
              style={{ height: type.tab.line, marginTop: 3 }}
            >
              {tab.label}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}
