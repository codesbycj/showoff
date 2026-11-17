import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * slurppay's icon set - interface, so vectors (I4). The dish itself is a
 * picture of a dish, so it is a photograph.
 */
export type GlyphName = 'back' | 'more' | 'plus' | 'check' | 'pin' | 'chevron';

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

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}

      {name === 'check' && <Path d="m6.4 12.4 3.6 3.6 7.6-8" {...s} />}

      {name === 'pin' && (
        <>
          <Path
            d="M12 21c4.4-4.6 6.6-7.9 6.6-10.6a6.6 6.6 0 1 0-13.2 0C5.4 13.1 7.6 16.4 12 21Z"
            {...s}
          />
          <Circle cx={12} cy={10.2} r={2.4} {...s} />
        </>
      )}

      {name === 'chevron' && <Path d="m9.6 5.6 6.4 6.4-6.4 6.4" {...s} />}
    </Svg>
  );
}
