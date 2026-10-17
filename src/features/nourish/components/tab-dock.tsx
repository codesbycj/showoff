import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { tabs, type TabKey } from '../data/home';
import { DOCK_HEIGHT, DOCK_LABEL_TOP, FAB_RISE, FAB_SIZE } from '../layout';
import { nr, radius, shadow } from '../theme';
import { T } from './text';
import { TabGlyph } from './tab-glyph';

/**
 * The dock: four destinations and the one thing the app is for.
 *
 * The add button is a **sibling of the row, positioned over it**, not a cell
 * inside it. It overhangs the dock's top edge, and an overhanging child of a
 * clipped box is the one thing Android reliably cuts off — `overflow: 'hidden'`
 * and `elevation` on the same view is already a known trap here, and this
 * avoids needing either.
 *
 * The four cells are equal flex columns with the middle one left empty, so the
 * glyphs sit where they would if the button were one of them, and the pair
 * either side of it stays even however wide the phone is.
 *
 * Pressed states are `useState` driven, applied as plain style objects. A
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the harness would shoot a dock whose button had lost its fill.
 */
export function TabDock({
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
    <View style={{ backgroundColor: nr.dock, paddingBottom: bottomInset }}>
      <View style={{ height: DOCK_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
        {tabs.slice(0, 2).map((t) => (
          <Cell key={t.key} tab={t} active={active} onSelect={onSelect} />
        ))}

        {/* The column the add button stands in. */}
        <View style={{ flex: 1 }} />

        {tabs.slice(2).map((t) => (
          <Cell key={t.key} tab={t} active={active} onSelect={onSelect} />
        ))}
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: -FAB_RISE,
          alignItems: 'center',
        }}
        pointerEvents="box-none"
      >
        <Pressable
          onPress={onAdd}
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          accessibilityRole="button"
          accessibilityLabel="Add a meal"
        >
          <View
            style={{
              width: FAB_SIZE,
              height: FAB_SIZE,
              borderRadius: radius.full,
              backgroundColor: nr.fab,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: held ? 0.86 : 1,
              ...shadow.fab,
            }}
          >
            <Svg width={22} height={22} viewBox="0 0 24 24">
              <Path
                d="M12 5 V19 M5 12 H19"
                stroke={nr.fabInk}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </Pressable>
      </View>
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
        <TabGlyph name={tab.key} color={on ? nr.ink : nr.muted} />
        <T
          variant={on ? 'tabOn' : 'tab'}
          color={on ? nr.ink : nr.muted}
          style={{ marginTop: DOCK_LABEL_TOP }}
        >
          {tab.label}
        </T>
      </View>
    </Pressable>
  );
}
