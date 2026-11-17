import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { DAY_PROGRESS, week } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The week, with today's plan drawn as a ring around it.
 *
 * **R9: the ring sweeps the progress it stands for** — `DAY_PROGRESS` of the
 * circle, drawn with `strokeDasharray`, rather than an arbitrary arc. The
 * fraction is clamped, because a progress figure over one would otherwise draw
 * a second lap (I7).
 */
export function WeekStrip({ margin, height }: Props) {
  const gid = useId();
  const size = 38;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const swept = circumference * Math.min(Math.max(DAY_PROGRESS, 0), 1);

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {week.map((entry) => (
        <View key={entry.id} style={{ alignItems: 'center', gap: 6 }}>
          <View
            style={{
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {entry.today ? (
              <Svg width={size} height={size} style={{ position: 'absolute' }}>
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  stroke={ct.line}
                  strokeWidth={stroke}
                  fill="none"
                />
                <Circle
                  key={gid}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  stroke={ct.rose}
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={`${swept} ${circumference}`}
                  fill="none"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              </Svg>
            ) : (
              <View
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: 1.5,
                  borderColor: ct.line,
                  backgroundColor: entry.done ? ct.tray : 'transparent',
                }}
              />
            )}
          </View>

          <T variant={entry.today ? 'dayOn' : 'day'}>{entry.label}</T>
        </View>
      ))}
    </View>
  );
}
