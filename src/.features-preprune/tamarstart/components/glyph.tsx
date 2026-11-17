import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * tamarstart's icon set — interface, so vectors (I4). The photograph is the
 * only bitmap on the screen.
 *
 * `runner` is the board's own mark, rebuilt: a figure mid-stride, which is an
 * idea rather than a specific arrangement, so it is in drawing range (§2.5).
 */
export type GlyphName = 'runner' | 'arrowRight';

type Props = { name: GlyphName; size?: number; color?: string };

export function Glyph({ name, size = 20, color = ct.ink }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'runner' && (
        <>
          <Circle cx={14.6} cy={4.6} r={2.5} fill={color} />
          <Path
            d="M16.4 9.1 12 10.9l-2.4 3.4 2.9 1.9 1.1 5.4"
            stroke={color}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <Path
            d="m12 10.9-5 1.3M12.5 16.2 7.9 20.6"
            stroke={color}
            strokeWidth={2.4}
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {name === 'arrowRight' && (
        <Path
          d="M4.4 12h14.4m0 0-4.8-4.8M18.8 12l-4.8 4.8"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </Svg>
  );
}
