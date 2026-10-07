import { Pressable, Text, View } from 'react-native';

import { Symbol } from './symbol';
import { TABS, type TabKey } from '../data/nav';
import { FONT, LEVEL, kc } from '../theme';

/**
 * How much room a screen leaves below its content so the dock never covers the
 * last card. The reference reserves `pb-28`.
 */
export const DOCK_CLEARANCE = 112;

/**
 * The floating charcoal dock, with the coral dispatch button set into its
 * middle.
 *
 * The FAB is 56dp inside a 68dp bar and is lifted 12dp, so it breaks the bar's
 * top edge — it is a sibling of the four tabs in the same row rather than an
 * absolutely positioned overlay, which keeps the four tabs spaced around it
 * without anyone having to reserve a gap by hand.
 *
 * The active tab is marked twice over: a white glyph and label, and a 6dp coral
 * dot beneath. The dot is what survives when the dock is small in a recording.
 */
export function TabDock({
  active,
  onSelect,
  onDispatch,
}: {
  active: TabKey;
  onSelect?: (key: TabKey) => void;
  onDispatch?: () => void;
}) {
  const tabs = TABS.map((tab) => {
    const on = tab.key === active;

    return (
      <Pressable
        key={tab.key}
        onPress={() => onSelect?.(tab.key)}
        accessibilityRole="button"
        accessibilityLabel={tab.label}
        accessibilityState={{ selected: on }}
      >
        <View style={{ minWidth: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Symbol name={tab.icon} size={24} color={on ? kc.surface : kc.surfaceDim} />
          <Text
            style={{
              fontFamily: on ? FONT.semibold : FONT.medium,
              fontSize: 10,
              lineHeight: 14,
              color: on ? kc.surface : kc.surfaceDim,
            }}
          >
            {tab.label}
          </Text>

          {on ? (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: kc.coral,
                marginTop: 2,
              }}
            />
          ) : (
            <View style={{ height: 8 }} />
          )}
        </View>
      </Pressable>
    );
  });

  return (
    <View
      style={[
        {
          height: 68,
          borderRadius: 999,
          backgroundColor: kc.charcoal,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        LEVEL.dock,
      ]}
    >
      {tabs[0]}
      {tabs[1]}

      <Pressable
        onPress={onDispatch}
        accessibilityRole="button"
        accessibilityLabel="Quick dispatch"
      >
        <View
          style={[
            {
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: kc.coral,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -24,
            },
            LEVEL.fab,
          ]}
        >
          <Symbol name="add" size={28} color={kc.onCoral} />
        </View>
      </Pressable>

      {tabs[2]}
      {tabs[3]}
    </View>
  );
}
