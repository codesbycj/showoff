import { House, Menu, Newspaper } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, vt } from '../theme';
import { TallyGlyph } from './tally-glyph';

/**
 * The bottom tab bar.
 *
 * Home and results draw it at two scales — home with 16dp icons and a 48dp
 * pill behind the active one, results with 20dp icons and a pill that hugs its
 * icon — so, as with the filter rail, the difference is a `tone`.
 *
 * The bar is the screen's last child rather than an absolutely positioned
 * overlay, and it carries the bottom inset itself. The export floats it with a
 * translucent fill over the scroll; on a gesture-navigation Android device that
 * would put the tab labels under the system pill, so it is opaque and inset
 * here, and each screen pads its scroll instead.
 */
const TONES = {
  home: {
    icon: 16,
    label: 10,
    pillW: 48,
    pillH: 28,
    padH: 24,
    activeInk: vt.primary,
    pill: vt.tint,
  },
  results: {
    icon: 20,
    label: 11,
    pillW: 48,
    pillH: 28,
    padH: 16,
    activeInk: vt.primaryInk,
    pill: vt.tintCool,
  },
} as const;

/**
 * How each tab marks itself active.
 *
 * `solid` icons fill; the rest thicken. That split is forced, not stylistic. A
 * filled house and three filled bars are what the reference draws, and both
 * survive being filled because they are closed shapes. A newspaper does not —
 * filling it closes the lines inside into a blob — and a hamburger has nothing
 * to fill at all, so filling it with a zero stroke would leave the active tab
 * showing an empty pill. Those two say "active" with weight and colour instead.
 */
const ICONS = {
  home: { Icon: House, solid: true },
  news: { Icon: Newspaper, solid: false },
  more: { Icon: Menu, solid: false },
} as const;

/** Stroke weight for a line-only icon, idle and active. */
const STROKE = { idle: 2.2, active: 2.8 } as const;

export function TabBar({
  items,
  active,
  tone = 'home',
  inset = 0,
  onSelect,
}: {
  items: readonly { key: string; label: string }[];
  active: string;
  tone?: keyof typeof TONES;
  inset?: number;
  onSelect?: (key: string) => void;
}) {
  const t = TONES[tone];
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: vt.card,
        borderTopWidth: 1,
        borderTopColor: vt.lineStrong,
        paddingHorizontal: t.padH,
        paddingTop: 8,
        paddingBottom: 8 + inset,
      }}
    >
      {items.map((it) => {
        const on = it.key === active;
        const entry = ICONS[it.key as keyof typeof ICONS];
        const ink = on ? t.activeInk : vt.faint;
        return (
          <Pressable key={it.key} onPress={() => onSelect?.(it.key)} style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: t.pillW,
                  height: t.pillH,
                  borderRadius: R.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: on ? t.pill : 'transparent',
                }}
              >
                {entry ? (
                  <entry.Icon
                    size={t.icon}
                    color={ink}
                    fill={on && entry.solid ? ink : 'transparent'}
                    strokeWidth={on ? (entry.solid ? 0 : STROKE.active) : STROKE.idle}
                  />
                ) : (
                  <TallyGlyph size={t.icon} color={ink} filled={on} />
                )}
              </View>
              <Text
                style={{
                  marginTop: 2,
                  fontFamily: on ? FONT.black : FONT.semibold,
                  fontSize: t.label,
                  lineHeight: t.label + 4,
                  color: ink,
                }}
              >
                {it.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
