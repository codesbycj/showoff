import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * lumoprofile's icon set — interface, so vectors (I4). Everything else on a
 * social app is a picture of someone.
 *
 * **The board's featured card carries a 3D megaphone render**; a render cannot
 * be traced and must not be drawn badly (§2.2), so `megaphone` here is the
 * *idea* of one — a cone, a body and two arcs.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName =
  | 'grid'
  | 'reels'
  | 'search'
  | 'bell'
  | 'plus'
  | 'megaphone'
  | 'like'
  | 'liked'
  | 'comment'
  | 'send'
  | 'save'
  | 'home'
  | 'messages'
  | 'profile';

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
      {name === 'grid' && (
        <>
          <Rect x={4} y={4} width={7} height={7} rx={1.8} {...s} />
          <Rect x={13} y={4} width={7} height={7} rx={1.8} {...s} />
          <Rect x={4} y={13} width={7} height={7} rx={1.8} {...s} />
          <Rect x={13} y={13} width={7} height={7} rx={1.8} {...s} />
        </>
      )}

      {name === 'reels' && (
        <>
          <Rect x={3.6} y={5.6} width={16.8} height={12.8} rx={3} {...s} />
          <Path d="m10.4 9.6 4.8 2.8-4.8 2.8Z" {...s} />
        </>
      )}

      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.6} {...s} />
          <Path d="m16 16 4.4 4.4" {...s} />
        </>
      )}

      {name === 'bell' && (
        <Path
          d="M6.4 10.4a5.6 5.6 0 0 1 11.2 0c0 3.4 1.4 4.8 1.4 4.8H5s1.4-1.4 1.4-4.8ZM10.2 18.6a2 2 0 0 0 3.6 0"
          {...s}
        />
      )}

      {name === 'plus' && <Path d="M12 5.6v12.8M5.6 12h12.8" {...s} />}

      {name === 'megaphone' && (
        <>
          <Path
            d="M4.4 10.2v3.6a1.6 1.6 0 0 0 1.6 1.6h2.2l6.8 3.8V5.4L8.2 9.2H6a1.6 1.6 0 0 0-1.6 1.6Z"
            {...s}
          />
          <Path d="M17.8 9.2a4 4 0 0 1 0 5.6M20 6.8a7.4 7.4 0 0 1 0 10.4" {...s} />
          <Path d="M8.2 15.4v3.4a1.4 1.4 0 0 0 2.8 0v-2.2" {...s} />
        </>
      )}

      {name === 'like' && (
        <Path
          d="M12 20.2C7.4 17 4 14.1 4 10.4A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 3.7-3.4 6.6-8 9.8Z"
          {...s}
        />
      )}

      {name === 'liked' && (
        <Path
          d="M12 20.2C7.4 17 4 14.1 4 10.4A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 3.7-3.4 6.6-8 9.8Z"
          fill={color}
          stroke="none"
        />
      )}

      {name === 'comment' && (
        <Path
          d="M4.6 11.4a7.4 7.4 0 0 1 14.8 0c0 3.8-3.4 6.8-7.4 6.8a8.6 8.6 0 0 1-2.4-.3L5.8 19.4l1-3.2a7 7 0 0 1-2.2-4.8Z"
          {...s}
        />
      )}

      {name === 'send' && <Path d="M20.4 3.6 3.6 10.4l6.6 2.6 2.6 6.6Z" {...s} />}

      {name === 'save' && <Path d="M6.4 4.6h11.2v15.2L12 16.2l-5.6 3.6Z" {...s} />}

      {name === 'home' && (
        <Path
          d="M4.4 10.6 12 4.4l7.6 6.2v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          {...s}
        />
      )}

      {/* "Messages", not the board's "Massage" (I1). */}
      {name === 'messages' && (
        <>
          <Rect x={3.4} y={5.6} width={17.2} height={12.8} rx={3} {...s} />
          <Path d="m4.4 7.6 7.6 5.2 7.6-5.2" {...s} />
        </>
      )}

      {name === 'profile' && (
        <>
          <Circle cx={12} cy={8.6} r={3.4} {...s} />
          <Path d="M5.6 20a6.4 6.4 0 0 1 12.8 0" {...s} />
        </>
      )}
    </Svg>
  );
}
