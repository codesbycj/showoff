import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * vitalday's icon set — interface, so vectors (I4).
 *
 * The chip marks are *states*, not pictures of things, so they are ideas and
 * in drawing range by the §2.5 test.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS — flags are
 * missing on Windows entirely — and the web render cannot see that (§4.4).
 */
export type GlyphName =
  | 'back'
  | 'chevronRight'
  | 'smile'
  | 'drop'
  | 'spine'
  | 'wave'
  | 'shield'
  | 'clock'
  | 'tag'
  | 'sparkle'
  | 'plus'
  | 'walk'
  | 'body'
  | 'heart'
  | 'question';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 18, color = ct.ink, strokeWidth = 1.7 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'back' && <Path d="m14.4 6-6 6 6 6" {...s} strokeWidth={2.1} />}
      {name === 'chevronRight' && <Path d="m9.6 6 6 6-6 6" {...s} strokeWidth={2} />}

      {name === 'smile' && (
        <>
          <Circle cx={12} cy={12} r={8.4} {...s} />
          <Path d="M8.6 14.2a4.4 4.4 0 0 0 6.8 0" {...s} />
          <Circle cx={9.4} cy={9.8} r={1} fill={color} />
          <Circle cx={14.6} cy={9.8} r={1} fill={color} />
        </>
      )}

      {name === 'drop' && (
        <Path
          d="M12 3.6c3.4 4.2 5.4 6.8 5.4 9.4a5.4 5.4 0 0 1-10.8 0c0-2.6 2-5.2 5.4-9.4Z"
          {...s}
        />
      )}

      {name === 'spine' && (
        <>
          <Path d="M12 3.4v17.2" {...s} strokeWidth={2} />
          <Path d="M8.6 6.6h6.8M8.2 10.4h7.6M8.6 14.2h6.8M9.4 18h5.2" {...s} strokeWidth={1.6} />
        </>
      )}

      {name === 'wave' && (
        <Path
          d="M3 14.4c1.8 0 1.8-2 3.6-2s1.8 2 3.6 2 1.8-2 3.6-2 1.8 2 3.6 2 1.8-2 3.6-2"
          {...s}
          strokeWidth={1.9}
        />
      )}

      {name === 'shield' && <Path d="M12 3.4 19 6v6.4c0 4.2-3 7-7 8.2-4-1.2-7-4-7-8.2V6Z" {...s} />}

      {name === 'clock' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Path d="M12 7.4V12l3 1.8" {...s} strokeWidth={1.6} />
        </>
      )}

      {name === 'tag' && (
        <>
          <Rect x={3.6} y={5} width={16.8} height={14} rx={3} {...s} />
          <Path d="M7.6 9.4h8.8M7.6 13.4h5.4" {...s} strokeWidth={1.5} />
        </>
      )}

      {name === 'plus' && <Path d="M12 6.2v11.6M6.2 12h11.6" {...s} strokeWidth={2.2} />}

      {name === 'walk' && (
        <>
          <Circle cx={13.6} cy={4.6} r={2.3} fill={color} />
          <Path d="M15.2 9 11 10.8l-2.2 3.2 2.8 1.8 1 5.2" {...s} strokeWidth={2.2} />
          <Path d="m11 10.8-4.6 1.2M11.6 15.8 7.4 20.4" {...s} strokeWidth={2.2} />
        </>
      )}

      {name === 'body' && (
        <>
          <Circle cx={12} cy={5} r={2.3} fill={color} />
          <Path d="M12 8.4v6M12 14.4l-3 6.2M12 14.4l3 6.2M6.4 10.6h11.2" {...s} strokeWidth={2} />
        </>
      )}

      {name === 'heart' && (
        <Path
          d="M12 19.6S4.4 15 4.4 9.9a3.9 3.9 0 0 1 7.6-1.3 3.9 3.9 0 0 1 7.6 1.3c0 5.1-7.6 9.7-7.6 9.7Z"
          fill={color}
        />
      )}

      {name === 'question' && (
        <>
          <Path d="M9.3 9.1a2.8 2.8 0 1 1 3.5 2.9c-.6.2-.8.7-.8 1.3v.6" {...s} strokeWidth={2} />
          <Circle cx={12} cy={17.4} r={1.2} fill={color} />
        </>
      )}

      {name === 'sparkle' && (
        <Path
          d="M12 3.4c.7 4.4 1.9 5.6 6.3 6.3-4.4.7-5.6 1.9-6.3 6.3-.7-4.4-1.9-5.6-6.3-6.3 4.4-.7 5.6-1.9 6.3-6.3Z"
          fill={color}
        />
      )}
    </Svg>
  );
}
