import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import ArrowRight from 'lucide-react-native/icons/arrow-right';
import { Pressable, View } from 'react-native';

import { calendar } from '../data/plan';
import { nl, radius } from '../theme';
import { T } from './text';

/**
 * The week, with one day picked out.
 *
 * The selected day is a tall pill round *both* the weekday letter and the
 * number, which is why each column is one `View` with the two lines inside it
 * rather than two rows of seven — a row-per-line layout cannot draw a pill
 * that spans them.
 */
export function WeekCard({ onStep }: { onStep?: (dir: -1 | 1) => void }) {
  return (
    <View style={{ borderRadius: 22, backgroundColor: nl.surface, padding: 26 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="month" color={nl.ink} style={{ flex: 1 }}>
          {calendar.month}
        </T>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Step label="Previous month" onPress={() => onStep?.(-1)}>
            <ArrowLeft size={16} color={nl.ink} strokeWidth={1.9} />
          </Step>
          <Step label="Next month" onPress={() => onStep?.(1)}>
            <ArrowRight size={16} color={nl.ink} strokeWidth={1.9} />
          </Step>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 14 }}>
        {calendar.days.map((d) => {
          const on = d.key === calendar.selected;
          return (
            <View key={d.key} style={{ flex: 1, alignItems: 'center' }}>
              <View
                style={{
                  paddingVertical: 11,
                  paddingHorizontal: 11,
                  borderRadius: radius.pill,
                  backgroundColor: on ? nl.dayOn : 'transparent',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <T variant="weekday" color={on ? nl.surface : nl.muted}>
                  {d.weekday}
                </T>
                <T variant="day" color={on ? nl.surface : nl.ink}>
                  {d.day}
                </T>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function Step({
  label,
  onPress,
  children,
}: {
  label: string;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: radius.full,
          backgroundColor: nl.dayWell,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}
