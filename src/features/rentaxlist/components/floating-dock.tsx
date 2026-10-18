import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { dock, type DockKey } from '../data/browse';
import { DOCK_HEIGHT, DOCK_ITEM, DOCK_WIDTH } from '../layout';
import { radius, rx, shadow } from '../theme';
import { Icon } from './icon';

/**
 * The dock: a dark pill floating over the list.
 *
 * Narrow and centred rather than full width, which is what the reference does
 * and what keeps it reading as an object rather than as a bar. Its width is
 * fixed because four round targets have a natural size; everything else on
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
        backgroundColor: rx.raised,
        borderWidth: 1,
        borderColor: rx.raisedEdge,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        ...shadow.dock,
      }}
    >
      {dock.map((key) => {
        const on = key === active;
        return (
          <Pressable
            key={key}
            onPress={() => onSelect?.(key)}
            onPressIn={() => setHeld(key)}
            onPressOut={() => setHeld(null)}
            accessibilityRole="button"
            accessibilityLabel={key}
          >
            <View
              style={{
                width: DOCK_ITEM,
                height: DOCK_ITEM,
                borderRadius: radius.full,
                backgroundColor: on ? rx.onDark : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: held === key ? 0.7 : 1,
              }}
            >
              <Icon name={key} size={18} color={on ? rx.canvas : rx.onDarkMuted} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
