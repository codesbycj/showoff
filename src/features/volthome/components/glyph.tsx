import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * volthome's icon set — interface, so vectors (I4). Every *product* on the
 * screen is a photograph, including the five category tiles: a tile is a
 * picture of a thing, and drawing one produces a cartoon where the board had a
 * product.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  | 'spark'
  | 'bell'
  | 'search'
  | 'camera'
  | 'chevron'
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
      {/* The shop's mark: a bolt in a disc. */}
      {name === 'spark' && <Path d="M13.6 2.8 6.2 13.4h4.6l-.8 7.8 7.8-11H13Z" fill={color} />}

      {name === 'bell' && (
        <Path
          d="M6.4 10.4a5.6 5.6 0 0 1 11.2 0c0 3.4 1.4 4.8 1.4 4.8H5s1.4-1.4 1.4-4.8ZM10.2 18.6a2 2 0 0 0 3.6 0"
          {...s}
        />
      )}

      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.6} {...s} />
          <Path d="m16 16 4.4 4.4" {...s} />
        </>
      )}

      {name === 'camera' && (
        <>
          <Rect x={3.4} y={6.6} width={17.2} height={12.8} rx={3} {...s} />
          <Circle cx={12} cy={13} r={3.6} {...s} />
          <Path d="M8.6 6.6 9.8 4.4h4.4l1.2 2.2" {...s} />
        </>
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
