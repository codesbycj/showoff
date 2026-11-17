import { View } from 'react-native';

import { count, stats } from '../data/profile';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Posts, followers, views, likes.
 *
 * **Every figure is formatted from its own number** (R9), with the same helper
 * the feed and the reel use - three screens cannot disagree about one account.
 */
export function StatRow({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        borderRadius: 18,
        backgroundColor: ct.card,
        borderWidth: 1,
        borderColor: ct.line,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {stats.map((stat) => (
        <View key={stat.id} style={{ flex: 1, alignItems: 'center', gap: 2 }}>
          <T variant="statValue">{count(stat.value)}</T>
          <T variant="statLabel">{stat.label}</T>
        </View>
      ))}
    </View>
  );
}
