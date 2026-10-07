import { Pressable, View } from 'react-native';

import { type TabKey, TABS } from '../data/jobs';
import { DOCK_SHADOW, R, jf } from '../theme';
import { TabIcon } from './tab-icon';

/**
 * The floating dock.
 *
 * It is detached — a pill above the bottom edge with the page running under it —
 * so screens position it absolutely rather than stacking it below their scroll,
 * and every screen's scroll carries `DOCK_CLEARANCE` of bottom padding so the
 * last card clears it.
 *
 * The active tab is marked by a filled icon and a 4dp dot beneath it. Every item
 * reserves the dot's row whether or not it is showing one, so selecting a tab
 * does not shift the icons up by 5dp.
 */
export function TabBar({ active, onSelect }: { active: TabKey; onSelect?: (key: TabKey) => void }) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          gap: 28,
          backgroundColor: jf.card,
          borderRadius: R.full,
          paddingHorizontal: 24,
          paddingVertical: 14,
        },
        DOCK_SHADOW,
      ]}
    >
      {TABS.map((tab) => {
        const on = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onSelect?.(tab.key)}
            accessibilityRole="button"
            accessibilityLabel={tab.key}
          >
            <View style={{ alignItems: 'center' }}>
              <TabIcon tab={tab.key} size={20} tone={on ? jf.ink : '#A3A3A3'} active={on} />
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  marginTop: 4,
                  backgroundColor: on ? jf.ink : 'transparent',
                }}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * How much room a screen's scroll has to leave under its last card. The dock is
 * 58dp tall and floats 24dp off the bottom inset.
 */
export const DOCK_CLEARANCE = 58 + 24 + 24;
