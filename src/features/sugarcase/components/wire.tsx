import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { WIRE } from '../layout';
import { sc } from '../theme';

/**
 * The dashed connector between two steps.
 *
 * Drawn rather than built from views: a dashed line in React Native means a
 * row of little boxes, and the reference's wire has a dot on each end. One
 * `Path` with a `strokeDasharray` is the same mark on every platform and is
 * what an SVG is for.
 *
 * It is a sibling between two cards rather than a border on either, so the
 * two nodes know nothing about being connected — which is what lets the flow
 * come from data.
 */
export function Wire() {
  return (
    <View style={{ height: WIRE, alignItems: 'center' }} pointerEvents="none">
      <Svg width={14} height={WIRE} viewBox={`0 0 14 ${WIRE}`}>
        <Circle cx={7} cy={2.5} r={2.5} fill={sc.wire} />
        <Path
          d={`M7 5 V ${WIRE - 5}`}
          stroke={sc.wire}
          strokeWidth={1.6}
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
        <Circle cx={7} cy={WIRE - 2.5} r={2.5} fill={sc.wire} />
      </Svg>
    </View>
  );
}
