import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * nookstart's icon set - interface, so vectors (I4). The furniture is
 * photography, because a chair is a picture of a chair.
 */
export type GlyphName = 'arrow' | 'ring';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.onInk, strokeWidth = 1.8 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'arrow' && <Path d="M5.2 12h13.6M13.2 6.4l5.6 5.6-5.6 5.6" {...s} />}
      {name === 'ring' && <Circle cx={12} cy={12} r={9.4} {...s} />}
    </Svg>
  );
}
