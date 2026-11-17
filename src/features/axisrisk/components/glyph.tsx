import Svg, { Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * axisrisk's icon set - interface, so vectors (I4).
 */
export type GlyphName = 'grid' | 'more' | 'plus' | 'people';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.7 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'grid' && (
        <>
          <Rect x={4} y={4} width={6.6} height={6.6} rx={1.6} {...s} />
          <Rect x={13.4} y={4} width={6.6} height={6.6} rx={1.6} {...s} />
          <Rect x={4} y={13.4} width={6.6} height={6.6} rx={1.6} {...s} />
          <Rect x={13.4} y={13.4} width={6.6} height={6.6} rx={1.6} {...s} />
        </>
      )}
      {name === 'more' && (
        <Path
          d="M12 5.4h.01M12 12h.01M12 18.6h.01"
          strokeLinecap="round"
          strokeWidth={2.6}
          stroke={color}
          fill="none"
        />
      )}

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}

      {name === 'people' && (
        <>
          <Path d="M3.6 19.4a5.4 5.4 0 0 1 10.8 0" {...s} />
          <Path d="M9 11.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" {...s} />
          <Path d="M15.6 11.6a2.8 2.8 0 1 0 0-5.6M16.4 14.6a5.4 5.4 0 0 1 4 4.8" {...s} />
        </>
      )}
    </Svg>
  );
}
