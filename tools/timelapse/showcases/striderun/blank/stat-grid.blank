import { View } from 'react-native';

import { pace, session } from '../data/run';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number };

/**
 * Distance, pace, heart rate, calories.
 *
 * **R9: the pace is computed** from the duration and the distance rather than
 * typed beside them, so the four figures cannot contradict each other — and
 * the divisor is clamped, because the reveal can leave this screen mid-build
 * and a divide by zero formats as nonsense (I7).
 */
export function StatGrid({ margin }: Props) {
  const stats = [
    { id: 'distance', label: 'DISTANCE · KM', value: session.km.toFixed(2), tag: undefined },
    { id: 'pace', label: 'PACE · /KM', value: pace(), tag: undefined },
    { id: 'hr', label: 'HEART RATE', value: String(session.bpm), tag: session.zone },
    { id: 'kcal', label: 'CALORIES', value: String(session.calories), tag: undefined },
  ];

  return (
    <View style={{ marginHorizontal: margin, flex: 1 }}>
      {/* STEP 1.09 the next block

      */}
      {/* STEP 1.10 view
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          height: 1,
          backgroundColor: ct.line,
        }}
      />
      */}

      {/* STEP 1.11 label
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        {stats.map((stat) => (
          <View key={stat.id} style={{ width: '50%', height: '50%', justifyContent: 'center' }}>
            <T variant="label">{stat.label}</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <T variant="stat">{stat.value}</T>
              {stat.tag ? (
                <View
                  style={{
                    height: 20,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                    backgroundColor: ct.limeSoft,
                    justifyContent: 'center',
                  }}
                >
                  <T variant="chipOff" style={{ color: ct.lime }}>
                    {stat.tag}
                  </T>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </View>
      */}
    </View>
  );
}
