import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * nordstay's icon set — interface, so vectors (I4). The gallery and the host
 * are photographs, because both are pictures *of* something.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName = 'close' | 'share' | 'star' | 'key' | 'badge';

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

      {/* Self check-in: a lockbox, drawn as a padlock over a keypad. */}
      {name === 'key' && (
        <>
          <Rect x={4.2} y={10.4} width={15.6} height={10} rx={2.6} {...s} />
          <Path d="M8.2 10.4V7.8a3.8 3.8 0 0 1 7.6 0v2.6" {...s} />
          <Circle cx={12} cy={15.4} r={1.5} fill={color} stroke="none" />
        </>
      )}

      {/* A rosette: the check-in rating. */}
      {name === 'badge' && (
        <>
          <Circle cx={12} cy={9.4} r={5.6} {...s} />
          <Path d="m8.6 14.2-1.4 6 4.8-2.4 4.8 2.4-1.4-6" {...s} />
        </>
      )}
    </Svg>
  );
}
