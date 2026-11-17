import { useId } from 'react';
import { View } from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { stars, towers } from '../data/onboard';
import { ct } from '../theme';

import { SceneProps, archPath } from './_night-scene-shared';

/**
 * The arch window, and the skyline inside it.
 *
 * **Drawn, not photographed** (I4, §2.5). A minaret silhouette is an *idea*
 * expressed as a flat shape, not a reproduction of a specific building, and
 * the board draws it the same way.
 *
 * The skyline is clipped to the arch with a `<ClipPath>` rather than stacked
 * over it, so nothing can spill past the frame (R2) whatever the screen size.
 *
 * **`useId` for the clip and both gradients** — ids are document-global on
 * web, so two sharing one id make everything render in the first colour
 * (Part 7).
 */
export function ArchScene({ width, height }: SceneProps) {
  const clip = useId();
  const inner = useId();
  const halo = useId();

  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  const moonX = w * 0.62;
  const moonY = h * 0.26;
  const moonR = Math.max(w * 0.058, 9);
  const d = archPath(w, h, 6);

  return (
    <View style={{ width: w, height: h }} pointerEvents="none">
      <Svg width={w} height={h}>
        <Defs>
          <ClipPath id={clip}>
            <Path d={d} />
          </ClipPath>
          <LinearGradient id={inner} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#021D2C" />
            <Stop offset="1" stopColor="#0B4660" />
          </LinearGradient>
          <RadialGradient id={halo} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={ct.glow} stopOpacity={0.7} />
            <Stop offset="1" stopColor={ct.glow} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        {/* The frame, then the window cut into it. */}
        <Path d={archPath(w, h, 0)} fill={ct.far} opacity={0.55} />

        <Rect x={0} y={0} width={w} height={h} fill={`url(#${inner})`} clipPath={`url(#${clip})`} />
        <Ellipse
          cx={moonX}
          cy={moonY}
          rx={w * 0.34}
          ry={h * 0.14}
          fill={`url(#${halo})`}
          clipPath={`url(#${clip})`}
        />

        {stars.map((s) => (
          <Circle
            key={s.id}
            cx={s.x * w}
            cy={s.y * h}
            r={s.r}
            fill={ct.star}
            opacity={s.o}
            clipPath={`url(#${clip})`}
          />
        ))}

        {/* The crescent, cut as one path so it is a real hole, not a disc. */}
        <Path
          d={`M${moonX - moonR} ${moonY}
              a${moonR} ${moonR} 0 1 0 ${moonR * 2} 0
              a${moonR} ${moonR} 0 1 0 ${-moonR * 2} 0
              M${moonX + moonR * 0.42 - moonR * 0.9} ${moonY - moonR * 0.3}
              a${moonR * 0.9} ${moonR * 0.9} 0 1 0 ${moonR * 1.8} 0
              a${moonR * 0.9} ${moonR * 0.9} 0 1 0 ${-moonR * 1.8} 0`}
          fill={ct.moon}
          fillRule="evenodd"
          clipPath={`url(#${clip})`}
        />

        {/* The skyline, clipped to the window. */}
        {towers.map((t) => {
          const tw = t.w * w;
          const th = t.h * h;
          const x = t.x * w;
          const base = h;
          return t.dome ? (
            <Path
              key={t.id}
              d={`M${x} ${base - th}
                  C${x + tw * 1.1} ${base - th * 0.5} ${x + tw * 1.1} ${base} ${x + tw * 1.4} ${base}
                  L${x - tw * 1.4} ${base}
                  C${x - tw * 1.1} ${base} ${x - tw * 1.1} ${base - th * 0.5} ${x} ${base - th} Z`}
              fill={ct.near}
              clipPath={`url(#${clip})`}
            />
          ) : (
            <Path
              key={t.id}
              d={`M${x - tw / 2} ${base} L${x - tw / 2} ${base - th}
                  C${x - tw / 2} ${base - th - tw} ${x + tw / 2} ${base - th - tw} ${x + tw / 2} ${base - th}
                  L${x + tw / 2} ${base} Z`}
              fill={ct.near}
              clipPath={`url(#${clip})`}
            />
          );
        })}

        {/* The central dome, largest and nearest. */}
        <Path
          d={`M${w * 0.5} ${h * 0.58}
              C${w * 0.68} ${h * 0.68} ${w * 0.74} ${h * 0.86} ${w * 0.75} ${h}
              L${w * 0.25} ${h}
              C${w * 0.26} ${h * 0.86} ${w * 0.32} ${h * 0.68} ${w * 0.5} ${h * 0.58} Z`}
          fill={ct.near}
          clipPath={`url(#${clip})`}
        />

        {/* The frame's own stroke, over everything inside it. */}
        <Path d={d} stroke={ct.far} strokeWidth={Math.max(w * 0.016, 4)} fill="none" />
      </Svg>
    </View>
  );
}
