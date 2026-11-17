import { useId } from 'react';
import Svg, { Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';

import { ct } from '../theme';

type Props = { width: number; height: number };

/**
 * The green haze behind the header and the portfolio card.
 *
 * The reference's background is not flat black and the card is not a green
 * slab: there is a soft green bloom top-left that the card sits *over* as a
 * translucent panel. Building it as a flat fill is what made the first pass
 * read as a cheap gradient box.
 *
 * Full-bleed, so under §5.5 this is the page's own ground and is allowed to
 * paint in frame one — like the gradient backgrounds several of these designs
 * use. Everything else on the screen is staged over it.
 *
 * **`useId` for the gradient.** `react-native-svg` ids are document-global on
 * web, so two gradients sharing one id make everything render in the first
 * colour (RULES Part 7).
 */
export function Glow({ width, height }: Props) {
  const a = useId();
  const b = useId();

  return (
    <Svg
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0 }}
      pointerEvents="none"
    >
      <Defs>
        <RadialGradient id={a} cx="28%" cy="20%" rx="78%" ry="46%">
          <Stop offset="0" stopColor={ct.glowCore} stopOpacity={0.85} />
          <Stop offset="0.55" stopColor={ct.glowCore} stopOpacity={0.28} />
          <Stop offset="1" stopColor={ct.page} stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id={b} cx="88%" cy="10%" rx="46%" ry="26%">
          <Stop offset="0" stopColor={ct.glowEdge} stopOpacity={0.5} />
          <Stop offset="1" stopColor={ct.page} stopOpacity={0} />
        </RadialGradient>
      </Defs>

      <Ellipse cx={width * 0.28} cy={height * 0.2} rx={width * 0.78} ry={height * 0.26} fill={`url(#${a})`} />
      <Ellipse cx={width * 0.88} cy={height * 0.1} rx={width * 0.46} ry={height * 0.16} fill={`url(#${b})`} />
    </Svg>
  );
}
