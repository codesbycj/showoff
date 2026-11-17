import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * orbithome's icon set — interface, so vectors (I4). The faces are
 * photographs, because a face is a picture of someone.
 *
 * **The board's referral card carries a 3D gift emoji.** Emoji differ across
 * Windows / Android / iOS and the web render cannot show that (I8), so the
 * gift is drawn here instead.
 */
export type GlyphName =
  | 'bell'
  | 'transfer'
  | 'withdraw'
  | 'topup'
  | 'more'
  | 'plus'
  | 'gift'
  | 'home'
  | 'cards'
  | 'stats'
  | 'me';

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
        <Path
          d="M6.4 10.4a5.6 5.6 0 0 1 11.2 0c0 3.4 1.4 4.8 1.4 4.8H5s1.4-1.4 1.4-4.8ZM10.2 18.6a2 2 0 0 0 3.6 0"
          {...s}
        />
      )}

      {name === 'transfer' && <Path d="M7.4 16.6 16.6 7.4M9.4 7.4h7.2v7.2" {...s} />}
      {name === 'withdraw' && <Path d="M16.6 7.4 7.4 16.6M14.6 16.6H7.4V9.4" {...s} />}
      {name === 'topup' && <Path d="M12 5.6v12.8M5.6 12h12.8" {...s} />}

      {name === 'more' && (
        <>
          <Rect x={4.4} y={4.4} width={6} height={6} rx={1.8} {...s} />
          <Rect x={13.6} y={4.4} width={6} height={6} rx={1.8} {...s} />
          <Rect x={4.4} y={13.6} width={6} height={6} rx={1.8} {...s} />
          <Rect x={13.6} y={13.6} width={6} height={6} rx={1.8} {...s} />
        </>
      )}

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}

      {/* The referral gift, drawn because the board's is an emoji (I8). */}
      {name === 'gift' && (
        <>
          <Rect x={3.8} y={9.4} width={16.4} height={10.8} rx={2.2} {...s} />
          <Path d="M3.8 13.4h16.4M12 9.4v10.8" {...s} />
          <Path
            d="M12 9.4C10.4 6.2 8.8 5 7.4 5.6c-1.4.6-1.2 3 4.6 3.8ZM12 9.4c1.6-3.2 3.2-4.4 4.6-3.8 1.4.6 1.2 3-4.6 3.8Z"
            {...s}
          />
        </>
      )}

      {name === 'home' && (
        <Path
          d="M4.4 10.6 12 4.4l7.6 6.2v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          fill={color}
          stroke="none"
        />
      )}

      {name === 'cards' && (
        <>
          <Rect x={3.4} y={6.4} width={17.2} height={11.2} rx={2.8} {...s} />
          <Path d="M3.4 10.4h17.2" {...s} />
        </>
      )}

      {name === 'stats' && <Path d="M6 18.4V11M12 18.4V5.6M18 18.4v-4.8" {...s} />}

      {name === 'me' && (
        <>
          <Circle cx={12} cy={8.6} r={3.6} {...s} />
          <Path d="M5.2 20a6.8 6.8 0 0 1 13.6 0" {...s} />
        </>
      )}
    </Svg>
  );
}
