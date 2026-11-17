import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * slurpdish's icon set - interface, so vectors (I4). The dish itself is a
 * picture of a dish, so it is a photograph.
 */
export type GlyphName =
  'moped' | 'bag' | 'minus' | 'plus' | 'clock' | 'star' | 'store' | 'chevronDown';

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
      {name === 'moped' && (
        <>
          <Path d="M3.4 7.2h4.2l4 7.6h5.2" {...s} />
          <Path d="M14.6 7.2h4.2v4.4" {...s} />
          <Circle cx={6.6} cy={17.2} r={2.4} {...s} />
          <Circle cx={18} cy={17.2} r={2.4} {...s} />
        </>
      )}

      {name === 'bag' && (
        <>
          <Path d="M5.2 7.6h13.6l-1 12.2H6.2Z" {...s} />
          <Path d="M8.8 10.2V7a3.2 3.2 0 0 1 6.4 0v3.2" {...s} />
        </>
      )}

      {name === 'minus' && <Path d="M6.4 12h11.2" {...s} />}

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}

      {name === 'clock' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Path d="M12 7.4V12l3 1.8" {...s} />
        </>
      )}

      {name === 'star' && (
        <Path
          d="m12 3.6 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.8Z"
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )}

      {name === 'store' && (
        <>
          <Path d="M4 9.6h16v9.8H4Z" {...s} />
          <Path d="M4.6 9.6 6.2 4.6h11.6l1.6 5" {...s} />
          <Path d="M9.6 19.4v-5.2h4.8v5.2" {...s} />
        </>
      )}

      {name === 'chevronDown' && <Path d="m6.8 9.6 5.2 5.2 5.2-5.2" {...s} />}
    </Svg>
  );
}
