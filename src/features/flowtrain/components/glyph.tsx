import Svg, { Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * flowtrain's icon set — interface, so vectors (I4). The exercise itself is a
 * photograph, because a person lifting is a picture of someone.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName = 'close' | 'more' | 'prev' | 'pause' | 'next' | 'spark';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.8 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'close' && <Path d="M6.6 6.6 17.4 17.4M17.4 6.6 6.6 17.4" {...s} />}

      {name === 'more' && (
        <Path d="M5.4 12h.1M12 12h.1M18.6 12h.1" {...s} strokeWidth={3.2} />
      )}

      {name === 'prev' && (
        <Path d="M17.4 5.6 8.6 12l8.8 6.4V5.6ZM6.6 5.6v12.8" {...s} fill={color} />
      )}

      {name === 'next' && (
        <Path d="M6.6 5.6 15.4 12l-8.8 6.4V5.6ZM17.4 5.6v12.8" {...s} fill={color} />
      )}

      {name === 'pause' && (
        <>
          <Rect x={8} y={5.6} width={3.2} height={12.8} rx={1.4} fill={color} stroke="none" />
          <Rect x={12.8} y={5.6} width={3.2} height={12.8} rx={1.4} fill={color} stroke="none" />
        </>
      )}

      {/* The tip card's mark: a four-point spark. */}
      {name === 'spark' && (
        <Path
          d="M12 3.6 13.8 9l5.4 1.8-5.4 1.8L12 18l-1.8-5.4L4.8 10.8 10.2 9Z"
          fill={color}
          stroke="none"
        />
      )}
    </Svg>
  );
}
