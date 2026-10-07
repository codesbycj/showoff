import { Sparkles } from 'lucide-react-native';
import { Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Polyline, Stop } from 'react-native-svg';

import { R, SP, TYPE, au } from '../theme';

/**
 * Spending over the weeks of a month.
 *
 * Two series: the drawn purple line is this month, the amber one behind it is
 * the comparison. The purple carries a gradient wash down to the baseline, which
 * is why it is a `Path` closed along the bottom rather than a second `Polyline`.
 *
 * The peak callout is a `View` over the chart, not SVG text — `react-native-svg`
 * does not pick up the app's registered families, so a label drawn inside the
 * chart would fall back to the system face while every other label on the screen
 * is Plus Jakarta Sans. It is positioned in dp against the same maths that
 * places the points.
 */
const H = 120;
const PAD_X = 10;
const PAD_Y = 14;

function points(series: readonly number[], w: number) {
  const inner = w - PAD_X * 2;
  const span = H - PAD_Y * 2;
  return series.map((v, i) => ({
    x: PAD_X + (inner * i) / Math.max(series.length - 1, 1),
    y: PAD_Y + span * (1 - Math.min(Math.max(v, 0), 1)),
  }));
}

export function TrendChart({
  title,
  subtitle,
  peak,
  series,
  shadow,
  weeks,
  width,
}: {
  title: string;
  subtitle: string;
  peak: string;
  series: readonly number[];
  shadow: readonly number[];
  weeks: readonly { key: string; label: string; value: string; peak?: boolean }[];
  width: number;
}) {
  const inner = width - (SP.md + 2) * 2;
  const main = points(series, inner);
  const comp = points(shadow, inner);
  const line = (p: typeof main) => p.map((q) => `${q.x},${q.y}`).join(' ');
  const area =
    `M${main[0].x},${H} ` +
    main.map((q) => `L${q.x},${q.y}`).join(' ') +
    ` L${main[main.length - 1].x},${H} Z`;
  const peakPoint = main[1];

  return (
    <View
      style={{
        backgroundColor: au.surfaceLowest,
        borderRadius: R.lg,
        padding: SP.md + 2,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={[TYPE.headlineSm, { color: au.onSurface }]}>{title}</Text>
          <Text style={[TYPE.bodySm, { marginTop: 2, color: au.onSurfaceVariant }]}>
            {subtitle}
          </Text>
        </View>
        <Sparkles size={18} color={au.primary} strokeWidth={2.2} />
      </View>

      <View style={{ height: H, marginTop: SP.sm }}>
        <Svg width={inner} height={H}>
          <Defs>
            <LinearGradient id="auwash" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={au.primary} stopOpacity="0.18" />
              <Stop offset="1" stopColor={au.primary} stopOpacity="0" />
            </LinearGradient>
          </Defs>

          <Path d={area} fill="url(#auwash)" />
          <Polyline
            points={line(comp)}
            fill="none"
            stroke={au.secondaryBright}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Polyline
            points={line(main)}
            fill="none"
            stroke={au.primary}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {main.map((q) => (
            <Circle
              key={q.x}
              cx={q.x}
              cy={q.y}
              r={4.5}
              fill={au.surfaceLowest}
              stroke={au.primary}
              strokeWidth={3}
            />
          ))}
        </Svg>

        <View
          style={{
            position: 'absolute',
            left: Math.max(peakPoint.x - 46, 0),
            top: Math.max(peakPoint.y - 34, 0),
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: au.onSurface,
            borderRadius: R.full,
            paddingHorizontal: 9,
            paddingVertical: 5,
          }}
        >
          <View
            style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: au.secondaryBright }}
          />
          <Text style={[TYPE.labelSm, { color: au.onInverse }]}>{peak}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: SP.sm }}>
        {weeks.map((w) => (
          <View key={w.key} style={{ flex: 1 }}>
            <Text
              style={[TYPE.bodySm, { color: w.peak ? au.primary : au.onSurfaceVariant }]}
              numberOfLines={1}
            >
              {w.label}
            </Text>
            <Text
              style={[TYPE.labelMd, { marginTop: 2, color: w.peak ? au.primary : au.onSurface }]}
            >
              {w.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
