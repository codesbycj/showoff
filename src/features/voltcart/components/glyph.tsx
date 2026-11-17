import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * voltcart's icon set — interface, so vectors (I4). Every *product* on the
 * screen is a photograph, including the five category tiles: a tile is a
 * picture of a thing, and drawing one produces a cartoon where the board had a
 * product.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  | 'more'
  | 'pin'
  | 'chevron'
  | 'tick'
  | 'minus'
  | 'plus'
  | 'bin'
  | 'heart'
  | 'home'
  | 'catalog'
  | 'cart'
  | 'profile';

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
      {name === 'more' && (
        <>
          <Circle cx={5.4} cy={12} r={1.7} fill={color} stroke="none" />
          <Circle cx={12} cy={12} r={1.7} fill={color} stroke="none" />
          <Circle cx={18.6} cy={12} r={1.7} fill={color} stroke="none" />
        </>
      )}

      {name === 'pin' && (
        <>
          <Path
            d="M12 20.4s6.6-5.4 6.6-10.2a6.6 6.6 0 1 0-13.2 0c0 4.8 6.6 10.2 6.6 10.2Z"
            {...s}
          />
          <Circle cx={12} cy={10} r={2.4} {...s} />
        </>
      )}

      {name === 'tick' && <Path d="m5.6 12.6 4.2 4.2 8.6-9.6" {...s} />}
      {name === 'minus' && <Path d="M6.4 12h11.2" {...s} />}
      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}

      {name === 'bin' && (
        <Path
          d="M4.8 6.8h14.4M9.4 6.8V4.6h5.2v2.2M6.6 6.8l1 13a1.6 1.6 0 0 0 1.6 1.5h5.6a1.6 1.6 0 0 0 1.6-1.5l1-13"
          {...s}
        />
      )}

      {name === 'chevron' && <Path d="m9.4 6.6 5.2 5.4-5.2 5.4" {...s} />}

      {name === 'heart' && (
        <Path
          d="M12 20.2C7.4 17 4 14.1 4 10.4A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 3.7-3.4 6.6-8 9.8Z"
          {...s}
        />
      )}

      {name === 'home' && (
        <Path
          d="M4.4 10.6 12 4.4l7.6 6.2v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          {...s}
        />
      )}

      {name === 'catalog' && (
        <>
          <Rect x={3.6} y={4.6} width={16.8} height={14.8} rx={3} {...s} />
          <Path d="M3.6 9.4h16.8M9.2 9.4v10" {...s} />
        </>
      )}

      {name === 'cart' && (
        <>
          <Path d="M3.4 4.6h2.4l2.2 10.2h9l2.2-7.4H6.8" {...s} />
          <Circle cx={9.4} cy={19} r={1.6} {...s} />
          <Circle cx={16.6} cy={19} r={1.6} {...s} />
        </>
      )}

      {name === 'profile' && (
        <>
          <Circle cx={12} cy={8.6} r={3.6} {...s} />
          <Path d="M5.2 20a6.8 6.8 0 0 1 13.6 0" {...s} />
        </>
      )}
    </Svg>
  );
}
