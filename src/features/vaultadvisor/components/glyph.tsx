import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * vaultadvisor's icon set - interface, so vectors (I4).
 */
export type GlyphName = 'menu' | 'arrowOut';

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
      {name === 'menu' && <Path d="M4 7.6h16M4 12h16M4 16.4h16" {...s} />}

      {name === 'arrowOut' && <Path d="M7.4 16.6 16.6 7.4M9.4 7.4h7.2v7.2" {...s} />}
    </Svg>
  );
}
