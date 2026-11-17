import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { stars } from '../data/onboard';
import { ct } from '../theme';

import { GroundProps } from './_night-scene-shared';
import { DomeScene } from './dome-scene';

/**
 * The sky, the halo and the stars.
 *
 * **This is the page's own ground** (§5.5): full-bleed, so it is allowed to
 * paint in frame one, like the gradient backgrounds several of these designs
 * use.
 *
 * It is deliberately *only* the ground. The illustration lives in
 * `DomeScene`, a sized block of its own — `audit.js` excludes a full-screen
 * `<svg>` from its painted-rows map, because a decorative gradient counted as
 * content blinds the GAP check completely, and that is exactly how "an
 * onboarding screen with a radial-gradient background passed with 190dp of
 * empty ground under its hero" got through. Keeping the drawing out of the
 * ground is what lets the probe see it.
 *
 * **The gradients are in `react-native-svg` user space**, not
 * `expo-linear-gradient`: the halo is radial and the sky runs under it in the
 * same coordinate system.
 *
 * **`useId` for every gradient.** Ids are document-global on web, so two
 * gradients sharing one id make everything render in the first colour.
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
            <Stop offset="0.42" stopColor={ct.skyMid} />
            <Stop offset="1" stopColor={ct.skyBottom} />
          </LinearGradient>
          <RadialGradient id={halo} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={ct.glow} stopOpacity={0.85} />
            <Stop offset="0.5" stopColor={ct.glow} stopOpacity={0.26} />
            <Stop offset="1" stopColor={ct.glow} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        <Rect x={0} y={0} width={w} height={h} fill={`url(#${sky})`} />
        <Ellipse cx={w * 0.5} cy={h * 0.3} rx={w * 0.44} ry={h * 0.17} fill={`url(#${halo})`} />

        {stars.map((s) => (
          <Circle key={s.id} cx={s.x * w} cy={s.y * h} r={s.r} fill={ct.star} opacity={s.o} />
        ))}
      </Svg>
    </View>
  );
}
