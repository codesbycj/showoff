import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { chart, summary } from '../data/stats';
import { BUBBLE_GAP, BUBBLE_HEIGHT, MARKER, useChart } from '../layout';
import { radius, sj } from '../theme';
import { smoothPath, toPixels } from '../spline';
import { T } from './text';

/**
 * Two curves, a dot on the live one, and what it is worth.
 *
 * The curves are smoothed through their points rather than joined — see
 * `spline.ts` for why that is not decoration.
 *
 * The bubble and the dot are **React Native views over the Svg**, not SVG
 * elements. The bubble carries type from the screen's own ramp, which SVG text
 * has no access to; and on web an absolutely positioned sibling paints above
 * an `<svg>` whatever the order, which here is what is wanted.
 *
 * Everything is positioned from the same computed point, so the dot, the
 * dashed drop line and the bubble cannot disagree about where the live value
 * is.
 */
export function LineChart() {
  const { width, height } = useChart();

  const front = toPixels(chart.front, width, height);
  const back = toPixels(chart.back, width, height);
  const live = front[chart.live];

  return (
    <View style={{ width, height: height + BUBBLE_HEIGHT + BUBBLE_GAP }}>
      <View style={{ marginTop: BUBBLE_HEIGHT + BUBBLE_GAP }}>
        <Svg width={width} height={height}>
          <Path
            d={`M ${live.x} ${live.y} V ${height}`}
            stroke={sj.onDarkMuted}
            strokeWidth={1}
            strokeDasharray="3 4"
            fill="none"
          />
          <Path
            d={smoothPath(back)}
            stroke={sj.limeDeep}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d={smoothPath(front)}
            stroke={sj.lime}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
          <Circle cx={live.x} cy={live.y} r={MARKER / 2} fill={sj.onDark} />
          <Circle cx={live.x} cy={live.y} r={MARKER / 2 - 3} fill={sj.lime} />
        </Svg>
      </View>

      <View
        style={{
          position: 'absolute',
          left: live.x - 36,
          top: live.y - 4,
          alignItems: 'center',
        }}
        pointerEvents="none"
      >
        <View
          style={{
            height: BUBBLE_HEIGHT,
            paddingHorizontal: 12,
            borderRadius: radius.pill,
            backgroundColor: sj.lime,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="callout" color={sj.onLime}>
            {summary.callout}
          </T>
        </View>
        <View
          style={{
            width: 9,
            height: 9,
            marginTop: -4.5,
            backgroundColor: sj.lime,
            transform: [{ rotate: '45deg' }],
          }}
        />
      </View>
    </View>
  );
}
