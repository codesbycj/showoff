import { Pressable, View } from 'react-native';

import { DOCK_H } from '../layout';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';

const TABS: { name: GlyphName; label: string }[] = [
  { name: 'home', label: 'Home' },
  { name: 'chart', label: 'Insights' },
  { name: 'scan', label: 'Scan' },
  { name: 'card', label: 'Cards' },
  { name: 'person', label: 'Profile' },
];

/**
 * The dock. Five destinations, the middle one raised onto a lime disc the way
 * the reference has it.
 *
 * Each tab is a 56dp-wide, full-height target rather than an icon with a tap
 * handler on it, so the control is the size of the thing a thumb aims at.
 * The active tab is marked twice — a filled glyph and a dot — because colour
 * alone at this size is not a signal anyone reads.
 */
export function Dock({ active = 0, bottom }: { active?: number; bottom: number }) {
  return (
    <View
      style={{
        // Centred across the whole painted bar, not just the band above the
        // home-indicator inset. With the inset as padding the icons sat in
        // the top 58dp of a 92dp slab and read as high in it.
        height: DOCK_H + bottom,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ct.page,
        borderTopWidth: 1,
        borderTopColor: ct.hairline,
      }}
    >
      {TABS.map((tab, i) => {
        const on = i === active;
        const raised = tab.name === 'scan';
        return (
          <Pressable
            key={tab.name}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: on }}
            style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}
          >
            <View
              style={{
                width: raised ? 46 : 40,
                height: raised ? 46 : 40,
                borderRadius: 23,
                backgroundColor: raised ? ct.limeSoft : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name={tab.name} size={24} tint={on ? ct.forest : ct.muted} strokeWidth={1.7} />
            </View>
            {/* A fixed 8dp slot under the icon, present whether the tab is
                active or not. In flow it keeps the dot beside its icon and
                keeps every tab the same height, so the group still centres. */}
            <View style={{ height: 8, justifyContent: 'center' }}>
              {on ? (
                <View
                  style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: ct.forest }}
                />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
