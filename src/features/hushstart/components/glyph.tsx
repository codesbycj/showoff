import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * hushstart's icon set - interface, so vectors (I4).
 */
export type GlyphName = 'arrow';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.onPill, strokeWidth = 1.8 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'arrow' && <Path d="M4.6 12h14.8M13.4 6l6 6-6 6" {...s} />}
    </Svg>
  );
}
