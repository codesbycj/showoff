import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

type Props = { width: number; height: number };

/**
 * The map.
 *
 * **Built as the map *idea*, not traced** (I4, §2.5). A map has no idea to
 * interpret, so vectoring one path by path is copying with extra steps — and
 * I4 gives exactly two honest routes: a static tile from a free-licensed
 * source, or the idea of a map over a flat ground. This is the second: a land
 * tone, a park, a river, a grid of roads, and a radius ring around the
 * selected venue. No real place is depicted and none is implied.
 *
 * It is the ground for this region of the screen, so it may paint before the
 * pins are staged over it (§5.5).
 *
 * Everything is in user space in one `<svg>`: on web an absolutely-positioned
 * sibling paints *above* an `<svg>` and would hide it (Part 7), so the roads
 * are paths rather than positioned Views.
 */
export function MapGround({ width, height }: Props) {
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h}>
        <Rect x={0} y={0} width={w} height={h} fill={ct.land} />

        {/* A park and a river, so the ground is not a flat slab. */}
        <Path
          d={`M${w * 0.04} ${h * 0.46} Q${w * 0.16} ${h * 0.3} ${w * 0.3} ${h * 0.4}
              Q${w * 0.38} ${h * 0.48} ${w * 0.28} ${h * 0.6}
              Q${w * 0.14} ${h * 0.68} ${w * 0.04} ${h * 0.58} Z`}
          fill={ct.park}
        />
        <Path
          d={`M${w * 1.02} ${h * 0.12} Q${w * 0.78} ${h * 0.26} ${w * 0.84} ${h * 0.46}
              Q${w * 0.9} ${h * 0.68} ${w * 0.72} ${h * 1.04}`}
          stroke={ct.water}
          strokeWidth={h * 0.09}
          fill="none"
          strokeLinecap="round"
        />

        {/* Roads: a casing and a fill, which is what makes them read as roads. */}
        {[
          `M${-w * 0.05} ${h * 0.3} L${w * 1.05} ${h * 0.22}`,
          `M${-w * 0.05} ${h * 0.74} L${w * 1.05} ${h * 0.82}`,
          `M${w * 0.42} ${-h * 0.05} L${w * 0.5} ${h * 1.05}`,
          `M${w * 0.14} ${h * 1.05} L${w * 0.34} ${-h * 0.05}`,
          `M${w * 0.68} ${-h * 0.05} L${w * 0.94} ${h * 1.05}`,
        ].map((d, i) => (
          <Path key={`c${i}`} d={d} stroke={ct.roadEdge} strokeWidth={i < 2 ? 11 : 8} fill="none" />
        ))}
        {[
          `M${-w * 0.05} ${h * 0.3} L${w * 1.05} ${h * 0.22}`,
          `M${-w * 0.05} ${h * 0.74} L${w * 1.05} ${h * 0.82}`,
          `M${w * 0.42} ${-h * 0.05} L${w * 0.5} ${h * 1.05}`,
          `M${w * 0.14} ${h * 1.05} L${w * 0.34} ${-h * 0.05}`,
          `M${w * 0.68} ${-h * 0.05} L${w * 0.94} ${h * 1.05}`,
        ].map((d, i) => (
          <Path key={`r${i}`} d={d} stroke={ct.road} strokeWidth={i < 2 ? 8 : 5} fill="none" />
        ))}

        {/* The search radius around the selected venue. */}
        <Circle
          cx={w * 0.56}
          cy={h * 0.42}
          r={Math.min(w, h) * 0.3}
          fill="rgba(33,130,54,0.08)"
          stroke="rgba(33,130,54,0.3)"
          strokeWidth={1.2}
        />
      </Svg>
    </View>
  );
}
