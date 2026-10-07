import { SlidersHorizontal } from 'lucide-react-native';
import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { R, SP, TYPE, au } from '../theme';

/**
 * How much of the month's cap is spent.
 *
 * The arc is a dashed circle rotated to start at twelve o'clock, so the gap sits
 * at the top where it reads as "remaining" rather than at three o'clock, where
 * SVG puts zero and the gap would look like a drawing error.
 */
export function RingGauge({
  title,
  note,
  pct,
  size = 54,
}: {
  title: string;
  note: string;
  pct: number;
  size?: number;
}) {
  const sw = 6;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const done = Math.min(Math.max(pct, 0), 100) / 100;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: au.surfaceLowest,
        borderRadius: R.lg,
        padding: SP.md,
      }}
    >
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} style={{ position: 'absolute' }}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={au.surfaceHigh}
            strokeWidth={sw}
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={au.primary}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={`${circ * done} ${circ}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <Text style={[TYPE.labelMd, { color: au.onSurface }]}>{pct}%</Text>
      </View>

      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={[TYPE.labelLg, { color: au.onSurface }]}>{title}</Text>
        <Text style={[TYPE.bodySm, { marginTop: 2, color: au.onSurfaceVariant }]}>{note}</Text>
      </View>

      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          backgroundColor: au.surfaceLow,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SlidersHorizontal size={17} color={au.primary} strokeWidth={2.2} />
      </View>
    </View>
  );
}
