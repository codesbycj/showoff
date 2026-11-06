import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { DOCK_H } from '../layout';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';

const TABS: { id: string; label: string; icon: GlyphName }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'map', label: 'Map', icon: 'map' },
  { id: 'saved', label: 'Saved', icon: 'heart' },
  { id: 'you', label: 'You', icon: 'person' },
];

/**
 * Four destinations. The active one is a filled glyph on a blue tile, which
 * is two signals rather than one — colour alone at 22dp is not something
 * anyone reads.
 */
export function Dock({ active = 0, bottom }: { active?: number; bottom: number }) {
  const [sel, setSel] = useState(active);

  return (
    <View
      style={{
        // The inset is padding inside the bar, not a margin under it. As a
        // margin the bar stopped 34dp short of the screen edge and read as a
        // footer that had failed to reach the bottom.
        // Centred across the whole painted bar, not just the band above the
        // home-indicator inset. With the inset as padding the icons sat in
        // the top 58dp of a 92dp slab and read as high in it.
        height: DOCK_H + bottom,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {TABS.map((tab, i) => {
        const on = i === sel;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: on }}
            onPress={() => setSel(i)}
            style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}
          >
            <View
              style={{
                width: 48,
                height: 44,
                borderRadius: 14,
                backgroundColor: on ? ct.blue : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph
                name={tab.icon}
                size={22}
                tint={on ? ct.onBlue : ct.ink}
                filled={on}
                strokeWidth={1.8}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
