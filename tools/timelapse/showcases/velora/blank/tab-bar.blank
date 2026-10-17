import { Pressable, View } from 'react-native';

import { Icon, type IconName } from './icon';
import { T } from './text';
import { TABS, type TabId } from '../data/home';
import { MARGIN, TAB_HEIGHT, TAB_LIFT } from '../layout';
import { radius, tabShadow, vl } from '../theme';

/**
 * The tab bar: a white pill floating over the scroll.
 *
 * The active tab is the only one that carries a label. That is the reference's
 * own idea and a good one — four labels under four glyphs would make the bar
 * twice as tall and half as calm, and the one that is spelled out is the one
 * you need told.
 */
export function TabBar({
  active,
  bottomInset,
  onSelect,
}: {
  active: TabId;
  bottomInset: number;
  onSelect?: (id: TabId) => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: MARGIN,
        right: MARGIN,
        bottom: bottomInset + TAB_LIFT,
      }}
      pointerEvents="box-none"
    >
      <View
        style={{
          height: TAB_HEIGHT,
          borderRadius: radius.full,
          backgroundColor: vl.card,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          // MISTAKE 1.40 the bar came out squeezed into the middle
          marginHorizontal: 54,
          paddingHorizontal: 10,
          ...tabShadow,
        }}
      >
        {/* STEP 1.39 one stop for each place the app goes
        {TABS.map((tab) => {
          const on = tab.id === active;
          return (
            <Pressable
              key={tab.id}
              onPress={() => onSelect?.(tab.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              accessibilityLabel={tab.label}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                  height: 42,
                  paddingHorizontal: on ? 16 : 14,
                  borderRadius: radius.full,
                  backgroundColor: on ? vl.limeWash : 'transparent',
                }}
              >
                <Icon
                  name={tab.id as IconName}
                  size={20}
                  color={on ? vl.limeDeep : vl.muted}
                  filled={false}
                />
                {on ? (
                  <T variant="cta" color={vl.ink}>
                    {tab.label}
                  </T>
                ) : null}
              </View>
            </Pressable>
          );
        })}
        */}
      </View>
    </View>
  );
}
