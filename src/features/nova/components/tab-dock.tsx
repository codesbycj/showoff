import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import { TABS, type TabKey } from '../data/nav';
import { FONT, LEVEL, R, nv } from '../theme';

/**
 * How much room a screen leaves below its content so the dock never covers the
 * last card. The reference reserves `pb-28`.
 */
export const DOCK_CLEARANCE = 92;

/**
 * The floating bottom dock.
 *
 * The export draws this two different ways: the dashboard gives the active tab
 * a lime *pill* carrying both icon and label, while the wallet, activity and
 * settings screens give it a lime *circle* with the icon alone. That is the
 * usual per-screen drift rather than a state the app moves between — no screen
 * shows both.
 *
 * The labelled pill is taken for all four. It is the version on the dashboard,
 * which is the app's front door, and a dock whose active tab names itself is
 * the one that reads in a recording; a lime circle alone says where you are
 * only if you already know the icons.
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
          justifyContent: 'space-around',
          backgroundColor: 'rgba(255,255,255,0.96)',
          borderRadius: R.dock,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: nv.border,
        },
        LEVEL.dock,
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
                  gap: 6,
                  backgroundColor: nv.lime,
                  borderRadius: R.base,
                  paddingHorizontal: 16,
                  paddingVertical: 9,
                }}
              >
                <Icon name={tab.icon} size={18} color={nv.ink} strokeWidth={2.3} />
                <Text
                  style={{
                    fontFamily: FONT.bold,
                    fontSize: 12,
                    lineHeight: 16,
                    letterSpacing: -0.12,
                    color: nv.ink,
                  }}
                >
                  {tab.label}
                </Text>
              </View>
            ) : (
              <View style={{ padding: 10 }}>
                <Icon name={tab.icon} size={20} color={nv.muted} />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
