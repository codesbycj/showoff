import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * voltitem's icon set — interface, so vectors (I4). Every *product* on the
 * screen is a photograph, including the five category tiles: a tile is a
 * picture of a thing, and drawing one produces a cartoon where the board had a
 * product.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  | 'back'
  | 'share'
  | 'heart'
  | 'star'
  | 'thumb'
  | 'comment'
  | 'wave'
  | 'battery'
  | 'weight'
  | 'cart';

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
      {name === 'back' && <Path d="M14.4 5.6 8 12l6.4 6.4" {...s} />}

      {name === 'share' && (
        <>
          <Path d="M12 3.6v11.2M12 3.6 8.2 7.4M12 3.6l3.8 3.8" {...s} />
          <Path d="M5.4 12.6v6.2a1.6 1.6 0 0 0 1.6 1.6h10a1.6 1.6 0 0 0 1.6-1.6v-6.2" {...s} />
        </>
      )}

      {name === 'star' && (
        <Path
          d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9 9.3 9Z"
          fill={color}
        />
      )}

      {name === 'thumb' && (
        <Path
          d="M7.4 20.4V10.6l4.4-7a2 2 0 0 1 3 2.2l-1 4.2h5.2a2 2 0 0 1 2 2.4l-1.4 6.6a2.4 2.4 0 0 1-2.4 1.9ZM7.4 10.6H4.6v9.8h2.8Z"
          {...s}
        />
      )}

      {name === 'comment' && (
        <Path
          d="M4.6 11.4a7.4 7.4 0 0 1 14.8 0c0 3.8-3.4 6.8-7.4 6.8a8.6 8.6 0 0 1-2.4-.3L5.8 19.4l1-3.2a7 7 0 0 1-2.2-4.8Z"
          {...s}
        />
      )}

      {/* Three spec marks: a sound wave, a cell, a weight. */}
      {name === 'wave' && (
        <Path d="M4 12h2.2M8.4 7.6v8.8M12 4.6v14.8M15.6 8.8v6.4M19.8 11h.4" {...s} />
      )}

      {name === 'battery' && (
        <>
          <Rect x={3.4} y={7.6} width={14.8} height={8.8} rx={2.6} {...s} />
          <Path d="M20.4 10.6v2.8" {...s} />
          <Rect x={5.6} y={9.8} width={7} height={4.4} rx={1.2} fill={color} stroke="none" />
        </>
      )}

      {name === 'weight' && (
        <Path d="M6.4 8.6h11.2l1.8 11.2H4.6ZM9.6 8.6a2.4 2.4 0 1 1 4.8 0" {...s} />
      )}

      {name === 'heart' && (
        <Path
          d="M12 20.2C7.4 17 4 14.1 4 10.4A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 3.7-3.4 6.6-8 9.8Z"
          {...s}
        />
      )}

      {name === 'cart' && (
        <>
          <Path d="M3.4 4.6h2.4l2.2 10.2h9l2.2-7.4H6.8" {...s} />
          <Circle cx={9.4} cy={19} r={1.6} {...s} />
          <Circle cx={16.6} cy={19} r={1.6} {...s} />
        </>
      )}
    </Svg>
  );
}
