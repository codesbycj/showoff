import { View } from 'react-native';

import { delta, metrics, show } from '../data/stats';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number };

/**
 * Followers, engagement, reach, impressions.
 *
 * **R9: every delta is computed** from this period and the one before it, and
 * the sign decides both the colour and the arrow - so a tile can never read
 * "+" in red. The board types all four of its deltas, and one disagrees with
 * its own arrow.
 */
export function MetricTiles({ margin, width, height, radius }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      {metrics.map((metric) => {
        const move = delta(metric);
        const up = move >= 0;
        return (
          <View
            key={metric.id}
            style={{
              width,
              height,
              borderRadius: radius,
              backgroundColor: ct.surface,
              padding: 14,
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <T variant="tileLabel">{metric.label}</T>
            <T variant="tileValue">{show(metric)}</T>
            <T variant={up ? 'up' : 'down'}>
              {up ? '+' : ''}
              {move.toFixed(1)}% this week
            </T>
          </View>
        );
      })}
    </View>
  );
}
