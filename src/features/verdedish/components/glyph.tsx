import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * verdedish's icon set — interface, so vectors (I4).
 *
 * **The category chips are not in here.** The board draws them as emoji — a
 * burger, a slice, a pear — and a chip is a picture *of* something, so each
 * one is a cropped photograph instead. Emoji also differ across Windows /
 * Android / iOS, which the web render cannot show (I8).
 */
export type GlyphName =
  'back' | 'heart' | 'flame' | 'clock' | 'star' | 'tick' | 'minus' | 'plus' | 'chevron';

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

      {name === 'clock' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Path d="M12 7.4V12l3.2 2" {...s} />
        </>
      )}

      {name === 'star' && (
        <Path
          d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9 9.3 9Z"
          fill={color}
          stroke="none"
        />
      )}

      {name === 'tick' && <Path d="m5.6 12.6 4.2 4.2 8.6-9.6" {...s} />}
      {name === 'minus' && <Path d="M6.4 12h11.2" {...s} />}
      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}
      {name === 'chevron' && <Path d="m6.6 9.4 5.4 5.2 5.4-5.2" {...s} />}

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
    </Svg>
  );
}
