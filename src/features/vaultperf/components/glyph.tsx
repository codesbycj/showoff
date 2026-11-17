import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * vaultperf's icon set - interface, so vectors (I4).
 */
export type GlyphName = 'menu' | 'caretUp' | 'bolt' | 'chart' | 'coins';

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

      {name === 'caretUp' && <Path d="m5.6 15.6 6.4-7.2 6.4 7.2" {...s} />}

      {name === 'bolt' && (
        <Path
          d="M13.6 2.8 5.2 13.4h5.6l-.4 7.8 8.4-10.6h-5.6Z"
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
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

      {name === 'coins' && (
        <>
          <Path d="M4 8.4c0-1.6 3.1-2.8 7-2.8s7 1.2 7 2.8-3.1 2.8-7 2.8-7-1.2-7-2.8Z" {...s} />
          <Path d="M4 8.4v7.2c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V8.4" {...s} />
          <Path d="M4 12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8" {...s} />
        </>
      )}
    </Svg>
  );
}
