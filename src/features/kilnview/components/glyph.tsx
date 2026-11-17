import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/** kilnview's icon set - interface, so vectors (I4). */
export type GlyphName = 'close' | 'share' | 'chevron';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.onDark, strokeWidth = 1.8 }: Props) {
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

      {name === 'share' && (
        <>
          <Path d="M12 3.6v11.2M8.4 7.2 12 3.6l3.6 3.6" {...s} />
          <Path d="M5.6 13.2v5.4a1.8 1.8 0 0 0 1.8 1.8h9.2a1.8 1.8 0 0 0 1.8-1.8v-5.4" {...s} />
        </>
      )}

      {name === 'chevron' && <Path d="m8 10 4 4 4-4" {...s} />}
    </Svg>
  );
}
