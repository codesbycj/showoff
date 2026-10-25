import { Pressable, View } from 'react-native';

import { tabs } from '../data/start';
import { TABBAR_HEIGHT } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * Where else the app goes.
 *
 * A navy pill with the active tab as a white pill inside it — the
 * reference's shape, and the one place on the page with no icon at all. Four
 * words in a 60dp bar is a 60dp target each; nothing needs a glyph to be
 * legible here, and a drawn icon beside each word would only crowd them.
 */
export function TabBar({ active, onSelect }: { active: string; onSelect?: (id: string) => void }) {
  return (
    <View
      style={{
        height: TABBAR_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: br.navy,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
      }}
    >
      {tabs.map((t) => {
        const on = t === active;
        return (
          <Pressable
            key={t}
            onPress={() => onSelect?.(t)}
            style={{ flex: 1 }}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={t}
          >
            <View
              style={{
                height: 46,
                borderRadius: radius.pill,
                backgroundColor: on ? br.surface : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="tab" color={on ? br.navy : br.onNavy} style={{ height: type.tab.line }}>
                {t}
              </T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
