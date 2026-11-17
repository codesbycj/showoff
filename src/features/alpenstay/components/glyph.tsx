import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * alpenstay's icon set - interface, so vectors (I4). The route card's ground is
 * a photograph, because a valley is a picture of somewhere.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  | 'back'
  | 'share'
  | 'star'
  | 'pin'
  | 'calendar'
  | 'party'
  | 'bed'
  | 'wifi'
  | 'tv'
  | 'chevron';

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
      {name === 'back' && <Path d="M14.4 5.6 8 12l6.4 6.4" {...s} />}

      {name === 'share' && (
        <>
          <Path d="M12 3.6v11.2M12 3.6 8.2 7.4M12 3.6l3.8 3.8" {...s} />
          <Path d="M5.4 12.6v6.2a1.6 1.6 0 0 0 1.6 1.6h10a1.6 1.6 0 0 0 1.6-1.6v-6.2" {...s} />
        </>
      )}

      {name === 'star' && (
        <Path d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9 9.3 9Z" fill={color} stroke="none" />
      )}

      {name === 'pin' && (
        <>
          <Path d="M12 20.4s6.6-5.4 6.6-10.2a6.6 6.6 0 1 0-13.2 0c0 4.8 6.6 10.2 6.6 10.2Z" {...s} />
          <Circle cx={12} cy={10} r={2.4} {...s} />
        </>
      )}

      {name === 'bed' && (
        <>
          <Path d="M3.6 18.4v-9.2M3.6 13.4h16.8v5M20.4 18.4v-5" {...s} />
          <Path d="M6.6 13.4v-2.2a1.6 1.6 0 0 1 1.6-1.6h7.6a1.6 1.6 0 0 1 1.6 1.6v2.2" {...s} />
        </>
      )}

      {name === 'wifi' && (
        <>
          <Path d="M3.6 9.4a12.4 12.4 0 0 1 16.8 0M6.8 13a8 8 0 0 1 10.4 0M10 16.4a3.4 3.4 0 0 1 4 0" {...s} />
          <Circle cx={12} cy={19.4} r={1.1} fill={color} stroke="none" />
        </>
      )}

      {name === 'tv' && (
        <>
          <Rect x={3.6} y={5.6} width={16.8} height={11.2} rx={2.6} {...s} />
          <Path d="M8.6 20.4h6.8" {...s} />
        </>
      )}

      {name === 'chevron' && <Path d="m9.4 6.6 5.2 5.4-5.2 5.4" {...s} />}

      {name === 'calendar' && (
        <>
          <Rect x={3.6} y={5.2} width={16.8} height={15.2} rx={3.2} {...s} />
          <Path d="M3.6 10h16.8M8.4 3.6v3M15.6 3.6v3" {...s} />
        </>
      )}

    </Svg>
  );
}
