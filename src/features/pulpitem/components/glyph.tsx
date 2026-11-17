import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * pulpitem's icon set - interface, so vectors (I4).
 *
 * The board sets its tags with **emoji**, which differ across Windows, Android
 * and iOS and are missing outright on some of them (I8). These are the same
 * ideas, drawn.
 */
export type GlyphName = 'back' | 'more' | 'heart' | 'sprout' | 'spark' | 'minus' | 'plus';

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

      {name === 'heart' && (
        <Path
          d="M12 19.6 4.9 12.8a4.3 4.3 0 0 1 0-6.2 4.5 4.5 0 0 1 6.3 0l.8.8.8-.8a4.5 4.5 0 0 1 6.3 0 4.3 4.3 0 0 1 0 6.2Z"
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )}

      {name === 'sprout' && (
        <>
          <Path d="M12 20v-7.6" {...s} />
          <Path d="M12 12.4C12 9 9.6 6.6 6.2 6.6c0 3.4 2.4 5.8 5.8 5.8Z" {...s} />
          <Path d="M12 12.4c0-3.4 2.4-5.8 5.8-5.8 0 3.4-2.4 5.8-5.8 5.8Z" {...s} />
        </>
      )}

      {name === 'spark' && (
        <>
          <Path d="M12 3.4 13.7 9l5.6 1.7-5.6 1.7L12 18l-1.7-5.6L4.7 10.7 10.3 9Z" {...s} />
          <Path d="M18.4 16.2v3.6M16.6 18h3.6" {...s} />
        </>
      )}

      {name === 'minus' && <Path d="M6.4 12h11.2" {...s} />}

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}
    </Svg>
  );
}
