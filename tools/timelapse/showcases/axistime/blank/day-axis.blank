import { View } from 'react-native';

import { days, today } from '../data/timeline';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The week under the plot.
 *
 * The resting day is read off the series rather than hard-coded, so the bold
 * label always sits under the curve's last point - and `today()` returns
 * `null` while the array is still empty (I7).
 */
export function DayAxis({ margin, height }: Props) {
  const current = today();

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {days.map((day) => (
        <T key={day.id} variant={day.id === current ? 'dayOn' : 'day'}>
          {day.label}
        </T>
      ))}
    </View>
  );
}
