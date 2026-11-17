import { Pressable, View } from 'react-native';

import { tabs } from '../data/plan';
import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { height: number; active?: string };

/**
 * The tab bar.
 *
 * **It is not padded by `insets.bottom`.** It is a full-width bar that stops
 * at the bottom of the app's own frame, and when the app is not edge-to-edge
 * the system already reserves the strip below it — padding it by the inset
 * counts that strip twice and opens the band I3 exists for (R1b).
 *
 * The active tab is marked by fill, not by colour alone, so it survives a
 * greyscale render.
 */
export function TabBar({ height, active = 'home' }: Props) {
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
            style={{ flex: 1, height, alignItems: 'center', justifyContent: 'center' }}
          >
            <View
              style={{
                width: 48,
                height: 34,
                borderRadius: 17,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: on ? ct.accentSoft : 'transparent',
              }}
            >
              <Glyph
                name={tab.glyph}
                size={21}
                color={on ? ct.accent : ct.muted}
                strokeWidth={on ? 2 : 1.6}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
