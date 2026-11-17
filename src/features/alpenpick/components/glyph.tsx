import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * alpenpick's icon set — interface, so vectors (I4). The destinations are
 * photographs, because a valley is a picture of somewhere, and their flags are
 * drawn discs because the board's are emoji (I8).
 */
export type GlyphName = 'back' | 'filter' | 'star' | 'hike' | 'kayak' | 'bike' | 'tick';

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

      {name === 'filter' && <Path d="M3.6 5.6h16.8l-6.6 7.8v5.4l-3.6 2v-7.4Z" {...s} />}

      {name === 'star' && (
        <Path d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9 9.3 9Z" {...s} />
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

      {name === 'kayak' && (
        <>
          <Path d="M3.6 16.4c3 2 5.6 2.6 8.4 2.6s5.4-.6 8.4-2.6" {...s} />
          <Path d="M7 6.6 17 16.6M17 6.6 7 16.6" {...s} />
        </>
      )}

      {name === 'bike' && (
        <>
          <Circle cx={5.6} cy={17} r={3.4} {...s} />
          <Circle cx={18.4} cy={17} r={3.4} {...s} />
          <Path d="m5.6 17 4.6-5.4 3.4 2.6 4.8 2.8M10.2 11.6 12.6 8l3 2.4h2.6" {...s} />
        </>
      )}

      {name === 'tick' && <Path d="m5.6 12.6 4.2 4.2 8.6-9.6" {...s} />}
    </Svg>
  );
}
