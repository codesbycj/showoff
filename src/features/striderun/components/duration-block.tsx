import { View } from 'react-native';

import { elapsed, session } from '../data/run';
import { T } from './text';

type Props = { margin: number };

/**
 * How long the run has been going — the dominant element on the screen (R8).
 *
 * The clock is formatted from the session's own seconds, so it is the same
 * number the pace below it is computed from (R9).
 */
export function DurationBlock({ margin }: Props) {
  return (
    <View style={{ marginHorizontal: margin, flex: 1, justifyContent: 'center' }}>
      {/* STEP 1.06 duration label
      <T variant="label">{session.durationLabel}</T>
      */}
      {/* STEP 1.07 t
      <T variant="duration">{elapsed()}</T>
      */}
    </View>
  );
}
