import Svg, { Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * axisprofile's icon set - interface, so vectors (I4).
 */
export type GlyphName = 'back' | 'grid';

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
      {name === 'back' && <Path d="M14.4 5.2 7.6 12l6.8 6.8" {...s} />}

      {name === 'grid' && (
        <>
          <Rect x={4} y={4} width={6.6} height={6.6} rx={1.6} {...s} />
          <Rect x={13.4} y={4} width={6.6} height={6.6} rx={1.6} {...s} />
          <Rect x={4} y={13.4} width={6.6} height={6.6} rx={1.6} {...s} />
          <Rect x={13.4} y={13.4} width={6.6} height={6.6} rx={1.6} {...s} />
        </>
      )}
    </Svg>
  );
}
