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
 * The active tab is a filled pill carrying its label, as the board draws it —
 * white on the brand orange, which is 4.6:1 at 13dp bold (R4).
 */
export function Dock({ margin, height, radius, bottom, active = 'home' }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: margin + 14,
        right: margin + 14,
        bottom,
        height,
        borderRadius: radius,
        backgroundColor: ct.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        shadowColor: '#15161A',
        shadowOpacity: 0.12,
        shadowRadius: 22,
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
          >
            <View
              style={{
                height: 46,
                paddingHorizontal: on ? 18 : 13,
                borderRadius: 23,
                backgroundColor: on ? ct.accentDeep : ct.tray,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Glyph name={tab.glyph} size={20} color={on ? ct.white : ct.ink} strokeWidth={1.8} />
              {on ? <T variant="dockOn">{tab.label}</T> : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
