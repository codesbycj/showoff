import { View } from 'react-native';

import { DOT_GAP, DOT_SIZE } from '../layout';
import { ps, radius } from '../theme';

/**
 * The goal meter: a row of dots, filled as far as the goal is met.
 *
 * Dots rather than a bar because the reference draws dots, and the difference
 * is not decoration — a row of eleven dots says "about two thirds" at a glance
 * without anyone reading the figures beside it, which is the whole job of the
 * thing.
 *
 * How many are filled is computed from the fraction rather than stored, so the
 * meter cannot disagree with the "$2567/$5000" printed above it.
 */
export function GoalDots({ count, fraction }: { count: number; fraction: number }) {
  const filled = Math.round(count * Math.min(1, Math.max(0, fraction)));

  return (
    <View style={{ flexDirection: 'row', gap: DOT_GAP }}>
      {Array.from({ length: count }, (_, i) => (
        <View
          key={i}
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: radius.full,
            backgroundColor: i < filled ? ps.dotOn : ps.dotOff,
          }}
        />
      ))}
    </View>
  );
}
