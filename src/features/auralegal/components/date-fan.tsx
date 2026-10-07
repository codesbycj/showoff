import { Pressable, Text, View } from 'react-native';

import { type FanDate } from '../data/booking';
import { R, SP, TYPE, al, alpha } from '../theme';

import { Symbol } from './symbol';

/**
 * The radial date picker — five capsules fanned around the selected day.
 *
 * The arc is faked, as it is in the export: each capsule is a plain pill that
 * is taller towards the centre, lifted by a few dp and rotated a few degrees,
 * and the row is bottom-aligned so the heights read as a curve. Nothing is
 * actually placed on a circle.
 *
 * React Native rotates about an element's centre, which is what is wanted here
 * — a capsule tilted about its own middle stays inside its slot. (Anchoring the
 * rotation to the bottom, as a real fan would, pushes the outer two out of the
 * stage and they get clipped.)
 *
 * The selected capsule inverts to `inverse-surface` rather than taking the
 * brand lavender: the design system reserves the stark white for "active date
 * segment", and uses lavender for the active *time* below it.
 */
export function DateFan({
  dates,
  selected,
  onSelect,
}: {
  dates: readonly FanDate[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: SP.sm,
        paddingHorizontal: SP.sm,
        paddingTop: SP.sm,
      }}
    >
      {dates.map((d) => {
        const on = d.key === selected;
        return (
          <Pressable key={d.key} onPress={() => onSelect?.(d.key)}>
            <View
              style={{
                width: on ? 56 : 48,
                height: d.height,
                borderRadius: R.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: on ? al.inverseSurface : al.surfaceContainerHigh,
                opacity: d.dim,
                transform: [{ translateY: -d.rise }, { rotate: d.tilt }, { scale: on ? 1.05 : 1 }],
                borderWidth: on ? 4 : 0,
                borderColor: alpha(al.primary, 0.2),
              }}
            >
              <Symbol
                name={on ? 'calendarMonth' : 'calendarToday'}
                size={on ? 15 : 13}
                color={on ? al.inverseOnSurface : al.onSurfaceVariant}
                style={{ marginBottom: 2, opacity: on ? 1 : 0.6 }}
              />

              <Text
                style={{
                  ...TYPE.labelSm,
                  letterSpacing: on ? 0.55 : 0,
                  color: on ? al.inverseOnSurface : al.onSurfaceVariant,
                }}
              >
                {on ? d.weekday.toUpperCase() : d.weekday}
              </Text>

              <Text
                style={{
                  ...(on ? TYPE.headlineXlMobile : TYPE.headlineMd),
                  fontFamily: TYPE.headlineXl.fontFamily,
                  lineHeight: on ? 26 : 24,
                  marginTop: on ? SP.xs : 0,
                  color: on ? al.inverseOnSurface : al.onSurface,
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
                    backgroundColor: al.secondaryContainer,
                    marginTop: 6,
                  }}
                />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
