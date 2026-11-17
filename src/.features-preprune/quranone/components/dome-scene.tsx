import { View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { ct } from '../theme';

import { SceneProps } from './_night-scene-shared';
import { SkyGround } from './sky-ground';

/**
 * The illustration: an arch, a crescent and a dome.
 *
 * **Drawn, not photographed** (I4, §2.5). A dome silhouette is an *idea*
 * expressed as a flat shape, not a reproduction of a specific building, and
 * the board draws it the same way — so it is in drawing range. Nothing here is
 * traced.
 *
 * It is a **sized block**, not part of the full-bleed ground, so the design
 * bar can see it — see the note on `SkyGround`.
 */
export function DomeScene({ width, height }: SceneProps) {
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  const moonX = w * 0.5;
  const moonY = h * 0.3;
  const moonR = Math.max(w * 0.05, 9);

  return (
    <View style={{ width: w, height: h }} pointerEvents="none">
      <Svg width={w} height={h}>
        {/* The far arch, across the top of the frame. */}
        <Path
          d={`M${-w * 0.05} ${h * 0.22}
              C${w * 0.12} ${h * 0.2} ${w * 0.32} ${h * 0.12} ${w * 0.5} ${h * 0.01}
              C${w * 0.68} ${h * 0.12} ${w * 0.88} ${h * 0.2} ${w * 1.05} ${h * 0.22}`}
          stroke={ct.far}
          strokeWidth={Math.max(h * 0.018, 4)}
          fill="none"
        />

        {/*
          The crescent, as **one path with `fillRule="evenodd"`** — two circles,
          the inner one cut out of the outer.

          Laying a second filled disc over the first is the obvious way to draw
          it and it is wrong here: the disc has to match the sky *behind the
          halo*, which is a gradient, so it reads as a dark blue circle rather
          than as a hole. Cutting the shape leaves real transparency.
        */}
        <Path
          d={`M${moonX - moonR} ${moonY}
              a${moonR} ${moonR} 0 1 0 ${moonR * 2} 0
              a${moonR} ${moonR} 0 1 0 ${-moonR * 2} 0
              M${moonX + moonR * 0.44 - moonR * 0.92} ${moonY - moonR * 0.28}
              a${moonR * 0.92} ${moonR * 0.92} 0 1 0 ${moonR * 1.84} 0
              a${moonR * 0.92} ${moonR * 0.92} 0 1 0 ${-moonR * 1.84} 0`}
          fill={ct.moon}
          fillRule="evenodd"
        />

        {/* Two flanking drums. */}
        <Path
          d={`M${-w * 0.08} ${h} L${-w * 0.08} ${h * 0.72}
              C${w * 0.08} ${h * 0.7} ${w * 0.16} ${h * 0.62} ${w * 0.2} ${h * 0.52}
              C${w * 0.24} ${h * 0.62} ${w * 0.3} ${h * 0.7} ${w * 0.34} ${h * 0.72}
              L${w * 0.34} ${h} Z`}
          fill={ct.mid}
        />
        <Path
          d={`M${w * 1.08} ${h} L${w * 1.08} ${h * 0.72}
              C${w * 0.92} ${h * 0.7} ${w * 0.84} ${h * 0.62} ${w * 0.8} ${h * 0.52}
              C${w * 0.76} ${h * 0.62} ${w * 0.7} ${h * 0.7} ${w * 0.66} ${h * 0.72}
              L${w * 0.66} ${h} Z`}
          fill={ct.mid}
        />

        {/* The dome and its finial, nearest the viewer. */}
        <Path
          d={`M${w * 0.5} ${h * 0.46}
              C${w * 0.76} ${h * 0.58} ${w * 0.86} ${h * 0.78} ${w * 0.88} ${h}
              L${w * 0.12} ${h}
              C${w * 0.14} ${h * 0.78} ${w * 0.24} ${h * 0.58} ${w * 0.5} ${h * 0.46} Z`}
          fill={ct.near}
        />
        <Rect
          x={w * 0.5 - Math.max(w * 0.007, 1.6)}
          y={h * 0.4}
          width={Math.max(w * 0.014, 3.2)}
          height={h * 0.07}
          fill={ct.near}
        />
        <Circle cx={w * 0.5} cy={h * 0.385} r={Math.max(w * 0.016, 4)} fill={ct.near} />
      </Svg>
    </View>
  );
}
