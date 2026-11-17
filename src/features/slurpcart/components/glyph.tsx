import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * slurpcart's icon set - interface, so vectors (I4). The dish itself is a
 * picture of a dish, so it is a photograph.
 */
export type GlyphName = 'back' | 'more' | 'minus' | 'plus' | 'clock' | 'star' | 'check';

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
      {name === 'back' && <Path d="M14.4 5.2 7.6 12l6.8 6.8" {...s} />}

      {name === 'more' && (
        <>
          <Circle cx={12} cy={5.4} r={1.5} fill={color} stroke="none" />
          <Circle cx={12} cy={12} r={1.5} fill={color} stroke="none" />
          <Circle cx={12} cy={18.6} r={1.5} fill={color} stroke="none" />
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

      {name === 'check' && <Path d="m6.4 12.4 3.6 3.6 7.6-8" {...s} />}
    </Svg>
  );
}
