import { Pressable, ScrollView, Text, View } from 'react-native';

import { FONT, R, SP, vt } from '../theme';

/**
 * The horizontal filter rail, on both screens.
 *
 * It owns its own gutter and scrolls, rather than being a padded row inside a
 * padded column. That is not a preference — the reference shows the last chip
 * clipped by the right edge of the phone, and a row that wraps or shrinks to
 * fit physically cannot reproduce that.
 *
 * Home and results draw the same control at two weights: home uses an 8dp
 * radius, 12dp type and the mid green; results uses 12dp, 13dp type and the
 * near-black green. They are a `tone` rather than nine props for the same
 * reason the splash badges are.
 */
const TONES = {
  home: {
    radius: R.DEFAULT,
    size: 12,
    activeBg: vt.primary,
    activeFont: FONT.bold,
    idleBg: vt.line,
    idleFont: FONT.semibold,
    padH: 16,
    idlePadH: 14,
    padV: 6,
    gap: SP.sm,
  },
  results: {
    radius: R.md,
    size: 13,
    activeBg: vt.deep,
    activeFont: FONT.semibold,
    idleBg: vt.fillCool,
    idleFont: FONT.medium,
    padH: 16,
    idlePadH: 16,
    padV: SP.sm,
    gap: 10,
  },
} as const;

export function TabStrip({
  tabs,
  active,
  tone = 'home',
  onSelect,
}: {
  tabs: readonly string[];
  active: string;
  tone?: keyof typeof TONES;
  onSelect?: (tab: string) => void;
}) {
  const t = TONES[tone];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: SP.margin, gap: t.gap, paddingVertical: 2 }}
    >
      {tabs.map((tab) => {
        const on = tab === active;
        return (
          <Pressable key={tab} onPress={() => onSelect?.(tab)}>
            <View
              style={{
                backgroundColor: on ? t.activeBg : t.idleBg,
                borderRadius: t.radius,
                paddingHorizontal: on ? t.padH : t.idlePadH,
                paddingVertical: t.padV,
              }}
            >
              <Text
                style={{
                  fontFamily: on ? t.activeFont : t.idleFont,
                  fontSize: t.size,
                  lineHeight: t.size + 6,
                  letterSpacing: -0.15,
                  color: on ? vt.card : '#334155',
                }}
              >
                {tab}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
