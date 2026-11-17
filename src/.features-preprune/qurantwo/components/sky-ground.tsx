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

import { ct } from '../theme';

import { GroundProps } from './_night-scene-shared';
import { ArchScene } from './arch-scene';

/**
 * The page's own ground: the night sky.
 *
 * Full-bleed, so under §5.5 it is allowed to paint in frame one. It is
 * deliberately *only* the ground — the illustration lives in `ArchScene`, a
 * sized block of its own, because `audit.js` excludes a full-screen `<svg>`
 * from its painted-rows map and a drawing left inside the ground reads as
 * empty canvas.
 *
 * **`useId` for the gradient.** Ids are document-global on web.
 */
export function SkyGround({ width, height }: GroundProps) {
  const sky = useId();
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width: w, height: h }} pointerEvents="none">
      <Svg width={w} height={h}>
        <Defs>
          <LinearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={ct.skyTop} />
            <Stop offset="0.46" stopColor={ct.skyMid} />
            <Stop offset="1" stopColor={ct.skyBottom} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={w} height={h} fill={`url(#${sky})`} />
      </Svg>
    </View>
  );
}
