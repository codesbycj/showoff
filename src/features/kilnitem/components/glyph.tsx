import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/** kilnitem's icon set - interface, so vectors (I4). */
export type GlyphName =
  'close' | 'share' | 'chevron' | 'search' | 'filter' | 'sort' | 'home' | 'heart' | 'user';

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

      {name === 'search' && (
        <>
          <Path d="M15.6 15.6 19.6 19.6" {...s} />
          <Path d="M10.8 17.2a6.4 6.4 0 1 0 0-12.8 6.4 6.4 0 0 0 0 12.8Z" {...s} />
        </>
      )}

      {name === 'filter' && <Path d="M4 7h16M7 12h10M10 17h4" {...s} />}

      {name === 'sort' && (
        <Path d="M7 4.6v14.8M3.6 16l3.4 3.4L10.4 16M17 19.4V4.6M13.6 8 17 4.6 20.4 8" {...s} />
      )}

      {name === 'home' && (
        <Path
          d="M3.8 10.4 12 3.8l8.2 6.6v8.2a1.8 1.8 0 0 1-1.8 1.8H5.6a1.8 1.8 0 0 1-1.8-1.8Z"
          {...s}
        />
      )}

      {name === 'heart' && (
        <Path d="M12 20.2 4.9 13a4.3 4.3 0 0 1 6.1-6.1l1 1 1-1A4.3 4.3 0 1 1 19.1 13Z" {...s} />
      )}

      {name === 'user' && (
        <Path
          d="M12 12a3.6 3.6 0 1 0 0-7.2A3.6 3.6 0 0 0 12 12ZM4.8 20.2c0-3.8 3.2-6.2 7.2-6.2s7.2 2.4 7.2 6.2"
          {...s}
        />
      )}
    </Svg>
  );
}
