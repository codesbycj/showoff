import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { tabs, type TabKey } from '../data/dashboard';
import { DOCK_HEIGHT, DOCK_ICON, DOCK_LABEL_TOP, FAB_RISE, FAB_SIZE } from '../layout';
import { dd, radius, shadow } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * The bar at the foot: four destinations and the one thing the app is for.
 *
 * The add button is a **sibling of the row, positioned over it**, not a cell
 * inside it. It overhangs the bar's top edge, and an overhanging child of a
 * clipped box is the one thing Android reliably cuts off — this way nothing
 * needs `overflow: 'hidden'` at all.
 */
export function TabBar({
  active,
  bottomInset,
  onSelect,
  onAdd,
}: {
  active: TabKey;
  bottomInset: number;
  onSelect?: (key: TabKey) => void;
  onAdd?: () => void;
}) {
  const [held, setHeld] = useState(false);

  return (
    <View
      style={{
        backgroundColor: dd.surface,
        borderTopWidth: 1,
        borderTopColor: dd.edge,
        paddingBottom: bottomInset,
      }}
    >
      <View style={{ height: DOCK_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
        {/* STEP 1.29 two on the left
        {tabs.slice(0, 2).map((t) => (
          <Cell key={t.key} tab={t} active={active} onSelect={onSelect} />
        ))}
        */}

        <View style={{ flex: 1 }} />

        {/* STEP 1.30 two on the right
        {tabs.slice(2).map((t) => (
          <Cell key={t.key} tab={t} active={active} onSelect={onSelect} />
        ))}
        */}
      </View>

      {/* STEP 1.31 and the thing in the middle
      <View
        style={{ position: 'absolute', left: 0, right: 0, top: -FAB_RISE, alignItems: 'center' }}
        pointerEvents="box-none"
      >
        <Pressable
          onPress={onAdd}
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          accessibilityRole="button"
          accessibilityLabel="Add a delivery"
        >
          <View
            style={{
              width: FAB_SIZE,
              height: FAB_SIZE,
              // MISTAKE 1.32 the add button came in sunk into the bar
              marginTop: 24,
              borderRadius: radius.full,
              backgroundColor: dd.blue,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: held ? 0.86 : 1,
              ...shadow.fab,
            }}
          >
            <Icon name="plus" size={21} color={dd.onBlue} strokeWidth={2.4} />
          </View>
        </Pressable>
      </View>
      */}
    </View>
  );
}

function Cell({
  tab,
  active,
  onSelect,
}: {
  tab: { key: TabKey; label: string };
  active: TabKey;
  onSelect?: (key: TabKey) => void;
}) {
  const on = tab.key === active;
  return (
    <Pressable
      onPress={() => onSelect?.(tab.key)}
      accessibilityRole="button"
      accessibilityLabel={tab.label}
      style={{ flex: 1 }}
    >
      <View style={{ alignItems: 'center' }}>
        <Icon
          name={tab.key}
          size={DOCK_ICON}
          color={on ? dd.blue : dd.faint}
          strokeWidth={on ? 2.2 : 1.8}
        />
        <T
          variant={on ? 'tabOn' : 'tab'}
          color={on ? dd.blue : dd.faint}
          style={{ marginTop: DOCK_LABEL_TOP }}
        >
          {tab.label}
        </T>
      </View>
    </Pressable>
  );
}
