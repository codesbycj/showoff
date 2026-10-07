import { Pressable, Text, View } from 'react-native';

import { TABS, type TabKey } from '../data/wallet';
import { FONT, LEVEL, R, SP, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The floating dock.
 *
 * It is an obsidian capsule sitting above the bottom inset with the page
 * running under it, so screens position it absolutely and their scrolls carry
 * `DOCK_CLEARANCE` of bottom padding instead of stacking it below.
 *
 * Every item is the same 56x48 box whether selected or not — the selected one
 * only gains a lime fill. Sizing the selected item differently is what makes a
 * dock jump as you move between tabs.
 */
export function TabDock({
  active,
  onSelect,
}: {
  active: TabKey;
  onSelect?: (key: TabKey) => void;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          gap: 4,
          padding: SP.xs,
          borderRadius: R.full,
          backgroundColor: ps.inverse,
        },
        LEVEL.floating,
      ]}
    >
      {TABS.map((tab) => {
        const on = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onSelect?.(tab.key)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
          >
            <View
              style={{
                width: 56,
                height: 48,
                borderRadius: R.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: on ? ps.lime : 'transparent',
              }}
            >
              <Symbol name={tab.icon} size={22} color={on ? ps.onLime : ps.surfaceDim} />
              <Text
                style={{
                  fontFamily: FONT.semibold,
                  fontSize: 10,
                  lineHeight: 13,
                  letterSpacing: 0.2,
                  color: on ? ps.onLime : ps.surfaceDim,
                }}
              >
                {tab.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

/** How much room a screen's scroll must leave for the dock to float over. */
export const DOCK_CLEARANCE = 56 + 12 + SP.xl;
