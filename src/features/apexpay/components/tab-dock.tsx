import { Pressable, View } from 'react-native';

import { TABS } from '../data/home';
import { DOCK_HEIGHT, DOCK_TAB_HEIGHT, MARGIN } from '../layout';
import { ax, radius, shadow } from '../theme';
import { Symbol } from './symbol';

/**
 * The floating dock.
 *
 * Four equal tabs inside a pill that is itself inset by the page margin and
 * held 8dp above the bottom inset. The active one is a filled chartreuse
 * capsule the full height of the row.
 *
 * **No labels.** The markup gives each tab a label span, and every one of them
 * is `hidden` — so the dock renders as four glyphs and the active capsule has
 * nothing in it but its icon. Rendering the labels would be building what the
 * markup says rather than what it does.
 */
export function TabDock({ bottomInset = 0 }: { bottomInset?: number }) {
  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: MARGIN,
        right: MARGIN,
        bottom: bottomInset + 8,
      }}
    >
      <View
        style={{
          height: DOCK_HEIGHT,
          borderRadius: radius.full,
          backgroundColor: ax.dock,
          boxShadow: shadow.dock,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 6,
        }}
      >
        {TABS.map((tab, i) => {
          const on = i === 0;
          return (
            <Pressable
              key={tab.label}
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: on }}
              style={{
                flex: 1,
                height: DOCK_TAB_HEIGHT,
                borderRadius: radius.full,
                backgroundColor: on ? ax.signal : 'transparent',
                boxShadow: on ? shadow.signalPill : undefined,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name={tab.icon} size={22} color={on ? ax.onSignalNav : ax.inkMuted} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
