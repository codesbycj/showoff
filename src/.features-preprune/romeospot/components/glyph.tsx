import Svg, { Circle, Path, Rect } from 'react-native-svg';

/**
 * romeospot's icon set — interface, so vectors (INSPO-RULES I4).
 *
 * These are drawn, not traced. `trace.py` earns its keep against a *screenshot*
 * reference at 3x, where a brand mark has real edges to follow. Here the source
 * is a design shot whose icons are about 10px across on a 1200px board; tracing
 * that returns mush. Standard UI iconography drawn cleanly is what the real app
 * ships and what the reference is itself drawing.
 *
 * One `Svg` per glyph, stroke-based at a 24 viewBox so every icon shares a
 * weight. No gradients here, so no `useId` needed — the tiles own theirs.
 */
export type GlyphName = 'back' | 'heart' | 'star' | 'info' | 'pin' | 'qr' | 'moped' | 'bag';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = '#FFFFFF', strokeWidth = 1.9 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'back' && (
        // The reference draws a curved return arrow, not a plain chevron.
        <>
          <Path d="M9.5 6.5 4.5 11.5l5 5" {...s} />
          <Path d="M4.5 11.5h8.2a6.3 6.3 0 0 1 6.3 6.3v.7" {...s} />
        </>
      )}

      {name === 'heart' && (
        <Path
          d="M12 20.3 4.9 13.4a4.6 4.6 0 0 1 0-6.6 4.8 4.8 0 0 1 6.7 0l.4.4.4-.4a4.8 4.8 0 0 1 6.7 0 4.6 4.6 0 0 1 0 6.6Z"
          {...s}
        />
      )}

      {name === 'star' && (
        <Path d="m12 3.3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.7l6-.9Z" fill={color} />
      )}

      {name === 'info' && (
        <>
          <Circle cx={12} cy={12} r={8.6} {...s} />
          <Path d="M12 11v5.2" {...s} />
          <Circle cx={12} cy={7.9} r={1.05} fill={color} />
        </>
      )}

      {name === 'pin' && (
        <>
          <Path
            d="M12 21.2c3.9-4.4 6.2-7.6 6.2-10.4a6.2 6.2 0 1 0-12.4 0c0 2.8 2.3 6 6.2 10.4Z"
            {...s}
          />
          <Circle cx={12} cy={10.6} r={2.3} {...s} />
        </>
      )}

      {name === 'qr' && (
        <>
          <Rect x={3.6} y={3.6} width={6.6} height={6.6} rx={1.8} {...s} />
          <Rect x={13.8} y={3.6} width={6.6} height={6.6} rx={1.8} {...s} />
          <Rect x={3.6} y={13.8} width={6.6} height={6.6} rx={1.8} {...s} />
          <Path d="M14 14.4v2.2m0 3.8v-1.4m3.4-4.6h3m-3 5.6h3m-3-2.8h.9" {...s} />
        </>
      )}

      {name === 'moped' && (
        // Two wheels, a deck between them, the rear frame carrying the seat and
        // a diagonal down to the front fork. Drawn as separate strokes because
        // one continuous path reads as a blob at 20px, which the first pass did.
        <>
          <Circle cx={5.6} cy={17} r={2.8} {...s} />
          <Circle cx={18.4} cy={17} r={2.8} {...s} />
          <Path d="M8.4 17h7.2" {...s} />
          <Path d="M5.6 14.2v-2.6a1.8 1.8 0 0 1 1.8-1.8h3.6" {...s} />
          <Path d="m11.4 9.8 4 7.2" {...s} />
          <Path d="M14.8 6.6h1.6a2.2 2.2 0 0 1 2.2 2.2v5.4" {...s} />
        </>
      )}

      {name === 'bag' && (
        // An arc sitting ON the body's top edge reads as a bucket handle, twice
        // over. What makes it a shopping bag is the folded top — the diagonal
        // creases and the rule across them — with the handle hanging *inside*
        // the bag as a U.
        <>
          <Path d="M6.9 2.8 4.2 6.9v12.4a2 2 0 0 0 2 2h11.6a2 2 0 0 0 2-2V6.9l-2.7-4.1Z" {...s} />
          <Path d="M4.2 6.9h15.6" {...s} />
          <Path d="M15.4 10.4a3.4 3.4 0 0 1-6.8 0" {...s} />
        </>
      )}
    </Svg>
  );
}
