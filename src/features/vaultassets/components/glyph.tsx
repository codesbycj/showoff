import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * vaultassets' icon set - interface, so vectors (I4).
 */
export type GlyphName = 'menu' | 'bolt' | 'bank' | 'chart' | 'shield' | 'link';

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

      {name === 'bolt' && (
        <Path
          d="M13.6 2.8 5.2 13.4h5.6l-.4 7.8 8.4-10.6h-5.6Z"
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )}

      {name === 'bank' && (
        <>
          <Path d="M3.4 9.6 12 4.4l8.6 5.2M4.6 19.6h14.8" {...s} />
          <Path d="M7 12v5.2M12 12v5.2M17 12v5.2" {...s} />
        </>
      )}

      {name === 'chart' && (
        <Path
          d="M5.4 20V12M12 20V4.6M18.6 20v-5.4"
          stroke={color}
          strokeWidth={3.2}
          strokeLinecap="round"
          fill="none"
        />
      )}

      {name === 'shield' && (
        <>
          <Path d="M12 3.2 19.4 6v6.2c0 4.2-3 7-7.4 8.6-4.4-1.6-7.4-4.4-7.4-8.6V6Z" {...s} />
          <Path d="m8.8 11.8 2.4 2.4 4-4.4" {...s} />
        </>
      )}

      {name === 'link' && (
        <>
          <Path d="M10.2 13.8a3.6 3.6 0 0 0 5.4.4l2.6-2.6a3.6 3.6 0 0 0-5.1-5.1l-1.5 1.5" {...s} />
          <Path d="M13.8 10.2a3.6 3.6 0 0 0-5.4-.4l-2.6 2.6a3.6 3.6 0 0 0 5.1 5.1l1.5-1.5" {...s} />
        </>
      )}
    </Svg>
  );
}
