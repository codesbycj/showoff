import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * pawsitem's icon set — interface, so vectors (I4). The animals are
 * photographs, because an animal is a picture *of* an animal.
 */
export type GlyphName =
  | 'bell'
  | 'search'
  | 'star'
  | 'heart'
  | 'home'
  | 'menu'
  | 'cart'
  | 'user'
  | 'chevron'
  | 'back'
  | 'share'
  | 'minus'
  | 'plus';

type Props = {
  name: GlyphName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  filled?: boolean;
};

export function Glyph({
  name,
  size = 20,
  color = ct.ink,
  strokeWidth = 1.7,
  filled = false,
}: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'bell' && (
        <Path
          d="M6.4 9.8a5.6 5.6 0 0 1 11.2 0c0 4.2 1.6 5.6 1.6 5.6H4.8s1.6-1.4 1.6-5.6ZM10.2 18.6a2 2 0 0 0 3.6 0"
          {...s}
        />
      )}

      {name === 'search' && (
        <>
          <Circle cx={10.8} cy={10.8} r={6.4} {...s} />
          <Path d="m15.6 15.6 4 4" {...s} />
        </>
      )}

      {name === 'star' && (
        <Path
          d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9 9.3 9Z"
          {...s}
          fill={filled ? color : 'none'}
        />
      )}

      {name === 'heart' && (
        <Path
          d="M12 20.2 4.9 13a4.3 4.3 0 0 1 6.1-6.1l1 1 1-1A4.3 4.3 0 1 1 19.1 13Z"
          {...s}
          fill={filled ? color : 'none'}
        />
      )}

      {name === 'home' && (
        <Path
          d="M3.8 10.4 12 3.8l8.2 6.6v8.2a1.8 1.8 0 0 1-1.8 1.8H5.6a1.8 1.8 0 0 1-1.8-1.8Z"
          {...s}
          fill={filled ? color : 'none'}
        />
      )}

      {name === 'menu' && (
        <>
          <Rect x={3.6} y={3.6} width={7.2} height={7.2} rx={2.2} {...s} />
          <Rect x={13.2} y={3.6} width={7.2} height={7.2} rx={2.2} {...s} />
          <Rect x={3.6} y={13.2} width={7.2} height={7.2} rx={2.2} {...s} />
          <Rect x={13.2} y={13.2} width={7.2} height={7.2} rx={2.2} {...s} />
        </>
      )}

      {name === 'cart' && (
        <>
          <Path d="M3 4h2.4l2.2 10.4h9.6l2-7.2H6.2" {...s} />
          <Circle cx={9} cy={19} r={1.6} {...s} />
          <Circle cx={17} cy={19} r={1.6} {...s} />
        </>
      )}

      {name === 'user' && (
        <>
          <Circle cx={12} cy={8.4} r={3.6} {...s} />
          <Path d="M4.8 20.2c0-3.8 3.2-6.2 7.2-6.2s7.2 2.4 7.2 6.2" {...s} />
        </>
      )}

      {name === 'chevron' && <Path d="m9.6 5.6 6.4 6.4-6.4 6.4" {...s} />}

      {name === 'back' && <Path d="M14.4 5.6 8 12l6.4 6.4" {...s} />}

      {name === 'share' && (
        <>
          <Path d="M12 3.6v11.2M8.4 7.2 12 3.6l3.6 3.6" {...s} />
          <Path d="M5.6 13.2v5.4a1.8 1.8 0 0 0 1.8 1.8h9.2a1.8 1.8 0 0 0 1.8-1.8v-5.4" {...s} />
        </>
      )}

      {name === 'minus' && <Path d="M6.4 12h11.2" {...s} />}

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}
    </Svg>
  );
}
