import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { arcade, stars } from '../data/onboard';
import { ct } from '../theme';

import { GroundProps } from './_night-scene-shared';
import { DomeScene } from './dome-scene';

/**
 * The page's own ground: the night sky and its stars.
 *
 * Full-bleed, so under §5.5 it is allowed to paint in frame one. It is
 * deliberately *only* the ground — the illustration lives in `DomeScene`, a
 * sized block of its own, because `audit.js` excludes a full-screen `<svg>`
 * from its painted-rows map and a drawing left inside the ground reads as
 * empty canvas.
 *
 * **`useId` for every gradient.** Ids are document-global on web.
 */
export function SkyGround({ width, height }: GroundProps) {
  const sky = useId();
  const halo = useId();
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width: w, height: h }} pointerEvents="none">
      <Svg width={w} height={h}>
        <Defs>
          <LinearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={ct.skyTop} />
            <Stop offset="0.44" stopColor={ct.skyMid} />
            <Stop offset="1" stopColor={ct.skyBottom} />
          </LinearGradient>
          <RadialGradient id={halo} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={ct.glow} stopOpacity={0.5} />
            <Stop offset="1" stopColor={ct.glow} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={w} height={h} fill={`url(#${sky})`} />
        <Ellipse cx={w * 0.5} cy={h * 0.26} rx={w * 0.5} ry={h * 0.16} fill={`url(#${halo})`} />
        {stars.map((s) => (
          <Circle key={s.id} cx={s.x * w} cy={s.y * h} r={s.r} fill={ct.star} opacity={s.o} />
        ))}
      </Svg>
    </View>
  );
}
