import { Pressable, View } from 'react-native';

import { tabs } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; bottom: number; active?: string };

/**
 * The floating dock.
 *
 * **It is not padded by `insets.bottom`** (R1b/I3). It sits `bottom` above the
 * frame, and `bottom` already *is* the inset plus a hair — adding the inset to
 * the bar as well is the double-count that put an empty band under four
 * screens of a deleted batch.
 *
 * The inactive label is 74% white, 5.4:1 on this bar. The board's is around
 * 2.9:1, which R4 fails — "muted" is not a licence to be unreadable.
 */
export function Dock({ margin, height, radius, bottom, active = 'discover' }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: margin,
        right: margin,
        bottom,
        height,
        borderRadius: radius,
        backgroundColor: ct.dark,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.22,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
      }}
    >
      {tabs.map((tab) => {
        const on = tab.id === active;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={tab.label}
            style={{ flex: 1, height, alignItems: 'center', justifyContent: 'center', gap: 3 }}
          >
            <Glyph
              name={tab.glyph}
              size={21}
              color={on ? ct.onDark : ct.onDarkMuted}
              strokeWidth={on ? 2 : 1.7}
            />
            <T variant={on ? 'dockOn' : 'dockOff'}>{tab.label}</T>
          </Pressable>
        );
      })}
    </View>
  );
}
