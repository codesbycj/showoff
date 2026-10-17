import { View } from 'react-native';

import { nb } from '../theme';
import { T } from './text';

/**
 * The card number: three groups of four dots, then the last four digits.
 *
 * The dots are drawn, not typed. Set as bullets they come out of Inter at
 * 4.0dp across a 7.0dp pitch where the reference measures 2.8dp across 5.3dp —
 * a mask 20% too wide overall — and no combination of size and tracking fixes
 * both the dot and the gap, because tracking moves the gap without touching
 * the dot. Twelve circles take the numbers straight from the measurement:
 * 2.8dp dots, 5.3dp pitch, 6.7dp between groups.
 *
 * The last four are type, with +0.9 of tracking: the reference's face sets
 * digits about 11% wider than Inter does at a matched cap height, and that gap
 * is the one thing letter-spacing *can* fix.
 */
const DOT = 2.8;
const DOT_PITCH = 5.3;
const GROUP_GAP = 6.7;
const DIGIT_GAP = 7.5;

function DotGroup() {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[0, 1, 2, 3].map((i) => (
        <View
          key={i}
          style={{
            width: DOT,
            height: DOT,
            borderRadius: DOT / 2,
            backgroundColor: nb.onCard,
            marginLeft: i === 0 ? 0 : DOT_PITCH - DOT,
          }}
        />
      ))}
    </View>
  );
}

export function MaskedNumber({ last4 }: { last4: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={{ marginLeft: i === 0 ? 0 : GROUP_GAP }}>
          <DotGroup />
        </View>
      ))}
      <T variant="cardNumber" color={nb.onCard} style={{ marginLeft: DIGIT_GAP }}>
        {last4}
      </T>
    </View>
  );
}
