import { View } from 'react-native';

import { SCRUB_KNOB, SCRUB_RAIL } from '../layout';
import { radius, rx } from '../theme';

/**
 * The 360° control under the car: a rail with a knob on it.
 *
 * Presentational — it says the car can be spun without pretending to spin it.
 * A control that moved would need the artwork to have 360 frames of itself,
 * which a drawn car does not, and a knob that slides over a car that never
 * turns is worse than one that plainly does not move.
 *
 * `position` is a fraction so the knob sits in the same place at any width.
 */
export function Scrubber({ position = 0.5 }: { position?: number }) {
  return (
    <View style={{ height: SCRUB_KNOB, justifyContent: 'center' }}>
      <View
        style={{
          height: SCRUB_RAIL,
          borderRadius: radius.full,
          backgroundColor: rx.onStageMuted,
          opacity: 0.45,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: `${position * 100}%`,
          marginLeft: -SCRUB_KNOB / 2,
          width: SCRUB_KNOB,
          height: SCRUB_KNOB,
          borderRadius: radius.full,
          backgroundColor: rx.onStage,
        }}
      />
    </View>
  );
}
