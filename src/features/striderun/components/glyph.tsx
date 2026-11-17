import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * striderun's icon set - interface, so vectors (I4).
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName = 'lock' | 'lap' | 'pause' | 'map' | 'heart';

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
      {name === 'lock' && (
        <>
          <Rect x={4.6} y={10.4} width={14.8} height={9.6} rx={2.6} {...s} />
          <Path d="M8.4 10.4V7.8a3.6 3.6 0 0 1 7.2 0v2.6" {...s} />
        </>
      )}

      {name === 'lap' && <Path d="M4.6 12a7.4 7.4 0 1 1 2.2 5.2M4.6 12V7.6M4.6 12h4.4" {...s} />}

      {name === 'pause' && (
        <>
          <Rect x={8} y={5.6} width={3} height={12.8} rx={1.4} fill={color} stroke="none" />
          <Rect x={13} y={5.6} width={3} height={12.8} rx={1.4} fill={color} stroke="none" />
        </>
      )}

      {name === 'map' && (
        <Path
          d="M9 5.2 3.8 7.4v11.4L9 16.6l6 2.2 5.2-2.2V5.2L15 7.4ZM9 5.2v11.4M15 7.4v11.4"
          {...s}
        />
      )}

      {name === 'heart' && (
        <Path
          d="M12 20.2C7.4 17 4 14.1 4 10.4A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 3.7-3.4 6.6-8 9.8Z"
          fill={color}
          stroke="none"
        />
      )}
    </Svg>
  );
}
