import { Pressable, ScrollView, Text, View } from 'react-native';

import { type CalendarDay } from '../data/scores';
import { R, SP, TYPE, vt } from '../theme';

/**
 * The week calendar strip.
 *
 * The selected day is wider, scaled up, lime-filled and gains a dot beneath its
 * number — four changes at once, which is the design system's "active day
 * transforms into a bright neon pill". The dot only exists on the active day, so
 * it is rendered inside the branch rather than hidden on the others.
 *
 * It bleeds past the 16dp gutter on both sides, as the export does with
 * `-mx-margin px-margin`, so the week can scrub off-canvas.
 */
export function DateStrip({
  dates,
  selected,
  onSelect,
}: {
  dates: readonly CalendarDay[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -SP.margin }}
      contentContainerStyle={{
        paddingHorizontal: SP.margin,
        gap: SP.xs,
        alignItems: 'center',
        paddingVertical: SP.xs,
      }}
    >
      {dates.map((d) => {
        const on = d.key === selected;
        return (
          <Pressable key={d.key} onPress={() => onSelect?.(d.key)}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: on ? 50 : 46,
                paddingVertical: SP.sm,
                borderRadius: R.full,
                backgroundColor: on ? vt.primaryContainer : vt.surfaceContainerLow,
                transform: [{ scale: on ? 1.05 : 1 }],
                shadowColor: vt.primaryFixed,
                shadowOpacity: on ? 0.35 : 0,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 0 },
              }}
            >
              <Text
                style={{
                  ...TYPE.labelSm,
                  letterSpacing: on ? 0.8 : 0.6,
                  opacity: on ? 1 : 0.7,
                  color: on ? vt.onPrimaryContainer : vt.secondary,
                }}
              >
                {d.weekday.toUpperCase()}
              </Text>
              <Text
                style={{
                  ...TYPE.headlineMd,
                  marginTop: 2,
                  color: on ? vt.onPrimaryContainer : vt.onSurface,
                }}
              >
                {d.day}
              </Text>
              {on ? (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: R.full,
                    marginTop: SP.xs,
                    backgroundColor: vt.onPrimaryContainer,
                  }}
                />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
