import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { arcPath, polar } from '../arc';
import { GAUGE_GAP_DEG, GAUGE_STROKE } from '../layout';
import { nr } from '../theme';
import { T } from './text';

/**
 * The calories gauge: a thick arc open at the bottom, with the day's figure
 * inside it.
 *
 * The arc's gradient is the screen's whole argument — it runs protein, carbs,
 * fat from one end to the other, which are the same three colours as the three
 * rings underneath. The big ring is the little ones added up.
 *
 * The drawn box is **cropped to the ink**. A ring with a 118 degree gap at the
 * bottom leaves a quarter of its square empty, and a component that reports
 * that empty quarter as its height pushes everything below it down by 30dp of
 * nothing. The `viewBox` keeps the full circle's coordinates and the viewport
 * is shortened to where the arc's ends actually are — SVG's own clipping, not
 * `overflow: 'hidden'`, which Android does not forgive next to an elevation.
 *
 * The centre figure is an RN `Text` over the `Svg`, not an SVG `Text`: it has
 * to use the same ramp as the rest of the screen, and `includeFontPadding` is
 * not a thing SVG text has.
 */
export function CalorieGauge({
  size,
  fraction,
  value,
  label,
}: {
  size: number;
  /** How much of the day's goal is already eaten, 0 to 1. */
  fraction: number;
  value: string;
  label: string;
}) {
  const id = useId();

  const r = (size - GAUGE_STROKE) / 2;
  const c = size / 2;
  const half = (360 - GAUGE_GAP_DEG) / 2;
  const span = half * 2;
  const filled = span * Math.min(1, Math.max(0, fraction));

  /**
   * The gradient runs along the chord of the *filled* arc, start point to end
   * point, rather than across the whole box.
   *
   * Across the box, the three colours are spent on ink that mostly is not
   * there: at 64% of the day eaten the arc never reaches the right-hand side,
   * so the purple end of the ramp never appears and the gauge reads as an
   * orange arc. Along the chord, protein is always at the start and fat always
   * at the live end, whatever the number is — which is the thing the gradient
   * is for.
   */
  const from = polar(c, c, r, -half);
  const to = polar(c, c, r, -half + filled);

  /** Where the arc's lowest ink sits, plus its own round cap. */
  const boxH = c + r * Math.cos(((180 - half) * Math.PI) / 180) + GAUGE_STROKE / 2;

  return (
    <View style={{ width: size, height: boxH }}>
      <Svg width={size} height={boxH} viewBox={`0 0 ${size} ${boxH}`}>
        <Defs>
          <LinearGradient
            id={id}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={nr.protein} />
            <Stop offset="0.5" stopColor={nr.carbs} />
            <Stop offset="1" stopColor={nr.fat} />
          </LinearGradient>
        </Defs>

        {/* STEP 1.07 the whole day, unspent
        <Path
          d={arcPath(c, c, r, -half, half)}
          stroke={nr.track}
          strokeWidth={GAUGE_STROKE}
          strokeLinecap="round"
          fill="none"
        />
        */}
        {/* STEP 1.08 and how much of it is gone
        <Path
          d={arcPath(c, c, r, -half, -half + filled)}
          stroke={`url(#${id})`}
          strokeWidth={GAUGE_STROKE}
          strokeLinecap="round"
          fill="none"
        />
        */}
      </Svg>

      {/* STEP 1.09 the number, inside the arc
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          // MISTAKE 1.10 the figure came in sitting low
          paddingTop: 24,
          top: c - size * 0.21,
          alignItems: 'center',
        }}
      >
        <T variant="gaugeValue" color={nr.ink}>
          {value}
        </T>
        <T variant="gaugeLabel" color={nr.muted}>
          {label}
        </T>
      </View>
      */}
    </View>
  );
}
