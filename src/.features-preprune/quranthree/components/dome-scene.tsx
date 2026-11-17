import { View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { arcade, stars } from '../data/onboard';
import { ct } from '../theme';

import { SceneProps } from './_night-scene-shared';
import { SkyGround } from './sky-ground';

/**
 * The great dome, its minarets and its arcade.
 *
 * **Drawn, not photographed** (I4, §2.5). A dome silhouette is an *idea*
 * expressed as a flat shape, not a reproduction of a specific building, and
 * the board draws it the same way. Nothing here is traced.
 *
 * It is a **sized block**, not part of the full-bleed ground, so the design
 * bar can see it — see the note on `SkyGround`.
 */
export function DomeScene({ width, height }: SceneProps) {
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);

  /** One minaret: a shaft, a gallery and a cap. */
  const minaret = (x: number, top: number, tw: number) =>
    `M${x - tw / 2} ${h} L${x - tw / 2} ${top}
     C${x - tw / 2} ${top - tw} ${x + tw / 2} ${top - tw} ${x + tw / 2} ${top}
     L${x + tw / 2} ${h} Z`;

  return (
    <View style={{ width: w, height: h }} pointerEvents="none">
      <Svg width={w} height={h}>
        {/* The far arch across the top, as on screen one. */}
        <Path
          d={`M${-w * 0.05} ${h * 0.2}
              C${w * 0.14} ${h * 0.18} ${w * 0.34} ${h * 0.1} ${w * 0.5} ${h * 0.01}
              C${w * 0.66} ${h * 0.1} ${w * 0.86} ${h * 0.18} ${w * 1.05} ${h * 0.2}`}
          stroke={ct.far}
          strokeWidth={Math.max(h * 0.016, 4)}
          fill="none"
        />
        <Path
          d={`M${-w * 0.05} ${h * 0.3}
              C${w * 0.16} ${h * 0.28} ${w * 0.36} ${h * 0.2} ${w * 0.5} ${h * 0.12}
              C${w * 0.64} ${h * 0.2} ${w * 0.84} ${h * 0.28} ${w * 1.05} ${h * 0.3}
              L${w * 1.05} ${h} L${-w * 0.05} ${h} Z`}
          fill={ct.mid}
          opacity={0.75}
        />

        {/* Two minarets, flanking. */}
        <Path d={minaret(w * 0.19, h * 0.42, Math.max(w * 0.035, 7))} fill={ct.near} />
        <Path d={minaret(w * 0.81, h * 0.42, Math.max(w * 0.035, 7))} fill={ct.near} />
        <Rect x={w * 0.19 - w * 0.03} y={h * 0.54} width={w * 0.06} height={h * 0.012} fill={ct.near} />
        <Rect x={w * 0.81 - w * 0.03} y={h * 0.54} width={w * 0.06} height={h * 0.012} fill={ct.near} />

        {/* The great dome and its finial. */}
        <Path
          d={`M${w * 0.5} ${h * 0.34}
              C${w * 0.74} ${h * 0.46} ${w * 0.8} ${h * 0.66} ${w * 0.8} ${h}
              L${w * 0.2} ${h}
              C${w * 0.2} ${h * 0.66} ${w * 0.26} ${h * 0.46} ${w * 0.5} ${h * 0.34} Z`}
          fill={ct.near}
        />
        <Rect
          x={w * 0.5 - Math.max(w * 0.006, 1.4)}
          y={h * 0.27}
          width={Math.max(w * 0.012, 2.8)}
          height={h * 0.08}
          fill={ct.near}
        />
        <Circle cx={w * 0.5} cy={h * 0.255} r={Math.max(w * 0.013, 3.4)} fill={ct.near} />

        {/* The arcade along its base. Each arch is cut into the dome's foot. */}
        {arcade.map((a) => {
          const aw = a.w * w;
          const ah = a.h * h;
          const x = a.x * w;
          return (
            <Path
              key={a.id}
              d={`M${x - aw / 2} ${h} L${x - aw / 2} ${h - ah}
                  C${x - aw / 2} ${h - ah - aw * 0.8} ${x + aw / 2} ${h - ah - aw * 0.8} ${x + aw / 2} ${h - ah}
                  L${x + aw / 2} ${h} Z`}
              fill={ct.mid}
              opacity={0.85}
            />
          );
        })}
      </Svg>
    </View>
  );
}
