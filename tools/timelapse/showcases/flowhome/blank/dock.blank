import { Pressable, View } from 'react-native';

import { tabs } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; bottom: number; active?: string; onNourish?: () => void };

/**
 * The dock.
 *
 * **It is not padded by `insets.bottom`.** The bar ends at the frame and the
 * system reserves the strip below it; padding the bar by the inset as well
 * counts that strip twice (R1b, I3).
 *
 * **The board marks *Home* while the card on screen belongs to *Cycle*** (I1).
 * Here the dot is on Home and the card above is the day's own summary, which
 * is what a home screen is.
 */
export function Dock({ height, bottom, active = 'home', onNourish }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height + bottom,
        paddingBottom: bottom,
        backgroundColor: ct.page,
        borderTopWidth: 1,
        borderTopColor: ct.line,
        flexDirection: 'row',
        alignItems: 'center',
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
            onPress={tab.id === 'nourish' ? onNourish : undefined}
            style={{ flex: 1, height, alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            <Glyph
              name={tab.glyph}
              size={20}
              color={on ? ct.ink : ct.muted}
              strokeWidth={on ? 2 : 1.6}
            />
            <T variant={on ? 'tabOn' : 'tabOff'}>{tab.label}</T>
          </Pressable>
        );
      })}
    </View>
  );
}
