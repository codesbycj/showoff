import { View } from 'react-native';

import { nr } from '../theme';
import { T } from './text';

/**
 * One of the two small figures either side of the gauge: "1173 Left" and
 * "2 Logs".
 *
 * They are ranged to the outside — the left one left, the right one right —
 * so that whatever the numbers grow to, the pair stays pinned to the page
 * margins and the gauge keeps the middle. Centring them instead makes the
 * whole hero wander as soon as the figure gains a digit.
 */
export function FlankStat({
  value,
  label,
  align,
}: {
  value: string;
  label: string;
  align: 'left' | 'right';
}) {
  return (
    <View style={{ alignItems: align === 'left' ? 'flex-start' : 'flex-end' }}>
      <T variant="flankValue" color={nr.ink}>
        {value}
      </T>
      <T variant="flankLabel" color={nr.muted}>
        {label}
      </T>
    </View>
  );
}
