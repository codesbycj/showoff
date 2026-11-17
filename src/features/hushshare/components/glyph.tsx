import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * hushshare's icon set - interface, so vectors (I4).
 *
 * The board's first share target is Instagram's mark; that is not ours to
 * ship, so these are four generic destinations drawn in one weight (I1).
 */
export type GlyphName = 'back' | 'story' | 'chat' | 'link' | 'mail' | 'more';

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

      {name === 'story' && (
        <>
          <Rect x={3.6} y={3.6} width={16.8} height={16.8} rx={5} {...s} />
          <Circle cx={12} cy={12} r={4} {...s} />
        </>
      )}

      {name === 'chat' && (
        <Path
          d="M4 6.6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7.6a2 2 0 0 1-2 2H9.8L5.4 19.6v-3.4H6a2 2 0 0 1-2-2Z"
          {...s}
        />
      )}

      {name === 'link' && (
        <>
          <Path d="M10.2 13.8a3.6 3.6 0 0 0 5.4.4l2.6-2.6a3.6 3.6 0 0 0-5.1-5.1l-1.5 1.5" {...s} />
          <Path d="M13.8 10.2a3.6 3.6 0 0 0-5.4-.4l-2.6 2.6a3.6 3.6 0 0 0 5.1 5.1l1.5-1.5" {...s} />
        </>
      )}

      {name === 'mail' && (
        <>
          <Rect x={3.4} y={5.4} width={17.2} height={13.2} rx={2.4} {...s} />
          <Path d="m3.8 7 8.2 6 8.2-6" {...s} />
        </>
      )}

      {name === 'more' && (
        <>
          <Circle cx={5.4} cy={12} r={1.5} fill={color} stroke="none" />
          <Circle cx={12} cy={12} r={1.5} fill={color} stroke="none" />
          <Circle cx={18.6} cy={12} r={1.5} fill={color} stroke="none" />
        </>
      )}
    </Svg>
  );
}
