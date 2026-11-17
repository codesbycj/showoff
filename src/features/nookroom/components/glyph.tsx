import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/** nookroom's icon set - interface, so vectors (I4). */
export type GlyphName = 'close' | 'plus' | 'grid' | 'chevron';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.9 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'close' && <Path d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6" {...s} />}
      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}
      {name === 'grid' && <Path d="M5 7h14M5 12h14M5 17h14" {...s} />}
      {name === 'chevron' && <Path d="m9.6 5.6 6.4 6.4-6.4 6.4" {...s} />}
    </Svg>
  );
}
