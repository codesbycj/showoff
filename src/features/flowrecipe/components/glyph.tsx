import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * flowrecipe's icon set — interface, so vectors (I4). The people and the food
 * are photographs, because both are pictures *of* something.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  | 'back'
  | 'bookmark'
  | 'bookmarked'
  | 'tick'
  | 'spark'
  | 'clock'
  | 'arrow'
  | 'home'
  | 'cycle'
  | 'train'
  | 'nourish'
  | 'insights';

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

      {name === 'tick' && <Path d="m5.6 12.6 4.2 4.2 8.6-9.6" {...s} />}

      {name === 'clock' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Path d="M12 7.4V12l3.2 2" {...s} />
        </>
      )}

      {name === 'spark' && (
        <Path
          d="M12 3.6 13.8 9l5.4 1.8-5.4 1.8L12 18l-1.8-5.4L4.8 10.8 10.2 9Z"
          fill={color}
          stroke="none"
        />
      )}

      {name === 'bookmark' && <Path d="M6.4 4.6h11.2v15.2L12 16.2l-5.6 3.6Z" {...s} />}

      {name === 'bookmarked' && (
        <Path d="M6.4 4.6h11.2v15.2L12 16.2l-5.6 3.6Z" fill={color} stroke="none" />
      )}
      {name === 'arrow' && <Path d="M5.6 12h12.8M13.4 7l5 5-5 5" {...s} />}

      {name === 'home' && (
        <Path
          d="M4.4 10.6 12 4.4l7.6 6.2v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          {...s}
        />
      )}

      {/* A drop: the cycle tab. */}
      {name === 'cycle' && (
        <Path
          d="M12 3.6c3.4 3.8 5.6 6.6 5.6 9.4a5.6 5.6 0 0 1-11.2 0c0-2.8 2.2-5.6 5.6-9.4Z"
          {...s}
        />
      )}

      {/* A dumbbell. */}
      {name === 'train' && <Path d="M4 9.6v4.8M7 7.4v9.2M17 7.4v9.2M20 9.6v4.8M7 12h10" {...s} />}

      {/* A leaf. */}
      {name === 'nourish' && (
        <>
          <Path
            d="M19.4 4.6c0 8-4.6 12.4-10 12.4a5.2 5.2 0 0 1-5-3.4C5.6 7.2 11.6 4.6 19.4 4.6Z"
            {...s}
          />
          <Path d="M16.4 7.6C12 9.4 8.4 12.6 6 19.4" {...s} />
        </>
      )}

      {name === 'insights' && (
        <>
          <Rect x={4} y={12.4} width={3.6} height={7} rx={1.4} {...s} />
          <Rect x={10.2} y={6.6} width={3.6} height={12.8} rx={1.4} {...s} />
          <Rect x={16.4} y={9.6} width={3.6} height={9.8} rx={1.4} {...s} />
        </>
      )}
    </Svg>
  );
}
