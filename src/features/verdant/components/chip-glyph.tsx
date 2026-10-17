import { useId } from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { vd } from '../theme';

/**
 * The EMV chip on a card face.
 *
 * Drawn rather than taken from an icon set, because every icon-set chip is a
 * flat pictogram and this one has to read as a gold plate catching the same
 * light as the rest of the stage — a ramp across the plate and the contact
 * pattern cut into it, not an outline.
 *
 * Proportions are the real thing's: the module is a little wider than it is
 * tall, with a horizontal pair of cuts and three vertical ones, which is what
 * makes it legible at 20dp instead of reading as a yellow square.
 *
 * `useId` for the gradient: react-native-svg inlines every `Svg` into the one
 * page DOM on web, and a fixed id here would be found by anything else on the
 * page asking for the same one.
 */
export function ChipGlyph({ width }: { width: number }) {
  const id = useId();
  const h = width * 0.78;
  const r = width * 0.14;
  const s = width / 24; // one unit of the 24-wide design grid

  return (
    <Svg width={width} height={h} viewBox={`0 0 ${width} ${h}`}>
      <Defs>
        <LinearGradient id={id} x1="0%" y1="0%" x2="70%" y2="100%">
          <Stop offset="0" stopColor="#f0dca6" />
          <Stop offset="0.5" stopColor={vd.chip} />
          <Stop offset="1" stopColor="#b89a5e" />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width={width} height={h} rx={r} fill={`url(#${id})`} />

      <Path
        d={[
          // the two horizontal cuts, which the vertical ones run between
          `M ${s * 2} ${h * 0.32} H ${width - s * 2}`,
          `M ${s * 2} ${h * 0.68} H ${width - s * 2}`,
          // three verticals, the middle one running the full height
          `M ${width * 0.3} ${s} V ${h - s}`,
          `M ${width * 0.5} ${h * 0.32} V ${h * 0.68}`,
          `M ${width * 0.7} ${s} V ${h - s}`,
        ].join(' ')}
        stroke={vd.chipLine}
        strokeWidth={Math.max(0.6, s * 0.7)}
        fill="none"
      />
    </Svg>
  );
}
