import { View } from 'react-native';

import { activity } from '../data/home';
import { ActivityRow } from './activity-row';

/**
 * The day's activity, as a plain stack.
 *
 * No dividers: the reference separates these rows by the air round the circle
 * on the left rather than by a line, which is what lets the list sit on the
 * page rather than in a box.
 */
export function ActivityList({ onSelect }: { onSelect?: (key: string) => void }) {
  return (
    <View>
      {activity.map((a) => (
        <ActivityRow
          key={a.key}
          title={a.title}
          date={a.date}
          amount={a.amount}
          glyph={a.glyph}
          onPress={() => onSelect?.(a.key)}
        />
      ))}
    </View>
  );
}
