import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { TABS, type TabKey } from '../data/home';
import { FONT, LEVEL, ll } from '../theme';

/**
 * How much room a screen has to leave below its content so the dock never
 * covers the last card. The reference reserves `5.5rem`.
 */
export const DOCK_CLEARANCE = 88;

/**
 * The floating bottom navigation capsule.
 *
 * The active tab expands into a dark pill carrying both its icon and its label,
 * while the rest stay as 40dp icon-only circles — so the dock's width is fixed
 * but the weight inside it moves, which is what gives the recording its sense
 * of place.
 *
 * `justifyContent: 'space-between'` rather than a gap: the active pill is
 * wider than the circles it replaces, and space-between keeps the remaining
 * three evenly spread whichever one is active.
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
          justifyContent: 'space-between',
          backgroundColor: 'rgba(255,255,255,0.96)',
          borderRadius: 999,
          paddingHorizontal: 8,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.05)',
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
            accessibilityState={{ selected: on }}
          >
            {on ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: ll.ink,
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 9,
                }}
              >
                <Icon name={tab.icon} size={14} color={ll.surface} />
                <Text
                  style={{
                    fontFamily: FONT.semibold,
                    fontSize: 12,
                    lineHeight: 16,
                    letterSpacing: -0.12,
                    color: ll.surface,
                  }}
                >
                  {tab.label}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name={tab.icon} size={16} color={ll.muted} />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
