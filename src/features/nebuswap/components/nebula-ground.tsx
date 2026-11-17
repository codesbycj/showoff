import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';

import { ct } from '../theme';

type Props = { width: number; height: number };

/**
 * The nebula behind the top of the screen.
 *
 * **This is the page's own ground**, so it is allowed to paint in frame one
 * (§5.5): a full-bleed field is the surface the screen is revealed onto, not
 * an element that appears.
 *
 * Two radial gradients rather than `expo-linear-gradient`, which flips a
 * diagonal on web (§7). Each id comes from `useId` because SVG ids are
 * document-global on web and the second gradient would otherwise render in the
 * first one's colours.
 */
export function NebulaGround({ width, height }: Props) {
  const a = useId();
  const b = useId();

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <RadialGradient id={a} cx="0.78" cy="0.12" r="0.9">
            <Stop offset="0" stopColor={ct.glow} stopOpacity="0.85" />
            <Stop offset="1" stopColor={ct.page} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id={b} cx="0.08" cy="0.42" r="0.8">
            <Stop offset="0" stopColor={ct.glowFar} stopOpacity="0.9" />
            <Stop offset="1" stopColor={ct.page} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        {/* STEP 1.02 ellipse
        <Ellipse
          cx={width * 0.78}
          cy={height * 0.12}
          rx={width}
          ry={height * 0.6}
          fill={`url(#${a})`}
        />
        */}
        {/* STEP 1.03 ellipse
        <Ellipse
          cx={width * 0.08}
          cy={height * 0.42}
          rx={width * 0.9}
          ry={height * 0.5}
          fill={`url(#${b})`}
        />
        */}
      </Svg>
    </View>
  );
}
