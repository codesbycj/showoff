import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { DOCK_H, FAB } from '../layout';
import { ct, sheet, type } from '../theme';
import { tabs } from '../data/activity';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * Four labelled tabs with a raised scan control between them.
 *
 * The FAB is a sibling of the tabs rather than a fifth tab, because it rises
 * above the bar — and it is outside every tab's `Pressable`, since a
 * `<button>` inside a `<button>` is torn apart by the web build's parser.
 */
export function Dock({ active = 0, bottom }: { active?: number; bottom: number }) {
  const [sel, setSel] = useState(active);

  return (
    <View style={{ height: DOCK_H + bottom, paddingBottom: bottom }}>
      <View style={{ flexDirection: 'row', height: DOCK_H, alignItems: 'center' }}>
        {tabs.map((tab, i) => {
          const on = i === sel;
          // The middle of the row is left to the raised control.
          const pad =
            i === 1 ? { marginRight: FAB / 2 + 12 } : i === 2 ? { marginLeft: FAB / 2 + 12 } : null;
          return (
            <Pressable
              key={tab.id}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: on }}
              onPress={() => setSel(i)}
              style={[
                { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' },
                pad,
              ]}
            >
              <Glyph
                name={tab.icon}
                size={21}
                tint={on ? ct.teal : sheet.muted}
                filled={on && tab.icon === 'home'}
                strokeWidth={1.7}
              />
              <T
                variant={on ? 'tabOn' : 'tab'}
                color={on ? ct.teal : sheet.muted}
                style={{ height: type.tab.line, marginTop: 4 }}
              >
                {tab.label}
              </T>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Scan to pay"
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: -FAB / 2,
        }}
      >
        <View
          style={{
            width: FAB,
            height: FAB,
            borderRadius: FAB / 2,
            backgroundColor: ct.teal,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 5,
            borderColor: sheet.page,
            shadowColor: '#06252A',
            shadowOpacity: 0.26,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
            elevation: 8,
          }}
        >
          <Glyph name="scan" size={24} tint={ct.onDeep} strokeWidth={1.8} />
        </View>
      </Pressable>
    </View>
  );
}
