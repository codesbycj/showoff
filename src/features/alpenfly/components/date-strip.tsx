import { Pressable, ScrollView, View } from 'react-native';

import { days } from '../data/fly';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The week the search is in.
 *
 * **R9: the strip is generated from its first date.** The board's own reads
 * S13 M14 T15 W16 T16 - the same number twice - which is exactly the class of
 * mistake a generated strip cannot make.
 *
 * The picked day is a filled tile, not a colour change alone, so it survives a
 * greyscale render; ink on lime is 11:1 (R4).
 */
export function DateStrip({ margin, height }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
      >
        {days.map((day) => (
          <Pressable
            key={day.id}
            accessibilityRole="button"
            accessibilityState={{ selected: day.on }}
            accessibilityLabel={`${day.label} ${day.date}`}
          >
            <View
              style={{
                width: 52,
                height: 62,
                borderRadius: 18,
                backgroundColor: day.on ? ct.lime : ct.white,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
              }}
            >
              <T variant="dayLabel" style={day.on ? { color: ct.onLime } : undefined}>
                {day.label}
              </T>
              <T variant={day.on ? 'dayDateOn' : 'dayDate'}>{day.date}</T>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
