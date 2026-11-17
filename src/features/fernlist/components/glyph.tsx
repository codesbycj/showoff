import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * fernlist's icon set — interface, so vectors (I4). The trips themselves are
 * photographs, because a valley is a picture *of* somewhere, and the board's
 * flags are drawn discs because its own are emoji (I8).
 */
export type GlyphName =
  'back' | 'filter' | 'star' | 'bookmark' | 'arrow' | 'days' | 'distance' | 'party' | 'tree';

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
      {name === 'back' && <Path d="M14.4 5.6 8 12l6.4 6.4" {...s} />}

      {name === 'filter' && <Path d="M3.8 7h16.4M6.6 12h10.8M9.6 17h4.8" {...s} />}

      {name === 'star' && (
        <Path
          d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9 9.3 9Z"
          {...s}
          fill={filled ? color : 'none'}
        />
      )}

      {name === 'bookmark' && <Path d="M6.4 4.4h11.2v15.2L12 15.6l-5.6 4Z" {...s} />}

      {name === 'arrow' && <Path d="M5.4 12h13.2M13 6.4l5.6 5.6-5.6 5.6" {...s} />}

      {name === 'days' && (
        <>
          <Rect x={3.4} y={5.2} width={17.2} height={15.4} rx={3.4} {...s} />
          <Path d="M3.4 9.8h17.2M8.4 3.4v3.6M15.6 3.4v3.6" {...s} />
        </>
      )}

      {name === 'distance' && (
        <>
          <Circle cx={5.6} cy={6.4} r={2.6} {...s} />
          <Circle cx={18.4} cy={17.6} r={2.6} {...s} />
          <Path
            d="M8.4 7.6c3.4.6 4.6 2.2 4.2 4.2-.4 2 1 3.8 3.4 4.6"
            {...s}
            strokeDasharray="1 3"
          />
        </>
      )}

      {name === 'party' && (
        <>
          <Circle cx={9.2} cy={8.4} r={3.2} {...s} />
          <Path d="M3.6 19.6c0-3.1 2.5-5.2 5.6-5.2s5.6 2.1 5.6 5.2" {...s} />
          <Path d="M15.4 5.8a3.2 3.2 0 0 1 0 5.6M16.8 14.8c2.2.5 3.6 2.3 3.6 4.8" {...s} />
        </>
      )}

      {name === 'tree' && (
        <Path
          d="M12 2.6 7.2 9.4h2.4L5.6 15h3.2l-3.6 4.6h5.9v1.8h1.8v-1.8h5.9L15.2 15h3.2l-4-5.6h2.4Z"
          fill={color}
          stroke="none"
        />
      )}
    </Svg>
  );
}
