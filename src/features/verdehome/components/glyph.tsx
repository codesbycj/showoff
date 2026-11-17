import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * verdehome's icon set — interface, so vectors (I4).
 *
 * **The category chips are not in here.** The board draws them as emoji — a
 * burger, a slice, a pear — and a chip is a picture *of* something, so each
 * one is a cropped photograph instead. Emoji also differ across Windows /
 * Android / iOS, which the web render cannot show (I8).
 */
export type GlyphName =
  'bell' | 'search' | 'filter' | 'heart' | 'flame' | 'home' | 'map' | 'saved' | 'me';

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
      {name === 'bell' && (
        <Path
          d="M6.4 10.4a5.6 5.6 0 0 1 11.2 0c0 3.4 1.4 4.8 1.4 4.8H5s1.4-1.4 1.4-4.8ZM10.2 18.6a2 2 0 0 0 3.6 0"
          {...s}
        />
      )}

      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.6} {...s} />
          <Path d="m16 16 4.4 4.4" {...s} />
        </>
      )}

      {name === 'filter' && (
        <>
          <Path d="M3.6 8.4h3.2M11.2 8.4h9.2M3.6 15.6h9.2M17.2 15.6h3.2" {...s} />
          <Circle cx={9} cy={8.4} r={2.2} {...s} />
          <Circle cx={15} cy={15.6} r={2.2} {...s} />
        </>
      )}

      {name === 'heart' && (
        <Path
          d="M12 20.2C7.4 17 4 14.1 4 10.4A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 3.7-3.4 6.6-8 9.8Z"
          fill={color}
          stroke="none"
        />
      )}

      {/* The calorie mark. The board sets a flame emoji here (I8). */}
      {name === 'flame' && (
        <Path
          d="M12 3.4c3.3 3.3 5.6 5.8 5.6 8.9a5.6 5.6 0 0 1-11.2 0c0-1.6.7-2.9 1.9-4.2.3 1.1 1 1.9 1.9 2.1-.6-2.3-.3-4.4 1.8-6.8Z"
          fill={color}
          stroke="none"
        />
      )}

      {name === 'home' && (
        <Path
          d="M4.4 10.6 12 4.4l7.6 6.2v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          {...s}
        />
      )}

      {name === 'map' && (
        <Path
          d="M9 5.2 3.8 7.4v11.4L9 16.6l6 2.2 5.2-2.2V5.2L15 7.4ZM9 5.2v11.4M15 7.4v11.4"
          {...s}
        />
      )}

      {name === 'saved' && (
        <Path
          d="M12 20.2C7.4 17 4 14.1 4 10.4A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 3.7-3.4 6.6-8 9.8Z"
          {...s}
        />
      )}

      {name === 'me' && (
        <>
          <Circle cx={12} cy={8.6} r={3.4} {...s} />
          <Path d="M5.6 20a6.4 6.4 0 0 1 12.8 0" {...s} />
        </>
      )}
    </Svg>
  );
}
