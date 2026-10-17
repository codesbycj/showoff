import { View } from 'react-native';

import { LEDE_WIDTH } from '../layout';
import { vd } from '../theme';
import { T } from './text';

/**
 * The sentence under the headline.
 *
 * Held to a fraction of the page rather than the full column width: a line of
 * 15.5dp text across a 345dp measure runs to about 58 characters, which is
 * past the point where the eye starts losing its place on the return. 86%
 * brings it back to two comfortable lines on a 393dp phone, and keeps it at
 * two on a 430dp one instead of collapsing to one long one.
 */
export function Lede({ children }: { children: string }) {
  return (
    <View style={{ width: `${LEDE_WIDTH * 100}%` }}>
      <T variant="lede" color={vd.lede}>
        {children}
      </T>
    </View>
  );
}
