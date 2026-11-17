import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * orlafind's icon set - interface, so vectors (I4). The rings are
 * photographs, because a ring is a picture of a ring.
 */
export type GlyphName = 'menu' | 'heart' | 'spin' | 'mark';

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
      {name === 'menu' && <Path d="M4.6 8h14.8M4.6 16h14.8" {...s} />}

      {name === 'heart' && (
        <Path
          d="M12 20.2 4.9 13a4.3 4.3 0 0 1 6.1-6.1l1 1 1-1A4.3 4.3 0 1 1 19.1 13Z"
          {...s}
          fill={filled ? color : 'none'}
        />
      )}

      {name === 'spin' && (
        <>
          <Circle cx={12} cy={12} r={7.4} {...s} />
          <Path d="M12 4.6v14.8M4.6 12h14.8" {...s} strokeWidth={1.2} />
        </>
      )}

      {name === 'mark' && (
        <Path d="M12 3.4 15.6 12 12 20.6 8.4 12Z" {...s} fill={filled ? color : 'none'} />
      )}
    </Svg>
  );
}
