import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * nordhome's icon set — interface, so vectors (I4). Every photograph on the
 * screen is a picture *of* a place; every mark here is an idea.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  'pin' | 'account' | 'search' | 'star' | 'heart' | 'discover' | 'bookings' | 'messages';

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
      {/* The location cursor the board sets beside the country. */}
      {name === 'pin' && <Path d="M20.4 4.2 4.1 10.6l7 2.3 2.3 7Z" fill={color} />}

      {name === 'account' && (
        <>
          <Circle cx={12} cy={12} r={9.2} {...s} />
          <Circle cx={12} cy={9.8} r={3.1} {...s} />
          <Path d="M5.8 19.4a6.9 6.9 0 0 1 12.4 0" {...s} />
        </>
      )}

      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.6} {...s} />
          <Path d="m16 16 4.4 4.4" {...s} />
        </>
      )}

      {name === 'star' && (
        <Path
          d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9 9.3 9Z"
          fill={color}
        />
      )}

      {name === 'heart' && (
        <Path
          d="M12 20.2C7.4 17 4 14.1 4 10.4A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 3.7-3.4 6.6-8 9.8Z"
          {...s}
        />
      )}

      {/* The discover tab: a lens, not a camera. */}
      {name === 'discover' && (
        <>
          <Rect x={3.4} y={3.4} width={17.2} height={17.2} rx={5.4} {...s} />
          <Circle cx={12} cy={12} r={3.4} {...s} />
        </>
      )}

      {name === 'bookings' && (
        <>
          <Rect x={3.4} y={4.6} width={17.2} height={14.8} rx={3.4} {...s} />
          <Rect x={8.4} y={9.4} width={7.2} height={5.2} rx={1.6} {...s} />
        </>
      )}

      {name === 'messages' && (
        <Path
          d="M4 11.4a7.4 7.4 0 0 1 16 0c0 4-3.6 7.2-8 7.2a9 9 0 0 1-2.6-.4L5 19.8l1.1-3.4a7 7 0 0 1-2.1-5Z"
          {...s}
        />
      )}
    </Svg>
  );
}
