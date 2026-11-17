import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * twirlfeed's icon set — interface, so vectors (I4). The faces and the food
 * are photographs, because both are pictures *of* something.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot see that (§4.4).
 */
export type GlyphName =
  | 'bell'
  | 'plus'
  | 'globe'
  | 'more'
  | 'comment'
  | 'share'
  | 'bookmark'
  | 'feeds'
  | 'videos'
  | 'inbox'
  | 'market'
  | 'settings';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.8 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'bell' && (
        <>
          <Path
            d="M6.4 10.2a5.6 5.6 0 0 1 11.2 0c0 4 1.3 5.4 1.9 6H4.5c.6-.6 1.9-2 1.9-6Z"
            {...s}
          />
          <Path d="M10.2 19.4a2 2 0 0 0 3.6 0" {...s} />
        </>
      )}

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} strokeWidth={2.6} />}

      {name === 'globe' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} strokeWidth={1.6} />
          <Path
            d="M3.8 12h16.4M12 3.8c2.2 2.4 3.3 5.2 3.3 8.2s-1.1 5.8-3.3 8.2c-2.2-2.4-3.3-5.2-3.3-8.2S9.8 6.2 12 3.8Z"
            {...s}
            strokeWidth={1.6}
          />
        </>
      )}

      {name === 'more' && (
        <>
          <Circle cx={5.6} cy={12} r={1.6} fill={color} />
          <Circle cx={12} cy={12} r={1.6} fill={color} />
          <Circle cx={18.4} cy={12} r={1.6} fill={color} />
        </>
      )}

      {name === 'comment' && (
        <Path
          d="M20.4 11.6c0 3.9-3.8 7-8.4 7a9.6 9.6 0 0 1-2.6-.35L4.6 20l1.2-3.3a6.6 6.6 0 0 1-2.2-5.1c0-3.9 3.8-7 8.4-7s8.4 3.1 8.4 7Z"
          {...s}
        />
      )}

      {name === 'share' && <Path d="M21 3.6 10.6 13.4M21 3.6l-6.6 17.2-3.8-7.4-7.6-3.6Z" {...s} />}

      {name === 'bookmark' && <Path d="M6.4 4.4h11.2v15.8L12 16.6l-5.6 3.6Z" {...s} />}

      {name === 'feeds' && (
        <>
          <Rect x={3.6} y={4.6} width={16.8} height={14.8} rx={3} {...s} />
          <Path d="M3.6 9.4h16.8M9.2 9.4v10" {...s} strokeWidth={1.6} />
        </>
      )}

      {name === 'videos' && (
        <>
          <Rect x={3.2} y={6} width={13} height={12} rx={3} {...s} />
          <Path d="m16.8 10.6 4-2.4v7.6l-4-2.4Z" {...s} />
        </>
      )}

      {name === 'inbox' && (
        <>
          <Path d="M3.6 12.6h4l1.4 2.4h6l1.4-2.4h4" {...s} />
          <Path
            d="M5.4 5.4h13.2l1.8 7.2v4.4a1.8 1.8 0 0 1-1.8 1.8H5.4a1.8 1.8 0 0 1-1.8-1.8v-4.4Z"
            {...s}
          />
        </>
      )}

      {name === 'market' && (
        <>
          <Rect x={3.6} y={6.6} width={16.8} height={13} rx={2.6} {...s} />
          <Path d="M8.4 9.4V6a3.6 3.6 0 0 1 7.2 0v3.4" {...s} />
        </>
      )}

      {name === 'settings' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Circle cx={12} cy={12} r={3} {...s} strokeWidth={1.6} />
        </>
      )}
    </Svg>
  );
}
