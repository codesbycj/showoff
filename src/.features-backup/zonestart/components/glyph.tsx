import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * zonestart's icon set — interface, so vectors (I4). The burger is a
 * photograph, because a burger is a picture *of* something.
 *
 * `moped` is drawn as separate strokes rather than one closed path: as one
 * path it came out a blob at 20dp, which is what the first pass shipped.
 */
export type GlyphName = 'mail' | 'moped' | 'crown';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ctaInk, strokeWidth = 1.8 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'mail' && (
        <>
          <Rect x={2.8} y={5.4} width={18.4} height={13.2} rx={2.6} {...s} />
          <Path d="m3.6 7.4 8.4 5.8 8.4-5.8" {...s} />
        </>
      )}

      {name === 'moped' && (
        <>
          <Circle cx={6} cy={17} r={3} {...s} />
          <Circle cx={18.4} cy={17} r={3} {...s} />
          <Path d="M9 17h6.4M6 14V9.6h5.4l3.8 5.2" {...s} />
          <Path d="M11.4 9.6h4.2l2 4.4M15.6 5.6h2.4" {...s} />
        </>
      )}

      {name === 'crown' && (
        <Path d="M3.6 17.6 5 7.2l4.2 3.6L12 5.4l2.8 5.4L19 7.2l1.4 10.4Z" fill={color} />
      )}
    </Svg>
  );
}
