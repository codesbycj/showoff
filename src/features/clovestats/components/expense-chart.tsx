import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Line, Path, Stop } from 'react-native-svg';

import { AXIS_H } from '../layout';
import { ct, type } from '../theme';
import { marked, money, months } from '../data/stats';
import { T } from './text';

/**
 * Six months of outgoings as an area, with the month the tooltip names
 * marked on it.
 *
 * **The curve is the data.** The y scale is built from the series' own
 * minimum and maximum with a little headroom, so the marked point is at the
 * top because June *is* the largest month — not because it was drawn there.
 * A tooltip pinned to a peak the series does not have is the defect R9 is
 * about.
 *
 * The smoothing is Catmull-Rom converted to cubic Béziers, which passes
 * through every point rather than near it. A quadratic midpoint fit is
 * cheaper and visibly misses the peaks, which on a spending chart means the
 * highest month reads lower than the one beside it.
 */
export function ExpenseChart({ width, height }: { width: number; height: number }) {
  const fillId = `cloveArea-${useId()}`;

  const values = months.map((m) => m.value);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const top = 26; // room for the dot and the curve's overshoot
  const bottom = height - 10;
  const span = hi - lo || 1;

  const x = (i: number) => (i / (months.length - 1)) * width;
  const y = (v: number) => {
    const t = (v - (lo - span * 0.55)) / (span * 1.75);
    return bottom - t * (bottom - top);
  };

  const pts = months.map((m, i) => ({ x: x(i), y: y(m.value) }));

  // Catmull-Rom -> cubic. The tension is the classic 1/6; anything looser
  // puts a kink in the run from May to June.
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  const area = `${d} L${pts[pts.length - 1].x} ${height} L${pts[0].x} ${height} Z`;

  const markIndex = months.findIndex((m) => m.id === marked.id);
  const mark = pts[markIndex];

  // The bubble sits to the left of the dot, as the reference has it, and is
  // clamped so it cannot run off either edge of the chart.
  const tipW = 92;
  const tipLeft = Math.max(0, Math.min(width - tipW, mark.x - tipW - 8));

  return (
    <View>
      <View style={{ width, height }}>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={ct.wash} stopOpacity="0.95" />
              <Stop offset="1" stopColor={ct.wash} stopOpacity="0.05" />
            </LinearGradient>
          </Defs>
          <Path d={area} fill={`url(#${fillId})`} />
          <Path d={d} stroke={ct.lime} strokeWidth={2.6} fill="none" strokeLinecap="round" />
          <Line x1={mark.x} y1={mark.y} x2={mark.x} y2={height} stroke={ct.ink} strokeWidth={1} />
          <Circle cx={mark.x} cy={mark.y} r={4.6} fill={ct.ink} />
        </Svg>

        <View
          style={{
            position: 'absolute',
            left: tipLeft,
            top: Math.max(0, mark.y - 14),
            width: tipW,
            height: 30,
            borderRadius: 9,
            backgroundColor: ct.page,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#13300F',
            shadowOpacity: 0.16,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          }}
        >
          <T variant="tip" color={ct.ink} style={{ height: type.tip.line }}>
            {money(marked.value)}
          </T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', height: AXIS_H, alignItems: 'center' }}>
        {months.map((m, i) => (
          <View
            key={m.id}
            style={{
              flex: 1,
              alignItems: i === 0 ? 'flex-start' : i === months.length - 1 ? 'flex-end' : 'center',
            }}
          >
            <T
              variant={m.id === marked.id ? 'axisOn' : 'axis'}
              color={m.id === marked.id ? ct.ink : ct.muted}
              style={{ height: type.axis.line }}
            >
              {m.label}
            </T>
          </View>
        ))}
      </View>
    </View>
  );
}
