import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * alpenfly's icon set - interface, so vectors (I4). The route card's ground is
 * a photograph, because a valley is a picture of somewhere.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName = 'back' | 'plane' | 'swap' | 'calendar' | 'month' | 'party' | 'filter';

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

      {name === 'plane' && (
        <Path
          d="M21 12.6 14.2 14l-3 5.6-1.7.1 1.5-5.2-4 .8-1.3 2-1.3.1.6-2.3-1.4-1.8 1.3.1 1.6 1.5 4-.7-3-4.6 1.6-.4 4.6 4.3 6.8-1.3a1 1 0 0 1 0 2.4Z"
          fill={color}
        />
      )}

      {name === 'swap' && (
        <Path d="M4.6 9.4h12.8M14.4 6.6l3 2.8-3 2.8M19.4 14.6H6.6M9.6 11.8l-3 2.8 3 2.8" {...s} />
      )}

      {name === 'calendar' && (
        <>
          <Rect x={3.6} y={5.2} width={16.8} height={15.2} rx={3.2} {...s} />
          <Path d="M3.6 10h16.8M8.4 3.6v3M15.6 3.6v3" {...s} />
        </>
      )}

      {name === 'month' && (
        <>
          <Rect x={3.6} y={4.6} width={16.8} height={16.8} rx={3.2} {...s} />
          <Path d="M3.6 9.6h16.8M9 13h2M13 13h2M9 17h2M13 17h2" {...s} />
        </>
      )}

      {name === 'party' && (
        <>
          <Circle cx={9} cy={9.4} r={3.2} {...s} />
          <Path
            d="M3.6 19.4a5.4 5.4 0 0 1 10.8 0M15.4 7a3 3 0 0 1 0 5.4M17.4 19.4a5.2 5.2 0 0 0-2.4-4.4"
            {...s}
          />
        </>
      )}

      {name === 'filter' && <Path d="M3.6 5.6h16.8l-6.6 7.8v5.4l-3.6 2v-7.4Z" {...s} />}
    </Svg>
  );
}
