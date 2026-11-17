import { Pressable, View } from 'react-native';

import { tabs } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { height: number; bottom: number; active?: string };

/**
 * The dock, drawn as the board draws it: a dark blob carrying four discs.
 *
 * **It is not padded by `insets.bottom`.** `bottom` already is the inset plus
 * a hair; adding the inset to the bar as well reserves the system's strip
 * twice, which is the band under four screens of a deleted batch (R1b, I3).
 */
export function PillDock({ height, bottom, active = 'home' }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom,
        alignItems: 'center',
      }}
      pointerEvents="box-none"
    >
      <View
        style={{
          height,
          borderRadius: height / 2,
          backgroundColor: ct.dark,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 6,
          gap: 6,
          shadowColor: '#000000',
          shadowOpacity: 0.22,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 8 },
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
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  backgroundColor: on ? ct.green : ct.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph
                  name={tab.glyph}
                  size={22}
                  color={on ? ct.onGreen : ct.ink}
                  strokeWidth={on ? 2 : 1.7}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
