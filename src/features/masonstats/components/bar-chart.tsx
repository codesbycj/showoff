import { useId } from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { ms } from '../theme';

/**
 * The peach bar chart the cards carry.
 *
 * The bars fade to nothing at their feet rather than sitting on a baseline
 * rule, which is the reference's own treatment and the right one here: the
 * cards have no axis to draw, so a hard foot would read as a rule that means
 * something.
 *
 * The gradient id comes from `useId`. react-native-svg's `Defs` ids are
 * document-global on web, and this screen mounts three of these charts — a
 * shared name would paint all three in whichever mounted first.
 *
 * Sizes come in as numbers rather than percentages: a percentage height needs
 * a definite parent, and these sit in `flex` boxes that are not one.
 */
export function BarChart({
  values,
  w,
  h,
  gap = 4,
  tint = ms.peach,
}: {
  values: readonly number[];
  w: number;
  h: number;
  gap?: number;
  tint?: string;
}) {
  const fade = useId();
  const band = (w - gap * (values.length - 1)) / values.length;

  return (
    <Svg width={w} height={h}>
      <Defs>
        <LinearGradient
          id={fade}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2={String(h)}
        >
          <Stop offset="0" stopColor={tint} stopOpacity="1" />
          <Stop offset="1" stopColor={tint} stopOpacity="0.08" />
        </LinearGradient>
      </Defs>

      {values.map((v, i) => {
        const bh = Math.max(6, h * v);
        return (
          <Rect
            key={i}
            x={i * (band + gap)}
            y={h - bh}
            width={band}
            height={bh}
            rx={3}
            fill={`url(#${fade})`}
          />
        );
      })}
    </Svg>
  );
}
