import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { dock, type DockKey } from '../data/home';
import { DOCK_HEIGHT, DOCK_ITEM, DOCK_WIDTH } from '../layout';
import { ph, radius, shadow } from '../theme';
import { Icon } from './icon';

/**
 * The dock: a black pill floating over the page with three things in it.
 *
 * Narrow and centred rather than full width, which is what the reference does
 * and what keeps it reading as an object rather than as a bar. Its width is
 * fixed because three round targets have a natural size; everything else on
 * this screen reflows, and this is the one thing that should not.
 */
export function FloatingDock({
  active,
  onSelect,
}: {
  active: DockKey;
  onSelect?: (key: DockKey) => void;
}) {
  const [held, setHeld] = useState<DockKey | null>(null);

  return (
    <View
      style={{
        width: DOCK_WIDTH,
        height: DOCK_HEIGHT,
        borderRadius: radius.full,
        // MISTAKE 1.38 the dock came in riding low
        marginBottom: 22,
        backgroundColor: ph.ink,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        ...shadow.dock,
      }}
    >
      {/* STEP 1.37 three things in it
      {dock.map((d) => {
        const on = d.accent || d.key === active;
        return (
          <Pressable
            key={d.key}
            onPress={() => onSelect?.(d.key)}
            onPressIn={() => setHeld(d.key)}
            onPressOut={() => setHeld(null)}
            accessibilityRole="button"
            accessibilityLabel={d.key}
          >
            <View
              style={{
                width: DOCK_ITEM,
                height: DOCK_ITEM,
                borderRadius: radius.full,
                backgroundColor: d.accent ? ph.lime : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: held === d.key ? 0.7 : 1,
              }}
            >
              <Icon
                name={d.key === 'more' ? 'more' : d.key}
                size={20}
                color={d.accent ? ph.text : on ? ph.onInk : 'rgba(255,255,255,0.65)'}
              />
            </View>
          </Pressable>
        );
      })}
      */}
    </View>
  );
}
