import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * zoneitem's icon set — interface, so vectors (I4). The category tiles and the
 * restaurant cards are **photographs**, because food is a picture *of*
 * something; nothing edible is drawn here.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot see that (§4.4).
 */
export type GlyphName =
  | 'back'
  | 'plus'
  | 'minus'
  | 'check'
  | 'menu'
  | 'bell'
  | 'chevronDown'
  | 'search'
  | 'map'
  | 'arrowUpRight'
  | 'star'
  | 'heart'
  | 'heartFill'
  | 'tag'
  | 'home'
  | 'bag'
  | 'orders'
  | 'user';

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
      {name === 'back' && <Path d="m14.4 6-6 6 6 6" {...s} strokeWidth={2.2} />}
      {name === 'plus' && <Path d="M12 6.2v11.6M6.2 12h11.6" {...s} strokeWidth={2.4} />}
      {name === 'minus' && <Path d="M6.2 12h11.6" {...s} strokeWidth={2.4} />}
      {name === 'check' && <Path d="m5.8 12.4 4.2 4.2 8.2-8.8" {...s} strokeWidth={2.6} />}

      {name === 'menu' && <Path d="M4.4 8h15.2M4.4 13h11M4.4 18h15.2" {...s} strokeWidth={2} />}

      {name === 'bell' && (
        <>
          <Path
            d="M6.4 10.2a5.6 5.6 0 0 1 11.2 0c0 4 1.3 5.4 1.9 6H4.5c.6-.6 1.9-2 1.9-6Z"
            {...s}
          />
          <Path d="M10.2 19.4a2 2 0 0 0 3.6 0" {...s} />
        </>
      )}

      {name === 'chevronDown' && <Path d="m7.6 10 4.4 4.4 4.4-4.4" {...s} strokeWidth={2} />}

      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.2} {...s} />
          <Path d="m15.6 15.6 3.8 3.8" {...s} strokeWidth={2} />
        </>
      )}

      {name === 'map' && (
        <>
          <Path d="M3.4 6.4 9 4.4l6 2 5.6-2v13.2l-5.6 2-6-2-5.6 2Z" {...s} />
          <Path d="M9 4.4v13.2M15 6.4v13.2" {...s} strokeWidth={1.5} />
        </>
      )}

      {name === 'arrowUpRight' && (
        <Path d="M7.4 16.6 16.6 7.4M9.2 7.4h7.4v7.4" {...s} strokeWidth={2} />
      )}

      {name === 'star' && (
        <Path
          d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.7l5.8-.8Z"
          fill={color}
        />
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

      {name === 'tag' && (
        <>
          <Path d="M3.8 11.2V4.6h6.6l9 9-6.6 6.6Z" {...s} />
          <Circle cx={7.6} cy={8.4} r={1.5} fill={color} />
        </>
      )}

      {name === 'home' && (
        <Path d="M4 10.4 12 4l8 6.4V19a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19Z" {...s} />
      )}
      {name === 'bag' && (
        <>
          <Path d="M5.4 8h13.2l-1 11.2a1.8 1.8 0 0 1-1.8 1.6H8.2a1.8 1.8 0 0 1-1.8-1.6Z" {...s} />
          <Path d="M9 9.2V7a3 3 0 0 1 6 0v2.2" {...s} />
        </>
      )}
      {name === 'orders' && (
        <>
          <Rect x={4.6} y={3.4} width={14.8} height={17.2} rx={2.6} {...s} />
          <Path d="M8.4 8.4h7.2M8.4 12h7.2M8.4 15.6h4.4" {...s} strokeWidth={1.6} />
        </>
      )}
      {name === 'user' && (
        <>
          <Circle cx={12} cy={8.4} r={3.6} {...s} />
          <Path d="M4.8 20.2c0-3.8 3.2-6.2 7.2-6.2s7.2 2.4 7.2 6.2" {...s} />
        </>
      )}
    </Svg>
  );
}
