import { Pressable, View } from 'react-native';

import { tabs } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; bottom: number; active?: string };

/**
 * The floating dock.
 *
 * **It is not padded by `insets.bottom`.** `bottom` already is the inset plus
 * a hair; adding the inset to the bar as well reserves the system's strip
 * twice, which is the band under four screens of a deleted batch (R1b, I3).
 *
 * The inactive label is 62% white — 6.1:1 on this bar. The board's is nearer
 * 3:1, which R4 fails.
 */
export function Dock({ margin, height, radius, bottom, active = 'home' }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: margin,
        right: margin,
        bottom,
        height,
        borderRadius: radius,
        backgroundColor: ct.cardSoft,
        borderWidth: 1,
        borderColor: ct.line,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
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
              color={on ? ct.ink : ct.muted}
              strokeWidth={on ? 2 : 1.6}
            />
            <T variant={on ? 'dockOn' : 'dockOff'}>{tab.label}</T>
          </Pressable>
        );
      })}
    </View>
  );
}
