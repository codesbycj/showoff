import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * stridestart's icon set — interface, so vectors (I4).
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  'run' | 'ride' | 'hike' | 'gym' | 'flag' | 'wave' | 'music' | 'sun' | 'chevron';

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
      {name === 'run' && (
        <>
          <Circle cx={14.4} cy={5} r={2} fill={color} stroke="none" />
          <Path d="M7.2 20.4 10 15.6l-2-3.4 3.6-3.4 3.2 1.8 2.8-.4" {...s} />
          <Path d="m11.6 15.2 3 1.4.8 3.8M8.6 9.6 5.4 11" {...s} />
        </>
      )}

      {name === 'ride' && (
        <>
          <Circle cx={5.6} cy={17} r={3.4} {...s} />
          <Circle cx={18.4} cy={17} r={3.4} {...s} />
          <Circle cx={14.6} cy={4.8} r={1.6} fill={color} stroke="none" />
          <Path d="m5.6 17 4.6-5.4 3.4 2.6 4.8 2.8M10.2 11.6 12.6 8l3 2.4h2.6" {...s} />
        </>
      )}

      {name === 'hike' && (
        <>
          <Circle cx={13.4} cy={4.6} r={1.9} fill={color} stroke="none" />
          <Path
            d="M9.4 20.4 11 14l-2.2-2.6 2.8-3.4 3 2 2.6.6M13 14l2 2 1 4.4M18.8 4.6v15.8"
            {...s}
          />
        </>
      )}

      {name === 'gym' && <Path d="M4 9.6v4.8M7 7.4v9.2M17 7.4v9.2M20 9.6v4.8M7 12h10" {...s} />}

      {name === 'flag' && <Path d="M6.4 20.4V4.6h10l-1.6 3.4 1.6 3.4h-10" {...s} />}

      {name === 'wave' && <Path d="M4 12h1.6M8 7.6v8.8M12 4.6v14.8M16 8.8v6.4M20 11h.4" {...s} />}

      {name === 'music' && (
        <>
          <Path d="M9.6 17.4V6l9-1.6v11" {...s} />
          <Circle cx={7.2} cy={17.8} r={2.6} {...s} />
          <Circle cx={16.2} cy={15.8} r={2.6} {...s} />
        </>
      )}

      {name === 'sun' && (
        <>
          <Circle cx={12} cy={12} r={3.6} {...s} />
          <Path
            d="M12 3.6v2.2M12 18.2v2.2M3.6 12h2.2M18.2 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"
            {...s}
          />
        </>
      )}

      {name === 'chevron' && <Path d="m6.6 9.4 5.4 5.2 5.4-5.2" {...s} />}
    </Svg>
  );
}
