import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * hushmix's icon set - interface, so vectors (I4).
 */
export type GlyphName = 'back' | 'heart' | 'share' | 'chevron' | 'download';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.onDark, strokeWidth = 1.7 }: Props) {
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

      {name === 'heart' && (
        <Path
          d="M12 19.6 4.9 12.8a4.3 4.3 0 0 1 0-6.2 4.5 4.5 0 0 1 6.3 0l.8.8.8-.8a4.5 4.5 0 0 1 6.3 0 4.3 4.3 0 0 1 0 6.2Z"
          {...s}
        />
      )}

      {name === 'share' && (
        <>
          <Path d="M12 3.6v11.2M8.2 7.4 12 3.6l3.8 3.8" {...s} />
          <Path d="M5.4 13.4v5.2a1.6 1.6 0 0 0 1.6 1.6h10a1.6 1.6 0 0 0 1.6-1.6v-5.2" {...s} />
        </>
      )}

      {name === 'chevron' && <Path d="m9.6 5.6 6.4 6.4-6.4 6.4" {...s} />}

      {name === 'download' && (
        <>
          <Path d="M12 4.4v10.2M8.2 10.8 12 14.6l3.8-3.8" {...s} />
          <Path d="M5.4 18.6h13.2" {...s} />
        </>
      )}
    </Svg>
  );
}
