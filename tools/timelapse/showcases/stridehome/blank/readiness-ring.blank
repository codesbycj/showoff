import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { readiness } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { size: number };

/**
 * The readiness score.
 *
 * **R9: the arc sweeps the score.** 82 out of 100 is 82% of the circle, drawn
 * with `strokeDasharray` — not an arbitrary arc with a number inside it.
 *
 * The gradient id comes from `useId`, because SVG ids are document-global on
 * web and a second gradient would otherwise render in this one's colours.
 */
export function ReadinessRing({ size }: Props) {
  const gid = useId();

  const stroke = 10;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const swept = circumference * Math.min(Math.max(readiness.score / 100, 0), 1);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* STEP 1.11 linear gradient
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor={ct.lime} />
            <Stop offset="1" stopColor={ct.violet} />
          </LinearGradient>
        </Defs>

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={ct.cardSoft}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${swept} ${circumference}`}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      */}

      {/* STEP 1.12 score
      <T variant="score">{readiness.score}</T>
      */}
      {/* STEP 1.13 score label
      <T variant="scoreLabel">{readiness.scoreLabel}</T>
      */}
    </View>
  );
}
