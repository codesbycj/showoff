import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { axisTop, days } from '../data/timeline';
import { ct } from '../theme';

type Props = { width: number; height: number; margin: number };

type Point = { x: number; y: number };

/**
 * Smooth a polyline through its own points, Catmull-Rom converted to cubics.
 *
 * It is written to survive **one** point and **none**: the reveal fills `days`
 * one entry at a time, and a loop that indexed `i + 1` unguarded would throw
 * at step one (I7).
 */
function smooth(points: Point[]) {
  if (points.length === 0) return '';
  if (points.length === 1) return `M${points[0].x} ${points[0].y}`;

  const d = [`M${points[0].x} ${points[0].y}`];
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };

    d.push(`C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`);
  }
  return d.join(' ');
}

/**
 * The week's two series.
 *
 * **The picture agrees with the numbers** (R9): both curves are plotted
 * against the same axis top, which is the first round ten at or above the
 * tallest reading of either, so neither can out-reach the plot. The dot marks
 * the last point of the solid series, not a decoration placed near it.
 *
 * Everything here survives `days` being empty, because the reveal fills it one
 * entry at a time (I7).
 *
 * **The `<svg>` is wrapped in a `View`.** On web an `<svg>` is not a
 * positioned element, so the page's absolutely positioned gradient ground - an
 * earlier sibling - painted straight over it and the plot came back blank. A
 * `View` is `position: relative`, which puts the chart back above the ground
 * (RULES Part 7).
 */
export function TimelineChart({ width, height, margin }: Props) {
  if (days.length === 0) return <View style={{ height }} />;

  const plotW = width - margin * 2;
  const top = axisTop();
  const step = days.length > 1 ? plotW / (days.length - 1) : 0;

  const at = (value: number, i: number) => ({
    x: margin + step * i,
    y: height - 10 - (value / top) * (height - 30),
  });

  const risk = days.map((day, i) => at(day.risk, i));
  const threat = days.map((day, i) => at(day.threat, i));
  const last = risk[risk.length - 1];

  // One `.map`, baseline included, so the chart is one beat.
  //
  // The baseline does not depend on the series, which is what makes the mount
  // paint: with one day revealed a curve through one point draws nothing at
  // all, and the step measured 0.0000%. Drawn as its own element above the map
  // it simply moved the problem to the map.
  //
  // Staged mark by mark, the dotted series and the solid one were revealed
  // while `days` still held a single entry — and a curve through one point
  // draws nothing, so both steps measured 0.0000%. A keyed list's shell is
  // merged with its first row by the stager, which makes the chart arrive
  // whole, as the one element it is (I9).
  const marks = [
    {
      id: 'axis',
      d: `M${margin} ${height - 10} L${width - margin} ${height - 10}`,
      stroke: ct.line,
      width: 1.5,
      dash: undefined as string | undefined,
    },
    { id: 'threat', d: smooth(threat), stroke: ct.magenta, width: 2.2, dash: '1 7' },
    { id: 'risk', d: smooth(risk), stroke: ct.indigo, width: 4.4, dash: undefined },
  ];

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {marks.map((mark) => (
          <Path
            key={mark.id}
            d={mark.d}
            stroke={mark.stroke}
            strokeWidth={mark.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={mark.dash}
            fill="none"
          />
        ))}

        {/* STEP 1.09 circle
        <Circle cx={last.x} cy={last.y} r={6} fill={ct.white} stroke={ct.indigo} strokeWidth={3} />
        */}
      </Svg>
    </View>
  );
}
