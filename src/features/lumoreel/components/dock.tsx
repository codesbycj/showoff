import { Pressable, View } from 'react-native';

import { tabs } from '../data/reel';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; bottom: number; active?: string; onProfile?: () => void };

/**
 * The dock.
 *
 * **It is not padded by `insets.bottom`.** `bottom` already is the inset plus
 * a hair; adding the inset to the bar as well reserves the system's strip
 * twice (R1b, I3).
 *
 * **"Messages" and "Profile"** — the board's own dock reads "Massage" on all
 * three of its screens and wraps its last tab as "Pro file" (I1). The post
 * control is a raised disc, as the board draws it.
 */
export function Dock({ height, bottom, active = 'home', onProfile }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height + bottom,
        paddingBottom: bottom,
        backgroundColor: 'rgba(18,11,34,0.88)',
        borderTopWidth: 1,
        borderTopColor: ct.line,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {tabs.map((tab) => {
        const on = tab.id === active;
        const raised = tab.id === 'post';
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={tab.label}
            onPress={tab.id === 'profile' ? onProfile : undefined}
            style={{ flex: 1, height, alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            {raised ? (
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  backgroundColor: ct.violetDeep,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name="plus" size={22} color={ct.white} strokeWidth={2.2} />
              </View>
            ) : (
              <>
                <Glyph
                  name={tab.glyph}
                  size={20}
                  color={on ? ct.ink : ct.muted}
                  strokeWidth={on ? 2 : 1.6}
                />
                <T variant={on ? 'tabOn' : 'tabOff'}>{tab.label}</T>
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
