import { View } from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

import { path, progress, streets } from '../data/route';
import { ct } from '../theme';

type Props = { width: number; height: number };

/**
 * The delivery map.
 *
 * **Built as the map *idea*, not traced** (I4, §2.5). A map has no idea to
 * interpret, so vectoring one path by path is copying with extra steps. I4
 * gives two honest routes; this is the second — a land tone, a park, a river,
 * a road grid, and the route line with its two ends and the rider on it.
 *
 * **Everything survives an empty `path`** (I7): the reveal fills that array one
 * point at a time, and `path[0]` on an empty array is `undefined`, which
 * becomes a `NaN` coordinate and throws inside `react-native-svg`. The
 * component returns `null` until there are two points, and the rider's
 * position is clamped to the last segment.
 *
 * It is all one `<svg>` in user space: on web an absolutely-positioned sibling
 * paints *above* an `<svg>` and would hide it (Part 7).
 *
 * **The land tone is the screen's own background, not a rect in here.** As a
 * rect it was the first thing the reveal painted and it covered 81% of the
 * frame in one step (RULES 0.3); as the page's ground it is simply there, and
 * the map then arrives feature by feature over it (§5.5).
 */
export function RouteMap({ width, height }: Props) {
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  if (path.length < 2) return null;

  const px = (p: { x: number; y: number }) => p.x * w;
  const py = (p: { x: number; y: number }) => p.y * h;

  const line = path
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p).toFixed(1)} ${py(p).toFixed(1)}`)
    .join(' ');

  // Where the rider is: walk the polyline to `progress` of its total length.
  const lengths: number[] = [];
  let totalLen = 0;
  for (let i = 1; i < path.length; i += 1) {
    const dx = px(path[i]) - px(path[i - 1]);
    const dy = py(path[i]) - py(path[i - 1]);
    const len = Math.sqrt(dx * dx + dy * dy);
    lengths.push(len);
    totalLen += len;
  }
  let want = Math.max(totalLen, 1) * Math.min(Math.max(progress, 0), 1);
  let seg = 0;
  while (seg < lengths.length - 1 && want > lengths[seg]) {
    want -= lengths[seg];
    seg += 1;
  }
  const t = lengths[seg] > 0 ? Math.min(want / lengths[seg], 1) : 0;
  const rx = px(path[seg]) + (px(path[seg + 1]) - px(path[seg])) * t;
  const ry = py(path[seg]) + (py(path[seg + 1]) - py(path[seg])) * t;

  const start = path[0];
  const end = path[path.length - 1];

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h}>
        {/* STEP 1.02 path
        <Path
          d={`M${w * -0.05} ${h * 0.26} Q${w * 0.2} ${h * 0.18} ${w * 0.3} ${h * 0.3}
              Q${w * 0.38} ${h * 0.42} ${w * 0.2} ${h * 0.5}
              Q${w * 0.02} ${h * 0.54} ${w * -0.05} ${h * 0.44} Z`}
          fill={ct.park}
        />
        */}

        {/* STEP 1.03 the next block

        */}
        {/* STEP 1.04 path
        {[
          `M${w * 0.6} ${-h * 0.05} L${w * 0.6} ${h * 1.05}`,
          `M${w * 0.4} ${-h * 0.05} L${w * 0.4} ${h * 1.05}`,
          `M${-w * 0.05} ${h * 0.34} L${w * 1.05} ${h * 0.34}`,
          `M${-w * 0.05} ${h * 0.56} L${w * 1.05} ${h * 0.56}`,
          `M${-w * 0.05} ${h * 0.84} L${w * 1.05} ${h * 0.84}`,
          `M${w * 1.05} ${h * 0.2} L${w * 0.46} ${h * 1.05}`,
        ].map((d, i) => (
          <Path
            key={`c${i}`}
            d={d}
            stroke={ct.roadEdge}
            strokeWidth={i < 2 ? 15 : 12}
            fill="none"
          />
        ))}
        */}
        {/* STEP 1.05 path
        {[
          `M${w * 0.6} ${-h * 0.05} L${w * 0.6} ${h * 1.05}`,
          `M${w * 0.4} ${-h * 0.05} L${w * 0.4} ${h * 1.05}`,
          `M${-w * 0.05} ${h * 0.34} L${w * 1.05} ${h * 0.34}`,
          `M${-w * 0.05} ${h * 0.56} L${w * 1.05} ${h * 0.56}`,
          `M${-w * 0.05} ${h * 0.84} L${w * 1.05} ${h * 0.84}`,
          `M${w * 1.05} ${h * 0.2} L${w * 0.46} ${h * 1.05}`,
        ].map((d, i) => (
          <Path key={`r${i}`} d={d} stroke={ct.road} strokeWidth={i < 2 ? 11 : 8} fill="none" />
        ))}
        */}

        {/* STEP 1.06 label
        {streets.map((s) => (
          <SvgText
            key={s.id}
            x={s.x * w}
            y={s.y * h}
            fill={ct.sub}
            fontSize={10}
            transform={`rotate(${s.angle} ${s.x * w} ${s.y * h})`}
          >
            {s.label}
          </SvgText>
        ))}
        */}

        {/* STEP 1.07 the next block

        */}
        {/* STEP 1.08 path
        <Path
          d={line}
          stroke={ct.white}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        */}
        {/* STEP 1.09 path
        <Path
          d={line}
          stroke={ct.brand}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        */}

        {/* STEP 1.10 the next block

        */}
        {/* STEP 1.11 circle
        <Circle cx={px(start)} cy={py(start)} r={11} fill={ct.brand} />
        */}
        {/* STEP 1.12 circle
        <Circle cx={px(start)} cy={py(start)} r={4} fill={ct.white} />
        */}

        {/* STEP 1.13 the next block

        */}
        {/* STEP 1.14 circle
        <Circle cx={px(end)} cy={py(end)} r={10} fill={ct.ink} />
        */}
        {/* STEP 1.15 circle
        <Circle cx={px(end)} cy={py(end)} r={3.5} fill={ct.white} />
        */}

        {/* STEP 1.16 the next block

        */}
        {/* STEP 1.17 circle
        <Circle cx={rx} cy={ry} r={15} fill="rgba(224,41,29,0.18)" />
        */}
        {/* STEP 1.18 circle
        <Circle cx={rx} cy={ry} r={9} fill={ct.white} />
        */}
        {/* STEP 1.19 circle
        <Circle cx={rx} cy={ry} r={5.5} fill={ct.brand} />
        */}
      </Svg>
    </View>
  );
}
