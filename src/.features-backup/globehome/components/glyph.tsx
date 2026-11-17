import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * globehome's icon set — interface, so vectors (I4). Places are photographs,
 * because a coastline is a picture *of* somewhere.
 *
 * `wave` replaces the board's waving-hand emoji. Emoji differ across
 * Windows / Android / iOS and the web render cannot see that (§4.4), so it is
 * drawn — a raised hand, which is an idea rather than a specific arrangement.
 */
export type GlyphName =
  | 'menu'
  | 'search'
  | 'bell'
  | 'wave'
  | 'star'
  | 'pin'
  | 'heart'
  | 'heartFill'
  | 'arrowUpRight'
  | 'home'
  | 'discover'
  | 'booking'
  | 'profile';

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
      {name === 'menu' && <Path d="M5 8.4h14M5 15.6h9" {...s} strokeWidth={2} />}

      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.2} {...s} />
          <Path d="m15.6 15.6 3.8 3.8" {...s} strokeWidth={2} />
        </>
      )}

      {name === 'bell' && (
        <>
          <Path d="M6.4 10.2a5.6 5.6 0 0 1 11.2 0c0 4 1.3 5.4 1.9 6H4.5c.6-.6 1.9-2 1.9-6Z" {...s} />
          <Path d="M10.2 19.4a2 2 0 0 0 3.6 0" {...s} />
        </>
      )}

      {name === 'wave' && (
        // A raised hand. The board uses an emoji here; emoji differ by
        // platform and the web render cannot see that (§4.4).
        <>
          <Path
            d="M9 20.4a5.6 5.6 0 0 1-2.6-4.7V11a1.3 1.3 0 0 1 2.6 0v2.2"
            {...s}
            strokeWidth={1.9}
          />
          <Path d="M9 13.2V6.2a1.3 1.3 0 0 1 2.6 0v6.4" {...s} strokeWidth={1.9} />
          <Path d="M11.6 12.6V5.6a1.3 1.3 0 0 1 2.6 0v7" {...s} strokeWidth={1.9} />
          <Path d="M14.2 12.6V7.8a1.3 1.3 0 0 1 2.6 0v7.9a5.6 5.6 0 0 1-2.4 4.7" {...s} strokeWidth={1.9} />
        </>
      )}

      {name === 'star' && (
        <Path
          d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.7l5.8-.8Z"
          fill={color}
        />
      )}

      {name === 'pin' && (
        <>
          <Path d="M12 21.4s6.6-6 6.6-10.4a6.6 6.6 0 0 0-13.2 0C5.4 15.4 12 21.4 12 21.4Z" fill={color} />
          <Circle cx={12} cy={10.6} r={2.4} fill={ct.white} />
        </>
      )}

      {name === 'heart' && (
        <Path
          d="M12 19.6S4.4 15 4.4 9.9a3.9 3.9 0 0 1 7.6-1.3 3.9 3.9 0 0 1 7.6 1.3c0 5.1-7.6 9.7-7.6 9.7Z"
          {...s}
        />
      )}
      {name === 'heartFill' && (
        <Path
          d="M12 19.6S4.4 15 4.4 9.9a3.9 3.9 0 0 1 7.6-1.3 3.9 3.9 0 0 1 7.6 1.3c0 5.1-7.6 9.7-7.6 9.7Z"
          fill={color}
        />
      )}

      {name === 'arrowUpRight' && <Path d="M7.4 16.6 16.6 7.4M9.2 7.4h7.4v7.4" {...s} strokeWidth={2.1} />}

      {name === 'home' && (
        <Path d="M4 10.4 12 4l8 6.4V19a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19Z" {...s} />
      )}
      {name === 'discover' && (
        <>
          <Path d="M3.4 6.4 9 4.4l6 2 5.6-2v13.2l-5.6 2-6-2-5.6 2Z" {...s} />
          <Path d="M9 4.4v13.2M15 6.4v13.2" {...s} strokeWidth={1.5} />
        </>
      )}
      {name === 'booking' && (
        <>
          <Rect x={3.6} y={5} width={16.8} height={15} rx={2.8} {...s} />
          <Path d="M3.6 9.4h16.8M8 3.4v3.2M16 3.4v3.2" {...s} strokeWidth={1.6} />
        </>
      )}
      {name === 'profile' && (
        <>
          <Circle cx={12} cy={8.4} r={3.6} {...s} />
          <Path d="M4.8 20.2c0-3.8 3.2-6.2 7.2-6.2s7.2 2.4 7.2 6.2" {...s} />
        </>
      )}
    </Svg>
  );
}
