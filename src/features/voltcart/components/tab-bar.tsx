import { Pressable, View } from 'react-native';

import { tabs } from '../data/tabs';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; active?: string; onCart?: () => void };

/**
 * The tab bar.
 *
 * **It is not padded by `insets.bottom`.** It is a full-width bar that stops
 * at the bottom of the app's own frame, and the system already reserves the
 * strip below it — padding it by the inset counts that strip twice (R1b, I3).
 *
 * The cart badge is drawn over the glyph's corner rather than inside it, so it
 * never straddles the mark it belongs to (R3).
 */
export function TabBar({ height, active = 'home', onCart }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height,
        backgroundColor: ct.surface,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: ct.line,
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
            onPress={tab.id === 'cart' ? onCart : undefined}
            style={{ flex: 1, height, alignItems: 'center', justifyContent: 'center', gap: 3 }}
          >
            <View>
              <Glyph
                name={tab.glyph}
                size={21}
                color={on ? ct.ink : ct.muted}
                strokeWidth={on ? 2.2 : 1.7}
              />
              {tab.count ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -14,
                    minWidth: 17,
                    height: 17,
                    borderRadius: 9,
                    paddingHorizontal: 4,
                    backgroundColor: ct.flag,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <T variant="badge">{tab.count}</T>
                </View>
              ) : null}
            </View>
            <T variant={on ? 'tabOn' : 'tabOff'}>{tab.label}</T>
          </Pressable>
        );
      })}
    </View>
  );
}
